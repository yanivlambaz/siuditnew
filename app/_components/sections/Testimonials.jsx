"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Clock, Hospital, HeartHandshake, Quote } from "lucide-react";
import Container from "../ui/Container";
import SectionHeading from "./SectionHeading";

const easing = [0.22, 1, 0.36, 1];

/**
 * OWNER CONTENT SLOT — real, genuine family reviews only.
 * Leave empty until authentic, owner-approved testimonials are available.
 * Do NOT add fabricated reviews, names, ratings or statistics.
 * Shape: { quote: string, label: string }
 */
const REVIEWS = [];

const TRUST_POINTS = [
  {
    icon: BadgeCheck,
    title: "אחים ואחיות מוסמכים",
    desc: "השיבוץ נעשה לפי רישוי תקף וניסיון שמתאים לסוג הצורך.",
  },
  {
    icon: Clock,
    title: "מענה אנושי 24/7",
    desc: "אפשר לפנות אלינו גם כשהצורך מתעורר בשעות לא שגרתיות.",
  },
  {
    icon: Hospital,
    title: "בבית ובבית החולים",
    desc: "התאמת ליווי למגוון סביבות טיפול, לפי המקום שבו נדרשת העזרה.",
  },
  {
    icon: HeartHandshake,
    title: "התאמה אישית",
    desc: "בוחנים את המצב הרפואי, המיקום והמועד — ומתאימים בהתאם.",
  },
];

export default function Testimonials() {
  const hasReviews = REVIEWS.length > 0;

  return (
    <section id="testimonials" className="relative scroll-mt-nav overflow-hidden py-20 sm:py-[5.5rem] md:py-[6.75rem]">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[480px]">
        <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-[#f8fafc] via-[#f8fafc] to-transparent" />
        <div className="absolute right-1/2 top-1/2 h-[600px] w-[800px] -translate-y-1/2 translate-x-1/2 rounded-full bg-gradient-to-br from-[#dbeafe]/35 via-[#e0f2fe]/25 to-transparent blur-3xl" />
      </div>

      <Container size="wide">
        <SectionHeading
          eyebrow="אמון"
          title="מה משפחות מקבלות מאיתנו"
          subtitle="במקום הבטחות — הנה מה שאנחנו מחויבים לו בכל פנייה, בהתאם לצורך הרפואי של המטופל."
        />

        {hasReviews ? (
          <div className="mt-12 grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-3 lg:mt-14">
            {REVIEWS.map((t, i) => (
              <motion.figure
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: easing, delay: i * 0.1 }}
                className="relative overflow-hidden rounded-3xl bg-white p-7 ring-1 ring-slate-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_18px_40px_-22px_rgba(15,23,42,0.16)] sm:p-8"
              >
                <Quote className="h-8 w-8 fill-[#1f6bff]/12 stroke-none" aria-hidden />
                <blockquote className="mt-3 text-[15.5px] leading-[1.78] text-[#0a1f44]">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 border-t border-slate-100 pt-4 text-[12.5px] font-semibold text-slate-600">
                  {t.label}
                </figcaption>
              </motion.figure>
            ))}
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:mt-14">
            {TRUST_POINTS.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: easing, delay: (i % 4) * 0.06 }}
                className="rounded-3xl bg-white p-6 ring-1 ring-slate-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_36px_-24px_rgba(15,23,42,0.16)]"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-[#1f6bff] ring-1 ring-blue-100">
                  <p.icon className="h-6 w-6" strokeWidth={2.2} />
                </span>
                <h3 className="mt-5 text-[16.5px] font-extrabold tracking-tight text-[#0a1f44]">
                  {p.title}
                </h3>
                <p className="mt-2 text-[13.5px] leading-[1.6] text-slate-600">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
