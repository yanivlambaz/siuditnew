"use client";

import { motion } from "framer-motion";
import {
  HeartHandshake,
  Stethoscope,
  BadgeCheck,
  Hospital,
  Clock,
} from "lucide-react";
import Container from "../ui/Container";
import SectionHeading from "./SectionHeading";

const easing = [0.22, 1, 0.36, 1];

const FEATURES = [
  {
    icon: HeartHandshake,
    title: "מענה אנושי כשצריך עזרה",
    desc: "אתם לא צריכים להתמודד עם המצב לבד — יש עם מי לדבר ולתכנן את הצעדים הבאים.",
  },
  {
    icon: Stethoscope,
    title: "התאמה לפי המצב הרפואי",
    desc: "מצבים רפואיים שונים דורשים סיוע סיעודי שונה, ואנחנו מתאימים בהתאם לצורך.",
  },
  {
    icon: BadgeCheck,
    title: "אחים ואחיות מוסמכים",
    desc: "שירות סיעודי מקצועי בהתאם לצרכים של המטופל.",
  },
  {
    icon: Hospital,
    title: "שירות בבית ובבית החולים",
    desc: "סיוע למגוון סביבות טיפול — לפי המקום שבו נדרשת העזרה.",
  },
  {
    icon: Clock,
    title: "אפשר לפנות 24/7",
    desc: "הצורך בעזרה סיעודית לא תמיד מתעורר בשעות העבודה — ואנחנו כאן גם אז.",
  },
];

export default function WhyUs() {
  return (
    <section className="relative scroll-mt-nav py-20 sm:py-[5.5rem] md:py-[6.75rem]">
      <Container size="wide">
        <div className="grid items-start gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <SectionHeading
              align="start"
              eyebrow="למה אנחנו"
              title="למה משפחות פונות אלינו?"
              subtitle="כשמשפחה מחפשת עזרה סיעודית, היא רוצה מישהו שמבין את המצב ומסייע למצוא את האחות הנכונה — בלי להתמודד עם זה לבד."
            />
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
              {FEATURES.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, ease: easing, delay: i * 0.06 }}
                  className="group rounded-3xl bg-white p-6 ring-1 ring-slate-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_18px_40px_-22px_rgba(15,23,42,0.18)] transition-[transform,box-shadow] duration-300 ease-out motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-[0_28px_70px_-28px_rgba(15,23,42,0.22)] sm:p-7 motion-reduce:hover:translate-y-0"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-[#1f6bff] ring-1 ring-blue-100 transition-all duration-500 group-hover:bg-gradient-to-br group-hover:from-[#0a1f44] group-hover:via-[#1f6bff] group-hover:to-[#5fd1f0] group-hover:text-white group-hover:shadow-lg group-hover:shadow-blue-500/30">
                    <f.icon className="h-5 w-5" strokeWidth={2.4} />
                  </span>
                  <h3 className="mt-4 text-[16px] font-extrabold tracking-tight text-[#0a1f44] sm:text-[17px]">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-[1.68] text-slate-600">
                    {f.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
