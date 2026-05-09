"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

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

export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {faqs.map((faq, i) => (
        <div key={i} className="fp-card overflow-hidden hover:border-white/20 transition-all">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between px-8 py-6 text-left cursor-pointer"
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
          {open === i && (
            <div className="px-8 pb-6 text-[#DADADA] text-base leading-relaxed border-t border-white/10 pt-6">
              {faq.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
