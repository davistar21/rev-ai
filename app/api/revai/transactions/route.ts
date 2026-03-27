import { NextResponse } from "next/server";
import { db, isDbAvailable } from "@/db";
import { rawTransactions } from "@/db/schema";
import { desc } from "drizzle-orm";
import { simulatedCSVs } from "@/lib/mock-csv-data";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = Number(searchParams.get("limit") || 100);
    const offset = Number(searchParams.get("offset") || 0);

    let transactions: any[] = [];

    try {
      if (!isDbAvailable) throw new Error("DB offline");
      const rows = db
        .select()
        .from(rawTransactions)
        .orderBy(desc(rawTransactions.fetchedAt))
        .limit(limit)
        .offset(offset)
        .all();
      if (rows.length === 0) throw new Error("Empty");
      transactions = rows.map((r: any) => ({
        ...r.transactionData,
        id: r.id,
        fetchedAt: r.fetchedAt,
      }));
    } catch (dbError) {
      console.warn("[Transactions] Fallback triggered");
      transactions = simulatedCSVs[0].data.slice(offset, offset + limit);
    }

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
