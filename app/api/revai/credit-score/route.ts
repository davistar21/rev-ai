import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import { db } from "@/db";
import { rawTransactions } from "@/db/schema";
import { aggregateTx } from "@/utils/aggregateTransactions";
import type { Transaction } from "@/types/interswitch";

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
      const rows = db.select().from(rawTransactions).limit(500).all();
      transactions = rows.map((r) => r.transactionData);
    }

    const aggregation = aggregateTx(transactions);

    const prompt = `You are a Senior Fintech Credit Analyst executing risk assessments purely utilizing transactional inflow data.
Analyze the following aggregated Interswitch transaction metrics for this merchant:
- Revenue: NGN ${aggregation.totalRevenue}
- Success Count: ${aggregation.successCount}
- Failure Count: ${aggregation.failCount}
- Success Rate: ${aggregation.successRate}%

Determine the merchant's eligibility for an uncollateralized Nano-Credit loan. 
Respond ONLY with a valid JSON object matching this exact structure natively:
{
  "score": number, // 0 to 100 based on consistency and revenue volume
  "suggestedAmount": "string", // A formatted string like "₦50k - ₦150k" or "Not Eligible" if score is below 40.
  "reasoning": "Markdown text explaining precisely why this score and amount were assigned based on the failure rates and volume."
}`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: "system", content: prompt }],
      model: "llama-3.1-8b-instant",
      temperature: 0.2,
      max_tokens: 1000,
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(completion.choices[0]?.message?.content || "{}");
    
    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    console.error("Credit Score Error:", error);
    return NextResponse.json(
      { error: "Failed to generate nano-credit score. Please verify JSON structures." },
      { status: 500 }
    );
  }
}
