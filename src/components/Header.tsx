'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useSession, signOut } from 'next-auth/react';
import styles from './Header.module.css';

export default function Header() {
  const { totalItems } = useCart();
  const { data: session } = useSession();

  return (
    <header className={`${styles.header} glass-panel`}>
      <div className={`container ${styles.headerContainer}`}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>🍔</span>
          <span className={styles.logoText}>Crave</span>
        </Link>
        
        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>Home</Link>
          <Link href="/restaurants" className={styles.navLink}>Restaurants</Link>
          <Link href="/offers" className={styles.navLink}>Offers</Link>
        </nav>

        <div className={styles.actions}>
          <Link href="/cart" className={styles.cartBtn}>
            🛒 {totalItems > 0 && <span className={styles.cartCount}>{totalItems}</span>}
          </Link>
          
          {session ? (
            <div className={styles.userMenu}>
              <span className={styles.userName}>Hi, {session.user?.name?.split(' ')[0]}</span>
              <button className="btn-primary" onClick={() => signOut()} style={{ padding: '8px 16px', fontSize: '0.9rem' }}>Sign Out</button>
            </div>
          ) : (
            <Link href="/login" className="btn-primary">Sign In</Link>
          )}
        </div>
      </div>
    </header>
  );
}
