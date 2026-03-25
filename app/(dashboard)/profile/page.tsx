import { simulateLatency } from "@/utils/delay";
import { ProfileClient } from "./profile-client";

export default async function ProfilePage() {
  await simulateLatency(300, 600);
  return <ProfileClient />;
}
