"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useStartup } from "@/context/StartupContext";
import { CheckSquare, Plus, CheckCircle2, Circle, Trash2, Filter } from "lucide-react";
import { motion } from "framer-motion";

export default function ActionPlanPage() {
  const { actionPlan, addTask, deleteTask, toggleTask } = useStartup();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Growth");
  const [newPriority, setNewPriority] = useState<"High" | "Medium" | "Low">("High");
  const [filterCategory, setFilterCategory] = useState("All");

  const completedCount = actionPlan.filter((t) => t.completed).length;
  const progressPercent = actionPlan.length > 0 ? Math.round((completedCount / actionPlan.length) * 100) : 0;

  const handleAddNewTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    addTask(newTitle, newCategory, newPriority);
    setNewTitle("");
  };

  const filteredTasks = filterCategory === "All" ? actionPlan : actionPlan.filter((t) => t.category === filterCategory);

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col">
      <Navbar onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)} />

      <div className="flex flex-1">
        <Sidebar mobileOpen={mobileMenuOpen} onCloseMobile={() => setMobileMenuOpen(false)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 overflow-y-auto">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Daily Founder Action Plan
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Interactive high-priority execution checklist with task creation and persistence
            </p>
          </div>

          {/* Progress Card */}
          <div className="glass-card p-6 border border-white/10 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Sprint Velocity Progress
                </span>
                <h2 className="text-xl font-bold text-white tracking-tight mt-0.5">
                  {completedCount} of {actionPlan.length} Core Milestones Completed
                </h2>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-2xl font-black text-emerald-400">{progressPercent}%</span>
              </div>
            </div>

            <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden border border-white/5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500 rounded-full"
              />
            </div>
          </div>

          {/* Add New Task Form */}
          <form onSubmit={handleAddNewTask} className="glass-card p-4 border border-white/10 flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Add a new founder priority (e.g. Schedule Series A pitch prep)..."
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50"
            />
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="px-3 py-2.5 rounded-xl bg-[#0d1424] border border-white/10 text-xs text-white focus:outline-none"
            >
              <option value="Growth">Growth</option>
              <option value="Finance">Finance</option>
              <option value="Product">Product</option>
              <option value="Fundraising">Fundraising</option>
              <option value="Operations">Operations</option>
            </select>
            <select
              value={newPriority}
              onChange={(e) => setNewPriority(e.target.value as any)}
              className="px-3 py-2.5 rounded-xl bg-[#0d1424] border border-white/10 text-xs text-white focus:outline-none"
            >
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>
            <button
              type="submit"
              disabled={!newTitle.trim()}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 font-bold text-xs text-white disabled:opacity-50 hover:opacity-90 transition-all flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add Task</span>
            </button>
          </form>

          {/* Tasks List */}
          <div className="glass-card p-6 border border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-bold text-base text-white">Daily Founder Checklist</h3>
              <div className="flex items-center gap-2 text-xs">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="bg-transparent text-slate-300 font-bold focus:outline-none cursor-pointer"
                >
                  <option value="All" className="bg-[#0d1424]">All Categories</option>
                  <option value="Growth" className="bg-[#0d1424]">Growth</option>
                  <option value="Finance" className="bg-[#0d1424]">Finance</option>
                  <option value="Product" className="bg-[#0d1424]">Product</option>
                  <option value="Fundraising" className="bg-[#0d1424]">Fundraising</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              {filteredTasks.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-6">No tasks in this category.</p>
              ) : (
                filteredTasks.map((task) => (
                  <div
                    key={task.id}
                    className={`p-4 rounded-xl border transition-all flex items-center justify-between gap-4 ${
                      task.completed
                        ? "bg-emerald-950/20 border-emerald-500/30 text-slate-400"
                        : "bg-white/5 border-white/10 text-slate-200 hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-3 flex-1 cursor-pointer" onClick={() => toggleTask(task.id)}>
                      {task.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-500 shrink-0" />
                      )}
                      <span className={`text-xs sm:text-sm font-semibold ${task.completed ? "line-through" : ""}`}>
                        {task.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400">
                        {task.category}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                          task.priority === "High"
                            ? "bg-rose-500/20 text-rose-400 border-rose-500/30"
                            : "bg-blue-500/20 text-blue-400 border-blue-500/30"
                        }`}
                      >
                        {task.priority}
                      </span>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="p-1 rounded text-slate-500 hover:text-rose-400 hover:bg-white/10 transition-colors"
                        title="Delete task"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
