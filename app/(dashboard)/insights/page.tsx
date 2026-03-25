import { simulateLatency } from "@/utils/delay";
import { InsightsClient } from "./insights-client";

export default async function InsightsPage() {
  await simulateLatency(400, 800);
  return <InsightsClient />;
}
