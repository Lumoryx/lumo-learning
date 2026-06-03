export default function Loading() {
  return (
    <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      {[1, 2, 3].map(i => (
        <div key={i} style={{
          height: i === 2 ? 180 : 80, borderRadius: 20,
          background: 'var(--surface-2)', animation: 'pulse 1.5s ease-in-out infinite',
        }} />
      ))}
      <style>{`@keyframes pulse { 0%,100%{opacity:.6} 50%{opacity:1} }`}</style>
    </div>
  );
}
