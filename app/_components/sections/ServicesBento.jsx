"use client";

import { motion } from "framer-motion";
import {
  Activity,
  Home,
  Hospital,
  Moon,
  UserRound,
  Bandage,
  Syringe,
  Stethoscope,
  ArrowLeft,
} from "lucide-react";
import Container from "../ui/Container";
import SectionHeading from "./SectionHeading";

const easing = [0.22, 1, 0.36, 1];

const NEEDS = [
  {
    title: "אחות לאחר ניתוח",
    href: "/services/post-surgery-nurse",
    desc: "מעקב כאב ותרופות, טיפול בפצע הניתוח וזיהוי מוקדם של סיבוכים.",
    icon: Activity,
  },
  {
    title: "אחות פרטית עד הבית",
    href: "/services/private-nurse-home",
    desc: "ניטור, מתן תרופות ורצף טיפול בבית — בסביבה המוכרת והבטוחה.",
    icon: Home,
  },
  {
    title: "השגחה פרטית בבית חולים",
    href: "/services/private-nurse-hospital",
    desc: "ליווי צמוד במחלקה ותיאום מול הצוות הרפואי, גם בלילות ובסופ״ש.",
    icon: Hospital,
  },
  {
    title: "אחות ללילה",
    href: "/services/night-nurse",
    desc: "מענה ער וקשוב לאורך כל הלילה — שקט אמיתי לכל המשפחה.",
    icon: Moon,
  },
  {
    title: "טיפול בקשיש בבית",
    href: "/services/elderly-care-nurse",
    desc: "ליווי סיעודי מותאם למבוגרים תוך שמירה על כבוד ואיכות חיים.",
    icon: UserRound,
  },
  {
    title: "טיפול בפצעים וחבישות",
    href: "/services/home-medical-supervision",
    desc: "החלפת חבישות וטיפול מקצועי בפצעים לפי הוראה רפואית, בבית.",
    icon: Bandage,
  },
  {
    title: "זריקות וטיפול רפואי בבית",
    href: "/services/iv-treatment-home",
    desc: "זריקות, עירוי וטיפולים רפואיים על ידי אחות מוסמכת — בלי לצאת מהבית.",
    icon: Syringe,
  },
  {
    title: "ליווי לאחר אשפוז",
    href: "/services/rehabilitation-nurse",
    desc: "המשכיות טיפול אחרי שחרור מבית החולים, לחזרה בטוחה לשגרה.",
    icon: Stethoscope,
  },
];

export default function ServicesBento() {
  return (
    <section id="services" className="relative scroll-mt-nav py-20 sm:py-[5.5rem] md:py-[6.75rem]">
      <Container size="wide">
        <SectionHeading
          eyebrow="התאמה לפי צורך"
          title="באיזה מצב אתם זקוקים לאחות?"
          subtitle="בחרו את הצורך הקרוב ביותר למצב שלכם — ונתאים לכם אח או אחות מוסמכים בהתאם."
        />

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:mt-14">
          {NEEDS.map((need, i) => (
            <NeedCard key={need.title} need={need} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function NeedCard({ need, index }) {
  const { title, desc, href, icon: Icon } = need;
  return (
    <motion.a
      href={href}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: easing, delay: (index % 4) * 0.06 }}
      className="group flex h-full flex-col rounded-3xl bg-white p-6 ring-1 ring-slate-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_36px_-24px_rgba(15,23,42,0.18)] transition-[transform,box-shadow] duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f6bff]/60 focus-visible:ring-offset-2 motion-safe:hover:-translate-y-1 motion-safe:hover:ring-[#1f6bff]/28 motion-safe:hover:shadow-[0_24px_60px_-28px_rgba(31,107,255,0.24)] motion-reduce:hover:translate-y-0"
    >
      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[#0a1f44] to-[#1f6bff] text-white shadow-[0_10px_26px_-12px_rgba(31,107,255,0.55)] transition-transform duration-500 group-hover:scale-105">
        <Icon className="h-6 w-6" strokeWidth={2.2} />
      </span>
      <h3 className="mt-5 text-[17px] font-extrabold tracking-tight text-[#0a1f44]">
        {title}
      </h3>
      <p className="mt-2 flex-1 text-[13.5px] leading-[1.6] text-slate-600">
        {desc}
      </p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-extrabold text-[#1f6bff]">
        בדקו התאמה
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" strokeWidth={2.5} />
      </span>
    </motion.a>
  );
}
