export default function HelpPage() {
  return (
    <div className="container" style={{ padding: '120px 20px', minHeight: '100vh', maxWidth: '800px' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '24px' }}>Help Center</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div className="glass-panel" style={{ padding: '24px', borderRadius: '12px' }}>
          <h3>Where is my order?</h3>
          <p style={{ color: 'var(--text-muted)' }}>You can track your order in real-time by clicking on the active order banner on your homepage, or by checking your email for the tracking link.</p>
        </div>
        <div className="glass-panel" style={{ padding: '24px', borderRadius: '12px' }}>
          <h3>How do I cancel my order?</h3>
          <p style={{ color: 'var(--text-muted)' }}>Orders can only be cancelled before the restaurant begins preparing the food. Please contact support immediately.</p>
        </div>
      </div>
    </div>
  );
}
