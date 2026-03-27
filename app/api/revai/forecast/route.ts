import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import { db, isDbAvailable } from "@/db";
import { rawTransactions } from "@/db/schema";
import { desc } from "drizzle-orm";
import type { Transaction } from "@/types/interswitch";
import { aggregateTx } from "@/utils/aggregateTransactions";
import { simulatedCSVs } from "@/lib/mock-csv-data";

export async function POST(req: Request) {
  try {
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ error: "Missing GROQ_API_KEY" }, { status: 500 });
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    // Fetch transactions
    let transactions: Transaction[] = [];
    try {
      if (!isDbAvailable) throw new Error("Unavailable");
      const rows = db.select().from(rawTransactions).orderBy(desc(rawTransactions.fetchedAt)).limit(300).all();
      if (rows.length === 0) throw new Error("Empty");
      transactions = rows.map((r: any) => r.transactionData);
    } catch (dbError) {
      console.warn("[Forecast] Fallback triggered");
      transactions = simulatedCSVs[0].data;
    }

    const aggregation = aggregateTx(transactions);

    const prompt = `You are a financial forecasting AI. Analyze this data:
Total revenue: ₦${aggregation.totalRevenue.toLocaleString()}
Daily totals: ${JSON.stringify(aggregation.dailyTotals)}

Respond ONLY with a valid JSON object matching this exact structure:
{
  "forecast_summary": "Markdown text explaining the logical forecast based on recent velocity",
  "projected_revenue_30d": 123456
}`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: "system", content: prompt }],
      model: "llama-3.1-8b-instant",
      temperature: 0.2,
      max_tokens: 1000,
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(completion.choices[0]?.message?.content || "{}");

    return NextResponse.json({
      success: true,
      data: result
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
