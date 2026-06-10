"use client";

import { CheckCircle2, XCircle } from "lucide-react";
import { motion } from "framer-motion";

const items = [
  { aspect: "Approach", bad: "Hire → Train → Hope for performance", good: "Assess → Train → Hire → Better Performance" },
  { aspect: "Candidate Pool", bad: "Limited Candidate Availability", good: "Extensive Multi-Campus Talent Pool Across India" },
  { aspect: "Readiness", bad: "High onboarding time", good: "Ready from Day 1" },
  { aspect: "Visibility", bad: "Limited candidate visibility", good: "Data-backed evaluation" },
];

export default function MobileComparison() {
  return (
    <div className="block md:hidden w-full space-y-3 mt-6">
      {items.map((item, i) => (
        <motion.div
          key={item.aspect}
          initial={{ opacity: 0, y: 36, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, ease: "easeOut" as const, delay: i * 0.08 }}
          className="w-full rounded-2xl overflow-hidden border border-white/8"
          style={{ background: "rgba(255,255,255,0.03)" }}
        >
          {/* Aspect badge header */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.1 + i * 0.08 }}
            className="px-4 py-2 flex items-center justify-center"
            style={{
              background: "linear-gradient(90deg, rgba(213,40,162,0.15) 0%, rgba(244,168,99,0.1) 100%)",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <span className="text-[10px] font-black uppercase tracking-widest text-[#F4A863]">
              {item.aspect}
            </span>
          </motion.div>

          {/* Two columns: Traditional | VS | FACE Prep */}
          <div className="grid grid-cols-[1fr_auto_1fr]">

            {/* Traditional — slides in from left */}
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, ease: "easeOut" as const, delay: 0.15 + i * 0.08 }}
              className="p-4 flex flex-col items-center justify-center gap-2 text-center"
            >
              <motion.div
                initial={{ rotate: -90, opacity: 0 }}
                whileInView={{ rotate: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring" as const, stiffness: 400, damping: 20, delay: 0.2 + i * 0.08 }}
              >
                <XCircle size={16} className="text-red-400/60" />
              </motion.div>
              <p className="text-[#DADADA]/55 text-xs leading-snug">{item.bad}</p>
            </motion.div>

            {/* VS divider — pops in */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ type: "spring" as const, stiffness: 300, damping: 20, delay: 0.2 + i * 0.08 }}
              className="flex flex-col items-center justify-center py-4 px-1 gap-1"
            >
              <div className="w-[1px] flex-1 bg-white/10" />
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#D528A2] to-[#F4A863] flex items-center justify-center shadow-[0_0_10px_rgba(213,40,162,0.4)]">
                <span className="text-[7px] font-black text-white">VS</span>
              </div>
              <div className="w-[1px] flex-1 bg-white/10" />
            </motion.div>

            {/* FACE Prep — slides in from right */}
            <motion.div
              initial={{ opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, ease: "easeOut" as const, delay: 0.25 + i * 0.08 }}
              className="p-4 flex flex-col items-center justify-center gap-2 text-center"
              style={{ background: "rgba(213,40,162,0.06)" }}
            >
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring" as const, stiffness: 400, damping: 18, delay: 0.3 + i * 0.08 }}
              >
                <CheckCircle2 size={16} className="text-[#D528A2]" />
              </motion.div>
              <p className="text-white text-xs font-semibold leading-snug">{item.good}</p>
            </motion.div>

          </div>
        </motion.div>
      ))}

      {/* Column labels */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="grid grid-cols-[1fr_auto_1fr] px-1 mt-1"
      >
        <p className="text-[#DADADA]/30 text-[9px] font-bold uppercase tracking-wider text-center">Traditional</p>
        <div className="w-8" />
        <p className="gradient-text text-[9px] font-bold uppercase tracking-wider text-center">FACE Prep</p>
      </motion.div>
    </div>
  );
}
