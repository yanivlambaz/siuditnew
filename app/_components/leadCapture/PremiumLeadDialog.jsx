"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ArrowLeft,
  Phone,
  MessageCircle,
  Loader2,
  AlertCircle,
  ShieldCheck,
  Clock,
  Sparkles,
} from "lucide-react";
import { FloatingInput } from "../ui/Input";
import Button from "../ui/Button";
import FormPrivacyNote from "../legal/FormPrivacyNote";
import { dispatchSiuditOverlay } from "../../lib/siuditUiEvents";
import { submitLead } from "../../lib/submitLead";

const spring = { type: "spring", damping: 26, stiffness: 320 };
const ease = [0.22, 1, 0.36, 1];

const COPY = {
  welcome: {
    eyebrow: "סיעודית",
    title: "זקוקים לאחות פרטית במהירות?",
    subtitle:
      "אחיות ואחים מוסמכים זמינים 24/7 לבתי חולים, טיפול ביתי והתאוששות לאחר ניתוח",
    reassurance: "נחזור אליכם תוך דקות",
    urgency: "זמינות מיידית · רישוי משרד הבריאות · ללא התחייבות",
    telLabel: "חייגו עכשיו",
    waLabel: "WhatsApp מיידי",
  },
  exit: {
    eyebrow: "עצירה נעימה",
    title: "רגע לפני שיוצאים...",
    subtitle: "ניתן לקבל התאמה מהירה לאחות פרטית ללא התחייבות",
    reassurance: "שיחת ייעוץ קצרה — בהתאם לצורך הרפואי",
    urgency: "זמינות מיידית באזורים רבים בארץ",
    telLabel: "חייגו עכשיו",
    waLabel: "WhatsApp מיידי",
  },
  blog: {
    eyebrow: "מענה אנושי",
    title: "צריכים אחות פרטית? דברו איתנו עכשיו",
    subtitle: "נחזור אליכם במהירות — התאמה למצב, לשעות ולמרחב שבו אתם נמצאים.",
    reassurance: "רישוי מלא · שקט נפשי למשפחה",
    urgency: "",
    telLabel: "חייגו עכשיו",
    waLabel: "WhatsApp מיידי",
  },
};

export default function PremiumLeadDialog({
  open,
  onClose,
  kind = "welcome",
  whatsappHref,
  telHref,
  /** @type {{ source?: string }} */
  leadMeta = {},
}) {
  const cfg = COPY[kind] || COPY.welcome;
  const wa = whatsappHref;
  const tel = telHref;
  const [showForm, setShowForm] = useState(false);
  const [status, setStatus] = useState({ state: "idle" });
  const [shakeKey, setShakeKey] = useState(0);
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
    dispatchSiuditOverlay(!!open, "premium-lead-dialog");
  }, [open]);

  useEffect(() => () => dispatchSiuditOverlay(false, "premium-lead-dialog-unmount"), []);

  useEffect(() => {
    if (open) {
      setShowForm(false);
      setStatus({ state: "idle" });
    }
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
      const res = await submitLead({
        ...data,
        source: leadMeta.source || `premium-${kind}`,
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

  const blogLayout = kind === "blog";

  return (
    <AnimatePresence mode="wait">
      {open ? (
        <motion.div
          key={`dlg-${kind}`}
          className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center sm:px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease }}
          aria-modal="true"
          role="dialog"
          aria-labelledby={`lead-dialog-title-${kind}`}
        >
          <motion.button
            type="button"
            aria-label="סגירה"
            onClick={onClose}
            className="absolute inset-0 bg-[#04122e]/45 backdrop-blur-[14px] transition-opacity"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            initial={{ opacity: 0, y: blogLayout ? 32 : 16, scale: blogLayout ? 0.96 : 0.94 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, y: blogLayout ? 24 : 12, scale: 0.96 }}
            transition={spring}
            className={[
              "relative z-10 w-full max-w-lg overflow-hidden shadow-[0_40px_100px_-35px_rgba(10,31,68,0.45)]",
              "border border-white/55 ring-1 ring-white/25",
              "bg-gradient-to-b from-white/92 to-white/[0.88] backdrop-blur-2xl supports-[backdrop-filter]:bg-white/78",
              blogLayout
                ? "rounded-t-[1.75rem] sm:rounded-[2rem] max-sm:max-h-[min(88vh,720px)] max-sm:overflow-y-auto"
                : "rounded-[1.75rem] sm:rounded-[2rem] max-h-[min(92vh,800px)] overflow-y-auto",
            ].join(" ")}
          >
            <button
              type="button"
              aria-label="סגירה"
              onClick={onClose}
              className="absolute end-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full bg-[#0a1f44]/8 text-[#0a1f44] ring-1 ring-[#0a1f44]/10 transition hover:bg-[#0a1f44]/12"
            >
              <X className="h-5 w-5" strokeWidth={2.2} />
            </button>

            <div className="relative px-6 pb-6 pt-8 sm:px-9 sm:pb-8 sm:pt-9">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.35]"
                style={{
                  backgroundImage:
                    "radial-gradient(520px circle at 100% 0%, rgba(95,209,240,0.22), transparent 55%), radial-gradient(480px circle at 0% 100%, rgba(31,107,255,0.18), transparent 50%)",
                }}
              />

              <div className="relative space-y-4">
                <p className="inline-flex items-center gap-2 rounded-full bg-[#0a1f44]/[0.06] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#1851d8] ring-1 ring-[#1f6bff]/15">
                  <Sparkles className="h-3.5 w-3.5 text-[#1f6bff]" />
                  {cfg.eyebrow}
                </p>
                <h2
                  id={`lead-dialog-title-${kind}`}
                  className="text-balance pe-8 text-[22px] font-extrabold leading-[1.15] tracking-tight text-[#0a1f44] sm:text-[26px]"
                >
                  {cfg.title}
                </h2>
                <p className="max-w-md text-pretty text-[15px] leading-[1.7] text-slate-600">{cfg.subtitle}</p>
                {cfg.reassurance ? (
                  <p className="flex items-center gap-2 text-[13.5px] font-semibold text-emerald-700/95">
                    <Clock className="h-4 w-4 shrink-0" strokeWidth={2.2} />
                    {cfg.reassurance}
                  </p>
                ) : null}
                {cfg.urgency ? (
                  <p className="text-[12.5px] font-medium text-slate-500">{cfg.urgency}</p>
                ) : null}

                <div className="flex flex-col gap-2.5 pt-1 sm:flex-row sm:flex-wrap">
                  <Button as="a" href={tel} variant="gradient" size="lg" className="min-h-[52px] w-full sm:flex-1">
                    <Phone className="h-5 w-5" strokeWidth={2.3} />
                    {cfg.telLabel}
                    <ArrowLeft className="h-5 w-5 opacity-80 transition-transform group-hover/btn:-translate-x-0.5" />
                  </Button>
                  <Button
                    as="a"
                    href={wa}
                    target="_blank"
                    rel="noreferrer"
                    variant="secondary"
                    size="lg"
                    className="min-h-[52px] w-full sm:flex-1"
                  >
                    <MessageCircle className="h-5 w-5 text-[#128C7E]" strokeWidth={2.2} />
                    {cfg.waLabel}
                  </Button>
                </div>

                <p className="text-center text-[12px] font-medium leading-snug text-slate-500">
                  מענה אנושי מיידי — אפשר לבחור טלפון או WhatsApp, לפי מה שנוח לכם עכשיו.
                </p>

                <div className="flex items-center gap-3 rounded-2xl bg-slate-50/90 px-4 py-3 ring-1 ring-slate-200/80">
                  <ShieldCheck className="h-8 w-8 shrink-0 text-[#1f6bff]" strokeWidth={2} />
                  <p className="text-[12.5px] leading-snug text-slate-600">
                    אחיות מוסמכות משרד הבריאות · התאמה אישית · דיסקרטיות מלאה
                  </p>
                </div>

                <div className="border-t border-slate-200/80 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowForm((v) => !v)}
                    className="text-[13px] font-bold text-[#1f6bff] underline-offset-4 hover:underline"
                  >
                    {showForm ? "סגירת טופס" : "או השאירו פרטים — נחזור אליכם"}
                  </button>
                  <AnimatePresence initial={false}>
                    {showForm ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease }}
                        className="overflow-hidden"
                      >
                        <motion.div
                          key={`form-wrap-${shakeKey}`}
                          initial={shakeKey > 0 ? { x: 0 } : undefined}
                          animate={shakeKey > 0 ? { x: [0, -8, 8, -6, 6, 0] } : undefined}
                          transition={{ duration: 0.45 }}
                        >
                        <form
                          onSubmit={onSubmit}
                          className="mt-4 space-y-3"
                          noValidate
                        >
                          <FloatingInput id={`${kind}-name`} name="name" label="שם מלא" autoComplete="name" required />
                          <FloatingInput
                            id={`${kind}-phone`}
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
                            variant="primary"
                            size="md"
                            disabled={status.state === "loading"}
                            className="w-full"
                          >
                            {status.state === "loading" ? (
                              <>
                                <Loader2 className="h-5 w-5 animate-spin" />
                                שולחים...
                              </>
                            ) : (
                              "שליחת פרטים"
                            )}
                          </Button>
                          {status.state === "ok" ? (
                            <p className="text-center text-[13px] font-semibold text-emerald-700">קיבלנו — נחזור בהקדם.</p>
                          ) : null}
                          {status.state === "err" ? (
                            <div className="flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50/90 px-3 py-2 text-[13px] font-semibold text-rose-900">
                              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                              {status.message}
                            </div>
                          ) : null}
                          <FormPrivacyNote />
                        </form>
                        </motion.div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
