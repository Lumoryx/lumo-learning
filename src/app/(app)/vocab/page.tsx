'use client';
import { useState } from 'react';
import { mockVocabList, mockReviewQueue } from '@/lib/mock-data';
import type { WordStatus } from '@/lib/api/types';
import { BookOpen, Check } from 'lucide-react';

const statusColor: Record<WordStatus, string> = {
  new: 'var(--accent)',
  reviewing: 'var(--warn)',
  mastered: 'var(--good)',
};
const statusLabel: Record<WordStatus, string> = {
  new: 'New',
  reviewing: 'Reviewing',
  mastered: 'Mastered',
};

export default function VocabPage() {
  const [filter, setFilter] = useState<WordStatus | 'all'>('all');
  const [reviewing, setReviewing] = useState(false);
  const [cardIdx, setCardIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const s = mockVocabList.summary;
  const items = filter === 'all' ? mockVocabList.items : mockVocabList.items.filter(v => v.status === filter);

  if (reviewing) {
    const card = mockReviewQueue.cards[cardIdx];
    if (!card) return (
      <div style={{ padding: 40, textAlign: 'center' }}>
        <Check size={48} color="var(--good)" style={{ marginBottom: 16 }} />
        <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--ink)' }}>All reviewed!</div>
        <button className="lumo-btn lumo-btn--primary" style={{ marginTop: 24 }} onClick={() => { setReviewing(false); setCardIdx(0); setFlipped(false); }}>Back to Vocab</button>
      </div>
    );

    return (
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--ink)' }}>Review Session</div>
          <span style={{ fontSize: 13, color: 'var(--ink-3)' }}>{cardIdx + 1}/{mockReviewQueue.cards.length}</span>
        </div>

        <div
          onClick={() => setFlipped(!flipped)}
          style={{
            minHeight: 220, borderRadius: 24, padding: 28, cursor: 'pointer',
            background: flipped ? 'var(--grad-soft)' : 'var(--surface)',
            border: '1px solid var(--accent-ring)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12,
            transition: 'background .3s',
          }}
        >
          {!flipped ? (
            <>
              <div className="eyebrow">What is the English word?</div>
              <div className="cjk" style={{ fontSize: 28, fontWeight: 800, color: 'var(--ink)' }}>{card.prompt}</div>
              <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>Tap to reveal</div>
            </>
          ) : (
            <>
              <div className="eyebrow">Answer</div>
              <div style={{ fontSize: 32, fontWeight: 800 }} className="grad-text">{card.word}</div>
            </>
          )}
        </div>

        {flipped && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {(['again', 'hard', 'good', 'easy'] as const).map(g => (
              <button
                key={g}
                onClick={() => { setFlipped(false); setCardIdx(i => i + 1); }}
                className="lumo-btn lumo-btn--secondary lumo-btn--sm"
                style={{ textTransform: 'capitalize', borderRadius: 14 }}
              >
                {g}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ padding: '16px 20px 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
        <div>
          <div className="eyebrow" style={{ marginBottom: 4 }}>Vocabulary</div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--ink)', margin: 0 }}>Word Bank</h1>
        </div>
      </div>

      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 16 }}>
        {[
          { label: 'Total', val: s.total },
          { label: 'New', val: s.new, color: 'var(--accent)' },
          { label: 'Review', val: s.reviewing, color: 'var(--warn)' },
          { label: 'Done', val: s.mastered, color: 'var(--good)' },
        ].map(({ label, val, color }) => (
          <div key={label} className="lumo-card" style={{ padding: '10px 8px', textAlign: 'center' }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: color ?? 'var(--ink)' }}>{val}</div>
            <div style={{ fontSize: 10, color: 'var(--ink-3)', fontWeight: 600 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Review button */}
      {s.dueCount > 0 && (
        <button
          onClick={() => setReviewing(true)}
          className="lumo-btn lumo-btn--primary"
          style={{ width: '100%', borderRadius: 16, marginBottom: 20 }}
        >
          <BookOpen size={18} /> Review {s.dueCount} words due · ~{mockReviewQueue.estMinutes} min
        </button>
      )}

      {/* Filter chips */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, overflowX: 'auto' }}>
        {(['all', 'new', 'reviewing', 'mastered'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`lumo-chip ${filter === f ? 'lumo-chip--accent' : ''}`}
            style={{ border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}
          >
            {f === 'all' ? 'All' : statusLabel[f]}
          </button>
        ))}
      </div>

      {/* Word list */}
      <div className="lumo-card" style={{ padding: '0 16px' }}>
        {items.map((v, i) => (
          <div key={v.id} style={{
            display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0',
            borderBottom: i < items.length - 1 ? '1px solid var(--line)' : 'none',
          }}>
            <div style={{
              width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
              background: statusColor[v.status],
            }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)' }}>{v.word}</div>
              <div className="cjk" style={{ fontSize: 13, color: 'var(--ink-3)' }}>{v.translation}</div>
            </div>
            <span style={{
              fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 99,
              background: v.status === 'mastered' ? 'rgba(43,182,115,.12)' : v.status === 'new' ? 'var(--accent-soft)' : 'rgba(224,151,63,.12)',
              color: statusColor[v.status],
            }}>
              {statusLabel[v.status]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
