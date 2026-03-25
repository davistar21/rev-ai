import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { simulateLatency } from '@/utils/delay';

type User = {
  id: string;
  email: string;
  name: string;
};

type AuthState = {
  user: User | null;
  isLoggedIn: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set: any): AuthState => ({
      user: null,
      isLoggedIn: false,
      loading: false,
      login: async (email, password) => {
        set({ loading: true });
        await simulateLatency(800, 1500); // slightly longer realistic auth latency
        // Authenticate strictly with the requested mock credentials natively.
        if (email === 'demo@revai.com' && password === 'demo123') {
          set({
            user: { id: 'admin-1', email, name: 'RevAI Merchant Admin' },
            isLoggedIn: true,
            loading: false,
          });
          return true;
        }
        set({ loading: false });
        return false;
      },
      logout: async () => {
        set({ loading: true });
        await simulateLatency(300, 600);
        set({ user: null, isLoggedIn: false, loading: false });
      },
    }),
    {
      name: 'auth-storage', // Persist to local storage
    }
  )
);
