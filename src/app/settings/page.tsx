"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import ThemeToggle from "@/components/ThemeToggle";
import { useStartup } from "@/context/StartupContext";
import { Building, User, Key, ShieldCheck, Sparkles, Check } from "lucide-react";

export default function SettingsPage() {
  const { startupData, updateStartupName, dataSource, lastUpdated } = useStartup();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [startupName, setStartupName] = useState(startupData.name);
  const [tagline, setTagline] = useState(startupData.tagline);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateStartupName(startupName, tagline);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col">
      <Navbar onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)} />

      <div className="flex flex-1">
        <Sidebar mobileOpen={mobileMenuOpen} onCloseMobile={() => setMobileMenuOpen(false)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 overflow-y-auto max-w-5xl">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              System Settings & Data Provenance
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Configure startup profile, user credentials, data provenance, and server environment keys
            </p>
          </div>

          {saved && (
            <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Startup Profile Configuration Saved!</span>
            </div>
          )}

          {/* Startup Profile Settings */}
          <div className="glass-card p-6 border border-white/10 space-y-4">
            <div className="flex items-center gap-2 border-b border-white/10 pb-3">
              <Building className="w-4 h-4 text-blue-400" />
              <h2 className="font-bold text-base text-white">Startup Profile</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400">Startup Name</label>
                <input
                  type="text"
                  value={startupName}
                  onChange={(e) => setStartupName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-xs text-white focus:outline-none focus:border-blue-500/50"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400">Value Proposition Tagline</label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-xs text-white focus:outline-none focus:border-blue-500/50"
                />
              </div>
            </div>
          </div>

          {/* Data Provenance & Freshness Info */}
          <div className="glass-card p-6 border border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <h2 className="font-bold text-base text-white">Data Provenance & Freshness</h2>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                Verified Active
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-slate-400 font-semibold block">Active Data Ingestion Source</span>
                <span className="font-extrabold text-blue-400 text-sm">{dataSource}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-slate-400 font-semibold block">Last Telemetry Sync</span>
                <span className="font-extrabold text-white text-sm">{lastUpdated}</span>
              </div>
            </div>
          </div>

          {/* Server Security & API Keys */}
          <div className="glass-card p-6 border border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Key className="w-4 h-4 text-purple-400" />
                <h2 className="font-bold text-base text-white">Server Environment Security</h2>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-bold border border-purple-500/30">
                Server-Side Encrypted
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/30 space-y-2">
                <div className="flex items-center justify-between font-bold text-slate-200">
                  <span>Google Gemini 2.5 Flash API Key</span>
                  <span className="text-emerald-400">`.env.local` Server Only</span>
                </div>
                <p className="text-slate-400 leading-relaxed text-[11px]">
                  All API keys are securely isolated inside server environment variables. Secrets are never exposed to client-side code or browser network traffic.
                </p>
              </div>
            </div>
          </div>

          {/* Theme Selection */}
          <div className="glass-card p-6 border border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <h2 className="font-bold text-base text-white">Appearance Theme Selection</h2>
              </div>
              <ThemeToggle />
            </div>
            <p className="text-xs text-slate-400">
              Dark Glassmorphism Theme active by default. Light mode supported via ThemeToggle.
            </p>
          </div>

          {/* Save Button */}
          <div className="pt-2">
            <button
              onClick={handleSave}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold text-xs hover:opacity-90 shadow-lg shadow-blue-500/20 transition-all"
            >
              Save Configuration Settings
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
