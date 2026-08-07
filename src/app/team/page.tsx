"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useStartup } from "@/context/StartupContext";
import { Building2, CheckSquare, Clock, AlertOctagon, UserCheck, ShieldCheck } from "lucide-react";

export default function TeamPage() {
  const { teamMembers, startupData } = useStartup();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col">
      <Navbar onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)} />

      <div className="flex flex-1">
        <Sidebar mobileOpen={mobileMenuOpen} onCloseMobile={() => setMobileMenuOpen(false)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 overflow-y-auto">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Team Productivity & Workload
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Sprint velocity, task allocation, and operational bandwidth
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-card p-4 border border-white/10 flex items-center gap-3">
              <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400">
                <CheckSquare className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-400 block font-medium">Completed Tasks</span>
                <span className="text-xl font-black text-white">{startupData.teamSummary.completedTasks}</span>
              </div>
            </div>

            <div className="glass-card p-4 border border-white/10 flex items-center gap-3">
              <div className="p-3 rounded-xl bg-amber-500/20 text-amber-400">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-400 block font-medium">Pending Tasks</span>
                <span className="text-xl font-black text-white">{startupData.teamSummary.pendingTasks}</span>
              </div>
            </div>

            <div className="glass-card p-4 border border-white/10 flex items-center gap-3">
              <div className="p-3 rounded-xl bg-rose-500/20 text-rose-400">
                <AlertOctagon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-400 block font-medium">Blocked Items</span>
                <span className="text-xl font-black text-white">{startupData.teamSummary.blockedTasks}</span>
              </div>
            </div>

            <div className="glass-card p-4 border border-white/10 flex items-center gap-3">
              <div className="p-3 rounded-xl bg-blue-500/20 text-blue-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-400 block font-medium">Team Velocity</span>
                <span className="text-xl font-black text-white">{startupData.teamSummary.productivityPercentage}%</span>
              </div>
            </div>
          </div>

          {/* Team Members Table */}
          <div className="glass-card p-6 border border-white/10 space-y-4">
            <h3 className="font-bold text-base text-white border-b border-white/10 pb-3">
              Core Roster & Sprint Assignments
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-[11px] uppercase tracking-wider text-slate-400 bg-white/5">
                    <th className="py-3 px-4">Member</th>
                    <th className="py-3 px-4">Role</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Tasks Assigned</th>
                    <th className="py-3 px-4">Completed</th>
                    <th className="py-3 px-4">Workload Progress</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-300">
                  {teamMembers.map((m) => {
                    const percent = Math.round((m.completed / m.tasksAssigned) * 100);
                    return (
                      <tr key={m.id} className="hover:bg-white/5 transition-colors">
                        <td className="py-3 px-4 font-bold text-white flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-xs font-bold text-indigo-300">
                            {m.avatar}
                          </div>
                          <span>{m.name}</span>
                        </td>
                        <td className="py-3 px-4 text-slate-300 font-medium">{m.role}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            {m.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-bold text-slate-200">{m.tasksAssigned}</td>
                        <td className="py-3 px-4 font-bold text-emerald-400">{m.completed}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                              <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" style={{ width: `${percent}%` }} />
                            </div>
                            <span className="text-[10px] font-bold text-slate-400">{percent}%</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
