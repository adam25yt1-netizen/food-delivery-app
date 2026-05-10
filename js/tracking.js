// ── tracking.js ── Order tracking page — all content via JavaScript DOM

function initTrackingPage() {
  const main    = document.getElementById('main-content');
  const orderId = getParam('orderId');
  const order   = orderId ? loadFromStorage('crave-order-' + orderId) : null;

  const page = document.createElement('div');
  page.className = 'trackingPage container';

  // ── Success Header ──
  const header = document.createElement('div');
  header.className = 'trackingHeader';

  const icon = document.createElement('div');
  icon.className = 'successIcon';
  icon.textContent = '✓';

  const titleEl = document.createElement('h1');
  titleEl.className = 'trackingTitle';
  titleEl.textContent = 'Order Confirmed!';

  const subtitle = document.createElement('p');
  subtitle.className = 'trackingSubtitle';
  subtitle.textContent = orderId ? `Order #${orderId}` : 'Your order is on its way!';

  header.appendChild(icon);
  header.appendChild(titleEl);
  header.appendChild(subtitle);
  page.appendChild(header);

  // ── Tracking Container ──
  const container = document.createElement('div');
  container.className = 'trackingContainer';

  // Status Stepper
  const statusBox = document.createElement('div');
  statusBox.className = 'statusBox';
  const statusTitle = document.createElement('h2');
  statusTitle.textContent = 'Order Status';
  statusBox.appendChild(statusTitle);

  const steps = [
    { label: 'Order Placed',        desc: 'We received your order',           state: 'completed' },
    { label: 'Preparing Your Food', desc: 'The restaurant is cooking',         state: 'active'    },
    { label: 'Out for Delivery',    desc: 'Your driver is on the way',        state: ''          },
    { label: 'Delivered',           desc: 'Enjoy your meal!',                 state: ''          },
  ];

  const stepper = document.createElement('div');
  stepper.className = 'stepper';

  steps.forEach((s, i) => {
    const step = document.createElement('div');
    step.className = 'step ' + s.state;

    const circle = document.createElement('div');
    circle.className = 'stepCircle';
    circle.textContent = s.state === 'completed' ? '✓' : (i + 1);

    const label = document.createElement('div');
    label.className = 'stepLabel';
    const h4 = document.createElement('h4');
    h4.textContent = s.label;
    const p = document.createElement('p');
    p.textContent = s.desc;
    label.appendChild(h4);
    label.appendChild(p);

    step.appendChild(circle);
    step.appendChild(label);
    stepper.appendChild(step);
  });

  const etaBox = document.createElement('div');
  etaBox.className = 'etaBox';
  etaBox.innerHTML = '<p>Estimated Arrival</p><h3>20-35 min</h3>';

  statusBox.appendChild(stepper);
  statusBox.appendChild(etaBox);

  // Order Details
  const detailsBox = document.createElement('div');
  detailsBox.className = 'orderDetails';
  const detailsTitle = document.createElement('h2');
  detailsTitle.textContent = 'Order Details';
  detailsBox.appendChild(detailsTitle);

  if (order && order.items) {
    const list = document.createElement('div');
    list.className = 'itemsList';
    order.items.forEach(item => {
      const row = document.createElement('div');
      row.className = 'itemRow';
      row.innerHTML = `<span>${item.name} ×${item.quantity}</span><span>${formatPrice(item.price * item.quantity)}</span>`;
      list.appendChild(row);
    });
    detailsBox.appendChild(list);

    const totalRow = document.createElement('div');
    totalRow.className = 'orderTotalRow';
    const totalLabel = document.createElement('span');
    totalLabel.textContent = 'Total';
    const totalPrice = document.createElement('span');
    totalPrice.className = 'totalPrice';
    totalPrice.textContent = formatPrice(order.total || 0);
    totalRow.appendChild(totalLabel);
    totalRow.appendChild(totalPrice);
    detailsBox.appendChild(totalRow);
  }

  const homeLink = document.createElement('a');
  homeLink.href = 'index.html';
  homeLink.className = 'homeLink';
  homeLink.textContent = '← Back to Home';
  detailsBox.appendChild(homeLink);

  container.appendChild(statusBox);
  container.appendChild(detailsBox);
  page.appendChild(container);
  main.appendChild(page);
}

document.addEventListener('DOMContentLoaded', initTrackingPage);
