"use client";

import React from "react";
import { GlassCard } from "../glass-ui/glass-card";
import { BrainCircuit, PlugZap, ShieldAlert } from "lucide-react";
import { motion, Variants } from "framer-motion";

export function Features() {
  const features = [
    {
      title: "API Extensibility",
      description: "Build directly on top of our standalone B2B REST APIs. Fetch forecasts, insights, and anomalies programmatically to embed in your own fintech apps.",
      icon: PlugZap,
    },
    {
      title: "Cash Flow Prediction",
      description: "Groq-powered Llama 3 models calculate high-speed revenue estimations for your next 30 days based on recent velocity metrics and success ceilings.",
      icon: BrainCircuit,
    },
    {
      title: "Anomaly & Fraud Alerts",
      description: "Automated Math Z-Score deviations layered contextually with LLM explanations to highlight sudden volume drops or abnormal transaction spikes in real time.",
      icon: ShieldAlert,
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.4 },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <section className="py-24 px-6 md:px-12 w-full max-w-7xl mx-auto relative z-10" id="features">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
          Intelligence layer <br className="hidden sm:block" /> for your payments.
        </h2>
        <p className="text-lg opacity-70 max-w-2xl mx-auto">
          We don't just display your Interswitch data—we understand it. RevAI transforms raw transaction logs into actionable business intelligence.
        </p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {features.map((f, i) => (
          <GlassCard key={i} depth={2} variants={itemVariants} className="p-8 flex flex-col items-start gap-4">
            <div className="p-4 rounded-2xl bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] border border-[var(--accent-primary)]/30">
              <f.icon className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mt-2">
              {f.title}
            </h3>
            <p className="opacity-80 leading-relaxed">
              {f.description}
            </p>
          </GlassCard>
        ))}
      </motion.div>
    </section>
  );
}
