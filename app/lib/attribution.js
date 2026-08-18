/** Google Ads attribution fields captured from landing URLs. */
export const ATTRIBUTION_PARAM_KEYS = [
  "utm_source",
  "utm_medium",
  "campaign_id",
  "adgroup_id",
  "ad_id",
  "keyword",
  "match_type",
  "target_id",
  "network",
  "device",
  "gclid",
];

export const ATTRIBUTION_STORAGE_KEY = "siudit:ads:attribution";
export const ATTRIBUTION_COOKIE_NAME = "siudit_ads_attr";

const PLACEHOLDER_PATTERN = /^\{[a-z0-9_]+\}$/i;

const MAX_LENGTH = {
  keyword: 500,
  gclid: 200,
  default: 120,
};

/** @returns {Record<string, string | null>} */
export function emptyAttribution() {
  return Object.fromEntries(ATTRIBUTION_PARAM_KEYS.map((key) => [key, null]));
}

/**
 * @param {unknown} value
 * @returns {boolean}
 */
export function isPlaceholderValue(value) {
  if (value == null) return true;
  const trimmed = String(value).trim();
  if (!trimmed) return true;
  return PLACEHOLDER_PATTERN.test(trimmed);
}

/**
 * @param {string} key
 * @param {unknown} raw
 * @returns {string | null}
 */
export function normalizeAttributionValue(key, raw) {
  if (raw == null) return null;

  let value = String(raw).trim();
  if (!value || isPlaceholderValue(value)) return null;

  if (/%[0-9A-Fa-f]{2}/.test(value)) {
    try {
      value = decodeURIComponent(value);
    } catch {
      /* keep raw value when decoding fails */
    }
  }

  value = value.trim();
  if (!value || isPlaceholderValue(value)) return null;

  const maxLen = MAX_LENGTH[key] ?? MAX_LENGTH.default;
  if (value.length > maxLen) value = value.slice(0, maxLen);

  return value || null;
}

/**
 * @param {URLSearchParams | { get: (key: string) => string | null }} searchParams
 * @returns {Record<string, string | null>}
 */
export function parseAttributionFromSearchParams(searchParams) {
  const parsed = emptyAttribution();
  for (const key of ATTRIBUTION_PARAM_KEYS) {
    parsed[key] = normalizeAttributionValue(key, searchParams.get(key));
  }
  return parsed;
}

/**
 * @param {Record<string, string | null>} attribution
 * @returns {boolean}
 */
export function hasAnyAttributionValue(attribution) {
  return ATTRIBUTION_PARAM_KEYS.some((key) => attribution[key] != null);
}

/**
 * Merge incoming attribution without overwriting existing values with empties.
 *
 * @param {Record<string, string | null>} existing
 * @param {Record<string, string | null>} incoming
 * @returns {Record<string, string | null>}
 */
export function mergeAttribution(existing, incoming) {
  const merged = { ...existing };
  for (const key of ATTRIBUTION_PARAM_KEYS) {
    const next = incoming[key];
    if (next != null && next !== "") {
      merged[key] = next;
    }
  }
  return merged;
}

/**
 * @param {unknown} raw
 * @returns {Record<string, string | null>}
 */
export function sanitizeAttributionObject(raw) {
  const sanitized = emptyAttribution();
  if (!raw || typeof raw !== "object") return sanitized;

  for (const key of ATTRIBUTION_PARAM_KEYS) {
    sanitized[key] = normalizeAttributionValue(key, /** @type {Record<string, unknown>} */ (raw)[key]);
  }

  return sanitized;
}

/**
 * @param {string | null | undefined} cookieHeader
 * @returns {Record<string, string | null>}
 */
export function parseAttributionFromCookieHeader(cookieHeader) {
  if (!cookieHeader) return emptyAttribution();

  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${ATTRIBUTION_COOKIE_NAME}=([^;]*)`));
  if (!match?.[1]) return emptyAttribution();

  try {
    const decoded = decodeURIComponent(match[1]);
    return sanitizeAttributionObject(JSON.parse(decoded));
  } catch {
    return emptyAttribution();
  }
}

/**
 * Flat fields for the GHL webhook (CRM-friendly).
 *
 * @param {Record<string, string | null>} attribution
 * @returns {Record<string, string>}
 */
export function flattenAttributionForWebhook(attribution) {
  /** @type {Record<string, string>} */
  const flat = {};
  for (const key of ATTRIBUTION_PARAM_KEYS) {
    const value = attribution[key];
    if (value != null && value !== "") {
      flat[key] = value;
    }
  }
  return flat;
}

/**
 * Resolve attribution from request body and first-party cookie.
 *
 * @param {unknown} body
 * @param {string | null | undefined} cookieHeader
 * @returns {Record<string, string | null>}
 */
export function resolveAttributionFromRequest(body, cookieHeader) {
  const fromCookie = parseAttributionFromCookieHeader(cookieHeader);
  const fromBody =
    body && typeof body === "object" && body.attribution
      ? sanitizeAttributionObject(body.attribution)
      : emptyAttribution();

  return mergeAttribution(fromCookie, fromBody);
}
