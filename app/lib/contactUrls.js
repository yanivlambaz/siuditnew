import { ORG_WHATSAPP_HREF } from "./orgInfo";

/** כתובת וואטסאפ לדפי שרת ולקומפוננטות — עקבי עם contactHref בצד הלקוח */
export function publicWhatsappHref() {
  const hrefEnv = typeof process !== "undefined" ? process.env.NEXT_PUBLIC_WHATSAPP_HREF?.trim() : "";
  if (hrefEnv) return hrefEnv;
  const raw = typeof process !== "undefined" ? process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? "" : "";
  const d = String(raw).replace(/\D/g, "");
  if (d) return `https://wa.me/${d}`;
  return ORG_WHATSAPP_HREF;
}
