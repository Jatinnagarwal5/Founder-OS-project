"use client";

import React, { useState } from "react";
import { Bot, Send, Sparkles, User, Briefcase, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function ConsultantChat() {
  const [messages, setMessages] = useState<Array<{ sender: "user" | "ai"; text: string }>>([
    {
      sender: "ai",
      text: "Hello Founder! I am your **AutoFlow AI Automation Consultant**. Ask me how to automate HR, Customer Support, Billing, or Lead Routing!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const samplePrompts = [
    "How can I automate HR onboarding?",
    "What is the best AI tool for customer support?",
    "How do I automate failed Stripe payments?",
    "Can I connect Gemini 2.5 Flash to Make.com?",
  ];

  const handleSend = async (userMsg = input) => {
    if (!userMsg.trim()) return;

    const newMsgs = [...messages, { sender: "user" as const, text: userMsg }];
    setMessages(newMsgs);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: "Product",
          message: `Workflow Automation Question: ${userMsg}`,
          startupContext: "AutoFlow AI Workflow Consultant Engine",
        }),
      });

      if (res.ok) {
        const json = await res.json();
        setMessages((prev) => [
          ...prev,
          { sender: "ai", text: json.response },
        ]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-[#09090b]/80 border-t border-[#27272a] relative">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400">24/7 AI Advisory</span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            AI Consultant <span className="text-gradient">Interactive Chat</span>
          </h2>
          <p className="text-sm text-[#a1a1aa] font-medium leading-relaxed">
            Ask any workflow automation question and receive instant data-grounded AI recommendations with sample stack architectures.
          </p>
        </div>

        <div className="max-w-3xl mx-auto rounded-3xl bg-[#18181b] border border-[#27272a] p-6 space-y-4 shadow-2xl flex flex-col h-[520px]">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#27272a] pb-3">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-purple-400" />
              <span className="font-bold text-sm text-white">AutoFlow Senior AI Consultant</span>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
              Gemini 2.5 Active
            </span>
          </div>

          {/* Sample Prompts */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <span className="text-[11px] font-bold text-slate-400 shrink-0">Try Asking:</span>
            {samplePrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(p)}
                className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-[#27272a] text-slate-300 transition-all shrink-0"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-1">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex gap-3 ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                {m.sender === "ai" && (
                  <div className="w-7 h-7 rounded-xl bg-purple-600 flex items-center justify-center text-white shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                    m.sender === "user"
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-tr-none"
                      : "bg-[#09090b] border border-[#27272a] text-slate-200 rounded-tl-none"
                  }`}
                >
                  <div className="whitespace-pre-wrap">{m.text}</div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-xs text-slate-400 p-3 bg-white/5 rounded-xl w-fit">
                <Sparkles className="w-4 h-4 text-purple-400 animate-spin" />
                <span>AutoFlow AI is typing automation architecture...</span>
              </div>
            )}
          </div>

          {/* Input Box */}
          <div className="relative pt-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask AutoFlow AI how to automate any business department..."
              className="w-full pl-4 pr-12 py-3 rounded-xl bg-[#09090b] border border-[#27272a] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50"
            />
            <button
              onClick={() => handleSend()}
              disabled={loading || !input.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-purple-600 text-white hover:opacity-90 disabled:opacity-50 transition-all"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
