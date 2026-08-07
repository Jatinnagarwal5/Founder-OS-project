"use client";

import React, { useState } from "react";
import { useStartup } from "@/context/StartupContext";
import { Presentation, ChevronLeft, ChevronRight, Sparkles, Maximize2, Minimize2, Check, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PitchDeckCards() {
  const { pitchDeck, startupData } = useStartup();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [slides, setSlides] = useState(pitchDeck);
  const [loading, setLoading] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);

  const activeSlide = slides[currentSlideIndex] || pitchDeck[0];

  const handleGenerateDeck = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/pitch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea: startupData.name }),
      });
      if (res.ok) {
        const json = await res.json();
        if (json.slides) setSlides(json.slides);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const nextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className={`glass-card p-6 border border-white/10 space-y-6 ${isFullscreen ? "fixed inset-0 z-50 rounded-none bg-[#070b14]/95 p-8 flex flex-col justify-between overflow-hidden" : ""}`}>
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Presentation className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-bold text-white tracking-tight">Investor Pitch Deck Deck</h2>
          </div>
          <p className="text-xs text-slate-400">8-Slide seed presentation generated for {startupData.name}</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleGenerateDeck}
            disabled={loading}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-xs hover:opacity-90 transition-all flex items-center gap-1.5 shadow-md"
          >
            <Sparkles className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>{loading ? "Regenerating..." : "Generate Deck"}</span>
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 transition-all"
            title={isFullscreen ? "Exit Presentation Mode" : "Full-Screen Pitch Mode"}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Slide Navigator Thumbnails */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {slides.map((s, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlideIndex(idx)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all border ${
              currentSlideIndex === idx
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 border-blue-400 text-white shadow-md"
                : "bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10"
            }`}
          >
            {s.slideNumber}. {s.title}
          </button>
        ))}
      </div>

      {/* Main Slide Card Display */}
      <div className="relative min-h-[320px] sm:min-h-[380px] rounded-2xl bg-gradient-to-br from-[#0d1527] via-[#101b33] to-[#0d1527] border border-white/15 p-6 sm:p-10 flex flex-col justify-between shadow-2xl overflow-hidden">
        {/* Slide background glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-blue-500/10 via-purple-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div>
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                Slide 0{activeSlide.slideNumber} / 0{slides.length}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-0.5">
                {activeSlide.title}
              </h3>
            </div>
            <span className="text-xs font-bold text-slate-400 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              {startupData.name}
            </span>
          </div>

          <p className="text-base sm:text-lg font-semibold text-slate-200 mb-6 italic">
            "{activeSlide.subtitle}"
          </p>

          <div className="space-y-3 mb-6">
            {activeSlide.content.map((point, idx) => (
              <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                <span className="w-2 h-2 rounded-full bg-blue-400 mt-2 shrink-0 shadow-sm shadow-blue-400" />
                <span className="leading-relaxed">{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Highlight Banner */}
        {activeSlide.highlight && (
          <div className="p-3 sm:p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 text-xs sm:text-sm font-bold text-blue-300 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
            <span>Key Takeaway: {activeSlide.highlight}</span>
          </div>
        )}
      </div>

      {/* Slide Navigation Buttons */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={prevSlide}
          className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium text-xs transition-all flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous Slide</span>
        </button>

        <span className="text-xs font-semibold text-slate-400">
          Slide {currentSlideIndex + 1} of {slides.length}
        </span>

        <button
          onClick={nextSlide}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-95 text-white font-medium text-xs transition-all flex items-center gap-2 shadow-md shadow-blue-500/20"
        >
          <span>Next Slide</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
