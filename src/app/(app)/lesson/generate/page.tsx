'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Sparkles, Loader } from 'lucide-react';

const topics = [
  { key: 'career',     label: 'Work & Career',  emoji: '💼' },
  { key: 'culture',    label: 'Culture',         emoji: '🌍' },
  { key: 'food',       label: 'Food & Dining',   emoji: '🍜' },
  { key: 'housing',    label: 'Housing',         emoji: '🏠' },
  { key: 'travel',     label: 'Travel',          emoji: '✈️' },
  { key: 'tech',       label: 'Technology',      emoji: '💡' },
];

const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const;

export default function GenerateLessonPage() {
  const router = useRouter();
  const [topic, setTopic] = useState('');
  const [customTopic, setCustomTopic] = useState('');
  const [level, setLevel] = useState<string>('B1');
  const [generating, setGenerating] = useState(false);

  async function handleGenerate() {
    setGenerating(true);
    await new Promise(r => setTimeout(r, 2000));
    router.push('/lesson/les_dxb90');
  }

  return (
    <div style={{ padding: '16px 20px 40px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <button
          onClick={() => router.back()}
          style={{
            width: 36, height: 36, borderRadius: 12, background: 'var(--surface-2)',
            border: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}
        >
          <ChevronLeft size={20} color="var(--ink)" />
        </button>
        <div>
          <div className="eyebrow" style={{ marginBottom: 2 }}>AI Generate</div>
          <h1 style={{ fontSize: 20, fontWeight: 800, color: 'var(--ink)', margin: 0 }}>Custom Lesson</h1>
        </div>
      </div>

      {/* Custom topic input */}
      <div style={{ marginBottom: 24 }}>
        <div className="eyebrow" style={{ marginBottom: 10 }}>Your Topic</div>
        <input
          value={customTopic}
          onChange={e => setCustomTopic(e.target.value)}
          placeholder="e.g. Salary negotiation in Dubai…"
          style={{
            width: '100%', height: 52, borderRadius: 16, padding: '0 18px',
            fontSize: 14, background: 'var(--surface-2)', border: '1.5px solid var(--line-2)',
            color: 'var(--ink)', outline: 'none', fontFamily: 'inherit',
          }}
        />
      </div>

      {/* Or pick a topic */}
      <div style={{ marginBottom: 24 }}>
        <div className="eyebrow" style={{ marginBottom: 10 }}>Or Pick a Topic</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
          {topics.map(t => (
            <button
              key={t.key}
              onClick={() => setTopic(topic === t.key ? '' : t.key)}
              style={{
                padding: '12px 8px', borderRadius: 16, cursor: 'pointer',
                border: `1.5px solid ${topic === t.key ? 'var(--accent)' : 'var(--line)'}`,
                background: topic === t.key ? 'var(--accent-soft)' : 'var(--surface)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                transition: 'all .2s',
              }}
            >
              <span style={{ fontSize: 22 }}>{t.emoji}</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: topic === t.key ? 'var(--accent-ink)' : 'var(--ink-2)' }}>
                {t.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Level */}
      <div style={{ marginBottom: 32 }}>
        <div className="eyebrow" style={{ marginBottom: 10 }}>Difficulty Level</div>
        <div style={{ display: 'flex', gap: 8 }}>
          {levels.map(l => (
            <button
              key={l}
              onClick={() => setLevel(l)}
              style={{
                flex: 1, height: 38, borderRadius: 12, fontSize: 13, fontWeight: 700,
                border: 'none', cursor: 'pointer',
                background: level === l ? 'var(--accent)' : 'var(--surface-2)',
                color: level === l ? '#fff' : 'var(--ink-3)',
                transition: 'all .2s',
              }}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleGenerate}
        disabled={!customTopic && !topic}
        className="lumo-btn lumo-btn--primary"
        style={{ width: '100%', opacity: (!customTopic && !topic) ? 0.5 : 1 }}
      >
        {generating
          ? <><Loader size={16} style={{ animation: 'spin 1s linear infinite' }} /> Generating…</>
          : <><Sparkles size={18} /> Generate Lesson</>
        }
      </button>

      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  );
}
