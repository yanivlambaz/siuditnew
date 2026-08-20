"use client";

import { ORG_PHONE_DIGITS } from "../../lib/orgInfo";
import { resolveWhatsappHref, withWhatsappPrefill } from "../../lib/contactUrls";

export function buildTelHrefClient() {
  const env = process.env.NEXT_PUBLIC_ORG_PHONE;
  const digits =
    env != null && String(env).trim() !== ""
      ? String(env).replace(/\D/g, "")
      : String(ORG_PHONE_DIGITS).replace(/\D/g, "");
  return `tel:${digits || ORG_PHONE_DIGITS}`;
}

export function buildWhatsappHrefClient(custom) {
  if (custom) return withWhatsappPrefill(custom);
  return resolveWhatsappHref();
}
