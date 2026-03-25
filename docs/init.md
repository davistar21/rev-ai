# RevAI Project Overview & Phase Breakdown

**Project Name**: RevAI  
**Tagline**: AI-Powered Revenue Intelligence API & Dashboard — Turning Interswitch transaction data into actionable business insights for African merchants, fintechs, agrotechs, law firms, and transaction-heavy businesses.

**Hackathon**: Interswitch x Enyata Buildathon 2026  
**Goal**: Build a standalone API + merchant dashboard that pulls transaction history from Interswitch's Transaction Search APIs, applies lightweight AI for revenue forecasting, anomaly detection, trend analysis, and cash flow predictions — all while delivering a premium Liquid Glass UI experience.

**Core Value Proposition**

- Solves real pain for SMEs/informal businesses: blind revenue tracking, hidden leakage (fraud/churn), poor forecasting.
- Positions as extensible infrastructure: other fintechs/agrotechs/law firms integrate the API to add revenue smarts on top of their own transaction flows.
- Hackathon focus: Deep Interswitch integration + beautiful demo-ready UI + simulated data for speed.

## Tech Stack (Current & Locked)

- Framework: Next.js 16 (App Router) + TypeScript
- Styling/UI: Tailwind CSS + shadcn/ui + custom Liquid Glass components (frosted glass, heavy blur, translucency, depth, vibrant accents)
- Database: SQLite + Drizzle ORM (better-sqlite3 driver)
- Visualizations: Recharts (interactive charts: line, bar, pie, etc.)
- Interswitch Integration: Transaction Search APIs (Quick Search, Reference Search) — **fully mocked for hackathon**
- AI/Analytics: Lightweight rule-based + stats (Pandas-like in TS or simple libs; future: scikit-learn style or lightweight ML)
- API Exposure: Next.js API routes (standalone endpoints: /analyze, /forecast, /anomalies, /insights)
- Hosting (demo): Vercel/Netlify
- Design Principles: Liquid Glass (reference: liquid-glass-principles.md)

## High-Level Architecture

- Frontend → Dashboard (Liquid Glass cards, Recharts viz, sync button)
- Backend → API routes + Drizzle DB (cache raw tx + generated insights)
- Data Flow → Mock Interswitch client → SQLite → AI processing → Insights API + UI
- Future → Swap mock → real Interswitch OAuth + endpoints

## Phases Breakdown (As of March 21, 2026)

### Phase 0: Foundation (Completed / In Progress)

- Set up Next.js 16 project (App Router, TS)
- Install/configure Tailwind + shadcn/ui
- Build Liquid Glass component library (GlassCard, GlassButton, GlassContainer, etc.) per liquid-glass-principles.md
- Create clean folder structure: /app, /components/ui/glass, /lib, /db, /types, /api/revai

### Phase 1: Types & Mock Data Layer (Current / Next)

- Define TS interfaces for Interswitch-like transactions (/types/interswitch.ts)
- Implement mock Interswitch client (/lib/interswitch.ts):
  - getAccessToken() → fake token
  - quickSearch(params) → 30–50 varied fake transactions (last 90 days, realistic amounts/statuses/patterns)
  - referenceSearch(ref) → single fake tx
- Set up Drizzle schema: users, raw_transactions (json data), insights (forecasts, anomalies)
- Basic sync API route (/api/revai/sync) to fetch mock data → insert into DB

### Phase 2: Dashboard & Visualization (Next)

- Build main dashboard page (/app/dashboard/page.tsx)
- Add "Sync Transactions" GlassButton → triggers sync route
- Display aggregated stats: total revenue, success rate, anomalies count
- Render Recharts:
  - Line chart: revenue over time
  - Bar chart: transactions by day/week
  - Simple anomaly highlights
- Use Liquid Glass for all cards, tables, charts containers

### Phase 3: AI Insights Layer (Post-Dashboard)

- Process raw_transactions → generate insights (e.g., simple moving averages, z-score anomalies, basic linear forecast)
- Expose via API: /api/revai/insights (period-based)
- Display in dashboard: AI-generated tips ("Revenue dip detected — possible churn", "Peak on Fridays — run promos")
- Store insights in DB for persistence

### Phase 4: Standalone API Polish & Demo Prep

- Finalize clean REST endpoints (/api/revai/analyze, /forecast, etc.) with JSON responses
- Add mock auth (API key or simple)
- Create landing page + pricing mock (freemium tease)
- README + public GitHub setup (contributions from team)
- Demo script: Sync → viz → insights → explain extensibility

### Future Phases (Post-Hackathon)

- Swap mock → real Interswitch (OAuth token gen + live endpoints)
- Advanced AI (time-series forecasting, clustering)
- Webhooks for real-time updates
- User auth (NextAuth or Clerk)
- Deployment + monitoring

## Success Criteria for Hackathon

- Live hosted MVP (Vercel)
- Public GitHub with commits from 2–4 team members
- Deep mock/real Interswitch Transaction Search usage
- Stunning Liquid Glass UI + interactive charts
- Clear demo: "Connect → Sync transactions → See revenue intelligence"
- Pitch revenue model (freemium/API billing) + ecosystem potential

Last updated: March 21, 2026
