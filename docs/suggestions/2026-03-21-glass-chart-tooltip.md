# Suggestion: Extract Chart Tooltips to Reusable Glass UI Components

## Problem
Currently, the `Tooltip` component inside the Recharts `LineChart` in `dashboard-client.tsx` uses inline styles to achieve a glassmorphism effect:
```tsx
<Tooltip
  contentStyle={{
    backgroundColor: "rgba(20, 20, 20, 0.8)",
    backdropFilter: "blur(10px)",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#fff",
  }}
...
```
This violates the principle of keeping all glass logic isolated to the `/components/glass-ui` directory as outlined in the Liquid Glass architecture docs.

## Proposed Fix
Create a custom `GlassChartTooltip` component inside `/components/glass-ui/glass-chart-tooltip.tsx` that leverages `GlassCard` directly:
```tsx
import { GlassCard } from "./glass-card";

export const GlassChartTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <GlassCard depth={2} className="p-3 text-sm min-w-[120px]">
        <p className="font-medium text-white mb-2">{label}</p>
        <div className="flex justify-between items-center text-zinc-300">
          <span>Revenue:</span>
          <span className="font-bold text-white">₦{payload[0].value / 1000}k</span>
        </div>
      </GlassCard>
    );
  }
  return null;
};
```
Then supply it to recharts: `<Tooltip content={<GlassChartTooltip />} />`

## Impact
- Adheres strictly to the architectural boundary of keeping all glass styles out of feature components.
- Standardizes blur and shadow depths across tooltips and cards.
- Effort: ~10 mins.
