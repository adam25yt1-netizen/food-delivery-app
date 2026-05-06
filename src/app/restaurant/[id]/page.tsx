'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';
import MenuSection from './MenuSection';

export default function RestaurantPage({ params }: { params: Promise<{ id: string }> }) {
  const [restaurant, setRestaurant] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const { id } = await params;
        const res = await fetch(`/api/restaurants/${id}`);
        const data = await res.json();
        if (data.restaurant) {
          setRestaurant(data.restaurant);
        }
      } catch (error) {
        console.error('Failed to fetch restaurant', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurant();
  }, [params]);

  if (loading) {
    return <div className="container" style={{ padding: '120px 20px', textAlign: 'center' }}>Loading restaurant details...</div>;
  }

  if (!restaurant) {
    return (
      <div className="container" style={{ padding: '120px 20px', textAlign: 'center' }}>
        <h1>Restaurant not found</h1>
        <Link href="/" className="btn-primary" style={{ marginTop: '20px' }}>Back to Home</Link>
      </div>
    );
  }

  // Group menu by category
  const categories = Array.from(new Set(restaurant.menu.map((item: any) => item.category))) as string[];

  return (
    <div className={styles.restaurantPage}>
      {/* Cover Image */}
      <div className={styles.coverImageContainer}>
        <Image 
          src={restaurant.coverImage || restaurant.image} 
          alt={restaurant.name}
          fill
          className={styles.coverImage}
          priority
        />
        <div className={styles.coverOverlay}></div>
      </div>

      <div className="container">
        {/* Restaurant Header Info */}
        <div className={styles.headerInfo}>
          <div className={styles.headerContent}>
            <h1 className={styles.restaurantName}>{restaurant.name}</h1>
            <p className={styles.restaurantMeta}>
              ⭐ {restaurant.rating} • {restaurant.category} • {restaurant.priceLevel}
            </p>
            <p className={styles.restaurantDetails}>
              <span>📍 {restaurant.address}</span>
              <span>🕒 {restaurant.time}</span>
            </p>
          </div>
        </div>

        {/* Menu Section */}
        <div className={styles.menuContainer}>
          <div className={styles.categoriesSidebar}>
            <h3>Categories</h3>
            <ul className={styles.categoryList}>
              {categories.map(category => (
                <li key={category}>
                  <a href={`#category-${category}`}>{category}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.menuContent}>
            <MenuSection restaurant={restaurant} categories={categories} />
          </div>
        </div>
      </div>
    </div>
  );
}
