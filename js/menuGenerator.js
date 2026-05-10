// ── menuGenerator.js ── Generates deterministic menus from restaurant ID + cuisine

function seededRandom(seed) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

const cuisineMenus = {
  Italian: [
    { name: 'Margherita Pizza', description: 'Fresh tomatoes, mozzarella, basil, and olive oil', price: 14.99, category: 'Pizza', popular: true },
    { name: 'Pepperoni Pizza', description: 'Classic mozzarella and pepperoni', price: 16.99, category: 'Pizza' },
    { name: 'Spaghetti Carbonara', description: 'Creamy egg sauce, pancetta, and black pepper', price: 18.99, category: 'Pasta', popular: true },
    { name: 'Fettuccine Alfredo', description: 'Rich parmesan cream sauce over fettuccine', price: 17.99, category: 'Pasta' },
    { name: 'Garlic Knots', description: 'Baked dough tied in a knot, topped with garlic and butter', price: 5.99, category: 'Sides' },
    { name: 'Tiramisu', description: 'Coffee-flavored Italian dessert', price: 7.99, category: 'Dessert' }
  ],
  American: [
    { name: 'Classic Cheeseburger', description: 'Beef patty, american cheese, lettuce, tomato, special sauce', price: 10.99, category: 'Burgers', popular: true },
    { name: 'Double Bacon Burger', description: 'Two beef patties, crispy bacon, cheddar, BBQ sauce', price: 14.99, category: 'Burgers' },
    { name: 'Chicken Sandwich', description: 'Crispy fried chicken breast, pickles, mayo', price: 11.99, category: 'Sandwiches' },
    { name: 'French Fries', description: 'Crispy golden fries', price: 3.99, category: 'Sides', popular: true },
    { name: 'Onion Rings', description: 'Thick cut, beer-battered onion rings', price: 4.99, category: 'Sides' },
    { name: 'Vanilla Milkshake', description: 'Thick and creamy vanilla shake', price: 5.99, category: 'Drinks' }
  ],
  Japanese: [
    { name: 'Spicy Tuna Roll', description: 'Fresh tuna mixed with spicy mayo, wrapped in rice and seaweed', price: 12.99, category: 'Rolls', popular: true },
    { name: 'Dragon Roll', description: 'Eel, cucumber, topped with sliced avocado and eel sauce', price: 15.99, category: 'Rolls' },
    { name: 'Salmon Nigiri', description: 'Fresh salmon over pressed vinegared rice (2pcs)', price: 6.99, category: 'Nigiri' },
    { name: 'Tonkotsu Ramen', description: 'Rich pork broth, chashu, soft boiled egg, scallions', price: 16.99, category: 'Ramen', popular: true },
    { name: 'Miso Soup', description: 'Traditional Japanese soup with tofu and seaweed', price: 4.99, category: 'Starters' },
    { name: 'Edamame', description: 'Steamed soybeans with sea salt', price: 5.99, category: 'Starters' }
  ],
  Mexican: [
    { name: 'Carne Asada Tacos', description: 'Grilled steak, onions, cilantro, salsa (3pcs)', price: 11.99, category: 'Tacos', popular: true },
    { name: 'Al Pastor Tacos', description: 'Marinated pork, pineapple, onions, cilantro (3pcs)', price: 10.99, category: 'Tacos' },
    { name: 'Chicken Burrito', description: 'Rice, beans, grilled chicken, cheese, pico de gallo', price: 12.99, category: 'Burritos', popular: true },
    { name: 'Nachos Supreme', description: 'Tortilla chips, queso, jalapeños, beans, guacamole', price: 14.99, category: 'Appetizers' },
    { name: 'Churros', description: 'Fried dough dusted with cinnamon sugar', price: 5.99, category: 'Dessert' }
  ],
  Default: [
    { name: 'House Salad', description: 'Mixed greens, cherry tomatoes, cucumbers, balsamic vinaigrette', price: 8.99, category: 'Starters' },
    { name: 'Soup of the Day', description: "Chef's daily special soup", price: 6.99, category: 'Starters' },
    { name: 'Grilled Chicken Plate', description: 'Grilled chicken breast with roasted vegetables', price: 15.99, category: 'Mains', popular: true },
    { name: 'Steak Frites', description: 'Grilled sirloin steak with crispy french fries', price: 22.99, category: 'Mains', popular: true },
    { name: 'Chocolate Cake', description: 'Rich and decadent chocolate layer cake', price: 7.99, category: 'Dessert' },
    { name: 'Soft Drink', description: 'Choice of cola, diet cola, or sprite', price: 2.99, category: 'Drinks' }
  ]
};

function generateMenu(restaurantId, cuisine = 'Default') {
  const seed = parseInt(restaurantId) || Date.now();
  let key = 'Default';
  const c = cuisine.toLowerCase();
  if (c.includes('pizza') || c.includes('italian')) key = 'Italian';
  else if (c.includes('burger') || c.includes('american')) key = 'American';
  else if (c.includes('sushi') || c.includes('japanese')) key = 'Japanese';
  else if (c.includes('mexican') || c.includes('taco')) key = 'Mexican';

  return (cuisineMenus[key] || cuisineMenus.Default).map((item, i) => {
    const variance = (seededRandom(seed + i) * 4) - 2;
    return { ...item, id: restaurantId + '-m' + i, price: Math.max(1.99, Math.round((item.price + variance) * 100) / 100) };
  });
}
