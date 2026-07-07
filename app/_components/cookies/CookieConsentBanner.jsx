"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

const LEGAL_LINKS = [
  { href: "/privacy-policy", label: "מדיניות פרטיות" },
  { href: "/terms", label: "תנאי שימוש" },
  { href: "/accessibility", label: "הצהרת נגישות" },
];

/**
 * Compact, non-intrusive cookie notice.
 * Fixed near the bottom, horizontally centered, small system-notification feel.
 * DOM order matches visual/keyboard order (no row-reverse focus mismatches).
 */
export default function CookieConsentBanner({
  open,
  onAcceptAll,
  onRejectNonEssential,
  onOpenSettings,
}) {
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {open ? (
        <motion.aside
          role="region"
          aria-label="הודעת עוגיות"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: reduceMotion ? 0.01 : 0.22, ease: [0.22, 1, 0.36, 1] }}
          className={[
            "fixed inset-x-3 z-[70] mx-auto w-auto max-w-[720px]",
            "bottom-[calc(env(safe-area-inset-bottom,0px)+var(--siudit-sticky-cta-h,0px)+12px)]",
            "sm:inset-x-0 sm:bottom-[max(16px,env(safe-area-inset-bottom,0px))]",
            "rounded-2xl border border-slate-200/80 bg-white/95 shadow-[0_16px_44px_-18px_rgba(10,31,68,0.35)] backdrop-blur-xl",
          ].join(" ")}
        >
          <div className="flex flex-col gap-3 p-3.5 sm:flex-row sm:items-center sm:gap-4 sm:p-4">
            <div className="flex min-w-0 items-start gap-3">
              <span
                aria-hidden
                className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-[#eff6ff] text-[#1851d8] ring-1 ring-[#1f6bff]/12"
              >
                <ShieldCheck className="h-[18px] w-[18px]" strokeWidth={2.2} />
              </span>
              <div className="min-w-0">
                <p className="text-[13.5px] font-extrabold tracking-tight text-[#0a1f44]">
                  אנו מכבדים את פרטיותך
                </p>
                <p className="mt-1 text-[12.5px] leading-[1.55] text-slate-600">
                  אנו משתמשים בעוגיות הכרחיות להפעלת האתר, וכן – בכפוף להסכמתך – בעוגיות לניתוח
                  השימוש באתר ולשיפור חוויית המשתמש. ניתן לשנות את העדפותיך בכל עת.
                </p>
                <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
                  {LEGAL_LINKS.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="rounded text-[11.5px] font-semibold text-[#1851d8] underline-offset-2 transition hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1f6bff]/45"
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex shrink-0 flex-wrap items-center gap-2 sm:flex-nowrap sm:justify-end">
              <button
                type="button"
                onClick={onRejectNonEssential}
                className="h-9 flex-1 rounded-full px-3 text-[12.5px] font-bold text-slate-600 transition hover:bg-slate-100 hover:text-[#0a1f44] focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 sm:flex-none"
              >
                דחה לא-הכרחיות
              </button>
              <button
                type="button"
                onClick={onOpenSettings}
                className="h-9 flex-1 rounded-full border border-slate-200 bg-white px-3 text-[12.5px] font-bold text-[#0a1f44] transition hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1f6bff]/45 sm:flex-none"
              >
                הגדרות עוגיות
              </button>
              <button
                type="button"
                onClick={onAcceptAll}
                className="h-9 flex-1 rounded-full bg-[#1f6bff] px-4 text-[12.5px] font-extrabold text-white shadow-[0_10px_24px_-10px_rgba(31,107,255,0.7)] transition hover:bg-[#1851d8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1f6bff]/50 focus-visible:ring-offset-2 sm:flex-none"
              >
                קבל הכל
              </button>
            </div>
          </div>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}
