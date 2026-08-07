"use client";

import React, { useState } from "react";
import { Calculator, DollarSign, Clock, TrendingUp, Sparkles, PieChart as PieIcon } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function ROICalculator() {
  const [teamSize, setTeamSize] = useState(10);
  const [hoursPerWeek, setHoursPerWeek] = useState(20);
  const [hourlyRate, setHourlyRate] = useState(50);
  const [automationEfficiency, setAutomationEfficiency] = useState(75);

  // Calculations
  const totalWeeklyHours = teamSize * hoursPerWeek;
  const hoursSavedPerWeek = Math.round(totalWeeklyHours * (automationEfficiency / 100));
  const monthlyHoursSaved = hoursSavedPerWeek * 4.3;
  const monthlySavingsUSD = Math.round(monthlyHoursSaved * hourlyRate);
  const annualSavingsUSD = monthlySavingsUSD * 12;

  const estimatedImplementationCost = 2500;
  const roiPercentage = Math.round(((annualSavingsUSD - estimatedImplementationCost) / estimatedImplementationCost) * 100);
  const paybackPeriodMonths = ((estimatedImplementationCost / monthlySavingsUSD) || 0.5).toFixed(1);

  const chartData = [
    { month: "Mo 1", manual: Math.round(monthlySavingsUSD * 0.2), automated: monthlySavingsUSD },
    { month: "Mo 3", manual: Math.round(monthlySavingsUSD * 0.6), automated: monthlySavingsUSD * 3 },
    { month: "Mo 6", manual: monthlySavingsUSD, automated: monthlySavingsUSD * 6 },
    { month: "Mo 9", manual: Math.round(monthlySavingsUSD * 1.5), automated: monthlySavingsUSD * 9 },
    { month: "Mo 12", manual: Math.round(monthlySavingsUSD * 2.0), automated: annualSavingsUSD },
  ];

  return (
    <section id="roi-calculator" className="py-20 bg-[#09090b]/80 border-t border-[#27272a] relative">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Financial Telemetry</span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Interactive <span className="text-gradient">Automation ROI Calculator</span>
          </h2>
          <p className="text-sm text-[#a1a1aa] font-medium leading-relaxed">
            Drag the sliders below to calculate your startup's exact hours saved, annual capital preserved, and payback timeline.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sliders Box */}
          <div className="lg:col-span-5 rounded-3xl bg-[#18181b] border border-[#27272a] p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center gap-2 border-b border-[#27272a] pb-3">
              <Calculator className="w-5 h-5 text-emerald-400" />
              <h3 className="font-bold text-base text-white">ROI Parameter Controls</h3>
            </div>

            <div className="space-y-5">
              <div>
                <div className="flex justify-between items-center text-xs font-semibold mb-2">
                  <span className="text-slate-300">Team Size ({teamSize} Employees)</span>
                  <span className="text-emerald-400 font-bold">{teamSize} FTEs</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={100}
                  value={teamSize}
                  onChange={(e) => setTeamSize(parseInt(e.target.value, 10))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between items-center text-xs font-semibold mb-2">
                  <span className="text-slate-300">Manual Hours / Employee / Wk ({hoursPerWeek} hrs)</span>
                  <span className="text-blue-400 font-bold">{hoursPerWeek} hrs</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={40}
                  value={hoursPerWeek}
                  onChange={(e) => setHoursPerWeek(parseInt(e.target.value, 10))}
                  className="w-full accent-blue-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between items-center text-xs font-semibold mb-2">
                  <span className="text-slate-300">Average Hourly Employee Rate (${hourlyRate}/hr)</span>
                  <span className="text-purple-400 font-bold">${hourlyRate}/hr</span>
                </div>
                <input
                  type="range"
                  min={25}
                  max={200}
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(parseInt(e.target.value, 10))}
                  className="w-full accent-purple-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between items-center text-xs font-semibold mb-2">
                  <span className="text-slate-300">AI Automation Target Efficiency ({automationEfficiency}%)</span>
                  <span className="text-emerald-400 font-bold">{automationEfficiency}%</span>
                </div>
                <input
                  type="range"
                  min={40}
                  max={95}
                  value={automationEfficiency}
                  onChange={(e) => setAutomationEfficiency(parseInt(e.target.value, 10))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Result Cards & Recharts Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-[#18181b] border border-[#27272a]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Hours Saved / Wk</span>
                <div className="text-2xl font-black text-white mt-1">{hoursSavedPerWeek} hrs</div>
                <span className="text-[10px] text-emerald-400 font-semibold">{Math.round(monthlyHoursSaved)} hrs/mo</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#18181b] border border-[#27272a]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Monthly Savings</span>
                <div className="text-2xl font-black text-emerald-400 mt-1">${monthlySavingsUSD.toLocaleString()}</div>
                <span className="text-[10px] text-slate-400 font-semibold">Preserved cash</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#18181b] border border-[#27272a]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">Annual Value</span>
                <div className="text-2xl font-black text-purple-400 mt-1">${annualSavingsUSD.toLocaleString()}</div>
                <span className="text-[10px] text-purple-300 font-semibold">Year 1 Net ROI</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#18181b] border border-[#27272a]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">Payback Window</span>
                <div className="text-2xl font-black text-white mt-1">{paybackPeriodMonths} Mo</div>
                <span className="text-[10px] text-blue-400 font-semibold">{roiPercentage}% ROI</span>
              </div>
            </div>

            {/* Recharts Financial Curve */}
            <div className="rounded-3xl bg-[#18181b] border border-[#27272a] p-6 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-white">Cumulative Capital Preserved Curve</h4>
                  <p className="text-xs text-[#a1a1aa]">12-Month projection comparing manual vs AI automated flow</p>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  +${annualSavingsUSD.toLocaleString()}
                </span>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="roiGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                    <XAxis dataKey="month" stroke="#a1a1aa" fontSize={11} />
                    <YAxis stroke="#a1a1aa" fontSize={11} tickFormatter={(v) => `$${v / 1000}k`} />
                    <Tooltip contentStyle={{ backgroundColor: "#09090b", borderColor: "#27272a", borderRadius: "12px", fontSize: "12px" }} />
                    <Area type="monotone" dataKey="automated" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#roiGrad)" name="Capital Preserved ($)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
