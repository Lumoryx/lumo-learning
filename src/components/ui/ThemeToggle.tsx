'use client';
import { useSettings } from '@/lib/store/settings';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const { theme, toggleTheme } = useSettings();
  return (
    <button
      onClick={toggleTheme}
      style={{
        width: 40, height: 40, borderRadius: '50%',
        background: 'var(--surface-2)', border: '1px solid var(--line)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', color: 'var(--ink-2)',
      }}
    >
      {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  );
}
