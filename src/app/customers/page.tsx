"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import KPICard from "@/components/KPICard";
import { useStartup } from "@/context/StartupContext";
import { Users, UserPlus, RefreshCw, UserMinus, Sparkles, ArrowUpRight } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function CustomersPage() {
  const { startupData } = useStartup();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const acquisitionChannels = [
    { channel: "ProductHunt Launch", percentage: 38, signups: 70, color: "bg-purple-500" },
    { channel: "Organic SEO & Blog", percentage: 28, signups: 51, color: "bg-blue-500" },
    { channel: "LinkedIn Founder Outbound", percentage: 20, signups: 37, color: "bg-indigo-500" },
    { channel: "Direct Referral Loop", percentage: 14, signups: 26, color: "bg-emerald-500" },
  ];

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col">
      <Navbar onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)} />

      <div className="flex flex-1">
        <Sidebar mobileOpen={mobileMenuOpen} onCloseMobile={() => setMobileMenuOpen(false)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 overflow-y-auto">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Customer Analytics & Retention
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              User acquisition channels, churn monitoring, and cohort growth analytics
            </p>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KPICard
              title="Active Customers"
              value={startupData.kpis.activeCustomers.toLocaleString()}
              change="+12.5%"
              isPositive={true}
              icon={Users}
              subtitle="Total active subscribers"
              accentColor="blue"
            />
            <KPICard
              title="New Signups (MoM)"
              value={`+${startupData.kpis.newCustomers}`}
              change="+22.1%"
              isPositive={true}
              icon={UserPlus}
              subtitle="Acquired this month"
              accentColor="emerald"
            />
            <KPICard
              title="Returning / Retained"
              value="1,236"
              change="98.2%"
              isPositive={true}
              icon={RefreshCw}
              subtitle="Active repeat users"
              accentColor="purple"
            />
            <KPICard
              title="Monthly Churn Rate"
              value={`${startupData.kpis.churnRate}%`}
              change="-0.4%"
              isPositive={true}
              icon={UserMinus}
              subtitle="Benchmark top 10%"
              accentColor="amber"
            />
          </div>

          {/* Customer Growth Chart */}
          <div className="glass-card p-6 border border-white/10 space-y-4">
            <h3 className="font-bold text-base text-white">Customer Acquisition Trajectory</h3>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={startupData.charts.customerGrowth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                  <YAxis stroke="#64748b" fontSize={11} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#0d1424", borderColor: "rgba(255,255,255,0.1)", borderRadius: "12px", fontSize: "12px" }}
                  />
                  <Bar dataKey="active" fill="#3b82f6" radius={[6, 6, 0, 0]} name="Active Accounts" />
                  <Bar dataKey="newUsers" fill="#10b981" radius={[6, 6, 0, 0]} name="New Monthly Signups" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Acquisition Channels Breakdown */}
          <div className="glass-card p-6 border border-white/10 space-y-4">
            <h3 className="font-bold text-base text-white border-b border-white/10 pb-3">
              Acquisition Channel Breakdown
            </h3>

            <div className="space-y-4">
              {acquisitionChannels.map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-200">{item.channel}</span>
                    <span className="font-bold text-white">{item.percentage}% ({item.signups} signups)</span>
                  </div>
                  <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <div
                      className={`h-full ${item.color} rounded-full`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
