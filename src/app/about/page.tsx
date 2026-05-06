export default function AboutPage() {
  return (
    <div className="container" style={{ padding: '120px 20px', minHeight: '100vh', maxWidth: '800px' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '24px' }}>About Crave</h1>
      <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: '1.8' }}>
        At Crave, we believe that great food brings people together. Founded in 2024, our mission is to connect local communities with the incredible culinary talent in their area. We partner with the best independent restaurants to deliver delicious, high-quality meals straight to your door.
      </p>

      <h2 style={{ fontSize: '2rem', marginTop: '40px', marginBottom: '16px' }}>Team Members</h2>
      <ul style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: '1.8' }}>
        <li><strong>Manav</strong> - Roll No: 2511981148 | Contact Info: 9999999999</li>
        <li><strong>Harsh</strong> - Roll No: 2511981096 | Contact Info: 1111111111</li>
      </ul>

      <h2 style={{ fontSize: '2rem', marginTop: '40px', marginBottom: '16px' }}>Contact Us</h2>
      <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: '1.8' }}>
        Email us at: <a href="mailto:crave@gmail.com" style={{ color: 'var(--primary-color)' }}>crave@gmail.com</a>
      </p>
    </div>
  );
}
