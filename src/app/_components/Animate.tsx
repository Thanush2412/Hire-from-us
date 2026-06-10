"use client";

import { motion, useInView, TargetAndTransition } from "framer-motion";
import { ReactNode, useEffect, useRef, useState } from "react";

/* ── Fade up from below when scrolled into view ── */
export function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Staggered grid — propagates hidden/visible to children ── */
export function StaggerGrid({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.08 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.09 } },
      }}
    >
      {children}
    </motion.div>
  );
}

/* ── Card that fades + rises, and stagger-props its own icon child ── */
export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24, scale: 0.97 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.42,
            ease: "easeOut",
            // stagger icon inside the card 80ms after the card starts
            staggerChildren: 0.08,
            delayChildren: 0.08,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/*
 * Named animation presets — each icon picks the one that matches its visual meaning.
 *
 *  rise      — floats up from below         (TrendingUp, BarChart3, Layers)
 *  drop      — falls from above with bounce  (Trophy, Coins)
 *  spin      — full clockwise rotation in    (RefreshCw, Clock)
 *  flash     — scale + quick brightness pop  (Zap)
 *  expand    — scale from 0 with overshoot   (Shield, CheckCircle2, Target, Users)
 *  slideLeft — enters from the left          (Code2, Briefcase, FileText)
 *  slideRight— enters from the right         (MessageSquare, AlertTriangle)
 *  flip      — rotateY card-flip in          (Coins, BarChart3)
 */
const ICON_VARIANTS: Record<string, { hidden: TargetAndTransition; visible: TargetAndTransition }> = {
  rise: {
    hidden: { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 180, damping: 16 } },
  },
  drop: {
    hidden: { opacity: 0, y: -28, scale: 0.8 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, stiffness: 240, damping: 14 } },
  },
  spin: {
    hidden: { opacity: 0, rotate: -270, scale: 0.6 },
    visible: { opacity: 1, rotate: 0, scale: 1, transition: { type: "spring" as const, stiffness: 140, damping: 16 } },
  },
  flash: {
    hidden: { opacity: 0, scale: 0.4, rotate: -20 },
    visible: { opacity: 1, scale: 1, rotate: 0, transition: { type: "spring" as const, stiffness: 380, damping: 14 } },
  },
  expand: {
    hidden: { opacity: 0, scale: 0.3 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 260, damping: 18 } },
  },
  slideLeft: {
    hidden: { opacity: 0, x: -28 },
    visible: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 200, damping: 20 } },
  },
  slideRight: {
    hidden: { opacity: 0, x: 28 },
    visible: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 200, damping: 20 } },
  },
  flip: {
    hidden: { opacity: 0, rotateY: 75, scale: 0.85, transformPerspective: 800 },
    visible: { opacity: 1, rotateY: 0, scale: 1, transformPerspective: 800, transition: { type: "spring" as const, stiffness: 180, damping: 18 } },
  },
};

/*
 * ── IconBox ──
 * Wraps an icon with its own named entrance animation.
 * • Inside StaggerItem: omit standalone — inherits parent stagger timing.
 * • Outside stagger context: set standalone={true} + optional delay.
 * • Pass motion="spin" | "flash" | "rise" | "drop" | "expand" | "slideLeft" | "slideRight" | "flip"
 */
export function IconBox({
  children,
  className = "",
  motion: motionKey = "expand",
  standalone = false,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  motion?: keyof typeof ICON_VARIANTS;
  standalone?: boolean;
  delay?: number;
}) {
  const base = ICON_VARIANTS[motionKey] ?? ICON_VARIANTS.expand;
  const baseVisible = base.visible as TargetAndTransition & { transition?: Record<string, unknown> };
  const variant = {
    hidden: base.hidden,
    visible: {
      ...baseVisible,
      transition: {
        ...(baseVisible.transition ?? {}),
        ...(standalone ? { delay } : {}),
      },
    } as TargetAndTransition,
  };

  if (standalone) {
    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={variant}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div variants={variant} className={className}>
      {children}
    </motion.div>
  );
}


/* ── Slide in from left ── */
export function SlideLeft({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Slide in from right ── */
export function SlideRight({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Scale pop for badges / large metric icons ── */
export function ScalePop({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ type: "spring", stiffness: 300, damping: 22, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Counting number animation when scrolled into view ── */
export function CountingNumber({
  value,
  duration = 1.5,
}: {
  value: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState<ReactNode>("0");

  useEffect(() => {
    const match = value.match(/^([^0-9]*)([0-9]+)([^0-9]*)$/);

    if (!match) {
      if (value === "↓") {
        setDisplayValue(
          <span className="animate-slide-down-loop inline-block">↓</span>
        );
      } else {
        setDisplayValue(value);
      }
      return;
    }

    if (!isInView) {
      setDisplayValue(`${match[1]}0${match[3]}`);
      return;
    }

    const prefix = match[1];
    const targetNumber = parseInt(match[2], 10);
    const suffix = match[3];
    const startTime = performance.now();

    const updateNumber = (currentTime: number) => {
      const elapsed = (currentTime - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = progress * (2 - progress);
      const currentVal = Math.floor(easeProgress * targetNumber);
      setDisplayValue(`${prefix}${currentVal}${suffix}`);
      if (progress < 1) {
        requestAnimationFrame(updateNumber);
      } else {
        setDisplayValue(value);
      }
    };

    requestAnimationFrame(updateNumber);
  }, [isInView, value, duration]);

  return <span ref={ref}>{displayValue}</span>;
}

/* ── Step card: gradient number slides in from left, then text fades up ── */
export function AnimatedStep({
  step,
  title,
  desc,
  index,
}: {
  step: string;
  title: string;
  desc: string;
  index: number;
}) {
  return (
    <StaggerItem className="fp-card p-6 sm:p-8 relative overflow-hidden hover:border-white/20 transition-all flex flex-col justify-between">
      <div>
        <motion.div
          initial={{ opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.48,
            ease: "easeOut",
            delay: index * 0.1,
          }}
          className="text-4xl font-black gradient-text mb-4 leading-none"
        >
          {step}
        </motion.div>
        <h3 className="text-white font-bold text-lg mb-3 relative z-10">
          {title}
        </h3>
        <p className="text-[#DADADA] text-base leading-relaxed relative z-10">
          {desc}
        </p>
      </div>
    </StaggerItem>
  );
}
