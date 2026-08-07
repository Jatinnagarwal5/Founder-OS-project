"use client";

import React from "react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

export default function Testimonials() {
  const reviews = [
    {
      name: "Marcus Vance",
      role: "CTO @ Starlight SaaS (YC W25)",
      quote: "AutoFlow AI identified a support email bottleneck that was costing us $8,000/mo. We deployed their recommended Make + Gemini pipeline in 2 days and reclaimed 40 hours/week.",
      stars: 5,
      avatar: "MV",
    },
    {
      name: "Elena Rostova",
      role: "Head of Ops @ DevHub",
      quote: "The ROI Calculator and Before vs After diagrams convinced our CFO immediately. We automated our B2B failed invoice recovery and recovered $34k in ARR within 30 days.",
      stars: 5,
      avatar: "ER",
    },
    {
      name: "David Kim",
      role: "Founder @ Acme Flow",
      quote: "As a solo founder, I was spending half my week on manual lead data enrichment. AutoFlow AI gave me an exact 3-week roadmap that handles 95% of signups automatically.",
      stars: 5,
      avatar: "DK",
    },
  ];

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Founder Testimonials</span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Loved by <span className="text-gradient">Fast-Scaling Founders</span>
          </h2>
          <p className="text-sm text-[#a1a1aa] font-medium leading-relaxed">
            See how early-stage SaaS teams use AutoFlow AI to reclaim hundreds of hours and scale ARR without hiring extra ops staff.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -4 }}
              className="p-6 rounded-3xl bg-[#18181b] border border-[#27272a] hover:border-purple-500/40 transition-all space-y-4 shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(r.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-medium italic">"{r.quote}"</p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-[#27272a]">
                <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center font-bold text-xs text-purple-300">
                  {r.avatar}
                </div>
                <div>
                  <div className="font-bold text-xs text-white">{r.name}</div>
                  <div className="text-[10px] text-[#a1a1aa]">{r.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
