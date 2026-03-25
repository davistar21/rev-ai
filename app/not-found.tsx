import { GlassContainer } from "@/components/glass-ui/glass-container";
import { GlassCard } from "@/components/glass-ui/glass-card";
import { GlassButton } from "@/components/glass-ui/glass-button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <GlassContainer className="flex items-center justify-center p-4">
      <GlassCard className="max-w-md w-full p-12 text-center flex flex-col items-center gap-4">
        <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-zinc-400 to-zinc-600 dark:from-zinc-500 dark:to-zinc-300">
          404
        </h1>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
          Page Not Found
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6 font-medium">
          The dashboard route or transaction resource you are looking for does not exist.
        </p>
        <Link href="/">
          <GlassButton variant="primary" className="w-full px-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </GlassButton>
        </Link>
      </GlassCard>
    </GlassContainer>
  );
}
