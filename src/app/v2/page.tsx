"use client";

import { useMotionTemplate, useMotionValue, motion, useInView } from "framer-motion";
import React, { useEffect, useRef, useState, MouseEvent, ReactNode } from "react";
import {
  Rocket,
  Target,
  Lightbulb,
  Wrench,
  BarChart3,
  RefreshCw,
  Coins,
  Trophy,
  TrendingUp,
  AlertTriangle,
  Phone,
  Mail,
  HelpCircle,
  CheckCircle2,
  Users,
  Briefcase,
  GraduationCap,
  Clock,
  Zap,
  Shield,
  Code2,
  MessageSquare,
  ArrowRight,
  Calendar,
  Layers,
  Plus,
  Minus,
  FileText
} from "lucide-react";
import { FadeUp, StaggerGrid, StaggerItem, CountingNumber, IconBox, SlideLeft, SlideRight, GSAPIconBox } from "../_components/Animate";
import heroImage from "./hero.png";

/* ─── CUSTOM V2 COMPONENTS (React Bits Inspired) ─── */

// Drifting, colorful blur blobs in background
function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#D528A2]/12 blur-[120px] animate-aurora-1" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[#F4A863]/8 blur-[130px] animate-aurora-2" />
      <div className="absolute top-[40%] left-[25%] w-[40%] h-[40%] rounded-full bg-[#D528A2]/6 blur-[100px] animate-aurora-1" />
    </div>
  );
}

interface GravityParticle {
  size: number;
  left: number;
  delay: number;
  duration: number;
  isGradient: boolean;
  driftX1: number;
  driftX2: number;
}

// Rising antigravity particle effects (client-side initialized to prevent SSR hydration errors)
function AntigravityParticles() {
  const [particles, setParticles] = useState<GravityParticle[]>([]);

  useEffect(() => {
    const generated = Array.from({ length: 25 }).map(() => ({
      size: Math.random() * 8 + 4,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: Math.random() * 25 + 25, // slow, elegant rising
      isGradient: Math.random() > 0.5,
      driftX1: Math.random() * 16 - 8, // gentle horizontal drift
      driftX2: Math.random() * 16 - 8,
    }));
    setParticles(generated);
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            background: p.isGradient
              ? "linear-gradient(to top, #D528A2, #F4A863)"
              : "rgba(255, 255, 255, 0.15)",
            boxShadow: p.isGradient ? "0 0 10px rgba(213,40,162,0.3)" : "none",
          }}
          initial={{ y: "110vh", opacity: 0 }}
          animate={{
            y: "-10vh",
            opacity: [0, 0.7, 0.7, 0],
            x: [0, p.driftX1, p.driftX2, 0]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
}

// Interactive cursor follow particle trail (fixed inset to prevent clearing bugs on scroll)
function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    interface CursorParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      size: number;
      color: string;
      shape: "sparkle" | "diamond" | "circle";
      rotation: number;
      rotationSpeed: number;
    }

    const particles: CursorParticle[] = [];
    const colors = ["#D528A2", "#F4A863", "#D528A2", "#F4A863", "rgba(255, 255, 255, 0.45)"];

    let lastX = 0;
    let lastY = 0;
    let lastTime = Date.now();

    const spawnParticles = (clientX: number, clientY: number) => {
      const now = Date.now();
      const dt = Math.max(now - lastTime, 1);
      const dx = clientX - lastX;
      const dy = clientY - lastY;
      const speed = Math.sqrt(dx * dx + dy * dy) / dt; // pixels per ms

      lastX = clientX;
      lastY = clientY;
      lastTime = now;

      // Dynamic spawn count based on cursor speed (fast movement = richer trail)
      const count = Math.min(Math.floor(speed * 3.5) + 1, 6);

      for (let i = 0; i < count; i++) {
        particles.push({
          x: clientX,
          y: clientY,
          // Momentum: drift in direction of mouse movement + random spread
          vx: dx * 0.04 + (Math.random() - 0.5) * 0.7,
          vy: dy * 0.04 + (Math.random() - 0.5) * 0.7 - 0.2, // very gentle upward drift
          alpha: 1,
          size: Math.random() * 6.5 + 2.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          shape: Math.random() > 0.4 ? "sparkle" : Math.random() > 0.5 ? "diamond" : "circle",
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.08,
        });
      }
    };

    const isInteractive = (target: HTMLElement | null): boolean => {
      if (!target) return false;
      const tagName = target.tagName;
      if (["A", "BUTTON", "INPUT", "SELECT", "TEXTAREA"].includes(tagName)) {
        return true;
      }
      if (target.closest(".disable-cursor-trail") || target.closest("a") || target.closest("button") || target.closest("input") || target.closest(".fp-card") || target.closest(".spotlight-card") || target.closest("[role='button']")) {
        return true;
      }
      try {
        const computedCursor = window.getComputedStyle(target).cursor;
        if (computedCursor === "pointer") {
          return true;
        }
      } catch (err) { }
      return false;
    };

    const handleMouseMove = (e: globalThis.MouseEvent) => {
      if (isInteractive(e.target as HTMLElement | null)) return;
      spawnParticles(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: globalThis.TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        const touch = e.touches[0];
        if (isInteractive(touch.target as HTMLElement | null)) return;
        spawnParticles(touch.clientX, touch.clientY);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    // Premium shape drawing helpers
    const drawSparkle = (c: CanvasRenderingContext2D, cx: number, cy: number, size: number) => {
      c.beginPath();
      c.moveTo(cx, cy - size);
      c.quadraticCurveTo(cx, cy, cx + size, cy);
      c.quadraticCurveTo(cx, cy, cx, cy + size);
      c.quadraticCurveTo(cx, cy, cx - size, cy);
      c.quadraticCurveTo(cx, cy, cx, cy - size);
      c.closePath();
      c.fill();
    };

    const drawDiamond = (c: CanvasRenderingContext2D, cx: number, cy: number, size: number) => {
      c.beginPath();
      c.moveTo(cx, cy - size);
      c.lineTo(cx + size, cy);
      c.lineTo(cx, cy + size);
      c.lineTo(cx - size, cy);
      c.closePath();
      c.fill();
    };

    const animate = () => {
      try {
        ctx.clearRect(0, 0, width, height);

        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];

          // Apply movement & scaling
          p.x += p.vx;
          p.y += p.vy;
          p.alpha -= 0.014; // smooth, lingering trail lifespan
          p.size *= 0.98; // gentle shrinking
          p.rotation += p.rotationSpeed;

          // Safe guards to guarantee clean memory & prevent frozen visual glitches
          if (
            isNaN(p.alpha) ||
            p.alpha <= 0 ||
            isNaN(p.size) ||
            p.size <= 0.4 ||
            p.x < -100 ||
            p.x > width + 100 ||
            p.y < -100 ||
            p.y > height + 100
          ) {
            particles.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.globalAlpha = p.alpha;

          // Glow effects match brand theme colors
          ctx.shadowBlur = p.size * 1.5;
          ctx.shadowColor = p.color;
          ctx.fillStyle = p.color;

          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);

          if (p.shape === "sparkle") {
            drawSparkle(ctx, 0, 0, p.size);
          } else if (p.shape === "diamond") {
            drawDiamond(ctx, 0, 0, p.size * 0.7);
          } else {
            ctx.beginPath();
            ctx.arc(0, 0, p.size * 0.6, 0, Math.PI * 2);
            ctx.fill();
          }

          ctx.restore();
        }
      } catch (err) {
        console.error("Error in particle rendering:", err);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 w-screen h-screen"
      style={{ mixBlendMode: "screen" }}
    />
  );
}

// Mouse-tracking spotlight card with glowing border
export function SpotlightCard({
  children,
  className = "",
  effect = "spotlight",
}: {
  children: ReactNode;
  className?: string;
  effect?: "spotlight" | "magnify" | "border-trace" | "shimmer" | "neon-pulse" | "tilt" | "reveal-fill" | "corner-expand" | "none";
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const bg1 = useMotionTemplate`
    radial-gradient(
      200px circle at ${mouseX}px ${mouseY}px,
      rgba(213, 40, 162, 0.05),
      transparent 80%
    )
  `;

  const bg2 = useMotionTemplate`
    radial-gradient(
      100px circle at ${mouseX}px ${mouseY}px,
      rgba(244, 168, 99, 0.15),
      transparent 80%
    )
  `;

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent<HTMLDivElement>) {
    if (effect !== "spotlight") return;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const effectClass: Record<string, string> = {
    "spotlight": "",
    "magnify": "",
    "border-trace": "",
    "shimmer": "card-shimmer",
    "neon-pulse": "card-neon-pulse",
    "tilt": "card-tilt",
    "reveal-fill": "card-reveal-fill",
    "corner-expand": "card-corner-expand",
    "none": "",
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`spotlight-card relative overflow-hidden rounded-2xl bg-[#0B0A14]/75 backdrop-blur-xl group transition-all duration-300 ${effect === "border-trace"
        ? "border border-white/10 hover:border-transparent"
        : "border border-white/10 hover:border-white/20"
        } ${effectClass[effect] ?? ""} ${className}`}
    >
      {/* Corner Tech Brackets — hidden for effects that own the border */}
      {effect !== "corner-expand" && effect !== "border-trace" && (
        <>
          <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/10 group-hover:border-[#D528A2] transition-colors duration-300 rounded-tl-xl pointer-events-none z-20" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/10 group-hover:border-[#F4A863] transition-colors duration-300 rounded-tr-xl pointer-events-none z-20" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/10 group-hover:border-[#F4A863] transition-colors duration-300 rounded-bl-xl pointer-events-none z-20" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/10 group-hover:border-[#D528A2] transition-colors duration-300 rounded-br-xl pointer-events-none z-20" />
        </>
      )}

      {/* Rotating gradient border-trace travel animation */}
      {effect === "border-trace" && (
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0 rounded-2xl overflow-hidden">
          {/* Rotating gradient background */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250%] h-[250%] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: "conic-gradient(from 0deg, transparent 50%, #D528A2 75%, #F4A863 90%, #D528A2 100%)",
              animation: "border-spin-rotate 2s linear infinite",
            }}
          />
          {/* Inner dark mask to block the middle, revealing a 1.5px border */}
          <div
            className="absolute inset-[1.5px] bg-[#0B0A14]/90 backdrop-blur-xl rounded-[15px] z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
        </div>
      )}

      {effect === "spotlight" && (
        <>
          <motion.div
            className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
            style={{ background: bg1 }}
          />
          <motion.div
            className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
            style={{
              background: bg2,
              maskImage: "linear-gradient(black, black)",
              WebkitMaskImage: "linear-gradient(black, black)",
              maskClip: "content-box, border-box",
              WebkitMaskClip: "content-box, border-box",
              maskComposite: "exclude",
              WebkitMaskComposite: "destination-out",
              padding: "1px",
            }}
          />
        </>
      )}

      <div className={`relative z-10 p-5 sm:p-8 lg:p-10 ${effect === "magnify" ? "card-magnify-inner" : ""}`}>
        {children}
      </div>
    </div>
  );
}

// Scramble reveal text animation
export function HackerText({ text, speed = 25 }: { text: string; speed?: number }) {
  const [displayText, setDisplayText] = useState(text);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*";

  useEffect(() => {
    if (!isInView) return;
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) =>
        text
          .split("")
          .map((char, index) => {
            if (index < iteration) {
              return text[index];
            }
            if (char === " ") return " ";
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }
      iteration += 1 / 3;
    }, speed);

    return () => clearInterval(interval);
  }, [isInView, text, speed]);

  return <span ref={ref}>{displayText}</span>;
}

// Whole word hover magnify effect, respecting word wrap
export function WordMagnifier({ text, className = "" }: { text: string; className?: string }) {
  const isGradient = className.includes("gradient-text");
  const parentClass = className.replace("gradient-text", "").trim();

  return (
    <span className={`inline ${parentClass}`}>
      {text.split(" ").map((word, wordIdx) => (
        <span
          key={wordIdx}
          className={`inline-block whitespace-nowrap mr-[0.25em] last:mr-0 transition-all duration-300 hover:scale-[1.07] hover:-translate-y-0.5 origin-bottom cursor-default select-none ${isGradient ? "gradient-text" : ""
            }`}
        >
          {word}
        </span>
      ))}
    </span>
  );
}

/* ─── SUB-COMPONENTS FOR V2 SECTIONS ─── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <motion.p
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="eyebrow mb-4 bg-gradient-to-r from-white/5 to-white/0 border border-white/10 px-4 py-1.5 rounded-full"
    >
      {children}
    </motion.p>
  );
}

function V2Divider() {
  return (
    <div className="my-8 md:my-10 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D528A2]/25 to-transparent h-[1px]" />
      <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#F4A863] shadow-[0_0_10px_#F4A863]" />
    </div>
  );
}

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 group">
      <span className="mt-1 flex-shrink-0 w-6 h-6 rounded-lg bg-gradient-to-br from-[#D528A2] to-[#F4A863] flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_10px_rgba(213,40,162,0.4)]">
        <CheckCircle2 size={14} className="text-white" />
      </span>
      <span className="text-[#EAEAEA] text-base md:text-lg leading-relaxed">{children}</span>
    </li>
  );
}

const faqs = [
  {
    q: "How are candidates assessed?",
    a: "Through continuous testing, coding challenges, mock interviews, and real-world project evaluations.",
  },
  {
    q: "What roles can we hire for?",
    a: "Software Developers, Full Stack Engineers, Analysts, and more.",
  },
  {
    q: "Can we customize training based on our needs?",
    a: "Yes. We can align training modules with your hiring requirements.",
  },
  {
    q: "What is the pricing model?",
    a: "Flexible and based on hiring volume and engagement model.",
  },
  {
    q: "Do you provide replacement support?",
    a: "Yes, we ensure smooth hiring with replacement support where applicable.",
  },
  {
    q: "What programs are students part of in the FACE Prep Campus Model?",
    a: "Our talent pool primarily consists of students from MCA (Master of Computer Applications), BCA / B.Sc (Computer Science, IT, and related streams), and specialized skill tracks in Full Stack Development, Data Engineering, and emerging technologies. All students go through a structured, industry-aligned training and assessment system.",
  },
];

function V2FaqAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {faqs.map((faq, i) => (
        <SpotlightCard key={i} className="!p-0 overflow-hidden">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between px-8 py-6 text-left cursor-pointer outline-none focus:bg-white/5"
            aria-expanded={open === i}
          >
            <span className="font-semibold text-white text-lg pr-6">{faq.q}</span>
            <span className="text-[#F4A863] flex-shrink-0 transition-transform duration-300">
              {open === i ? (
                <Minus size={20} aria-hidden="true" />
              ) : (
                <Plus size={20} aria-hidden="true" />
              )}
            </span>
          </button>
          <motion.div
            initial={false}
            animate={{ height: open === i ? "auto" : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-8 pb-6 text-[#DADADA] text-base leading-relaxed border-t border-white/5 pt-6">
              {faq.a}
            </div>
          </motion.div>
        </SpotlightCard>
      ))}
    </div>
  );
}

function V2MobileComparison() {
  const items = [
    { aspect: "Approach", bad: "Hire → Train → Hope for performance", good: "Assess → Train → Hire → Better Performance" },
    { aspect: "Candidate Pool", bad: "Limited Candidate Availability", good: "Extensive Multi-Campus Talent Pool Across India" },
    { aspect: "Readiness", bad: "High onboarding time", good: "Ready from Day 1" },
    { aspect: "Visibility", bad: "Limited candidate visibility", good: "Data-backed evaluation" },
  ];

  return (
    <div className="block md:hidden w-full space-y-4 mt-6">
      {items.map((item, i) => (
        <SpotlightCard key={item.aspect} className="!p-0 overflow-hidden">
          <div
            className="px-4 py-2.5 flex items-center justify-center border-b border-white/5"
            style={{
              background: "linear-gradient(90deg, rgba(213,40,162,0.1) 0%, rgba(244,168,99,0.05) 100%)",
            }}
          >
            <span className="text-[10px] font-black uppercase tracking-widest text-[#F4A863]">
              {item.aspect}
            </span>
          </div>

          <div className="grid grid-cols-[1fr_auto_1fr]">
            <div className="p-4 flex flex-col items-center justify-center gap-2 text-center">
              <span className="text-red-400/70 font-black text-sm">❌</span>
              <p className="text-[#DADADA]/55 text-xs leading-snug">{item.bad}</p>
            </div>

            <div className="flex flex-col items-center justify-center py-4 px-1 gap-1">
              <div className="w-[1px] flex-1 bg-white/10" />
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#D528A2] to-[#F4A863] flex items-center justify-center shadow-[0_0_10px_rgba(213,40,162,0.4)]">
                <span className="text-[7px] font-black text-white">VS</span>
              </div>
              <div className="w-[1px] flex-1 bg-white/10" />
            </div>

            <div className="p-4 flex flex-col items-center justify-center gap-2 text-center bg-white/5">
              <CheckCircle2 size={16} className="text-[#D528A2]" />
              <p className="text-white text-xs font-semibold leading-snug">{item.good}</p>
            </div>
          </div>
        </SpotlightCard>
      ))}

      <div className="grid grid-cols-[1fr_auto_1fr] px-1 mt-1">
        <p className="text-[#DADADA]/30 text-[9px] font-bold uppercase tracking-wider text-center">Traditional</p>
        <div className="w-8" />
        <p className="gradient-text text-[9px] font-bold uppercase tracking-wider text-center">FACE Prep</p>
      </div>
    </div>
  );
}

function V2ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (response.ok && result.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(result.error || "Failed to submit request. Please try again.");
      }
    } catch (err) {
      setErrorMsg("An error occurred. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <SpotlightCard className="p-10 text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle2 size={72} className="text-[#F4A863] animate-bounce" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">Request Received!</h3>
        <p className="text-[#DADADA] text-lg leading-relaxed">
          Our team will reach out within 24 hours with curated candidate profiles.
        </p>
      </SpotlightCard>
    );
  }

  const inputClass =
    "w-full px-5 py-4 rounded-lg bg-black/40 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#D528A2] focus:ring-1 focus:ring-[#D528A2] transition-all duration-300 text-base shadow-inner";
  const labelClass = "block text-base font-semibold text-white/80 mb-2";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="company" className={labelClass}>
            Company Name <span className="text-[#F4A863]">*</span>
          </label>
          <input
            id="company"
            name="company"
            type="text"
            required
            placeholder="Acme Corp"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="role" className={labelClass}>
            Hiring Role(s) <span className="text-[#F4A863]">*</span>
          </label>
          <input
            id="role"
            name="role"
            type="text"
            required
            placeholder="Software Developer, Analyst…"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="positions" className={labelClass}>
            Number of Positions <span className="text-[#F4A863]">*</span>
          </label>
          <input
            id="positions"
            name="positions"
            type="number"
            min="1"
            required
            placeholder="10"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="timeline" className={labelClass}>
            Hiring Timeline
          </label>
          <input
            id="timeline"
            name="timeline"
            type="text"
            placeholder="Q3 2025, Immediate…"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="contact" className={labelClass}>
            Contact Name <span className="text-[#F4A863]">*</span>
          </label>
          <input
            id="contact"
            name="contact"
            type="text"
            required
            placeholder="Jane Smith"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Work Email <span className="text-[#F4A863]">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="jane@company.com"
            className={inputClass}
          />
        </div>
      </div>
      <div>
        <label htmlFor="phone" className={labelClass}>
          Phone Number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          placeholder="+91 98765 43210"
          className={inputClass}
        />
      </div>
      {errorMsg && (
        <p className="text-[#F4A863] text-sm font-semibold text-center mt-2">
          {errorMsg}
        </p>
      )}
      <button
        type="submit"
        disabled={submitting}
        className="btn-gradient w-full mt-4 py-4 text-lg flex items-center justify-center gap-3 font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 relative group overflow-hidden"
      >
        <span className="relative z-10">{submitting ? "Sending Request..." : "Request Candidate Profiles"}</span>
        <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#D528A2] to-[#F4A863] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md -z-10" />
      </button>
    </form>
  );
}

// Interactive Particle Brackets (Antigravity IDE style)
export function ParticleBrace({ side, className = "" }: { side: "left" | "right", className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let width = (canvas.width = 160);
    let height = (canvas.height = 450);

    const offCanvas = document.createElement("canvas");
    offCanvas.width = width;
    offCanvas.height = height;
    const offCtx = offCanvas.getContext("2d", { willReadFrequently: true });
    if (!offCtx) return;

    // Draw the text onto the offscreen canvas
    offCtx.fillStyle = "white";
    // Antigravity style: thin, elegant monospace font
    offCtx.font = "200 480px 'Inter', monospace";
    offCtx.textAlign = "center";
    offCtx.textBaseline = "middle";
    const textY = height / 2 + 20;
    const textX = side === "left" ? width / 2 + 10 : width / 2 - 10;
    offCtx.fillText(side === "left" ? "{" : "}", textX, textY);

    const imgData = offCtx.getImageData(0, 0, width, height).data;
    const points: { x: number; y: number }[] = [];

    // Extract pixels (skip every 6 pixels to create a dotted effect)
    for (let y = 0; y < height; y += 6) {
      for (let x = 0; x < width; x += 6) {
        const alpha = imgData[(y * width + x) * 4 + 3];
        if (alpha > 128) {
          points.push({
            x: x + (Math.random() - 0.5) * 3, // tiny organic scatter
            y: y + (Math.random() - 0.5) * 3
          });
        }
      }
    }

    const particles = points.map(p => ({
      x: Math.random() * width,
      y: Math.random() * height,
      baseX: p.x,
      baseY: p.y,
      vx: 0,
      vy: 0,
      size: Math.random() * 1.5 + 0.8,
      // brand gradient colors: pink, purple, orange
      color: Math.random() > 0.6 ? "#D528A2" : Math.random() > 0.5 ? "#9B3DCE" : "#F4A863"
    }));

    let animationFrameId: number;
    let mouse = { x: -1000, y: -1000, radius: 55 };

    const handleMouseMove = (e: globalThis.MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        let dx = mouse.x - p.x;
        let dy = mouse.y - p.y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          // Repel force
          let force = (mouse.radius - dist) / mouse.radius;
          p.vx -= (dx / dist) * force * 1.5;
          p.vy -= (dy / dist) * force * 1.5;
        }

        // Return to base position
        p.vx += (p.baseX - p.x) * 0.08;
        p.vy += (p.baseY - p.y) * 0.08;

        // Damping
        p.vx *= 0.82;
        p.vy *= 0.82;

        p.x += p.vx;
        p.y += p.vy;

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [side]);

  return <canvas ref={canvasRef} className={`w-[120px] sm:w-[160px] h-[350px] sm:h-[450px] pointer-events-auto ${className}`} style={{ mixBlendMode: "screen" }} />;
}

/* ─── MAIN V2 PAGE COMPONENT ─── */

export default function V2Page() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [solutionTilt, setSolutionTilt] = useState({ x: 0, y: 0 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    // Max 15 degrees tilt for smooth movement
    const rX = -(mouseY / height) * 15;
    const rY = (mouseX / width) * 15;

    setTilt({ x: rX, y: rY });
  }

  function handleMouseLeave() {
    setTilt({ x: 0, y: 0 });
  }

  function handleSolutionMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    const rX = -(mouseY / height) * 15;
    const rY = (mouseX / width) * 15;

    setSolutionTilt({ x: rX, y: rY });
  }

  function handleSolutionMouseLeave() {
    setSolutionTilt({ x: 0, y: 0 });
  }

  useEffect(() => {
    document.body.style.backgroundColor = "#000000";
    return () => {
      document.body.style.backgroundColor = ""; // reset on unmount
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#000000] text-[#DADADA] bg-grid-pattern relative overflow-x-clip">



      {/* Aurora gradient backdrops */}
      <AuroraBackground />

      {/* Antigravity rising particles */}
      <AntigravityParticles />

      {/* Interactive cursor trail */}
      <CursorTrail />

      {/* ── NAV ── */}
      <header className="sticky top-0 z-50 border-b border-white/5 backdrop-blur-xl bg-black/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <img
              src="/faceprepcampus-logo.svg"
              alt="FACE Prep Campus Logo"
              className="h-9 w-auto"
            />
          </div>
          <nav className="hidden lg:flex items-center gap-8 text-sm text-[#DADADA] font-medium">
            <a href="#solution" className="hover:text-[#F4A863] transition-all hover:scale-105">Solution</a>
            <a href="#talent-pool" className="hover:text-[#F4A863] transition-all hover:scale-105">Talent Pool</a>
            <a href="#how-it-works" className="hover:text-[#F4A863] transition-all hover:scale-105">Process</a>
            <a href="#contact" className="hover:text-[#F4A863] transition-all hover:scale-105">Contact</a>
          </nav>
          <a href="#contact" className="btn-gradient text-sm px-6 py-2.5 font-semibold relative group overflow-hidden">
            <span className="relative z-10">Get Started</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#D528A2] to-[#F4A863] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm -z-10" />
          </a>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

        {/* ══════════════════════════════════════════
            HERO
        ══════════════════════════════════════════ */}
        <section className="relative pt-8 pb-10 md:pt-14 md:pb-20 overflow-hidden">
          <div className="relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center mb-14">

              {/* Left Column: Hero Text */}
              <div className="lg:col-span-6 text-left">
                <FadeUp>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 shadow-md shadow-black/50">
                    <Rocket size={14} className="text-[#F4A863]" />
                    <span className="text-xs font-semibold text-white uppercase tracking-wider">Hire From Us</span>
                  </div>
                </FadeUp>
                <FadeUp delay={0.1}>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-6 tracking-tight">
                    Hire Pre-Trained,<br />
                    <span className="gradient-text">
                      <HackerText text="Job-Ready" />
                    </span> <WordMagnifier text="Tech Talent" /><br />
                    <span className="text-2xl md:text-3xl lg:text-4xl text-white/80"><WordMagnifier text="From Day 1" /></span>
                  </h1>
                </FadeUp>
                <FadeUp delay={0.2}>
                  <p className="text-base md:text-lg text-[#DADADA]/80 mb-10 leading-relaxed max-w-xl">
                    Skip months of training and uncertainty. Access industry-ready candidates
                    trained inside campuses, benchmarked on real hiring standards.
                  </p>
                </FadeUp>
                <FadeUp delay={0.3}>
                  <div className="flex flex-col sm:flex-row gap-4 justify-start">
                    <a href="#contact" className="btn-gradient text-sm px-6 py-3 inline-flex items-center justify-center gap-2 font-semibold relative group overflow-hidden">
                      <span className="relative z-10">Request Candidate Profiles</span>
                      <ArrowRight size={16} className="relative z-10 group-hover:translate-x-0.5 transition-transform" />
                      <div className="absolute inset-0 bg-gradient-to-r from-[#D528A2] to-[#F4A863] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm -z-10" />
                    </a>
                    <a
                      href="https://calendar.app.google/ub97dcaJ8MAbnSMz5"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline text-sm px-6 py-3 inline-flex items-center justify-center gap-2 font-semibold hover:border-[#D528A2] transition-colors"
                    >
                      <span>Schedule a Call</span>
                      <Calendar size={16} />
                    </a>
                  </div>
                </FadeUp>
              </div>

              {/* Right Column: Premium Tech Dashboard Frame */}
              <div
                className="lg:col-span-6 hidden lg:flex justify-center items-center relative cursor-pointer"
                style={{ perspective: 1200 }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                {/* 3D tilting assembly */}
                <div
                  className="relative transition-transform duration-300 ease-out animate-float"
                  style={{
                    width: 480,
                    height: 480,
                    transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* ── Ambient Background Glow ── */}
                  <div className="absolute -inset-8 rounded-[40px] bg-gradient-to-tr from-[#D528A2]/25 via-[#9B3DCE]/15 to-[#F4A863]/20 blur-[50px] opacity-75 -z-10" />

                  {/* ── Main Tech Glassmorphism Panel ── */}
                  <div
                    className="absolute inset-0 bg-[#0B0A14]/75 backdrop-blur-xl border border-white/10 rounded-[32px] overflow-hidden shadow-2xl shadow-black/80 flex flex-col justify-between p-6 select-none"
                    style={{ transform: "translateZ(0px)", transformStyle: "preserve-3d" }}
                  >
                    {/* Background grid overlay */}
                    <div className="absolute inset-0 bg-grid-pattern opacity-[0.06] rounded-[32px] pointer-events-none" />

                    {/* Corner Brackets */}
                    {/* Top-Left */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#D528A2] rounded-tl-[32px] pointer-events-none z-20" />
                    {/* Bottom-Right */}
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#F4A863] rounded-br-[32px] pointer-events-none z-20" />

                    {/* Plus signs at corners */}
                    <div className="absolute top-8 right-8 text-[#F4A863]/30 font-light text-sm pointer-events-none">+</div>
                    <div className="absolute bottom-8 left-8 text-[#D528A2]/30 font-light text-sm pointer-events-none">+</div>

                    {/* Header: Mac-style tabs controls */}
                    <div className="flex items-center justify-between w-full border-b border-white/5 pb-4 relative z-20">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#D528A2] opacity-80 shadow-[0_0_8px_#D528A2]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#9B3DCE] opacity-80 shadow-[0_0_8px_#9B3DCE]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#F4A863] opacity-80 shadow-[0_0_8px_#F4A863]" />
                      </div>
                      <div className="font-mono text-[9px] text-white/30 tracking-widest flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_6px_#10b981]" />
                        TALENT_PIPELINE_ACTIVE
                      </div>
                    </div>

                    {/* Footer / Status Bar details */}
                    <div className="flex items-center justify-between w-full border-t border-white/5 pt-4 font-mono text-[9px] text-white/30 relative z-20">
                      <div>SYS.LOC // CAMPUS_NET</div>
                      <div>SEC_CONN // ENCRYPTED</div>
                    </div>
                  </div>

                  {/* ── Floating 3D Image Card ── */}
                  <div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Dynamic offset shadow beneath the photo card */}
                    <div
                      className="absolute rounded-[24px] bg-black/90 blur-xl -z-10 transition-transform duration-200 ease-out"
                      style={{
                        width: 310,
                        height: 310,
                        transform: `translateZ(10px) translateY(${tilt.x * 0.4 + 12}px) translateX(${tilt.y * -0.4}px) scale(0.95)`,
                      }}
                    />

                    {/* Nested Card carrying the Image */}
                    <div
                      className="rounded-[24px] p-[1.5px] bg-gradient-to-br from-[#D528A2] via-[#9B3DCE] to-[#F4A863] shadow-2xl transition-all duration-300"
                      style={{
                        width: 310,
                        height: 310,
                        transform: "translateZ(40px)",
                        transformStyle: "preserve-3d",
                      }}
                    >
                      <div className="w-full h-full rounded-[23.5px] overflow-hidden bg-black relative">
                        {/* High-tech HUD grid scanlines inside image */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,_rgba(0,0,0,0.25)_50%),_linear-gradient(90deg,_rgba(255,0,0,0.04),_rgba(0,255,0,0.01),_rgba(0,0,255,0.04))] bg-[length:100%_4px,_6px_100%] pointer-events-none z-15 mix-blend-overlay opacity-60" />
                        <img
                          src={heroImage.src}
                          alt="FACE Prep Tech Talent Pipeline"
                          className="w-full h-full object-cover select-none pointer-events-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* ── 3D Interactive Floating Badges ── */}
                  {/* Badge 1: Top-Right */}
                  <div
                    className="absolute -top-3 -right-6 backdrop-blur-md bg-[#0B0A14]/85 border border-white/10 text-white px-4 py-2 rounded-xl flex items-center gap-2 shadow-2xl shadow-black/50 pointer-events-none"
                    style={{
                      transform: "translateZ(75px)",
                      transition: "transform 0.2s ease-out",
                    }}
                  >
                    <div className="w-5 h-5 rounded-lg bg-[#D528A2]/10 border border-[#D528A2]/30 flex items-center justify-center">
                      <Shield size={12} className="text-[#D528A2]" />
                    </div>
                    <span className="text-xs font-semibold tracking-wide text-white">100% Verified Skills</span>
                  </div>

                  {/* Badge 2: Bottom-Left */}
                  <div
                    className="absolute -bottom-4 -left-6 backdrop-blur-md bg-[#0B0A14]/85 border border-white/10 text-white px-4 py-2 rounded-xl flex items-center gap-2 shadow-2xl shadow-black/50 pointer-events-none"
                    style={{
                      transform: "translateZ(85px)",
                      transition: "transform 0.2s ease-out",
                    }}
                  >
                    <div className="w-5 h-5 rounded-lg bg-[#F4A863]/10 border border-[#F4A863]/30 flex items-center justify-center animate-pulse">
                      <Zap size={12} className="text-[#F4A863]" />
                    </div>
                    <span className="text-xs font-semibold tracking-wide text-white">Day 1 Productive</span>
                  </div>

                  {/* Badge 3: Middle-Left */}
                  <div
                    className="absolute top-[40%] -left-12 backdrop-blur-md bg-[#0B0A14]/80 border border-white/10 text-white px-3.5 py-1.5 rounded-xl flex items-center gap-2 shadow-xl shadow-black/40 pointer-events-none"
                    style={{
                      transform: "translateZ(55px)",
                      transition: "transform 0.2s ease-out",
                    }}
                  >
                    <div className="w-4.5 h-4.5 rounded-md bg-[#9B3DCE]/10 border border-[#9B3DCE]/30 flex items-center justify-center">
                      <Users size={11} className="text-[#9B3DCE]" />
                    </div>
                    <span className="text-[11px] font-semibold tracking-wide text-white/95">Pre-Trained Talent</span>
                  </div>

                </div>
              </div>

            </div>

            {/* Stats Grid using SpotlightCards */}
            <StaggerGrid className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto mt-20">
              {[
                { icon: Zap, metric: "60%", label: "Faster Onboarding" },
                { icon: TrendingUp, metric: "80%", label: "PPO Conversion" },
                { icon: CheckCircle2, metric: "Day 1", label: "Productive" },
                { icon: Shield, metric: "100%", label: "Verified Skills" },
              ].map(({ icon: Icon, metric, label }) => (
                <StaggerItem key={label}>
                  <SpotlightCard effect="spotlight" className="text-center hover:scale-[1.03] transition-transform duration-300">
                    <GSAPIconBox className="flex justify-center mb-4" hoverStyle="grow">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#D528A2]/15 to-[#F4A863]/10 border border-white/10 flex items-center justify-center shadow-lg shadow-black/30">
                        <Icon size={22} className="text-[#F4A863]" />
                      </div>
                    </GSAPIconBox>
                    <div className="text-3xl font-black gradient-text mb-1.5">
                      <CountingNumber value={metric} />
                    </div>
                    <div className="text-xs text-[#DADADA]/60 font-medium">{label}</div>
                  </SpotlightCard>
                </StaggerItem>
              ))}
            </StaggerGrid>
          </div>
        </section>

        <V2Divider />

        {/* ══════════════════════════════════════════
            THE PROBLEM
        ══════════════════════════════════════════ */}
        <section className="py-6 md:py-8">
          <div>
            <FadeUp className="text-center mb-12">
              <div className="flex justify-center">
                <SectionLabel>
                  <Target size={14} className="inline mr-2 -mt-0.5 text-[#F4A863]" />
                  The Problem
                </SectionLabel>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-5 leading-tight">
                Hiring Freshers Shouldn't<br />Feel Like a <WordMagnifier text="Gamble" className="gradient-text" />
              </h2>
              <p className="text-base text-[#DADADA]/70 max-w-2xl mx-auto">
                Every company wants to hire fresh talent. But the reality?
              </p>
            </FadeUp>

            {/* Problems Grid in SpotlightCards */}
            <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
              {[
                { icon: AlertTriangle, text: "Freshers often lack real-world skills", color: "#F4A863" },
                { icon: Clock, text: "Teams spend months on training before productivity", color: "#D528A2" },
                { icon: Target, text: "Hiring outcomes are unpredictable", color: "#F4A863" },
                { icon: TrendingUp, text: "Attrition risk is high", color: "#D528A2" },
              ].map(({ icon: Icon, text, color }) => (
                <StaggerItem key={text}>
                  <SpotlightCard effect="border-trace" className="text-center group min-h-[180px] flex flex-col justify-between transition-all duration-300">
                    <GSAPIconBox className="flex justify-center mb-4" hoverStyle="bounce">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#D528A2]/15 to-[#F4A863]/10 border border-white/10 flex items-center justify-center shadow-lg transition-transform duration-300">
                        <Icon size={26} style={{ color }} />
                      </div>
                    </GSAPIconBox>
                    <p className="text-[#DADADA]/80 text-sm leading-relaxed">{text}</p>
                  </SpotlightCard>
                </StaggerItem>
              ))}
            </StaggerGrid>

            <FadeUp className="text-center">
              <div className="inline-block">
                <SpotlightCard className="!py-4 !px-6 sm:!px-8 sm:!py-5">
                  <p className="text-white font-bold text-base md:text-lg">
                    You don't just need candidates.{" "}
                    <span className="gradient-text">You need job-ready performers from Day 1.</span>
                  </p>
                </SpotlightCard>
              </div>
            </FadeUp>
          </div>
        </section>

        <V2Divider />

        {/* ══════════════════════════════════════════
            OUR SOLUTION
        ══════════════════════════════════════════ */}
        <section id="solution" className="py-6 md:py-8 relative overflow-hidden">
          <div className="relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <SlideLeft>
                <SectionLabel>
                  <Lightbulb size={14} className="inline mr-2 -mt-0.5 text-[#F4A863]" />
                  Our Solution
                </SectionLabel>
                <h2 className="text-3xl md:text-4xl font-black text-white mb-6 leading-tight">
                  A Ready-to-Hire<br />
                  <WordMagnifier text="Talent Pipeline" className="gradient-text" /><br />
                  Built Inside Campuses
                </h2>
                <p className="text-base text-[#DADADA]/70 leading-relaxed mb-5">
                  At FACE Prep Campus, we don't prepare students for placements at the end.
                  We build them for your hiring requirements from the beginning.
                </p>
                <p className="text-sm text-white/50 leading-relaxed mb-6 font-medium">
                  Our model integrates directly into college campuses to:
                </p>
                <ul className="space-y-4 mb-8">
                  <CheckItem>Train students on real industry tech stacks</CheckItem>
                  <CheckItem>Continuously assess performance</CheckItem>
                  <CheckItem>Benchmark them against hiring standards</CheckItem>
                  <CheckItem>Build a curated, job-ready talent pool</CheckItem>
                </ul>
                <a href="#contact" className="btn-gradient inline-flex items-center gap-2 text-sm relative group overflow-hidden">
                  <span className="relative z-10">Explore Talent Pool</span>
                  <ArrowRight size={16} className="relative z-10 group-hover:translate-x-0.5 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#D528A2] to-[#F4A863] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm -z-10" />
                </a>
              </SlideLeft>

              <SlideRight className="relative flex justify-center items-center mt-10 lg:mt-0">
                {/* IDE Code Block curly brackets { } Frame */}
                <div
                  className="relative w-full max-w-md aspect-square flex items-center justify-center select-none group disable-cursor-trail"
                  style={{ perspective: 1200 }}
                >
                  {/* Static 3D assembly (Rotation disabled) */}
                  <div
                    className="relative w-full h-full flex items-center justify-center transition-transform duration-300 ease-out"
                    style={{
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {/* Background Glow */}
                    <div className="absolute -inset-8 rounded-full bg-gradient-to-tr from-[#D528A2]/15 to-[#F4A863]/10 blur-[45px] opacity-75 -z-10" />

                    {/* Editor Code Grid (subtle background dots) */}
                    <div className="absolute inset-4 bg-[radial-gradient(rgba(255,255,255,0.05)_1.5px,transparent_1.5px)] bg-[size:18px_18px] pointer-events-none opacity-50 rounded-2xl" />

                    {/* Left gutter (IDE style line numbers) */}
                    <div
                      className="absolute left-4 top-14 bottom-14 flex flex-col justify-between font-mono text-[9px] text-white/10 select-none pointer-events-none"
                      style={{ transform: "translateZ(10px)" }}
                    >
                      <div className="flex items-center gap-1"><span>01</span><span className="w-1 h-1 rounded-full bg-[#D528A2]/55" /></div>
                      <div className="flex items-center gap-1"><span>02</span><span className="w-1 h-1 rounded-full bg-[#9B3DCE]/55" /></div>
                      <div className="flex items-center gap-1"><span>03</span><span className="w-1 h-1 rounded-full bg-emerald-500/40" /></div>
                      <div className="flex items-center gap-1"><span>04</span><span className="w-1 h-1 rounded-full bg-[#F4A863]/55" /></div>
                      <div className="flex items-center gap-1"><span>05</span><span className="w-1 h-1 rounded-full bg-[#D528A2]/55" /></div>
                    </div>

                    {/* Vertical Dotted Guide Lines */}
                    <div
                      className="absolute left-14 top-12 bottom-12 border-l border-dotted border-white/10 w-[1px] pointer-events-none"
                      style={{ transform: "translateZ(15px)" }}
                    />
                    <div
                      className="absolute right-14 top-12 bottom-12 border-r border-dotted border-white/10 w-[1px] pointer-events-none"
                      style={{ transform: "translateZ(15px)" }}
                    />

                    {/* Particle Reacting Left Curly Bracket { */}
                    <div
                      className="absolute left-[-16px] sm:left-[-32px] top-10 bottom-10 flex items-center justify-center pointer-events-none"
                      style={{ transform: "translateZ(25px)" }}
                    >
                      <ParticleBrace side="left" className="drop-shadow-[0_0_15px_rgba(213,40,162,0.4)]" />
                    </div>

                    {/* Particle Reacting Right Curly Bracket } */}
                    <div
                      className="absolute right-[-16px] sm:right-[-32px] top-10 bottom-10 flex items-center justify-center pointer-events-none"
                      style={{ transform: "translateZ(25px)" }}
                    >
                      <ParticleBrace side="right" className="drop-shadow-[0_0_15px_rgba(244,168,99,0.4)]" />
                    </div>

                    {/* Floating Center Image (No square frame) */}
                    <div
                      className="relative w-[68%] aspect-square flex items-center justify-center"
                      style={{ transform: "translateZ(45px)" }}
                    >
                      <img
                        src="/developer_girl.png"
                        alt="Solution Developer Profile"
                        className="w-full h-full object-contain select-none pointer-events-none filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
                      />
                    </div>

                    {/* IDE status details at the bottom of editor block */}
                    <div
                      className="absolute bottom-8 left-20 right-20 flex items-center justify-between font-mono text-[8px] text-[#DADADA]/20 pointer-events-none"
                      style={{ transform: "translateZ(30px)" }}
                    >
                      <div className="flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-[#D528A2]/40" />
                        <span className="w-2.5 h-0.5 rounded bg-white/5" />
                      </div>
                      <div>const solution = "FACE_PREP_CAMPUS";</div>
                    </div>

                    {/* Floating Skill Badges (IDE Tag style) */}
                    <div
                      className="absolute -top-3 left-[28%] backdrop-blur-md bg-black/70 border border-white/10 text-white/70 px-2.5 py-1 rounded-md text-[9px] font-mono shadow-lg pointer-events-none"
                      style={{ transform: "translateZ(50px)" }}
                    >
                      <span className="text-[#D528A2]">import</span> {"{ Developer }"} <span className="text-[#9B3DCE]">from</span> <span className="text-[#F4A863]">"campus"</span>
                    </div>

                  </div>
                </div>
              </SlideRight>
            </div>
          </div>
        </section>

        <V2Divider />

        {/* ══════════════════════════════════════════
            WHAT MAKES CANDIDATES DIFFERENT
        ══════════════════════════════════════════ */}
        <section className="py-6 md:py-8">
          <FadeUp className="text-center mb-12">
            <div className="flex justify-center">
              <SectionLabel>
                <Wrench size={14} className="inline mr-2 -mt-0.5 text-[#F4A863]" />
                What Makes Our Candidates Different
              </SectionLabel>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight">
              Not Freshers.{" "}
              <span className="gradient-text">Deployable Talent.</span>
            </h2>
          </FadeUp>
          <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {[
              {
                icon: Code2,
                title: "Technical Skills",
                desc: "Candidates are trained in in-demand technologies like Java, Python, Full Stack Development, and Data Structures & Algorithms.",
              },
              {
                icon: Target,
                title: "Problem Solving Ability",
                desc: "Evaluated through real-world coding challenges and practical assessments — not just academic exams.",
              },
              {
                icon: MessageSquare,
                title: "Communication & Workplace Readiness",
                desc: "Every candidate is interview-ready, with strong communication and professional skills.",
              },
              {
                icon: BarChart3,
                title: "Verified Performance Data",
                desc: "Each profile comes with assessment scores, project work, and performance insights — so you hire with confidence.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <StaggerItem key={title}>
                <SpotlightCard effect="tilt" className="transition-all duration-300">
                  <div className="flex gap-6">
                    <GSAPIconBox className="flex-shrink-0" hoverStyle="wiggle">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#D528A2]/15 to-[#F4A863]/10 border border-white/10 flex items-center justify-center shadow-lg shadow-black/30">
                        <Icon size={22} className="text-[#F4A863]" />
                      </div>
                    </GSAPIconBox>
                    <div>
                      <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
                      <p className="text-[#DADADA]/70 text-sm leading-relaxed">{desc}</p>
                    </div>
                  </div>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </section>

        <V2Divider />

        {/* ══════════════════════════════════════════
            TALENT POOL
        ══════════════════════════════════════════ */}
        <section id="talent-pool" className="py-6 md:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <SlideLeft>
              <SectionLabel>
                <BarChart3 className="inline mr-2 -mt-0.5 text-[#F4A863]" />
                Explore Our Talent Pool
              </SectionLabel>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
                Hire Based on Data, Not Guesswork
              </h2>
              <p className="text-[#DADADA]/80 text-lg leading-relaxed mb-8">
                Access a curated pool of candidates filtered by your exact hiring needs.
              </p>
              <h3 className="text-white font-semibold text-xl mb-5">Filter by:</h3>
              <ul className="space-y-4 mb-10">
                <CheckItem>Role (Software Developer, Analyst, etc.)</CheckItem>
                <CheckItem>Skills (Java, Python, React, etc.)</CheckItem>
                <CheckItem>College</CheckItem>
                <CheckItem>Graduation Year</CheckItem>
              </ul>
              <a href="#contact" className="btn-gradient inline-flex items-center gap-3 text-lg px-8 py-4 font-semibold relative group overflow-hidden">
                <span className="relative z-10">Request Sample Profiles</span>
                <ArrowRight size={20} className="relative z-10 group-hover:translate-x-0.5 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#D528A2] to-[#F4A863] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm -z-10" />
              </a>
            </SlideLeft>
            <SlideRight>
              <SpotlightCard>
                <h3 className="text-white font-bold mb-6 text-xl sm:text-2xl">
                  Each Candidate Profile Includes:
                </h3>
                <div className="space-y-5">
                  {[
                    { icon: Trophy, label: "Verified Skill Scores" },
                    { icon: Layers, label: "Project Portfolio" },
                    { icon: Target, label: "Interview Readiness Rating" },
                    { icon: FileText, label: "Resume + Performance Insights" },
                  ].map(({ icon: Icon, label }) => (
                    <div
                      key={label}
                      className="group flex items-center gap-3 sm:gap-5 p-4 sm:p-5 rounded-lg bg-black/40 border border-white/5 hover:translate-x-2 hover:border-white/20 transition-all duration-300"
                    >
                      <GSAPIconBox className="flex-shrink-0" hoverStyle="flip">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#D528A2]/15 to-[#F4A863]/10 border border-white/10 flex items-center justify-center shadow-md">
                          <Icon size={22} className="text-[#F4A863]" />
                        </div>
                      </GSAPIconBox>
                      <span className="text-white font-medium text-base sm:text-lg">{label}</span>
                    </div>
                  ))}
                </div>
              </SpotlightCard>
            </SlideRight>
          </div>
        </section>

        <V2Divider />

        {/* ══════════════════════════════════════════
            HOW IT WORKS
        ══════════════════════════════════════════ */}
        <section id="how-it-works" className="py-6 md:py-8">
          <FadeUp className="text-center mb-12">
            <div className="flex justify-center">
              <SectionLabel>
                <RefreshCw className="inline mr-2 -mt-0.5 text-[#F4A863]" />
                How Hiring From Us Works
              </SectionLabel>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              <HackerText text="Simple. Fast. Predictable." />
            </h2>
          </FadeUp>
          <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                step: "01",
                title: "Share Your Requirement",
                desc: "Tell us the roles, skills, and number of candidates you need.",
              },
              {
                step: "02",
                title: "Get Curated Profiles",
                desc: "Receive a shortlist of pre-assessed, job-ready candidates.",
              },
              {
                step: "03",
                title: "Interview & Evaluate",
                desc: "Conduct interviews or assessments as per your process.",
              },
              {
                step: "04",
                title: "Hire & Onboard",
                desc: "Select candidates and onboard with minimal training required.",
              },
            ].map(({ step, title, desc }) => (
              <StaggerItem key={step}>
                <SpotlightCard effect="corner-expand" className="min-h-[220px] flex flex-col justify-between transition-transform duration-300">
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      <div className="text-3xl font-black gradient-text mb-4 leading-none">{step}</div>
                      <h3 className="text-white font-bold text-lg mb-2 relative z-10">{title}</h3>
                      <p className="text-[#DADADA]/70 text-sm leading-relaxed relative z-10">{desc}</p>
                    </div>
                  </div>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </StaggerGrid>
          <div className="mt-10 flex justify-center px-4">
            <SpotlightCard className="!py-3 !px-6 max-w-full text-center">
              <div className="flex items-center justify-center gap-2 flex-wrap leading-relaxed">
                <Zap size={18} className="text-[#F4A863] flex-shrink-0 -mt-0.5" />
                <span className="text-white font-bold text-xs xs:text-sm sm:text-base md:text-lg">
                  Reduce your time-to-hire by up to{" "}
                  <span className="gradient-text text-sm xs:text-base sm:text-xl md:text-2xl font-black inline-block">
                    <CountingNumber value="70%" />
                  </span>
                </span>
              </div>
            </SpotlightCard>
          </div>
        </section>

        <V2Divider />

        {/* ══════════════════════════════════════════
            HIRING MODELS
        ══════════════════════════════════════════ */}
        <section className="py-6 md:py-8">
          <FadeUp className="text-center mb-14">
            <div className="flex justify-center">
              <SectionLabel>
                <Coins className="inline mr-2 -mt-0.5 text-[#F4A863]" />
                Flexible Hiring Models
              </SectionLabel>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              <WordMagnifier text="Hire the Way That Works for You" />
            </h2>
          </FadeUp>
          <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { icon: Briefcase, title: "Full-Time Hiring (FTE)", desc: "Direct placement of job-ready candidates into your team." },
              { icon: RefreshCw, title: "Internship → PPO", desc: "Internship to Pre-Placement Offers — evaluate before you commit." },
              { icon: FileText, title: "Apprenticeship Hiring", desc: "Aligned with the National Apprenticeship Training Scheme." },
              { icon: Users, title: "Bulk Hiring", desc: "Scale your team fast — whether you need 2 or 200 candidates." },
            ].map(({ icon: Icon, title, desc }) => (
              <StaggerItem key={title}>
                <SpotlightCard effect="shimmer" className="text-center flex flex-col items-center transition-transform duration-300">
                  <GSAPIconBox className="mb-5" hoverStyle="spin">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#D528A2]/15 to-[#F4A863]/10 border border-white/10 flex items-center justify-center shadow-lg shadow-black/30">
                      <Icon size={28} className="text-[#F4A863]" />
                    </div>
                  </GSAPIconBox>
                  <h3 className="text-white font-bold text-lg mb-3">{title}</h3>
                  <p className="text-[#DADADA]/70 text-sm leading-relaxed">{desc}</p>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </StaggerGrid>
          <p className="text-center mt-10 text-[#DADADA]/70 text-base sm:text-lg">
            Whether you&apos;re hiring{" "}
            <span className="text-white font-semibold text-xl">2 or 200</span> — we&apos;ve got you covered.
          </p>
        </section>

        <V2Divider />

        {/* ══════════════════════════════════════════
            SUCCESS STORIES
        ══════════════════════════════════════════ */}
        <section className="py-6 md:py-8">
          <div className="text-center mb-14">
            <div className="flex justify-center">
              <SectionLabel>
                <Trophy className="inline mr-2 -mt-0.5 text-[#F4A863]" />
                Success Stories
              </SectionLabel>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Companies Are Already Hiring Better with FACE Prep
            </h2>
          </div>

          <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-12">
            {[
              { metric: "60%", label: "Faster Onboarding", icon: Zap },
              { metric: "80%", label: "Internship-to-Full-Time Conversion", icon: TrendingUp },
            ].map(({ metric, label, icon: Icon }) => (
              <StaggerItem key={label}>
                <SpotlightCard effect="neon-pulse" className="text-center flex flex-col items-center justify-between min-h-[280px] transition-all duration-300">
                  <GSAPIconBox className="mb-5" hoverStyle="float">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#D528A2]/15 to-[#F4A863]/10 border border-white/10 flex items-center justify-center shadow-lg shadow-black/30">
                      <Icon size={26} className="text-[#F4A863]" />
                    </div>
                  </GSAPIconBox>
                  <div>
                    <div className="text-6xl font-black gradient-text mb-4">
                      <CountingNumber value={metric} />
                    </div>
                    <p className="text-[#DADADA] font-medium text-lg">{label}</p>
                  </div>
                </SpotlightCard>
              </StaggerItem>
            ))}

            {/* ↓ card rendered directly with SVG gradient arrow */}
            <StaggerItem>
              <SpotlightCard effect="neon-pulse" className="text-center flex flex-col items-center justify-between min-h-[280px] transition-all duration-300">
                <GSAPIconBox className="mb-5" hoverStyle="pulse">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#D528A2]/15 to-[#F4A863]/10 border border-white/10 flex items-center justify-center shadow-lg shadow-black/30">
                    <Coins size={26} className="text-[#F4A863]" />
                  </div>
                </GSAPIconBox>
                <div>
                  <div className="flex justify-center mb-6">
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="url(#arrow-gradient-v2)"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="animate-slide-down-loop"
                    >
                      <defs>
                        <linearGradient id="arrow-gradient-v2" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#D528A2" />
                          <stop offset="100%" stopColor="#F4A863" />
                        </linearGradient>
                      </defs>
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <polyline points="19 12 12 19 5 12"></polyline>
                    </svg>
                  </div>
                  <p className="text-[#DADADA] font-medium text-lg">Significant Reduction in Training Costs</p>
                </div>
              </SpotlightCard>
            </StaggerItem>
          </StaggerGrid>
        </section>

        <V2Divider />

        {/* ══════════════════════════════════════════
            COMPARISON TABLE
        ══════════════════════════════════════════ */}
        <section className="py-6 md:py-8">
          <div className="text-center mb-14">
            <div className="flex justify-center">
              <SectionLabel>
                <TrendingUp className="inline mr-2 -mt-0.5 text-[#F4A863]" />
                Why Companies Choose Us
              </SectionLabel>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Traditional Hiring vs{" "}
              <span className="gradient-text">FACE Prep Hiring</span>
            </h2>
          </div>

          {/* Desktop view: Spotlight Comparison Table */}
          <div className="hidden md:block">
            <SpotlightCard className="!p-0 overflow-hidden">
              <div className="grid grid-cols-3 text-base font-bold bg-white/5">
                <div className="p-5 text-[#DADADA]/60 border-b border-white/5">Aspect</div>
                <div className="p-5 text-[#DADADA]/60 border-b border-l border-white/5">Traditional Hiring</div>
                <div className="p-5 text-white border-b border-l border-white/5 bg-gradient-to-r from-[#D528A2]/10 to-transparent">
                  FACE Prep Hiring
                </div>
              </div>
              {[
                {
                  aspect: "Approach",
                  bad: "Hire → Train → Hope for performance",
                  good: "Assess → Train → Hire → Better Performance",
                },
                {
                  aspect: "Candidate Pool",
                  bad: "Limited Candidate Availability",
                  good: "Extensive Multi-Campus Talent Pool Across India",
                },
                {
                  aspect: "Readiness",
                  bad: "High onboarding time",
                  good: "Ready from Day 1",
                },
                {
                  aspect: "Visibility",
                  bad: "Limited visibility into candidate capability",
                  good: "Data-backed candidate evaluation",
                },
              ].map(({ aspect, bad, good }, i, arr) => (
                <div
                  key={aspect}
                  className={`grid grid-cols-3 text-base hover:bg-white/5 transition-colors duration-200 ${i < arr.length - 1 ? "border-b border-white/5" : ""
                    }`}
                >
                  <div className="p-5 text-white/70 font-semibold">{aspect}</div>
                  <div className="p-5 compare-row-bad border-l border-white/5 text-[#DADADA]/70">{bad}</div>
                  <div className="p-5 compare-row-good border-l border-white/5 bg-[#D528A2]/5 flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-[#D528A2] flex-shrink-0 shadow-[0_0_8px_rgba(213,40,162,0.4)]" />
                    <span className="text-white font-medium">{good}</span>
                  </div>
                </div>
              ))}
            </SpotlightCard>
          </div>

          {/* Mobile view */}
          <V2MobileComparison />

          <p className="text-center mt-10 text-white font-semibold text-xl">
            We don&apos;t just help you hire.{" "}
            <span className="gradient-text">We guarantee performance.</span>
          </p>
        </section>

        <V2Divider />

        {/* ══════════════════════════════════════════
            LIMITED ACCESS URGENCY
        ══════════════════════════════════════════ */}
        <section className="py-6 md:py-8">
          <SpotlightCard className="!p-10 text-center relative overflow-hidden bg-gradient-to-br from-[#D528A2]/5 to-[#F4A863]/5 border-[1px] border-[#D528A2]/30">
            {/* Floating Spheres on Edges */}
            <motion.div
              className="absolute w-28 h-28 rounded-full bg-gradient-to-tr from-[#D528A2] to-[#9B3DCE] opacity-45 blur-md"
              style={{ left: "-40px", top: "-20px" }}
              animate={{
                y: [0, -12, 0],
                x: [0, 6, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute w-36 h-36 rounded-full bg-gradient-to-br from-[#F4A863] to-[#D528A2] opacity-40 blur-lg"
              style={{ right: "-60px", bottom: "-30px" }}
              animate={{
                y: [0, 14, 0],
                x: [0, -8, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-[#9B3DCE] to-[#F4A863] opacity-35 blur-md"
              style={{ right: "-20px", top: "15%" }}
              animate={{
                y: [0, -15, 0],
                x: [0, -6, 0],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
            <motion.div
              className="absolute w-24 h-24 rounded-full bg-gradient-to-tr from-[#D528A2] to-[#F4A863] opacity-40 blur-sm"
              style={{ left: "-30px", bottom: "20%" }}
              animate={{
                y: [0, 10, 0],
                x: [0, 8, 0],
              }}
              transition={{
                duration: 9,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
            />

            <div className="flex justify-center mb-6 relative z-10">
              <AlertTriangle size={56} className="text-[#F4A863] animate-pulse" />
            </div>
            <div className="flex justify-center relative z-10">
              <SectionLabel>Limited Access</SectionLabel>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-6 mb-6 leading-tight relative z-10">
              Top Talent Gets Hired Early
            </h2>
            <p className="text-[#DADADA]/80 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed relative z-10">
              Our best candidates are often hired before graduation. Get early access
              to secure top performers before they&apos;re gone.
            </p>
            <a href="#contact" className="btn-gradient text-base sm:text-lg px-8 sm:px-12 py-3.5 sm:py-4 inline-flex items-center gap-3 font-semibold relative group overflow-hidden z-10">
              <span className="relative z-10">Get Early Access Now</span>
              <ArrowRight size={20} className="relative z-10 group-hover:translate-x-0.5 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#D528A2] to-[#F4A863] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm -z-10" />
            </a>
          </SpotlightCard>
        </section>

        <V2Divider />

        {/* ══════════════════════════════════════════
            CONTACT / FORM
        ══════════════════════════════════════════ */}
        <section id="contact" className="py-4 md:py-6">
          <div className="text-center mb-12">
            <div className="flex justify-center">
              <SectionLabel>
                <Phone className="inline mr-2 -mt-0.5 text-[#F4A863]" />
                Partner With Us
              </SectionLabel>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Start Building Your Pipeline
            </h2>
            <p className="text-[#DADADA]/80 text-base sm:text-lg mt-4 max-w-xl mx-auto">
              Get in touch to request sample candidate profiles or schedule a call.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Form */}
            <div className="lg:col-span-3">
              <SpotlightCard>
                <h3 className="text-white font-bold text-xl mb-6">
                  Request Candidate Profiles
                </h3>
                <V2ContactForm />
              </SpotlightCard>
            </div>

            {/* Direct contact */}
            <div className="lg:col-span-2 space-y-6">
              <SpotlightCard className="hover:scale-[1.01] transition-transform duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D528A2] to-[#F4A863] flex items-center justify-center text-white font-bold text-lg shadow-[0_0_15px_rgba(213,40,162,0.4)]">
                    AJ
                  </div>
                  <div>
                    <h4 className="text-white font-bold">Abhishek Joseph</h4>
                    <p className="text-[#DADADA]/60 text-xs font-semibold uppercase tracking-wider">AVP – Enterprise Relations</p>
                  </div>
                </div>
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3">
                    <Mail size={16} className="text-[#F4A863]" />
                    <a href="mailto:abhishek@faceprep.in" className="hover:text-white transition-colors">abhishek@faceprep.in</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={16} className="text-[#F4A863]" />
                    <a href="tel:+918868012396" className="hover:text-white transition-colors">+91 88680 12396</a>
                  </div>
                </div>
              </SpotlightCard>

              <SpotlightCard className="hover:scale-[1.01] transition-transform duration-300">
                <h4 className="text-white font-bold mb-4">Also Available:</h4>
                <div className="space-y-3">
                  <a href="#contact" className="btn-gradient w-full text-sm py-2.5 flex items-center justify-center gap-2 relative group overflow-hidden">
                    <span className="relative z-10">Request Candidate Profiles</span>
                    <ArrowRight size={14} className="relative z-10 group-hover:translate-x-0.5 transition-transform" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#D528A2] to-[#F4A863] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm -z-10" />
                  </a>
                  <a
                    href="https://calendar.app.google/ub97dcaJ8MAbnSMz5"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline w-full text-sm py-2.5 flex items-center justify-center gap-2 hover:border-[#D528A2] transition-colors"
                  >
                    <span>Book a Hiring Consultation</span>
                    <Calendar size={14} />
                  </a>
                </div>
              </SpotlightCard>
            </div>
          </div>
        </section>

        <V2Divider />

        {/* ══════════════════════════════════════════
            FAQ
        ══════════════════════════════════════════ */}
        <section className="py-6 md:py-8">
          <div className="text-center mb-14">
            <div className="flex justify-center">
              <SectionLabel>
                <HelpCircle className="inline mr-2 -mt-0.5 text-[#F4A863]" />
                Frequently Asked Questions
              </SectionLabel>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Got Questions? We Have Answers.
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <V2FaqAccordion />
          </div>
        </section>

      </main>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/5 py-10 px-4 sm:px-6 mt-12 relative z-10 bg-black/60 backdrop-blur-md">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            Stop hiring potential.{" "}
            <span className="gradient-text">Start hiring performance.</span>
          </p>
          <p className="text-xs text-[#DADADA]/40 mt-8">
            © {new Date().getFullYear()} FACE Prep Campus. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
