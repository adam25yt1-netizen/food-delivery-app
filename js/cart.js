// ── cart.js ── Cart page — all content via JavaScript DOM

function renderCartPage() {
  const main = document.getElementById('main-content');
  const page = document.createElement('div');
  page.className = 'cartPage container';

  const title = document.createElement('h1');
  title.className = 'pageTitle';
  title.textContent = 'Your Cart';
  page.appendChild(title);

  const items = getItems();

  if (!items.length) {
    const empty = document.createElement('div');
    empty.style.cssText = 'text-align:center;padding:80px 0;';
    empty.innerHTML = `<p style="font-size:4rem">🛒</p><h2 style="margin:16px 0 8px">Your cart is empty</h2><p style="color:var(--text-muted);margin-bottom:24px">Add some delicious food to get started.</p><a href="index.html" class="btn-primary">Browse Restaurants</a>`;
    page.appendChild(empty);
    main.appendChild(page);
    return;
  }

  const layout = document.createElement('div');
  layout.className = 'cartContainer';

  // ── Left: Cart Items ──
  const itemsCol = document.createElement('div');
  itemsCol.className = 'cartItems';
  itemsCol.id = 'cart-items-list';

  function renderItems() {
    const current = getItems();
    itemsCol.innerHTML = '';
    current.forEach(item => {
      const row = document.createElement('div');
      row.className = 'cartItem';

      const info = document.createElement('div');
      info.className = 'itemInfo';
      const nameEl = document.createElement('h3');
      nameEl.className = 'itemName';
      nameEl.textContent = item.name;
      const rest = document.createElement('p');
      rest.className = 'itemRestaurant';
      rest.textContent = 'from ' + item.restaurantName;
      const priceEl = document.createElement('p');
      priceEl.className = 'itemPrice';
      priceEl.textContent = formatPrice(item.price);
      info.appendChild(nameEl); info.appendChild(rest); info.appendChild(priceEl);

      const actions = document.createElement('div');
      actions.className = 'itemActions';

      // Quantity control
      const qtyCtrl = document.createElement('div');
      qtyCtrl.className = 'quantityControl';
      const minusBtn = document.createElement('button');
      minusBtn.textContent = '−';
      minusBtn.addEventListener('click', () => { updateQuantity(item.cartItemId, item.quantity - 1); renderItems(); updateSummary(); });
      const qtySpan = document.createElement('span');
      qtySpan.textContent = item.quantity;
      const plusBtn = document.createElement('button');
      plusBtn.textContent = '+';
      plusBtn.addEventListener('click', () => { updateQuantity(item.cartItemId, item.quantity + 1); renderItems(); updateSummary(); });
      qtyCtrl.appendChild(minusBtn); qtyCtrl.appendChild(qtySpan); qtyCtrl.appendChild(plusBtn);

      const removeBtn = document.createElement('button');
      removeBtn.className = 'removeBtn';
      removeBtn.textContent = 'Remove';
      removeBtn.addEventListener('click', () => { removeFromCart(item.cartItemId); renderItems(); updateSummary(); });

      actions.appendChild(qtyCtrl); actions.appendChild(removeBtn);
      row.appendChild(info); row.appendChild(actions);
      itemsCol.appendChild(row);
    });
  }

  renderItems();

  // ── Right: Order Summary ──
  const summary = document.createElement('div');
  summary.className = 'orderSummary';
  summary.innerHTML = '<h2>Order Summary</h2>';

  const deliveryFee = 2.99;
  const taxRate = 0.08;

  function updateSummary() {
    const sub   = getSubtotal();
    const taxes = sub * taxRate;
    const total = sub + deliveryFee + taxes;
    subtotalEl.textContent  = formatPrice(sub);
    deliveryEl.textContent  = formatPrice(deliveryFee);
    taxesEl.textContent     = formatPrice(taxes);
    totalEl.textContent     = formatPrice(total);
  }

  function makeRow(label, valueId) {
    const row = document.createElement('div');
    row.className = 'summaryRow';
    const lbl = document.createElement('span'); lbl.textContent = label;
    const val = document.createElement('span'); val.id = valueId;
    row.appendChild(lbl); row.appendChild(val);
    summary.appendChild(row);
    return val;
  }

  const subtotalEl = makeRow('Subtotal', 'sum-subtotal');
  const deliveryEl = makeRow('Delivery Fee', 'sum-delivery');
  const taxesEl    = makeRow('Taxes (8%)', 'sum-taxes');

  const totalDiv = document.createElement('div');
  totalDiv.className = 'totalRow';
  const totalLbl = document.createElement('span'); totalLbl.textContent = 'Total';
  const totalEl  = document.createElement('span');
  totalDiv.appendChild(totalLbl); totalDiv.appendChild(totalEl);
  summary.appendChild(totalDiv);

  updateSummary();

  const checkoutBtn = document.createElement('a');
  checkoutBtn.href = 'checkout.html';
  checkoutBtn.className = 'btn-primary checkoutBtn';
  checkoutBtn.textContent = 'Proceed to Checkout →';
  summary.appendChild(checkoutBtn);

  layout.appendChild(itemsCol);
  layout.appendChild(summary);
  page.appendChild(layout);
  main.appendChild(page);
}

document.addEventListener('DOMContentLoaded', renderCartPage);
