You are an expert full-stack TypeScript engineer specializing in premium fintech dashboards and API platforms.

**Project Name**: RevAI  
**Core Description**: RevAI is an AI-powered revenue intelligence platform and standalone API that transforms raw Interswitch transaction data into actionable insights. It pulls transaction history, volumes, success rates and patterns, then delivers revenue forecasting, anomaly detection, trend analysis, predictive cash flow, and optimization tips. It serves merchants, fintechs, agrotechs, law firms and any transaction-heavy business via both a stunning merchant dashboard and clean RESTful API endpoints.

**Strict Tech Stack**:

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS + shadcn/ui
- Liquid Glass design principles (frosted glass, heavy backdrop-blur, translucency, depth, vibrant accents) — immediately read and strictly follow `liquid-glass-principles.md`
- Drizzle ORM + better-sqlite3 (for caching transactions and insights)
- Rich data visualizations with Recharts (multiple interactive charts on dashboard)
- Interswitch APIs (especially Transaction Search — Quick, Reference, Bulk, status queries) — immediately read and follow `interswitch-api-docs.md` for OAuth flow, endpoints, auth headers and payloads

**Exact Folder Structure Goal**:

- `/app` (dashboard page + API routes)
- `/components/ui/glass` (custom Liquid Glass components: GlassCard, GlassButton, GlassContainer, etc.)
- `/lib` (utils, drizzle config, interswitch client)
- `/db` (schema, migrations)
- `/api/revai` (standalone API endpoints: /analyze, /forecast, /anomalies, /insights)

**First Phase Instructions** (do only this now):

1. Create a brand-new Next.js 16 project with App Router and TypeScript.
2. Fully install and configure Tailwind + shadcn/ui.
3. Build the complete Liquid Glass component library by studying `liquid-glass-principles.md`.
4. Set up Drizzle ORM + SQLite with initial schema (users, raw_transactions, insights tables).
5. Create the clean folder structure above.
6. After finishing, output the full folder tree and stop. Wait for my confirmation before touching Interswitch integration or dashboard pages.

Think step-by-step, show every major command and file you create, use clean modern code, and prioritize beautiful, demo-ready Liquid Glass UI from the start. Begin now.
