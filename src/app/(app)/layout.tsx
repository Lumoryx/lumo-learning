import { TabBar } from '@/components/ui/TabBar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      maxWidth: 430, margin: '0 auto', minHeight: '100vh',
      display: 'flex', flexDirection: 'column',
      background: 'var(--screen)',
    }}>
      <main style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
        {children}
      </main>
      <TabBar />
    </div>
  );
}
