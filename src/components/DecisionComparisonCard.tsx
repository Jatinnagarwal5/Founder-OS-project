"use client";

import React, { useState } from "react";
import { Sliders, Sparkles, CheckCircle, XCircle, AlertOctagon, TrendingUp, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";

interface ComparisonResult {
  optionA: string;
  optionB: string;
  comparison: {
    prosA: string[];
    consA: string[];
    prosB: string[];
    consB: string[];
    riskScoreA: number;
    riskScoreB: number;
    revenuePotentialA: string;
    revenuePotentialB: string;
    difficultyA: string;
    difficultyB: string;
    recommendation: string;
    confidenceScore: number;
  };
}

export default function DecisionComparisonCard() {
  const [optionA, setOptionA] = useState("India Market Focus");
  const [optionB, setOptionB] = useState("US Market Focus");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ComparisonResult | null>(null);

  const presets = [
    { a: "India Expansion", b: "USA Expansion" },
    { a: "Freemium PLG", b: "Paid Enterprise Only" },
    { a: "React Native App", b: "Flutter App" },
    { a: "B2B SaaS Model", b: "B2C Subscription" },
  ];

  const handleSimulate = async (optA = optionA, optB = optionB) => {
    setLoading(true);
    try {
      const res = await fetch("/api/simulator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ optionA: optA, optionB: optB }),
      });
      if (res.ok) {
        const json = await res.json();
        setResult(json);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card p-6 border border-white/10 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sliders className="w-5 h-5 text-blue-400" />
            <h2 className="text-lg font-bold text-white tracking-tight">AI Decision Simulator</h2>
          </div>
          <p className="text-xs text-slate-400">Evaluate strategic trade-offs with risk radar and confidence scores</p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {presets.map((p, idx) => (
            <button
              key={idx}
              onClick={() => {
                setOptionA(p.a);
                setOptionB(p.b);
                handleSimulate(p.a, p.b);
              }}
              className="text-[11px] px-2.5 py-1 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 transition-all"
            >
              {p.a} vs {p.b}
            </button>
          ))}
        </div>
      </div>

      {/* Input Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Option A</label>
          <input
            type="text"
            value={optionA}
            onChange={(e) => setOptionA(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50"
            placeholder="e.g. India Expansion"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-purple-400 uppercase tracking-wider">Option B</label>
          <input
            type="text"
            value={optionB}
            onChange={(e) => setOptionB(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50"
            placeholder="e.g. USA Expansion"
          />
        </div>
      </div>

      <button
        onClick={() => handleSimulate()}
        disabled={loading}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold text-sm hover:opacity-95 shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Sparkles className="w-4 h-4 animate-spin" />
            <span>Simulating Strategic Trade-offs...</span>
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4" />
            <span>Simulate Decision Trade-offs</span>
          </>
        )}
      </button>

      {/* Simulation Result */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 pt-4 border-t border-white/10"
        >
          {/* Executive Recommendation Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/60 to-purple-950/60 border border-blue-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> Final Executive Recommendation
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                {result.comparison.confidenceScore}% Confidence
              </span>
            </div>
            <p className="text-sm font-medium text-slate-100 leading-relaxed">
              {result.comparison.recommendation}
            </p>
          </div>

          {/* Side by Side Comparison Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Option A Box */}
            <div className="glass-card p-5 border-blue-500/30 bg-blue-950/20 space-y-4">
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <h3 className="font-extrabold text-blue-400 text-base">{result.optionA}</h3>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-500/10 text-blue-300">
                  Risk: {result.comparison.riskScoreA}/100
                </span>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> Advantages (Pros)
                </p>
                <ul className="space-y-1.5">
                  {result.comparison.prosA.map((p, i) => (
                    <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1">
                  <XCircle className="w-3.5 h-3.5" /> Risks & Drawbacks (Cons)
                </p>
                <ul className="space-y-1.5">
                  {result.comparison.consA.map((c, i) => (
                    <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-white/10 grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-slate-400 block">Revenue Potential</span>
                  <span className="font-bold text-white">{result.comparison.revenuePotentialA}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Difficulty</span>
                  <span className="font-bold text-white">{result.comparison.difficultyA}</span>
                </div>
              </div>
            </div>

            {/* Option B Box */}
            <div className="glass-card p-5 border-purple-500/30 bg-purple-950/20 space-y-4">
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <h3 className="font-extrabold text-purple-400 text-base">{result.optionB}</h3>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-purple-500/10 text-purple-300">
                  Risk: {result.comparison.riskScoreB}/100
                </span>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> Advantages (Pros)
                </p>
                <ul className="space-y-1.5">
                  {result.comparison.prosB.map((p, i) => (
                    <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1">
                  <XCircle className="w-3.5 h-3.5" /> Risks & Drawbacks (Cons)
                </p>
                <ul className="space-y-1.5">
                  {result.comparison.consB.map((c, i) => (
                    <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-white/10 grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-slate-400 block">Revenue Potential</span>
                  <span className="font-bold text-white">{result.comparison.revenuePotentialB}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Difficulty</span>
                  <span className="font-bold text-white">{result.comparison.difficultyB}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
