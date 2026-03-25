"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/glass-ui/glass-card";
import { GlassButton } from "@/components/glass-ui/glass-button";
import { Banknote, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { useInsightsStore } from "@/stores/insightsStore";

export function CreditClient() {
  const { creditScore: scoreData, loadingCredit: isScoring, generateCreditScore } = useInsightsStore();
  const [error, setError] = useState<string | null>(null);

  const handleScore = async () => {
    setError(null);
    try {
      await generateCreditScore();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="p-4 md:p-8 flex flex-col gap-8 max-w-4xl mx-auto mt-4">
      <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <h1 className="text-3xl font-bold tracking-tight">Nano-Credit Eligibility</h1>
        <p className="opacity-70 mt-1">AI-powered credit scoring derived from Interswitch inflow velocities.</p>
      </motion.div>

      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1 }}>
        <GlassCard depth={2} className="p-8 md:p-12 flex flex-col items-center border-[var(--glass-border)] text-center relative overflow-hidden">
          {/* Decorative background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[var(--accent-primary)]/10 blur-[100px] rounded-full point-events-none" />

          <div className="relative z-10 w-full flex flex-col items-center">
            <div className="p-4 bg-[var(--accent-primary)]/10 rounded-2xl text-[var(--accent-primary)] border border-[var(--accent-primary)]/30 mb-6">
              <Banknote className="w-10 h-10" />
            </div>
            
            <h2 className="text-2xl font-bold mb-4">Evaluate Merchant Risk Profile</h2>
            <p className="opacity-70 max-w-md mx-auto mb-8">
              Generate a dynamic risk score between 0-100 utilizing Llama 3 pattern recognition on raw transactional frequency, success rates, and historical stability.
            </p>

            {!scoreData && (
              <GlassButton onClick={handleScore} disabled={isScoring} variant="primary" size="lg" className="w-full sm:w-auto px-12">
                {isScoring ? (
                  <span className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full border-2 border-[var(--background)]/30 border-t-[var(--background)] animate-spin" />
                    Calculating Vectors...
                  </span>
                ) : (
                  "Generate AI Credit Score"
                )}
              </GlassButton>
            )}

            <AnimatePresence>
              {error && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="mt-6 p-4 bg-rose-500/10 text-rose-500 border border-rose-500/20 rounded-xl w-full">
                  {error}
                </motion.div>
              )}

              {scoreData && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full mt-8 border-t border-[var(--glass-border)] pt-8 flex flex-col gap-8">
                  <div className="flex flex-col md:flex-row justify-center items-center gap-8">
                    <div className="text-center">
                      <div className="text-sm font-semibold uppercase tracking-wider text-[var(--accent-primary)] mb-2">Confidence Score</div>
                      <div className="text-6xl font-bold tracking-tighter">
                        {scoreData.score}<span className="text-2xl opacity-50">/100</span>
                      </div>
                    </div>
                    
                    <div className="hidden md:block w-px h-20 bg-[var(--glass-border)]" />
                    
                    <div className="text-center">
                      <div className="text-sm font-semibold uppercase tracking-wider text-emerald-500 dark:text-emerald-400 mb-2">Loan Eligibility</div>
                      <div className="text-4xl font-bold tracking-tight text-emerald-600 dark:text-emerald-300">
                        {scoreData.suggestedAmount}
                      </div>
                    </div>
                  </div>

                  <div className="bg-[var(--foreground)]/5 p-6 rounded-2xl border border-[var(--glass-border)] text-left">
                     <h4 className="flex items-center gap-2 font-semibold mb-4 text-[var(--accent-primary)]">
                       <ShieldCheck className="w-5 h-5" /> Executive Reasoning
                     </h4>
                     <div className="prose prose-sm dark:prose-invert opacity-90 max-w-none">
                       <ReactMarkdown remarkPlugins={[remarkGfm]}>{scoreData.reasoning}</ReactMarkdown>
                     </div>
                  </div>

                  <GlassButton onClick={handleScore} disabled={isScoring} variant="secondary" className="max-w-xs mx-auto text-xs mt-4">
                     {isScoring ? "Recalculating..." : "Recalculate Bounds"}
                  </GlassButton>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
