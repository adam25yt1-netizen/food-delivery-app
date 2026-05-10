// ── helpers.js ── Pure JavaScript utility functions (no framework)

function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

function formatPrice(price) {
  return '$' + Number(price).toFixed(2);
}

function saveToStorage(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); }
  catch(e) { console.error('Storage write failed:', e); }
}

function loadFromStorage(key, defaultValue = null) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  } catch(e) { return defaultValue; }
}

function generateRating(id) {
  const seed = parseInt(id) || 1;
  return Math.round((4.0 + (Math.sin(seed) * 0.5 + 0.5) * 0.9) * 10) / 10;
}

function cycleImage(index) {
  const images = [
    'images/restaurant_pizza.png',
    'images/restaurant_burger.png',
    'images/restaurant_sushi.png',
    'images/hero_food_bowl.png',
  ];
  return images[Math.abs(index) % images.length];
}

function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Get a URL query parameter by name
function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

// Navigate to a page
function goTo(path) {
  window.location.href = path;
}
