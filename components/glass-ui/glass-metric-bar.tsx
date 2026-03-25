"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type MetricBarProps = {
  label: string;
  value: number;
  status: "stable" | "increasing" | "decreasing" | "critical";
  className?: string;
};

export function GlassMetricBar({ label, value, status, className }: MetricBarProps) {
  const getStatusColor = () => {
    switch (status) {
      case "increasing": return "bg-emerald-500";
      case "decreasing": return "bg-amber-500";
      case "critical": return "bg-rose-500";
      default: return "bg-[var(--accent-primary)]";
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex justify-between text-xs font-medium uppercase tracking-wider opacity-60">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-2 w-full bg-[var(--foreground)]/10 rounded-full overflow-hidden border border-[var(--glass-border)]">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={cn("h-full rounded-full shadow-[0_0_10px_rgba(var(--accent-primary),0.5)]", getStatusColor())}
        />
      </div>
    </div>
  );
}
