"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuthStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, mounted, router]);

  // Prevent hydration errors by waiting for mount
  if (!mounted) return null;

  if (!isLoggedIn) return null; // Avoid rendering children briefly before redirect kicks in

  return <>{children}</>;
}
