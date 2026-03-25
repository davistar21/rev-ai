import { NextResponse } from "next/server";
import { db } from "@/db";
import { rawTransactions } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = Number(searchParams.get("limit") || 100);
    const offset = Number(searchParams.get("offset") || 0);

    const rows = db
      .select()
      .from(rawTransactions)
      .orderBy(desc(rawTransactions.fetchedAt))
      .limit(limit)
      .offset(offset)
      .all();

    const transactions = rows.map((r) => ({
      ...r.transactionData,
      id: r.id,
      fetchedAt: r.fetchedAt,
    }));

    return NextResponse.json({
      success: true,
      data: transactions,
      total: transactions.length, // Accurate proper total needs a COUNT statement, fine for now
    });
  } catch (error) {
    console.error("[GET /api/revai/transactions] Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}
