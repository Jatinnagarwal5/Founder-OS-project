"use client";

import React from "react";
import { useStartup } from "@/context/StartupContext";
import { Sword, CheckCircle, XCircle, Zap, Target } from "lucide-react";

export default function CompetitorTable() {
  const { competitors } = useStartup();

  return (
    <div className="glass-card p-6 border border-white/10 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sword className="w-5 h-5 text-purple-400" />
            <h2 className="text-lg font-bold text-white tracking-tight">Competitor Matrix & Market Gaps</h2>
          </div>
          <p className="text-xs text-slate-400">Positioning analysis and tactical unfair advantages</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs px-2.5 py-1 rounded-xl bg-purple-500/10 text-purple-300 border border-purple-500/30 font-medium">
            3 Competitors Tracked
          </span>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-[11px] uppercase tracking-wider text-slate-400 bg-white/5">
              <th className="py-3 px-4 rounded-tl-xl">Competitor</th>
              <th className="py-3 px-4">Market Share</th>
              <th className="py-3 px-4">Pricing Model</th>
              <th className="py-3 px-4">Key Strengths</th>
              <th className="py-3 px-4">Disadvantages</th>
              <th className="py-3 px-4 rounded-tr-xl">Market Gap / Our Advantage</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-xs text-slate-300">
            {competitors.map((comp, idx) => (
              <tr key={idx} className="hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 font-bold text-white flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-xs font-bold text-purple-400">
                    {comp.name.substring(0, 2)}
                  </div>
                  {comp.name}
                </td>
                <td className="py-4 px-4 font-semibold text-slate-200">{comp.marketShare}</td>
                <td className="py-4 px-4 text-slate-300 font-mono">{comp.pricing}</td>
                <td className="py-4 px-4">
                  <ul className="space-y-1">
                    {comp.pros.map((p, i) => (
                      <li key={i} className="flex items-center gap-1.5 text-[11px] text-slate-300">
                        <CheckCircle className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="py-4 px-4">
                  <ul className="space-y-1">
                    {comp.cons.map((c, i) => (
                      <li key={i} className="flex items-center gap-1.5 text-[11px] text-slate-400">
                        <XCircle className="w-3 h-3 text-rose-400 shrink-0" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="py-4 px-4">
                  <div className="space-y-2">
                    <div className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/20 text-[11px] text-rose-300">
                      <span className="font-bold flex items-center gap-1 text-rose-400 mb-0.5">
                        <Target className="w-3 h-3" /> Gap:
                      </span>
                      {comp.keyGap}
                    </div>
                    <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-300">
                      <span className="font-bold flex items-center gap-1 text-emerald-400 mb-0.5">
                        <Zap className="w-3 h-3" /> Advantage:
                      </span>
                      {comp.ourAdvantage}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
