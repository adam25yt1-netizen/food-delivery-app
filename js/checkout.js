// ── checkout.js ── Checkout page — all content via JavaScript DOM

function initCheckoutPage() {
  const main  = document.getElementById('main-content');
  const items = getItems();

  if (!items.length) { goTo('cart.html'); return; }

  const page = document.createElement('div');
  page.className = 'checkoutPage';

  const title = document.createElement('h1');
  title.className = 'pageTitle container';
  title.textContent = 'Checkout';
  page.appendChild(title);

  const layout = document.createElement('div');
  layout.className = 'checkoutContainer container';

  // ── Left: Forms ──
  const formCol = document.createElement('div');

  // Helper to create a form section card
  function makeFormCard(heading) {
    const card = document.createElement('div');
    card.className = 'formGroup';
    const h3 = document.createElement('h3');
    h3.textContent = heading;
    card.appendChild(h3);
    return card;
  }

  // Delivery details
  const deliveryCard = makeFormCard('Delivery Details');
  deliveryCard.innerHTML += `
    <div class="inputGrid">
      <input class="input" id="first-name" type="text" placeholder="First Name" required />
      <input class="input" id="last-name"  type="text" placeholder="Last Name"  required />
    </div>
    <input class="input" id="address"   type="text"  placeholder="Street Address" required />
    <input class="input" id="city"      type="text"  placeholder="City"           required />
    <input class="input" id="phone"     type="tel"   placeholder="Phone Number"   required />
    <textarea class="textarea" id="notes" placeholder="Delivery notes (optional)"></textarea>`;

  // Payment
  const payCard = makeFormCard('Payment Method');
  payCard.innerHTML += `
    <div class="paymentMethods">
      <label class="radioLabel"><input type="radio" name="payment" value="card" checked /> 💳 Credit Card</label>
      <label class="radioLabel"><input type="radio" name="payment" value="cash" /> 💵 Cash on Delivery</label>
    </div>
    <div id="card-fields">
      <input class="input" id="card-number" type="text" placeholder="Card Number" maxlength="19" />
      <div class="inputGrid">
        <input class="input" id="card-expiry" type="text" placeholder="MM/YY" maxlength="5" />
        <input class="input" id="card-cvv"    type="text" placeholder="CVV"   maxlength="3" />
      </div>
    </div>`;

  // Show/hide card fields based on payment method
  payCard.querySelectorAll('input[name="payment"]').forEach(radio => {
    radio.addEventListener('change', () => {
      document.getElementById('card-fields').style.display = radio.value === 'card' ? 'block' : 'none';
    });
  });

  const errorEl = document.createElement('p');
  errorEl.className = 'authError';
  errorEl.style.display = 'none';

  const submitBtn = document.createElement('button');
  submitBtn.className = 'btn-primary submitBtn';
  submitBtn.textContent = 'Place Order →';
  submitBtn.addEventListener('click', () => {
    const firstName = document.getElementById('first-name').value.trim();
    const address   = document.getElementById('address').value.trim();
    if (!firstName || !address) {
      errorEl.textContent = 'Please fill in all required fields.';
      errorEl.style.display = 'block';
      return;
    }
    // Save order to localStorage and navigate to tracking
    const orderId = 'ORD-' + Date.now();
    const sub   = getSubtotal();
    const order = { orderId, items: getItems(), subtotal: sub, total: sub + 2.99 + sub * 0.08, address: `${firstName} ${document.getElementById('last-name').value}, ${address}`, date: new Date().toLocaleString() };
    saveToStorage('crave-order-' + orderId, order);
    clearCart();
    goTo(`tracking.html?orderId=${orderId}`);
  });

  formCol.appendChild(deliveryCard);
  formCol.appendChild(payCard);
  formCol.appendChild(errorEl);
  formCol.appendChild(submitBtn);

  // ── Right: Summary ──
  const summaryCol = document.createElement('div');
  summaryCol.className = 'orderSummary';
  const sumTitle = document.createElement('h2');
  sumTitle.textContent = 'Order Summary';
  summaryCol.appendChild(sumTitle);

  const itemsList = document.createElement('div');
  itemsList.className = 'summaryItems';
  items.forEach(item => {
    const row = document.createElement('div');
    row.className = 'summaryItem';
    row.innerHTML = `<span>${item.name} ×${item.quantity}</span><span>${formatPrice(item.price * item.quantity)}</span>`;
    itemsList.appendChild(row);
  });
  summaryCol.appendChild(itemsList);

  const sub = getSubtotal(), delivery = 2.99, taxes = sub * 0.08, total = sub + delivery + taxes;
  [['Subtotal', sub], ['Delivery Fee', delivery], ['Taxes (8%)', taxes]].forEach(([label, val]) => {
    const row = document.createElement('div');
    row.className = 'summaryRow';
    row.innerHTML = `<span>${label}</span><span>${formatPrice(val)}</span>`;
    summaryCol.appendChild(row);
  });
  const totalRow = document.createElement('div');
  totalRow.className = 'totalRow';
  totalRow.innerHTML = `<span>Total</span><span>${formatPrice(total)}</span>`;
  summaryCol.appendChild(totalRow);

  layout.appendChild(formCol);
  layout.appendChild(summaryCol);
  page.appendChild(layout);
  main.appendChild(page);
}

document.addEventListener('DOMContentLoaded', initCheckoutPage);
