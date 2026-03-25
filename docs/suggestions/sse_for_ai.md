# Offloading AI Inference to Server-Sent Events (SSE) Streams

## Current State
Both `Generate Insights` and `Nano-Credit Eligibility` rely on heavy synchronous `fetch` execution streams connecting directly to Groq (Llama 3). Because standard LLM generation easily drifts beyond 2-4 seconds, the Merchant Hub freezes interaction within loading states, forcing unoptimized User Experience patterns.

## Architectural Proposal
1. **Streaming Generation via Vercel AI SDK:**
   Transition the Next.js API route (`/api/revai/analyze`) to use Node Streams or Edge runtime SSE outputs. Instead of replying with a final JSON payload block, the server securely streams markdown token by token.
   
2. **Frontend Typewriter Mapping:**
   Update `useInsightsStore` to accept fragmented strings incrementally:
   ```javascript
   // Inside client
   const response = await fetch('/api/revai/analyze', { method: 'POST' });
   const reader = response.body.getReader();
   // Read loop
   while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const text = new TextDecoder().decode(value);
      useInsightsStore.getState().appendInsightChunk(text);
   }
   ```

## Immediate Benefits
- Creates visually engaging typewriter effects universally loved in AI applications.
- Drops TTFB (Time To First Byte) from ~3000ms down to ~200ms dynamically bypassing API Gateway timeouts.
- Ensures the merchant feels immediate system reactivity when crunching complex fraudulent patterns or scoring logic.
