"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Bot,
  DollarSign,
  Users,
  Building2,
  Sword,
  Sliders,
  Presentation,
  MapPin,
  CheckSquare,
  FileSpreadsheet,
  Bell,
  Settings,
  Sparkles,
  ChevronRight,
  Cpu,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export default function Sidebar({ mobileOpen = false, onCloseMobile }: SidebarProps) {
  const pathname = usePathname();

  const navigationGroups = [
    {
      group: "Core Operating System",
      items: [
        { name: "Executive Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { name: "AI Founder Advisor", href: "/advisor", icon: Bot, badge: "AI" },
        { name: "Finance Telemetry", href: "/finance", icon: DollarSign },
        { name: "Customer Analytics", href: "/customers", icon: Users },
        { name: "Team & Productivity", href: "/team", icon: Building2 },
      ],
    },
    {
      group: "AI Decision Tools",
      items: [
        { name: "AutoFlow AI Advisor", href: "/autoflow", icon: Cpu, badge: "New" },
        { name: "Competitor Intelligence", href: "/competitors", icon: Sword },
        { name: "Decision Simulator", href: "/simulator", icon: Sliders, badge: "Unique" },
        { name: "Pitch Deck Generator", href: "/pitch", icon: Presentation },
        { name: "90-Day Roadmap", href: "/roadmap", icon: MapPin },
        { name: "Daily Action Plan", href: "/action-plan", icon: CheckSquare },
      ],
    },
    {
      group: "Management & Export",
      items: [
        { name: "Executive Reports", href: "/reports", icon: FileSpreadsheet },
        { name: "Notifications", href: "/notifications", icon: Bell },
        { name: "System Settings", href: "/settings", icon: Settings },
      ],
    },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full py-4 px-3 space-y-6 overflow-y-auto">
      {/* Top Banner / Landing link */}
      <div className="p-3 rounded-2xl bg-gradient-to-r from-blue-900/40 via-purple-900/40 to-blue-900/40 border border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-xl pointer-events-none" />
        <div className="flex items-center gap-2 mb-1.5">
          <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
          <span className="text-xs font-semibold text-white">Gemini 2.5 Flash Engine</span>
        </div>
        <p className="text-[11px] text-slate-300 leading-snug mb-2.5">
          Autonomous AI decision telemetry active.
        </p>
        <Link
          href="/"
          onClick={onCloseMobile}
          className="inline-flex items-center justify-between w-full px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-[11px] font-medium transition-all"
        >
          <span>Analyze New Idea</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Navigation Sections */}
      <div className="space-y-6 flex-1">
        {navigationGroups.map((group, idx) => (
          <div key={idx}>
            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400 px-3 mb-2">
              {group.group}
            </p>
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onCloseMobile}
                    className={cn(
                      "flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all group",
                      isActive
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20 font-semibold"
                        : "text-slate-400 hover:text-slate-100 hover:bg-white/5"
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon
                        className={cn(
                          "w-4 h-4 transition-transform group-hover:scale-110",
                          isActive ? "text-white" : "text-slate-400 group-hover:text-blue-400"
                        )}
                      />
                      <span>{item.name}</span>
                    </div>

                    {item.badge && (
                      <span
                        className={cn(
                          "text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider",
                          isActive
                            ? "bg-white/20 text-white"
                            : item.badge === "AI"
                            ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                            : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer info */}
      <div className="pt-4 border-t border-white/10 px-3 text-[11px] text-slate-400 flex items-center justify-between">
        <span>Helm v2.5</span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-emerald-400 font-medium">Live Telemetry</span>
        </span>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Fixed Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 border-r border-white/10 bg-[#070b14]/60 backdrop-blur-xl h-[calc(100vh-61px)] sticky top-[61px] overflow-y-auto">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onCloseMobile}
          />
          <div className="relative w-72 max-w-full bg-[#080d1a] border-r border-white/10 h-full z-10">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
