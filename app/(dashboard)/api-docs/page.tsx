"use client";

import React from "react";
import { GlassCard } from "@/components/glass-ui/glass-card";
import { TerminalSquare, Shield, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function ApiDocsPage() {
  const endpoints = [
    {
      method: "POST",
      path: "/api/revai/analyze",
      description: "Generates an Executive AI Summary and Aggregation block parsing absolute 30-day velocity metrics natively into JSON.",
      payload: "{ \"period\": \"last-30-days\" }",
      response: "{ \"success\": true, \"aggregation\": {...}, \"insights\": \"...\" }"
    },
    {
      method: "POST",
      path: "/api/revai/anomalies",
      description: "Triggers mathematical Z-Score detection layered with Llama 3 contextual severity explanations.",
      payload: "{}",
      response: "{ \"success\": true, \"analysis\": { \"explanation\": \"...\" } }"
    },
    {
      method: "POST",
      path: "/api/revai/credit-score",
      description: "Analyzes raw transactional frequency to evaluate Nano-Credit scoring paradigms between 0-100.",
      payload: "{}",
      response: "{ \"success\": true, \"data\": { \"score\": 85, \"suggestedAmount\": \"₦50k - ₦150k\" } }"
    }
  ];

  return (
    <div className="p-4 md:p-8 flex flex-col gap-8 max-w-4xl mx-auto mt-4">
      <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <h1 className="text-3xl font-bold tracking-tight">API Documentation</h1>
        <p className="opacity-70 mt-1">Connect natively to the RevAI Headless Infrastructure.</p>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
        <GlassCard depth={2} className="p-6 border-[var(--glass-border)] border text-sm">
          <div className="flex items-center gap-3 mb-4 text-[var(--accent-primary)] font-semibold text-lg">
            <Shield className="w-5 h-5" /> Edge Authentication
          </div>
          <p className="opacity-80 mb-4 leading-relaxed bg-[var(--foreground)]/5 p-4 rounded-xl border border-[var(--glass-border)]">
            Every standalone enterprise endpoint is protected via Edge Middleware interception. You must provide your authorized API key inside the HTTP Header array globally before querying inference engines.
          </p>
          <div className="bg-black/50 dark:bg-black/80 rounded-xl p-4 font-mono text-xs border border-white/10 text-emerald-400 overflow-x-auto selection:bg-[var(--accent-primary)]/30">
            X-API-Key: revai-demo-key
          </div>
        </GlassCard>
      </motion.div>

      <div className="flex flex-col gap-6 mt-4">
        {endpoints.map((ep, i) => (
          <motion.div key={i} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 + (i * 0.1) }}>
            <GlassCard depth={1} className="overflow-hidden border border-[var(--glass-border)] transition-transform hover:-translate-y-1">
              <div className="flex items-center justify-between bg-[var(--foreground)]/5 px-6 py-4 border-b border-[var(--glass-border)]">
                <div className="flex gap-4 items-center">
                  <span className="text-[10px] font-bold tracking-wider px-2 py-1 rounded bg-[var(--accent-primary)]/20 text-[var(--accent-primary)] uppercase">
                    {ep.method}
                  </span>
                  <span className="font-mono text-sm tracking-tight opacity-90">{ep.path}</span>
                </div>
                <TerminalSquare className="w-5 h-5 opacity-40" />
              </div>

              <div className="p-6 flex flex-col gap-4 text-sm opacity-90">
                <p>{ep.description}</p>
                
                <div className="flex flex-col gap-2 mt-2">
                  <span className="text-xs uppercase tracking-wide opacity-50 font-semibold">cURL Execution Example</span>
                  <div className="bg-black/50 dark:bg-black/80 p-4 rounded-xl font-mono text-xs text-blue-300 border border-white/10 overflow-x-auto whitespace-pre">
                    curl -X {ep.method} http://localhost:3000{ep.path} \<br/>
                    &nbsp;&nbsp;-H "Content-Type: application/json" \<br/>
                    &nbsp;&nbsp;-H "X-API-Key: revai-demo-key" {ep.payload !== "{}" ? `\\\n  -d '${ep.payload}'` : ""}
                  </div>
                </div>

                <div className="flex flex-col gap-2 mt-2">
                  <span className="flex items-center gap-2 text-xs uppercase tracking-wide text-emerald-500 font-semibold">
                    <CheckCircle className="w-3 h-3" /> Response Definition
                  </span>
                  <div className="bg-black/50 dark:bg-black/80 p-4 rounded-xl font-mono text-xs text-emerald-300 border border-white/10 overflow-x-auto selection:bg-emerald-500/30">
                    {ep.response}
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
