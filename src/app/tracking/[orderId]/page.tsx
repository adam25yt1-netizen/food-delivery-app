'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export default function TrackingPage({ params }: { params: Promise<{ orderId: string }> }) {
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [orderId, setOrderId] = useState<string>('');

  useEffect(() => {
    const init = async () => {
      const { orderId } = await params;
      setOrderId(orderId);
      const savedOrder = localStorage.getItem(`order-${orderId}`);
      if (savedOrder) {
        setOrder(JSON.parse(savedOrder));
      }
      setLoading(false);
    };
    init();
  }, [params]);

  if (loading) {
    return <div className={styles.centerContainer}>Loading order details...</div>;
  }

  if (!order) {
    return (
      <div className={`container ${styles.centerContainer}`}>
        <h1>Order Not Found</h1>
        <p>We couldn't find an order with ID: {orderId}</p>
        <Link href="/" className="btn-primary" style={{ marginTop: '20px' }}>Return Home</Link>
      </div>
    );
  }

  // Simulate status progression for demonstration
  const statuses = ['Order Placed', 'Preparing', 'Out for Delivery', 'Delivered'];
  // Let's pretend the order is "Preparing"
  const currentStep = 1; 

  return (
    <div className={`container ${styles.trackingPage}`}>
      <div className={styles.header}>
        <div className={styles.successIcon}>✓</div>
        <h1 className={styles.title}>Order Confirmed!</h1>
        <p className={styles.subtitle}>Order #{order.id}</p>
      </div>

      <div className={styles.trackingContainer}>
        <div className={styles.statusBox}>
          <h2>Tracking Status</h2>
          
          <div className={styles.stepper}>
            {statuses.map((status, index) => {
              const isCompleted = index < currentStep;
              const isActive = index === currentStep;
              
              return (
                <div key={status} className={`${styles.step} ${isCompleted ? styles.completed : ''} ${isActive ? styles.active : ''}`}>
                  <div className={styles.stepCircle}>
                    {isCompleted ? '✓' : index + 1}
                  </div>
                  <div className={styles.stepLabel}>
                    <h4>{status}</h4>
                    {isActive && <p>Your food is currently being prepared.</p>}
                  </div>
                </div>
              );
            })}
          </div>

          <div className={styles.etaBox}>
            <p>Estimated Delivery Time</p>
            <h3>15 - 25 Minutes</h3>
          </div>
        </div>

        <div className={styles.orderDetails}>
          <h2>Order Details</h2>
          <div className={styles.itemsList}>
            {order.items.map((item: any) => (
              <div key={item.cartItemId} className={styles.itemRow}>
                <span>{item.quantity}x {item.name}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          
          <div className={styles.totalRow}>
            <span>Total Paid</span>
            <span className={styles.totalPrice}>${order.total.toFixed(2)}</span>
          </div>

          <Link href="/" className={styles.homeLink}>Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
