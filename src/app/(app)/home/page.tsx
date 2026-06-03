'use client';
import { mockDashboard } from '@/lib/mock-data';
import { DailyGoalRing } from '@/components/home/DailyGoalRing';
import { LessonCard } from '@/components/home/LessonCard';
import { TaskItem } from '@/components/home/TaskItem';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Flame, BookOpen, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const d = mockDashboard;

  return (
    <div style={{ padding: '16px 20px 20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <div className="eyebrow" style={{ marginBottom: 4 }}>
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--ink)', margin: 0 }}>
            {d.greeting.split(',')[0]},<br />
            <span className="grad-text">{d.greeting.split(',')[1]?.trim()}</span>
          </h1>
        </div>
        <ThemeToggle />
      </div>

      {/* Stats row */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
        gap: 12, marginBottom: 24,
      }}>
        {/* Goal ring */}
        <div className="lumo-card" style={{ padding: 14, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <DailyGoalRing done={d.dailyGoal.doneMin} target={d.dailyGoal.targetMin} size={60} />
          <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--ink-3)', textAlign: 'center' }}>Daily Goal</span>
        </div>
        {/* Streak */}
        <div className="lumo-card" style={{ padding: 14, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <Flame size={28} color="var(--warn)" />
          <span style={{ fontSize: 22, fontWeight: 800, color: 'var(--ink)' }}>{d.streakDays}</span>
          <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--ink-3)' }}>Day Streak</span>
        </div>
        {/* Words */}
        <div className="lumo-card" style={{ padding: 14, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <TrendingUp size={28} color="var(--good)" />
          <span style={{ fontSize: 22, fontWeight: 800, color: 'var(--ink)' }}>{d.stats.newWordsThisWeek}</span>
          <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--ink-3)', textAlign: 'center' }}>Words/Week</span>
        </div>
      </div>

      {/* Today's lesson */}
      <div className="eyebrow" style={{ marginBottom: 12 }}>Today&apos;s Lesson</div>
      <LessonCard lesson={d.todayLesson} lang="en" />

      {/* Tasks */}
      <div style={{ marginTop: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
          <div className="eyebrow">Today&apos;s Tasks</div>
          <span style={{ fontSize: 12, color: 'var(--accent-ink)', fontWeight: 600 }}>
            {d.tasks.filter(t => t.state === 'done').length}/{d.tasks.length} done
          </span>
        </div>
        <div className="lumo-card" style={{ padding: '0 16px' }}>
          {d.tasks.map(t => <TaskItem key={t.id} task={t} />)}
        </div>
      </div>

      {/* Words due */}
      {d.wordsDue.count > 0 && (
        <div style={{ marginTop: 16 }}>
          <Link href="/vocab" style={{ textDecoration: 'none' }}>
            <div className="lumo-card" style={{
              padding: 16, display: 'flex', alignItems: 'center', gap: 14,
              background: 'var(--surface-2)',
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 14, background: 'var(--accent-soft)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <BookOpen size={20} color="var(--accent-ink)" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)' }}>
                  {d.wordsDue.count} words due for review
                </div>
                <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>~{d.wordsDue.estMinutes} min · Spaced repetition</div>
              </div>
              <span style={{ fontSize: 18, color: 'var(--ink-3)' }}>›</span>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}
