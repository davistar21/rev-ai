import { NextResponse } from "next/server";
import { syncTransactions } from "@/lib/hooks/useSyncTransactions";

/**
 * POST /api/revai/sync
 *
 * Triggers a mock transaction sync for the demo user.
 * Returns the count of inserted records.
 */
export async function POST() {
  try {
    const userId = "mock-user-1";
    const result = await syncTransactions(userId);
    return NextResponse.json(result);
  } catch (error) {
    console.error("[sync] Error:", error);
    return NextResponse.json(
      { success: false, error: "Sync failed" },
      { status: 500 }
    );
  }
}
