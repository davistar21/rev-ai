"use server";

import { db } from "@/db";
import { users, rawTransactions } from "@/db/schema";
import { mockInterswitch } from "@/lib/interswitch/mockClient";
import { eq, sql } from "drizzle-orm";

/**
 * Syncs mock Interswitch transactions into the local database.
 *
 * 1. Ensures the given user exists (creates if missing).
 * 2. Fetches mock transactions via Quick Search.
 * 3. Inserts each transaction into raw_transactions as JSON.
 *
 * @param userId - The user ID to associate transactions with.
 * @returns `{ success, count }` indicating how many records were inserted.
 */
export async function syncTransactions(userId: string) {
  // Ensure user exists
  const existing = db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .get();

  if (!existing) {
    db.insert(users)
      .values({ id: userId, email: `${userId}@revai.app` })
      .run();
  }

  // Fetch mock transactions
  const response = await mockInterswitch.quickSearch();

  let insertedCount = 0;

  // Insert into DB with Deduplication
  for (const tx of response.data) {
    // Note: since the mock client sometimes generates random IDs on each call, this
    // might still insert if IDs change per call. Assuming stable IDs from upstream or realistic mock.
    // We check via JSON extract:
    const exists = db
      .select({ id: rawTransactions.id })
      .from(rawTransactions)
      .where(
        sql`json_extract(${rawTransactions.transactionData}, '$.transactionId') = ${tx.transactionId}`
      )
      .get();

    if (!exists) {
      db.insert(rawTransactions)
        .values({ transactionData: tx, userId })
        .run();
      insertedCount++;
    }
  }

  return { success: true, count: insertedCount };
}
