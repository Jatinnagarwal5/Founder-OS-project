"use client";

import React from "react";
import { motion } from "framer-motion";

export default function TrustedLogos() {
  const logos = [
    "Vercel",
    "Linear",
    "Stripe",
    "Notion",
    "Supabase",
    "Retool",
    "Raycast",
    "Zapier",
  ];

  return (
    <section className="py-10 border-y border-[#27272a]/60 bg-[#09090b]/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
        <p className="text-xs uppercase tracking-widest font-extrabold text-[#a1a1aa]">
          Trusted by Fast-Growing YC Startups & High-Scale Engineering Teams
        </p>

        <div className="flex items-center justify-center flex-wrap gap-8 sm:gap-12 pt-2">
          {logos.map((logo, idx) => (
            <motion.span
              key={idx}
              whileHover={{ scale: 1.1, color: "#ffffff" }}
              className="text-lg sm:text-xl font-black tracking-tight text-[#a1a1aa]/60 hover:text-white transition-colors cursor-pointer"
            >
              {logo}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
