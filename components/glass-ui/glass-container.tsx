import { cn } from "@/lib/utils";
import React from "react";

export function GlassContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "min-h-screen w-full relative overflow-x-hidden transition-colors duration-500",
        "bg-[var(--background)] text-[var(--foreground)]",
        className
      )}
    >
      {/* Vibrant Distortions for the Glass to Refract */}
      <div className="absolute top-[-5%] left-[-5%] w-[40vw] h-[40vw] rounded-full bg-[var(--accent-primary)] opacity-30 dark:opacity-20 blur-[100px] pointer-events-none mix-blend-multiply dark:mix-blend-screen transition-all duration-700" />
      <div className="absolute bottom-[20%] right-[-5%] w-[50vw] h-[50vw] rounded-full bg-blue-400 dark:bg-violet-600 opacity-20 dark:opacity-15 blur-[120px] pointer-events-none mix-blend-multiply dark:mix-blend-screen transition-all duration-700" />
      
      <div className="relative z-10 w-full h-full min-h-screen flex flex-col">
        {children}
      </div>
    </div>
  );
}
