"use client";

import React from "react";
import { GlassCard } from "../glass-ui/glass-card";
import { GlassButton } from "../glass-ui/glass-button";
import { Check } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function PricingTease() {
  return (
    <section
      className="py-24 px-6 md:px-12 w-full max-w-5xl mx-auto relative z-10"
      id="pricing"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
          Simple, scalable pricing
        </h2>
        <p className="text-lg opacity-70">
          Start for free during the hackathon. Upgrade for real-world B2B
          volume.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-12">
        {/* Freemium Tier */}
        <GlassCard
          depth={1}
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="p-8 relative flex flex-col bg-[var(--foreground)]/5 border-transparent"
        >
          <h3 className="text-2xl font-semibold opacity-90">Freemium</h3>
          <div className="mt-4 mb-4 flex items-baseline gap-1">
            <span className="text-4xl font-bold">₦0</span>
            <span className="opacity-50 font-medium">/month</span>
          </div>
          <p className="text-sm opacity-60 mb-8 min-h-[40px]">
            Perfect for smaller merchants starting their intelligence journey.
          </p>
          <ul className="space-y-4 mb-8 flex-1 opacity-80 text-sm">
            <li className="flex gap-3 items-center">
              <Check className="w-4 h-4 text-[var(--accent-primary)]" /> Up to
              500 transactions/mo
            </li>
            <li className="flex gap-3 items-center">
              <Check className="w-4 h-4 text-[var(--accent-primary)]" /> Basic
              Revenue insights
            </li>
            <li className="flex gap-3 items-center">
              <Check className="w-4 h-4 text-[var(--accent-primary)]" />{" "}
              Personal Dashboard
            </li>
          </ul>
          <Link href="/login" className="w-full mt-auto">
            <GlassButton variant="secondary" className="w-full">
              Start Free
            </GlassButton>
          </Link>
        </GlassCard>

        {/* Pro Tier */}
        <GlassCard
          depth={3}
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="p-8 relative flex flex-col border-[var(--accent-primary)]/50 shadow-[var(--accent-primary)]/20 scale-105"
        >
          {/* <div className="absolute top-0 right-0 bg-[var(--accent-primary)] text-[var(--background)] text-xs font-bold px-6 py-2 rounded-bl-xl uppercase tracking-wider shadow-lg">
            Pitch Focus
          </div> */}
          <h3 className="text-2xl font-semibold text-[var(--accent-primary)]">
            RevAI Pro
          </h3>
          <div className="mt-4 mb-4 flex items-baseline gap-1">
            <span className="text-4xl font-bold">₦4,900</span>
            <span className="opacity-50 font-medium">/mo</span>
          </div>
          <p className="text-sm opacity-80 mb-8 min-h-[40px] text-[var(--accent-primary)]">
            Unlock full Groq intelligence for heavy volume POS agents.
          </p>
          <ul className="space-y-4 mb-8 flex-1 text-sm">
            <li className="flex gap-3 items-center">
              <Check className="w-4 h-4 text-[var(--accent-primary)]" />{" "}
              Unlimited transactions
            </li>
            <li className="flex gap-3 items-center">
              <Check className="w-4 h-4 text-[var(--accent-primary)]" />{" "}
              Advanced Groq AI Forecasts
            </li>
            <li className="flex gap-3 items-center">
              <Check className="w-4 h-4 text-[var(--accent-primary)]" />{" "}
              Contextual AI Chatbot Access
            </li>
            <li className="flex gap-3 items-center">
              <Check className="w-4 h-4 text-[var(--accent-primary)]" />{" "}
              White-label Reports
            </li>
          </ul>
          <Link href="/login" className="w-full mt-auto">
            <GlassButton variant="primary" className="w-full">
              Try Pro Now
            </GlassButton>
          </Link>
        </GlassCard>

        {/* Enterprise API Tier */}
        <GlassCard
          depth={1}
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="p-8 relative flex flex-col bg-[var(--foreground)]/5 border-transparent"
        >
          <h3 className="text-2xl font-semibold opacity-90">API Usage</h3>
          <div className="mt-4 mb-4 flex items-baseline gap-1">
            <span className="text-4xl font-bold">₦2</span>
            <span className="opacity-50 font-medium">/api call</span>
          </div>
          <p className="text-sm opacity-60 mb-8 min-h-[40px]">
            Designed entirely for Fintechs seamlessly extending our scoring
            engine.
          </p>
          <ul className="space-y-4 mb-8 flex-1 opacity-80 text-sm">
            <li className="flex gap-3 items-center">
              <Check className="w-4 h-4 text-[var(--accent-primary)]" />{" "}
              Server-to-Server API Keys
            </li>
            <li className="flex gap-3 items-center">
              <Check className="w-4 h-4 text-[var(--accent-primary)]" /> Direct
              Fraud Anomaly Endpoint
            </li>
            <li className="flex gap-3 items-center">
              <Check className="w-4 h-4 text-[var(--accent-primary)]" />{" "}
              Nano-Credit Scoring Websockets
            </li>
            <li className="flex gap-3 items-center">
              <Check className="w-4 h-4 text-[var(--accent-primary)]" /> 99.99%
              Uptime SLA
            </li>
          </ul>
          <Link href="/api-docs" className="w-full mt-auto">
            <GlassButton variant="secondary" className="w-full">
              View API Docs
            </GlassButton>
          </Link>
        </GlassCard>
      </div>
    </section>
  );
}
