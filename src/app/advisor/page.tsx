"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import AIChatPanel from "@/components/AIChatPanel";

export default function AdvisorPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col">
      <Navbar onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)} />

      <div className="flex flex-1">
        <Sidebar mobileOpen={mobileMenuOpen} onCloseMobile={() => setMobileMenuOpen(false)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-y-auto">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              AI Founder Advisor Suite
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Interactive multi-agent decision consultation powered by Gemini 2.5 Flash
            </p>
          </div>

          <AIChatPanel />
        </main>
      </div>
    </div>
  );
}
