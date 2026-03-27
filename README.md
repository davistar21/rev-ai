# RevAI: Visual Revenue Intelligence Engine 🌌

**Team CyberForce** • *Enyata x Interswitch Buildathon 2026*

**RevAI** is a cognitive revenue intelligence platform designed to transform raw, unstructured transaction logs (Interswitch CSV/API) into **Visual Intelligence**. We eliminate "text fatigue" for financial executives by mapping complex data onto interactive 3D timelines, predictive metric gauges, and high-fidelity action cards.

## 🚀 The Core Vision
In the B2B world, raw data is unreadable. Traditional dashboards offer "more graphs" but "less clarity". RevAI solves this by using **Llama 3.1 Pattern Recognition** to extract:
1.  **Success Velocity**: Real-time momentum calculated from inflow frequency.
2.  **Anomaly Vector Maps**: Visualizing statistical drops and spikes on a 3D-styled timeline.
3.  **Hardened Mitigations**: Transforming AI hallucinations into structured, actionable "Action Cards".

---

## 👥 Team CyberForce & Contributions
As required by the Enyata Hackathon guidelines, here is the breakdown of our team's involvement:

### **Eyitayo Obembe** (Lead Engineer)
- **Technical Architecture**: Designed the edge-ready SQLite + Drizzle ORM data layer.
- **AI Orchestration**: Implemented the Groq SDK integration for structured JSON output handling.
- **Frontend Systems**: Built the 'Liquid Glass' UI system and the interactive Anomaly Timeline components.
- **API Strategy**: Developed the standalone REST API layer for headless B2B consumption.

### **Noah Oyebola** (Product Design & Research)
- **UI/UX Design**: Conducted extensive product research into financial dashboard cognitive load.
- **Visual Design**: Designed the modular screen layouts and the 'Liquid Glass' design tokens.
- **Product Strategy**: Defined the core "Visual Intelligence" pivot, moving the app away from text-heavy summaries to intuitive metrics.
- **Market Research**: Analyzed Interswitch transaction patterns to refine the Anomaly Hunting models.

---

## 🛠️ The Tech Stack
- **Framework**: Next.js 16 (App Router) with asynchronous Server Components.
- **AI / Inference**: **Groq SDK** natively invoking `llama-3.1-8b-instant` for deterministic JSON intelligence.
- **Design System**: **Liquid Glass** — A custom Tailwind CSS V4 architectural pattern for high-fidelity overlays.
- **Database**: Local SQLite (better-sqlite3) + **Drizzle ORM** for persistent transactional history.
- **Animations**: **Framer Motion** + **GSAP** for fluid, interactive visual transitions.

---

## ⚙️ Setup & Local Execution
1.  **Clone & Install**:
    ```bash
    npm install
    ```
2.  **Hydrate Database**:
    ```bash
    npx drizzle-kit push
    ```
3.  **Environment Sync**:
    Create a `.env.local` file:
    ```env
    GROQ_API_KEY=your_groq_api_key_here
    ```
4.  **Launch Web-App**:
    ```bash
    npm run dev
    ```

---

## 🎭 The Demo Walkthrough
1.  **Landing Page**: Explore the "Visual-First" value proposition and open-source orientation.
2.  **Merchant Hub**: Use the **"Sync"** utility to hydrate the app with randomized transaction data conformant to Interswitch schemas.
3.  **Executive Intelligence**: Click "Generate Insights" to see the engine transform logs into **Glowing Metric Gauges**.
4.  **Fraud Engine**: Trigger the **"Anomaly Tracker"**. Hover over the **Horizontal Timeline Vector** to see specific day-by-day risk profiles and mitigation action cards.

---

## 🛡️ B2B Headless API
RevAI is built to be consumed by other platforms. Refer to `/docs/api.md` for cURL examples of our `X-API-Key` secured endpoints.

**RevAI is Open Source.** We believe transparency is the first step toward secure revenue intelligence. 🚀
