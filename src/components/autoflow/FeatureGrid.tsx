"use client";

import React from "react";
import {
  Cpu,
  TrendingUp,
  Bot,
  MapPin,
  FileSpreadsheet,
  MessageSquare,
  Users,
  Download,
  Activity,
  BarChart3,
} from "lucide-react";
import { motion } from "framer-motion";

export default function FeatureGrid() {
  const features = [
    { icon: Cpu, title: "AI Workflow Analysis", description: "Detects repetitive manual operational steps and assigns feasibility scores." },
    { icon: TrendingUp, title: "ROI Prediction Engine", description: "Calculates exact monthly & annual financial savings with payback periods." },
    { icon: Bot, title: "Automation Advisor", description: "Recommends the best AI tech stack (Zapier, Make, OpenAI, n8n) for your team." },
    { icon: MapPin, title: "Process Mapping", description: "Generates before-and-after visual flowcharts comparing manual vs AI pipelines." },
    { icon: FileSpreadsheet, title: "Smart Reports", description: "Auto-generates YC-ready executive automation roadmaps and unit economics." },
    { icon: MessageSquare, title: "AI Consultant Chat", description: "Conversational AI agent trained on workflow engineering and operational scaling." },
    { icon: Users, title: "Team Collaboration", description: "Assign automation priorities to team members with step-by-step instructions." },
    { icon: Download, title: "Export Reports", description: "Download formatted PDF briefs and CSV telemetry data with 1-click." },
    { icon: Activity, title: "Real-Time Insights", description: "Continuous monitoring of operational latency, error rates, and throughput." },
    { icon: BarChart3, title: "Business Analytics", description: "Track cumulative hours reclaimed across Support, Sales, Ops, and Billing." },
  ];

  return (
    <section id="features" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Platform Capabilities</span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            10 Premium <span className="text-gradient">Automation Features</span>
          </h2>
          <p className="text-sm text-[#a1a1aa] font-medium leading-relaxed">
            Everything your startup needs to eliminate operational friction and scale autonomously.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {features.map((f, idx) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -4, scale: 1.02 }}
                className="p-5 rounded-3xl bg-[#18181b] border border-[#27272a] hover:border-purple-500/40 transition-all space-y-3 shadow-xl group"
              >
                <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-400 w-fit group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-white tracking-tight">{f.title}</h3>
                <p className="text-xs text-[#a1a1aa] leading-relaxed font-medium">{f.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
