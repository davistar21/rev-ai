You are an expert Next.js 16 engineer finalizing RevAI for Interswitch x Enyata Buildathon 2026: premium AI revenue intelligence dashboard + standalone API.

Phase 4: Standalone API Polish, Demo Prep & Submission Foundation

Goal: Turn RevAI into a demo-ready MVP: clean RESTful API endpoints, landing page with freemium tease, API documentation, mock auth, error handling, and hackathon submission prep. Emphasize extensibility (other fintechs integrate), Liquid Glass polish, and reusable files.

Do these steps in exact order. Create separate, reusable files/components. Keep each file <200 lines; split logic if needed (e.g., separate utils, hooks, components). Use TypeScript strictly.

1. Enhance standalone API endpoints (in /app/api/revai/):
   - /app/api/revai/analyze/route.ts (POST):
     - Accept JSON body { period?: string } (default last 30 days)
     - Query DB for raw_transactions in period
     - Aggregate basics: totalRevenue, successRate, dailyTotals (use utils/aggregateTransactions.ts)
     - Call Groq for insights (reuse from previous phase or new util)
     - Return JSON: { aggregation, insights, forecast }
   - /app/api/revai/forecast/route.ts (POST): Similar, but focus on forecast only (Groq prompt for next-month prediction)
   - /app/api/revai/anomalies/route.ts (POST): Detect & explain anomalies (Groq + simple z-score in utils)
   - Add simple mock API key auth: Check header 'X-API-Key' === 'revai-demo-key' (hardcode for hackathon; note in README for real use)

2. Create reusable utils:
   - /utils/aggregateTransactions.ts: Export function aggregateTx(transactions: Transaction[]): { totalRevenue: number, successRate: number, dailyTotals: { date: string, amount: number }[] }
     - Use reduce for sums, group by date
   - /utils/formatCurrency.ts: Export function formatNGN(amount: number): string → '₦1,234,567.89'
   - /utils/dateUtils.ts: Helpers like getLast30Days(), formatISOToDate()

3. Build landing page & demo elements:
   - /app/page.tsx (root): Modern landing with Liquid Glass hero:
     - Hero section (GlassContainer): Title "RevAI: AI Revenue Intelligence on Interswitch", tagline, "Sync Transactions → Get Forecasts & Insights"
     - Features list (GlassCards): API extensibility, fraud detection, cash flow prediction
     - CTA: "Go to Dashboard" button linking /dashboard
     - Mock pricing section: Freemium table (Free: Basic trends | Pro: Advanced AI + Real-time)
   - /components/landing/Hero.tsx, /components/landing/Features.tsx, /components/landing/PricingTease.tsx — reusable Liquid Glass components

4. Polish dashboard (/app/dashboard/page.tsx):
   - Add sections:
     - Sync button (triggers /api/revai/sync)
     - Revenue Overview (Recharts LineChart for dailyTotals)
     - AI Insights card (GlassCard with ReactMarkdown for Groq output)
     - Anomalies list (table or cards)
   - Add loading/error states (shadcn Skeleton/Alert)

5. Add API documentation & submission prep:
   - Update /README.md:
     - Project overview, setup (npm install, .env with GROQ_API_KEY, sqlite.db)
     - How to run: npm run dev
     - API endpoints list with examples (curl/postman)
     - Interswitch mock explanation + how to swap to real
     - Demo flow script: "1. Visit landing → 2. Go dashboard → 3. Sync mock data → 4. Generate insights"
   - Create /docs/api.md: Detailed endpoints, request/response samples (JSON schemas)

6. Final touches:
   - Add global error boundary or simple 404
   - Ensure all UI uses Liquid Glass (GlassCard for sections, GlassButton for CTAs)
   - Mock user (hardcode 'mock-user-1' for DB queries)

After completing:

- Output full updated folder tree
- Paste key new/updated code:
  - One API route example (/app/api/revai/analyze/route.ts)
  - Landing page snippet (/app/page.tsx)
  - utils/aggregateTransactions.ts
  - README additions (excerpt)
- List any pending manual steps (e.g., npm run dev, add GROQ key, deploy to Vercel)

Stop here and wait for next instructions (post-hackathon real Interswitch swap, auth, etc.).

Begin now.

After completing the requested changes, review the entire app and add 1–3 concrete improvement suggestions (UI, perf, features, security, DX, etc.) as new markdown files in /docs/suggestions/<timestamp-or-feature>-suggestion.md. Use kebab-case filenames, e.g., 2026-03-21-glass-hover-effects.md. Include rationale and rough code snippet if relevant. Do not implement them yet — just document.

```

```
