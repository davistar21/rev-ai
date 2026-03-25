"use client";

import { GlassContainer } from "@/components/glass-ui/glass-container";
import { GlassCard } from "@/components/glass-ui/glass-card";
import { GlassButton } from "@/components/glass-ui/glass-button";
import { ShieldAlert } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <GlassContainer className="flex items-center justify-center p-4">
      <GlassCard className="max-w-md w-full p-8 text-center flex flex-col items-center gap-4 border-rose-500/20">
        <ShieldAlert className="w-12 h-12 text-rose-500 mb-2" />
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
          Application Error
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6 font-medium">
          {error.message || "An unexpected error occurred in the application."}
        </p>
        <div className="flex gap-4 w-full">
          <GlassButton onClick={() => reset()} variant="secondary" className="w-full">
            Try again
          </GlassButton>
          <Link href="/" className="w-full">
            <GlassButton variant="primary" className="w-full">
              Go Home
            </GlassButton>
          </Link>
        </div>
      </GlassCard>
    </GlassContainer>
  );
}
