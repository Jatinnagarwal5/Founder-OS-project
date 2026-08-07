"use client";

import React, { useState } from "react";
import Link from "next/link";
import ThemeToggle from "../ThemeToggle";
import { Cpu, Sparkles, Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AutoFlowNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Workflow Analyzer", href: "#analyzer" },
    { name: "ROI Calculator", href: "#roi-calculator" },
    { name: "AI Dashboard", href: "#dashboard-preview" },
    { name: "Pricing", href: "#pricing" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#09090b]/80 border-b border-[#27272a] px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/autoflow" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 via-blue-600 to-emerald-500 p-0.5 shadow-lg group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#09090b] rounded-[14px] flex items-center justify-center">
              <Cpu className="w-5 h-5 text-purple-400 group-hover:rotate-12 transition-transform" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-lg tracking-tight text-white">AutoFlow<span className="text-gradient">.AI</span></span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 uppercase tracking-wider">
                YC S26
              </span>
            </div>
            <p className="text-[10px] text-[#a1a1aa] font-medium hidden sm:block">AI Workflow Automation Advisor</p>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-[#a1a1aa]">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/dashboard"
            className="hidden sm:flex items-center gap-2 text-xs font-semibold text-[#a1a1aa] hover:text-white px-3 py-2 rounded-xl hover:bg-white/5 transition-colors"
          >
            <span>FounderOS App</span>
          </Link>

          <a
            href="#analyzer"
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-500 text-white font-bold text-xs hover:opacity-95 shadow-lg shadow-purple-500/25 transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Get Started</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-xl bg-white/5 border border-[#27272a] text-[#a1a1aa] hover:text-white"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden mt-3 pt-3 border-t border-[#27272a] space-y-2 pb-3"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-2 text-xs font-semibold text-[#a1a1aa] hover:text-white hover:bg-white/5 rounded-lg"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
