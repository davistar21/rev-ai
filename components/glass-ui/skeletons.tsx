"use client";

import { motion } from "framer-motion";
import { GlassCard } from "./glass-card";

/**
 * Standard pulsing base rectangle for building skeletons.
 */
export function SkeletonBase({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-[var(--foreground)]/10 rounded-md ${
        className || ""
      }`}
    />
  );
}

/**
 * Skeleton specific to the 4 main statistic cards on the merchant dashboard.
 */
export function StatCardSkeleton() {
  return (
    <GlassCard className="p-6">
      <div className="flex justify-between items-start mb-4">
        <SkeletonBase className="h-4 w-24" />
        <SkeletonBase className="h-8 w-8 rounded-lg" />
      </div>
      <SkeletonBase className="h-8 w-32 mb-2" />
      <SkeletonBase className="h-3 w-40" />
    </GlassCard>
  );
}

/**
 * Skeleton designed explicitly to replace chronological tables during latency.
 */
export function TableSkeleton() {
  return (
    <GlassCard className="p-6">
      <SkeletonBase className="h-6 w-48 mb-6" />
      <div className="flex flex-col gap-4">
        {/* Table Header Row Mimic */}
        <div className="flex justify-between border-b border-[var(--foreground)]/10 pb-2">
          <SkeletonBase className="h-3 w-1/4" />
          <SkeletonBase className="h-3 w-1/4" />
          <SkeletonBase className="h-3 w-1/4" />
          <SkeletonBase className="h-3 w-1/4" />
        </div>
        {/* Table Rows */}
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex justify-between py-2">
            <SkeletonBase className="h-4 w-1/5" />
            <SkeletonBase className="h-4 w-1/4" />
            <SkeletonBase className="h-4 w-1/5 border-r border-transparent" />
            <SkeletonBase className="h-6 w-16 rounded-full" />
          </div>
        ))}
      </div>
    </GlassCard>
  );
}

/**
 * Skeleton simulating building interactive Recharts trajectories.
 */
export function ChartSkeleton() {
  return (
    <div className="w-full h-[300px] flex flex-col items-center justify-center animate-pulse bg-[var(--foreground)]/5 rounded-xl border border-[var(--glass-border)]">
      <div className="w-8 h-8 rounded-full border-2 border-[var(--accent-primary)]/30 border-t-[var(--accent-primary)] animate-spin mb-4" />
      <p className="opacity-50 text-sm">Aggregating Revenue Vectors...</p>
    </div>
  );
}

/**
 * Anomaly Feed Skeleton mapped for the Fraud Insights block.
 */
export function AnomalySkeleton() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-rose-500/30 border-t-rose-500 animate-spin" />
      <p className="opacity-50 text-sm mt-4 text-rose-500">Scanning anomaly layers...</p>
    </div>
  );
}
