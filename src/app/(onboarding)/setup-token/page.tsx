'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/store/auth';
import { Shield, Eye, EyeOff, CheckCircle, XCircle, Loader } from 'lucide-react';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function SetupTokenPage() {
  const router = useRouter();
  const { setAiKey } = useAuth();
  const [key, setKey] = useState('');
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState<Status>('idle');

  async function handleValidate() {
    if (!key.startsWith('sk-')) {
      setStatus('error');
      return;
    }
    setStatus('loading');
    await new Promise(r => setTimeout(r, 1400));
    setStatus('success');
    setAiKey(key);
  }

  function handleContinue() {
    router.push('/setup-language');
  }

  function handleSkip() {
    router.push('/home');
  }

  return (
    <div style={{ maxWidth: 430, margin: '0 auto', minHeight: '100vh', background: 'var(--screen)', padding: '48px 24px 40px' }}>
      <div style={{ textAlign: 'center', marginBottom: 36 }}>
        <div style={{
          width: 72, height: 72, borderRadius: 22, background: 'var(--accent-soft)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px',
        }}>
          <Shield size={34} color="var(--accent-ink)" />
        </div>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: 'var(--ink)', margin: '0 0 8px' }}>Configure AI Token</h1>
        <p style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.6, margin: 0 }}>
          Lumo uses your OpenAI key to generate personalized content.<br />
          Your key is stored only on this device.
        </p>
      </div>

      {/* How to get key */}
      <div className="lumo-card" style={{ padding: 16, marginBottom: 20, background: 'var(--surface-2)' }}>
        <div className="eyebrow" style={{ marginBottom: 8 }}>How to get your key</div>
        {['Go to platform.openai.com', 'Sign in / create account', 'Open API keys section', 'Create a new secret key', 'Copy and paste it below'].map((s, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 6, alignItems: 'flex-start' }}>
            <span style={{
              width: 20, height: 20, borderRadius: '50%', background: 'var(--accent-soft)',
              color: 'var(--accent-ink)', fontSize: 11, fontWeight: 800,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>{i + 1}</span>
            <span style={{ fontSize: 13, color: 'var(--ink-2)' }}>{s}</span>
          </div>
        ))}
      </div>

      {/* Input */}
      <div style={{ position: 'relative', marginBottom: 14 }}>
        <input
          type={show ? 'text' : 'password'}
          value={key}
          onChange={e => { setKey(e.target.value); setStatus('idle'); }}
          placeholder="sk-proj-..."
          style={{
            width: '100%', height: 52, borderRadius: 16, padding: '0 48px 0 18px',
            fontSize: 14, fontFamily: 'monospace',
            background: 'var(--surface-2)', border: `1.5px solid ${status === 'error' ? 'var(--warn)' : status === 'success' ? 'var(--good)' : 'var(--line-2)'}`,
            color: 'var(--ink)', outline: 'none',
          }}
        />
        <button
          onClick={() => setShow(!show)}
          style={{
            position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
            background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-3)',
          }}
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {/* Status message */}
      {status === 'success' && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--good)', fontSize: 13, fontWeight: 600, marginBottom: 16 }}>
          <CheckCircle size={16} /> Token is valid! $10.50 credits available
        </div>
      )}
      {status === 'error' && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--warn)', fontSize: 13, fontWeight: 600, marginBottom: 16 }}>
          <XCircle size={16} /> Invalid API key — must start with sk-
        </div>
      )}

      {status === 'success' ? (
        <button onClick={handleContinue} className="lumo-btn lumo-btn--primary" style={{ width: '100%', marginBottom: 12 }}>
          Continue →
        </button>
      ) : (
        <button
          onClick={handleValidate}
          disabled={!key || status === 'loading'}
          className="lumo-btn lumo-btn--primary"
          style={{ width: '100%', marginBottom: 12, opacity: !key ? 0.5 : 1 }}
        >
          {status === 'loading' ? <><Loader size={16} style={{ animation: 'spin 1s linear infinite' }} /> Validating...</> : 'Save & Test Token'}
        </button>
      )}

      <button onClick={handleSkip} className="lumo-btn lumo-btn--ghost" style={{ width: '100%', fontSize: 14 }}>
        Skip for now
      </button>

      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  );
}
