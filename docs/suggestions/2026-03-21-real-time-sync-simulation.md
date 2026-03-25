# Suggestion: Local Real-Time Sync Simulation

## Problem
Currently, the "Sync" function simply triggers a backend API endpoint that arbitrarily fetches 30 mock entries spanning a large time range via `mockClient.ts`. We don't have a way to visibly see transactions updating in real time continuously, which is exactly how a real Payment Gateway Dashboard behaves.

## Proposed Strategy
Add a WebSockets integration or use simple browser-side polling inside `dashboard-client.tsx`:
```tsx
import { useEffect } from 'react';

// Within DashboardClient
useEffect(() => {
    // Poll the synced database for any genuinely newly inserted rows every 15s
    const pollId = setInterval(() => {
        handleSilentlyFetchLatestTiers();
    }, 15000);
    return () => clearInterval(pollId);
}, []);
```
Combined with a "Mock Data Runner" script (running in the background locally) continuously inserting rows via a standard scheduled CRON function into the SQLite db, the user would watch the `Revenue Over Time` Recharts graph actively push the line further forward and update without needing to trigger the `Sync Interswitch` button manually. 

## Impact
- Unlocks immense frontend Demo value. Real-time updating visualizations look far more futuristic. 
- Highlights Rechart's smooth line-chart re-animation properties automatically. 
- Effort: ~20 mins.
