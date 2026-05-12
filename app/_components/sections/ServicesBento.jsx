"use client";

import { motion } from "framer-motion";
import {
  Home,
  Hospital,
  HeartPulse,
  ShieldPlus,
  Moon,
  Syringe,
  ArrowLeft,
  Activity,
} from "lucide-react";
import Container from "../ui/Container";
import SectionHeading from "./SectionHeading";
import {
  HomeCareIllustration,
  HospitalIllustration,
  HeartCareIllustration,
  ShieldPlusIllustration,
  MoonNightIllustration,
  SyringeOncologyIllustration,
  RehabIllustration,
} from "../illustrations/Illustrations";

const easing = [0.22, 1, 0.36, 1];

const SERVICES = [
  {
    title: "אחות פרטית לבית",
    href: "/services/private-nurse-home",
    desc: "ניטור, מעקב תרופות, הדרכת משפחה ושמירה על רצף טיפול בבית — בידיים מנוסות.",
    icon: Home,
    illustration: HomeCareIllustration,
    span: "lg:col-span-3",
    accent: "from-[#dbeafe] to-[#cdf3ff]",
  },
  {
    title: "אחות לבית חולים",
    href: "/services/private-nurse-hospital",
    desc: "השגחה וליווי בזמן אשפוז, תיאום מול הצוות הרפואי — גם בלילות ובסופי שבוע.",
    icon: Hospital,
    illustration: HospitalIllustration,
    span: "lg:col-span-3",
    accent: "from-[#cdf3ff] to-[#dbeafe]",
  },
  {
    title: "אחות לאחר ניתוח",
    href: "/services/post-surgery-nurse",
    desc: "מעקב כאב ותרופות, זיהוי סימנים מוקדמים והחלמה בטוחה ומהירה יותר בבית.",
    icon: HeartPulse,
    illustration: HeartCareIllustration,
    span: "lg:col-span-2",
    accent: "from-[#fee2e2] to-[#fecaca]",
  },
  {
    title: "טיפול סיעודי בבית",
    href: "/services/elderly-care-nurse",
    desc: "תוכנית מותאמת למצבים מורכבים, מבוגרים ושיקום — תוך שמירה על איכות חיים.",
    icon: ShieldPlus,
    illustration: ShieldPlusIllustration,
    span: "lg:col-span-2",
    accent: "from-[#dcfce7] to-[#bbf7d0]",
  },
  {
    title: "משמרות לילה",
    href: "/services/night-nurse",
    desc: "שקט אמיתי בלילה — אחות מוסמכת ערה, קשובה ומגיבה לכל שינוי.",
    icon: Moon,
    illustration: MoonNightIllustration,
    span: "lg:col-span-2",
    accent: "from-[#e0e7ff] to-[#c7d2fe]",
  },
  {
    title: "טיפולים אונקולוגיים",
    href: "/services/palliative-care",
    desc: "תמיכה רפואית ורגשית בבית, תיאום עם הצוות המטפל ושמירה על איכות חיים.",
    icon: Syringe,
    illustration: SyringeOncologyIllustration,
    span: "lg:col-span-3",
    accent: "from-[#fce7f3] to-[#fbcfe8]",
  },
  {
    title: "שיקום בבית",
    href: "/services/rehabilitation-nurse",
    desc: "ליווי תהליך השיקום, אימוני תפקוד יומיומי ומעקב שוטף אחר התקדמות.",
    icon: Activity,
    illustration: RehabIllustration,
    span: "lg:col-span-3",
    accent: "from-[#fef9c3] to-[#fde68a]",
  },
];

export default function ServicesBento() {
  return (
    <section id="services" className="relative scroll-mt-nav py-20 sm:py-[5.5rem] md:py-[6.75rem]">
      <Container size="wide">
        <SectionHeading
          eyebrow="שירותים"
          title="ליווי מקצועי — בבית או במחלקה"
          subtitle="כל שיבוץ מותאם למצב הרפואי, לשעות ולסביבה. מיומנויות שונות לצרכים שונים: מהמשכיות אחרי ניתוח ועד משמרת לילה שקטה."
        />

        <div className="mt-12 grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-6 lg:mt-14">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function ServiceCard({ service, index }) {
  const { title, desc, href, icon: Icon, illustration: Illustration, span, accent } = service;
  const isLarge = span?.includes("col-span-3");
  const illustrationId = `service-${index}`;

  return (
    <motion.a
      href={href}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: easing, delay: index * 0.05 }}
      className={[
        "group relative isolate overflow-hidden rounded-3xl bg-white p-7 ring-1 ring-slate-200/70 transition-[transform,box-shadow] duration-300 ease-out",
        "shadow-[0_1px_2px_rgba(15,23,42,0.04),0_18px_40px_-22px_rgba(15,23,42,0.18)]",
        "motion-safe:hover:-translate-y-1 motion-safe:hover:ring-[#1f6bff]/28 motion-safe:hover:shadow-[0_28px_70px_-28px_rgba(31,107,255,0.26)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f6bff]/60 focus-visible:ring-offset-2 motion-reduce:hover:translate-y-0",
        span,
      ].join(" ")}
    >
      <div
        aria-hidden
        className={[
          "pointer-events-none absolute -top-20 -end-20 h-48 w-48 rounded-full bg-gradient-to-br opacity-40 blur-3xl transition-all duration-500 group-hover:scale-110 group-hover:opacity-90",
          accent,
        ].join(" ")}
      />

      <div
        aria-hidden
        className={[
          "pointer-events-none absolute transition-all duration-700 ease-out",
          isLarge
            ? "bottom-0 end-0 h-44 w-44 sm:h-52 sm:w-52"
            : "-bottom-2 -end-2 h-32 w-32 sm:h-36 sm:w-36",
          "opacity-90 group-hover:scale-105",
        ].join(" ")}
      >
        <Illustration id={illustrationId} />
      </div>

      <div className="relative">
        <div className="flex items-center justify-between">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-[#0a1f44] to-[#1f6bff] text-white shadow-[0_10px_30px_-12px_rgba(31,107,255,0.55)] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
            <Icon className="h-6 w-6" strokeWidth={2.2} />
          </span>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-slate-50 text-slate-400 transition-all duration-300 group-hover:bg-[#0a1f44] group-hover:text-white">
            <ArrowLeft className="h-[14px] w-[14px] transition-transform group-hover:-translate-x-0.5" strokeWidth={2.6} />
          </span>
        </div>

        <h3 className="mt-7 text-[20px] font-extrabold tracking-tight text-[#0a1f44]">
          {title}
        </h3>
        <p className={[
          "mt-2.5 text-[14.5px] leading-[1.65] text-slate-600",
          isLarge ? "max-w-[60%]" : "max-w-[70%]",
        ].join(" ")}>
          {desc}
        </p>
      </div>
    </motion.a>
  );
}
