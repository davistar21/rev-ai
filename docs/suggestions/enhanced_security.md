# Hardening Security & Session Management

## Current State
The Phase 5 Auth system implements a highly functional "Mock Auth" schema leveraging raw Zustand logic and basic edge-middleware protection (`x-api-key`). The current login explicitly relies on static variables `demo@revai.com` stored vulnerably inside LocalStorage via mapped Redux. No actual JWT session or cryptographic validation protects Next.js layouts securely against forced client spoofing.

## Architectural Proposal
1. **NextAuth (Auth.js) / Supabase Integration:**
   Completely purge Zustand raw credential handling. Delegate Authentication cleanly to `NextAuth.js`. NextAuth wraps the application entirely inside Server-only secure cookies that cannot be tampered with via JavaScript.
   
2. **Server-Side Rendering Checks (`getServerSession`):**
   Instead of standard Client `ProtectedRoute` wrapper logic which is susceptible to momentary "FOUC" (Flash of unauthenticated content), use Server execution layouts blocking unauthorized access completely prior to responding:
   ```javascript
   // app/(dashboard)/layout.tsx
   import { getServerSession } from "next-auth";
   import { redirect } from "next/navigation";

   export default async function Layout({ children }) {
     const session = await getServerSession(authOptions);
     if (!session) redirect('/login');
     return <main>{children}</main>;
   }
   ```
3. **API Keys Migration to Bearer Tokens:**
   Replace the raw static `x-api-key: revai-demo-key` with standard dynamic `Authorization: Bearer <session-token>` ensuring API requests are mathematically locked to specific user tenancies.

## Immediate Benefits
- Eliminates 100% of client-side localstorage vulnerabilities efficiently.
- Paves explicit logic securing database tenancies for multi-merchant scaling.
- Enterprise-grade readiness aligning strictly to OWASP requirements.
