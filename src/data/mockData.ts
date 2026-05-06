export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  popular?: boolean;
}

export interface Restaurant {
  id: string;
  name: string;
  rating: number;
  time: string;
  priceLevel: string;
  category: string;
  image: string;
  coverImage?: string;
  address: string;
  menu: MenuItem[];
}

export const restaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Luigi\'s Pizzeria',
    rating: 4.8,
    time: '15-25 min',
    priceLevel: '$$',
    category: 'Italian',
    image: '/images/restaurant_pizza.png',
    coverImage: '/images/restaurant_pizza.png',
    address: '123 Main St, Springfield',
    menu: [
      { id: 'm1', name: 'Margherita Pizza', description: 'Fresh tomatoes, mozzarella, basil, and olive oil', price: 14.99, category: 'Pizza', popular: true },
      { id: 'm2', name: 'Pepperoni Pizza', description: 'Classic mozzarella and pepperoni', price: 16.99, category: 'Pizza' },
      { id: 'm3', name: 'Garlic Knots', description: 'Baked dough tied in a knot, topped with garlic and butter', price: 5.99, category: 'Sides' },
      { id: 'm4', name: 'Tiramisu', description: 'Coffee-flavored Italian dessert', price: 7.99, category: 'Dessert' }
    ]
  },
  {
    id: '2',
    name: 'Burger Joint',
    rating: 4.5,
    time: '20-30 min',
    priceLevel: '$',
    category: 'American',
    image: '/images/restaurant_burger.png',
    coverImage: '/images/restaurant_burger.png',
    address: '456 Oak St, Springfield',
    menu: [
      { id: 'm5', name: 'Classic Cheeseburger', description: 'Beef patty, american cheese, lettuce, tomato, special sauce', price: 10.99, category: 'Burgers', popular: true },
      { id: 'm6', name: 'Double Bacon Burger', description: 'Two beef patties, crispy bacon, cheddar, BBQ sauce', price: 14.99, category: 'Burgers' },
      { id: 'm7', name: 'French Fries', description: 'Crispy golden fries', price: 3.99, category: 'Sides' },
      { id: 'm8', name: 'Vanilla Milkshake', description: 'Thick and creamy vanilla shake', price: 5.99, category: 'Drinks' }
    ]
  },
  {
    id: '3',
    name: 'Sushi Zen',
    rating: 4.9,
    time: '30-45 min',
    priceLevel: '$$$',
    category: 'Japanese',
    image: '/images/restaurant_sushi.png',
    coverImage: '/images/restaurant_sushi.png',
    address: '789 Pine St, Springfield',
    menu: [
      { id: 'm9', name: 'Spicy Tuna Roll', description: 'Fresh tuna mixed with spicy mayo, wrapped in rice and seaweed', price: 12.99, category: 'Rolls', popular: true },
      { id: 'm10', name: 'Dragon Roll', description: 'Eel, cucumber, topped with sliced avocado and eel sauce', price: 15.99, category: 'Rolls' },
      { id: 'm11', name: 'Miso Soup', description: 'Traditional Japanese soup with tofu and seaweed', price: 4.99, category: 'Starters' },
      { id: 'm12', name: 'Nigiri Platter', description: 'Assortment of fresh fish on pressed vinegar rice', price: 24.99, category: 'Nigiri' }
    ]
  },
  {
    id: '4',
    name: 'Green Bowl',
    rating: 4.6,
    time: '15-20 min',
    priceLevel: '$$',
    category: 'Healthy',
    image: '/images/hero_food_bowl.png',
    coverImage: '/images/hero_food_bowl.png',
    address: '101 Maple St, Springfield',
    menu: [
      { id: 'm13', name: 'Salmon Poke Bowl', description: 'Fresh raw salmon, avocado, edamame, seaweed salad over rice', price: 16.99, category: 'Bowls', popular: true },
      { id: 'm14', name: 'Tofu Buddha Bowl', description: 'Quinoa, roasted sweet potato, kale, chickpeas, tahini dressing', price: 14.99, category: 'Bowls' },
      { id: 'm15', name: 'Green Smoothie', description: 'Spinach, kale, banana, apple, ginger', price: 7.99, category: 'Drinks' }
    ]
  }
];

export const getRestaurantById = (id: string) => {
  return restaurants.find(r => r.id === id);
};
