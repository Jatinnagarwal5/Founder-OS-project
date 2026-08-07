"use client";

import React from "react";

export default function LoadingSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-28 rounded-2xl bg-white/5 border border-white/10" />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="h-24 rounded-2xl bg-white/5 border border-white/10" />
        <div className="h-24 rounded-2xl bg-white/5 border border-white/10" />
        <div className="h-24 rounded-2xl bg-white/5 border border-white/10" />
        <div className="h-24 rounded-2xl bg-white/5 border border-white/10" />
      </div>
      <div className="h-72 rounded-2xl bg-white/5 border border-white/10" />
    </div>
  );
}
