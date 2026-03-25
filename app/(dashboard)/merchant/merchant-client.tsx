"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/glass-ui/glass-card";
import { GlassButton } from "@/components/glass-ui/glass-button";
import { GlassStatCard } from "@/components/glass-ui/glass-stat-card";
import {
  Wallet,
  Activity,
  ArrowUpRight,
  TrendingDown,
  RefreshCw,
  Sparkles,
  LineChart,
  Banknote,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Transaction } from "@/types/interswitch";
import { aggregateTx } from "@/utils/aggregateTransactions";
import { formatNGN } from "@/utils/formatCurrency";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Link from "next/link";

import { useTransactionStore } from "@/stores/transactionStore";
import { useInsightsStore } from "@/stores/insightsStore";
import { UploadModal } from "@/components/upload-modal";
import { Upload } from "lucide-react";
import { StatCardSkeleton } from "@/components/glass-ui/skeletons";

export function MerchantClient() {
  const [isUploadOpen, setUploadOpen] = useState(false);
  const {
    transactions,
    loading: isSyncing,
    syncTransactions,
    fetchLocalDatabase,
  } = useTransactionStore();
  const {
    insights,
    loadingInsights: isGenerating,
    generateInsights,
  } = useInsightsStore();

  // On mount, if transactions are empty, try to hydrate from the SQLite API.
  React.useEffect(() => {
    if (transactions.length === 0) {
      fetchLocalDatabase();
    }
  }, [fetchLocalDatabase, transactions.length]);

  const stats = aggregateTx(transactions);

  const handleSync = async () => {
    await syncTransactions();
  };

  const handleGenerateInsights = async () => {
    await generateInsights();
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <div className="p-4 md:p-8 flex flex-col gap-8 max-w-6xl mx-auto mt-4">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Merchant Hub</h1>
          <p className="opacity-70 mt-1">Real-time transaction intelligence</p>
        </div>
        <GlassButton
          onClick={() => setUploadOpen(true)}
          disabled={isSyncing}
          variant="primary"
          className="w-full md:w-auto"
        >
          <Upload className={`w-4 h-4 mr-2`} />
          Upload Interswitch CSV
        </GlassButton>
        <UploadModal
          isOpen={isUploadOpen}
          onClose={() => setUploadOpen(false)}
        />
      </motion.div>

      {/* Stats Row */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <motion.div variants={itemVariants}>
          {isSyncing ? <StatCardSkeleton /> : (
            <GlassStatCard
              title="Total Appr. Revenue"
              value={formatNGN(stats.totalRevenue)}
              icon={Wallet}
            />
          )}
        </motion.div>
        <motion.div variants={itemVariants}>
          {isSyncing ? <StatCardSkeleton /> : (
            <GlassStatCard
              title="Success Volume"
              value={stats.successCount.toString()}
              icon={Activity}
            />
          )}
        </motion.div>
        <motion.div variants={itemVariants}>
          {isSyncing ? <StatCardSkeleton /> : (
            <GlassStatCard
              title="Success Rate"
              value={`${stats.successRate}%`}
              icon={ArrowUpRight}
            />
          )}
        </motion.div>
        <motion.div variants={itemVariants}>
          {isSyncing ? <StatCardSkeleton /> : (
            <GlassStatCard
              title="Failed Transactions"
              value={stats.failCount.toString()}
              icon={TrendingDown}
              trend={
                stats.failCount > 0
                  ? { value: 2.1, label: "elevated", isPositive: false }
                  : undefined
              }
            />
          )}
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Insights Section */}
        <GlassCard
          depth={2}
          className="col-span-1 lg:col-span-2 p-6 flex flex-col min-h-[400px]"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[var(--accent-primary)]" />{" "}
              Executive Summary
            </h3>
            <GlassButton
              onClick={handleGenerateInsights}
              disabled={isGenerating}
              variant="secondary"
              size="sm"
              className="text-[var(--accent-primary)]"
            >
              {isGenerating ? "Analyzing..." : "Generate Insights"}
            </GlassButton>
          </div>

          <div className="flex-1 bg-[var(--foreground)]/5 rounded-xl border border-[var(--glass-border)] p-4 overflow-auto scrollbar-thin">
            <AnimatePresence mode="wait">
              {!insights && !isGenerating && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex flex-col items-center justify-center opacity-50"
                >
                  <p>
                    Trigger Generation to formulate Revenue & Fraud summaries.
                  </p>
                </motion.div>
              )}
              {isGenerating && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex flex-col items-center justify-center"
                >
                  <div className="w-6 h-6 rounded-full border-2 border-[var(--accent-primary)]/30 border-t-[var(--accent-primary)] animate-spin mb-4" />
                </motion.div>
              )}
              {insights && !isGenerating && (
                <motion.div
                  key="content"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  <p className="text-sm font-medium opacity-90 leading-relaxed border-l-2 border-[var(--accent-primary)] pl-4 py-1 bg-[var(--accent-primary)]/5 rounded-r-lg">
                    {insights.summary}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {insights?.metrics && Array.isArray(insights.metrics) && insights.metrics.slice(0, 2).map((m, i) => (
                      <div key={i} className="p-3 bg-[var(--foreground)]/5 rounded-xl border border-[var(--glass-border)]">
                        <div className="flex justify-between text-[10px] uppercase font-bold opacity-40 mb-2">
                          <span>{m.label}</span>
                          <span>{m.value}%</span>
                        </div>
                        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${m.value}%` }}
                            className="h-full bg-[var(--accent-primary)]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </GlassCard>

        {/* Quick Actions */}
        <div className="flex flex-col gap-6">
          <Link href="/insights" className="flex-1">
            <GlassCard className="h-full p-6 flex flex-col items-start gap-4 hover:-translate-y-1 transition-transform group cursor-pointer border border-[var(--accent-primary)]/20 hover:border-[var(--accent-primary)]/50">
              <div className="p-3 bg-[var(--accent-primary)]/10 rounded-xl text-[var(--accent-primary)]">
                <LineChart className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold">Deep Dive Insights</h3>
              <p className="opacity-70 text-sm">
                Explore interactive anomaly detection engines and graphical
                revenue plotting.
              </p>
              <div className="mt-auto font-medium text-[var(--accent-primary)] text-sm group-hover:translate-x-1 transition-transform">
                Explore Core Metrics &rarr;
              </div>
            </GlassCard>
          </Link>

          <Link href="/credit" className="flex-1">
            <GlassCard className="h-full p-6 flex flex-col items-start gap-4 hover:-translate-y-1 transition-transform group cursor-pointer border border-amber-500/20 hover:border-amber-500/50">
              <div className="p-3 bg-amber-500/10 rounded-xl text-amber-500">
                <Banknote className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold">Nano-Credit Score</h3>
              <p className="opacity-70 text-sm">
                Evaluate transactional velocity mapping directly into localized
                loan eligibilities.
              </p>
              <div className="mt-auto font-medium text-amber-500 text-sm group-hover:translate-x-1 transition-transform">
                Check Eligibility &rarr;
              </div>
            </GlassCard>
          </Link>
        </div>
      </div>
    </div>
  );
}
