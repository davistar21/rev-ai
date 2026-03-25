import React from "react";
import { GlassCard } from "./glass-card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

type GlassStatCardProps = {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    label: string;
    isPositive: boolean;
  };
  className?: string;
  isLoading?: boolean;
};

export function GlassStatCard({
  title,
  value,
  icon: Icon,
  trend,
  className,
  isLoading,
}: GlassStatCardProps) {
  return (
    <GlassCard depth={2} className={cn("p-6 flex flex-col gap-4", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mix-blend-luminosity">
          {title}
        </h3>
        <div className="p-2 bg-white/40 dark:bg-black/30 rounded-lg border border-white/40 dark:border-white/10">
          <Icon className="w-5 h-5 text-zinc-900 dark:text-zinc-100" />
        </div>
      </div>
      
      <div className="flex flex-col gap-1">
        {isLoading ? (
          <div className="h-9 w-24 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
        ) : (
          <span className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">
            {value}
          </span>
        )}
        {trend && !isLoading && (
          <div className="flex items-center gap-2 text-sm mt-1">
            <span
              className={cn(
                "px-2 py-0.5 rounded-full text-xs font-medium",
                trend.isPositive
                  ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                  : "bg-rose-500/10 text-rose-700 dark:text-rose-400"
              )}
            >
              {trend.isPositive ? "+" : "-"}{Math.abs(trend.value)}%
            </span>
            <span className="text-zinc-500 dark:text-zinc-400 text-xs">
              {trend.label}
            </span>
          </div>
        )}
      </div>
    </GlassCard>
  );
}
