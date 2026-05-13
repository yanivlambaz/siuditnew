"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (typeof window === "undefined") return;
      if (window.localStorage.getItem("cookie_consent") === "true") return;
      setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="הודעת עוגיות"
      className="fixed bottom-0 left-0 right-0 z-40 flex flex-wrap items-center justify-center gap-2 border-t border-white/15 bg-[#0a1f44] px-3 py-2.5 text-center text-[12px] text-white shadow-[0_-4px_16px_rgba(0,0,0,0.12)] sm:flex-nowrap sm:justify-between sm:gap-3 sm:text-left sm:text-[13px]"
      style={{
        paddingBottom: "max(0.625rem, env(safe-area-inset-bottom, 0px))",
      }}
    >
      <span className="max-w-xl leading-snug sm:text-start">
        אנחנו משתמשים בקובצי Cookie כדי לשפר את חוויית השימוש באתר.
      </span>
      <span className="flex flex-wrap items-center justify-center gap-2 sm:justify-end">
        <Link
          href="/privacy-policy"
          className="font-semibold text-white/95 underline underline-offset-2 hover:text-white"
        >
          מדיניות פרטיות
        </Link>
        <button
          type="button"
          onClick={() => {
            try {
              if (typeof window !== "undefined") {
                window.localStorage.setItem("cookie_consent", "true");
              }
            } catch {
              /* ignore */
            }
            setVisible(false);
          }}
          className="rounded-full bg-white px-4 py-1.5 text-[12px] font-bold text-[#0a1f44] hover:bg-slate-100 sm:text-[13px]"
        >
          מאשר
        </button>
      </span>
    </div>
  );
}
