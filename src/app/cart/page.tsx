'use client';

import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, subtotal, totalItems } = useCart();

  const deliveryFee = subtotal > 0 ? 4.99 : 0;
  const taxes = subtotal * 0.08;
  const total = subtotal + deliveryFee + taxes;

  if (items.length === 0) {
    return (
      <div className="container" style={{ padding: '120px 20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Your Cart is Empty</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Looks like you haven't added anything to your cart yet.</p>
        <Link href="/" className="btn-primary">Browse Restaurants</Link>
      </div>
    );
  }

  return (
    <div className={`container ${styles.cartPage}`}>
      <h1 className={styles.pageTitle}>Your Cart ({totalItems} items)</h1>

      <div className={styles.cartContainer}>
        <div className={styles.cartItems}>
          {items.map((item) => (
            <div key={item.cartItemId} className={styles.cartItem}>
              <div className={styles.itemInfo}>
                <h3 className={styles.itemName}>{item.name}</h3>
                <p className={styles.itemRestaurant}>from {item.restaurantName}</p>
                <p className={styles.itemPrice}>${item.price.toFixed(2)}</p>
              </div>

              <div className={styles.itemActions}>
                <div className={styles.quantityControl}>
                  <button onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}>+</button>
                </div>
                <button 
                  className={styles.removeBtn}
                  onClick={() => removeFromCart(item.cartItemId)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.orderSummary}>
          <h2>Order Summary</h2>
          <div className={styles.summaryRow}>
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Delivery Fee</span>
            <span>${deliveryFee.toFixed(2)}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Taxes (8%)</span>
            <span>${taxes.toFixed(2)}</span>
          </div>
          <div className={`${styles.summaryRow} ${styles.totalRow}`}>
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <Link href="/checkout" className={`btn-primary ${styles.checkoutBtn}`}>
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
