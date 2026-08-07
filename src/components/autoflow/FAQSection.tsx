"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does AutoFlow AI analyze manual business workflows?",
      a: "AutoFlow AI uses Gemini 2.5 Flash trained on thousands of workflow engineering blueprints. It breaks down manual inputs, calculates administrative time spent, identifies error rates, and designs automated 3-tier pipelines using tools like Make.com, n8n, and OpenAI.",
    },
    {
      q: "Can I connect my existing tools like Stripe, HubSpot, or Zendesk?",
      a: "Yes! AutoFlow AI generates native API webhook configurations for Make.com, Zapier, n8n, Stripe, HubSpot, Salesforce, and Zendesk.",
    },
    {
      q: "How accurate is the financial ROI calculator?",
      a: "Our ROI calculator computes exact wage costs based on team size, hourly employee rates, and task automation feasibility percentages derived from real-world B2B benchmark data.",
    },
    {
      q: "Is our business data secure and confidential?",
      a: "All data processing is server-side encrypted. Secrets and API keys are never exposed in client UI code or network payloads.",
    },
  ];

  return (
    <section id="faq" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Got Questions?</span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-sm text-[#a1a1aa] font-medium leading-relaxed">
            Everything you need to know about AutoFlow AI automation analysis.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#18181b] border border-[#27272a] overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-white hover:text-purple-300 transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-5 h-5 text-purple-400 shrink-0" /> : <ChevronDown className="w-5 h-5 text-[#a1a1aa] shrink-0" />}
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-5 pb-5 pt-1 text-xs text-[#a1a1aa] leading-relaxed border-t border-[#27272a]/50"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
