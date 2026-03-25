"use client";

import React, { useState, useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";
import { GlassCard } from "@/components/glass-ui/glass-card";
import { GlassButton } from "@/components/glass-ui/glass-button";
import { motion } from "framer-motion";
import { User, Mail, Moon, Sun, Settings } from "lucide-react";

export function ProfileClient() {
  const { user } = useAuthStore();
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    // Read theme from document element
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.contains("dark");
    if (isDark) {
      document.documentElement.classList.remove("dark");
      setTheme("light");
    } else {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    }
  };

  if (!user) return null;

  return (
    <div className="p-4 md:p-8 flex flex-col gap-8 max-w-4xl mx-auto mt-4 w-full">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold tracking-tight">Merchant Profile</h1>
        <p className="opacity-70 mt-1">Manage your identity and analytical preferences.</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}>
        <GlassCard className="p-8 flex flex-col md:flex-row gap-8 items-start">
          <div className="w-24 h-24 rounded-full bg-[var(--accent-primary)]/20 text-[var(--accent-primary)] flex items-center justify-center font-bold text-4xl shrink-0 uppercase border-2 border-[var(--accent-primary)]/50 shadow-[0_0_30px_rgba(var(--accent-primary),0.2)]">
            {user.email.charAt(0)}
          </div>
          <div className="flex-1 space-y-4">
            <div>
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <div className="flex items-center gap-2 mt-2 opacity-70">
                <User className="w-4 h-4" />
                <span className="text-sm font-mono tracking-wide">{user.id}</span>
              </div>
              <div className="flex items-center gap-2 mt-1 opacity-70">
                <Mail className="w-4 h-4" />
                <span className="text-sm">{user.email}</span>
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <GlassCard className="p-8">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Settings className="w-5 h-5 text-[var(--accent-primary)]" />
            Preferences & Theming
          </h3>
          <div className="flex items-center justify-between p-4 bg-[var(--foreground)]/5 rounded-xl border border-[var(--glass-border)]">
            <div>
              <h4 className="font-semibold">Application Interface Color</h4>
              <p className="text-sm opacity-70 mt-1">Seamlessly toggle between Light and Dark analytical environments.</p>
            </div>
            <GlassButton onClick={toggleTheme} variant="secondary" className="min-w-[140px] flex items-center justify-center gap-2">
              {theme === "dark" ? (
                <>
                  <Sun className="w-4 h-4" /> Light Mode
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4" /> Dark Mode
                </>
              )}
            </GlassButton>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
