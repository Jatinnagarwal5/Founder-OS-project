"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useStartup } from "@/context/StartupContext";
import { Bell, CheckCircle2, AlertTriangle, Clock, Zap } from "lucide-react";

export default function NotificationsPage() {
  const { notifications, markNotificationRead } = useStartup();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getIcon = (type: string) => {
    switch (type) {
      case "milestone":
        return <Zap className="w-5 h-5 text-emerald-400" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-amber-400" />;
      case "reminder":
        return <Clock className="w-5 h-5 text-blue-400" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-purple-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col">
      <Navbar onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)} />

      <div className="flex flex-1">
        <Sidebar mobileOpen={mobileMenuOpen} onCloseMobile={() => setMobileMenuOpen(false)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-y-auto">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Notification Center
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Operational alerts, financial milestones, and upcoming reminders
            </p>
          </div>

          <div className="glass-card p-6 border border-white/10 space-y-4">
            <h2 className="font-bold text-base text-white border-b border-white/10 pb-3">
              System Alerts
            </h2>

            <div className="space-y-3">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => markNotificationRead(n.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex gap-4 items-start ${
                    n.unread
                      ? "bg-blue-950/30 border-blue-500/40 text-slate-100"
                      : "bg-white/5 border-white/5 text-slate-400 hover:bg-white/10"
                  }`}
                >
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 shrink-0 mt-0.5">
                    {getIcon(n.type)}
                  </div>
                  <div className="flex-1 text-xs space-y-1">
                    <div className="flex items-center justify-between font-bold text-sm text-white">
                      <span>{n.title}</span>
                      <span className="text-[10px] text-slate-500 font-normal">{n.time}</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed text-xs">{n.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
