"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "cookie_consent";

export default function CookieBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (typeof window === "undefined") return;
      if (window.localStorage.getItem(STORAGE_KEY) === "true") return;
      setOpen(true);
    } catch {
      setOpen(true);
    }
  }, []);

  function accept() {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, "true");
      }
    } catch {
      /* ignore */
    }
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-label="הודעת פרטיות ועוגיות"
      aria-live="polite"
      className="fixed inset-x-0 bottom-36 z-[56] border-t border-white/10 bg-[#0a1f44] px-3 py-2.5 shadow-[0_-4px_24px_rgba(0,0,0,0.2)] lg:bottom-0"
      style={{ paddingBottom: "max(0.625rem, env(safe-area-inset-bottom, 0px))" }}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <p className="text-center text-[12px] leading-snug text-white sm:text-start sm:text-[13px]">
          אנחנו עושים שימוש בקובצי Cookie כדי לשפר את חוויית השימוש באתר. המשך שימוש באתר מהווה הסכמה למדיניות הפרטיות.
        </p>
        <div className="flex shrink-0 flex-wrap items-center justify-center gap-2 sm:justify-end">
          <Link
            href="/privacy-policy"
            className="text-[12px] font-semibold text-white/90 underline underline-offset-2 hover:text-white sm:text-[13px]"
          >
            מדיניות פרטיות
          </Link>
          <button
            type="button"
            onClick={accept}
            className="rounded-full bg-white px-4 py-1.5 text-[12px] font-bold text-[#0a1f44] transition hover:bg-slate-100 sm:text-[13px]"
          >
            מאשר
          </button>
        </div>
      </div>
    </div>
  );
}
