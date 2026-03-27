"use client";

import React from "react";
import { GlassContainer } from "../glass-ui/glass-container";
import { GlassButton } from "../glass-ui/glass-button";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function Hero() {
  const springConfig = { type: "spring" as const, stiffness: 100, damping: 15 };

  return (
    <GlassContainer className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 md:px-8  overflow-hidden">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={springConfig}
        className="absolute top-10 flex w-full justify-between items-center max-w-7xl mx-auto px-6"
      >
        <h1 className="text-xl font-bold tracking-tighter">RevAI</h1>
        <div className="flex gap-2">
          <Link href="/login">
            <GlassButton variant="ghost" size="sm" className="font-semibold">
              Login
            </GlassButton>
          </Link>
          <Link
            className="hidden md:block"
            href={"https://github.com/davistar21/rev-ai"}
            target=""
          >
            <GlassButton variant="primary">View on GitHub</GlassButton>
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ ...springConfig, delay: 0.1 }}
        className="z-10 max-w-4xl mx-auto mt-16 leading-tight"
      >
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium text-[var(--accent-primary)] bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/20 rounded-full">
            <Sparkles className="w-4 h-4" />
            <span>Interswitch x Enyata Buildathon 2026</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>CyberForce | Open Source</span>
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 balanced">
          AI Revenue Intelligence on <br className="hidden md:block" />
          <span className="text-[var(--accent-primary)]">Interswitch</span>
        </h1>

        <p className="text-xl opacity-80 mb-10 max-w-2xl mx-auto leading-relaxed">
          Analyze Interswitch tx → Revenue forecast + Fraud alerts + Nano-credit
          score implicitly tied exclusively to Groq inference logic.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/login">
            <GlassButton
              size="lg"
              variant="primary"
              className="w-full sm:w-auto text-lg px-8 hover:scale-105 transition-transform"
            >
              Go to Merchant Hub <ArrowRight className="w-5 h-5 ml-2" />
            </GlassButton>
          </Link>
          <a href="#api-docs">
            <GlassButton
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto text-lg px-8 hover:scale-105 transition-transform"
            >
              Explore API
            </GlassButton>
          </a>
        </div>
      </motion.div>

      {/* Aesthetic mock dashboard preview slice */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 0.9 }}
        transition={{ ...springConfig, delay: 0.3 }}
        className="w-full max-w-5xl mx-auto mt-20 z-10 hidden md:block hover:scale-[1.02] duration-500"
      >
        <div className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-panel)] backdrop-blur-3xl shadow-[var(--glass-shadow)] overflow-hidden aspect-[21/9] relative">
          <div className="absolute inset-0 bg-linear-to-b from-transparent to-[var(--background)]/80 z-20" />
          {/* Abstract representation of dashboard */}
          <div className="p-8 grid grid-cols-4 gap-4 opacity-50">
            <div className="h-24 rounded-xl bg-[var(--foreground)]/10 col-span-1" />
            <div className="h-24 rounded-xl bg-[var(--foreground)]/10 col-span-1" />
            <div className="h-24 rounded-xl bg-[var(--foreground)]/10 col-span-1" />
            <div className="h-24 rounded-xl bg-[var(--foreground)]/10 col-span-1" />
            <div className="h-64 rounded-xl bg-[var(--foreground)]/10 col-span-3 mt-4" />
            <div className="h-64 rounded-xl bg-[var(--foreground)]/10 col-span-1 mt-4" />
          </div>
        </div>
      </motion.div>
    </GlassContainer>
  );
}
