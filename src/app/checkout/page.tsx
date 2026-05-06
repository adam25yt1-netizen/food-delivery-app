'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const router = useRouter();
  
  const [isProcessing, setIsProcessing] = useState(false);

  const deliveryFee = subtotal > 0 ? 4.99 : 0;
  const taxes = subtotal * 0.08;
  const total = subtotal + deliveryFee + taxes;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
      
      // Store the order details in local storage for the tracking page
      const orderData = {
        id: orderId,
        items,
        total,
        status: 'Preparing',
        createdAt: new Date().toISOString()
      };
      
      localStorage.setItem(`order-${orderId}`, JSON.stringify(orderData));
      
      clearCart();
      setIsProcessing(false);
      router.push(`/tracking/${orderId}`);
    }, 2000);
  };

  if (items.length === 0 && !isProcessing) {
    router.push('/cart');
    return null;
  }

  return (
    <div className={`container ${styles.checkoutPage}`}>
      <div className={styles.checkoutContainer}>
        
        <div className={styles.formSection}>
          <h1 className={styles.pageTitle}>Secure Checkout</h1>
          
          <form onSubmit={handleCheckout} className={styles.checkoutForm}>
            <div className={styles.formGroup}>
              <h3>Delivery Details</h3>
              <div className={styles.inputGrid}>
                <input required type="text" placeholder="First Name" className={styles.input} />
                <input required type="text" placeholder="Last Name" className={styles.input} />
              </div>
              <input required type="text" placeholder="Street Address" className={styles.input} />
              <input type="text" placeholder="Apt, Suite (optional)" className={styles.input} />
              <input required type="tel" placeholder="Phone Number" className={styles.input} />
              <textarea placeholder="Delivery Instructions (e.g. Leave at door)" className={styles.textarea}></textarea>
            </div>

            <div className={styles.formGroup}>
              <h3>Payment Method</h3>
              <div className={styles.paymentMethods}>
                <label className={styles.radioLabel}>
                  <input type="radio" name="payment" defaultChecked /> Credit / Debit Card
                </label>
                <label className={styles.radioLabel}>
                  <input type="radio" name="payment" /> PayPal
                </label>
              </div>
              <input required type="text" placeholder="Card Number" className={styles.input} />
              <div className={styles.inputGrid}>
                <input required type="text" placeholder="MM/YY" className={styles.input} />
                <input required type="text" placeholder="CVC" className={styles.input} />
              </div>
            </div>

            <button type="submit" className={`btn-primary ${styles.submitBtn}`} disabled={isProcessing}>
              {isProcessing ? 'Processing Payment...' : `Pay $${total.toFixed(2)}`}
            </button>
          </form>
        </div>

        <div className={styles.summarySection}>
          <div className={styles.orderSummary}>
            <h2>Order Summary</h2>
            
            <div className={styles.summaryItems}>
              {items.map(item => (
                <div key={item.cartItemId} className={styles.summaryItem}>
                  <span>{item.quantity}x {item.name}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className={styles.summaryTotals}>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
