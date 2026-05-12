/**
 * Slugs only — for Edge middleware (keep in sync with `app/_data/cities.js`).
 * Avoids importing the full cities dataset into the middleware bundle.
 */
export const LEGACY_CITY_SLUGS = new Set([
  "tel-aviv",
  "jerusalem",
  "haifa",
  "rishon-lezion",
  "petah-tikva",
  "netanya",
  "beer-sheva",
  "ashdod",
  "ashkelon",
  "holon",
  "bnei-brak",
  "ramat-gan",
  "herzliya",
  "rehovot",
  "kfar-saba",
  "raanana",
  "modiin",
]);
