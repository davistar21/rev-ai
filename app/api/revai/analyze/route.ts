import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import { db, isDbAvailable } from "@/db";
import { rawTransactions } from "@/db/schema";
import { desc } from "drizzle-orm";
import type { Transaction } from "@/types/interswitch";
import { aggregateTx, detectAnomalies } from "@/utils/aggregateTransactions";
import { simulatedCSVs } from "@/lib/mock-csv-data";

export async function POST(req: Request) {
  try {
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ error: "Add GROQ_API_KEY to .env.local" }, { status: 500 });
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    // 2. Parse Body & Hydrate Context
    let period = "last-30-days";
    let bodyTransactions: Transaction[] | null = null;
    try {
      const body = await req.json();
      if (body.period) period = body.period;
      if (body.transactions && Array.isArray(body.transactions) && body.transactions.length > 0) {
        bodyTransactions = body.transactions;
      }
    } catch (e) {}

    let transactions: Transaction[] = [];
    if (bodyTransactions && bodyTransactions.length > 0) {
      transactions = bodyTransactions;
    } else {
      // 3. Database Query Fallback with Resiliency
      try {
        if (!isDbAvailable) throw new Error("Database not initialized");
        
        const rows = db.select().from(rawTransactions).orderBy(desc(rawTransactions.fetchedAt)).limit(300).all();
        if (rows.length === 0) throw new Error("DB Empty");
        
        transactions = rows.map((r: any) => r.transactionData);
      } catch (dbError) {
        console.warn("[Analyze] DB Fallback Triggered:", (dbError as Error).message);
        // Emergency Fallback: Use the first mock CSV dataset
        transactions = simulatedCSVs[0].data;
      }
    }

    // 4. Aggregation
    const aggregation = aggregateTx(transactions);
    const anomalies = detectAnomalies(aggregation.dailyTotals) || ["None detected"];

    // 5. Groq LLM Inference (JSON Mode)
    const prompt = `You are a financial revenue analyst. Analyze this transaction data for a Nigerian merchant (all in NGN):
Total revenue: ₦${aggregation.totalRevenue.toLocaleString()}
Success rate: ${aggregation.successRate}%
Daily totals: ${JSON.stringify(aggregation.dailyTotals)}
Anomalies: ${anomalies.join("; ")}

Respond ONLY with a valid JSON object matching this exact structure:
{
  "insights": {
    "summary": "A 2-sentence executive high-level summary of the merchant's health.",
    "metrics": [
      { "label": "Revenue Stability", "value": 0-100, "status": "stable/increasing/decreasing/critical" },
      { "label": "Success Velocity", "value": 0-100, "status": "stable/increasing/decreasing/critical" },
      { "label": "Risk Exposure", "value": 0-100, "status": "stable/increasing/decreasing/critical" }
    ],
    "recommendations": [
      { "action": "Short actionable advice", "impact": "Low/Medium/High", "icon": "zap/shield/trending-up/search/alert-triangle" }
    ]
  }
}`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: "system", content: prompt }],
      model: "llama-3.1-8b-instant",
      temperature: 0.2,
      max_tokens: 1500,
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(completion.choices[0]?.message?.content || "{}");

    return NextResponse.json({
      success: true,
      aggregation,
      insights: result.insights
    });
  } catch (error) {
    console.error("[POST /api/revai/analyze] Error:", error);
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
