'use client';
import { mockProfile, mockUser } from '@/lib/mock-data';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Flame, TrendingUp, Clock, Target, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const p = mockProfile;

  return (
    <div style={{ padding: '16px 20px 20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <div className="eyebrow" style={{ marginBottom: 4 }}>Memory Profile</div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--ink)', margin: 0 }}>Learning DNA</h1>
        </div>
        <ThemeToggle />
      </div>

      {/* User card */}
      <div className="lumo-card" style={{ padding: 20, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{
          width: 56, height: 56, borderRadius: '50%', flexShrink: 0,
          background: 'var(--grad)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 22, fontWeight: 800, color: '#fff',
        }}>
          {mockUser.name[0]}
        </div>
        <div>
          <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--ink)' }}>{mockUser.name}</div>
          <div style={{ fontSize: 13, color: 'var(--ink-3)' }}>Level {mockUser.level} · {mockUser.streakDays} day streak 🔥</div>
        </div>
        <span className="lumo-chip lumo-chip--accent" style={{ marginLeft: 'auto' }}>{mockUser.level}</span>
      </div>

      {/* Stats */}
      <div className="eyebrow" style={{ marginBottom: 12 }}>Performance</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
        {[
          { icon: Flame,      label: 'Day Streak',    val: `${p.stats.streakDays} days`,      color: 'var(--warn)' },
          { icon: TrendingUp, label: 'Accuracy',      val: `${p.stats.accuracyPct}%`,         color: 'var(--good)' },
          { icon: Clock,      label: 'Mastery Speed', val: `${p.stats.masterySpeedDays} days`, color: 'var(--accent)' },
          { icon: Target,     label: 'Completion',    val: `${p.stats.completionPct}%`,        color: 'var(--accent-2)' },
        ].map(({ icon: Icon, label, val, color }) => (
          <div key={label} className="lumo-card" style={{ padding: 16 }}>
            <Icon size={22} color={color} style={{ marginBottom: 8 }} />
            <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--ink)' }}>{val}</div>
            <div style={{ fontSize: 11, color: 'var(--ink-3)', fontWeight: 600 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Topic preferences */}
      <div className="eyebrow" style={{ marginBottom: 12 }}>Topic Preferences</div>
      <div className="lumo-card" style={{ padding: '8px 16px', marginBottom: 20 }}>
        {p.topics.map(t => (
          <div key={t.key} style={{ padding: '12px 0', borderBottom: '1px solid var(--line)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>{t.label.en}</span>
              <span style={{ fontSize: 13, color: 'var(--ink-3)' }}>{Math.round(t.weight * 100)}%</span>
            </div>
            <div style={{ height: 6, borderRadius: 99, background: 'var(--line-2)' }}>
              <div style={{
                height: '100%', width: `${t.weight * 100}%`, borderRadius: 99,
                background: 'var(--grad)', transition: 'width .6s ease',
              }} />
            </div>
          </div>
        ))}
      </div>

      {/* Prediction */}
      <div className="lumo-card" style={{
        padding: 20, background: 'var(--grad-soft)', border: '1px solid var(--accent-ring)',
        marginBottom: 20,
      }}>
        <div className="eyebrow" style={{ marginBottom: 8 }}>AI Prediction · Next Interest</div>
        <div style={{ fontSize: 18, fontWeight: 800 }} className="grad-text">
          {p.recommendation.label.en}
        </div>
        <div style={{ fontSize: 13, color: 'var(--ink-3)', marginTop: 4 }}>{p.recommendation.reason}</div>
      </div>

      {/* Settings link */}
      <Link href="/settings" style={{ textDecoration: 'none' }}>
        <div className="lumo-card" style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)' }}>Settings</span>
          <ChevronRight size={18} color="var(--ink-3)" />
        </div>
      </Link>
    </div>
  );
}
