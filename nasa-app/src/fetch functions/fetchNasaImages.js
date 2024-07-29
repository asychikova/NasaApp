export async function fetchNasaImages(page = 1, perPage = 3, query = "galaxy") {
  try {
    const response = await fetch(
      `https://images-api.nasa.gov/search?q=${query}&media_type=image&page=${page}&page_size=${perPage}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch NASA images:", error);
    return { collection: { items: [] } };
  }
}
