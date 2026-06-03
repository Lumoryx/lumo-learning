'use client';
import { useSettings } from '@/lib/store/settings';
import { useAuth } from '@/lib/store/auth';
import type { ArticleMode, Lang } from '@/lib/api/types';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div className="eyebrow" style={{ marginBottom: 10 }}>{title}</div>
      <div className="lumo-card" style={{ padding: '0 16px' }}>{children}</div>
    </div>
  );
}

function Row({ label, children, last }: { label: string; children: ReactNode; last?: boolean }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 0', borderBottom: last ? 'none' : '1px solid var(--line)',
    }}>
      <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>{label}</span>
      {children}
    </div>
  );
}

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <div onClick={onToggle} style={{
      width: 44, height: 26, borderRadius: 99, cursor: 'pointer',
      background: on ? 'var(--accent)' : 'var(--line-2)', position: 'relative', transition: 'background .2s',
    }}>
      <div style={{
        position: 'absolute', top: 3, left: on ? 21 : 3,
        width: 20, height: 20, borderRadius: '50%', background: '#fff',
        transition: 'left .2s', boxShadow: '0 1px 4px rgba(0,0,0,.3)',
      }} />
    </div>
  );
}

export default function SettingsPage() {
  const router = useRouter();
  const { theme, toggleTheme, articleMode, setArticleMode, appLanguage, setAppLanguage } = useSettings();
  const { aiKey } = useAuth();

  return (
    <div style={{ padding: '16px 20px 40px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <button onClick={() => router.back()} style={{
          width: 36, height: 36, borderRadius: 12, background: 'var(--surface-2)',
          border: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}>
          <ChevronLeft size={20} color="var(--ink)" />
        </button>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--ink)', margin: 0 }}>Settings</h1>
      </div>

      <Section title="AI & API Token">
        <Row label="OpenAI API Key">
          <span style={{ fontSize: 13, color: aiKey ? 'var(--good)' : 'var(--warn)', fontWeight: 600 }}>
            {aiKey ? '✓ Connected' : 'Not set'}
          </span>
        </Row>
        <Row label="Model" last>
          <span style={{ fontSize: 13, color: 'var(--ink-3)' }}>GPT-4o-mini</span>
        </Row>
      </Section>

      <Section title="Display">
        <Row label="Theme">
          <Toggle on={theme === 'dark'} onToggle={toggleTheme} />
        </Row>
        <Row label="Article Mode" last>
          <div style={{ display: 'flex', gap: 6 }}>
            {(['en', 'bilingual', 'zh'] as ArticleMode[]).map(m => (
              <button
                key={m}
                onClick={() => setArticleMode(m)}
                style={{
                  padding: '4px 10px', borderRadius: 8, fontSize: 11, fontWeight: 700,
                  border: 'none', cursor: 'pointer',
                  background: articleMode === m ? 'var(--accent)' : 'var(--surface-2)',
                  color: articleMode === m ? '#fff' : 'var(--ink-3)',
                }}
              >
                {m === 'en' ? 'EN' : m === 'bilingual' ? '双语' : '中文'}
              </button>
            ))}
          </div>
        </Row>
      </Section>

      <Section title="Language">
        <Row label="Interface Language" last>
          <div style={{ display: 'flex', gap: 6 }}>
            {(['en', 'zh'] as Lang[]).map(l => (
              <button
                key={l}
                onClick={() => setAppLanguage(l)}
                style={{
                  padding: '4px 14px', borderRadius: 8, fontSize: 12, fontWeight: 700,
                  border: 'none', cursor: 'pointer',
                  background: appLanguage === l ? 'var(--accent)' : 'var(--surface-2)',
                  color: appLanguage === l ? '#fff' : 'var(--ink-3)',
                }}
              >
                {l === 'en' ? 'English' : '中文'}
              </button>
            ))}
          </div>
        </Row>
      </Section>

      <Section title="Privacy">
        <Row label="Learning Memory" last>
          <Toggle on={true} onToggle={() => {}} />
        </Row>
      </Section>
    </div>
  );
}
