'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSettings } from '@/lib/store/settings';
import type { ArticleMode } from '@/lib/api/types';
import { Check } from 'lucide-react';

const modes: { value: ArticleMode; title: string; sub: string; tag: string; preview: { en: string; zh?: string } }[] = [
  {
    value: 'en',
    title: 'English Only',
    sub: 'Best for advanced users (C1+)',
    tag: 'Immersive',
    preview: { en: 'Dubai has become one of the world\'s most popular destinations for expats seeking opportunities.' },
  },
  {
    value: 'bilingual',
    title: 'Bilingual',
    sub: 'Best for intermediate learners (B1/B2)',
    tag: 'Recommended',
    preview: {
      en: 'Dubai has become one of the world\'s most popular destinations for expats.',
      zh: '迪拜已成为全球最受欢迎的目的地之一。',
    },
  },
  {
    value: 'zh',
    title: 'Chinese First',
    sub: 'Best for beginners (A2/B1)',
    tag: 'Beginner-friendly',
    preview: {
      zh: '迪拜已成为全球最受欢迎的目的地之一。',
      en: 'Dubai has become one of the world\'s most popular destinations for expats.',
    },
  },
];

export default function SetupLanguagePage() {
  const router = useRouter();
  const { articleMode, setArticleMode } = useSettings();
  const [selected, setSelected] = useState<ArticleMode>(articleMode);

  function handleStart() {
    setArticleMode(selected);
    router.push('/home');
  }

  return (
    <div style={{ maxWidth: 430, margin: '0 auto', minHeight: '100vh', background: 'var(--screen)', padding: '48px 24px 40px' }}>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: 'var(--ink)', margin: '0 0 8px' }}>Content Display Mode</h1>
        <p style={{ fontSize: 14, color: 'var(--ink-2)', margin: 0 }}>How do you want to learn? You can change this anytime.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 32 }}>
        {modes.map(m => {
          const active = selected === m.value;
          return (
            <button
              key={m.value}
              onClick={() => setSelected(m.value)}
              style={{
                textAlign: 'left', padding: 20, borderRadius: 20, cursor: 'pointer',
                border: `2px solid ${active ? 'var(--accent)' : 'var(--line)'}`,
                background: active ? 'var(--accent-soft)' : 'var(--surface)',
                transition: 'all .2s', position: 'relative',
              }}
            >
              {active && (
                <div style={{
                  position: 'absolute', top: 16, right: 16,
                  width: 24, height: 24, borderRadius: '50%', background: 'var(--accent)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Check size={14} color="#fff" />
                </div>
              )}
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 6 }}>
                <span style={{ fontSize: 16, fontWeight: 800, color: active ? 'var(--accent-ink)' : 'var(--ink)' }}>{m.title}</span>
                <span style={{
                  fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 99,
                  background: active ? 'var(--accent)' : 'var(--surface-2)',
                  color: active ? '#fff' : 'var(--ink-3)',
                }}>{m.tag}</span>
              </div>
              <div style={{ fontSize: 12, color: 'var(--ink-3)', marginBottom: 14 }}>{m.sub}</div>
              {/* Preview */}
              <div style={{
                background: active ? 'rgba(255,255,255,.5)' : 'var(--surface-2)',
                borderRadius: 12, padding: 12, fontSize: 12,
              }}>
                {(m.value === 'zh' ? [
                  { text: m.preview.zh!, isCjk: true, color: 'var(--ink)' },
                  { text: m.preview.en!, isCjk: false, color: 'var(--ink-3)' },
                ] : [
                  { text: m.preview.en!, isCjk: false, color: 'var(--ink)' },
                  ...(m.preview.zh ? [{ text: m.preview.zh, isCjk: true, color: 'var(--ink-2)' }] : []),
                ]).map((line, i) => (
                  <p key={i} className={line.isCjk ? 'cjk' : ''} style={{ margin: i > 0 ? '6px 0 0' : 0, color: line.color, lineHeight: 1.6 }}>
                    {line.text}
                  </p>
                ))}
              </div>
            </button>
          );
        })}
      </div>

      <button onClick={handleStart} className="lumo-btn lumo-btn--primary" style={{ width: '100%' }}>
        Start Learning →
      </button>
    </div>
  );
}
