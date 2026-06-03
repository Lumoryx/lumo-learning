'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ArticleMode, Lang } from '@/lib/api/types';

interface SettingsStore {
  theme: 'light' | 'dark';
  articleMode: ArticleMode;
  appLanguage: Lang;
  dailyGoalMinutes: number;
  setTheme: (t: 'light' | 'dark') => void;
  setArticleMode: (m: ArticleMode) => void;
  setAppLanguage: (l: Lang) => void;
  toggleTheme: () => void;
}

export const useSettings = create<SettingsStore>()(
  persist(
    (set, get) => ({
      theme: 'light',
      articleMode: 'bilingual',
      appLanguage: 'en',
      dailyGoalMinutes: 20,
      setTheme: (theme) => set({ theme }),
      setArticleMode: (articleMode) => set({ articleMode }),
      setAppLanguage: (appLanguage) => set({ appLanguage }),
      toggleTheme: () => set({ theme: get().theme === 'light' ? 'dark' : 'light' }),
    }),
    { name: 'lumo-settings' }
  )
);
