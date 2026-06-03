'use client';
import { Book, Headphones, Star, Zap, Check } from 'lucide-react';
import type { Task } from '@/lib/api/types';

const icons = { read: Book, listen: Headphones, vocab: Star, quiz: Zap };

interface Props { task: Task; }

export function TaskItem({ task }: Props) {
  const Icon = icons[task.type];
  const done = task.state === 'done';
  const active = task.state === 'active';

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0',
      borderBottom: '1px solid var(--line)', opacity: done ? 0.5 : 1,
    }}>
      <div style={{
        width: 40, height: 40, borderRadius: 14, flexShrink: 0,
        background: done ? 'var(--good)' : active ? 'var(--accent-soft)' : 'var(--surface-2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: done ? '#fff' : active ? 'var(--accent-ink)' : 'var(--ink-3)',
      }}>
        {done ? <Check size={18} /> : <Icon size={18} />}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 2 }}>{task.title}</div>
        <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>{task.sub}</div>
      </div>
      {active && (
        <div style={{
          padding: '4px 12px', borderRadius: 99, fontSize: 11, fontWeight: 700,
          background: 'var(--accent-soft)', color: 'var(--accent-ink)',
        }}>Now</div>
      )}
    </div>
  );
}
