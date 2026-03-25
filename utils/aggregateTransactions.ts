import type { Transaction } from "@/types/interswitch";
import { formatShortDate } from "./dateUtils";

export type DailyTotal = {
  date: string;
  amount: number;
};

export type AggregationResult = {
  totalRevenue: number;
  successRate: number;
  successCount: number;
  failCount: number;
  dailyTotals: DailyTotal[];
};

export function aggregateTx(transactions: Transaction[]): AggregationResult {
  const successTxs = transactions.filter((tx) => tx.status === "SUCCESS");
  
  const totalRevenue = successTxs.reduce((sum, tx) => sum + Number(tx.amount), 0);
  const successCount = successTxs.length;
  const failCount = transactions.filter((tx) => tx.status === "FAILED").length;
  const successRate = transactions.length 
    ? (successCount / transactions.length) * 100 
    : 0;

  const dailyObj = successTxs.reduce((acc, tx) => {
    const dateStr = formatShortDate(tx.transactionDate);
    acc[dateStr] = (acc[dateStr] || 0) + Number(tx.amount);
    return acc;
  }, {} as Record<string, number>);

  // Create a map of date labels to their earliest timestamps for efficient sorting
  const dateToTimestamp: Record<string, number> = {};
  successTxs.forEach(tx => {
    const label = formatShortDate(tx.transactionDate);
    const ts = new Date(tx.transactionDate).getTime();
    if (!dateToTimestamp[label] || ts < dateToTimestamp[label]) {
      dateToTimestamp[label] = ts;
    }
  });

  // Converting to array and explicitly sorting it chronologically using pre-calculated map
  const dailyTotals = Object.entries(dailyObj)
    .map(([date, amount]) => ({ date, amount }))
    .sort((a, b) => (dateToTimestamp[a.date] || 0) - (dateToTimestamp[b.date] || 0));

  return {
    totalRevenue,
    successRate: Number(successRate.toFixed(1)),
    successCount,
    failCount,
    dailyTotals,
  };
}

export function detectAnomalies(dailyTotals: DailyTotal[]) {
  if (dailyTotals.length < 2) return null;

  const anomalies = [];
  
  // Calculate running average for simple z-score / bounds detection
  const amounts = dailyTotals.map(d => d.amount);
  const mean = amounts.reduce((a, b) => a + b, 0) / amounts.length;
  
  // Calculate standard deviation 
  const squareDiffs = amounts.map(value => Math.pow(value - mean, 2));
  const avgSquareDiff = squareDiffs.reduce((a, b) => a + b, 0) / squareDiffs.length;
  const stdDev = Math.sqrt(avgSquareDiff);

  for (let i = 0; i < dailyTotals.length; i++) {
    const day = dailyTotals[i];
    // Rule 1: Statistically significant drop (Z-score < -1.5) or spike (Z-score > 1.5)
    // Rule 2: Consecutive day plunge > 50%
    if (i > 0) {
      const prev = dailyTotals[i - 1];
      if (prev.amount > 0 && day.amount < prev.amount * 0.5) {
         const drop = Number((((prev.amount - day.amount) / prev.amount) * 100).toFixed(0));
         anomalies.push(`Sudden drop on ${day.date} by ${drop}% compared to yesterday.`);
      }
    }

    const zScore = (day.amount - mean) / (stdDev || 1);
    if (zScore > 2.0) {
      anomalies.push(`Volume spike on ${day.date}: significantly higher than 30-day average.`);
    }
  }

  return anomalies.length > 0 ? anomalies : null;
}
