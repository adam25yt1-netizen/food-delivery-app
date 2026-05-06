import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContainer}`}>
        <div className={styles.footerBrand}>
          <Link href="/" className={styles.logo}>
            <span className={styles.logoIcon}>🍔</span>
            <span className={styles.logoText}>Crave</span>
          </Link>
          <p className={styles.tagline}>
            Delivering happiness to your doorstep, one meal at a time.
          </p>
        </div>
        
        <div className={styles.footerLinksGroup}>
          <h4 className={styles.footerTitle}>Company</h4>
          <Link href="/about" className={styles.footerLink}>About Us</Link>
          <Link href="/careers" className={styles.footerLink}>Careers</Link>
          <Link href="/blog" className={styles.footerLink}>Blog</Link>
        </div>

        <div className={styles.footerLinksGroup}>
          <h4 className={styles.footerTitle}>Support</h4>
          <Link href="/help" className={styles.footerLink}>Help Center</Link>
          <Link href="/terms" className={styles.footerLink}>Terms of Service</Link>
          <Link href="/privacy" className={styles.footerLink}>Privacy Policy</Link>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Crave Food Delivery. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
