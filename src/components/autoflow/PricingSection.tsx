"use client";

import React from "react";
import { Check, Sparkles, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function PricingSection() {
  const plans = [
    {
      name: "Starter",
      price: "$49",
      period: "/month",
      description: "Ideal for pre-seed founders looking to eliminate basic email & CRM admin friction.",
      features: [
        "Up to 3 Automated Workflows",
        "Gemini 2.5 Flash Parsing",
        "Interactive ROI Calculator",
        "Basic PDF & CSV Exports",
        "Community Support",
      ],
      cta: "Start Free Analysis",
      highlighted: false,
    },
    {
      name: "Pro Growth",
      price: "$149",
      period: "/month",
      description: "For fast-scaling seed startups requiring full AI agent pipelines & continuous ROI audits.",
      features: [
        "Unlimited Workflow Diagnostics",
        "Make.com / n8n / OpenAI Webhooks",
        "Before vs After Flow Visualizer",
        "AI Consultant 24/7 Chat Suite",
        "Opportunity Impact Matrix",
        "1-Click Executive PDF Reports",
        "Priority Support",
      ],
      cta: "Get Started Now",
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "$499",
      period: "/month",
      description: "For Series A+ companies needing custom AI agent fine-tuning and dedicated SLA support.",
      features: [
        "Everything in Pro Growth",
        "Custom Gemini Model Fine-Tuning",
        "Dedicated Solutions Engineer",
        "SOC2 Compliance Reports",
        "Custom Webhook Architecture",
        "1-on-1 Quarterly Automation Audit",
      ],
      cta: "Contact Sales",
      highlighted: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-[#09090b]/80 border-t border-[#27272a] relative">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Transparent Pricing</span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Flexible Plans for <span className="text-gradient">Every Startup Stage</span>
          </h2>
          <p className="text-sm text-[#a1a1aa] font-medium leading-relaxed">
            Preserve cash runway with predictable tiered pricing. Cancel anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {plans.map((p, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6 }}
              className={`rounded-3xl p-8 flex flex-col justify-between space-y-6 shadow-2xl relative ${
                p.highlighted
                  ? "bg-gradient-to-b from-[#18181b] via-purple-950/30 to-[#18181b] border-2 border-purple-500/50 shadow-purple-500/10"
                  : "bg-[#18181b] border border-[#27272a]"
              }`}
            >
              {p.highlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-extrabold text-[10px] uppercase tracking-wider shadow-md">
                  Most Popular for YC Startups
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-xl text-white tracking-tight">{p.name}</h3>
                  <p className="text-xs text-[#a1a1aa] leading-relaxed mt-1">{p.description}</p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-white">{p.price}</span>
                  <span className="text-xs text-[#a1a1aa] font-semibold">{p.period}</span>
                </div>

                <div className="pt-4 border-t border-[#27272a] space-y-2.5">
                  {p.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-200">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href="#analyzer"
                className={`w-full py-3.5 rounded-2xl font-bold text-xs transition-all flex items-center justify-center gap-2 ${
                  p.highlighted
                    ? "bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-500 text-white shadow-lg shadow-purple-500/25 hover:opacity-95"
                    : "bg-white/10 hover:bg-white/20 border border-white/10 text-white"
                }`}
              >
                <span>{p.cta}</span>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
