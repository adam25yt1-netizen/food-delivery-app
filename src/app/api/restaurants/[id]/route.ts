import { NextResponse } from 'next/server';
import { generateMenu } from '@/utils/menuGenerator';

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    
    // Fetch specific restaurant from Overpass API by node ID
    const overpassQuery = `[out:json];node(${id});out;`;
    
    const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`;
    const overpassRes = await fetch(url, {
      headers: { 'User-Agent': 'CraveFoodDeliveryApp/1.0' }
    });
    
    const overpassData = await overpassRes.json();
    
    if (!overpassData.elements || overpassData.elements.length === 0) {
      return NextResponse.json({ error: 'Restaurant not found' }, { status: 404 });
    }

    const node = overpassData.elements[0];
    
    if (!node.tags || !node.tags.name) {
      return NextResponse.json({ error: 'Invalid restaurant data' }, { status: 404 });
    }

    const nodeId = node.id.toString();
    const cuisine = node.tags.cuisine || 'American';
    
    // Deterministic image based on ID
    const seed = parseInt(nodeId) || Date.now();
    const images = [
      '/images/restaurant_pizza.png',
      '/images/restaurant_burger.png',
      '/images/restaurant_sushi.png',
      '/images/hero_food_bowl.png'
    ];
    const image = images[seed % images.length];
    const rating = 4.0 + (Math.sin(seed) * 0.5 + 0.5) * 0.9;
    
    const restaurant = {
      id: nodeId,
      name: node.tags.name,
      rating: Math.round(rating * 10) / 10,
      time: '20-35 min',
      priceLevel: '$$',
      category: cuisine.charAt(0).toUpperCase() + cuisine.slice(1).split(';')[0],
      image,
      coverImage: image,
      address: node.tags['addr:street'] || 'Unknown Address',
      menu: generateMenu(nodeId, cuisine)
    };

    return NextResponse.json({ restaurant });
  } catch (error) {
    console.error('Error fetching restaurant:', error);
    return NextResponse.json({ error: 'Failed to fetch restaurant' }, { status: 500 });
  }
}
