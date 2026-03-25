import { cn } from "@/lib/utils";
import React from "react";

type GlassButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  blur?: number;
  translucency?: number;
};

export function GlassButton({
  variant = "primary",
  size = "md",
  blur = 20,
  translucency = 0.8,
  className,
  children,
  ...props
}: GlassButtonProps) {
  const sizeStyles = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-6 text-base",
    lg: "h-14 px-8 text-lg font-medium",
  };

  const variantStyles = {
    primary:
      "bg-white/20 dark:bg-zinc-800/40 hover:bg-white/40 dark:hover:bg-zinc-700/50 border border-white/40 dark:border-white/10 text-zinc-900 dark:text-zinc-50 shadow-[0_4px_16px_rgba(0,0,0,0.1)]",
    secondary:
      "bg-zinc-900/10 dark:bg-white/10 hover:bg-zinc-900/20 dark:hover:bg-white/20 border border-zinc-900/10 dark:border-white/10 text-zinc-900 dark:text-zinc-50",
    ghost:
      "bg-transparent hover:bg-white/20 dark:hover:bg-white/10 text-zinc-900 dark:text-zinc-50",
  };

  return (
    <button
      className={cn(
        "relative rounded-xl font-medium transition-all duration-300 active:scale-95 flex items-center justify-center gap-2",
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
      style={{
        backdropFilter: `blur(${blur}px) saturate(1.2)`,
        WebkitBackdropFilter: `blur(${blur}px) saturate(1.2)`,
      }}
      {...props}
    >
      {/* Inner highlight for 3D feel on primary */}
      {variant === "primary" && (
        <div className="absolute inset-x-0 top-0 h-px bg-white/60 dark:bg-white/20 rounded-t-xl pointer-events-none" />
      )}
      <div className="relative z-10 flex items-center justify-center gap-2">{children}</div>
    </button>
  );
}
