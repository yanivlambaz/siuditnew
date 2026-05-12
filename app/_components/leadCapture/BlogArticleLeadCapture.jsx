"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import PremiumLeadDialog from "./PremiumLeadDialog";
import { buildTelHrefClient } from "./contactHref";
import { blogArticleKey, MS_24H, canShowAfterTTL, markShownAt } from "./leadCaptureStorage";
import { getDocumentScrollPercent } from "./scrollUtils";

/** Blog: first of 40s timer or 65% scroll; once per 24h per article slug. */
export default function BlogArticleLeadCapture({ slug, whatsappHref }) {
  const [open, setOpen] = useState(false);
  const firedRef = useRef(false);
  const key = blogArticleKey(slug);
  const telHref = buildTelHrefClient();

  const tryOpen = useCallback(() => {
    if (typeof window === "undefined") return;
    if (firedRef.current) return;
    if (!canShowAfterTTL(key, MS_24H)) return;
    firedRef.current = true;
    markShownAt(key);
    setOpen(true);
  }, [key]);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    if (!canShowAfterTTL(key, MS_24H)) return undefined;
    const t = window.setTimeout(tryOpen, 40_000);
    return () => window.clearTimeout(t);
  }, [key, tryOpen]);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    function onScroll() {
      if (getDocumentScrollPercent() >= 0.65) tryOpen();
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [key, tryOpen]);

  return (
    <PremiumLeadDialog
      open={open}
      onClose={() => setOpen(false)}
      kind="blog"
      whatsappHref={whatsappHref}
      telHref={telHref}
      leadMeta={{ source: `popup-blog:${slug}` }}
    />
  );
}
