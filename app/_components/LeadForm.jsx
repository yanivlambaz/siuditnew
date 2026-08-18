"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Loader2, AlertCircle, Sparkles } from "lucide-react";
import { FloatingInput } from "./ui/Input";
import Button from "./ui/Button";
import FormPrivacyNote from "./legal/FormPrivacyNote";
import { submitLead } from "../lib/submitLead";

const easing = [0.22, 1, 0.36, 1];

export default function LeadForm({ defaultCity = "" }) {
  const [status, setStatus] = useState({ state: "idle" });
  const [shakeKey, setShakeKey] = useState(0);

  async function onSubmit(e) {
    e.preventDefault();
    if (status.state === "loading") return;

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    if (!data.name || !data.phone || !data.city) {
      setStatus({ state: "err", message: "אנא מלאו את כל השדות" });
      setShakeKey((k) => k + 1);
      return;
    }

    setStatus({ state: "loading" });
    try {
      const res = await submitLead(data);
      const json = await res.json().catch(() => null);
      if (!res.ok) throw new Error(json?.error || "שליחה נכשלה. נסו שוב בעוד רגע.");
      form.reset();
      setStatus({
        state: "ok",
        message: "קיבלנו את הפרטים. נחזור אליכם תוך דקות.",
      });
    } catch (err) {
      setStatus({
        state: "err",
        message: err?.message || "שליחה נכשלה. נסו שוב בעוד רגע.",
      });
      setShakeKey((k) => k + 1);
    }
  }

  const loading = status.state === "loading";

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {status.state === "ok" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.94, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: -8 }}
            transition={{ duration: 0.5, ease: easing }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-50 via-white to-white p-7 ring-1 ring-emerald-200/70 shadow-[0_18px_40px_-22px_rgba(16,185,129,0.4)]"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -top-20 -end-20 h-44 w-44 rounded-full bg-emerald-200/40 blur-3xl"
            />
            <div className="relative">
              <SuccessCheck />
              <h3 className="mt-5 text-[20px] font-extrabold tracking-tight text-[#0a1f44]">
                קיבלנו את הפרטים
              </h3>
              <p className="mt-1.5 text-[14px] leading-[1.65] text-slate-600">
                {status.message}
              </p>
              <div className="mt-5 flex items-center gap-2 rounded-2xl bg-white/80 p-3 ring-1 ring-emerald-100">
                <Sparkles className="h-4 w-4 text-emerald-600" strokeWidth={2.4} />
                <span className="text-[12.5px] font-semibold text-slate-700">
                  בינתיים — שמרו את המספר שלנו אצלכם בנייד
                </span>
              </div>
              <button
                type="button"
                onClick={() => setStatus({ state: "idle" })}
                className="mt-4 text-[12.5px] font-bold text-slate-500 underline-offset-4 transition hover:text-[#0a1f44] hover:underline"
              >
                שליחת פנייה נוספת
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key={`form-${shakeKey}`}
            onSubmit={onSubmit}
            noValidate
            initial={shakeKey > 0 ? { x: 0 } : { opacity: 0 }}
            animate={
              shakeKey > 0
                ? { x: [0, -10, 10, -8, 8, -4, 4, 0] }
                : { opacity: 1 }
            }
            transition={
              shakeKey > 0
                ? { duration: 0.55, ease: "easeInOut" }
                : { duration: 0.4, ease: easing }
            }
            className="space-y-4"
          >
            <FloatingInput
              id="name"
              name="name"
              label="שם מלא"
              autoComplete="name"
              required
            />
            <FloatingInput
              id="phone"
              name="phone"
              label="טלפון"
              inputMode="tel"
              autoComplete="tel"
              required
            />
            <FloatingInput
              id="city"
              name="city"
              label="עיר"
              autoComplete="address-level2"
              defaultValue={defaultCity}
              required
            />

            <input type="hidden" name="serviceType" defaultValue="בית" />

            <Button
              type="submit"
              size="lg"
              variant="gradient"
              disabled={loading}
              className="mt-2 w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  שולח...
                </>
              ) : (
                <>
                  קבלו אחות עכשיו
                  <ArrowLeft className="h-5 w-5 transition-transform group-hover/btn:-translate-x-1" />
                </>
              )}
            </Button>

            <p className="text-center text-[12.5px] font-medium text-slate-500">
              חוזרים תוך דקות · ללא התחייבות · שיחה דיסקרטית
            </p>

            <FormPrivacyNote />

            <AnimatePresence>
              {status.state === "err" ? (
                <motion.div
                  key="err"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="flex items-start gap-3 rounded-2xl border border-rose-200/70 bg-rose-50/80 px-4 py-3 text-[14px] font-semibold text-rose-900"
                >
                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-600" />
                  <span>{status.message}</span>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function SuccessCheck() {
  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.55, ease: easing }}
      className="relative h-14 w-14"
    >
      <span className="absolute inset-0 rounded-full bg-emerald-100" />
      <span className="absolute inset-1.5 rounded-full bg-emerald-200/80" />
      <span className="absolute inset-2.5 grid place-items-center rounded-full bg-emerald-500 text-white shadow-[0_18px_30px_-12px_rgba(16,185,129,0.6)]">
        <motion.svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-5 w-5"
          stroke="currentColor"
          strokeWidth="3.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <motion.path
            d="m20 6-11 11-5-5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, ease: easing, delay: 0.18 }}
          />
        </motion.svg>
      </span>
    </motion.div>
  );
}
