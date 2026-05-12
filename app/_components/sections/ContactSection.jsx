"use client";

import { motion } from "framer-motion";
import { Sparkles, ShieldCheck, Clock, MapPin, BadgeCheck, Landmark, Phone, MessageCircle } from "lucide-react";
import Container from "../ui/Container";
import LeadForm from "../LeadForm";
import { ContactPanelArt } from "../illustrations/Scenes";
import Button from "../ui/Button";
import { buildTelHrefClient, buildWhatsappHrefClient } from "../leadCapture/contactHref";
import {
  ORG_ADDRESS_DISPLAY,
  ORG_EMAIL,
  ORG_LEGAL_NAME,
  ORG_PHONE_DISPLAY,
  ORG_PLACEMENT_LICENSE_NO,
  ORG_PLACEMENT_LICENSE_URL,
} from "../../lib/orgInfo";

const easing = [0.22, 1, 0.36, 1];

const HIGHLIGHTS = [
  { icon: BadgeCheck, label: "אחיות עם רישיון תקף ושיבוץ מתאים" },
  { icon: Clock, label: "חזרה מהירה · זמינות סביב השעון" },
  { icon: MapPin, label: "תיאום בפריסה ארצית" },
  { icon: ShieldCheck, label: "שקיפות: מה כן ומה לא נכלל" },
];

export default function ContactSection({ defaultCity = "" }) {
  const telHref = buildTelHrefClient();
  const waHref = buildWhatsappHrefClient();
  return (
    <section id="contact" className="relative scroll-mt-nav overflow-hidden py-20 sm:py-[5.5rem] md:py-[6.75rem]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-white via-[#f7f9fc] to-white" />
        <div className="absolute right-1/2 top-1/2 h-[700px] w-[900px] -translate-y-1/2 translate-x-1/2 rounded-full bg-gradient-to-br from-[#dbeafe]/50 via-[#cdf3ff]/40 to-transparent blur-3xl" />
      </div>

      <Container size="wide">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: easing }}
          className="relative mx-auto max-w-5xl"
        >
          <div className="absolute -inset-6 -z-10 rounded-[3rem] bg-gradient-to-br from-[#1f6bff]/15 via-[#5fd1f0]/15 to-transparent blur-3xl" />

          <div className="overflow-hidden rounded-[32px] bg-white shadow-[0_30px_80px_-25px_rgba(15,23,42,0.25)] ring-1 ring-slate-200/70">
            <div className="grid grid-cols-1 lg:grid-cols-5">
              <div className="relative overflow-hidden bg-[#0a1f44] p-9 sm:p-12 lg:col-span-3">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-90"
                  style={{
                    backgroundImage:
                      "radial-gradient(700px circle at 0% 0%, rgba(95,209,240,0.35), transparent 55%), radial-gradient(600px circle at 100% 100%, rgba(31,107,255,0.4), transparent 55%)",
                  }}
                />
                <div className="pointer-events-none absolute inset-0 bg-noise opacity-40" />
                <div
                  aria-hidden
                  className="pointer-events-none absolute -bottom-10 -end-10 h-72 w-72 opacity-60 sm:h-80 sm:w-80"
                >
                  <ContactPanelArt />
                </div>

                <div className="relative">
                  <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-[11.5px] font-bold uppercase tracking-[0.18em] text-white/95 ring-1 ring-white/20 backdrop-blur">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                    זמינים עכשיו · חוזרים תוך דקות
                  </p>
                  <h2 className="mt-7 text-balance text-[32px] font-extrabold leading-[1.08] tracking-tight text-white sm:text-[42px]">
                    שיחה קצרה — לפני שהלילה נהיה עמוס מדי
                  </h2>
                  <p className="mt-5 max-w-md text-pretty text-[16px] leading-[1.72] text-slate-300">
                    כתבו עיר, טלפון ומה קורה בבית — נחזור עם אפשרויות זמן ושאלות המשך קצרות. אין התחייבות לפני שתבינו בדיוק מה אתם מזמינים.
                  </p>

                  <div className="mt-8 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
                    <Button as="a" href={telHref} variant="primary" size="md" className="w-full bg-white text-[#0a1f44] shadow-none hover:bg-slate-100 sm:w-auto">
                      <Phone className="h-4 w-4 text-[#1f6bff]" strokeWidth={2.4} />
                      חייגו עכשיו · {ORG_PHONE_DISPLAY}
                    </Button>
                    <Button
                      as="a"
                      href={waHref}
                      target="_blank"
                      rel="noreferrer"
                      variant="secondary"
                      size="md"
                      className="w-full border-white/30 bg-white/10 text-white hover:bg-white/16 sm:w-auto"
                    >
                      <MessageCircle className="h-4 w-4 text-emerald-200" strokeWidth={2.2} />
                      WhatsApp מיידי
                    </Button>
                  </div>
                  <p className="mt-3 max-w-md text-[12.5px] font-medium leading-relaxed text-slate-400">
                    מענה אנושי 24/7 · זמינות גבוהה · תגובה מהירה בדרך שנוחה לכם — בלי לחץ ובלי התחייבות לפני הבנה מלאה.
                  </p>

                  <ul className="mt-10 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {HIGHLIGHTS.map((h) => (
                      <li
                        key={h.label}
                        className="flex items-center gap-3 rounded-2xl bg-white/[0.06] px-4 py-3 ring-1 ring-white/10"
                      >
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/10 text-cyan-200">
                          <h.icon className="h-4 w-4" strokeWidth={2.4} />
                        </span>
                        <span className="text-[13.5px] font-semibold text-white">
                          {h.label}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-10 rounded-2xl bg-white/[0.06] p-4 ring-1 ring-white/10">
                    <div className="flex items-start gap-3">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/10 text-emerald-200">
                        <Landmark className="h-4 w-4" strokeWidth={2.4} />
                      </span>
                      <div className="min-w-0 text-[12.5px] leading-relaxed">
                        <div className="font-bold text-white">{ORG_LEGAL_NAME}</div>
                        <p className="mt-1 text-slate-300">{ORG_ADDRESS_DISPLAY}</p>
                        <p className="mt-2 text-slate-300">
                          <a href={`mailto:${ORG_EMAIL}`} className="font-semibold text-cyan-200 hover:text-white">
                            {ORG_EMAIL}
                          </a>
                        </p>
                        <p className="mt-3 text-[12px] text-slate-400">
                          רישיון לשכה פרטית (השמה), משרד העבודה · מס׳ {ORG_PLACEMENT_LICENSE_NO}.{" "}
                          <a
                            href={ORG_PLACEMENT_LICENSE_URL}
                            className="font-semibold text-cyan-200 underline-offset-2 hover:text-white hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            צפייה ברישיון
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative bg-white p-7 sm:p-10 lg:col-span-2">
                <div className="flex items-center gap-2">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-blue-50 text-[#1f6bff] ring-1 ring-blue-100">
                    <Sparkles className="h-4 w-4" strokeWidth={2.4} />
                  </span>
                  <span className="text-[11.5px] font-bold uppercase tracking-[0.16em] text-[#1851d8]">
                    טופס מהיר
                  </span>
                </div>
                <h3 className="mt-3 text-[26px] font-extrabold tracking-tight text-[#0a1f44]">
                  השאירו פרטים
                </h3>
                <p className="mt-1.5 text-[13.5px] font-medium text-slate-500">
                  3 שדות · חוזרים תוך דקות · ללא התחייבות
                </p>
                <div className="mt-7">
                  <LeadForm defaultCity={defaultCity} />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
