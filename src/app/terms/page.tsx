export default function TermsPage() {
  return (
    <div className="container" style={{ padding: '120px 20px', minHeight: '100vh', maxWidth: '800px' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '24px' }}>Terms of Service</h1>
      <div style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
        <p>Last updated: October 2024</p>
        <h3 style={{ marginTop: '24px', color: 'var(--foreground)' }}>1. Acceptance of Terms</h3>
        <p>By accessing and using Crave, you agree to be bound by these Terms of Service.</p>
        <h3 style={{ marginTop: '24px', color: 'var(--foreground)' }}>2. User Accounts</h3>
        <p>You must maintain the security of your account and promptly notify us if you discover any security breaches.</p>
      </div>
    </div>
  );
}
