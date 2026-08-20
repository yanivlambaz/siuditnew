import { ORG_WHATSAPP_HREF, ORG_WHATSAPP_PREFILL_MESSAGE } from "./orgInfo";

/**
 * Append the canonical prefill message to a wa.me / WhatsApp URL when missing.
 *
 * @param {string} href
 * @returns {string}
 */
export function withWhatsappPrefill(href) {
  if (!href || typeof href !== "string") return href;
  const trimmed = href.trim();
  if (!trimmed) return trimmed;

  try {
    const url = new URL(trimmed);
    if (!url.searchParams.has("text")) {
      url.searchParams.set("text", ORG_WHATSAPP_PREFILL_MESSAGE);
    }
    return url.toString();
  } catch {
    return trimmed;
  }
}

/**
 * Resolve the site-wide WhatsApp href (env overrides + canonical prefill message).
 *
 * @returns {string}
 */
export function resolveWhatsappHref() {
  const hrefEnv = typeof process !== "undefined" ? process.env.NEXT_PUBLIC_WHATSAPP_HREF?.trim() : "";
  if (hrefEnv) return withWhatsappPrefill(hrefEnv);

  const raw = typeof process !== "undefined" ? process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? "" : "";
  const d = String(raw).replace(/\D/g, "");
  if (d) return withWhatsappPrefill(`https://wa.me/${d}`);

  return withWhatsappPrefill(ORG_WHATSAPP_HREF);
}

/** כתובת וואטסאפ לדפי שרת ולקומפוננטות — עקבי עם contactHref בצד הלקוח */
export function publicWhatsappHref() {
  return resolveWhatsappHref();
}
