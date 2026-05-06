import { NextResponse } from 'next/server';
import { generateMenu } from '@/utils/menuGenerator';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const location = searchParams.get('location') || 'Springfield';

  try {
    // 1. Get Lat/Lon from Nominatim
    const geocodeRes = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json&limit=1`, {
      headers: { 'User-Agent': 'CraveFoodDeliveryApp/1.0' }
    });
    const geocodeData = await geocodeRes.json();

    if (!geocodeData || geocodeData.length === 0) {
      return NextResponse.json({ error: 'Location not found' }, { status: 404 });
    }

    const { lat, lon } = geocodeData[0];

    // 2. Fetch restaurants from Overpass API (5km radius)
    const overpassQuery = `[out:json];node(around:5000,${lat},${lon})["amenity"="restaurant"];out 15;`;
    
    const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`;
    const overpassRes = await fetch(url, {
      headers: { 'User-Agent': 'CraveFoodDeliveryApp/1.0' }
    });
    
    const overpassData = await overpassRes.json();
    
    if (!overpassData.elements || overpassData.elements.length === 0) {
      return NextResponse.json({ restaurants: [] });
    }

    // 3. Map Overpass nodes to our Restaurant interface
    const images = [
      '/images/restaurant_pizza.png',
      '/images/restaurant_burger.png',
      '/images/restaurant_sushi.png',
      '/images/hero_food_bowl.png'
    ];

    const restaurants = overpassData.elements
      .filter((node: any) => node.tags && node.tags.name)
      .map((node: any, index: number) => {
        const id = node.id.toString();
        const cuisine = node.tags.cuisine || 'American';
        const image = images[index % images.length]; // cycle through our beautiful generated images
        
        // Deterministic rating between 4.0 and 4.9
        const seed = parseInt(id) || Date.now();
        const rating = 4.0 + (Math.sin(seed) * 0.5 + 0.5) * 0.9;
        
        return {
          id,
          name: node.tags.name,
          rating: Math.round(rating * 10) / 10,
          time: '20-35 min',
          priceLevel: node.tags.diet ? '$$$' : '$$',
          category: cuisine.charAt(0).toUpperCase() + cuisine.slice(1).split(';')[0], // Take first cuisine if multiple
          image,
          coverImage: image,
          address: `${node.tags['addr:street'] || 'Local Street'}, ${location}`,
          menu: generateMenu(id, cuisine)
        };
      });

    return NextResponse.json({ restaurants });
  } catch (error) {
    console.error('Error fetching real restaurants:', error);
    return NextResponse.json({ error: 'Failed to fetch restaurants' }, { status: 500 });
  }
}
