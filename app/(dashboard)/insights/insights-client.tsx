"use client";

import React, { useState, useMemo } from "react";
import { GlassCard } from "@/components/glass-ui/glass-card";
import { GlassButton } from "@/components/glass-ui/glass-button";
import { formatNGN } from "@/utils/formatCurrency";
import { aggregateTx } from "@/utils/aggregateTransactions";
import { ShieldAlert, LineChart as LineChartIcon } from "lucide-react";
import type { Transaction } from "@/types/interswitch";
import { motion, AnimatePresence } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { GlassChartTooltip } from "@/components/glass-ui/glass-chart-tooltip";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

import { useTransactionStore } from "@/stores/transactionStore";
import { useInsightsStore } from "@/stores/insightsStore";
import {
  ChartSkeleton,
  AnomalySkeleton,
  TableSkeleton,
} from "@/components/glass-ui/skeletons";
import { GlassMetricBar } from "@/components/glass-ui/glass-metric-bar";
import { AnomalyTimeline } from "@/components/glass-ui/anomaly-timeline";
import {
  Zap,
  Shield,
  TrendingUp,
  Search,
  AlertTriangle,
  Lock,
  ShieldAlert as ShieldAlertIcon,
  Activity,
} from "lucide-react";

export function InsightsClient() {
  const {
    transactions,
    loading: isSyncing,
    fetchLocalDatabase,
  } = useTransactionStore();
  const {
    anomalies,
    insights,
    loadingAnomalies: isCheckingAnomalies,
    loadingInsights: isGeneratingInsights,
    scanAnomalies,
    generateInsights,
  } = useInsightsStore();

  React.useEffect(() => {
    if (transactions.length === 0) fetchLocalDatabase();
  }, [fetchLocalDatabase, transactions.length]);

  const stats = useMemo(() => aggregateTx(transactions), [transactions]);

  // Debug log to verify data structure and chronological order
  React.useEffect(() => {
    if (stats.dailyTotals.length > 0) {
      console.log("Recharts Data:", stats.dailyTotals);
    }
  }, [stats.dailyTotals]);

  const checkAnomalies = async () => {
    await scanAnomalies();
    if (!insights) await generateInsights();
  };

  const getIcon = (name: string) => {
    switch (name) {
      case "zap":
        return <Zap size={14} />;
      case "shield":
        return <Shield size={14} />;
      case "trending-up":
        return <TrendingUp size={14} />;
      case "search":
        return <Search size={14} />;
      case "alert-triangle":
        return <AlertTriangle size={14} />;
      case "lock":
        return <Lock size={14} />;
      case "activity":
        return <Activity size={14} />;
      default:
        return <Zap size={14} />;
    }
  };

  return (
    <div className="p-4 md:p-8 flex flex-col gap-8 max-w-6xl mx-auto mt-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold tracking-tight">
          Interactive Insights
        </h1>
        <p className="opacity-70 mt-1">
          Plotting volume vectors mapped alongside rigorous anomaly hunting.
        </p>
      </motion.div>

      {/* Executive Intelligence (New) */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="lg:col-span-2"
      >
        <GlassCard className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Activity className="w-5 h-5 text-[var(--accent-primary)]" />{" "}
                Executive Intelligence
              </h3>
              <p className="text-sm opacity-60 mt-1 max-w-2xl">
                {insights?.summary ||
                  "Global revenue health heuristics derived from Llama 3 analysis."}
              </p>
            </div>
            {!insights && (
              <GlassButton
                onClick={() => generateInsights()}
                disabled={isGeneratingInsights}
                size="sm"
              >
                {isGeneratingInsights ? "Generating..." : "Generate Report"}
              </GlassButton>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {insights?.metrics && Array.isArray(insights.metrics) ? (
              insights.metrics.map((m, i) => (
                <GlassMetricBar
                  key={i}
                  label={m.label}
                  value={m.value}
                  status={m.status}
                />
              ))
            ) : (
              [1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-10 bg-[var(--foreground)]/5 animate-pulse rounded-lg"
                />
              ))
            )}
          </div>

          {insights?.recommendations && Array.isArray(insights.recommendations) && (
            <div className="mt-8 pt-6 border-t border-[var(--glass-border)]">
              <h4 className="text-xs font-bold uppercase tracking-widest opacity-40 mb-4 text-center">
                Recommended Mitigations
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {insights.recommendations.map((r, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -5 }}
                    className="p-4 rounded-xl bg-[var(--foreground)]/5 border border-[var(--glass-border)] flex items-center gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[var(--accent-primary)]/10 flex items-center justify-center text-[var(--accent-primary)] group-hover:bg-[var(--accent-primary)] transition-colors group-hover:text-white">
                      {getIcon(r.icon)}
                    </div>
                    <div>
                      <div className="text-xs font-semibold">{r.action}</div>
                      <div
                        className={cn(
                          "text-[10px] font-bold uppercase mt-1",
                          r.impact === "High"
                            ? "text-rose-500"
                            : r.impact === "Medium"
                              ? "text-orange-500"
                              : "text-emerald-500",
                        )}
                      >
                        Impact: {r.impact}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </GlassCard>
      </motion.div>

      {/* Trajectory Plot */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <GlassCard className="p-6 h-[450px] flex flex-col">
          <h3 className="text-lg font-medium mb-6 flex items-center gap-2">
            <LineChartIcon className="w-5 h-5 text-[var(--accent-primary)]" />{" "}
            Trajectory Plot
          </h3>
          {/* ... Rest of the chart logic stays similar but we use h-[350px] ... */}
          <div className="flex-1 h-[350px] w-full relative mt-4">
            {isSyncing ? (
              <ChartSkeleton />
            ) : stats.dailyTotals.length > 0 ? (
              <ResponsiveContainer width="100%" height={350}>
                <LineChart
                  data={stats.dailyTotals}
                  margin={{ top: 5, right: 5, bottom: 0, left: -20 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.1)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="date"
                    stroke="var(--foreground)"
                    tick={{
                      fill: "var(--foreground)",
                      opacity: 0.5,
                      fontSize: 10,
                    }}
                    axisLine={false}
                    tickLine={false}
                    dy={10}
                  />
                  <YAxis
                    stroke="var(--foreground)"
                    tick={{
                      fill: "var(--foreground)",
                      opacity: 0.5,
                      fontSize: 10,
                    }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `₦${(v / 1000).toFixed(0)}k`}
                  />
                  <Tooltip content={<GlassChartTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="#06b6d4"
                    strokeWidth={3}
                    dot={false}
                    isAnimationActive={true}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full flex items-center justify-center opacity-50">
                No transaction datablocks available to plot.
              </div>
            )}
          </div>
        </GlassCard>
      </motion.div>

      {/* Fraud Engine (Revamped) */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.25 }}
      >
        <GlassCard className="p-6 h-[450px] flex flex-col border border-rose-500/20">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium flex items-center gap-2 text-rose-500">
              <ShieldAlertIcon className="w-5 h-5" /> Fraud Engine
            </h3>
            <GlassButton
              onClick={checkAnomalies}
              disabled={isCheckingAnomalies}
              variant="secondary"
              size="sm"
              className="text-rose-500"
            >
              {isCheckingAnomalies ? "Scanning..." : "Sync Engine"}
            </GlassButton>
          </div>

          <div className="flex-1 flex flex-col">
            <AnimatePresence mode="wait">
              {isCheckingAnomalies ? (
                <motion.div key="loading" className="flex-1">
                  <AnomalySkeleton />
                </motion.div>
              ) : !anomalies ? (
                <motion.div
                  key="empty"
                  className="flex-1 flex items-center justify-center opacity-40 text-center text-sm px-8"
                >
                  Sync the engine to map timeline-specific standard deviation
                  anomalies.
                </motion.div>
              ) : (
                <motion.div key="visual" className="flex-1 space-y-8">
                  <p className="text-[11px] uppercase tracking-wider font-bold text-rose-500/80 bg-rose-500/5 p-3 rounded-lg border border-rose-500/10">
                    {anomalies.explanation}
                  </p>

                  <div className="px-4">
                    <h4 className="text-[10px] font-bold opacity-30 uppercase mb-4">
                      Anomaly Vector Map
                    </h4>
                    {anomalies.timeline && Array.isArray(anomalies.timeline) && (
                      <AnomalyTimeline points={anomalies.timeline} />
                    )}
                  </div>

                  <div className="mt-auto space-y-2">
                    <h4 className="text-[10px] font-bold opacity-30 uppercase">
                      Hardened Mitigation Path
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {anomalies.mitigation_steps && Array.isArray(anomalies.mitigation_steps) && anomalies.mitigation_steps.map((s, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-medium"
                        >
                          {getIcon(s.styled_icon)} {s.step}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </GlassCard>
      </motion.div>

      {/* Tx Table spanning full length underneath */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="col-span-1 lg:col-span-2"
      >
        {isSyncing ? (
          <TableSkeleton />
        ) : (
          <GlassCard className="p-6">
            <h3 className="text-lg font-medium mb-4">Chronological Feed</h3>
            <div className="overflow-auto max-h-[400px] rounded-xl scrollbar-thin">
              <table className="w-full text-sm text-left align-middle">
                <thead className="text-xs uppercase bg-[var(--foreground)]/5 sticky top-0 backdrop-blur-xl z-20">
                  <tr>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Reference</th>
                    <th className="px-4 py-3">Amount</th>
                    <th className="px-4 py-3">Gate Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions
                    .slice(0, 100)
                    .map((tx: Transaction, idx: number) => (
                      <tr
                        key={tx.transactionId || idx}
                        className="border-b border-[var(--foreground)]/5 hover:bg-[var(--foreground)]/5"
                      >
                        <td className="px-4 py-4 opacity-80">
                          {new Date(tx.transactionDate).toLocaleString()}
                        </td>
                        <td className="px-4 py-4 font-mono text-xs opacity-60">
                          {tx.retrieval_reference_number}
                        </td>
                        <td className="px-4 py-4 font-medium">
                          {formatNGN(tx.amount)}
                        </td>
                        <td className="px-4 py-4">
                          <span
                            className={cn(
                              "px-2 py-1 rounded-full text-[10px] font-semibold tracking-wide",
                              tx.status === "SUCCESS"
                                ? "bg-emerald-500/20 text-emerald-500"
                                : tx.status === "FAILED"
                                  ? "bg-rose-500/20 text-rose-500"
                                  : "bg-amber-500/20 text-amber-500",
                            )}
                          >
                            {tx.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        )}
      </motion.div>
    </div>
  );
}
