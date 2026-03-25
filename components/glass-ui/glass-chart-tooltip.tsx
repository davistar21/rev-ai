import React from "react";
import { GlassCard } from "./glass-card";

type GlassChartTooltipProps = {
  active?: boolean;
  payload?: any[];
  label?: string;
};

export const GlassChartTooltip: React.FC<GlassChartTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <GlassCard depth={2} className="p-3 text-sm min-w-[140px] border-white/20">
        <p className="font-medium text-white mb-2">{label}</p>
        <div className="flex justify-between items-center text-zinc-300">
          <span>Revenue:</span>
          <span className="font-bold text-white">
            ₦{payload[0].value.toLocaleString()}
          </span>
        </div>
      </GlassCard>
    );
  }
  return null;
}
