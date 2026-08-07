"use client";

import React, { useState } from "react";
import { Sparkles, Zap, Clock, DollarSign, CheckCircle2, AlertOctagon, Cpu, ArrowRight, Layers } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AnalysisResult {
  companyName: string;
  automationScore: number;
  priorityLevel: string;
  estimatedImplementationEffort: string;
  weeklyHoursSaved: number;
  monthlyFinancialSavings: number;
  annualSavings: number;
  roiPercentage: number;
  productivityIncreasePercent: number;
  repetitiveTasks: string[];
  bottlenecks: string[];
  automationOpportunities: string[];
  recommendedStack: Array<{ name: string; purpose: string; cost: string }>;
  implementationRoadmap: Array<{ week: string; title: string; description: string }>;
}

export default function WorkflowAnalyzer() {
  const [companyName, setCompanyName] = useState("NexusTech AI");
  const [industry, setIndustry] = useState("B2B SaaS / Enterprise");
  const [teamSize, setTeamSize] = useState(12);
  const [department, setDepartment] = useState("Customer Support & Ops");
  const [currentWorkflow, setCurrentWorkflow] = useState("Manual email routing, copy-pasting customer inquiries into CRM spreadsheets, and hand-crafting status emails.");
  const [timeSpentHours, setTimeSpentHours] = useState(25);
  const [hourlyCost, setHourlyCost] = useState(45);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/autoflow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName,
          industry,
          teamSize,
          department,
          currentWorkflow,
          timeSpentHours,
          hourlyCost,
        }),
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
    <section id="analyzer" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Interactive AI Engine</span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            AI Workflow <span className="text-gradient">Automation Analyzer</span>
          </h2>
          <p className="text-sm text-[#a1a1aa] font-medium leading-relaxed">
            Input your team's current manual workflow and receive an immediate AI diagnostic with automation score, ROI metrics, and recommended tool stack.
          </p>
        </div>

        {/* Form Input Card */}
        <div className="rounded-3xl bg-[#18181b] border border-[#27272a] p-6 sm:p-8 shadow-2xl space-y-6">
          <form onSubmit={handleAnalyze} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">Company Name</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#09090b] border border-[#27272a] text-xs text-white focus:outline-none focus:border-purple-500/50"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">Industry Sector</label>
                <input
                  type="text"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#09090b] border border-[#27272a] text-xs text-white focus:outline-none focus:border-purple-500/50"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">Department</label>
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#09090b] border border-[#27272a] text-xs text-white focus:outline-none focus:border-purple-500/50"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">Team Size</label>
                <input
                  type="number"
                  value={teamSize}
                  onChange={(e) => setTeamSize(parseInt(e.target.value, 10) || 1)}
                  className="w-full px-4 py-3 rounded-xl bg-[#09090b] border border-[#27272a] text-xs text-white focus:outline-none focus:border-purple-500/50"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                Current Manual Workflow Description
              </label>
              <textarea
                rows={3}
                value={currentWorkflow}
                onChange={(e) => setCurrentWorkflow(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#09090b] border border-[#27272a] text-xs text-white focus:outline-none focus:border-purple-500/50 leading-relaxed"
                placeholder="Describe what your team manually does every week..."
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Time Spent / Week ({timeSpentHours} Hours)
                </label>
                <input
                  type="range"
                  min={5}
                  max={100}
                  value={timeSpentHours}
                  onChange={(e) => setTimeSpentHours(parseInt(e.target.value, 10))}
                  className="w-full accent-purple-500 cursor-pointer"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Average Employee Hourly Cost (${hourlyCost}/hr)
                </label>
                <input
                  type="range"
                  min={20}
                  max={150}
                  value={hourlyCost}
                  onChange={(e) => setHourlyCost(parseInt(e.target.value, 10))}
                  className="w-full accent-blue-500 cursor-pointer"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-500 text-white font-bold text-sm hover:opacity-95 shadow-xl shadow-purple-500/25 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin text-purple-200" />
                  <span>Analyzing Workflow Telemetry with Gemini 2.5...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 text-purple-200" />
                  <span>Generate AI Workflow Diagnostics</span>
                </>
              )}
            </button>
          </form>

          {/* AI Diagnostic Output */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6 pt-6 border-t border-[#27272a]"
              >
                {/* Score & Priority Banner */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-950/40 to-blue-950/40 border border-purple-500/30">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">
                      Automation Score
                    </span>
                    <div className="text-3xl font-black text-white mt-1">
                      {result.automationScore}<span className="text-sm font-bold text-purple-400">/100</span>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-bold">High Feasibility</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-950/40 to-cyan-950/40 border border-blue-500/30">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">
                      Monthly Financial Savings
                    </span>
                    <div className="text-3xl font-black text-emerald-400 mt-1">
                      ${result.monthlyFinancialSavings.toLocaleString()}
                    </div>
                    <span className="text-[10px] text-slate-400 font-bold">${result.annualSavings.toLocaleString()}/yr</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-950/40 to-teal-950/40 border border-emerald-500/30">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                      Weekly Hours Reclaimed
                    </span>
                    <div className="text-3xl font-black text-white mt-1">
                      {result.weeklyHoursSaved} hrs/wk
                    </div>
                    <span className="text-[10px] text-emerald-400 font-bold">+{result.productivityIncreasePercent}% Productivity</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-950/40 to-rose-950/40 border border-amber-500/30">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                      Implementation Effort
                    </span>
                    <div className="text-base font-bold text-white mt-2 leading-tight">
                      {result.estimatedImplementationEffort}
                    </div>
                    <span className="text-[10px] text-amber-400 font-bold">{result.priorityLevel}</span>
                  </div>
                </div>

                {/* Grid of Tasks, Bottlenecks & Opportunities */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Repetitive Tasks */}
                  <div className="p-5 rounded-2xl bg-[#09090b] border border-[#27272a] space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                      <Clock className="w-4 h-4" /> Repetitive Admin Tasks
                    </h3>
                    <ul className="space-y-2">
                      {result.repetitiveTasks.map((t, idx) => (
                        <li key={idx} className="text-xs text-[#a1a1aa] flex items-start gap-2 leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bottlenecks */}
                  <div className="p-5 rounded-2xl bg-[#09090b] border border-[#27272a] space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                      <AlertOctagon className="w-4 h-4" /> Workflow Bottlenecks
                    </h3>
                    <ul className="space-y-2">
                      {result.bottlenecks.map((b, idx) => (
                        <li key={idx} className="text-xs text-[#a1a1aa] flex items-start gap-2 leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Automation Opportunities */}
                  <div className="p-5 rounded-2xl bg-[#09090b] border border-[#27272a] space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> AI Opportunities
                    </h3>
                    <ul className="space-y-2">
                      {result.automationOpportunities.map((o, idx) => (
                        <li key={idx} className="text-xs text-slate-200 flex items-start gap-2 leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                          <span>{o}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Recommended Tool Stack */}
                <div className="p-5 rounded-2xl bg-white/5 border border-[#27272a] space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
                    <Layers className="w-4 h-4" /> Recommended AI Automation Stack
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {result.recommendedStack.map((tool, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-[#09090b] border border-[#27272a] space-y-1">
                        <div className="flex justify-between items-center text-xs font-bold text-white">
                          <span>{tool.name}</span>
                          <span className="text-[10px] text-purple-300 font-mono">{tool.cost}</span>
                        </div>
                        <p className="text-[11px] text-[#a1a1aa]">{tool.purpose}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
