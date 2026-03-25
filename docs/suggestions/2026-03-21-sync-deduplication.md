# Suggestion: Add Idempotent Sync with Deduplication

## Problem

Currently, `POST /api/revai/sync` appends transactions on every call without checking for duplicates. Calling sync twice inserts 60+ rows for the same time period, which will skew analytics and inflate revenue numbers.

## Proposed Fix

Before inserting, check if a transaction with the same `transactionId` already exists. Skip duplicates.

```ts
// In route.ts — sketch
for (const tx of transactions) {
  const exists = db
    .select({ id: rawTransactions.id })
    .from(rawTransactions)
    .where(
      sql`json_extract(${rawTransactions.transactionData}, '$.transactionId') = ${tx.transactionId}`
    )
    .get();

  if (!exists) {
    db.insert(rawTransactions)
      .values({ transactionData: JSON.stringify(tx), userId: DEFAULT_USER_ID })
      .run();
  }
}
```

Alternatively, add a unique `transactionId` column on `rawTransactions` for faster lookups and a DB-level constraint.

## Impact

- Prevents data duplication during development and demo
- More accurate analytics in Phase 3
- Low effort (~15 min)
