### Tailored API Docs for RevAI (Focused on What We Need)

For RevAI (AI revenue intelligence via transaction data), we **only care about Transaction Search APIs**—they give the raw fuel: history, details, status, volumes for analysis/forecasting/anomalies. Ignore everything else (no need for payments acceptance, transfers initiation, lending, etc., unless you expand later).

**Core APIs to Use (Sandbox-Friendly)**:

1. **Get Access Token** (Required first step)
   - Endpoint: POST to Interswitch Passport (e.g., https://passport.interswitchng.com/passport/oauth/token or sandbox variant)
   - Auth: Basic Auth with Client ID:Client Secret (base64 encoded)
   - Body: grant_type=client_credentials
   - Response: access_token (Bearer), expires_in
   - Official guide: Use this for all subsequent calls.

2. **Quick Search** (Main one for RevAI – broad revenue pulls)
   - POST https://switch-online-gateway-service.k9.isw.la/switch-online-gateway-service/api/v1/gateway/quick-search (or sandbox equivalent)
   - Headers: Authorization: Bearer {token}, other Interswitch sig headers if required
   - Payload: JSON with params like terminalId, merchantId, amount, date range, beneficiaryAccount, etc. (flexible – search by any combo)
   - Returns: List of matching transactions with details (status, amount, date, ref, etc.)
   - Use for: Fetching batches of transactions over a period → aggregate daily/weekly revenue.

3. **Reference Search** (For single transaction verification)
   - POST https://switch-online-gateway-service.k9.isw.la/switch-online-gateway-service/api/v1/gateway/reference-search
   - Payload: transaction ref (RRN, Payment Ref, etc.)
   - Returns: Full details of one tx.
   - Use for: Deep dive on specific inflows or anomalies.

4. **Bulk Search** (If pulling large sets)
   - Exists for batch queries (details in Transaction Search overview).
   - Use if Quick Search limits hit.

5. **Get Transaction Details** (Fallback/confirmation)
   - Endpoint varies (e.g., GET /collections/api/v2/gettransaction.json or similar).
   - Use to requery status.

**Simulation for Hackathon (Yes, We're Simulating!)**  
Since building in a day and using agentic tool:

- **Don't hit real APIs yet** (sandbox creds take time to get/approve).
- **Mock everything first**:
  - Create a mock Interswitch client in /lib/interswitch.ts (or .js) with fake functions: getAccessToken(), quickSearch(payload), referenceSearch(ref).
  - Return hardcoded/sample JSON responses (e.g., array of 50 fake transactions with dates, amounts, statuses, refs).
  - Sample data: Vary amounts (₦1k–500k), dates (last 90 days), statuses (success/failed/pending), add patterns (peaks on Fridays).
  - In your Drizzle DB: Store these as "raw_transactions" for persistence/AI re-analysis.
- Later (post-hackathon or if creds ready): Swap mock → real client using axios/fetch + real endpoints/headers.
- For demo: Dashboard pulls from mock/DB → shows charts (Recharts: line for revenue over time, bar for success rates, pie for channels if you add mock fields).
- AI layer: Process mock data with simple Pandas-like logic in backend (or client-side for speed) → forecast (linear trend), anomalies (z-score > 2).
