const location = 'new york';

async function test() {
  try {
    const geocodeRes = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json&limit=1`, {
      headers: { 'User-Agent': 'CraveFoodDeliveryApp/1.0' }
    });
    const geocodeData = await geocodeRes.json();
    console.log("Geocode Data:", geocodeData);

    const { lat, lon } = geocodeData[0];

    const overpassQuery = `[out:json];node(around:5000,${lat},${lon})["amenity"="restaurant"];out 15;`;
    
    console.log("Querying Overpass via GET...");
    const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`;
    
    const overpassRes = await fetch(url, {
      headers: { 'User-Agent': 'CraveFoodDeliveryApp/1.0' }
    });
    
    const text = await overpassRes.text();
    console.log("Response Status:", overpassRes.status);
    console.log("Response Body preview:", text.substring(0, 300));
    
  } catch (error) {
    console.error("Error:", error);
  }
}

test();
