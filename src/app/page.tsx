'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [location, setLocation] = useState('Seattle');
  const [loading, setLoading] = useState(true);

  const fetchRestaurants = async (searchLocation: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/restaurants?location=${encodeURIComponent(searchLocation)}`);
      const data = await res.json();
      if (data.restaurants) {
        setRestaurants(data.restaurants);
      }
    } catch (error) {
      console.error('Failed to fetch restaurants', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants('Seattle');
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.trim()) {
      fetchRestaurants(location);
    }
  };

  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroContainer}`}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Craving something <span className={styles.highlight}>delicious?</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Get the best food from local restaurants delivered fast to your door.
            </p>
            
            <form onSubmit={handleSearch} className={styles.searchBox}>
              <div className={styles.searchInputWrapper}>
                <span className={styles.searchIcon}>📍</span>
                <input 
                  type="text" 
                  placeholder="Enter your delivery city (e.g. Seattle, NY)" 
                  className={styles.searchInput}
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? 'Searching...' : 'Find Food'}
              </button>
            </form>
            
            <div className={styles.tags}>
              <span className={styles.tag} onClick={() => fetchRestaurants('Pizza')}>🍕 Pizza</span>
              <span className={styles.tag} onClick={() => fetchRestaurants('Sushi')}>🍣 Sushi</span>
              <span className={styles.tag} onClick={() => fetchRestaurants('Burger')}>🍔 Burgers</span>
              <span className={styles.tag} onClick={() => fetchRestaurants('Healthy')}>🥗 Healthy</span>
            </div>
          </div>
          
          <div className={styles.heroImageWrapper}>
            <div className={styles.heroImageContainer}>
              <Image 
                src="/images/hero_food_bowl.png" 
                alt="Delicious Poke Bowl" 
                fill 
                className={styles.heroImage} 
                priority
              />
              <div className={styles.floatingCard1}>🔥 Fast Delivery</div>
              <div className={styles.floatingCard2}>⭐ Top Rated</div>
            </div>
          </div>
        </div>
      </section>

      {/* Restaurants List Section */}
      <section className={`container ${styles.restaurantsSection}`}>
        <div className={styles.sectionHeader}>
          <h2>Popular Restaurants Near You</h2>
        </div>
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>Loading real local restaurants...</div>
        ) : restaurants.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>No restaurants found in this area. Try another city.</div>
        ) : (
          <div className={styles.restaurantGrid}>
            {restaurants.map((restaurant) => (
              <Link href={`/restaurant/${restaurant.id}`} key={restaurant.id} className={styles.restaurantCard}>
                <div className={styles.cardImageContainer}>
                  <Image 
                    src={restaurant.image} 
                    alt={restaurant.name} 
                    fill 
                    className={styles.cardImageReal} 
                  />
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{restaurant.name}</h3>
                  <p className={styles.cardInfo}>⭐ {restaurant.rating} • {restaurant.time} • {restaurant.priceLevel}</p>
                  <div className={styles.cardTags}>
                    <span>{restaurant.category}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
