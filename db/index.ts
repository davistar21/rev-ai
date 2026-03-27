import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "./schema";

let sqlite: any;
let dbInstance: any;
let dbAvailable = false;

try {
  sqlite = new Database("sqlite.db");
  // Enable WAL mode for better concurrent read performance
  sqlite.pragma("journal_mode = WAL");
  dbInstance = drizzle(sqlite, { schema });
  dbAvailable = true;
} catch (error) {
  console.error("Database initialization failed (likely serverless/read-only FS):", error);
}

export const db = dbInstance;
export const isDbAvailable = dbAvailable;
export { sqlite };
