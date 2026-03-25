import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useTransactionStore } from './transactionStore';
import { simulateLatency } from '@/utils/delay';

type CreditScoreData = {
  score: number;
  suggestedAmount: string;
  reasoning: string;
};

type MetricItem = {
  label: string;
  value: number;
  status: "stable" | "increasing" | "decreasing" | "critical";
};

type AnomalyPoint = {
  date: string;
  value: number;
  type: "drop" | "spike" | "pattern";
  severity: "low" | "medium" | "high" | "critical";
  description: string;
};

type RecommendationAction = {
  action: string;
  impact: "Low" | "Medium" | "High";
  icon: string;
};

type InsightsData = {
  summary: string;
  metrics: MetricItem[];
  recommendations: RecommendationAction[];
};

type AnomalyData = {
  explanation: string;
  timeline: AnomalyPoint[];
  mitigation_steps: { step: string; styled_icon: string }[];
};

type InsightsState = {
  insights: InsightsData | null;
  anomalies: AnomalyData | null;
  creditScore: CreditScoreData | null;
  loadingInsights: boolean;
  loadingAnomalies: boolean;
  loadingCredit: boolean;
  generateInsights: () => Promise<void>;
  scanAnomalies: () => Promise<void>;
  generateCreditScore: () => Promise<void>;
  clear: () => void;
};

export const useInsightsStore = create<InsightsState>()(
  persist(
    (set: any): InsightsState => ({
      insights: null,
      anomalies: null,
      creditScore: null,
      loadingInsights: false,
      loadingAnomalies: false,
      loadingCredit: false,
      
      generateInsights: async () => {
        set({ loadingInsights: true });
        await simulateLatency(400, 900);
        const txs = useTransactionStore.getState().transactions;
        try {
          const res = await fetch("/api/revai/analyze", {
            method: "POST",
            headers: { "Content-Type": "application/json", "x-api-key": "revai-demo-key" },
            body: JSON.stringify({ period: "last-30-days", transactions: txs }),
          });
          const json = await res.json();
          if (res.ok) set({ insights: json.insights });
        } catch (error) {
          console.error("Failed executing Llama 3 analysis:", error);
        } finally {
          set({ loadingInsights: false });
        }
      },

      scanAnomalies: async () => {
        set({ loadingAnomalies: true });
        await simulateLatency(400, 900);
        const txs = useTransactionStore.getState().transactions;
        try {
          const res = await fetch("/api/revai/anomalies", {
            method: "POST",
            headers: { "Content-Type": "application/json", "x-api-key": "revai-demo-key" },
            body: JSON.stringify({ transactions: txs }),
          });
          const json = await res.json();
          if (res.ok) set({ anomalies: json.analysis });
        } catch (error) {
          console.error("Failed anomaly execution:", error);
        } finally {
          set({ loadingAnomalies: false });
        }
      },

      generateCreditScore: async () => {
        set({ loadingCredit: true });
        await simulateLatency(400, 900);
        const txs = useTransactionStore.getState().transactions;
        try {
          const res = await fetch("/api/revai/credit-score", {
            method: "POST",
            headers: { "Content-Type": "application/json", "x-api-key": "revai-demo-key" },
            body: JSON.stringify({ transactions: txs }),
          });
          const json = await res.json();
          if (res.ok && json.success) set({ creditScore: json.data });
        } catch (error) {
          console.error("Failed Llama 3 Nano-Credit execution:", error);
        } finally {
          set({ loadingCredit: false });
        }
      },

      clear: () => set({
        insights: null,
        anomalies: null,
        creditScore: null
      })
    }),
    {
      name: 'ai-insights-storage', // Prevent heavy Groq recosts by persisting AI summaries locally.
      version: 2, // Bumped version to clear old text-heavy caches (insightsText -> insights objects)
    }
  )
);
