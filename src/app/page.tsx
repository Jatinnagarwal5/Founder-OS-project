"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useStartup } from "@/context/StartupContext";
import { Rocket, Sparkles, ArrowRight, Shield, Zap, Cpu, BarChart3, Bot, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function LandingPage() {
  const router = useRouter();
  const { analyzeIdea, isAnalyzing } = useStartup();
  const [ideaInput, setIdeaInput] = useState("");

  const sampleIdeas = [
    "AI WhatsApp Notification Router",
    "Autonomous B2B Invoice Recovery Agent",
    "Developer API Key Leak Protection SaaS",
    "Micro-SaaS Founder Financial Copilot",
  ];

  const handleGenerate = async (ideaToUse = ideaInput) => {
    if (!ideaToUse.trim()) return;
    await analyzeIdea(ideaToUse);
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-white flex flex-col justify-between relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-gradient-to-tr from-blue-600/20 via-purple-600/20 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-gradient-to-br from-indigo-600/20 via-emerald-600/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

      {/* Top Navigation Header */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-500 p-0.5 shadow-xl">
            <div className="w-full h-full bg-[#070b14] rounded-[14px] flex items-center justify-center">
              <Rocket className="w-5 h-5 text-blue-400" />
            </div>
          </div>
          <span className="font-extrabold text-xl tracking-tight text-white">FounderOS</span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/dashboard")}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
          >
            Launch Live Demo
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="w-full max-w-5xl mx-auto px-6 py-12 lg:py-20 z-10 text-center flex flex-col items-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold mb-8 backdrop-blur-md shadow-lg"
        >
          <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
          <span>Hackathon Edition • Gemini 2.5 Flash Telemetry</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white mb-6 leading-tight"
        >
          Founder<span className="text-gradient">OS</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg sm:text-2xl text-slate-300 max-w-2xl font-medium leading-relaxed mb-10"
        >
          "Your AI Co-Founder for Building Better Startups."
        </motion.p>

        {/* Input Box & Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="w-full max-w-2xl glass-card p-2 sm:p-3 border border-white/15 shadow-2xl space-y-3 mb-8"
        >
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <input
              type="text"
              value={ideaInput}
              onChange={(e) => setIdeaInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
              placeholder="Describe your startup idea... (e.g. AI WhatsApp Notification Router)"
              className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
            />
            <button
              onClick={() => handleGenerate()}
              disabled={isAnalyzing || !ideaInput.trim()}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold text-sm hover:opacity-95 disabled:opacity-50 transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 shrink-0"
            >
              {isAnalyzing ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span>Generating OS...</span>
                </>
              ) : (
                <>
                  <span>Generate OS</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {/* Sample Prompts */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 border-t border-white/5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Try Example:</span>
            {sampleIdeas.map((idea, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setIdeaInput(idea);
                  handleGenerate(idea);
                }}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all"
              >
                {idea}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl pt-8">
          <div className="glass-card p-5 border border-white/10 text-left space-y-2">
            <div className="w-8 h-8 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-2">
              <BarChart3 className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sm text-white">Financial & Health Telemetry</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Track MRR, Burn Rate, Runway & Founder Health Score (0-100) in real-time.
            </p>
          </div>

          <div className="glass-card p-5 border border-white/10 text-left space-y-2">
            <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-2">
              <Bot className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sm text-white">4 Specialized AI Agents</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Consult CEO, CMO, Investor VC, and VP Product persona advisors anytime.
            </p>
          </div>

          <div className="glass-card p-5 border border-white/10 text-left space-y-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-2">
              <Zap className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sm text-white">Decision & Deck Simulator</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Simulate strategic options side-by-side and export 8-slide pitch decks.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-6 border-t border-white/10 text-center text-xs text-slate-400 z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span>© 2026 FounderOS Inc. Powered by Gemini 2.5 Flash</span>
        <div className="flex items-center gap-6">
          <span className="hover:text-white cursor-pointer">Linear & Notion Aesthetic</span>
          <span className="hover:text-white cursor-pointer">Stripe Dashboard UX</span>
          <span className="hover:text-white cursor-pointer">Vercel Performance</span>
        </div>
      </footer>
    </div>
  );
}
