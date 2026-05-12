"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";
import { buildTelHrefClient } from "./leadCapture/contactHref";

const easing = [0.22, 1, 0.36, 1];

export default function MobileStickyCTA({ whatsappHref }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => setShow(window.scrollY > 280);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const telHref = buildTelHrefClient();

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          key="mobile-cta"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.45, ease: easing }}
          className="fixed inset-x-0 bottom-0 z-[55] border-t border-slate-200/90 bg-white/92 px-3 pb-[max(env(safe-area-inset-bottom),12px)] pt-3 shadow-[0_-8px_32px_-12px_rgba(15,23,42,0.14)] backdrop-blur-xl lg:hidden"
        >
          <div className="flex items-center gap-2">
            <a
              href={telHref}
              className="flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-2xl bg-[#0a1f44] px-4 text-[15px] font-extrabold text-white shadow-[0_12px_28px_-12px_rgba(10,31,68,0.45)] transition active:scale-[0.99]"
            >
              <Phone className="h-[18px] w-[18px] shrink-0 opacity-95" strokeWidth={2.4} />
              שיחה מיידית
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp מיידי"
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
