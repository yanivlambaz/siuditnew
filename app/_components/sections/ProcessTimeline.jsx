"use client";

import { motion } from "framer-motion";
import { Phone, ClipboardCheck, UserCheck, HeartHandshake } from "lucide-react";
import Container from "../ui/Container";
import SectionHeading from "./SectionHeading";
import {
  PulseChartIllustration,
  CalendarHeartIllustration,
  PeopleCommunityIllustration,
  NurseHandshakeIllustration,
} from "../illustrations/Illustrations";

const easing = [0.22, 1, 0.36, 1];

const STEPS = [
  {
    title: "שיחה קצרה",
    desc: "טופס או טלפון — מה חשוב רפואית, מה דחוף, ומה הכי מפחיד אתכם כרגע.",
    icon: Phone,
    illustration: PulseChartIllustration,
    time: "שלב 1 · ~דקה",
  },
  {
    title: "בחירת אחות",
    desc: "מאמתים התאמה קלינית וסגנון תקשורת — לא רק «מישהו זמין».",
    icon: ClipboardCheck,
    illustration: CalendarHeartIllustration,
    time: "שלב 2 · תוך דקות",
  },
  {
    title: "יוצאים לדרך",
    desc: "מתאמים שעות, נקודות כניסה לבית/מחלקה, ומה חייב להיות מוכן כשמגיעים.",
    icon: UserCheck,
    illustration: PeopleCommunityIllustration,
    time: "שלב 3 · תוך שעות",
  },
  {
    title: "נשארים זמינים",
    desc: "שינוי במצב? הארכת משמרת? שאלה קטנה בלילה? יש קו לתיאום — בלי להתחיל מהתחלה.",
    icon: HeartHandshake,
    illustration: NurseHandshakeIllustration,
    time: "שלב 4 · לאורך הדרך",
  },
];

export default function ProcessTimeline() {
  return (
    <section id="process" className="relative scroll-mt-nav overflow-hidden py-20 sm:py-[5.5rem] md:py-[6.75rem]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute inset-x-0 top-1/2 h-[400px] -translate-y-1/2 bg-gradient-to-b from-[#f7f9fc] via-white to-[#f7f9fc]" />
      </div>

      <Container size="wide">
        <SectionHeading
          eyebrow="איך זה עובד"
          title="מהשיחה הראשונה ועד שקט נפשי — תוך שעות"
          subtitle="תהליך פשוט, אנושי וברור. אנחנו לוקחים על עצמנו את הלוגיסטיקה — אתם מקבלים אחות מתאימה."
        />

        <div className="relative mx-auto mt-14 max-w-5xl lg:mt-16">
          <div
            aria-hidden
            className="absolute right-1/2 top-0 hidden h-full w-px translate-x-1/2 bg-gradient-to-b from-transparent via-slate-200 to-transparent lg:block"
          />

          <div className="grid gap-8 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-10">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: easing, delay: i * 0.1 }}
                className={[
                  "group relative",
                  i % 2 === 1 ? "lg:translate-y-16" : "",
                ].join(" ")}
              >
                <div className="relative overflow-hidden rounded-3xl bg-white p-7 ring-1 ring-slate-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_18px_40px_-22px_rgba(15,23,42,0.18)]">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -bottom-4 -end-4 h-32 w-32 opacity-90 transition-transform duration-700 ease-out group-hover:scale-110"
                  >
                    <s.illustration id={`process-step-${i}`} />
                  </div>

                  <div className="relative flex items-start gap-5">
                    <div className="relative shrink-0">
                      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-[#0a1f44] via-[#1f6bff] to-[#5fd1f0] text-white shadow-[0_14px_30px_-12px_rgba(31,107,255,0.5)]">
                        <s.icon className="h-6 w-6" strokeWidth={2.2} />
                      </div>
                      <span className="absolute -bottom-1 -end-1 grid h-6 w-6 place-items-center rounded-full bg-white text-[11px] font-extrabold text-[#0a1f44] ring-1 ring-slate-200">
                        {i + 1}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[11.5px] font-bold uppercase tracking-[0.16em] text-[#1851d8]">
                        {s.time}
                      </p>
                      <h3 className="mt-1.5 text-[20px] font-extrabold tracking-tight text-[#0a1f44]">
                        {s.title}
                      </h3>
                      <p className="mt-2 max-w-[80%] text-[14.5px] leading-[1.65] text-slate-600">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
