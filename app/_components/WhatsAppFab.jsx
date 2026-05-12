"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { buildTelHrefClient } from "./leadCapture/contactHref";
import { SIUDIT_OVERLAY_EVENT } from "../lib/siuditUiEvents";

function visibleBlockingOverlays() {
  if (typeof document === "undefined") return 0;
  const seen = new Set();
  document.querySelectorAll('[role="dialog"], [aria-modal="true"], [data-siudit-ui-blocker="true"]').forEach((el) => {
    if (seen.has(el)) return;
    if (el instanceof HTMLDialogElement && !el.open) return;
    const style = globalThis.getComputedStyle(el);
    if (style.display === "none" || style.visibility === "hidden") return;
    const o = Number.parseFloat(style.opacity);
    if (!Number.isNaN(o) && o < 0.04) return;
    const r = el.getBoundingClientRect();
    if (r.width < 48 || r.height < 48) return;
    seen.add(el);
  });
  return seen.size;
}

const ease = [0.22, 1, 0.36, 1];

/**
 * Desktop / large screens: stacked call + WhatsApp FABs.
 * Hides under lead modals and other overlays; clears sticky hubs via `--cities-sticky-h`.
 */
export default function WhatsAppFab({ href, telHref }) {
  const tel = telHref ?? buildTelHrefClient();
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const eventOverlayRef = useRef(false);

  const syncOverlay = useCallback(() => {
    const domCount = visibleBlockingOverlays();
    setOverlayOpen(eventOverlayRef.current || domCount > 0);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fn = () => setReducedMotion(mq.matches);
    fn();
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  useEffect(() => {
    function onOverlay(e) {
      eventOverlayRef.current = !!e.detail?.open;
      syncOverlay();
    }
    window.addEventListener(SIUDIT_OVERLAY_EVENT, onOverlay);
    return () => window.removeEventListener(SIUDIT_OVERLAY_EVENT, onOverlay);
  }, [syncOverlay]);

  useEffect(() => {
    if (typeof document === "undefined" || typeof MutationObserver === "undefined") return;
    const obs = new MutationObserver(() => {
      window.requestAnimationFrame(syncOverlay);
    });
    obs.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["style", "class", "open", "aria-hidden", "aria-modal", "hidden"],
    });
    const t = window.setTimeout(syncOverlay, 0);
    return () => {
      window.clearTimeout(t);
      obs.disconnect();
    };
  }, [syncOverlay]);

  const dur = reducedMotion ? "0.01ms" : "360ms";

  const dockStyle = {
    transform: overlayOpen ? "translateY(calc(100% + 28px)) scale(0.94)" : "translateY(0) scale(1)",
    opacity: overlayOpen ? 0 : 1,
    transition: `transform ${dur} cubic-bezier(0.22,1,0.36,1), opacity ${reducedMotion ? "0.01ms" : "220ms"} ease`,
    pointerEvents: overlayOpen ? "none" : "auto",
  };

  return (
    <div
      className="pointer-events-none fixed start-4 z-[58] hidden flex-col gap-3 sm:start-6 lg:flex"
      style={{
        bottom: "max(1.25rem, env(safe-area-inset-bottom, 0px) + var(--cities-sticky-h, 0px))",
        ...dockStyle,
      }}
      aria-hidden={overlayOpen}
    >
      <motion.a
        href={tel}
        aria-label="חייגו עכשיו"
        initial={{ opacity: 0, scale: 0.75, y: 14 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.45, ease }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.96 }}
        className="pointer-events-auto group relative grid h-14 w-14 place-items-center rounded-full bg-[#0a1f44] text-white shadow-[0_18px_44px_-12px_rgba(10,31,68,0.55)] ring-2 ring-white/35"
      >
        <span className="pointer-events-none absolute inset-0 rounded-full bg-[#1f6bff]/35 opacity-0 blur-xl transition group-hover:opacity-80" />
        <Phone className="relative h-6 w-6" strokeWidth={2.3} />
      </motion.a>

      <motion.a
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp מיידי"
        initial={{ opacity: 0, scale: 0.75, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1.05, duration: 0.48, ease }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.96 }}
        className="pointer-events-auto group relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_18px_50px_-12px_rgba(37,211,102,0.55)] ring-2 ring-white/30"
      >
        <span className="pointer-events-none absolute inset-0 rounded-full bg-[#25D366] opacity-55 blur-xl transition group-hover:opacity-90" />
        <span className="pointer-events-none absolute inset-0 animate-[pulse-ring_2s_ease-out_infinite] rounded-full bg-[#25D366]/40" />
        <svg className="relative h-7 w-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.173.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </motion.a>
    </div>
  );
}
