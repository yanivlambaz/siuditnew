"use client";

import { ORG_PHONE_DIGITS, ORG_WHATSAPP_HREF } from "../../lib/orgInfo";

export function buildTelHrefClient() {
  const env = process.env.NEXT_PUBLIC_ORG_PHONE;
  const digits =
    env != null && String(env).trim() !== ""
      ? String(env).replace(/\D/g, "")
      : String(ORG_PHONE_DIGITS).replace(/\D/g, "");
  return `tel:${digits || ORG_PHONE_DIGITS}`;
}

export function buildWhatsappHrefClient(custom) {
  if (custom) return custom;
  const hrefEnv = process.env.NEXT_PUBLIC_WHATSAPP_HREF?.trim();
  if (hrefEnv) return hrefEnv;
  const raw = process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? "";
  const d = String(raw).replace(/\D/g, "");
  if (d) return `https://wa.me/${d}`;
  return ORG_WHATSAPP_HREF;
}
