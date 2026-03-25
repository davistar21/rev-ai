import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import { db } from "@/db";
import { rawTransactions } from "@/db/schema";
import { desc } from "drizzle-orm";
import type { Transaction } from "@/types/interswitch";
import { aggregateTx, detectAnomalies } from "@/utils/aggregateTransactions";

export async function POST(req: Request) {
  try {
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ error: "Missing GROQ_API_KEY" }, { status: 500 });
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    let bodyTransactions: Transaction[] | null = null;
    try {
      const body = await req.json();
      if (body.transactions && Array.isArray(body.transactions)) bodyTransactions = body.transactions;
    } catch (e) {}

    let transactions: Transaction[] = [];
    if (bodyTransactions && bodyTransactions.length > 0) {
      transactions = bodyTransactions;
    } else {
      const rows = db.select().from(rawTransactions).orderBy(desc(rawTransactions.fetchedAt)).limit(300).all();
      if (rows.length === 0) {
        return NextResponse.json({ error: "No data available." }, { status: 400 });
      }
      transactions = rows.map((r) => r.transactionData);
    }
    const aggregation = aggregateTx(transactions);
    
    // Algorithmic statistical anomalies
    const mathAnomalies = detectAnomalies(aggregation.dailyTotals);

    const prompt = `You are a fraud and anomaly detection AI. Analyze these statistical anomalies detected in a merchant's recent transaction timeline:
${mathAnomalies ? mathAnomalies.join("\\n") : "No statistical anomalies found."}

Total overall volume was ₦${aggregation.totalRevenue.toLocaleString()} across ${transactions.length} transactions.

Respond ONLY with a valid JSON object matching this exact structure:
{
  "explanation": "A concise one-liner summary of the current risk state.",
  "timeline": [
    { 
      "date": "Month Day", 
      "value": 0-100 (relative drop/spike percentage), 
      "type": "drop/spike/pattern", 
      "severity": "low/medium/high/critical",
      "description": "Short internal detail"
    }
  ],
  "mitigation_steps": [
    { "step": "Actionable security step", "styled_icon": "search/lock/shield-alert/activity" }
  ]
}`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: "system", content: prompt }],
      model: "llama-3.1-8b-instant",
      temperature: 0.1,
      max_tokens: 1000,
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(completion.choices[0]?.message?.content || "{}");

    return NextResponse.json({
      success: true,
      statistical_triggers: mathAnomalies || [],
      analysis: result
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
