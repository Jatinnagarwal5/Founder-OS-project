"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import CompetitorTable from "@/components/CompetitorTable";

export default function CompetitorsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col">
      <Navbar onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)} />

      <div className="flex flex-1">
        <Sidebar mobileOpen={mobileMenuOpen} onCloseMobile={() => setMobileMenuOpen(false)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-y-auto">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Competitor Intelligence & Market Gaps
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Benchmarking vs incumbents and identifying defensible moats
            </p>
          </div>

          <CompetitorTable />
        </main>
      </div>
    </div>
  );
}
