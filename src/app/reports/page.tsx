"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useStartup } from "@/context/StartupContext";
import { exportToCSV, exportInvestorReportPDF } from "@/lib/exportUtils";
import { FileSpreadsheet, Download, FileText, Sparkles, CheckCircle2 } from "lucide-react";

export default function ReportsPage() {
  const { startupData, actionPlan } = useStartup();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [exportNotice, setExportNotice] = useState("");

  const handleExportPDF = (title: string) => {
    exportInvestorReportPDF(startupData, title);
    setExportNotice(`Generated printable PDF report for "${title}"`);
    setTimeout(() => setExportNotice(""), 3500);
  };

  const handleExportCSV = (reportType: string) => {
    let rows: Record<string, any>[] = [];

    if (reportType.includes("Financial")) {
      rows = startupData.charts.monthlyFinancials.map((m) => ({
        Month: m.month,
        Revenue_USD: m.revenue,
        Expenses_USD: m.expenses,
        Net_Profit_USD: m.profit,
      }));
    } else if (reportType.includes("Customer")) {
      rows = startupData.charts.customerGrowth.map((c) => ({
        Month: c.month,
        Active_Customers: c.active,
        New_Signups: c.newUsers,
        Churned_Customers: c.churned,
      }));
    } else {
      rows = actionPlan.map((t) => ({
        Task_ID: t.id,
        Title: t.title,
        Category: t.category,
        Priority: t.priority,
        Completed: t.completed ? "YES" : "NO",
      }));
    }

    exportToCSV(`${reportType.toLowerCase().replace(/\s+/g, "_")}_${Date.now()}.csv`, rows);
    setExportNotice(`Downloaded CSV export: ${reportType}.csv`);
    setTimeout(() => setExportNotice(""), 3500);
  };

  const reportsList = [
    {
      title: "Weekly Founder Executive Briefing",
      type: "Weekly Report",
      summary: `Data-grounded diagnostic citing MRR of $${startupData.kpis.mrr.toLocaleString()} and 14-month cash runway.`,
    },
    {
      title: "Monthly Operational Health Telemetry",
      type: "Monthly Report",
      summary: "Full financial export covering revenue trajectories, expenses, and churn metrics.",
    },
    {
      title: "Investor Update & Unit Economics Memo",
      type: "Investor Summary",
      summary: "Standardized YC-style monthly investor update containing MRR growth, churn rates, and capital asks.",
    },
    {
      title: "Startup Execution & Tasks Audit",
      type: "Task Audit",
      summary: `Export of active founder sprint action plan (${actionPlan.length} milestones tracked).`,
    },
  ];

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col">
      <Navbar onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)} />

      <div className="flex flex-1">
        <Sidebar mobileOpen={mobileMenuOpen} onCloseMobile={() => setMobileMenuOpen(false)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 overflow-y-auto">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Executive Reports & Real File Exports
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Download real CSV telemetry exports and printable PDF investor update documents
            </p>
          </div>

          {exportNotice && (
            <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{exportNotice}</span>
            </div>
          )}

          {/* Reports Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reportsList.map((rep, idx) => (
              <div key={idx} className="glass-card p-6 border border-white/10 space-y-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                      {rep.type}
                    </span>
                    <FileText className="w-4 h-4 text-slate-400" />
                  </div>
                  <h3 className="text-base font-bold text-white tracking-tight">{rep.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{rep.summary}</p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center gap-2">
                  <button
                    onClick={() => handleExportPDF(rep.title)}
                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF Report</span>
                  </button>
                  <button
                    onClick={() => handleExportCSV(rep.title)}
                    className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 font-bold text-xs transition-all flex items-center justify-center gap-1.5"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Export CSV Data</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
