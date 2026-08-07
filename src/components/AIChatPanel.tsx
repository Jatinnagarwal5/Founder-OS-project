"use client";

import React, { useState } from "react";
import { useStartup } from "@/context/StartupContext";
import { Bot, Send, Sparkles, User, Briefcase, Megaphone, DollarSign, Layers } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AIChatPanel() {
  const { activeAgent, setActiveAgent, startupData } = useStartup();
  const [messages, setMessages] = useState<Array<{ sender: "user" | "ai"; agent?: string; text: string }>>([
    {
      sender: "ai",
      agent: "CEO",
      text: `Hello Founder! I am your **CEO AI Strategy Advisor**. I've analyzed your telemetry data for **${startupData.name}**. How can I help you scale operations today?`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const agentsList = [
    { role: "CEO" as const, name: "CEO Strategy Agent", icon: Briefcase, color: "text-blue-400 border-blue-500/40 bg-blue-500/10" },
    { role: "Marketing" as const, name: "CMO Growth Agent", icon: Megaphone, color: "text-purple-400 border-purple-500/40 bg-purple-500/10" },
    { role: "Investor" as const, name: "VC Investor Agent", icon: DollarSign, color: "text-emerald-400 border-emerald-500/40 bg-emerald-500/10" },
    { role: "Product" as const, name: "VP Product Agent", icon: Layers, color: "text-amber-400 border-amber-500/40 bg-amber-500/10" },
  ];

  const suggestedPrompts = [
    "Analyze my business performance.",
    "Should I hire more employees?",
    "Why is customer growth slowing?",
    "How can I increase revenue?",
    "Predict next month's business performance.",
  ];

  const handleSend = async (userMsg = input) => {
    if (!userMsg.trim()) return;

    const newMessages = [...messages, { sender: "user" as const, text: userMsg }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: activeAgent,
          message: userMsg,
          startupContext: `Startup: ${startupData.name}, Health Score: ${startupData.healthScore}%, MRR: $${startupData.kpis.mrr}, Runway: ${startupData.kpis.runwayMonths} months`,
        }),
      });

      if (res.ok) {
        const json = await res.json();
        setMessages((prev) => [
          ...prev,
          { sender: "ai", agent: activeAgent, text: json.response },
        ]);
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { sender: "ai", agent: activeAgent, text: "I encountered an issue processing that. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card p-6 border border-white/10 flex flex-col h-[650px]">
      {/* Header & Agent Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Bot className="w-5 h-5 text-blue-400" />
            <h2 className="text-lg font-bold text-white tracking-tight">AI Founder Advisor Suite</h2>
          </div>
          <p className="text-xs text-slate-400">Conversational AI intelligence powered by Gemini 2.5</p>
        </div>

        {/* Persona Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 bg-white/5 rounded-xl border border-white/10">
          {agentsList.map((agent) => {
            const Icon = agent.icon;
            const isSelected = activeAgent === agent.role;
            return (
              <button
                key={agent.role}
                onClick={() => setActiveAgent(agent.role)}
                className={`flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  isSelected
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                    : "text-slate-400 hover:text-white hover:bg-white/10"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{agent.role}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Suggested Quick Prompts */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-3 border-b border-white/5 scrollbar-none">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-purple-400" /> Prompts:
        </span>
        {suggestedPrompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(p)}
            className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 transition-all shrink-0"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Messages Thread */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-4">
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.sender === "ai" && (
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white shrink-0 shadow-md">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div
              className={`max-w-[85%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed border ${
                msg.sender === "user"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-400/30 rounded-tr-none"
                  : "bg-white/5 text-slate-200 border-white/10 rounded-tl-none"
              }`}
            >
              {msg.agent && (
                <div className="text-[10px] font-bold uppercase tracking-wider text-blue-400 mb-1.5 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-purple-400" /> {msg.agent} Advisor
                </div>
              )}
              <div className="whitespace-pre-wrap space-y-2">{msg.text}</div>
            </div>

            {msg.sender === "user" && (
              <div className="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-300 shrink-0 font-bold text-xs">
                <User className="w-4 h-4" />
              </div>
            )}
          </motion.div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-xs text-slate-400 p-3 bg-white/5 rounded-xl w-fit">
            <Sparkles className="w-4 h-4 text-purple-400 animate-spin" />
            <span>Consulting {activeAgent} Agent...</span>
          </div>
        )}
      </div>

      {/* Input Box */}
      <div className="relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder={`Ask ${activeAgent} Agent anything about business strategy, hiring, growth...`}
          className="w-full pl-4 pr-12 py-3 rounded-xl border border-white/10 bg-white/5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50"
        />
        <button
          onClick={() => handleSend()}
          disabled={loading || !input.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white disabled:opacity-50 hover:opacity-90 transition-all shadow-md"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
