import { simulateLatency } from "@/utils/delay";
import { CreditClient } from "./credit-client";

export default async function CreditPage() {
  await simulateLatency(400, 800);
  return <CreditClient />;
}
