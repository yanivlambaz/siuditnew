"use client";

import Image from "next/image";
import {
  ArrowLeft,
  Phone,
  MessageCircle,
  ShieldCheck,
  Clock,
  MapPin,
  Sparkles,
  HeartHandshake,
} from "lucide-react";
import Container from "../ui/Container";
import Button from "../ui/Button";
import { track } from "../../lib/analytics";

/** Official homepage hero photo — professional home nursing care. */
const HERO_IMAGE = "/images/siudit-home-nursing-care.png";

const TRUST_ITEMS = [
  { icon: ShieldCheck, label: "אחים ואחיות מוסמכים" },
  { icon: Clock, label: "זמינות 24/7" },
  { icon: MapPin, label: "שירות בבית ובבית החולים" },
  { icon: Sparkles, label: "התאמה אישית לצורך הרפואי" },
];

/**
 * Hero בכניסה לבית — רכיב לקוח (תאימות מלאה עם Button / Lucide).
 * אנימציות קלות ב־CSS בלבד (animate-rise-*, drift, float-slow) — בלי framer-motion.
 */
export default function Hero({ whatsappHref, telHref }) {
  return (
    <section className="relative isolate min-h-0 overflow-hidden bg-[#f8fafc] pt-8 sm:pt-12">
      <HeroAtmosphere />

      <Container size="wide" className="relative z-[1] pb-16 pt-6 sm:pb-24 sm:pt-10">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div className="flex flex-col justify-center">
            <p className="animate-rise-1 inline-flex max-w-full flex-wrap items-center gap-2 rounded-full border border-slate-200/90 bg-white/90 px-3 py-1.5 text-[11.5px] font-bold text-slate-700 shadow-sm shadow-slate-200/40 backdrop-blur-md sm:text-[12px]">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span>מענה אנושי 24/7</span>
              <span className="hidden text-slate-300 sm:inline">·</span>
              <span className="font-extrabold text-[#1851d8]">התאמה אישית בכל הארץ</span>
            </p>

            <h1 className="animate-rise-2 mt-6 max-w-full text-balance text-[2rem] font-extrabold leading-[1.1] tracking-tight text-[#0a1f44] sm:text-[2.65rem] sm:leading-[1.06] lg:text-[2.85rem] xl:text-[3.1rem]">
              שירות אחיות עד הבית{" "}
              <span className="whitespace-nowrap bg-gradient-to-l from-[#1f6bff] via-[#2563eb] to-[#0ea5e9] bg-clip-text font-black text-transparent [box-decoration-break:clone] [-webkit-box-decoration-break:clone]">
                24/7
              </span>
            </h1>

            <p className="animate-rise-3 mt-6 max-w-xl text-pretty text-[16px] leading-[1.72] text-slate-600 sm:text-[17.5px] sm:leading-[1.75]">
              צריכים אח או אחות פרטיים בבית או בבית החולים? אנו מתאימים לכם איש מקצוע בהתאם למצב
              הרפואי, למיקום ולזמן שבו אתם זקוקים לעזרה.
            </p>

            <p className="animate-rise-3 mt-4 text-[13.5px] font-bold text-[#0a1f44]/80 sm:text-[14.5px]">
              מענה אנושי מהיר • התאמה אישית • שירות בפריסה ארצית. מינימום 8 שעות למשמרת
            </p>

            <ul className="animate-rise-3 mt-7 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-2.5">
              {TRUST_ITEMS.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-2 rounded-2xl border border-slate-200/80 bg-white/80 px-3 py-2.5 text-[12px] font-semibold text-slate-700 shadow-sm shadow-slate-200/30 sm:text-[12.5px]"
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-[#eff6ff] text-[#1f6bff] ring-1 ring-blue-100/80">
                    <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={2.35} aria-hidden />
                  </span>
                  <span className="min-w-0 leading-snug">{label}</span>
                </li>
              ))}
            </ul>

            <div className="animate-rise-4 mt-9 flex flex-col gap-3">
              <Button
                as="a"
                href="#matching"
                variant="gradient"
                size="lg"
                className="w-full min-h-[54px] sm:w-auto sm:min-w-[280px]"
                onClick={() => track("hero_availability_click")}
              >
                בדיקת זמינות אחות באזורכם
                <ArrowLeft className="h-5 w-5 transition-transform group-hover/btn:-translate-x-1" strokeWidth={2.2} />
              </Button>

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <Button
                  as="a"
                  href="#matching"
                  variant="secondary"
                  size="lg"
                  className="w-full min-h-[52px] sm:w-auto"
                  onClick={() => track("hero_personal_matching_click")}
                >
                  התאמת אחות למצב הרפואי
                </Button>
                <a
                  href={telHref}
                  onClick={() => track("phone_click", { location: "hero" })}
                  className="inline-flex items-center justify-center gap-2 rounded-full px-2 py-2 text-[14px] font-extrabold text-[#0a1f44] underline-offset-4 transition hover:text-[#1f6bff] hover:underline"
                >
                  <Phone className="h-[18px] w-[18px] text-[#1f6bff]" strokeWidth={2.4} />
                  חייגו למענה אנושי 24/7
                </a>
              </div>
            </div>

            <p className="animate-rise-5 mt-5 flex items-start gap-2 text-[12px] font-medium leading-relaxed text-slate-500 sm:text-[12.5px]">
              <HeartHandshake className="mt-0.5 h-4 w-4 shrink-0 text-[#1f6bff]/90" strokeWidth={2.2} aria-hidden />
              <span>
                אחים ואחיות מוסמכים · זמינות 24/7 · שירות בבית ובבית החולים · התאמה אישית לצורך הרפואי
              </span>
            </p>
          </div>

          <div className="w-full">
            <HeroMediaPanel whatsappHref={whatsappHref} />
          </div>
        </div>
      </Container>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-24 bg-gradient-to-t from-white via-white/80 to-transparent sm:h-28"
      />
    </section>
  );
}

function HeroAtmosphere() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#f1f5f9] to-[#e8f1ff]/35" />
      <div className="absolute -end-[15%] -top-32 h-[min(85vw,520px)] w-[min(85vw,520px)] animate-drift rounded-full bg-gradient-to-bl from-[#bfdbfe]/50 via-[#dbeafe]/40 to-transparent blur-3xl" />
      <div
        className="absolute -start-[20%] top-1/3 h-[min(70vw,420px)] w-[min(70vw,420px)] animate-drift rounded-full bg-gradient-to-tr from-[#a5f3fc]/25 via-white/50 to-transparent blur-3xl [animation-delay:-6s]"
      />
      <div
        className="absolute inset-0 opacity-[0.45]"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255,255,255,0.95) 0%, transparent 55%)",
        }}
      />
    </div>
  );
}

function HeroMediaPanel({ whatsappHref }) {
  return (
    <div className="relative mx-auto w-full max-w-[540px] lg:mx-0 lg:max-w-none lg:justify-self-end">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-[#1f6bff]/12 via-transparent to-[#5fd1f0]/10 blur-2xl sm:-inset-4 sm:rounded-[2.25rem]"
      />

      <div className="relative">
        <div className="relative mx-auto w-full overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-slate-100 to-[#e8f1ff] shadow-[0_32px_64px_-28px_rgba(10,31,68,0.28)] ring-1 ring-slate-200/90 sm:rounded-[2rem]">
          <div className="relative aspect-[4/5] w-full min-h-[280px] sm:min-h-[360px] lg:min-h-[400px]">
            <Image
              src={HERO_IMAGE}
              alt="אחיות מוסמכות מלוות קשישה בבית — עירוי, קרבה אנושית ותיעוד רפואי"
              fill
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 42vw"
              className="object-cover object-[center_35%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1f44]/55 via-[#0a1f44]/10 to-transparent" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-white/15 via-transparent to-transparent" />

            <div className="absolute inset-x-0 bottom-0 z-[2] p-4 sm:p-5">
              <p className="max-w-[20rem] text-[13px] font-bold leading-snug text-white drop-shadow-sm sm:text-[14px]">
                ליווי אנושי ומקצועי — כשהמשפחה זקוקה ליד בטוחה
              </p>
            </div>
          </div>
        </div>

        <div className="relative z-[3] mt-4 flex justify-center sm:absolute sm:-bottom-2 sm:start-0 sm:mt-0 sm:max-w-[260px] sm:justify-start lg:-start-4">
          <div className="animate-float-slow flex items-center gap-3 rounded-2xl border border-white/70 bg-white/95 px-4 py-3 shadow-[0_16px_40px_-16px_rgba(15,23,42,0.22)] ring-1 ring-slate-200/60 backdrop-blur-md">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
              <Clock className="h-5 w-5" strokeWidth={2.25} />
            </span>
            <div className="min-w-0 text-start">
              <p className="text-[12px] font-extrabold text-[#0a1f44]">תגובה מהירה</p>
              <p className="text-[11px] font-medium text-slate-600">מיון ראשוני תוך דקות בערוצים שלכם</p>
            </div>
          </div>
        </div>

        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          className="relative z-[3] mt-3 flex items-center justify-center gap-2 rounded-2xl border border-emerald-200/80 bg-emerald-50/95 py-2.5 text-[12.5px] font-extrabold text-emerald-900 shadow-sm transition hover:bg-emerald-50 sm:absolute sm:top-5 sm:mt-0 sm:inline-flex sm:px-4 sm:py-2 sm:end-4"
        >
          <MessageCircle className="h-4 w-4 text-[#128C7E]" strokeWidth={2.3} />
          שליחה מהירה ב־WhatsApp
        </a>
      </div>
    </div>
  );
}
