"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import Container from "../ui/Container";
import SectionHeading from "./SectionHeading";

const easing = [0.22, 1, 0.36, 1];

const TESTIMONIALS = [
  {
    quote:
      "הייתי בטוחה שאני \"מגזימה\" כשביקשתי מישהי שתסביר לי שוב ושוב את אותם דברים. קיבלנו מענה סבלני, בלי לייפות. בלילה הראשון אחרי השחרור סוף סוף נחנו.",
    label: "בת משפחה · מרכז הארץ",
    initials: "ש״ב",
    color: "from-[#dbeafe] to-[#e0f2fe]",
  },
  {
    quote:
      "אחרי ניתוח בכל הרגעים האלה של \"האם זה נורמלי\" — מישהו שמנקה תחבושת נכון, שואל את הרופא את השאלות שאני שכחתי, ולא ממזער לי את הפחד.",
    label: "בן זוג של מטופלת · חיפה והקריות",
    initials: "ד״ר",
    color: "from-[#dcfce7] to-[#d1fae5]",
  },
  {
    quote:
      "הדבר שהכי עזר זה השפה. לא \"מערכת\", לא סיסמאות. מישהו שנתן לנו להבין מה קורה במחלקה, מה מחכה בבית, ומתי באמת להפעיל מישהו נוסף.",
    label: "משפחה מלווה · ירושלים",
    initials: "נ״מ",
    color: "from-[#fef9c3] to-[#fef3c7]",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative scroll-mt-nav overflow-hidden py-20 sm:py-[5.5rem] md:py-[6.75rem]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[480px]"
      >
        <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-[#f8fafc] via-[#f8fafc] to-transparent" />
        <div className="absolute right-1/2 top-1/2 h-[600px] w-[800px] -translate-y-1/2 translate-x-1/2 rounded-full bg-gradient-to-br from-[#dbeafe]/35 via-[#e0f2fe]/25 to-transparent blur-3xl" />
      </div>

      <Container size="wide">
        <SectionHeading
          eyebrow="קול משפחות"
          title="תראו איזה מחמאות נתנו לנו"
          subtitle="ציטוטים של לקוחות מאומתים, רק דגימה קטנה מתוך מאות."
        />

        <div className="mt-12 grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-3 lg:mt-14">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.initials}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: easing, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-3xl bg-white p-7 ring-1 ring-slate-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_18px_40px_-22px_rgba(15,23,42,0.16)] transition-[transform,box-shadow] duration-300 ease-out motion-safe:hover:-translate-y-1 motion-safe:hover:ring-[#1f6bff]/18 motion-safe:hover:shadow-[0_24px_60px_-28px_rgba(31,107,255,0.14)] sm:p-8 motion-reduce:hover:translate-y-0"
            >
              <div
                aria-hidden
                className={[
                  "pointer-events-none absolute -top-24 -end-24 h-56 w-56 rounded-full bg-gradient-to-br opacity-40 blur-3xl",
                  t.color,
                ].join(" ")}
              />

              <div className="relative">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-slate-50 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600 ring-1 ring-slate-200/80">
                    משוב משפחה · אנונימי
                  </span>
                </div>

                <Quote
                  className="mt-6 h-8 w-8 fill-[#1f6bff]/12 stroke-none"
                  aria-hidden
                />

                <blockquote className="mt-3 text-[15.5px] leading-[1.78] text-[#0a1f44]">
                  {t.quote}
                </blockquote>

                <figcaption className="mt-7 flex items-center gap-3.5 border-t border-slate-100 pt-5">
                  <span
                    className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#0a1f44] via-[#1f6bff] to-[#0ea5e9] text-[13px] font-extrabold text-white shadow-md shadow-blue-500/15 ring-2 ring-white"
                    aria-hidden
                  >
                    {t.initials}
                  </span>
                  <span className="min-w-0 flex-1 text-[12.5px] font-semibold leading-snug text-slate-600">
                    {t.label}
                  </span>
                </figcaption>
              </div>
            </motion.figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
