"use client";

import React from "react";
import { Search, Sparkles, Rocket, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      icon: Search,
      title: "Analyze Business Processes",
      description: "Submit your team's current manual workflow, department, hours spent per week, and hourly employee cost.",
      color: "from-purple-500 to-indigo-500",
    },
    {
      step: "02",
      icon: Sparkles,
      title: "AI Detects Opportunities",
      description: "Gemini 2.5 Flash analyzes your workflow for bottlenecks, repetitive patterns, and optimal AI agent integration points.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      step: "03",
      icon: Rocket,
      title: "Generate Roadmap & ROI",
      description: "Receive a complete financial ROI breakdown, recommended AI tool stack (Make, n8n, OpenAI), and 3-week implementation timeline.",
      color: "from-emerald-500 to-teal-500",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-[#09090b]/80 border-t border-[#27272a] relative">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-16">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Step-by-step Process</span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            How AutoFlow AI <span className="text-gradient">Automates Your Startup</span>
          </h2>
          <p className="text-sm text-[#a1a1aa] font-medium leading-relaxed">
            Three simple steps to transform manual operational overhead into autonomous 24/7 AI pipelines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -6 }}
                className="relative p-8 rounded-3xl bg-[#18181b] border border-[#27272a] hover:border-purple-500/40 transition-all space-y-4 shadow-2xl flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${s.color} p-0.5 shadow-lg`}>
                      <div className="w-full h-full bg-[#18181b] rounded-[14px] flex items-center justify-center">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <span className="text-3xl font-black text-[#27272a]">{s.step}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white tracking-tight">{s.title}</h3>
                  <p className="text-xs text-[#a1a1aa] leading-relaxed font-medium">{s.description}</p>
                </div>

                {idx < steps.length - 1 && (
                  <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                    <ArrowRight className="w-6 h-6 text-purple-400/40" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
