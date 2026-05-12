"use client";

import { MessageCircle, Phone } from "lucide-react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { SIUDIT_FLOATING_CTA_EVENT, SIUDIT_OVERLAY_EVENT } from "../../lib/siuditUiEvents";

function visibleBlockingOverlays() {
  if (typeof document === "undefined") return 0;
  /** @type {Set<Element>} */
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

export default function CitiesStickyContact({ whatsappHref, telHref }) {
  const barRef = useRef(null);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [floatVisible, setFloatVisible] = useState(false);
  const [vvExtraBottom, setVvExtraBottom] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const eventOverlayRef = useRef(false);

  const syncOverlay = useCallback(() => {
    const domCount = visibleBlockingOverlays();
    setOverlayOpen(eventOverlayRef.current || domCount > 0);
  }, []);

  useLayoutEffect(() => {
    const el = barRef.current;
    if (!el || typeof document === "undefined") return;
    const apply = () => {
      const h = Math.ceil(el.getBoundingClientRect().height);
      document.documentElement.style.setProperty("--cities-sticky-h", `${h}px`);
    };
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    return () => {
      ro.disconnect();
      document.documentElement.style.removeProperty("--cities-sticky-h");
    };
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
    function onFloat(e) {
      setFloatVisible(!!e.detail?.visible);
    }
    window.addEventListener(SIUDIT_OVERLAY_EVENT, onOverlay);
    window.addEventListener(SIUDIT_FLOATING_CTA_EVENT, onFloat);
    return () => {
      window.removeEventListener(SIUDIT_OVERLAY_EVENT, onOverlay);
      window.removeEventListener(SIUDIT_FLOATING_CTA_EVENT, onFloat);
    };
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

  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    const sync = () => {
      const gap = Math.max(0, window.innerHeight - vv.height - vv.offsetTop);
      setVvExtraBottom(gap);
    };
    sync();
    vv.addEventListener("resize", sync);
    vv.addEventListener("scroll", sync);
    return () => {
      vv.removeEventListener("resize", sync);
      vv.removeEventListener("scroll", sync);
    };
  }, []);

  const floatReserve = floatVisible ? 12 : 0;
  const bottomPad = `max(env(safe-area-inset-bottom, 0px), ${4 + vvExtraBottom + floatReserve}px)`;

  const dur = reducedMotion ? "0.01ms" : "320ms";
  const ease = "cubic-bezier(0.22, 1, 0.36, 1)";

  return (
    <div
      className="pointer-events-none fixed inset-x-0 z-[45] sm:inset-x-auto sm:start-6"
      style={{
        bottom: bottomPad,
      }}
    >
      <div
        ref={barRef}
        className="pointer-events-auto px-3 pb-1 sm:px-0 sm:pb-0"
        style={{
          transform: overlayOpen ? "translateY(calc(100% + 24px))" : "translateY(0)",
          opacity: overlayOpen ? 0 : 1,
          transition: `transform ${dur} ${ease}, opacity ${reducedMotion ? "0.01ms" : "240ms"} ease`,
          pointerEvents: overlayOpen ? "none" : "auto",
        }}
        aria-hidden={overlayOpen}
      >
        {/* Mobile: compact glass bar */}
        <div className="mx-auto flex max-w-lg items-center gap-2 sm:hidden">
          <a
            href={telHref}
            className="flex min-h-[48px] flex-1 items-center justify-center rounded-2xl border border-white/40 bg-white/72 px-4 text-[15px] font-extrabold text-[#0a1f44] shadow-[0_8px_32px_-12px_rgba(15,23,42,0.25)] backdrop-blur-xl ring-1 ring-slate-200/60 transition hover:bg-white/85 active:scale-[0.99]"
            style={{ transitionDuration: reducedMotion ? "0.01ms" : "180ms" }}
          >
            <Phone className="ms-1 h-[18px] w-[18px] shrink-0 text-[#1f6bff]" strokeWidth={2.3} aria-hidden />
            <span className="px-1">שיחה מיידית</span>
          </a>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp מיידי"
            className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#25D366] text-white shadow-[0_10px_28px_-10px_rgba(37,211,102,0.55)] ring-2 ring-white/35 transition hover:bg-[#1ebe5b] active:scale-[0.97]"
            style={{ transitionDuration: reducedMotion ? "0.01ms" : "180ms" }}
          >
            <MessageCircle className="h-6 w-6" strokeWidth={2.2} aria-hidden />
          </a>
        </div>

        {/* Desktop / large tablets: stacked glass */}
        <div className="hidden min-w-[220px] flex-col gap-2 rounded-3xl border border-white/45 bg-white/70 p-2.5 shadow-[0_16px_50px_-18px_rgba(15,23,42,0.28)] backdrop-blur-xl ring-1 ring-slate-200/55 sm:flex">
          <a
            href={telHref}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#0a1f44] px-4 py-3.5 text-[14px] font-extrabold text-white shadow-sm transition hover:bg-[#132a58] active:scale-[0.99]"
            style={{ transitionDuration: reducedMotion ? "0.01ms" : "200ms" }}
          >
            <Phone className="h-5 w-5 shrink-0 opacity-90" strokeWidth={2.2} aria-hidden />
            שיחה מיידית
          </a>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-emerald-200/80 bg-emerald-50/90 px-4 py-3 text-[13.5px] font-extrabold text-emerald-900 transition hover:bg-emerald-50 active:scale-[0.99]"
            style={{ transitionDuration: reducedMotion ? "0.01ms" : "200ms" }}
          >
            <MessageCircle className="h-5 w-5 shrink-0 text-[#128C7E]" strokeWidth={2.2} aria-hidden />
            WhatsApp מיידי
          </a>
        </div>
      </div>
    </div>
  );
}
