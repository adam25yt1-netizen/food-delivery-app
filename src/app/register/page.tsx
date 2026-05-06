'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '@/styles/AuthForm.module.css';

export default function RegisterPage() {
  const router = useRouter();
  const [data, setData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const registerUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        router.push('/login');
      } else {
        const text = await response.text();
        setError(text || 'Something went wrong');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authPage}>
      <div className={styles.authCard}>
        <h1 className={styles.title}>Create an Account</h1>
        <p className={styles.subtitle}>Join Crave to get the best food delivered.</p>

        <form onSubmit={registerUser}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>Full Name</label>
            <input 
              id="name"
              type="text" 
              className={styles.input}
              value={data.name} 
              onChange={e => setData({...data, name: e.target.value})} 
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>Email Address</label>
            <input 
              id="email"
              type="email" 
              className={styles.input}
              value={data.email} 
              onChange={e => setData({...data, email: e.target.value})} 
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>Password</label>
            <input 
              id="password"
              type="password" 
              className={styles.input}
              value={data.password} 
              onChange={e => setData({...data, password: e.target.value})} 
              required
              minLength={6}
            />
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" disabled={loading} className={`btn-primary ${styles.submitBtn}`}>
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <p className={styles.footerText}>
          Already have an account? <Link href="/login" className={styles.link}>Sign In</Link>
        </p>
      </div>
    </div>
  );
}
