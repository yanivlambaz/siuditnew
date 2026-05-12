"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, X, Phone } from "lucide-react";
import Button from "../ui/Button";
import { dispatchSiuditFloatingCta } from "../../lib/siuditUiEvents";
import { buildTelHrefClient } from "./contactHref";

const spring = { type: "spring", damping: 24, stiffness: 300 };

export default function ScrollFloatingLeadCta({ visible, onDismiss, onCta, whatsappHref, telHref }) {
  const phoneHref = telHref ?? buildTelHrefClient();
  useEffect(() => {
    dispatchSiuditFloatingCta(!!visible);
  }, [visible]);

  useEffect(() => () => dispatchSiuditFloatingCta(false), []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="float-cta"
          initial={{ opacity: 0, y: 28, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.96 }}
          transition={spring}
          className={[
            "fixed right-4 left-auto z-[65] w-[min(380px,calc(100vw-2rem))] sm:right-6",
            "max-lg:bottom-[calc(5.5rem+env(safe-area-inset-bottom,0px)+var(--cities-sticky-h,0px))]",
            "lg:bottom-[max(1.25rem,env(safe-area-inset-bottom,0px)+var(--cities-sticky-h,0px))]",
          ].join(" ")}
        >
          <div className="relative overflow-hidden rounded-2xl border border-white/50 bg-white/88 p-4 shadow-[0_24px_60px_-24px_rgba(10,31,68,0.35)] ring-1 ring-[#1f6bff]/10 backdrop-blur-2xl">
            <button
              type="button"
              aria-label="סגירה"
              onClick={onDismiss}
              className="absolute end-2.5 top-2.5 grid h-8 w-8 place-items-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            >
              <X className="h-4 w-4" strokeWidth={2.5} />
            </button>
            <p className="pe-8 text-[15px] font-extrabold leading-snug text-[#0a1f44]">צריכים אחות פרטית היום?</p>
            <p className="mt-1 text-[12.5px] font-medium text-slate-500">מענה מקצועי תוך דקות · 24/7</p>
            <div className="mt-3 flex flex-col gap-2">
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button as="a" href={phoneHref} variant="primary" size="md" className="w-full sm:flex-1">
                  <Phone className="h-4 w-4" strokeWidth={2.4} />
                  חייגו עכשיו
                </Button>
                <Button as="a" href={whatsappHref} target="_blank" rel="noreferrer" variant="gradient" size="md" className="w-full sm:flex-1">
                  WhatsApp מיידי
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover/btn:-translate-x-0.5" />
                </Button>
              </div>
              <Button type="button" variant="secondary" size="md" className="w-full" onClick={onCta}>
                טופס קצר
              </Button>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
