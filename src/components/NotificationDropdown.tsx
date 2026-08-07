"use client";

import React, { useState } from "react";
import { useStartup } from "@/context/StartupContext";
import { Bell, CheckCircle2, AlertTriangle, Clock, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function NotificationDropdown() {
  const { notifications, markNotificationRead } = useStartup();
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const getIcon = (type: string) => {
    switch (type) {
      case "milestone":
        return <Zap className="w-4 h-4 text-emerald-400" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-amber-400" />;
      case "reminder":
        return <Clock className="w-4 h-4 text-blue-400" />;
      default:
        return <CheckCircle2 className="w-4 h-4 text-purple-400" />;
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all"
        aria-label="Notifications"
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 mt-3 w-80 sm:w-96 glass-card p-4 z-50 shadow-2xl border border-white/10"
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-blue-400" />
                <span className="font-semibold text-sm text-slate-100">Notifications</span>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 font-medium">
                {unreadCount} new
              </span>
            </div>

            <div className="space-y-2 max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-4">No notifications yet.</p>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => markNotificationRead(n.id)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex gap-3 items-start ${
                      n.unread
                        ? "bg-blue-950/30 border-blue-500/30 text-slate-200"
                        : "bg-white/5 border-white/5 text-slate-400 hover:bg-white/10"
                    }`}
                  >
                    <div className="p-2 rounded-lg bg-white/5 border border-white/10 shrink-0 mt-0.5">
                      {getIcon(n.type)}
                    </div>
                    <div className="flex-1 text-xs">
                      <div className="flex items-center justify-between font-medium text-slate-200 mb-0.5">
                        <span>{n.title}</span>
                        <span className="text-[10px] text-slate-500">{n.time}</span>
                      </div>
                      <p className="text-slate-400 leading-relaxed">{n.message}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
