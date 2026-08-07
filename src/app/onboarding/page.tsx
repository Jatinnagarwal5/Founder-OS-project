"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useStartup, StrategicGoal } from "@/context/StartupContext";
import { sampleFinancialCSV } from "@/lib/csvParser";
import {
  Rocket,
  Upload,
  FileSpreadsheet,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Clock,
  DollarSign,
  Users,
  ShieldAlert,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function OnboardingPage() {
  const router = useRouter();
  const { updateStartupName, ingestCSVData, setPrimaryGoal, analyzeIdea, isAnalyzing } = useStartup();

  const [step, setStep] = useState(1);
  const [name, setName] = useState("NexusAI Router");
  const [tagline, setTagline] = useState("Autonomous AI Customer Operations & Smart Router");
  const [stage, setStage] = useState("Seed Stage");
  const [model, setModel] = useState("B2B SaaS");
  const [selectedGoal, setSelectedGoal] = useState<StrategicGoal>("Growth");
  const [csvContent, setCsvContent] = useState("");
  const [csvFileName, setCsvFileName] = useState("");

  // Step 2 Manual Inputs if not using CSV
  const [mrrInput, setMrrInput] = useState("42500");
  const [expensesInput, setExpensesInput] = useState("28900");
  const [activeUsersInput, setActiveUsersInput] = useState("1420");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCsvFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setCsvContent(text);
    };
    reader.readAsText(file);
  };

  const handleLoadSampleCSV = () => {
    setCsvContent(sampleFinancialCSV);
    setCsvFileName("stripe_financials_sample.csv");
  };

  const handleFinishOnboarding = async () => {
    updateStartupName(name, tagline);
    setPrimaryGoal(selectedGoal);

    if (csvContent) {
      ingestCSVData(csvContent);
    } else {
      await analyzeIdea(name, selectedGoal);
    }
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-white flex flex-col justify-between relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Header */}
      <header className="w-full max-w-5xl mx-auto px-6 py-6 flex items-center justify-between z-10 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 p-0.5 shadow-lg">
            <div className="w-full h-full bg-[#070b14] rounded-[10px] flex items-center justify-center">
              <Rocket className="w-4 h-4 text-blue-400" />
            </div>
          </div>
          <span className="font-extrabold text-lg text-white">FounderOS Setup</span>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
          <span>Step {step} of 4</span>
          <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>
      </header>

      {/* Main Wizard Card */}
      <main className="w-full max-w-2xl mx-auto px-6 py-12 z-10">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="glass-card p-8 border border-white/15 shadow-2xl space-y-6"
            >
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Step 1 • Profile</span>
                <h2 className="text-2xl font-extrabold text-white tracking-tight mt-1">Company Stage & Business Model</h2>
                <p className="text-xs text-slate-400">Define your startup fundamentals to calibrate AI telemetry recommendations.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Startup Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-blue-500/50"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Value Proposition Tagline</label>
                  <input
                    type="text"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-blue-500/50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Current Funding Stage</label>
                    <select
                      value={stage}
                      onChange={(e) => setStage(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#0d1424] border border-white/10 text-sm text-white focus:outline-none"
                    >
                      <option value="Pre-Seed">Pre-Seed ($0-$10k MRR)</option>
                      <option value="Seed Stage">Seed Stage ($10k-$50k MRR)</option>
                      <option value="Series A">Series A ($50k-$200k MRR)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Business Model</label>
                    <select
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#0d1424] border border-white/10 text-sm text-white focus:outline-none"
                    >
                      <option value="B2B SaaS">B2B SaaS / Enterprise</option>
                      <option value="B2C Subscription">B2C Subscription</option>
                      <option value="Marketplace">API & Usage Based</option>
                    </select>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 font-bold text-sm text-white hover:opacity-95 shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
              >
                <span>Continue to Financial Telemetry</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="glass-card p-8 border border-white/15 shadow-2xl space-y-6"
            >
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Step 2 • Telemetry Ingestion</span>
                <h2 className="text-2xl font-extrabold text-white tracking-tight mt-1">Connect Financial Data or Upload CSV</h2>
                <p className="text-xs text-slate-400">Upload your Stripe or accounting CSV export to calculate real MRR, burn rate, and runway.</p>
              </div>

              {/* Upload Box */}
              <div className="border-2 border-dashed border-white/20 rounded-2xl p-6 text-center space-y-3 bg-white/5 hover:bg-white/10 transition-all">
                <FileSpreadsheet className="w-8 h-8 text-purple-400 mx-auto" />
                <div>
                  <label htmlFor="csvUpload" className="cursor-pointer text-sm font-bold text-blue-400 hover:underline">
                    Upload Financial CSV File
                  </label>
                  <input id="csvUpload" type="file" accept=".csv" onChange={handleFileUpload} className="hidden" />
                  <p className="text-[11px] text-slate-400 mt-1">Accepts CSV with Revenue, Expenses, Active Customers</p>
                </div>

                {csvFileName ? (
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Loaded: {csvFileName}</span>
                  </div>
                ) : (
                  <button
                    onClick={handleLoadSampleCSV}
                    className="text-xs px-3 py-1.5 rounded-lg bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all"
                  >
                    Load Sample Financial CSV
                  </button>
                )}
              </div>

              <div className="flex items-center gap-4 text-xs text-slate-400">
                <div className="h-px bg-white/10 flex-1" />
                <span>OR ENTER MANUALLY</span>
                <div className="h-px bg-white/10 flex-1" />
              </div>

              <div className="grid grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1">Current MRR ($)</label>
                  <input
                    type="number"
                    value={mrrInput}
                    onChange={(e) => setMrrInput(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-bold"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Monthly Expenses ($)</label>
                  <input
                    type="number"
                    value={expensesInput}
                    onChange={(e) => setExpensesInput(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-bold"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Active Customers</label>
                  <input
                    type="number"
                    value={activeUsersInput}
                    onChange={(e) => setActiveUsersInput(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-bold"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="w-1/3 py-3.5 rounded-xl bg-white/5 border border-white/10 font-bold text-xs text-slate-300 hover:text-white"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="w-2/3 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 font-bold text-sm text-white hover:opacity-95 shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
                >
                  <span>Select Primary Strategic Goal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="glass-card p-8 border border-white/15 shadow-2xl space-y-6"
            >
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Step 3 • Strategic Focus</span>
                <h2 className="text-2xl font-extrabold text-white tracking-tight mt-1">Select Primary Founder Goal</h2>
                <p className="text-xs text-slate-400">AI will prioritize weekly actions matching your exact primary objective.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { id: "Growth" as StrategicGoal, title: "Accelerate Revenue Growth", desc: "Optimize CAC, pricing tiers, and customer acquisition loops.", icon: TrendingUp, color: "text-blue-400 border-blue-500/40 bg-blue-950/30" },
                  { id: "Runway" as StrategicGoal, title: "Extend Cash Runway", desc: "Reduce burn rate, cut software bloat, and achieve default alive.", icon: Clock, color: "text-amber-400 border-amber-500/40 bg-amber-950/30" },
                  { id: "Fundraising" as StrategicGoal, title: "Prepare for Fundraising", desc: "Build YC-style pitch deck, unit economics memo, and investor metrics.", icon: DollarSign, color: "text-purple-400 border-purple-500/40 bg-purple-950/30" },
                  { id: "Retention" as StrategicGoal, title: "Maximize Customer Retention", desc: "Reduce churn below 2%, increase LTV, and improve onboarding velocity.", icon: Users, color: "text-emerald-400 border-emerald-500/40 bg-emerald-950/30" },
                ].map((g) => {
                  const Icon = g.icon;
                  const isSelected = selectedGoal === g.id;
                  return (
                    <div
                      key={g.id}
                      onClick={() => setSelectedGoal(g.id)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer space-y-2 ${
                        isSelected ? g.color + " shadow-lg" : "bg-white/5 border-white/10 hover:bg-white/10"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <Icon className="w-5 h-5" />
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                      </div>
                      <h3 className="font-bold text-sm text-white">{g.title}</h3>
                      <p className="text-[11px] text-slate-400 leading-snug">{g.desc}</p>
                    </div>
                  );
                })}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(2)}
                  className="w-1/3 py-3.5 rounded-xl bg-white/5 border border-white/10 font-bold text-xs text-slate-300 hover:text-white"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="w-2/3 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 font-bold text-sm text-white hover:opacity-95 shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
                >
                  <span>Generate Operating Plan</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="glass-card p-8 border border-white/15 shadow-2xl space-y-6 text-center"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-500 p-0.5 mx-auto shadow-xl">
                <div className="w-full h-full bg-[#070b14] rounded-[14px] flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-purple-400 animate-pulse" />
                </div>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Step 4 • Ready</span>
                <h2 className="text-2xl font-extrabold text-white tracking-tight mt-1">AI Operating Plan Generated</h2>
                <p className="text-xs text-slate-300 max-w-md mx-auto mt-2">
                  Calibrated for <span className="text-blue-400 font-bold">{name}</span> targeting <span className="text-emerald-400 font-bold">{selectedGoal}</span> using live telemetry metrics.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-left space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Primary Objective:</span>
                  <span className="font-bold text-emerald-400">{selectedGoal} Priority</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Telemetry Data Source:</span>
                  <span className="font-bold text-blue-400">{csvFileName ? `CSV (${csvFileName})` : "Manual Entry Baseline"}</span>
                </div>
              </div>

              <button
                onClick={handleFinishOnboarding}
                disabled={isAnalyzing}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 font-bold text-sm text-white hover:opacity-95 shadow-xl shadow-blue-500/25 flex items-center justify-center gap-2"
              >
                {isAnalyzing ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>Calibrating Dashboard Telemetry...</span>
                  </>
                ) : (
                  <>
                    <span>Launch Executive Telemetry Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
