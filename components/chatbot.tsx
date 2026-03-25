"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User, Loader2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { useInsightsStore } from "@/stores/insightsStore";
import { useTransactionStore } from "@/stores/transactionStore";

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([
    {
      role: "assistant",
      content:
        "Hi! I'm RevAI. I'm looking at your dashboard right now. How can I help you analyze your revenue?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const { insightsText, anomaliesStr, creditScore } = useInsightsStore();
  const txLength = useTransactionStore((s) => s.transactions.length);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setIsTyping(true);

    try {
      const apiMessages =
        setMessages.length > 0
          ? [...messages, { role: "user", content: userMsg }]
          : [{ role: "user", content: userMsg }];

      const res = await fetch("/api/revai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: apiMessages,
          context: {
            pathname,
            insights: insightsText,
            anomalies: anomaliesStr,
            creditScore: creditScore?.score,
            txLength,
          },
        }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I encountered an error connecting to the RevAI engine. Please try again.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[var(--accent-primary)] text-[var(--background)] shadow-2xl flex items-center justify-center hover:scale-105 transition-transform ${isOpen ? "hidden" : "flex"}`}
      >
        <MessageSquare size={24} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 z-50 h-full w-full sm:w-[400px] flex flex-col bg-[var(--glass-panel)] backdrop-blur-3xl border-l border-[var(--glass-border)] shadow-2xl"
          >
            {/* Header */}
            <div className="h-16 border-b border-[var(--foreground)]/10 flex items-center justify-between px-4 bg-[var(--foreground)]/5 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[var(--accent-primary)]/20 text-[var(--accent-primary)] flex items-center justify-center">
                  <Bot size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-[var(--foreground)] text-sm">
                    RevAI Assistant
                  </h3>
                  <p className="text-[10px] opacity-60 text-[var(--accent-primary)] uppercase tracking-wider">
                    Context Active
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="opacity-50 hover:opacity-100 p-2"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-1.5 ${msg.role === "user" ? "self-end flex-row-reverse" : "self-start"}`}
                >
                  <div
                    className={`w-4 h-4 rounded-full shrink-0 flex items-center justify-center ${msg.role === "user" ? "bg-[var(--foreground)]/10 text-[var(--foreground)]" : "bg-[var(--accent-primary)]/20 text-[var(--accent-primary)]"}`}
                  >
                    {msg.role === "user" ? (
                      <User size={14} />
                    ) : (
                      <Bot size={14} />
                    )}
                  </div>
                  <div
                    className={`p-3 rounded-2xl text-sm leading-relaxed ${msg.role === "user" ? "bg-[var(--foreground)]/10 max-w-[85%] text-[var(--foreground)] rounded-tr-sm" : " text-[var(--foreground)]"}`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-3 max-w-[85%] self-start">
                  <div className="w-8 h-8 rounded-full shrink-0 bg-[var(--accent-primary)]/20 text-[var(--accent-primary)] flex items-center justify-center">
                    <Bot size={14} />
                  </div>
                  <div className="p-3 rounded-2xl bg-[var(--accent-primary)]/5 border border-[var(--accent-primary)]/10 rounded-tl-sm flex items-center gap-2">
                    <Loader2
                      className="animate-spin text-[var(--accent-primary)] opacity-50"
                      size={14}
                    />
                    <span className="text-xs opacity-50">
                      Analyzing data...
                    </span>
                  </div>
                </div>
              )}
              <div ref={endOfMessagesRef} />
            </div>

            {/* Input Buffer */}
            <div className="p-4 border-t border-[var(--foreground)]/10 shrink-0 bg-[var(--background)]/30 backdrop-blur-md">
              <form
                onSubmit={handleSend}
                className="relative flex items-center"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about your revenue..."
                  className="w-full bg-[var(--foreground)]/5 border border-[var(--foreground)]/10 rounded-full py-3 pl-4 pr-12 text-sm text-[var(--foreground)] placeholder:text-[var(--foreground)]/40 focus:outline-none focus:border-[var(--accent-primary)]/50 transition-colors"
                  disabled={isTyping}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="absolute right-2 w-8 h-8 rounded-full bg-[var(--accent-primary)] flex items-center justify-center text-[var(--background)] disabled:opacity-50 transition-opacity"
                >
                  <Send size={14} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
