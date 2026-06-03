'use client';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/store/auth';
import { mockUser } from '@/lib/mock-data';
import { Sparkles, Globe, Brain } from 'lucide-react';

const features = [
  { icon: Globe,    title: 'Bilingual Learning',   desc: 'Switch between English-only, bilingual, and Chinese-first modes anytime' },
  { icon: Sparkles, title: 'AI-Powered Content',   desc: 'Bring your own OpenAI key — zero platform cost, full privacy' },
  { icon: Brain,    title: 'Smart Memory System',  desc: 'The app learns your preferences and gets smarter with every lesson' },
];

export default function WelcomePage() {
  const router = useRouter();
  const { setUser, setOnboarded } = useAuth();

  function handleStart() {
    setUser(mockUser, 'mock-token-abc123');
    setOnboarded();
    router.push('/home');
  }

  return (
    <div style={{
      maxWidth: 430, margin: '0 auto', minHeight: '100vh',
      background: 'var(--screen)', display: 'flex', flexDirection: 'column',
      padding: '0 24px 40px',
    }}>
      {/* Hero */}
      <div style={{ paddingTop: 80, paddingBottom: 40, textAlign: 'center' }}>
        <div style={{
          width: 88, height: 88, borderRadius: 28, background: 'var(--grad)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 24px', boxShadow: 'var(--glow)',
        }}>
          <span style={{ fontSize: 40 }}>✦</span>
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: 'var(--ink)', margin: '0 0 8px' }}>
          Lumo<span className="grad-text"> Learning</span>
        </h1>
        <p style={{ fontSize: 16, color: 'var(--ink-2)', margin: 0, lineHeight: 1.6 }}>
          AI-powered bilingual English learning.<br />Light up every moment.
        </p>
      </div>

      {/* Features */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 40 }}>
        {features.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="lumo-card" style={{ padding: '18px 20px', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            <div style={{
              width: 44, height: 44, borderRadius: 14, background: 'var(--accent-soft)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <Icon size={22} color="var(--accent-ink)" />
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', marginBottom: 4 }}>{title}</div>
              <div style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.5 }}>{desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <button
        onClick={handleStart}
        className="lumo-btn lumo-btn--primary"
        style={{ width: '100%', fontSize: 16 }}
      >
        Get Started →
      </button>
      <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--ink-3)', marginTop: 14 }}>
        Free forever · Your own AI key · Full privacy
      </p>
    </div>
  );
}
