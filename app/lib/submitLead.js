"use client";

import { appendAttributionToLeadPayload } from "./attributionClient";

/**
 * Shared POST helper for all website lead forms.
 * Automatically attaches stored Google Ads attribution when available.
 *
 * @param {Record<string, unknown>} payload
 * @returns {Promise<Response>}
 */
export async function submitLead(payload) {
  return fetch("/api/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(appendAttributionToLeadPayload(payload)),
  });
}
