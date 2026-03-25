"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

type GlassProps = HTMLMotionProps<"div"> & {
  depth?: 1 | 2 | 3;
  blur?: number; 
  className?: string;
  children?: React.ReactNode;
};

export function GlassCard({
  depth = 2,
  blur = 40,
  className,
  children,
  ...motionProps
}: GlassProps) {
  return (
    <motion.div
      {...motionProps}
      className={cn(
        "rounded-2xl relative overflow-hidden",
        "bg-[var(--glass-panel)]",
        "border border-[var(--glass-border)]",
        className
      )}
      style={{
        backdropFilter: `blur(${blur}px) saturate(150%)`,
        WebkitBackdropFilter: `blur(${blur}px) saturate(150%)`,
        boxShadow: "var(--glass-shadow), var(--glass-highlight)"
      }}
    >
      <div className="relative z-10 w-full h-full">{children}</div>
    </motion.div>
  );
}
