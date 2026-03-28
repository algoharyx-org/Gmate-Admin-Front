import { create } from 'zustand';
import { User } from '@/lib/types';
import { getCurrentUser } from '@/services/apiUser';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  fetchSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  setUser: (user) => set({ user }),
  fetchSession: async () => {
    try {
      set({ isLoading: true });
      const userData = await getCurrentUser();
      set({ user: userData, isLoading: false });
    } catch (error) {
      console.error("Failed to fetch session:", error);
      set({ user: null, isLoading: false });
    }
  },
}));
