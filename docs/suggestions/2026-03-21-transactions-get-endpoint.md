# Suggestion: Add a GET Endpoint for Raw Transactions

## Problem

There's no way to retrieve synced transactions from the API yet. Phase 2 (dashboard) will need a data-fetching endpoint.

## Proposed Addition

Add a `GET` handler in the same route file (or a new `/api/revai/transactions/route.ts`):

```ts
// GET /api/revai/transactions?limit=50&offset=0
export async function GET(request: NextRequest) {
  const limit = Number(request.nextUrl.searchParams.get("limit") ?? 50);
  const offset = Number(request.nextUrl.searchParams.get("offset") ?? 0);

  const rows = db
    .select()
    .from(rawTransactions)
    .limit(limit)
    .offset(offset)
    .all();

  const transactions = rows.map((r) => ({
    id: r.id,
    ...JSON.parse(r.transactionData),
    fetchedAt: r.fetchedAt,
  }));

  return Response.json({ transactions, total: transactions.length });
}
```

## Impact

- Bridges backend → frontend for Phase 2
- Supports pagination out of the box
- ~10 min to implement
