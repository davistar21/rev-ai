import { GlassContainer } from "@/components/glass-ui/glass-container";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { PricingTease } from "@/components/landing/PricingTease";

export default function Home() {
  return (
    <GlassContainer>
      <Hero />
      <Features />
      <PricingTease />
      
      {/* Simple footer */}
      <footer className="py-8 text-center text-sm text-zinc-500 border-t border-white/10 mt-20 relative z-10">
        <p>Built for the Interswitch x Enyata Hackathon 2026. Powered by Llama 3 via Groq API.</p>
      </footer>
    </GlassContainer>
  );
}
