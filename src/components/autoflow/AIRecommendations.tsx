"use client";

import React, { useState } from "react";
import { Sparkles, ChevronDown, ChevronUp, Layers, Zap, ShieldCheck, DollarSign } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AIRecommendations() {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(0);

  const recommendations = [
    {
      title: "Autonomous Customer Support Email & Ticket Pipeline",
      toolStack: "Gemini 2.5 Flash + Make.com + Zendesk / HubSpot",
      timeline: "2 Weeks Implementation",
      estimatedCost: "$49/mo SaaS + $500 One-time setup",
      roi: "450% Annual ROI",
      improvement: "Reduces response latency from 4.2 hours to sub-15 seconds. Handles 80% of common tier-1 inquiries automatically.",
      risks: "Requires prompt guardrails to handle edge-case refunds or escalations.",
      benefits: "Frees up 2 full-time support staff to focus on enterprise sales onboarding.",
    },
    {
      title: "Automated B2B Invoice & Payment Recovery Agent",
      toolStack: "Stripe Webhooks + OpenAI GPT-4o + SendGrid API",
      timeline: "1 Week Implementation",
      estimatedCost: "$29/mo SaaS",
      roi: "620% Annual ROI",
      improvement: "Automatically detects failed payments, issues personalized reminder emails, and updates internal telemetry.",
      risks: "Needs careful rate limiting to avoid duplicate reminder emails.",
      benefits: "Recovers 35% of churned ARR with zero human intervention.",
    },
    {
      title: "Real-Time Lead Enrichment & Outbound Routing Engine",
      toolStack: "Clay.com + Gemini Flash + LinkedIn Sales Navigator API",
      timeline: "3 Weeks Implementation",
      estimatedCost: "$149/mo SaaS",
      roi: "380% Annual ROI",
      improvement: "Enriches inbound signups with company size, tech stack, and funding stage, routing high-value leads to AEs in under 2 minutes.",
      risks: "Data enrichment API quota limits.",
      benefits: "Increases demo booking conversion rate by 28%.",
    },
  ];

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400">AI Stack Intelligence</span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Curated AI Platform <span className="text-gradient">Recommendations</span>
          </h2>
          <p className="text-sm text-[#a1a1aa] font-medium leading-relaxed">
            Expand the glass cards below to inspect exact recommended tool combinations, timelines, risks, and ROI benefits.
          </p>
        </div>

        <div className="space-y-4 max-w-4xl mx-auto">
          {recommendations.map((rec, idx) => {
            const isExpanded = expandedIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-3xl bg-[#18181b] border border-[#27272a] hover:border-purple-500/30 transition-all overflow-hidden shadow-2xl"
              >
                <div
                  onClick={() => setExpandedIdx(isExpanded ? null : idx)}
                  className="p-6 cursor-pointer flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white tracking-tight">{rec.title}</h3>
                      <p className="text-xs text-[#a1a1aa] font-medium">{rec.toolStack}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hidden sm:inline-block">
                      {rec.roi}
                    </span>
                    {isExpanded ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                  </div>
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-6 pb-6 pt-2 border-t border-[#27272a] space-y-4 text-xs text-[#a1a1aa]"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-3.5 rounded-2xl bg-[#09090b] border border-[#27272a]">
                          <span className="font-bold text-white block mb-1">Expected Improvement</span>
                          <p className="leading-relaxed">{rec.improvement}</p>
                        </div>
                        <div className="p-3.5 rounded-2xl bg-[#09090b] border border-[#27272a]">
                          <span className="font-bold text-emerald-400 block mb-1">Primary Benefits</span>
                          <p className="leading-relaxed">{rec.benefits}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3 text-[11px]">
                        <div>
                          <span className="text-slate-400 block">Implementation Timeline</span>
                          <span className="font-bold text-white">{rec.timeline}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Estimated Stack Cost</span>
                          <span className="font-bold text-purple-400">{rec.estimatedCost}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Identified Risk & Mitigations</span>
                          <span className="font-bold text-amber-400">{rec.risks}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
