import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import type { Transaction } from "@/types/interswitch";

// ---------------------------------------------------------------------------
// Users
// ---------------------------------------------------------------------------

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  email: text("email").unique().notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

// ---------------------------------------------------------------------------
// Raw Transactions  (JSON blob from Interswitch sync)
// ---------------------------------------------------------------------------

export const rawTransactions = sqliteTable("raw_transactions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  transactionData: text("transaction_data", { mode: "json" })
    .$type<Transaction>()
    .notNull(),
  fetchedAt: integer("fetched_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  userId: text("user_id").references(() => users.id),
});

// ---------------------------------------------------------------------------
// Insights  (AI-generated revenue analysis)
// ---------------------------------------------------------------------------

export const insights = sqliteTable("insights", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  period: text("period").notNull(), // e.g. '2026-03'
  totalRevenue: real("total_revenue"),
  anomalies: text("anomalies", { mode: "json" }).$type<any[]>(),
  forecastNextMonth: real("forecast_next_month"),
  generatedAt: integer("generated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  userId: text("user_id").references(() => users.id),
});
