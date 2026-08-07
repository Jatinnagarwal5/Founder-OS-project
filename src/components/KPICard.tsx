"use client";

import React from "react";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";

interface KPICardProps {
  title: string;
  value: string;
  change?: string;
  isPositive?: boolean;
  icon: LucideIcon;
  subtitle?: string;
  accentColor?: "blue" | "purple" | "emerald" | "amber" | "rose";
}

export default function KPICard({
  title,
  value,
  change,
  isPositive = true,
  icon: Icon,
  subtitle,
  accentColor = "blue",
}: KPICardProps) {
  const accentClasses = {
    blue: "from-blue-500/20 to-indigo-500/10 text-blue-400 border-blue-500/30",
    purple: "from-purple-500/20 to-pink-500/10 text-purple-400 border-purple-500/30",
    emerald: "from-emerald-500/20 to-teal-500/10 text-emerald-400 border-emerald-500/30",
    amber: "from-amber-500/20 to-orange-500/10 text-amber-400 border-amber-500/30",
    rose: "from-rose-500/20 to-red-500/10 text-rose-400 border-rose-500/30",
  };

  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.01 }}
      className="glass-card p-4 relative overflow-hidden flex flex-col justify-between border border-white/10 group"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-slate-400 tracking-wide">{title}</span>
        <div
          className={`p-2.5 rounded-xl bg-gradient-to-br ${accentClasses[accentColor]} border shadow-sm group-hover:scale-110 transition-transform`}
        >
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div>
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-2xl font-extrabold text-white tracking-tight">{value}</span>
          {change && (
            <span
              className={`flex items-center text-xs font-bold px-1.5 py-0.5 rounded-md ${
                isPositive
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
              }`}
            >
              {isPositive ? <TrendingUp className="w-3 h-3 mr-0.5" /> : <TrendingDown className="w-3 h-3 mr-0.5" />}
              {change}
            </span>
          )}
        </div>
        {subtitle && <p className="text-[11px] text-slate-400 font-medium">{subtitle}</p>}
      </div>
    </motion.div>
  );
}
