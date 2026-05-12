/**
 * WGS84 → normalized Israel map frame (W-E portrait, coastline-true-ish).
 * Bounds tuned for mainland + Negev (Eilat tail) so major cities read intuitively.
 */
export const ISRAEL_BBOX = {
  minLon: 34.22,
  maxLon: 35.88,
  minLat: 29.42,
  maxLat: 33.42,
};

/** Simplified outline control points (lat, lon) — coastal / border approximation */
export const ISRAEL_OUTLINE_LL = [
  [33.28, 34.32],
  [33.1, 34.72],
  [32.88, 34.92],
  [32.55, 34.95],
  [32.1, 34.76],
  [31.68, 34.58],
  [31.4, 34.33],
  [31.0, 34.25],
  [30.55, 34.35],
  [29.95, 34.8],
  [29.52, 34.96],
  [29.55, 35.15],
  [30.15, 35.35],
  [31.0, 35.45],
  [31.45, 35.48],
  [32.0, 35.55],
  [32.6, 35.58],
  [33.0, 35.35],
  [33.32, 35.05],
  [33.28, 34.32],
];

/** Major cities — WGS84 (lat, lon) */
export const CITY_COORDINATES_WGS84 = {
  haifa: [32.794, 34.99],
  "kfar-saba": [32.175, 34.907],
  raanana: [32.185, 34.871],
  netanya: [32.332, 34.86],
  herzliya: [32.166, 34.825],
  "petah-tikva": [32.087, 34.888],
  "bnei-brak": [32.084, 34.834],
  "tel-aviv": [32.085, 34.782],
  "ramat-gan": [32.07, 34.824],
  holon: [32.012, 34.779],
  "rishon-lezion": [31.973, 34.793],
  rehovot: [31.895, 34.809],
  modiin: [31.89, 35.01],
  jerusalem: [31.768, 35.214],
  ashdod: [31.804, 34.655],
  ashkelon: [31.669, 34.574],
  "beer-sheva": [31.252, 34.792],
};

const VB = { w: 100, h: 210, padX: 5, padY: 6 };

/**
 * @param {number} lon
 * @param {number} lat
 * @returns {{ x: number, y: number }}
 */
export function projectLonLat(lon, lat) {
  const { minLon, maxLon, minLat, maxLat } = ISRAEL_BBOX;
  const nx = (lon - minLon) / (maxLon - minLon);
  const ny = (maxLat - lat) / (maxLat - minLat);
  const innerW = VB.w - VB.padX * 2;
  const innerH = VB.h - VB.padY * 2;
  return {
    x: VB.padX + nx * innerW,
    y: VB.padY + ny * innerH,
  };
}

/**
 * Build SVG path d= for outline in viewBox units.
 */
export function buildIsraelOutlinePath() {
  const pts = ISRAEL_OUTLINE_LL.map(([lat, lon]) => {
    const p = projectLonLat(lon, lat);
    return `${p.x.toFixed(2)},${p.y.toFixed(2)}`;
  });
  return `M ${pts[0]} ` + pts.slice(1).map((p) => `L ${p}`).join(" ") + " Z";
}

/**
 * Radial separation for pins closer than `minDist` (viewBox units).
 * @param {{ slug: string, x: number, y: number }[]} pins
 * @param {number} minDist
 */
export function separateOverlappingPins(pins, minDist) {
  const out = pins.map((p) => ({ ...p }));
  const n = out.length;
  for (let iter = 0; iter < n * 2; iter++) {
    let moved = false;
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const dx = out[j].x - out[i].x;
        const dy = out[j].y - out[i].y;
        const d = Math.hypot(dx, dy) || 0.001;
        if (d < minDist) {
          const push = (minDist - d) / 2 + 0.25;
          const ox = (dx / d) * push;
          const oy = (dy / d) * push;
          out[i].x -= ox;
          out[i].y -= oy;
          out[j].x += ox;
          out[j].y += oy;
          moved = true;
        }
      }
    }
    if (!moved) break;
  }
  return out;
}
