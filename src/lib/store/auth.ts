'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/lib/api/types';

interface AuthStore {
  user: User | null;
  accessToken: string | null;
  aiKey: string | null;
  isOnboarded: boolean;
  setUser: (user: User, token: string) => void;
  setAiKey: (key: string) => void;
  setOnboarded: () => void;
  logout: () => void;
}

export const useAuth = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      aiKey: null,
      isOnboarded: false,
      setUser: (user, accessToken) => set({ user, accessToken }),
      setAiKey: (aiKey) => set({ aiKey }),
      setOnboarded: () => set({ isOnboarded: true }),
      logout: () => set({ user: null, accessToken: null, isOnboarded: false }),
    }),
    { name: 'lumo-auth' }
  )
);
