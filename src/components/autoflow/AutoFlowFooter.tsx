"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Cpu, Send, Check } from "lucide-react";

export default function AutoFlowFooter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <footer className="w-full bg-[#09090b] border-t border-[#27272a] text-xs text-[#a1a1aa] py-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Logo & Vision */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/autoflow" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 via-blue-600 to-emerald-500 p-0.5">
                <div className="w-full h-full bg-[#09090b] rounded-[10px] flex items-center justify-center">
                  <Cpu className="w-4 h-4 text-purple-400" />
                </div>
              </div>
              <span className="font-black text-base text-white">AutoFlow.AI</span>
            </Link>
            <p className="text-[11px] leading-relaxed">
              World-class AI Workflow Automation Advisor for fast-scaling startups and modern engineering teams.
            </p>
          </div>

          {/* Col 2: Product Links */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase text-[10px] tracking-wider mb-2">Product</h4>
            <a href="#analyzer" className="block hover:text-white transition-colors">Workflow Analyzer</a>
            <a href="#roi-calculator" className="block hover:text-white transition-colors">ROI Calculator</a>
            <a href="#dashboard-preview" className="block hover:text-white transition-colors">Dashboard Preview</a>
            <a href="#pricing" className="block hover:text-white transition-colors">Pricing Plans</a>
          </div>

          {/* Col 3: Company & Legal */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase text-[10px] tracking-wider mb-2">Company & Legal</h4>
            <Link href="/dashboard" className="block hover:text-white transition-colors">FounderOS App</Link>
            <span className="block hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="block hover:text-white cursor-pointer transition-colors">Terms of Service</span>
            <span className="block hover:text-white cursor-pointer transition-colors">Security Overview</span>
          </div>

          {/* Col 4: Newsletter */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase text-[10px] tracking-wider">Stay Updated</h4>
            <p className="text-[11px]">Get weekly AI automation blueprints delivered to your inbox.</p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="founder@company.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#18181b] border border-[#27272a] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-purple-600 text-white hover:opacity-90 transition-all"
                >
                  {subscribed ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Send className="w-3.5 h-3.5" />}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-[#27272a] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <span>© 2026 AutoFlow AI Inc. All rights reserved. Powered by Gemini 2.5 Flash.</span>
          <div className="flex items-center gap-6 font-semibold">
            <span className="hover:text-white cursor-pointer">Twitter / X</span>
            <span className="hover:text-white cursor-pointer">LinkedIn</span>
            <span className="hover:text-white cursor-pointer">GitHub</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
