import { simulateLatency } from "@/utils/delay";
import { MerchantClient } from "./merchant-client";

export default async function MerchantPage() {
  await simulateLatency(400, 800);
  return <MerchantClient />;
}
