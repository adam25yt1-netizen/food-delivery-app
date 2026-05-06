export default function OffersPage() {
  return (
    <div className="container" style={{ padding: '120px 20px', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '24px' }}>Special Offers</h1>
      <div style={{ display: 'grid', gap: '24px', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
        <div className="glass-panel" style={{ padding: '24px', borderRadius: '12px' }}>
          <h2>Free Delivery 🚚</h2>
          <p style={{ marginTop: '12px', color: 'var(--text-muted)' }}>Get free delivery on your first 3 orders with code: <strong>WELCOME3</strong></p>
        </div>
        <div className="glass-panel" style={{ padding: '24px', borderRadius: '12px' }}>
          <h2>20% Off Pizza 🍕</h2>
          <p style={{ marginTop: '12px', color: 'var(--text-muted)' }}>Celebrate Friday with 20% off all pizza orders over $25.</p>
        </div>
      </div>
    </div>
  );
}
