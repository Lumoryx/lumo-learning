'use client';
import Link from 'next/link';
import { Clock, Zap } from 'lucide-react';
import type { LessonCard as LessonCardType } from '@/lib/api/types';

interface Props { lesson: LessonCardType; lang: 'en' | 'zh'; }

export function LessonCard({ lesson, lang }: Props) {
  const title = lesson.title[lang];
  const done = lesson.progress?.tasksDone ?? 0;
  const total = lesson.progress?.tasksTotal ?? 4;
  const pct = (done / total) * 100;

  return (
    <Link href={`/lesson/${lesson.id}`} style={{ textDecoration: 'none' }}>
      <div style={{
        background: 'var(--grad-soft)', borderRadius: 24, padding: 20,
        border: '1px solid var(--accent-ring)', position: 'relative', overflow: 'hidden',
      }}>
        {/* Glow blob */}
        <div style={{
          position: 'absolute', top: -30, right: -30, width: 120, height: 120,
          borderRadius: '50%', background: 'var(--grad)', opacity: .12, filter: 'blur(40px)',
        }} />

        <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
          {lesson.tags.map(t => (
            <span key={t} style={{
              fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 99,
              background: 'var(--accent-soft)', color: 'var(--accent-ink)',
            }}>{t}</span>
          ))}
        </div>

        <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--ink)', lineHeight: 1.35, marginBottom: 12 }}>
          {title}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--ink-2)' }}>
            <Clock size={12} /> {lesson.durationMin} min
          </span>
          {lesson.aiGenerated && (
            <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--accent-ink)' }}>
              <Zap size={12} /> AI generated
            </span>
          )}
        </div>

        {/* Progress bar */}
        <div style={{ marginBottom: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: 12, color: 'var(--ink-3)' }}>{done}/{total} tasks done</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent-ink)' }}>{Math.round(pct)}%</span>
          </div>
          <div style={{ height: 6, borderRadius: 99, background: 'var(--line-2)', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${pct}%`, background: 'var(--grad)', borderRadius: 99, transition: 'width .6s ease' }} />
          </div>
        </div>

        <button style={{
          marginTop: 8, width: '100%', height: 44, borderRadius: 99,
          background: 'var(--grad)', color: '#fff', fontWeight: 700, fontSize: 14,
          border: 'none', cursor: 'pointer', boxShadow: 'var(--glow)',
        }}>
          {done > 0 ? 'Continue lesson →' : 'Start lesson →'}
        </button>
      </div>
    </Link>
  );
}
