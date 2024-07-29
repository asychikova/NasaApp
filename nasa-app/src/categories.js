const validCategories = [
  { id: "c1", name: "galaxy" },
  { id: "c2", name: "nebula" },
  { id: "c3", name: "black hole" },
  { id: "c4", name: "planet" },
  { id: "c5", name: "satellite" },
  { id: "c6", name: "sun" },
];

export function categorieFinder(description) {
  const categories = [];

  const planets = [
    "mercury",
    "venus",
    "earth",
    "mars",
    "jupiter",
    "saturn",
    "uranus",
    "neptune",
  ];

  // Convert description to lowercase and split into words
  description = description.toLowerCase();
  let words = description.split(/\W+/); // Split by any non-word character

  validCategories.forEach((category) => {
    if (words.includes(category.name) && !categories.includes(category.name)) {
      categories.push(category.name);
    }
  });

  if (words.includes("satellites")) {
    categories.push("satellite");
  }
  planets.forEach((planet) => {
    if (words.includes(planet) && !categories.includes("planet")) {
      categories.push("planet");
    }
  });

  return categories;
}
