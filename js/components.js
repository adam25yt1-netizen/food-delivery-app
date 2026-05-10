// ── components.js ── Header + Footer rendered entirely via JavaScript DOM

function renderHeader() {
  const header = document.getElementById('site-header');
  header.className = 'header glass-panel';

  // Build the inner container using DOM methods
  const container = document.createElement('div');
  container.className = 'container headerContainer';

  // ── Logo (created via DOM) ──
  const logo = document.createElement('a');
  logo.href = 'index.html';
  logo.className = 'logo';
  const logoIcon = document.createElement('span');
  logoIcon.className = 'logoIcon';
  logoIcon.textContent = '🍔';
  const logoText = document.createElement('span');
  logoText.className = 'logoText';
  logoText.textContent = 'Crave';
  logo.appendChild(logoIcon);
  logo.appendChild(logoText);

  // ── Nav links (built from an array using map + DOM) ──
  const navLinks = [
    { text: 'Home', href: 'index.html' },
    { text: 'Restaurants', href: 'index.html' },
    { text: 'Offers', href: 'offers.html' },
  ];
  const nav = document.createElement('nav');
  nav.className = 'nav';
  navLinks.forEach(link => {
    const a = document.createElement('a');
    a.href = link.href;
    a.className = 'navLink';
    a.textContent = link.text;
    nav.appendChild(a);
  });

  // ── Actions: cart + auth ──
  const actions = document.createElement('div');
  actions.className = 'actions';

  // Cart button with live count
  const cartBtn = document.createElement('a');
  cartBtn.href = 'cart.html';
  cartBtn.className = 'cartBtn';
  cartBtn.innerHTML = '🛒';
  const count = getTotalItems();
  if (count > 0) {
    const badge = document.createElement('span');
    badge.className = 'cartCount';
    badge.id = 'header-cart-count';
    badge.textContent = count;
    cartBtn.appendChild(badge);
  } else {
    cartBtn.insertAdjacentHTML('beforeend', '<span class="cartCount" id="header-cart-count" style="display:none">0</span>');
  }

  // Auth section — read user from localStorage
  const user = loadFromStorage('crave-user');
  const authDiv = document.createElement('div');
  if (user) {
    authDiv.className = 'userMenu';
    const greeting = document.createElement('span');
    greeting.className = 'userName';
    greeting.textContent = 'Hi, ' + user.name.split(' ')[0];
    const signOutBtn = document.createElement('button');
    signOutBtn.className = 'btn-primary';
    signOutBtn.textContent = 'Sign Out';
    signOutBtn.style.cssText = 'padding:8px 16px;font-size:0.9rem;';
    signOutBtn.addEventListener('click', () => {
      localStorage.removeItem('crave-user');
      window.location.reload();
    });
    authDiv.appendChild(greeting);
    authDiv.appendChild(signOutBtn);
  } else {
    const signInBtn = document.createElement('a');
    signInBtn.href = 'login.html';
    signInBtn.className = 'btn-primary';
    signInBtn.textContent = 'Sign In';
    authDiv.appendChild(signInBtn);
  }

  actions.appendChild(cartBtn);
  actions.appendChild(authDiv);
  container.appendChild(logo);
  container.appendChild(nav);
  container.appendChild(actions);
  header.appendChild(container);

  // Update cart count live when cart changes
  onCartChange(items => {
    const total = items.reduce((t, i) => t + i.quantity, 0);
    const badge = document.getElementById('header-cart-count');
    if (badge) { badge.textContent = total; badge.style.display = total > 0 ? 'flex' : 'none'; }
  });
}

function renderFooter() {
  const footer = document.getElementById('site-footer');
  footer.className = 'footer';

  // Company links — defined as data, rendered by JS
  const companyLinks = [
    { text: 'About Us', href: 'about.html' },
    { text: 'Careers', href: 'careers.html' },
    { text: 'Blog', href: 'blog.html' },
  ];
  const supportLinks = [
    { text: 'Help Center', href: 'help.html' },
    { text: 'Terms of Service', href: 'terms.html' },
    { text: 'Privacy Policy', href: 'privacy.html' },
  ];

  // Build footer using innerHTML template literal for the complex grid
  const topSection = document.createElement('div');
  topSection.className = 'container';

  const grid = document.createElement('div');
  grid.className = 'footerContainer';

  // Brand column
  const brand = document.createElement('div');
  brand.innerHTML = `<div class="logo"><span class="logoIcon">🍔</span><span class="logoText">Crave</span></div>`;
  const tagline = document.createElement('p');
  tagline.className = 'tagline';
  tagline.textContent = 'Delivering happiness to your doorstep, one meal at a time.';
  brand.appendChild(tagline);

  // Link columns — built from arrays
  function makeLinksColumn(title, links) {
    const col = document.createElement('div');
    const h4 = document.createElement('h4');
    h4.className = 'footerTitle';
    h4.textContent = title;
    col.appendChild(h4);
    const group = document.createElement('div');
    group.className = 'footerLinksGroup';
    links.forEach(link => {
      const a = document.createElement('a');
      a.href = link.href;
      a.className = 'footerLink';
      a.textContent = link.text;
      group.appendChild(a);
    });
    col.appendChild(group);
    return col;
  }

  grid.appendChild(brand);
  grid.appendChild(makeLinksColumn('Company', companyLinks));
  grid.appendChild(makeLinksColumn('Support', supportLinks));
  topSection.appendChild(grid);

  // Footer bottom bar
  const bottom = document.createElement('div');
  bottom.className = 'footerBottom';
  const year = new Date().getFullYear();
  bottom.textContent = `© ${year} Crave Food Delivery. All rights reserved.`;

  footer.appendChild(topSection);
  footer.appendChild(bottom);
}

// Auto-run on every page
document.addEventListener('DOMContentLoaded', () => {
  renderHeader();
  renderFooter();
});
