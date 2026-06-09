"use client";

import { useState } from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function ContactForm() {
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
      <div className="fp-card p-10 text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle2 size={72} className="text-[#F4A863]" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">Request Received!</h3>
        <p className="text-[#DADADA] text-lg leading-relaxed">
          Our team will reach out within 24 hours with curated candidate profiles.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full px-5 py-4 rounded-lg bg-white/5 border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-[#D528A2] transition-colors text-base";
  const labelClass = "block text-base font-semibold text-white/90 mb-2";

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
        className="btn-gradient w-full mt-4 py-4 text-lg flex items-center justify-center gap-3 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span>{submitting ? "Sending Request..." : "Request Candidate Profiles"}</span>
        <ArrowRight size={20} />
      </button>
    </form>
  );
}
