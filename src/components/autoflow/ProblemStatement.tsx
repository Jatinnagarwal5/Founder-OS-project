"use client";

import React from "react";
import { AlertOctagon, Clock, Flame, ShieldAlert, Cpu } from "lucide-react";
import { motion } from "framer-motion";

export default function ProblemStatement() {
  const problems = [
    {
      icon: Clock,
      title: "30+ Hours Wasted Weekly",
      description: "Startups burn expensive engineering & ops bandwidth on manual copy-pasting, CSV reformatting, and repetitive email routing.",
      color: "text-amber-400 border-amber-500/30 bg-amber-500/10",
    },
    {
      icon: AlertOctagon,
      title: "High Error Rates & Delays",
      description: "Human fatigue leads to data input mistakes, missed customer SLAs, and average 4+ hour response delays.",
      color: "text-rose-400 border-rose-500/30 bg-rose-500/10",
    },
    {
      icon: Flame,
      title: "Hidden Operating Cost Burn",
      description: "Paying employees $45-$85/hr for repetitive admin tasks costs early-stage startups $120k+ in wasted annual runway.",
      color: "text-purple-400 border-purple-500/30 bg-purple-500/10",
    },
    {
      icon: ShieldAlert,
      title: "Blind Spot Automation Gaps",
      description: "Founders know AI exists but lack an actionable blueprint mapping which exact tools (Zapier, Make, Gemini) to combine.",
      color: "text-blue-400 border-blue-500/30 bg-blue-500/10",
    },
  ];

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-400">The Problem</span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Why Startups Burn Runway on <span className="text-gradient">Manual Friction</span>
          </h2>
          <p className="text-sm text-[#a1a1aa] font-medium leading-relaxed">
            Building a multi-million dollar startup requires relentless focus on product and growth. Yet founders remain trapped in repetitive operational busywork.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((p, idx) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                className="p-6 rounded-3xl bg-[#18181b] border border-[#27272a] hover:border-purple-500/40 transition-all space-y-4 shadow-xl"
              >
                <div className={`p-3 rounded-2xl border w-fit ${p.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight">{p.title}</h3>
                <p className="text-xs text-[#a1a1aa] leading-relaxed font-medium">{p.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
