"use client";

import React from "react";
import { ArrowRight, CheckCircle2, XCircle, Clock, Zap, Cpu } from "lucide-react";
import { motion } from "framer-motion";

export default function BeforeAfterFlow() {
  const manualSteps = [
    "Customer sends email inquiry",
    "Support rep manually reads email (20 mins delay)",
    "Rep copy-pastes data into CRM spreadsheet",
    "Rep hand-crafts reply & sends email",
    "Average latency: 4.2 Hours | High Error Rate",
  ];

  const automatedSteps = [
    "Customer sends email inquiry",
    "Gemini 2.5 AI parses & classifies intent (0.2s)",
    "Make.com webhook auto-syncs CRM & Stripe",
    "AI Agent sends personalized accurate response",
    "Average latency: 2.5 Seconds | 99.4% Precision",
  ];

  return (
    <section className="py-20 bg-[#09090b]/80 border-t border-[#27272a] relative">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Process Mapping</span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Before vs After <span className="text-gradient">Workflow Architecture</span>
          </h2>
          <p className="text-sm text-[#a1a1aa] font-medium leading-relaxed">
            Side-by-side comparison of legacy manual operations versus autonomous AI pipeline execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Manual Workflow */}
          <div className="rounded-3xl bg-[#18181b] border border-rose-500/30 p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#27272a] pb-4">
              <div className="flex items-center gap-2">
                <XCircle className="w-5 h-5 text-rose-400" />
                <h3 className="font-bold text-lg text-white">Before: Manual Workflow</h3>
              </div>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30">
                High Friction
              </span>
            </div>

            <div className="space-y-3">
              {manualSteps.map((step, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-rose-950/20 border border-rose-500/20 text-xs text-[#a1a1aa] flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg bg-rose-500/20 text-rose-400 font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span className="font-medium text-slate-300">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Automated Workflow */}
          <div className="rounded-3xl bg-[#18181b] border border-emerald-500/30 p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#27272a] pb-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-lg text-white">After: AutoFlow AI Pipeline</h3>
              </div>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Autonomous
              </span>
            </div>

            <div className="space-y-3">
              {automatedSteps.map((step, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 text-xs text-white flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span className="font-semibold text-slate-200">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
