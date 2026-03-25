import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Transaction } from '@/types/interswitch';
import { simulateLatency } from '@/utils/delay';

type TransactionState = {
  transactions: Transaction[];
  loading: boolean;
  syncTransactions: (mockData?: Transaction[]) => Promise<void>;
  fetchLocalDatabase: () => Promise<void>;
  clear: () => void;
};

export const useTransactionStore = create<TransactionState>()(
  persist(
    (set: any): TransactionState => ({
      transactions: [],
      loading: false,
      fetchLocalDatabase: async () => {
        set({ loading: true });
        try {
          const res = await fetch("/api/revai/transactions");
          const json = await res.json();
          if (json.success) set({ transactions: json.data });
        } catch (error) {
          console.error("Failed to fetch local SQLite proxy DB:", error);
        } finally {
          set({ loading: false });
        }
      },
      syncTransactions: async (mockData?: Transaction[]) => {
        set({ loading: true });
        
        if (mockData) {
          // Simulated CSV Upload bypasses fetch loops
          set({ transactions: mockData, loading: false });
          return;
        }
        
        try {
          // Trigger the Interswitch synchronization and local SQLite population webhook
          const syncRes = await fetch("/api/revai/sync", { method: "POST" });
          if (syncRes.ok) {
            // Re-fetch strictly from local node
            const fetchRes = await fetch("/api/revai/transactions");
            const fetchJson = await fetchRes.json();
            if (fetchJson.success) set({ transactions: fetchJson.data });
          }
        } catch (error) {
          console.error("Failed to Sync Interswitch Feed:", error);
        } finally {
          set({ loading: false });
        }
      },
      clear: () => set({ transactions: [] }),
    }),
    {
      name: 'transaction-storage',
    }
  )
);
