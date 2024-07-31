// This is where the product data loads initially.
import { categorieFinder } from "@/categories";

export async function fetchNasaImages(page = 1, perPage = 3, query = "galaxy") {
  try {
    const response = await fetch(
      `https://images-api.nasa.gov/search?q=${query}&media_type=image&page=${page}&page_size=${perPage}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    const items = data.collection.items || [];

    const imageData = items.map((item) => {
      let description = item.data[0].description_508
        ? item.data[0].description_508
        : item.data[0].description;

      let categories = categorieFinder(description);
      let discounted = categories.length >= 2 ? true : false;
      return {
        id: item.data[0].nasa_id,
        name: item.data[0].title,
        description: description,
        imageUrl: item.links ? item.links[0].href : "",
        categories: categories,
        discounted: discounted,
        price: 0,
      };
    });

    return imageData;
  } catch (error) {
    console.error("Failed to fetch NASA images:", error);
    return { collection: { items: [] } };
  }
}
