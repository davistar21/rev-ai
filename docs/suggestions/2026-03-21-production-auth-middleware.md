# Suggestion: Adopt Stateless JWT Based Production Auth

## Problem
Currently, the `/api/revai/*` standalone enterprise headless endpoints rely upon a hardcoded `"X-API-Key": "revai-demo-key"` check placed sequentially inline at the very beginning of the `route.ts` handlers.
```typescript
const apiKey = req.headers.get("x-api-key");
if (apiKey !== "revai-demo-key") {
  return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
}
```
This serves perfectly well as an MVP during a Hackathon phase, demonstrating the strict architectural separation between B2C consumer dashboards and B2B vendor extensions smoothly. However, this is inherently insecure for enterprise utilization post-hackathon.

## Proposed Strategy
Migrate API Authentication into a Next.js `middleware.ts` running cleanly at the Edge network layer:
1. Establish a new table inside Drizzle SQLite called `api_keys` mapped to organizational profiles.
2. Utilize `@tanstack/react-query` or similar for JWT generation when a merchant requests an API key on the Dashboard UI.
3. Validate API keys hashed implicitly via BCrypt before route handling occurs using localized headers.

```typescript
// middleware.ts logic representation
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api/revai/')) {
    const key = request.headers.get('x-api-key');
    // Call Edge-compatible auth verification here ...
  }
}
```

## Impact
- Protects route implementations from manual boilerplate overhead sequentially.
- Pre-emptively drops malicious packets prior to consuming any compute logic dynamically on the server handlers themselves.
- Sets up authentic multi-tenant scale organically for authentic enterprise expansion mapping.
- Effort: ~45 mins structure.
