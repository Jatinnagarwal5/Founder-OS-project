"use client";

import React from "react";
import { useStartup } from "@/context/StartupContext";
import { Activity, ShieldCheck, AlertTriangle, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function StartupScoreCard() {
  const { startupData } = useStartup();
  const { healthScore, healthStatus, scores } = startupData;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Healthy":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/40";
      case "Warning":
        return "bg-amber-500/20 text-amber-400 border-amber-500/40";
      default:
        return "bg-rose-500/20 text-rose-400 border-rose-500/40";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Healthy":
        return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
      case "Warning":
        return <AlertTriangle className="w-4 h-4 text-amber-400" />;
      default:
        return <Activity className="w-4 h-4 text-rose-400" />;
    }
  };

  const categories = [
    { label: "Market Opportunity", score: scores.market, color: "from-blue-500 to-indigo-500" },
    { label: "Technology Architecture", score: scores.technology, color: "from-purple-500 to-indigo-500" },
    { label: "Product & UX Velocity", score: scores.product, color: "from-emerald-500 to-teal-500" },
    { label: "Financial Runway & Margin", score: scores.finance, color: "from-amber-500 to-orange-500" },
    { label: "Execution Capability", score: scores.execution, color: "from-sky-500 to-blue-600" },
  ];

  return (
    <div className="glass-card p-6 border border-white/10 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="w-5 h-5 text-blue-400" />
            <h2 className="text-lg font-bold text-white tracking-tight">Startup Telemetry Score</h2>
          </div>
          <p className="text-xs text-slate-400">Autonomous AI operational health measurement</p>
        </div>

        {/* Overall Score Badge */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400">Health Index</span>
            <span className="text-2xl font-black text-white">{healthScore}/100</span>
          </div>

          <div
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 shadow-md ${getStatusColor(
              healthStatus
            )}`}
          >
            {getStatusIcon(healthStatus)}
            <span>{healthStatus}</span>
          </div>
        </div>
      </div>

      {/* Progress Bars Matrix */}
      <div className="space-y-4">
        {categories.map((cat, idx) => (
          <div key={idx} className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-300">{cat.label}</span>
              <span className="font-bold text-white">{cat.score}%</span>
            </div>
            <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${cat.score}%` }}
                transition={{ duration: 1, delay: idx * 0.1, ease: "easeOut" }}
                className={`h-full bg-gradient-to-r ${cat.color} rounded-full shadow-sm`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
