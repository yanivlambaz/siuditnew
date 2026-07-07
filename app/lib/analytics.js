"use client";

/**
 * Lightweight conversion tracking that pushes events to the existing GTM
 * dataLayer (container GTM-TVWCZL96). No GTM container config is changed here —
 * this only emits application-level events that GTM triggers can consume.
 *
 * Safe no-op during SSR or if dataLayer is unavailable.
 *
 * @param {string} event
 * @param {Record<string, unknown>} [params]
 */
export function track(event, params = {}) {
  if (typeof window === "undefined" || !event) return;
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...params });
  } catch {
    /* ignore analytics failures — never block UX */
  }
}
