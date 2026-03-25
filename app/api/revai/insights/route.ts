import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import { db } from "@/db";
import { rawTransactions } from "@/db/schema";
import { desc } from "drizzle-orm";
import type { Transaction } from "@/types/interswitch";

export async function POST(req: Request) {
  try {
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: "Add GROQ_API_KEY to .env.local" },
        { status: 401 }
      );
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    // Try to parse body for optional params
    let body = {};
    try {
      body = await req.json();
    } catch (e) {}

    // Fetch transactions from DB
    const rows = db
      .select()
      .from(rawTransactions)
      .orderBy(desc(rawTransactions.fetchedAt))
      .limit(200)
      .all();

    if (rows.length === 0) {
      return NextResponse.json(
        { error: "No transaction data available to analyze. Please sync first." },
        { status: 400 }
      );
    }

    const transactions: Transaction[] = rows.map((r) => r.transactionData);

    // Aggregate basics in code
    const successTxs = transactions.filter((tx) => tx.status === "SUCCESS");
    const totalRevenue = successTxs.reduce((sum, tx) => sum + tx.amount, 0);
    const successRate = ((successTxs.length / transactions.length) * 100).toFixed(1);

    const dailyTotalsObj = successTxs.reduce((acc, tx) => {
      const dateStr = new Date(tx.transactionDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      acc[dateStr] = (acc[dateStr] || 0) + tx.amount;
      return acc;
    }, {} as Record<string, number>);

    const dailyTotals = Object.entries(dailyTotalsObj)
      .map(([date, amount]) => ({ date, amount }))
      .reverse();

    // Detect simple anomaly for the prompt
    let anomalyText = "None detected";
    if (dailyTotals.length > 1) {
      // Find the biggest percentage drop
      for (let i = 0; i < dailyTotals.length - 1; i++) {
        const current = dailyTotals[i].amount;
        const previous = dailyTotals[i + 1].amount;
        if (previous > 0 && current < previous * 0.5) {
          const drop = (((previous - current) / previous) * 100).toFixed(0);
          anomalyText = `Sudden drop on ${dailyTotals[i].date} by ${drop}%`;
          break;
        }
      }
    }

    const prompt = `You are a financial revenue analyst. Here is summarized transaction data for a Nigerian merchant (all in NGN):
- Total revenue last 30 days: ₦${totalRevenue.toLocaleString()}
- Success rate: ${successRate}%
- Daily totals: ${JSON.stringify(dailyTotals)}
- Anomalies: ${anomalyText}

Provide:
1. Short executive summary
2. Revenue forecast for next 30 days (simple reasoned estimate)
3. Key insights and recommendations (e.g., fraud check, upsell timing)
4. Detected anomalies with explanations

Be concise, professional, use ₦ symbol. Use markdown formatting with clear headings.`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: "system", content: prompt }],
      model: "llama-3.1-70b-versatile",
      temperature: 0.4,
      max_tokens: 600,
      stream: false,
    });

    const insights = completion.choices[0]?.message?.content || "No insights generated.";

    return NextResponse.json({
      insights,
      rawAggregation: {
        totalRevenue,
        successRate,
        dailyTotals,
        anomalyText,
      },
    });
  } catch (error) {
    console.error("[POST /api/revai/insights] Error:", error);
    return NextResponse.json(
      { error: "Failed to generate insights: " + (error as Error).message },
      { status: 500 }
    );
  }
}
