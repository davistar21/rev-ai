# RevAI

**RevAI** is an AI-powered revenue intelligence platform built for B2B merchants. By natively analyzing raw transaction logs sourced directly from authentic APIs (like Interswitch), it extracts financial forecasts, aggregates success velocity, and highlights statistical anomalies automatically using Groq Llama 3 models.

It serves dual purposes:
1. **Interactive Dashboard**: A highly polished, client-facing dashboard utilizing the 'Liquid Glass' UI architectural design pattern.
2. **Standalone REST APIs**: Highly extensive endpoints strictly authenticated for headless B2B consumption by other enterprise engineering teams.

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS V4 + custom Liquid Glass primitives
- **Database**: SQLite (better-sqlite3) paired with Drizzle ORM
- **AI / Inference**: Groq SDK natively invoking `llama-3.1-8b-instant` for deterministic JSON structure handling.
- **Charts**: Recharts

## Setup & Execution
1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```
2. Apply the Drizzle Migration schemas to construct the local `sqlite.db`:
   ```bash
   npx drizzle-kit push
   ```
3. Set up the Environment Variables targeting your Groq Inference endpoint:
   Create a `.env.local` file at the root:
   ```env
   GROQ_API_KEY=your_groq_api_key_here
   ```
4. Run the development server natively:
   ```bash
   npm run dev
   ```

## Workflow / Hackathon Demo Script
1. View the **Landing Page** at `http://localhost:3000`. Showcases the freemium tiering and the feature sets.
2. Navigate to the **Dashboard**. (Notice empty mock states).
3. Click "Sync" to hydrate `sqlite.db` with randomized historical mock data conforming cleanly to Interswitch integration interfaces.
4. Interact with the two primary Intelligence triggers: "Generate AI Insights" or "Scan Anomalies". Notice structural UI updates natively responding to LLM streams.

## API Documentation
Refer to `/docs/api.md` for cURL examples on interacting directly with the standalone `X-API-Key` secured endpoints. To replace the mock Interswitch logic, integrate production keys natively inside `/lib/hooks/useSyncTransactions.ts`.
