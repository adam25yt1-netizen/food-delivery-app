export default function PrivacyPage() {
  return (
    <div className="container" style={{ padding: '120px 20px', minHeight: '100vh', maxWidth: '800px' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '24px' }}>Privacy Policy</h1>
      <div style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
        <p>Last updated: October 2024</p>
        <h3 style={{ marginTop: '24px', color: 'var(--foreground)' }}>1. Information We Collect</h3>
        <p>We collect information you provide directly to us, such as your name, email address, delivery address, and payment information.</p>
        <h3 style={{ marginTop: '24px', color: 'var(--foreground)' }}>2. How We Use Your Information</h3>
        <p>We use the information we collect to deliver your food, process payments, and improve our services.</p>
      </div>
    </div>
  );
}
