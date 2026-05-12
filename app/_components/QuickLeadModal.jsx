"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ArrowLeft,
  Phone,
  MessageCircle,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Clock,
  Sparkles,
} from "lucide-react";
import { FloatingInput } from "./ui/Input";
import Button from "./ui/Button";
import { dispatchSiuditOverlay } from "../lib/siuditUiEvents";
import { buildTelHrefClient, buildWhatsappHrefClient } from "./leadCapture/contactHref";

const easing = [0.22, 1, 0.36, 1];

export default function QuickLeadModal({
  open,
  onClose,
  eyebrow = "זמינות מוגבלת",
  title = "קבלו אחות תוך שעות",
  subtitle = "השאירו טלפון — נחזור אליכם תוך דקות עם זמינות והתאמה אישית.",
  ctaLabel = "קבלו שיחה תוך דקות",
}) {
  const telHref = buildTelHrefClient();
  const waHref = buildWhatsappHrefClient();
  const [status, setStatus] = useState({ state: "idle" });
  const [shakeKey, setShakeKey] = useState(0);
  const formRef = useRef(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open || typeof document === "undefined") return;
    const onKey = (e) => {
      if (e.key === "Escape") onCloseRef.current?.();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    dispatchSiuditOverlay(!!open, "quick-lead-modal");
  }, [open]);

  useEffect(() => () => dispatchSiuditOverlay(false, "quick-lead-modal-unmount"), []);

  useEffect(() => {
    if (open) setStatus({ state: "idle" });
  }, [open]);

  async function onSubmit(e) {
    e.preventDefault();
    if (status.state === "loading") return;

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    if (!data.name || !data.phone) {
      setStatus({ state: "err", message: "נא למלא שם וטלפון" });
      setShakeKey((k) => k + 1);
      return;
    }

    setStatus({ state: "loading" });
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: "popup" }),
      });
      const json = await res.json().catch(() => null);
      if (!res.ok) throw new Error(json?.error || "שליחה נכשלה. נסו שוב.");
      setStatus({ state: "ok" });
      form.reset();
    } catch (err) {
      setStatus({ state: "err", message: err?.message || "שליחה נכשלה" });
      setShakeKey((k) => k + 1);
    }
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="modal-root"
          className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: easing }}
          aria-modal="true"
          role="dialog"
        >
          <motion.button
            type="button"
            aria-label="סגירה"
            onClick={onClose}
            className="absolute inset-0 bg-[#04122e]/55 backdrop-blur-md"
          />

          <motion.div
            key="modal-card"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ duration: 0.45, ease: easing }}
            className="relative z-10 mx-3 w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-[0_40px_100px_-30px_rgba(15,23,42,0.4)] ring-1 ring-slate-200/70 sm:mx-0"
          >
            <div className="relative overflow-hidden bg-[#04122e] px-6 py-7 sm:px-8 sm:py-8">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-90"
                style={{
                  backgroundImage:
                    "radial-gradient(500px circle at 0% 0%, rgba(95,209,240,0.4), transparent 55%), radial-gradient(450px circle at 100% 100%, rgba(31,107,255,0.45), transparent 55%)",
                }}
              />
              <div className="pointer-events-none absolute inset-0 bg-noise opacity-40" />

              <button
                type="button"
                aria-label="סגירה"
                onClick={onClose}
                className="absolute end-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/20 backdrop-blur transition hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="relative">
                <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-white/95 ring-1 ring-white/20 backdrop-blur">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </span>
                  {eyebrow}
                </p>
                <h2 className="mt-4 text-balance text-[24px] font-extrabold leading-tight tracking-tight text-white sm:text-[28px]">
                  {title}
                </h2>
                <p className="mt-2 text-pretty text-[14px] leading-[1.6] text-slate-300">
                  {subtitle}
                </p>
              </div>
            </div>

            <div className="relative px-6 py-7 sm:px-8 sm:py-8">
              <div className="mb-5 flex flex-col gap-2 sm:flex-row">
                <Button as="a" href={telHref} variant="primary" size="md" className="w-full sm:flex-1">
                  <Phone className="h-4 w-4" strokeWidth={2.4} />
                  חייגו עכשיו
                </Button>
                <Button
                  as="a"
                  href={waHref}
                  target="_blank"
                  rel="noreferrer"
                  variant="secondary"
                  size="md"
                  className="w-full sm:flex-1"
                >
                  <MessageCircle className="h-4 w-4 text-[#128C7E]" strokeWidth={2.2} />
                  WhatsApp מיידי
                </Button>
              </div>
              <p className="mb-6 text-center text-[12px] font-medium leading-snug text-slate-500">
                מענה אנושי 24/7 — גם בלי טופס, אם עדיף שיחה קצרה או הודעה.
              </p>
              <AnimatePresence mode="wait">
                {status.state === "ok" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5, ease: easing }}
                    className="text-center"
                  >
                    <SuccessCheck />
                    <h3 className="mt-5 text-[20px] font-extrabold tracking-tight text-[#0a1f44]">
                      קיבלנו את הפרטים
                    </h3>
                    <p className="mt-2 text-[14.5px] text-slate-600">
                      נחזור אליכם תוך דקות עם זמינות והתאמה למצב הרפואי.
                    </p>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={onClose}
                      className="mt-6"
                    >
                      סגור
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form
                    key={`form-${shakeKey}`}
                    ref={formRef}
                    onSubmit={onSubmit}
                    initial={
                      shakeKey > 0
                        ? { x: 0 }
                        : { opacity: 0, y: 8 }
                    }
                    animate={
                      shakeKey > 0
                        ? { x: [0, -10, 10, -8, 8, -4, 4, 0] }
                        : { opacity: 1, y: 0 }
                    }
                    transition={
                      shakeKey > 0
                        ? { duration: 0.55, ease: "easeInOut" }
                        : { duration: 0.4, ease: easing }
                    }
                    noValidate
                    className="space-y-3.5"
                  >
                    <FloatingInput
                      id="popup-name"
                      name="name"
                      label="שם מלא"
                      autoComplete="name"
                      required
                    />
                    <FloatingInput
                      id="popup-phone"
                      name="phone"
                      label="טלפון"
                      inputMode="tel"
                      autoComplete="tel"
                      required
                    />

                    <input type="hidden" name="city" defaultValue="לא צוין" />
                    <input type="hidden" name="serviceType" defaultValue="בית" />

                    <Button
                      type="submit"
                      variant="gradient"
                      size="lg"
                      disabled={status.state === "loading"}
                      className="mt-2 w-full"
                    >
                      {status.state === "loading" ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          שולח...
                        </>
                      ) : (
                        <>
                          {ctaLabel}
                          <ArrowLeft className="h-5 w-5 transition-transform group-hover/btn:-translate-x-1" />
                        </>
                      )}
                    </Button>

                    {status.state === "err" ? (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-start gap-2.5 rounded-xl border border-rose-200/70 bg-rose-50/80 px-3.5 py-2.5 text-[13px] font-semibold text-rose-900"
                      >
                        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" />
                        <span>{status.message}</span>
                      </motion.div>
                    ) : null}

                    <ul className="grid grid-cols-3 gap-2 pt-3">
                      <Trustlet icon={ShieldCheck} label="מוסמכות" />
                      <Trustlet icon={Clock} label="תוך שעות" />
                      <Trustlet icon={Sparkles} label="אישית" />
                    </ul>

                    <p className="pt-1 text-center text-[11.5px] font-medium text-slate-500">
                      <Phone className="ms-0.5 inline h-3 w-3 align-[-1px]" /> חוזרים תוך דקות · ללא התחייבות
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function Trustlet({ icon: Icon, label }) {
  return (
    <li className="flex flex-col items-center gap-1 rounded-xl bg-slate-50 px-2 py-2.5 ring-1 ring-slate-100">
      <Icon className="h-3.5 w-3.5 text-[#1f6bff]" strokeWidth={2.4} />
      <span className="text-[10.5px] font-bold text-slate-700">{label}</span>
    </li>
  );
}

function SuccessCheck() {
  return (
    <motion.div
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: easing }}
      className="relative mx-auto h-16 w-16"
    >
      <span className="absolute inset-0 rounded-full bg-emerald-100" />
      <span className="absolute inset-2 rounded-full bg-emerald-200/80" />
      <span className="absolute inset-3 grid place-items-center rounded-full bg-emerald-500 text-white shadow-[0_18px_30px_-12px_rgba(16,185,129,0.6)]">
        <motion.svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-6 w-6"
          stroke="currentColor"
          strokeWidth="3.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <motion.path
            d="m20 6-11 11-5-5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, ease: easing, delay: 0.15 }}
          />
        </motion.svg>
      </span>
    </motion.div>
  );
}
