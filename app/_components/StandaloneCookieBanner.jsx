"use client";

/**
 * באנר עוגיות עצמאי: אנימציה ב־Framer Motion, localStorage, וסנכרון גובה ל־`--cookie-consent-h`
 * ללא תלות ב־globals.css או בעמודות layout.
 */

import Link from "next/link";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Cookie } from "lucide-react";
import Button from "./ui/Button";

const STORAGE_KEY = "siudit-cookie-consent-v1";
const STORAGE_VALUE = "accepted";

const ease = [0.22, 1, 0.36, 1];

function setConsentHeightPx(px) {
  if (typeof document === "undefined") return;
  if (px <= 0) document.documentElement.style.removeProperty("--cookie-consent-h");
  else document.documentElement.style.setProperty("--cookie-consent-h", `${px}px`);
}

export default function StandaloneCookieBanner() {
  const rootRef = useRef(null);
  const [visible, setVisible] = useState(null);
  const reduceMotion = useReducedMotion();

  useLayoutEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      setVisible(stored !== STORAGE_VALUE);
    } catch {
      setVisible(true);
    }
  }, []);

  const syncHeight = useCallback(() => {
    if (visible !== true) {
      setConsentHeightPx(0);
      return;
    }
    const el = rootRef.current;
    if (!el) return;
    const h = Math.ceil(el.getBoundingClientRect().height);
    setConsentHeightPx(h);
  }, [visible]);

  useLayoutEffect(() => {
    if (visible !== true) {
      setConsentHeightPx(0);
      return;
    }
    const el = rootRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => syncHeight());
    ro.observe(el);
    syncHeight();
    return () => {
      ro.disconnect();
      setConsentHeightPx(0);
    };
  }, [visible, syncHeight]);

  const onAccept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, STORAGE_VALUE);
    } catch {
      /* ignore */
    }
    setVisible(false);
    setConsentHeightPx(0);
  };

  if (visible !== true) return null;

  return (
    <motion.div
      ref={rootRef}
      role="region"
      aria-label="הסכמה לשימוש בעוגיות (Cookies)"
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={
        reduceMotion ? { duration: 0.01 } : { duration: 0.5, ease }
      }
      className="fixed inset-x-0 bottom-0 z-[56] border-t border-slate-200/90 bg-white/[0.97] pb-[max(12px,env(safe-area-inset-bottom,0px))] shadow-[0_-12px_40px_-16px_rgba(10,31,68,0.18)] backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 pb-3 pt-3.5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6 sm:pb-4 sm:pt-4">
        <div className="flex min-w-0 items-start gap-3 sm:max-w-[min(100%,42rem)] sm:items-center">
          <span
            className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-[#eff6ff] text-[#1851d8] ring-1 ring-[#1f6bff]/12"
            aria-hidden
          >
            <Cookie className="h-5 w-5" strokeWidth={2.2} />
          </span>
          <p className="text-pretty text-[14px] font-medium leading-relaxed text-[#0a1f44] sm:text-[15px]">
            אנו עושים שימוש בקובצי Cookie כדי להבטיח את חוויית הגלישה הטובה ביותר באתר שלנו.
          </p>
        </div>

        <div className="flex shrink-0 flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-end sm:gap-3">
          <Link
            href="/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className={[
              "group/btn relative inline-flex h-10 w-full items-center justify-center overflow-hidden rounded-full border border-slate-200/90 bg-white px-5 text-sm font-semibold tracking-tight text-[#0a1f44] shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-8px_rgba(15,23,42,0.08)] transition-all duration-300",
              "select-none hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_18px_40px_-14px_rgba(15,23,42,0.22)] active:translate-y-0 active:scale-[0.99]",
              "will-change-transform focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300/60 sm:w-auto",
            ].join(" ")}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-l from-transparent via-[#1f6bff]/10 to-transparent transition-transform duration-700 ease-out group-hover/btn:translate-x-full"
            />
            <span className="relative z-10">תקנון פרטיות</span>
          </Link>
          <Button
            type="button"
            variant="gradient"
            size="sm"
            className="w-full justify-center sm:w-auto"
            onClick={onAccept}
          >
            אישור
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
