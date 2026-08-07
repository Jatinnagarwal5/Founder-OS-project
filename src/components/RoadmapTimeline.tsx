"use client";

import React from "react";
import { useStartup } from "@/context/StartupContext";
import { MapPin, CheckCircle2, Clock, Calendar } from "lucide-react";
import { motion } from "framer-motion";

export default function RoadmapTimeline() {
  const { roadmap } = useStartup();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/40";
      case "In Progress":
        return "bg-blue-500/20 text-blue-400 border-blue-500/40 animate-pulse";
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/40";
    }
  };

  return (
    <div className="glass-card p-6 border border-white/10 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <MapPin className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-bold text-white tracking-tight">90-Day Execution Roadmap</h2>
          </div>
          <p className="text-xs text-slate-400">Sequential milestones for launch and scale</p>
        </div>
        <span className="text-xs font-bold px-3 py-1 rounded-xl bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
          5 Phases Mapped
        </span>
      </div>

      {/* Timeline List */}
      <div className="relative pl-6 space-y-8 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-emerald-500 before:via-blue-500 before:to-slate-700">
        {roadmap.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="relative space-y-2 group"
          >
            {/* Timeline Dot */}
            <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#070b14] border-2 border-emerald-400 flex items-center justify-center group-hover:scale-125 transition-transform shadow-lg shadow-emerald-500/30">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">{item.phase}</span>
                <h3 className="text-sm font-bold text-white tracking-tight">{item.title}</h3>
              </div>
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${getStatusBadge(item.status)}`}>
                {item.status}
              </span>
            </div>

            <div className="glass-card p-4 border border-white/5 bg-white/5 space-y-2">
              {item.tasks.map((task, tidx) => (
                <div key={tidx} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{task}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
