'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { mockArticle, mockLesson, mockWordLookup } from '@/lib/mock-data';
import { useSettings } from '@/lib/store/settings';
import type { ArticleMode } from '@/lib/api/types';
import { ChevronLeft, Volume2, X, Plus } from 'lucide-react';

const modeLabels: Record<ArticleMode, string> = {
  en: 'EN Only',
  bilingual: 'Bilingual',
  zh: '中文优先',
};

export default function LessonPage() {
  const router = useRouter();
  const { articleMode, setArticleMode } = useSettings();
  const [lookup, setLookup] = useState<string | null>(null);

  const article = mockArticle;
  const lesson = mockLesson;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--screen)' }}>
      {/* Header */}
      <div style={{
        padding: '16px 20px 12px', display: 'flex', alignItems: 'center', gap: 12,
        borderBottom: '1px solid var(--line)', flexShrink: 0,
      }}>
        <button onClick={() => router.back()} style={{
          width: 36, height: 36, borderRadius: 12, background: 'var(--surface-2)',
          border: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}>
          <ChevronLeft size={20} color="var(--ink)" />
        </button>
        <div style={{ flex: 1 }}>
          <div className="eyebrow">{lesson.topic}</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', lineHeight: 1.3 }}>
            {lesson.title.en}
          </div>
        </div>
        <button style={{
          width: 36, height: 36, borderRadius: 12, background: 'var(--accent-soft)',
          border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}>
          <Volume2 size={18} color="var(--accent-ink)" />
        </button>
      </div>

      {/* Mode switcher */}
      <div style={{
        display: 'flex', gap: 6, padding: '10px 20px',
        borderBottom: '1px solid var(--line)', flexShrink: 0, background: 'var(--surface-2)',
      }}>
        {(['en', 'bilingual', 'zh'] as ArticleMode[]).map(m => (
          <button
            key={m}
            onClick={() => setArticleMode(m)}
            style={{
              flex: 1, height: 32, borderRadius: 10, fontSize: 12, fontWeight: 700,
              border: 'none', cursor: 'pointer',
              background: articleMode === m ? 'var(--accent)' : 'var(--surface)',
              color: articleMode === m ? '#fff' : 'var(--ink-3)',
              transition: 'all .2s',
            }}
          >
            {modeLabels[m]}
          </button>
        ))}
      </div>

      {/* Article */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 20px 80px' }}>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--ink)', lineHeight: 1.35, marginBottom: 20 }}>
          {articleMode === 'zh' ? lesson.title.zh : lesson.title.en}
        </h2>

        {article.paragraphs.map((para, i) => (
          <div key={i} style={{ marginBottom: 24 }}>
            {/* English paragraph */}
            {(articleMode === 'en' || articleMode === 'bilingual') && (
              <p
                style={{
                  fontSize: 15, lineHeight: 1.75, color: 'var(--ink)',
                  margin: '0 0 8px',
                }}
              >
                {para.highlights?.length > 0
                  ? renderHighlighted(para.en ?? '', para.highlights, setLookup)
                  : para.en}
              </p>
            )}
            {/* Chinese paragraph */}
            {(articleMode === 'zh' || articleMode === 'bilingual') && para.zh && (
              <p className="cjk" style={{
                fontSize: 14, lineHeight: 1.8, color: articleMode === 'bilingual' ? 'var(--ink-2)' : 'var(--ink)',
                borderLeft: articleMode === 'bilingual' ? '3px solid var(--accent-ring)' : 'none',
                paddingLeft: articleMode === 'bilingual' ? 12 : 0,
                margin: 0,
              }}>
                {para.zh}
              </p>
            )}
            {/* Figure after paragraph */}
            {article.figures.find(f => f.afterParagraph === i) && (
              <div style={{
                marginTop: 16, height: 140, borderRadius: 16, background: 'var(--grad-soft)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '1px solid var(--accent-ring)',
              }}>
                <span style={{ fontSize: 13, color: 'var(--ink-3)' }}>
                  {article.figures.find(f => f.afterParagraph === i)?.caption.en}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Word Lookup Bottom Sheet */}
      {lookup && (
        <div
          onClick={() => setLookup(null)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,.4)', zIndex: 100,
            display: 'flex', alignItems: 'flex-end',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              width: '100%', maxWidth: 430, margin: '0 auto',
              background: 'var(--surface)', borderRadius: '24px 24px 0 0',
              padding: '20px 24px 40px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--ink)' }}>{mockWordLookup.word}</div>
                <div style={{ fontSize: 13, color: 'var(--ink-3)', marginTop: 2 }}>
                  {mockWordLookup.phonetic} · {mockWordLookup.pos}
                </div>
              </div>
              <button onClick={() => setLookup(null)} style={{
                width: 32, height: 32, borderRadius: 99, background: 'var(--surface-2)',
                border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              }}>
                <X size={16} color="var(--ink-2)" />
              </button>
            </div>

            <div style={{ marginBottom: 12 }}>
              <div className="eyebrow" style={{ marginBottom: 6 }}>Definition</div>
              <p style={{ fontSize: 14, color: 'var(--ink)', margin: '0 0 6px' }}>{mockWordLookup.definitionEn}</p>
              <p className="cjk" style={{ fontSize: 14, color: 'var(--ink-2)', margin: 0 }}>{mockWordLookup.definitionZh}</p>
            </div>

            <div style={{ marginBottom: 20 }}>
              <div className="eyebrow" style={{ marginBottom: 6 }}>Example</div>
              <p style={{ fontSize: 13, color: 'var(--ink)', fontStyle: 'italic', margin: '0 0 4px' }}>&quot;{mockWordLookup.example.en}&quot;</p>
              <p className="cjk" style={{ fontSize: 13, color: 'var(--ink-2)', margin: 0 }}>&quot;{mockWordLookup.example.zh}&quot;</p>
            </div>

            <button style={{
              width: '100%', height: 48, borderRadius: 99,
              background: 'var(--grad)', color: '#fff', fontWeight: 700, fontSize: 14,
              border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}>
              <Plus size={16} /> Add to Vocab
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function renderHighlighted(text: string, highlights: { word: string; kind: string }[], onTap: (w: string) => void) {
  if (!highlights.length) return text;
  const parts: React.ReactNode[] = [];
  let last = 0;
  const sorted = [...highlights].sort((a, b) => text.indexOf(a.word) - text.indexOf(b.word));
  for (const h of sorted) {
    const idx = text.indexOf(h.word, last);
    if (idx < 0) continue;
    if (idx > last) parts.push(text.slice(last, idx));
    parts.push(
      <span
        key={idx}
        onClick={() => onTap(h.word)}
        style={{
          color: h.kind === 'key' ? 'var(--accent-ink)' : 'var(--ink)',
          textDecoration: h.kind === 'key' ? 'underline' : 'underline dotted',
          textDecorationColor: 'var(--accent-ring)',
          cursor: 'pointer',
        }}
      >
        {h.word}
      </span>
    );
    last = idx + h.word.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}
