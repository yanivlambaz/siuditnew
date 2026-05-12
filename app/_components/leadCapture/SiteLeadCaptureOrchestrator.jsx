"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import PremiumLeadDialog from "./PremiumLeadDialog";
import ScrollFloatingLeadCta from "./ScrollFloatingLeadCta";
import { buildTelHrefClient } from "./contactHref";
import {
  STORAGE_WELCOME,
  STORAGE_EXIT,
  MS_12H,
  MS_24H,
  canShowAfterTTL,
  markShownAt,
  hasSessionFlag,
  setSessionFlag,
} from "./leadCaptureStorage";
import { getDocumentScrollPercent } from "./scrollUtils";

const FLOAT_ONCE = "siudit:lc:float-once";

/**
 * Homepage: welcome (6–8s) + exit intent + mid-scroll floating CTA.
 * Standard: exit + floating CTA (no timed welcome).
 */
export default function SiteLeadCaptureOrchestrator({ whatsappHref, siteMode = "standard" }) {
  const isHome = siteMode === "home";
  const telHref = buildTelHrefClient();

  const [modalKind, setModalKind] = useState(null);
  const [floatVisible, setFloatVisible] = useState(false);

  const modalOpenRef = useRef(false);
  const maxScrollYRef = useRef(0);
  const maxPctRef = useRef(0);
  const lastYRef = useRef(0);
  const lastTRef = useRef(0);

  useEffect(() => {
    modalOpenRef.current = modalKind != null;
  }, [modalKind]);

  const closeModal = useCallback(() => setModalKind(null), []);

  /* Welcome — homepage only, 6–8s jitter, 24h cadence */
  useEffect(() => {
    if (!isHome) return;
    if (typeof window === "undefined") return;
    if (!canShowAfterTTL(STORAGE_WELCOME, MS_24H)) return;

    const delay = 6000 + Math.floor(Math.random() * 2000);
    const t = window.setTimeout(() => {
      setModalKind((cur) => {
        if (cur) return cur;
        markShownAt(STORAGE_WELCOME);
        return "welcome";
      });
    }, delay);
    return () => window.clearTimeout(t);
  }, [isHome]);

  /* Exit: desktop mouse-leave; mobile scroll-back after depth — 12h cadence */
  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return;
    if (!canShowAfterTTL(STORAGE_EXIT, MS_12H)) return;

    const coarse = window.matchMedia?.("(pointer: coarse)")?.matches ?? false;

    const considerExit = () => {
      setModalKind((cur) => {
        if (cur) return cur;
        if (!canShowAfterTTL(STORAGE_EXIT, MS_12H)) return cur;
        markShownAt(STORAGE_EXIT);
        return "exit";
      });
    };

    if (!coarse) {
      function onMouseLeave(e) {
        if (modalOpenRef.current) return;
        if (e.clientY > 0) return;
        considerExit();
        document.removeEventListener("mouseleave", onMouseLeave);
      }
      document.addEventListener("mouseleave", onMouseLeave);
      return () => document.removeEventListener("mouseleave", onMouseLeave);
    }

    lastYRef.current = window.scrollY;
    lastTRef.current = Date.now();

    function onScroll() {
      if (modalOpenRef.current) return;
      const y = window.scrollY;
      const pct = getDocumentScrollPercent();
      const now = Date.now();
      maxScrollYRef.current = Math.max(maxScrollYRef.current, y);
      maxPctRef.current = Math.max(maxPctRef.current, pct);
      const dt = Math.max(1, now - lastTRef.current);
      const dy = y - lastYRef.current;
      const velocity = dy / dt;
      lastYRef.current = y;
      lastTRef.current = now;

      if (maxPctRef.current >= 0.32 && y < maxScrollYRef.current - 140 && velocity < -0.35 && y > 80) {
        considerExit();
        window.removeEventListener("scroll", onScroll);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* First time user crosses ~48% depth — compact floating CTA, once per session */
  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    function onScroll() {
      if (modalOpenRef.current) return;
      if (hasSessionFlag(FLOAT_ONCE)) return;
      if (getDocumentScrollPercent() < 0.48) return;
      setSessionFlag(FLOAT_ONCE);
      setFloatVisible(true);
      window.removeEventListener("scroll", onScroll);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const dismissFloat = useCallback(() => setFloatVisible(false), []);

  const floatToForm = useCallback(() => {
    setFloatVisible(false);
    setModalKind((cur) => (cur ? cur : "exit"));
  }, []);

  return (
    <>
      <PremiumLeadDialog
        open={modalKind === "welcome"}
        onClose={closeModal}
        kind="welcome"
        whatsappHref={whatsappHref}
        telHref={telHref}
        leadMeta={{ source: "popup-welcome" }}
      />
      <PremiumLeadDialog
        open={modalKind === "exit"}
        onClose={closeModal}
        kind="exit"
        whatsappHref={whatsappHref}
        telHref={telHref}
        leadMeta={{ source: "popup-exit" }}
      />
      <ScrollFloatingLeadCta
        visible={floatVisible && modalKind == null}
        onDismiss={dismissFloat}
        onCta={floatToForm}
        whatsappHref={whatsappHref}
        telHref={telHref}
      />
    </>
  );
}
