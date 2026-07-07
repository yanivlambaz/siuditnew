"use client";

import { useEffect, useId, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { X, ShieldCheck, BarChart3, Megaphone } from "lucide-react";

const CATEGORIES = [
  {
    key: "necessary",
    icon: ShieldCheck,
    title: "עוגיות הכרחיות",
    desc: "נדרשות לתפקוד הבסיסי של האתר, לאבטחה ולשמירת העדפת הפרטיות שלך. פעילות תמיד.",
    locked: true,
  },
  {
    key: "analytics",
    icon: BarChart3,
    title: "עוגיות אנליטיקה",
    desc: "עוזרות לנו להבין כיצד נעשה שימוש באתר (למשל דרך Google Analytics) כדי לשפר את הביצועים והתוכן.",
    locked: false,
  },
  {
    key: "marketing",
    icon: Megaphone,
    title: "עוגיות שיווק",
    desc: "משמשות למדידת קמפיינים ולהתאמת פרסום (למשל Google ו-Meta) בכפוף להסכמתך.",
    locked: false,
  },
];

/**
 * Accessible cookie settings dialog: focus trap, ESC to close, ARIA, focus
 * restoration to the triggering element. Lazy-loaded by the manager.
 */
export default function CookieSettingsDialog({
  initialPrefs,
  onClose,
  onSave,
  onAcceptAll,
  onRejectNonEssential,
}) {
  const reduceMotion = useReducedMotion();
  const titleId = useId();
  const descId = useId();
  const panelRef = useRef(null);
  const previouslyFocused = useRef(null);

  const [prefs, setPrefs] = useState({
    analytics: !!initialPrefs?.analytics,
    marketing: !!initialPrefs?.marketing,
  });

  useEffect(() => {
    previouslyFocused.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const panel = panelRef.current;
    const focusables = panel?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    focusables?.[0]?.focus();

    function onKeyDown(e) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const items = panel.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
      previouslyFocused.current?.focus?.();
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[95] flex items-end justify-center sm:items-center sm:p-4">
      <button
        type="button"
        aria-label="סגירה"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 bg-[#04122e]/45 backdrop-blur-[6px]"
      />
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0.01 : 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-white p-5 shadow-[0_40px_100px_-35px_rgba(10,31,68,0.5)] ring-1 ring-slate-200/80 sm:rounded-3xl sm:p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id={titleId} className="text-[18px] font-extrabold tracking-tight text-[#0a1f44]">
              הגדרות עוגיות
            </h2>
            <p id={descId} className="mt-1 text-[12.5px] leading-relaxed text-slate-600">
              בחר אילו עוגיות אופציונליות מותר לאתר להפעיל. ניתן לשנות זאת בכל עת.
            </p>
          </div>
          <button
            type="button"
            aria-label="סגירה"
            onClick={onClose}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-[#0a1f44] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1f6bff]/45"
          >
            <X className="h-[18px] w-[18px]" strokeWidth={2.2} />
          </button>
        </div>

        <div className="mt-4 space-y-2.5">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const checked = cat.locked ? true : prefs[cat.key];
            return (
              <div
                key={cat.key}
                className="flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/60 p-3.5"
              >
                <span
                  aria-hidden
                  className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-white text-[#1851d8] ring-1 ring-slate-200"
                >
                  <Icon className="h-4 w-4" strokeWidth={2.2} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[14px] font-bold text-[#0a1f44]">{cat.title}</span>
                    {cat.locked ? (
                      <span className="shrink-0 rounded-full bg-slate-200/70 px-2.5 py-1 text-[10.5px] font-bold text-slate-500">
                        פעיל תמיד
                      </span>
                    ) : (
                      <label className="relative inline-flex shrink-0 cursor-pointer items-center">
                        <input
                          type="checkbox"
                          className="peer sr-only"
                          checked={checked}
                          onChange={(e) =>
                            setPrefs((p) => ({ ...p, [cat.key]: e.target.checked }))
                          }
                          aria-label={cat.title}
                        />
                        <span className="h-6 w-11 rounded-full bg-slate-300 transition peer-checked:bg-[#1f6bff] peer-focus-visible:ring-2 peer-focus-visible:ring-[#1f6bff]/45 peer-focus-visible:ring-offset-2" />
                        <span className="absolute start-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform peer-checked:translate-x-[-20px]" />
                      </label>
                    )}
                  </div>
                  <p className="mt-1 text-[12px] leading-relaxed text-slate-600">{cat.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-5 flex flex-col gap-2 sm:flex-row-reverse sm:items-center">
          <button
            type="button"
            onClick={() => onSave(prefs)}
            className="h-10 w-full rounded-full bg-[#1f6bff] px-5 text-[13px] font-extrabold text-white shadow-[0_12px_28px_-12px_rgba(31,107,255,0.7)] transition hover:bg-[#1851d8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1f6bff]/50 focus-visible:ring-offset-2 sm:w-auto"
          >
            שמור העדפות
          </button>
          <button
            type="button"
            onClick={onAcceptAll}
            className="h-10 w-full rounded-full border border-slate-200 bg-white px-5 text-[13px] font-bold text-[#0a1f44] transition hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1f6bff]/45 sm:w-auto"
          >
            קבל הכל
          </button>
          <button
            type="button"
            onClick={onRejectNonEssential}
            className="h-10 w-full rounded-full px-5 text-[13px] font-bold text-slate-600 transition hover:bg-slate-100 hover:text-[#0a1f44] focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 sm:me-auto sm:w-auto"
          >
            דחה לא-הכרחיות
          </button>
        </div>
      </motion.div>
    </div>
  );
}
