"use client";

import React, { useState } from "react";
import { FileText, Download, CheckCircle2, Sparkles, FileSpreadsheet } from "lucide-react";
import { exportToCSV, exportInvestorReportPDF } from "@/lib/exportUtils";
import { defaultStartupData } from "@/lib/mockData";

export default function ReportPreview() {
  const [downloadMsg, setDownloadMsg] = useState("");

  const handleDownloadPDF = () => {
    exportInvestorReportPDF(defaultStartupData, "Executive Automation & ROI Audit");
    setDownloadMsg("Generated printable Executive Automation PDF report.");
    setTimeout(() => setDownloadMsg(""), 3500);
  };

  const handleDownloadCSV = () => {
    const rows = [
      { Category: "Customer Support Email Parser", Weekly_Hours_Saved: 18, Annual_Savings: 42000, Feasibility: "High" },
      { Category: "B2B Invoice Payment Recovery", Weekly_Hours_Saved: 12, Annual_Savings: 31000, Feasibility: "High" },
      { Category: "Lead Scoring & CRM Webhooks", Weekly_Hours_Saved: 15, Annual_Savings: 38000, Feasibility: "High" },
    ];
    exportToCSV("AutoFlow_Executive_Automation_Report.csv", rows);
    setDownloadMsg("Downloaded AutoFlow_Executive_Automation_Report.csv");
    setTimeout(() => setDownloadMsg(""), 3500);
  };

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Executive Deliverables</span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Downloadable <span className="text-gradient">Automation Reports</span>
          </h2>
          <p className="text-sm text-[#a1a1aa] font-medium leading-relaxed">
            Generate executive automation roadmaps, financial ROI audits, and recommended tool stacks for board meetings and team handoffs.
          </p>
        </div>

        {downloadMsg && (
          <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center justify-center gap-2 max-w-xl mx-auto animate-pulse">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{downloadMsg}</span>
          </div>
        )}

        <div className="max-w-3xl mx-auto rounded-3xl bg-[#18181b] border border-[#27272a] p-8 space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#27272a] pb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">Executive Automation Audit & Blueprint</h3>
                <p className="text-xs text-[#a1a1aa]">Comprehensive 12-Page Automation Audit Document</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleDownloadPDF}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-500 text-white font-bold text-xs hover:opacity-95 shadow-md flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </button>

              <button
                onClick={handleDownloadCSV}
                className="px-4 py-2.5 rounded-xl bg-white/5 border border-[#27272a] hover:bg-white/10 text-white font-bold text-xs flex items-center gap-1.5"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-[#09090b] border border-[#27272a] space-y-1.5">
              <span className="font-bold text-white block">Executive Summary & Bottlenecks</span>
              <p className="text-[#a1a1aa] leading-relaxed">
                Identifies 35 hours/week of manual administrative friction costing $142,000 annually.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#09090b] border border-[#27272a] space-y-1.5">
              <span className="font-bold text-emerald-400 block">Recommended AI Stack</span>
              <p className="text-[#a1a1aa] leading-relaxed">
                Gemini 2.5 Flash + Make.com + HubSpot API webhooks for sub-second execution.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
