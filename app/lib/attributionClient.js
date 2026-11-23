"use client";

import {
  ATTRIBUTION_COOKIE_NAME,
  ATTRIBUTION_STORAGE_KEY,
  emptyAttribution,
  flattenAttributionForWebhook,
  hasAnyAttributionValue,
  mergeAttribution,
  parseAttributionFromSearchParams,
  sanitizeAttributionObject,
} from "./attribution";
import { track } from "./analytics";

/**
 * @returns {Record<string, string | null>}
 */
export function readStoredAttribution() {
  if (typeof window === "undefined") return emptyAttribution();

  try {
    const raw = sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    if (!raw) return emptyAttribution();
    return mergeAttribution(emptyAttribution(), sanitizeAttributionObject(JSON.parse(raw)));
  } catch {
    return emptyAttribution();
  }
}

/**
 * @param {Record<string, string | null>} attribution
 */
export function writeStoredAttribution(attribution) {
  if (typeof window === "undefined") return;

  try {
    sessionStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(attribution));
  } catch {
    /* private mode / quota */
  }

  syncAttributionCookie(attribution);
}

/**
 * First-party cookie lets /api/lead attach attribution without changing every form.
 *
 * @param {Record<string, string | null>} attribution
 */
export function syncAttributionCookie(attribution) {
  if (typeof document === "undefined" || !hasAnyAttributionValue(attribution)) return;

  try {
    const encoded = encodeURIComponent(JSON.stringify(attribution));
    document.cookie = `${ATTRIBUTION_COOKIE_NAME}=${encoded}; path=/; max-age=1800; SameSite=Lax`;
  } catch {
    /* ignore cookie write failures */
  }
}

/**
 * Capture attribution from the current URL and persist for the session.
 *
 * @param {string} [search] defaults to window.location.search
 * @returns {Record<string, string | null>}
 */
export function captureAttributionFromUrl(search) {
  if (typeof window === "undefined") return emptyAttribution();

  const query = search ?? window.location.search;
  const incoming = parseAttributionFromSearchParams(new URLSearchParams(query));
  const stored = readStoredAttribution();

  if (!hasAnyAttributionValue(incoming)) {
    return stored;
  }

  const merged = mergeAttribution(stored, incoming);
  writeStoredAttribution(merged);
  writeTouches(stored, incoming);

  track("google_ads_attribution_captured", {
    has_gclid: !!merged.gclid,
    has_keyword: !!merged.keyword,
    has_campaign_id: !!merged.campaign_id,
  });

  return merged;
}

/**
 * Attach stored attribution to a lead payload before POST /api/lead.
 *
 * @param {Record<string, unknown>} payload
 * @returns {Record<string, unknown>}
 */
export function appendAttributionToLeadPayload(payload) {
  const attribution = readStoredAttribution();
  if (!hasAnyAttributionValue(attribution)) return payload;
  return { ...payload, attribution, ...readTouches() };
}

const TOUCH_STORAGE_KEY = `${ATTRIBUTION_STORAGE_KEY}:touches`;

function readTouches() {
  try {
    return JSON.parse(sessionStorage.getItem(TOUCH_STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function writeTouches(stored, incoming) {
  const previous = readTouches();
  const first = previous.firstAttribution ??
    flattenAttributionForWebhook(hasAnyAttributionValue(stored) ? stored : incoming);
  try {
    sessionStorage.setItem(TOUCH_STORAGE_KEY, JSON.stringify({
      firstAttribution: first,
      lastAttribution: flattenAttributionForWebhook(incoming),
    }));
  } catch {
    // Existing attribution can still be recovered from the cookie.
  }
}
