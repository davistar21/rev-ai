"use client";

import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, TrendingDown, TrendingUp, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

type AnomalyPoint = {
  date: string;
  value: number;
  type: "drop" | "spike" | "pattern";
  severity: "low" | "medium" | "high" | "critical";
  description: string;
};

export function AnomalyTimeline({ points }: { points: AnomalyPoint[] }) {
  if (!points || points.length === 0) return null;

  return (
    <div className="relative pt-8 pb-4">
      {/* Horizontal Line */}
      <div className="absolute top-[52px] left-0 w-full h-[1px] bg-[var(--foreground)]/10" />
      
      <div className="flex justify-between items-center relative z-10">
        {points.map((p, i) => {
          const Icon = p.type === "drop" ? TrendingDown : p.type === "spike" ? TrendingUp : Activity;
          const severityColor = 
            p.severity === "critical" ? "text-rose-500 shadow-rose-500/50" :
            p.severity === "high" ? "text-orange-500 shadow-orange-500/50" :
            "text-[var(--accent-primary)] shadow-[var(--accent-primary)]/50";

          return (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center gap-4 group cursor-help"
            >
              <div className="text-[10px] uppercase font-bold opacity-40">{p.date}</div>
              <div className={cn(
                "w-10 h-10 rounded-xl bg-[var(--glass-panel)] border border-[var(--glass-border)] flex items-center justify-center transition-all duration-300 group-hover:scale-125 group-hover:shadow-[0_0_20px] shadow-sm",
                severityColor
              )}>
                <Icon size={18} />
              </div>
              <div className="absolute -bottom-12 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-[var(--background)]/80 backdrop-blur-md border border-[var(--glass-border)] p-2 rounded-lg text-[10px] z-50 pointer-events-none max-w-[150px] text-center uppercase tracking-tighter">
                {p.description}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
