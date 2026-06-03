'use client';

interface Props { done: number; target: number; size?: number; }

export function DailyGoalRing({ done, target, size = 72 }: Props) {
  const pct = Math.min(done / target, 1);
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  const dash = circ * pct;

  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} className="progress-ring">
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--line-2)" strokeWidth={6} />
        <circle
          cx={size/2} cy={size/2} r={r} fill="none"
          stroke="url(#grad)" strokeWidth={6}
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#6E7BFF" />
            <stop offset="55%"  stopColor="#9B6BFF" />
            <stop offset="100%" stopColor="#C56BF0" />
          </linearGradient>
        </defs>
      </svg>
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--ink)' }}>{done}</span>
        <span style={{ fontSize: 9, fontWeight: 600, color: 'var(--ink-3)' }}>/{target}m</span>
      </div>
    </div>
  );
}
