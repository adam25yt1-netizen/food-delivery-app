// ── home.js ── Home page — all content injected via JavaScript DOM

async function fetchRestaurants(searchLocation) {
  const grid = document.getElementById('restaurant-grid');
  const btn  = document.getElementById('search-btn');

  // Show loading state using DOM
  grid.innerHTML = '';
  const loader = document.createElement('div');
  loader.style.cssText = 'text-align:center;padding:40px;';
  loader.textContent = 'Loading real local restaurants...';
  grid.appendChild(loader);
  if (btn) { btn.textContent = 'Searching...'; btn.disabled = true; }

  try {
    // Step 1: Geocode city → lat/lon
    const geoRes  = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchLocation)}&format=json&limit=1`, { headers: { 'User-Agent': 'CraveFoodDeliveryApp/1.0' } });
    const geoData = await geoRes.json();

    if (!geoData.length) { grid.innerHTML = '<div style="text-align:center;padding:40px">No results for that location. Try another city.</div>'; return; }

    const { lat, lon } = geoData[0];

    // Step 2: Fetch restaurants from Overpass API
    const query = `[out:json];node(around:5000,${lat},${lon})["amenity"="restaurant"];out 15;`;
    const url   = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;
    const ovRes  = await fetch(url, { headers: { 'User-Agent': 'CraveFoodDeliveryApp/1.0' } });
    const ovData = await ovRes.json();

    const nodes = (ovData.elements || []).filter(n => n.tags && n.tags.name);
    if (!nodes.length) { grid.innerHTML = '<div style="text-align:center;padding:40px">No restaurants found nearby. Try another city.</div>'; return; }

    // Step 3: Build restaurant cards using DOM
    grid.innerHTML = '';
    nodes.forEach((node, index) => {
      const id      = node.id.toString();
      const cuisine = node.tags.cuisine || 'American';
      const name    = node.tags.name;
      const rating  = generateRating(id);
      const img     = cycleImage(index);

      // Create card element using DOM API
      const card = document.createElement('a');
      card.href = `restaurant.html?id=${id}&cuisine=${encodeURIComponent(cuisine)}&name=${encodeURIComponent(name)}`;
      card.className = 'restaurantCard';

      const imgContainer = document.createElement('div');
      imgContainer.className = 'cardImageContainer';
      const image = document.createElement('img');
      image.src = img;
      image.alt = name;
      image.loading = 'lazy';
      imgContainer.appendChild(image);

      const content = document.createElement('div');
      content.className = 'cardContent';

      const title = document.createElement('h3');
      title.className = 'cardTitle';
      title.textContent = name;

      const info = document.createElement('p');
      info.className = 'cardInfo';
      info.textContent = `⭐ ${rating} • 20-35 min • $$`;

      const tags = document.createElement('div');
      tags.className = 'cardTags';
      const tag = document.createElement('span');
      tag.textContent = capitalize(cuisine.split(';')[0]);
      tags.appendChild(tag);

      content.appendChild(title);
      content.appendChild(info);
      content.appendChild(tags);
      card.appendChild(imgContainer);
      card.appendChild(content);
      grid.appendChild(card);
    });

  } catch (err) {
    console.error('Fetch failed:', err);
    grid.innerHTML = '<div style="text-align:center;padding:40px;color:var(--error)">Failed to load restaurants. Check your internet connection.</div>';
  } finally {
    if (btn) { btn.textContent = 'Find Food'; btn.disabled = false; }
  }
}

function initHomePage() {
  const main = document.getElementById('main-content');

  // ── Hero Section ── built with DOM + innerHTML for complex HTML
  const homeDiv = document.createElement('div');
  homeDiv.className = 'home';

  const hero = document.createElement('section');
  hero.className = 'hero';
  hero.innerHTML = `
    <div class="container heroContainer">
      <div class="heroContent">
        <h1 class="heroTitle">Craving something <span class="highlight">delicious?</span></h1>
        <p class="heroSubtitle">Get the best food from local restaurants delivered fast to your door.</p>
        <form class="searchBox" id="search-form">
          <div class="searchInputWrapper">
            <span class="searchIcon">📍</span>
            <input type="text" id="location-input" class="searchInput" placeholder="Enter your delivery city (e.g. Seattle, NY)" value="Seattle" />
          </div>
          <button type="submit" class="btn-primary" id="search-btn">Find Food</button>
        </form>
        <div class="tags" id="quick-tags">
          <span class="tag" data-city="Pizza">🍕 Pizza</span>
          <span class="tag" data-city="Sushi">🍣 Sushi</span>
          <span class="tag" data-city="Burger">🍔 Burgers</span>
          <span class="tag" data-city="Healthy">🥗 Healthy</span>
        </div>
      </div>
      <div class="heroImageWrapper">
        <div class="heroImageContainer">
          <img src="images/hero_food_bowl.png" alt="Delicious food bowl" />
          <div class="floatingCard1">🔥 Fast Delivery</div>
          <div class="floatingCard2">⭐ Top Rated</div>
        </div>
      </div>
    </div>`;

  // ── Restaurants Section ── mixed DOM approach
  const section = document.createElement('section');
  section.className = 'restaurantsSection container';

  const sectionHeader = document.createElement('div');
  sectionHeader.className = 'sectionHeader';
  const h2 = document.createElement('h2');
  h2.textContent = 'Popular Restaurants Near You';
  sectionHeader.appendChild(h2);

  const grid = document.createElement('div');
  grid.id = 'restaurant-grid';

  section.appendChild(sectionHeader);
  section.appendChild(grid);
  homeDiv.appendChild(hero);
  homeDiv.appendChild(section);
  main.appendChild(homeDiv);

  // ── Event Listeners ──
  document.getElementById('search-form').addEventListener('submit', e => {
    e.preventDefault();
    const loc = document.getElementById('location-input').value.trim();
    if (loc) fetchRestaurants(loc);
  });

  document.getElementById('quick-tags').addEventListener('click', e => {
    if (e.target.dataset.city) fetchRestaurants(e.target.dataset.city);
  });

  // Initial load
  fetchRestaurants('Seattle');
}

document.addEventListener('DOMContentLoaded', initHomePage);
