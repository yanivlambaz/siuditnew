import { ORG_PHONE_DIGITS, ORG_PHONE_DISPLAY } from "./orgInfo";

/** @returns {string} digits only */
export function orgPhoneDigits() {
  const env = process.env.NEXT_PUBLIC_ORG_PHONE;
  if (env != null && String(env).trim() !== "") {
    const d = String(env).replace(/\D/g, "");
    if (d) return d;
  }
  const base = String(ORG_PHONE_DIGITS).replace(/\D/g, "");
  return base || "0723940350";
}

export function orgTelHref() {
  return `tel:${orgPhoneDigits()}`;
}

/** Israeli mobile-style grouping when 10 digits starting with 0 */
export function orgPhoneDisplayIl() {
  const d = orgPhoneDigits();
  if (d.length === 10 && d.startsWith("0")) {
    return `${d.slice(0, 3)}-${d.slice(3, 6)}-${d.slice(6)}`;
  }
  if (d.length === 9) {
    return `${d.slice(0, 2)}-${d.slice(2, 5)}-${d.slice(5)}`;
  }
  return ORG_PHONE_DISPLAY;
}
