"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import KPICard from "@/components/KPICard";
import { useStartup } from "@/context/StartupContext";
import { formatCurrency } from "@/lib/utils";
import { DollarSign, CreditCard, TrendingUp, Flame, Clock, FileText, CheckCircle2, AlertCircle } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function FinancePage() {
  const { startupData } = useStartup();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const pendingInvoices = [
    { id: "inv-101", client: "Acme Corp", amount: 4500, dueDate: "In 3 Days", status: "Pending" },
    { id: "inv-102", client: "Starlight SaaS", amount: 2400, dueDate: "In 7 Days", status: "Pending" },
    { id: "inv-103", client: "DevHub Inc", amount: 1500, dueDate: "Overdue 2 Days", status: "Overdue" },
  ];

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col">
      <Navbar onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)} />

      <div className="flex flex-1">
        <Sidebar mobileOpen={mobileMenuOpen} onCloseMobile={() => setMobileMenuOpen(false)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 overflow-y-auto">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Finance Telemetry & Cash Flow
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Real-time revenue, burn rate, runway, and financial health telemetry
            </p>
          </div>

          {/* Core Finance KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <KPICard
              title="Gross Revenue"
              value={formatCurrency(startupData.kpis.revenue)}
              change="+18.4%"
              isPositive={true}
              icon={DollarSign}
              subtitle="Trailing 12-month revenue"
              accentColor="blue"
            />
            <KPICard
              title="Total Operating Expenses"
              value={formatCurrency(startupData.kpis.expenses)}
              change="+6.2%"
              isPositive={false}
              icon={CreditCard}
              subtitle="Monthly OPEX expenditure"
              accentColor="amber"
            />
            <KPICard
              title="Net Profit (Monthly)"
              value={formatCurrency(13600)}
              change="+34.0%"
              isPositive={true}
              icon={TrendingUp}
              subtitle="Net positive cash flow"
              accentColor="emerald"
            />
            <KPICard
              title="Net Burn Rate"
              value={formatCurrency(startupData.kpis.burnRate)}
              change="-4.1%"
              isPositive={true}
              icon={Flame}
              subtitle="Monthly net cash burn"
              accentColor="rose"
            />
            <KPICard
              title="Cash Runway"
              value={`${startupData.kpis.runwayMonths} Months`}
              change="+2 Mo"
              isPositive={true}
              icon={Clock}
              subtitle="Solvency window at current burn"
              accentColor="purple"
            />
            <KPICard
              title="Pending Payments"
              value={formatCurrency(8400)}
              change="3 Invoices"
              isPositive={true}
              icon={FileText}
              subtitle="Accounts receivable expected"
              accentColor="blue"
            />
          </div>

          {/* Revenue vs Expenses Chart */}
          <div className="glass-card p-6 border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-white">Monthly Financial Telemetry (Recharts)</h3>
                <p className="text-xs text-slate-400">Revenue vs. Expenses trajectory over 6 months</p>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-xl bg-blue-500/10 text-blue-400 font-semibold border border-blue-500/30">
                Net Profit Positive
              </span>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={startupData.charts.monthlyFinancials}>
                  <defs>
                    <linearGradient id="finRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="finExp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                  <YAxis stroke="#64748b" fontSize={11} tickFormatter={(v) => `$${v / 1000}k`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#0d1424", borderColor: "rgba(255,255,255,0.1)", borderRadius: "12px", fontSize: "12px" }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#finRev)" name="Revenue" />
                  <Area type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#finExp)" name="Expenses" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pending Invoices Table */}
          <div className="glass-card p-6 border border-white/10 space-y-4">
            <h3 className="font-bold text-base text-white border-b border-white/10 pb-3">
              Accounts Receivable & Pending Invoices
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-[11px] uppercase tracking-wider text-slate-400 bg-white/5">
                    <th className="py-3 px-4">Invoice ID</th>
                    <th className="py-3 px-4">Client Name</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Due Date</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-300">
                  {pendingInvoices.map((inv) => (
                    <tr key={inv.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-blue-400">{inv.id}</td>
                      <td className="py-3 px-4 font-semibold text-white">{inv.client}</td>
                      <td className="py-3 px-4 font-bold text-emerald-400">{formatCurrency(inv.amount)}</td>
                      <td className="py-3 px-4 text-slate-400">{inv.dueDate}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] border ${
                            inv.status === "Pending"
                              ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                              : "bg-rose-500/20 text-rose-400 border-rose-500/30"
                          }`}
                        >
                          {inv.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
