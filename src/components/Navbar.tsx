"use client";

import React, { useState, useEffect } from "react";
import { useStartup } from "@/context/StartupContext";
import NotificationDropdown from "./NotificationDropdown";
import ThemeToggle from "./ThemeToggle";
import { Search, Sparkles, User, ChevronDown, Rocket, Menu, X, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  onMobileMenuToggle?: () => void;
}

export default function Navbar({ onMobileMenuToggle }: NavbarProps) {
  const router = useRouter();
  const { startupData, actionPlan } = useStartup();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Keyboard shortcut ⌘K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const searchItems = [
    { title: "Executive Dashboard", category: "Core OS", href: "/dashboard" },
    { title: "AI Founder Advisor Chat", category: "AI Tools", href: "/advisor" },
    { title: "Finance Telemetry & Burn Rate", category: "Metrics", href: "/finance" },
    { title: "Customer Analytics & Churn", category: "Metrics", href: "/customers" },
    { title: "Team & Productivity Roster", category: "Team", href: "/team" },
    { title: "Competitor Intelligence Matrix", category: "AI Tools", href: "/competitors" },
    { title: "Decision Simulator Engine", category: "AI Tools", href: "/simulator" },
    { title: "Investor Pitch Deck Generator", category: "AI Tools", href: "/pitch" },
    { title: "90-Day Execution Roadmap", category: "Strategy", href: "/roadmap" },
    { title: "Daily Action Plan Checklist", category: "Tasks", href: "/action-plan" },
    { title: "Executive PDF & CSV Reports", category: "Exports", href: "/reports" },
    { title: "System Configuration & API Keys", category: "Settings", href: "/settings" },
    ...actionPlan.map((t) => ({ title: t.title, category: `Task (${t.category})`, href: "/action-plan" })),
  ];

  const filteredResults = searchQuery.trim()
    ? searchItems.filter(
        (i) =>
          i.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          i.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : searchItems.slice(0, 6);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#070b14]/80 border-b border-white/10 px-4 lg:px-8 py-3 transition-all">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile Toggle + Logo/Startup Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMobileMenuToggle}
            className="lg:hidden p-2 rounded-xl border border-white/10 bg-white/5 text-slate-300 hover:text-white"
            aria-label="Toggle Navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link href="/dashboard" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-500 p-0.5 shadow-lg group-hover:scale-105 transition-all">
              <div className="w-full h-full bg-[#070b14] rounded-[10px] flex items-center justify-center">
                <Rocket className="w-4 h-4 text-blue-400 group-hover:rotate-12 transition-transform" />
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-tight text-white">FounderOS</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 font-semibold border border-blue-500/30">
                  v2.0
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium truncate max-w-[160px]">
                {startupData.name}
              </p>
            </div>
          </Link>
        </div>

        {/* Center: Global Search Bar Trigger */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-full text-left pl-9 pr-4 py-1.5 rounded-xl border border-white/10 bg-white/5 text-xs text-slate-400 hover:text-slate-200 hover:border-white/20 transition-all flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <Search className="w-4 h-4 text-slate-400" />
                <span>Search tools, metrics, tasks...</span>
              </span>
              <div className="flex items-center gap-1 text-[10px] text-slate-500 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded">
                <span>⌘</span>
                <span>K</span>
              </div>
            </button>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/onboarding"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-semibold hover:opacity-90 shadow-md transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ingest Telemetry</span>
          </Link>

          <NotificationDropdown />
          <ThemeToggle />

          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 p-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all"
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white shadow-inner">
                SC
              </div>
              <div className="hidden xl:block text-left">
                <p className="text-xs font-semibold text-slate-200 leading-tight">Sarah Chen</p>
                <p className="text-[10px] text-slate-400">Founder & CEO</p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden xl:block" />
            </button>

            <AnimatePresence>
              {showProfileMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-48 glass-card p-2 z-50 border border-white/10 shadow-2xl"
                >
                  <div className="px-3 py-2 border-b border-white/10 mb-1">
                    <p className="text-xs font-semibold text-slate-200">Sarah Chen</p>
                    <p className="text-[10px] text-slate-400 truncate">sarah@nexusai.com</p>
                  </div>
                  <Link
                    href="/settings"
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center gap-2 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>Profile & Settings</span>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Global Interactive Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setIsSearchOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className="relative w-full max-w-xl glass-card p-4 z-10 border border-white/20 shadow-2xl space-y-4"
            >
              <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                <Search className="w-5 h-5 text-blue-400 shrink-0" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Type to search pages, metrics, tools, tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
                />
                <button onClick={() => setIsSearchOpen(false)} className="p-1 text-slate-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-1.5 max-h-80 overflow-y-auto">
                {filteredResults.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setIsSearchOpen(false);
                      router.push(item.href);
                    }}
                    className="p-3 rounded-xl hover:bg-white/10 border border-transparent hover:border-white/10 transition-all cursor-pointer flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-200">{item.title}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/5 text-slate-400">
                        {item.category}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-blue-400" />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}
