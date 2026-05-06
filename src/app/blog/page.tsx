export default function BlogPage() {
  return (
    <div className="container" style={{ padding: '120px 20px', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '24px' }}>Crave Blog</h1>
      <div style={{ display: 'grid', gap: '24px', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
        <div className="glass-panel" style={{ padding: '24px', borderRadius: '12px' }}>
          <h3 style={{ marginBottom: '12px' }}>The Top 10 Sushi Spots</h3>
          <p style={{ color: 'var(--text-muted)' }}>Discover the freshest fish and most creative rolls in your city...</p>
        </div>
        <div className="glass-panel" style={{ padding: '24px', borderRadius: '12px' }}>
          <h3 style={{ marginBottom: '12px' }}>How We Deliver Faster</h3>
          <p style={{ color: 'var(--text-muted)' }}>A look into the technology that powers our 20-minute delivery guarantee...</p>
        </div>
      </div>
    </div>
  );
}
