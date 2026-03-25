"use client";

import { LayoutDashboard, LineChart, Banknote, TerminalSquare, Home, User } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";

import { useAuthStore } from "@/stores/authStore";
import { LogOut } from "lucide-react";

const items = [
  { name: "Home", href: "/", icon: Home },
  { name: "Dashboard", href: "/merchant", icon: LayoutDashboard },
  { name: "Insights", href: "/insights", icon: LineChart },
  { name: "Nano-Credit", href: "/credit", icon: Banknote },
  { name: "API Docs", href: "/api-docs", icon: TerminalSquare },
  { name: "Profile", href: "/profile", icon: User },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();

  return (
    <Sidebar className="border-r border-[var(--glass-border)] bg-[var(--glass-panel)] backdrop-blur-3xl shadow-[var(--glass-shadow)]" variant="inset">
      <SidebarHeader className="p-6 pb-2">
        <h2 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-b from-white to-white/60 dark:from-foreground dark:to-foreground/50">
          RevAI
        </h2>
        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-primary)] mix-blend-plus-lighter">
          Merchant Hub
        </span>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs text-[var(--foreground)]/50 uppercase tracking-widest font-semibold mb-2">
            Infrastructure
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton asChild isActive={isActive} className={`h-11 px-4 transition-all duration-300 font-medium ${isActive ? 'bg-[var(--accent-primary)]/15 text-[var(--accent-primary)] border border-[var(--accent-primary)]/20 shadow-inner' : 'text-[var(--foreground)]/70 hover:bg-[var(--foreground)]/10 hover:text-[var(--foreground)]'}`}>
                      <Link href={item.href} className="flex items-center gap-3">
                        <item.icon className="w-5 h-5" />
                        <span>{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarGroup className="mt-auto border-t border-[var(--glass-border)] p-4">
        {user ? (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[var(--accent-primary)]/20 text-[var(--accent-primary)] flex items-center justify-center font-bold text-sm shrink-0 uppercase">
                {user.email.charAt(0)}
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-xs font-semibold truncate">{user.name}</span>
                <span className="text-[10px] opacity-60 truncate">{user.email}</span>
              </div>
            </div>
            <SidebarMenuButton onClick={logout} className="text-rose-500 hover:bg-rose-500/10 hover:text-rose-500 flex items-center gap-2 h-9 justify-center">
               <LogOut className="w-4 h-4" />
               <span className="text-sm font-semibold">Terminate Session</span>
            </SidebarMenuButton>
          </div>
        ) : null}
      </SidebarGroup>
    </Sidebar>
  );
}
