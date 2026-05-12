"use client";

import { motion } from "framer-motion";
import {
  Zap,
  BadgeCheck,
  Clock,
  HeartHandshake,
  Users,
  Star,
} from "lucide-react";
import Container from "../ui/Container";
import SectionHeading from "./SectionHeading";

const easing = [0.22, 1, 0.36, 1];

const FEATURES = [
  {
    icon: Zap,
    title: "התאמה מהירה",
    desc: "מישהו אחד קורא את התסריט הרפואי שלכם — ומחזיר תכנון זמן ריאלי, לא הצפת הבטחות.",
  },
  {
    icon: BadgeCheck,
    title: "רישוי וניסיון",
    desc: "אחיות בעלות רישיון תקף וניסיון מתאים למצב: מלילה עמוס אחרי שחרור, ועד מעקב צמוד ימים.",
  },
  {
    icon: Clock,
    title: "זמינות סביב השעון",
    desc: "ימים, לילות וסופ״ש. כשאי אפשר לחכות לבוקר — יש מענה אנושי, לא רק טפסים.",
  },
  {
    icon: HeartHandshake,
    title: "ליווי מכבד",
    desc: "משפחה מתוחה לא צריכה «מערך». צריך מקצועיות שקטה, הסברים ברורים, וסבלנות.",
  },
  {
    icon: Users,
    title: "התאמה אישית",
    desc: "שפה, מגזר, דקדוקי כבוד ורצף טיפולי — נבחר אחות שמתאימה גם קלינית וגם אנושית.",
  },
  {
    icon: Star,
    title: "סטנדרט פרימיום",
    desc: "דיסקרטיות, בטיחות ותיעוד כשצריך. זה מה שמחזיק בית שלם הראש מעל המים.",
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
              title="מקצועיות שקטה — כמו שצריך כשהבית כבר מלא חרדה"
              subtitle="אנחנו מאמינים שליווי סיעודי טוב הוא לא רק «לבצע משימות». הוא להחזיק קו קליני נכון, בלי להחליף רופא — ובלי להשאיר משפחה לבד עם שאלות בלילה."
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
