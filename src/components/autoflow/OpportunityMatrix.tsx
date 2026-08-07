"use client";

import React, { useState } from "react";
import { Grid, Sparkles, Zap, Star } from "lucide-react";
import { motion } from "framer-motion";

export default function OpportunityMatrix() {
  const [selectedQuadrant, setSelectedQuadrant] = useState<string | null>("quick-wins");

  const matrixData = [
    {
      id: "quick-wins",
      quadrant: "High Impact • Low Effort",
      tag: "Quick Wins (Priority 1)",
      items: [
        "Inbound Email Routing & Intent Classification",
        "Failed Invoice Recovery Automated Reminders",
        "Lead Scoring & Instantly Enriched Notifications",
      ],
      color: "bg-emerald-950/40 border-emerald-500/40 text-emerald-300",
    },
    {
      id: "strategic-projects",
      quadrant: "High Impact • High Effort",
      tag: "Major Strategic Projects",
      items: [
        "Full End-to-End Enterprise Onboarding Pipeline",
        "Autonomous Customer Support Level-2 Escalation Agent",
        "Custom Fine-Tuned AI Sales Proposal Generator",
      ],
      color: "bg-purple-950/40 border-purple-500/40 text-purple-300",
    },
    {
      id: "low-priority",
      quadrant: "Low Impact • Low Effort",
      tag: "Incremental Tweaks",
      items: [
        "Internal Slack Daily Digest Bot",
        "Automated Calendar Meeting Reminder Texts",
        "Weekly Github Issue Summary Export",
      ],
      color: "bg-blue-950/40 border-blue-500/40 text-blue-300",
    },
    {
      id: "avoid",
      quadrant: "Low Impact • High Effort",
      tag: "Deprioritize / Avoid",
      items: [
        "Over-Engineered Custom Neural Network Training",
        "Replacing Core Relational Database with Vector Store",
        "Manual PDF OCR for Legacy Paper Records",
      ],
      color: "bg-rose-950/40 border-rose-500/40 text-rose-300",
    },
  ];

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Prioritization Framework</span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Automation Opportunity <span className="text-gradient">Impact Matrix</span>
          </h2>
          <p className="text-sm text-[#a1a1aa] font-medium leading-relaxed">
            Sort opportunities by High/Low Impact versus High/Low Effort to identify high-ROI Quick Wins instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {matrixData.map((q) => {
            const isSelected = selectedQuadrant === q.id;
            return (
              <motion.div
                key={q.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedQuadrant(q.id)}
                className={`p-6 rounded-3xl border transition-all cursor-pointer space-y-4 shadow-2xl ${
                  isSelected ? q.color + " ring-2 ring-purple-500/50" : "bg-[#18181b] border-[#27272a] hover:border-purple-500/30"
                }`}
              >
                <div className="flex justify-between items-center border-b border-[#27272a] pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300">{q.quadrant}</span>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-white/10 text-white">
                    {q.tag}
                  </span>
                </div>

                <ul className="space-y-2">
                  {q.items.map((item, idx) => (
                    <li key={idx} className="text-xs text-slate-200 flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      <span className="font-semibold">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
