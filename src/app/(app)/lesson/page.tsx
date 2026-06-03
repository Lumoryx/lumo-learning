'use client';
import { mockDashboard } from '@/lib/mock-data';
import { LessonCard } from '@/components/home/LessonCard';
import { Plus, Shuffle } from 'lucide-react';

const lessons = [
  mockDashboard.todayLesson,
  {
    ...mockDashboard.todayLesson,
    id: 'les_coffee',
    title: { en: 'Emirati Coffee Culture', zh: '阿联酋咖啡文化' },
    tags: ['B1', 'Culture'],
    progress: { tasksDone: 4, tasksTotal: 4 },
  },
  {
    ...mockDashboard.todayLesson,
    id: 'les_salary',
    title: { en: 'How to Negotiate Salary in Dubai', zh: '如何在迪拜谈薪资' },
    tags: ['B2', 'Career'],
    progress: { tasksDone: 0, tasksTotal: 4 },
  },
];

export default function LessonListPage() {
  return (
    <div style={{ padding: '16px 20px 20px' }}>
      <div style={{ marginBottom: 20 }}>
        <div className="eyebrow" style={{ marginBottom: 4 }}>Learning</div>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--ink)', margin: 0 }}>Your Lessons</h1>
      </div>

      {/* Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
        <button className="lumo-btn lumo-btn--primary" style={{ borderRadius: 16, height: 52 }}>
          <Plus size={18} /> Custom
        </button>
        <button className="lumo-btn lumo-btn--secondary" style={{ borderRadius: 16, height: 52 }}>
          <Shuffle size={18} /> Shuffle
        </button>
      </div>

      <div className="eyebrow" style={{ marginBottom: 12 }}>Recent</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {lessons.map(l => <LessonCard key={l.id} lesson={l} lang="en" />)}
      </div>
    </div>
  );
}
