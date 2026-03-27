"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { GlassContainer } from "@/components/glass-ui/glass-container";
import { GlassCard } from "@/components/glass-ui/glass-card";
import { GlassButton } from "@/components/glass-ui/glass-button";
import { Input } from "@/components/ui/input";
import { Lock, Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [email, setEmail] = useState("demo@revai.com");
  const [password, setPassword] = useState("demo123");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuthStore();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Slight artificial delay for UX feel
    await new Promise((r) => setTimeout(r, 600));

    const success = await login(email, password);
    setIsLoading(false);

    if (success) {
      router.push("/merchant");
    } else {
      setError("Invalid credentials. Use demo@revai.com / demo123");
    }
  };

  return (
    <GlassContainer className="">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full p-4 flex items-center justify-center min-h-screen"
      >
        <GlassCard
          depth={2}
          className="p-8 border-[var(--glass-border)] flex flex-col items-center"
        >
          <div className="w-16 h-16 bg-[var(--accent-primary)]/10 rounded-2xl flex items-center justify-center mb-6 border border-[var(--accent-primary)]/20 shadow-inner">
            <Lock className="w-8 h-8 text-[var(--accent-primary)]" />
          </div>

          <h1 className="text-2xl font-bold tracking-tight mb-2">
            Merchant Access
          </h1>
          <p className="opacity-70 text-sm mb-8 text-center max-w-xs">
            Authenticate to access live Interswitch transactional streams.
          </p>

          <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-rose-500/10 text-rose-500 border border-rose-500/20 p-3 rounded-lg text-sm text-center"
              >
                {error}
              </motion.div>
            )}

            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-10 h-11 bg-[var(--foreground)]/5 border-[var(--glass-border)] text-sm focus-visible:ring-1 focus-visible:ring-[var(--accent-primary)] w-full"
                placeholder="Business Email"
              />
            </div>

            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pl-10 h-11 bg-[var(--foreground)]/5 border-[var(--glass-border)] text-sm focus-visible:ring-1 focus-visible:ring-[var(--accent-primary)] w-full"
                placeholder="Password"
              />
            </div>

            <GlassButton
              type="submit"
              variant="primary"
              size="lg"
              disabled={isLoading}
              className="w-full mt-2 h-11"
            >
              {isLoading ? (
                <div className="w-5 h-5 rounded-full border-2 border-[var(--background)]/30 border-t-[var(--background)] animate-spin" />
              ) : (
                "Authenticate securely"
              )}
            </GlassButton>
          </form>
        </GlassCard>
      </motion.div>
    </GlassContainer>
  );
}
