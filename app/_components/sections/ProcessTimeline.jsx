"use client";

import { motion } from "framer-motion";
import { ClipboardCheck, UserCheck, HeartHandshake } from "lucide-react";
import Container from "../ui/Container";
import SectionHeading from "./SectionHeading";
import {
  PulseChartIllustration,
  CalendarHeartIllustration,
  NurseHandshakeIllustration,
} from "../illustrations/Illustrations";

const easing = [0.22, 1, 0.36, 1];

const STEPS = [
  {
    title: "מספרים לנו מה הצורך",
    desc: "מיקום, מצב רפואי והמועד שבו נדרש השירות.",
    icon: ClipboardCheck,
    illustration: PulseChartIllustration,
  },
  {
    title: "אנחנו מסייעים בהתאמה אישית",
    desc: "נציג אנושי בוחן את הצורך ומסייע בהתאמת אח או אחות מתאימים.",
    icon: UserCheck,
    illustration: CalendarHeartIllustration,
  },
  {
    title: "מתאמים את השירות",
    desc: "המשך התהליך נקבע בהתאם לצורך, למיקום ולזמינות.",
    icon: HeartHandshake,
    illustration: NurseHandshakeIllustration,
  },
];

export default function ProcessTimeline() {
  return (
    <section id="process" className="relative scroll-mt-nav overflow-hidden py-20 sm:py-[5.5rem] md:py-[6.75rem]">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-1/2 h-[400px] -translate-y-1/2 bg-gradient-to-b from-[#f7f9fc] via-white to-[#f7f9fc]" />
      </div>

      <Container size="wide">
        <SectionHeading
          eyebrow="איך זה עובד"
          title="איך מקבלים אחות מתאימה?"
          subtitle="תהליך פשוט, אנושי וברור — אנחנו לוקחים על עצמנו את ההתאמה, אתם מקבלים ליווי מקצועי."
        />

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 lg:mt-16 lg:grid-cols-3 lg:gap-8">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: easing, delay: i * 0.1 }}
              className="group relative"
            >
              <div className="relative h-full overflow-hidden rounded-3xl bg-white p-7 ring-1 ring-slate-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_18px_40px_-22px_rgba(15,23,42,0.18)]">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -bottom-4 -end-4 h-28 w-28 opacity-90 transition-transform duration-700 ease-out group-hover:scale-110"
                >
                  <s.illustration id={`process-step-${i}`} />
                </div>

                <div className="relative">
                  <div className="relative inline-grid">
                    <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-[#0a1f44] via-[#1f6bff] to-[#5fd1f0] text-white shadow-[0_14px_30px_-12px_rgba(31,107,255,0.5)]">
                      <s.icon className="h-6 w-6" strokeWidth={2.2} />
                    </div>
                    <span className="absolute -bottom-1 -end-1 grid h-6 w-6 place-items-center rounded-full bg-white text-[11px] font-extrabold text-[#0a1f44] ring-1 ring-slate-200">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="mt-5 text-[20px] font-extrabold tracking-tight text-[#0a1f44]">
                    {s.title}
                  </h3>
                  <p className="mt-2 max-w-[85%] text-[14.5px] leading-[1.65] text-slate-600">
                    {s.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
