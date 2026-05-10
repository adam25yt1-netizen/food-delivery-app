// ── restaurant.js ── Restaurant detail page — all content via JavaScript DOM

async function initRestaurantPage() {
  const main = document.getElementById('main-content');
  const id      = getParam('id');
  const cuisine = getParam('cuisine') || 'American';
  const name    = getParam('name') || 'Restaurant';

  if (!id) { main.innerHTML = '<div class="container" style="padding:120px 20px;text-align:center"><h1>Restaurant not found</h1><a href="index.html" class="btn-primary" style="margin-top:20px">Back to Home</a></div>'; return; }

  // Show loading
  const loader = document.createElement('div');
  loader.className = 'container';
  loader.style.cssText = 'padding:120px 20px;text-align:center;';
  loader.textContent = 'Loading restaurant details...';
  main.appendChild(loader);

  try {
    // Fetch from Overpass directly in the browser
    const query  = `[out:json];node(${id});out;`;
    const url    = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;
    const res    = await fetch(url, { headers: { 'User-Agent': 'CraveFoodDeliveryApp/1.0' } });
    const data   = await res.json();

    main.innerHTML = '';

    const node     = data.elements && data.elements[0];
    const resName  = (node && node.tags && node.tags.name) || decodeURIComponent(name);
    const resCuisine = (node && node.tags && node.tags.cuisine) || decodeURIComponent(cuisine);
    const address  = (node && node.tags && node.tags['addr:street']) || 'Local Area';
    const seed     = parseInt(id) || 1;
    const rating   = generateRating(id);
    const img      = cycleImage(seed);

    // Generate menu using menuGenerator.js
    const menu       = generateMenu(id, resCuisine);
    const categories = [...new Set(menu.map(item => item.category))];

    // Store restaurant info for cart use
    const restaurant = { id, name: resName };

    // ── Cover Image ── created via DOM
    const page = document.createElement('div');
    page.className = 'restaurantPage';

    const coverContainer = document.createElement('div');
    coverContainer.className = 'coverImageContainer';
    const coverImg = document.createElement('img');
    coverImg.src = img; coverImg.alt = resName;
    const overlay = document.createElement('div');
    overlay.className = 'coverOverlay';
    coverContainer.appendChild(coverImg);
    coverContainer.appendChild(overlay);

    // ── Restaurant Info Header ──
    const infoContainer = document.createElement('div');
    infoContainer.className = 'container';

    const headerInfo = document.createElement('div');
    headerInfo.className = 'headerInfo';

    const resNameEl = document.createElement('h1');
    resNameEl.className = 'restaurantName';
    resNameEl.textContent = resName;

    const metaEl = document.createElement('p');
    metaEl.className = 'restaurantMeta';
    metaEl.textContent = `⭐ ${rating} • ${capitalize(resCuisine.split(';')[0])} • $$`;

    const detailsEl = document.createElement('p');
    detailsEl.className = 'restaurantDetails';
    detailsEl.innerHTML = `<span>📍 ${address}</span><span>🕒 20-35 min</span>`;

    headerInfo.appendChild(resNameEl);
    headerInfo.appendChild(metaEl);
    headerInfo.appendChild(detailsEl);

    // ── Menu Container ──
    const menuContainer = document.createElement('div');
    menuContainer.className = 'menuContainer';

    // Sidebar
    const sidebar = document.createElement('div');
    sidebar.className = 'categoriesSidebar';
    const sideH3 = document.createElement('h3');
    sideH3.textContent = 'Categories';
    const catList = document.createElement('ul');
    catList.className = 'categoryList';
    categories.forEach(cat => {
      const li = document.createElement('li');
      const a  = document.createElement('a');
      a.href = `#cat-${cat}`;
      a.textContent = cat;
      li.appendChild(a);
      catList.appendChild(li);
    });
    sidebar.appendChild(sideH3);
    sidebar.appendChild(catList);

    // Menu items
    const menuContent = document.createElement('div');
    categories.forEach(cat => {
      const group = document.createElement('div');
      group.className = 'menuGroup';
      group.id = `cat-${cat}`;

      const catTitle = document.createElement('h2');
      catTitle.className = 'categoryTitle';
      catTitle.textContent = cat;
      group.appendChild(catTitle);

      const menuGrid = document.createElement('div');
      menuGrid.className = 'menuGrid';

      menu.filter(item => item.category === cat).forEach(item => {
        const card = document.createElement('div');
        card.className = 'menuCard';

        const info = document.createElement('div');
        info.className = 'menuInfo';

        const nameEl = document.createElement('h3');
        nameEl.className = 'menuName';
        nameEl.textContent = item.name;
        if (item.popular) {
          const badge = document.createElement('span');
          badge.className = 'popularBadge';
          badge.textContent = 'Popular';
          nameEl.appendChild(badge);
        }

        const desc = document.createElement('p');
        desc.className = 'menuDesc';
        desc.textContent = item.description;

        const price = document.createElement('p');
        price.className = 'menuPrice';
        price.textContent = formatPrice(item.price);

        info.appendChild(nameEl);
        info.appendChild(desc);
        info.appendChild(price);

        const addBtn = document.createElement('button');
        addBtn.className = 'addBtn';
        addBtn.textContent = '+ Add';
        addBtn.addEventListener('click', () => {
          addToCart(item, restaurant);
          addBtn.textContent = '✓ Added';
          addBtn.style.background = 'var(--primary)';
          addBtn.style.color = 'white';
          setTimeout(() => { addBtn.textContent = '+ Add'; addBtn.style.background = ''; addBtn.style.color = ''; }, 1500);
        });

        card.appendChild(info);
        card.appendChild(addBtn);
        menuGrid.appendChild(card);
      });

      group.appendChild(menuGrid);
      menuContent.appendChild(group);
    });

    menuContainer.appendChild(sidebar);
    menuContainer.appendChild(menuContent);
    infoContainer.appendChild(headerInfo);
    infoContainer.appendChild(menuContainer);
    page.appendChild(coverContainer);
    page.appendChild(infoContainer);
    main.appendChild(page);

  } catch (err) {
    console.error(err);
    main.innerHTML = '<div class="container" style="padding:120px 20px;text-align:center"><h1>Failed to load restaurant</h1><a href="index.html" class="btn-primary" style="margin-top:20px">Back to Home</a></div>';
  }
}

document.addEventListener('DOMContentLoaded', initRestaurantPage);
