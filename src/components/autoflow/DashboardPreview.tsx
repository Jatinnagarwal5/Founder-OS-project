"use client";

import React from "react";
import { Activity, ShieldCheck, Zap, Sparkles, TrendingUp, Layers, CheckCircle2 } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function DashboardPreview() {
  const chartData = [
    { category: "Support", hours: 45, savings: 2400 },
    { category: "CRM Data", hours: 35, savings: 1900 },
    { category: "Billing", hours: 28, savings: 1500 },
    { category: "Outbound", hours: 22, savings: 1200 },
  ];

  return (
    <section id="dashboard-preview" className="py-20 bg-[#09090b]/80 border-t border-[#27272a] relative">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Executive Console</span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            AI Automation <span className="text-gradient">Dashboard Telemetry</span>
          </h2>
          <p className="text-sm text-[#a1a1aa] font-medium leading-relaxed">
            Real-time telemetry measuring Automation Readiness, Productivity Score, Cost Reduction, and Active AI Pipelines.
          </p>
        </div>

        <div className="rounded-3xl bg-[#18181b] border border-[#27272a] p-6 sm:p-8 space-y-6 shadow-2xl">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#27272a] pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-bold text-emerald-400">Live Telemetry Synchronized</span>
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight mt-1">Acme SaaS Automation Engine</h3>
            </div>
            <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30">
              Gemini 2.5 Active
            </span>
          </div>

          {/* 4 Score Widgets */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-[#09090b] border border-[#27272a]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Automation Readiness</span>
              <div className="text-3xl font-black text-white mt-1">94<span className="text-sm text-purple-400 font-bold">/100</span></div>
              <span className="text-[10px] text-emerald-400 font-semibold">Optimal Architecture</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#09090b] border border-[#27272a]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Annual Cost Reduction</span>
              <div className="text-3xl font-black text-emerald-400 mt-1">$142,000</div>
              <span className="text-[10px] text-slate-400 font-semibold">Preserved Capital</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#09090b] border border-[#27272a]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">Productivity Boost</span>
              <div className="text-3xl font-black text-purple-400 mt-1">+68%</div>
              <span className="text-[10px] text-purple-300 font-semibold">Speed to Resolution</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#09090b] border border-[#27272a]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">Active Recommendations</span>
              <div className="text-3xl font-black text-white mt-1">8 Active</div>
              <span className="text-[10px] text-blue-400 font-semibold">3 Quick Wins Ready</span>
            </div>
          </div>

          {/* Recharts Department Breakdown */}
          <div className="p-5 rounded-2xl bg-[#09090b] border border-[#27272a] space-y-4">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">
              Department Hours Reclaimed Comparison
            </h4>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                  <XAxis dataKey="category" stroke="#a1a1aa" fontSize={11} />
                  <YAxis stroke="#a1a1aa" fontSize={11} />
                  <Tooltip contentStyle={{ backgroundColor: "#09090b", borderColor: "#27272a", borderRadius: "12px", fontSize: "12px" }} />
                  <Bar dataKey="hours" fill="#8b5cf6" radius={[6, 6, 0, 0]} name="Hours Saved / Month" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
