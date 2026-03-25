"use client";

import React from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { GlassContainer } from "@/components/glass-ui/glass-container";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Chatbot } from "@/components/chatbot";
// import { Atmospheric3D } from "@/components/glass-ui/atmospheric-3d";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      {/* <Atmospheric3D /> */}
      <Chatbot />
      <GlassContainer className="flex h-screen overflow-hidden">
        <SidebarProvider defaultOpen={true}>
          {/* Desktop & Mobile Native Shadcn Sidebar */}
          <AppSidebar />
          
          {/* Main Content Area */}
          <main className="flex-1 min-h-screen overflow-y-auto scrollbar w-full mx-auto relative flex flex-col">
            {/* Top trigger bar for mobile visibility */}
            <div className="w-full flex items-center p-4 md:hidden sticky top-0 z-50 bg-[var(--background)]/80 backdrop-blur-xl border-b border-[var(--glass-border)]">
              <SidebarTrigger className="text-[var(--accent-primary)]" />
              <span className="ml-4 font-bold tracking-tight">RevAI Hub</span>
            </div>

            <div className="p-4 md:p-8 flex-1">
              {children}
            </div>
          </main>
        </SidebarProvider>
      </GlassContainer>
    </ProtectedRoute>
  );
}
