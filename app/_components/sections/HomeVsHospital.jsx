"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Home, Hospital, Check, ArrowLeft } from "lucide-react";
import Container from "../ui/Container";
import SectionHeading from "./SectionHeading";
import Button from "../ui/Button";
import { track } from "../../lib/analytics";

const ease = [0.22, 1, 0.36, 1];

const COLUMNS = [
  {
    key: "home",
    icon: Home,
    title: "אחות עד הבית",
    tone: "from-[#eff6ff] to-[#e0f2fe]",
    needs: [
      "טיפול לאחר אשפוז",
      "טיפול לאחר ניתוח",
      "פצעים וחבישות",
      "זריקות וטיפולים רפואיים",
      "השגחה וטיפול בקשיש",
    ],
    cta: "בדיקת זמינות אחות לבית",
  },
  {
    key: "hospital",
    icon: Hospital,
    title: "אחות פרטית בבית החולים",
    tone: "from-[#eef2ff] to-[#e0e7ff]",
    needs: [
      "השגחה פרטית",
      "ליווי בלילה",
      "סיוע לאחר ניתוח",
      "תמיכה במשפחה בזמן האשפוז",
    ],
    cta: "בדיקת זמינות בבית החולים",
  },
];

export default function HomeVsHospital() {
  const reduceMotion = useReducedMotion();
  return (
    <section className="relative scroll-mt-nav py-20 sm:py-[5.5rem] md:py-[6.75rem]">
      <Container size="wide">
        <SectionHeading
          eyebrow="בבית או בבית החולים"
          title="היכן אתם זקוקים לאחות?"
          subtitle="בכל אחת מהסביבות אנחנו מתאימים אח או אחות מוסמכים לצורך הספציפי שלכם."
        />

        <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-2 lg:mt-14 lg:gap-6">
          {COLUMNS.map((col, i) => (
            <motion.div
              key={col.key}
              initial={reduceMotion ? false : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, ease, delay: i * 0.1 }}
              className="flex flex-col overflow-hidden rounded-[28px] bg-white p-7 ring-1 ring-slate-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_20px_50px_-28px_rgba(15,23,42,0.2)] sm:p-9"
            >
              <div className="flex items-center gap-4">
                <span
                  className={[
                    "grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br text-[#0a1f44] ring-1 ring-blue-100",
                    col.tone,
                  ].join(" ")}
                >
                  <col.icon className="h-7 w-7 text-[#1f6bff]" strokeWidth={2.1} />
                </span>
                <h3 className="text-[22px] font-extrabold tracking-tight text-[#0a1f44] sm:text-[24px]">
                  {col.title}
                </h3>
              </div>

              <ul className="mt-6 flex-1 space-y-2.5">
                {col.needs.map((need) => (
                  <li key={need} className="flex items-center gap-3 text-[14.5px] font-semibold text-slate-700">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
                      <Check className="h-3.5 w-3.5" strokeWidth={2.8} />
                    </span>
                    {need}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Button
                  as="a"
                  href="#matching"
                  variant={col.key === "home" ? "gradient" : "primary"}
                  size="lg"
                  className="w-full"
                  onClick={() => track("availability_click", { location: "home_vs_hospital", setting: col.key })}
                >
                  {col.cta}
                  <ArrowLeft className="h-5 w-5 transition-transform group-hover/btn:-translate-x-1" strokeWidth={2.2} />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
