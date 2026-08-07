"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import KPICard from "@/components/KPICard";
import StartupScoreCard from "@/components/StartupScoreCard";
import { useStartup } from "@/context/StartupContext";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  DollarSign,
  TrendingUp,
  Clock,
  AlertTriangle,
  Sparkles,
  CheckCircle2,
  Plus,
  ArrowRight,
  Database,
  Calendar,
  Layers,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import Link from "next/link";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const { startupData, dataSource, lastUpdated, primaryGoal, addTask } = useStartup();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [addedTasks, setAddedTasks] = useState<Record<number, boolean>>({});

  const currentDate = formatDate();

  const weeklyPriorities = [
    {
      id: 1,
      priority: "High",
      title: `Reinvest 15% of profit into LinkedIn B2B outbound for ${startupData.name}`,
      category: "Growth",
      reason: `MRR is at ${formatCurrency(startupData.kpis.mrr)} with low 1.8% churn, allowing profitable CAC expansion.`,
    },
    {
      id: 2,
      priority: "High",
      title: "Apply for Meta Direct Enterprise WhatsApp Business Account",
      category: "Product",
      reason: "2 blocked backlog tasks are delaying enterprise SLA onboarding.",
    },
    {
      id: 3,
      priority: "Medium",
      title: "Introduce annual prepay tier with 15% discount",
      category: "Finance",
      reason: `Locks in ARR upfront and extends current ${startupData.kpis.runwayMonths}-month cash runway.`,
    },
    {
      id: 4,
      priority: "Medium",
      title: "Schedule Series A Pitch prep with Sequoia Scout",
      category: "Fundraising",
      reason: "Unit economics match top seed benchmarks (84/100 Health Score).",
    },
  ];

  const handleAddPriorityToActionPlan = (p: typeof weeklyPriorities[0], idx: number) => {
    addTask(p.title, p.category, p.priority as any);
    setAddedTasks((prev) => ({ ...prev, [idx]: true }));
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col">
      <Navbar onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)} />

      <div className="flex flex-1">
        <Sidebar mobileOpen={mobileMenuOpen} onCloseMobile={() => setMobileMenuOpen(false)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 overflow-y-auto">
          {/* Top Bar: Data Source & Telemetry Provenance */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-card p-6 border border-white/10 relative overflow-hidden">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                  {currentDate}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-xs text-emerald-400 font-medium">AI Operating Review Active</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                AI Weekly Operating Review
              </h1>
              <p className="text-xs sm:text-sm text-slate-400">
                Data-driven priorities for <span className="text-blue-400 font-bold">{startupData.name}</span> • Goal:{" "}
                <span className="text-emerald-400 font-bold">{primaryGoal}</span>
              </p>
            </div>

            {/* Data Provenance Badge */}
            <div className="flex items-center gap-3">
              <div className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs space-y-0.5">
                <div className="flex items-center gap-1.5 text-slate-300 font-bold">
                  <Database className="w-3.5 h-3.5 text-purple-400" />
                  <span>{dataSource}</span>
                </div>
                <div className="text-[10px] text-slate-400">{lastUpdated}</div>
              </div>

              <Link
                href="/onboarding"
                className="px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-bold text-white transition-all"
              >
                Re-Ingest Telemetry
              </Link>
            </div>
          </div>

          {/* TOP 3 CRITICAL METRICS HERO SECTION */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 px-1">
              Top 3 Critical Founder Metrics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Metric 1: MRR */}
              <div className="glass-card p-6 border-blue-500/30 bg-blue-950/20 space-y-2 relative overflow-hidden">
                <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                  <span>Monthly Recurring Revenue</span>
                  <DollarSign className="w-4 h-4 text-blue-400" />
                </div>
                <div className="text-3xl font-black text-white tracking-tight">
                  {formatCurrency(startupData.kpis.mrr)}
                </div>
                <div className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> +14.2% MoM Growth
                </div>
                <p className="text-[11px] text-slate-400 pt-2 border-t border-white/10">
                  Annual Run Rate: {formatCurrency(startupData.kpis.mrr * 12)}
                </p>
              </div>

              {/* Metric 2: Cash Runway */}
              <div className="glass-card p-6 border-purple-500/30 bg-purple-950/20 space-y-2 relative overflow-hidden">
                <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                  <span>Cash Runway & Solvency</span>
                  <Clock className="w-4 h-4 text-purple-400" />
                </div>
                <div className="text-3xl font-black text-white tracking-tight">
                  {startupData.kpis.runwayMonths} Months
                </div>
                <div className="text-xs font-bold text-purple-300">
                  Net Burn: {formatCurrency(startupData.kpis.burnRate)}/mo
                </div>
                <p className="text-[11px] text-slate-400 pt-2 border-t border-white/10">
                  Status: Default Alive (Cash flow positive in 4 mos)
                </p>
              </div>

              {/* Metric 3: Biggest Risk / Opportunity Alert */}
              <div className="glass-card p-6 border-amber-500/30 bg-amber-950/20 space-y-2 relative overflow-hidden">
                <div className="flex items-center justify-between text-xs font-bold text-amber-400">
                  <span>Primary Risk & Opportunity</span>
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-base font-bold text-white leading-tight">
                  Finance Score at 70% (Burn Acceleration)
                </div>
                <p className="text-xs text-slate-300">
                  Upcoming hiring will accelerate burn by 22%. Re-evaluate Q3 hiring plan.
                </p>
                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
                  <span className="text-amber-300 font-bold">Action Needed</span>
                  <Link href="/simulator" className="text-blue-400 hover:underline flex items-center gap-1 font-semibold">
                    <span>Simulate Trade-off</span> <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* AI WEEKLY OPERATING REVIEW CARD */}
          <div className="glass-card p-6 border-indigo-500/30 bg-gradient-to-br from-indigo-950/40 via-purple-950/30 to-[#0d1424] space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                  <h2 className="text-lg font-bold text-white tracking-tight">AI Weekly Operating Review</h2>
                </div>
                <p className="text-xs text-slate-300">
                  Data-grounded diagnostic citing live telemetry for <span className="text-blue-400 font-bold">{startupData.name}</span>
                </p>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Gemini 2.5 Diagnostic
              </span>
            </div>

            {/* What Changed & Why Section */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400">
                Telemetry Executive Diagnosis: What Changed & Why
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                "MRR grew <strong>+14.2%</strong> to <strong>{formatCurrency(startupData.kpis.mrr)}</strong> while customer churn remained exceptionally low at <strong>{startupData.kpis.churnRate}%</strong>. Operating expenses grew by only 6.8%, accelerating net margins. However, cash runway is limited to <strong>{startupData.kpis.runwayMonths} months</strong> due to upcoming technical infrastructure scaling."
              </p>
            </div>

            {/* 3-5 Actionable Priorities for the Week */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                4 Actionable Priorities for This Week
              </h3>

              <div className="space-y-3">
                {weeklyPriorities.map((item, idx) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
                          {item.category}
                        </span>
                        <h4 className="text-xs sm:text-sm font-bold text-white">{item.title}</h4>
                      </div>
                      <p className="text-xs text-slate-400 leading-normal">{item.reason}</p>
                    </div>

                    <button
                      onClick={() => handleAddPriorityToActionPlan(item, idx)}
                      disabled={addedTasks[idx]}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                        addedTasks[idx]
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 cursor-default"
                          : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:opacity-90 shadow-md"
                      }`}
                    >
                      {addedTasks[idx] ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Added to Plan</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to Action Plan</span>
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Health Score Telemetry Breakdown */}
          <StartupScoreCard />

          {/* Revenue vs Expenses Trend Chart */}
          <div className="glass-card p-6 border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-white">Financial Telemetry Trend</h3>
                <p className="text-xs text-slate-400">Monthly revenue vs. expenses performance</p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/30">
                Source: {dataSource}
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={startupData.charts.monthlyFinancials}>
                  <defs>
                    <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                  <YAxis stroke="#64748b" fontSize={11} tickFormatter={(v) => `$${v / 1000}k`} />
                  <Tooltip contentStyle={{ backgroundColor: "#0d1424", borderColor: "rgba(255,255,255,0.1)", borderRadius: "12px", fontSize: "12px" }} />
                  <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2.5} fillOpacity={1} fill="url(#revGrad)" name="Revenue" />
                  <Area type="monotone" dataKey="expenses" stroke="#f59e0b" strokeWidth={2} strokeDasharray="4 4" name="Expenses" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
