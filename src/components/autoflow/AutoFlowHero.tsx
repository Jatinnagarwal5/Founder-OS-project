"use client";

import React from "react";
import { Sparkles, Play, ArrowRight, CheckCircle2, Zap, Cpu, Activity, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function AutoFlowHero() {
  return (
    <section className="relative pt-12 pb-20 overflow-hidden">
      {/* Floating Ambient Gradient Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-tr from-purple-600/20 via-blue-600/20 to-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top Announcement Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold shadow-lg"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
              <span>AutoFlow AI 2.0 • Powered by Gemini 2.5 Flash</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.08]"
            >
              Transform Manual Workflows into{" "}
              <span className="text-gradient">AI Automation</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-xl text-[#a1a1aa] font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              Stop wasting 30+ hours per week on repetitive data entry, email routing, and manual admin tasks. AutoFlow AI detects bottlenecks, calculates exact ROI, and generates production-ready automation roadmaps in seconds.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <a
                href="#analyzer"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-500 text-white font-bold text-sm hover:opacity-95 shadow-xl shadow-purple-500/25 transition-all flex items-center justify-center gap-2 group"
              >
                <Zap className="w-4 h-4 text-purple-200 group-hover:scale-125 transition-transform" />
                <span>Start Free Analysis</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#how-it-works"
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-[#18181b] hover:bg-white/10 border border-[#27272a] text-white font-bold text-sm transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 text-blue-400 fill-blue-400/20" />
                <span>Watch Interactive Demo</span>
              </a>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs text-[#a1a1aa] font-medium"
            >
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> No credit card required
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Instant ROI report
              </span>
            </motion.div>
          </div>

          {/* Right Column: AI Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-3xl bg-gradient-to-b from-[#18181b] via-[#101014] to-[#09090b] border border-[#27272a] p-6 shadow-2xl space-y-4">
              {/* Header Bar */}
              <div className="flex items-center justify-between border-b border-[#27272a] pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-xs font-bold text-[#a1a1aa] ml-2">AutoFlow Telemetry Engine</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  LIVE 99.4%
                </span>
              </div>

              {/* Mock Metrics Row */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-[#09090b] border border-[#27272a]">
                  <span className="text-[11px] text-[#a1a1aa] block font-medium">Automation Score</span>
                  <div className="text-2xl font-black text-white mt-1">94<span className="text-sm text-purple-400 font-bold">/100</span></div>
                  <div className="text-[10px] text-emerald-400 font-semibold mt-0.5">High Potential</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#09090b] border border-[#27272a]">
                  <span className="text-[11px] text-[#a1a1aa] block font-medium">Est. Monthly ROI</span>
                  <div className="text-2xl font-black text-emerald-400 mt-1">$4,850</div>
                  <div className="text-[10px] text-slate-400 font-semibold mt-0.5">140 hrs saved/mo</div>
                </div>
              </div>

              {/* Live Flow Stream Card */}
              <div className="p-4 rounded-2xl bg-purple-950/20 border border-purple-500/30 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-purple-300 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-purple-400 animate-pulse" /> Active AI Pipeline
                  </span>
                  <span className="text-[10px] text-purple-400 font-mono">0.4s latency</span>
                </div>
                <p className="text-xs text-slate-200">
                  Inbound customer emails → Gemini 2.5 classification → Make.com webhook → HubSpot & Slack alert.
                </p>
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-5 -left-5 p-3 rounded-2xl bg-[#18181b]/95 border border-[#27272a] backdrop-blur-xl shadow-2xl flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">$142,000+ Annual Savings</div>
                  <div className="text-[10px] text-[#a1a1aa]">Calculated across 500+ audits</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Animated Statistics Row */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-3xl bg-[#18181b]/60 border border-[#27272a] backdrop-blur-md">
          <div className="text-center space-y-1">
            <div className="text-2xl sm:text-3xl font-black text-white">$1.4M+</div>
            <div className="text-xs font-medium text-[#a1a1aa]">Total Financial ROI Saved</div>
          </div>
          <div className="text-center space-y-1">
            <div className="text-2xl sm:text-3xl font-black text-purple-400">85,000+</div>
            <div className="text-xs font-medium text-[#a1a1aa]">Hours Automated</div>
          </div>
          <div className="text-center space-y-1">
            <div className="text-2xl sm:text-3xl font-black text-blue-400">420%</div>
            <div className="text-xs font-medium text-[#a1a1aa]">Average Client ROI</div>
          </div>
          <div className="text-center space-y-1">
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">99.4%</div>
            <div className="text-xs font-medium text-[#a1a1aa]">Execution Precision</div>
          </div>
        </div>
      </div>
    </section>
  );
}
