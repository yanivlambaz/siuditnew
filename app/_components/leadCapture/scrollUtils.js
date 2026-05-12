"use client";

export function getDocumentScrollPercent() {
  if (typeof document === "undefined") return 0;
  const el = document.documentElement;
  const scrollTop = el.scrollTop || document.body.scrollTop;
  const scrollHeight = el.scrollHeight - el.clientHeight;
  if (scrollHeight <= 0) return 0;
  return scrollTop / scrollHeight;
}
