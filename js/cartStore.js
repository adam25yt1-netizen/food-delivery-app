// ── cartStore.js ── Pure JavaScript cart using localStorage + CustomEvents

const CART_KEY   = 'food-delivery-cart';
const CART_EVENT = 'crave-cart-updated';

function _readCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY) || '[]'); }
  catch { return []; }
}

function _writeCart(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  // Broadcast a custom browser event so any listener can react
  window.dispatchEvent(new CustomEvent(CART_EVENT, { detail: items }));
}

function addToCart(item, restaurant, quantity = 1) {
  const items = _readCart();
  const idx = items.findIndex(i => i.id === item.id && i.restaurantId === restaurant.id);
  if (idx > -1) {
    items[idx].quantity += quantity;
  } else {
    items.push({ ...item, cartItemId: item.id + '-' + Date.now(), quantity, restaurantId: restaurant.id, restaurantName: restaurant.name });
  }
  _writeCart(items);
}

function removeFromCart(cartItemId) {
  _writeCart(_readCart().filter(i => i.cartItemId !== cartItemId));
}

function updateQuantity(cartItemId, quantity) {
  if (quantity <= 0) { removeFromCart(cartItemId); return; }
  _writeCart(_readCart().map(i => i.cartItemId === cartItemId ? { ...i, quantity } : i));
}

function clearCart() { _writeCart([]); }

function getItems()      { return _readCart(); }
function getTotalItems() { return _readCart().reduce((t, i) => t + i.quantity, 0); }
function getSubtotal()   { return _readCart().reduce((t, i) => t + i.price * i.quantity, 0); }

// Subscribe to cart changes — returns an unsubscribe function
function onCartChange(callback) {
  const handler = e => callback(e.detail);
  window.addEventListener(CART_EVENT, handler);
  return () => window.removeEventListener(CART_EVENT, handler);
}
