"use client";

import React from "react";
import { Sparkles, Zap, ArrowRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="py-20 bg-[#09090b]/90 border-t border-[#27272a] relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <div className="relative rounded-3xl p-10 sm:p-14 bg-gradient-to-tr from-purple-950/60 via-blue-950/60 to-emerald-950/40 border border-purple-500/40 space-y-6 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-bold">
            <Sparkles className="w-4 h-4 text-purple-300 animate-pulse" />
            <span>Ready to Eliminate Operating Friction?</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Start Your AI Workflow <br className="hidden sm:inline" />
            <span className="text-gradient">Automation Analysis Today</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Join hundreds of YC startups saving 30+ hours per week and thousands in operational burn.
          </p>

          <div className="pt-2">
            <a
              href="#analyzer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-500 text-white font-extrabold text-sm hover:opacity-95 shadow-xl shadow-purple-500/30 transition-all"
            >
              <Zap className="w-4 h-4 text-purple-200" />
              <span>Analyze Your Workflow Now</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
