"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle, CalendarCheck } from "lucide-react";
import { buildTelHrefClient } from "./leadCapture/contactHref";
import { track } from "../lib/analytics";

const easing = [0.22, 1, 0.36, 1];

function setStickyCtaHeight(px) {
  if (typeof document === "undefined") return;
  if (px <= 0) document.documentElement.style.removeProperty("--siudit-sticky-cta-h");
  else document.documentElement.style.setProperty("--siudit-sticky-cta-h", `${px}px`);
}

export default function MobileStickyCTA({ whatsappHref, availabilityHref }) {
  const [show, setShow] = useState(false);
  const barRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => setShow(window.scrollY > 280);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!show) {
      setStickyCtaHeight(0);
      return undefined;
    }
    const el = barRef.current;
    if (!el || typeof ResizeObserver === "undefined") return undefined;
    const ro = new ResizeObserver(() => {
      setStickyCtaHeight(Math.ceil(el.getBoundingClientRect().height));
    });
    ro.observe(el);
    setStickyCtaHeight(Math.ceil(el.getBoundingClientRect().height));
    return () => {
      ro.disconnect();
      setStickyCtaHeight(0);
    };
  }, [show]);

  const telHref = buildTelHrefClient();

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          key="mobile-cta"
          ref={barRef}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.45, ease: easing }}
          className="fixed inset-x-0 bottom-0 z-[55] border-t border-slate-200/90 bg-white/92 px-3 pb-[max(env(safe-area-inset-bottom),12px)] pt-3 shadow-[0_-8px_32px_-12px_rgba(15,23,42,0.14)] backdrop-blur-xl lg:hidden"
        >
          <div className="flex items-center gap-2">
            <a
              href={telHref}
              onClick={() => track("phone_click", { location: "mobile_sticky" })}
              className="flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-2xl bg-[#0a1f44] px-4 text-[15px] font-extrabold text-white shadow-[0_12px_28px_-12px_rgba(10,31,68,0.45)] transition active:scale-[0.99]"
            >
              <Phone className="h-[18px] w-[18px] shrink-0 opacity-95" strokeWidth={2.4} />
              {availabilityHref ? "חייגו עכשיו" : "שיחה מיידית"}
            </a>
            {availabilityHref ? (
              <a
                href={availabilityHref}
                onClick={() => track("availability_click", { location: "mobile_sticky" })}
                className="flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-2xl bg-[length:200%_auto] bg-[linear-gradient(120deg,#1f6bff_0%,#5fd1f0_50%,#1f6bff_100%)] px-4 text-[15px] font-extrabold text-white shadow-[0_12px_28px_-12px_rgba(31,107,255,0.5)] transition active:scale-[0.99]"
              >
                <CalendarCheck className="h-[18px] w-[18px] shrink-0" strokeWidth={2.4} />
                בדיקת זמינות
              </a>
            ) : null}
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp מיידי"
              onClick={() => track("whatsapp_click", { location: "mobile_sticky" })}
              className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#25D366] text-white shadow-[0_10px_28px_-10px_rgba(37,211,102,0.55)] ring-2 ring-white/35 transition hover:bg-[#1ebe5b] active:scale-[0.97]"
            >
              <MessageCircle className="h-6 w-6" strokeWidth={2.2} aria-hidden />
            </a>
          </div>
          <div className="mt-2 flex flex-col items-center gap-1 text-center">
            <p className="text-[11px] font-semibold text-slate-600">
              מענה אנושי 24/7 · תגובה מהירה בטלפון או ב-WhatsApp
            </p>
            <p className="text-[10.5px] font-medium text-slate-400">לא מחליפים רופא/ה — הטיפול לפי הוראה רפואית</p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
