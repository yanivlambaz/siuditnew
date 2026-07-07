import { LEAD_SOURCE } from "./leadConfig";

function isValidWebhookUrl(value) {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

/**
 * Forwards a validated lead payload to the shared GoHighLevel inbound webhook.
 * The website source is enforced server-side and must not be supplied by the client.
 *
 * @param {Record<string, unknown>} validatedLeadPayload
 * @returns {Promise<{ ok: true } | { ok: false; reason: "missing" | "invalid" | "upstream" | "network"; status?: number }>}
 */
export async function forwardLeadToGhl(validatedLeadPayload) {
  const webhookUrl = process.env.GHL_LEAD_WEBHOOK?.trim();

  if (!webhookUrl) {
    console.warn("[lead] webhook configuration missing");
    return { ok: false, reason: "missing" };
  }

  if (!isValidWebhookUrl(webhookUrl)) {
    console.warn("[lead] invalid webhook configuration");
    return { ok: false, reason: "invalid" };
  }

  console.log("[lead] webhook configuration present");

  const webhookPayload = {
    ...validatedLeadPayload,
    source: LEAD_SOURCE,
  };

  console.log("[lead] webhook request attempted");

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(webhookPayload),
    });

    console.log(`[lead] webhook response status ${response.status}`);

    if (!response.ok) {
      console.warn("[lead] webhook upstream error");
      return { ok: false, reason: "upstream", status: response.status };
    }

    return { ok: true };
  } catch {
    console.warn("[lead] webhook network exception");
    return { ok: false, reason: "network" };
  }
}
