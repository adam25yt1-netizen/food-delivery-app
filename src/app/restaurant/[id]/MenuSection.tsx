'use client';

import { Restaurant } from '@/data/mockData';
import { useCart } from '@/context/CartContext';
import styles from './page.module.css';

export default function MenuSection({ restaurant, categories }: { restaurant: Restaurant, categories: string[] }) {
  const { addToCart } = useCart();

  return (
    <div>
      {categories.map(category => {
        const items = restaurant.menu.filter(item => item.category === category);
        return (
          <div key={category} id={`category-${category}`} className={styles.menuGroup}>
            <h2 className={styles.categoryTitle}>{category}</h2>
            <div className={styles.menuGrid}>
              {items.map(item => (
                <div key={item.id} className={styles.menuCard}>
                  <div className={styles.menuInfo}>
                    <h4 className={styles.menuName}>
                      {item.name}
                      {item.popular && <span className={styles.popularBadge}>Popular</span>}
                    </h4>
                    <p className={styles.menuDesc}>{item.description}</p>
                    <p className={styles.menuPrice}>${item.price.toFixed(2)}</p>
                  </div>
                  <button 
                    className={styles.addBtn}
                    onClick={() => addToCart(item, restaurant)}
                  >
                    + Add
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
