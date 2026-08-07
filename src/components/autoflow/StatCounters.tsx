"use client";

import React from "react";
import { motion } from "framer-motion";

export default function StatCounters() {
  const stats = [
    { value: "1,250+", label: "Workflows Automated", color: "text-purple-400" },
    { value: "85,000+", label: "Hours Reclaimed", color: "text-emerald-400" },
    { value: "$1.4M+", label: "Capital Preserved", color: "text-blue-400" },
    { value: "99.4%", label: "Customer Satisfaction", color: "text-white" },
    { value: "+68%", label: "Productivity Increase", color: "text-purple-400" },
  ];

  return (
    <section className="py-16 bg-[#09090b]/80 border-y border-[#27272a]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
          {stats.map((s, idx) => (
            <motion.div key={idx} whileHover={{ y: -2 }} className="space-y-1">
              <div className={`text-3xl sm:text-4xl font-black ${s.color}`}>{s.value}</div>
              <div className="text-xs font-medium text-[#a1a1aa]">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
