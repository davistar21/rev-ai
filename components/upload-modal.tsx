"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/glass-ui/glass-card";
import { GlassButton } from "@/components/glass-ui/glass-button";
import { UploadCloud, FileText, CheckCircle2, Loader2, X } from "lucide-react";
import { simulatedCSVs } from "@/lib/mock-csv-data";
import { useTransactionStore } from "@/stores/transactionStore";
import { useInsightsStore } from "@/stores/insightsStore";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UploadModal({ isOpen, onClose }: UploadModalProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  const syncTransactions = useTransactionStore((s) => s.syncTransactions);
  const generateInsights = useInsightsStore((s) => s.generateInsights);
  const generateCreditScore = useInsightsStore((s) => s.generateCreditScore);

  const handleUpload = async () => {
    if (!selectedId) return;
    setIsUploading(true);
    
    // Simulate parsing and uploading
    await new Promise((resolve) => setTimeout(resolve, 1800));
    
    const file = simulatedCSVs.find((c) => c.id === selectedId);
    if (file) {
      await syncTransactions(file.data);
      // Fire AI Generation automatically in background
      generateInsights();
      generateCreditScore();
    }
    
    setIsUploading(false);
    setSuccess(true);
    
    setTimeout(() => {
      setSuccess(false);
      setSelectedId(null);
      onClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-lg"
          >
            <GlassCard className="p-6 relative flex flex-col gap-6">
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-[var(--foreground)] opacity-50 hover:opacity-100 transition-opacity"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col items-center gap-2 text-center">
                <div className="w-12 h-12 rounded-full bg-[var(--accent-primary)]/20 flex items-center justify-center text-[var(--accent-primary)] mb-2">
                  <UploadCloud size={24} />
                </div>
                <h2 className="text-xl font-bold text-[var(--foreground)]">Upload Transactions</h2>
                <p className="text-sm opacity-70">
                  Drag and drop your Interswitch CSV export, or select a file below.
                </p>
              </div>

              {!success ? (
                <div className="flex flex-col gap-3 mt-4">
                  {simulatedCSVs.map((csv) => (
                    <div
                      key={csv.id}
                      onClick={() => !isUploading && setSelectedId(csv.id)}
                      className={`flex items-center gap-4 p-4 rounded-xl border border-[var(--foreground)]/10 cursor-pointer transition-all ${
                        selectedId === csv.id
                          ? "bg-[var(--accent-primary)]/10 border-[var(--accent-primary)]/50"
                          : "hover:bg-[var(--foreground)]/5"
                      } ${isUploading ? "opacity-50 pointer-events-none" : ""}`}
                    >
                      <div className="text-[var(--accent-primary)]">
                        <FileText size={24} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-[var(--foreground)]">{csv.title}</h4>
                        <p className="text-xs opacity-60">
                          {csv.rows} rows • {csv.size}
                        </p>
                      </div>
                      {selectedId === csv.id && (
                        <div className="text-[var(--accent-primary)]">
                          <CheckCircle2 size={20} />
                        </div>
                      )}
                    </div>
                  ))}

                  <GlassButton
                    variant="primary"
                    className="mt-4 w-full justify-center"
                    disabled={!selectedId || isUploading}
                    onClick={handleUpload}
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="animate-spin mr-2" size={18} />
                        Syncing to RevAI Engine...
                      </>
                    ) : (
                      "Upload Document"
                    )}
                  </GlassButton>
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center py-8 gap-4"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--foreground)]">Upload Successful!</h3>
                  <p className="text-sm opacity-60 text-center">
                    Transactions mounted. RevAI engine is now analyzing anomalies and forecasting revenue.
                  </p>
                </motion.div>
              )}
            </GlassCard>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
