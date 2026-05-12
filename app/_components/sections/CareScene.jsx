"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { HeartPulse, ShieldCheck, Sparkles, Activity, ArrowLeft } from "lucide-react";
import Container from "../ui/Container";
import Button from "../ui/Button";
import { CareMomentScene } from "../illustrations/Scenes";

const easing = [0.22, 1, 0.36, 1];

const PROOF = [
  { icon: HeartPulse, value: "ניטור מובנה", label: "תצפית ודיווח כשמשתנה מצב" },
  { icon: ShieldCheck, value: "גבולות ברורים", label: "לפי הוראה רפואית — בלי קיצורי דרך" },
  { icon: Sparkles, value: "תוכנית אישית", label: "מתאימים לבית, לא לתבנית קבועה מראש" },
];

export default function CareScene() {
  return (
    <section className="relative scroll-mt-nav overflow-hidden py-20 sm:py-[5.5rem] md:py-[6.75rem]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-white via-[#f7f9fc] to-white"
      />

      <Container size="wide">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1, ease: easing }}
              className="relative"
            >
              <div className="absolute -inset-6 -z-10 rounded-[3rem] bg-gradient-to-br from-[#1f6bff]/15 via-[#5fd1f0]/15 to-transparent blur-3xl" />

              <div className="relative aspect-[4/3] overflow-hidden rounded-[32px] ring-1 ring-slate-200/60 shadow-[0_30px_80px_-25px_rgba(15,23,42,0.25)]">
                <div className="absolute inset-0">
                  <CareMomentScene />
                </div>

                <Image
                  src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=1400&q=80"
                  alt="טיפול סיעודי בבית — ליווי קרוב ושקט למשפחה"
                  fill
                  sizes="(min-width: 1024px) 720px, 100vw"
                  className="relative z-10 object-cover"
                />

                <div className="absolute inset-0 z-20 bg-gradient-to-tr from-[#04122e]/25 via-transparent to-[#1f6bff]/10" />

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.7, ease: easing, delay: 0.4 }}
                  className="absolute end-6 top-6 z-30 flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/92 px-4 py-2 text-[12px] font-semibold text-[#0a1f44] shadow-sm backdrop-blur"
                >
                  <span className="h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-emerald-100" aria-hidden />
                  ליווי בפועל בבית
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.7, ease: easing, delay: 0.5 }}
                  className="absolute bottom-6 start-6 z-30 max-w-[260px] rounded-2xl bg-white/95 p-4 shadow-[0_18px_40px_-12px_rgba(15,23,42,0.25)] ring-1 ring-white/70 backdrop-blur"
                >
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-[#0a1f44] via-[#1f6bff] to-[#5fd1f0] text-white">
                      <Activity className="h-5 w-5" strokeWidth={2.4} />
                    </span>
                    <div className="min-w-0">
                      <div className="text-[13px] font-extrabold text-[#0a1f44]">
                        ליווי רציף בבית
                      </div>
                      <div className="text-[11px] font-medium text-slate-500">
                        מעקב סימנים חיוניים שעה-שעה
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, ease: easing, delay: 0.6 }}
                className="absolute -bottom-10 -end-4 hidden w-[260px] rounded-3xl bg-white p-5 shadow-[0_30px_80px_-25px_rgba(15,23,42,0.25)] ring-1 ring-slate-200/70 sm:block"
              >
                <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#1851d8]">
                  <Sparkles className="h-3.5 w-3.5" strokeWidth={2.4} />
                  ניטור חי
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <Vital label="דופק" value="72" unit="bpm" trend="+2" tone="ok" />
                  <Vital label="חמצן" value="98" unit="%" trend="0" tone="ok" />
                  <Vital label="לחץ דם" value="118/76" unit="" trend="" tone="ok" />
                  <Vital label="טמפ׳" value="36.6" unit="°C" trend="" tone="ok" />
                </div>
              </motion.div>
            </motion.div>
          </div>

          <div className="lg:col-span-5">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: easing }}
              className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3.5 py-1.5 text-[11.5px] font-bold uppercase tracking-[0.18em] text-[#1851d8] ring-1 ring-blue-100/80"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#1f6bff]" />
              רגע אחד בשירות
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: easing, delay: 0.05 }}
              className="mt-5 text-balance text-[34px] font-extrabold leading-[1.08] tracking-tight text-[#0a1f44] sm:text-[42px] md:text-[48px]"
            >
              לא רק אחות.
              <br />
              נוכחות שמרגיעה.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: easing, delay: 0.1 }}
              className="mt-5 text-pretty text-[17px] leading-[1.7] text-slate-600"
            >
              האחיות שלנו לא רק מבצעות פרוטוקולים — הן מקשיבות, מסבירות,
              ומלוות את כל המשפחה. ככה נראה שירות סיעוד פרימיום בבית.
            </motion.p>

            <ul className="mt-9 space-y-4">
              {PROOF.map((p, i) => (
                <motion.li
                  key={p.value}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.6, ease: easing, delay: 0.15 + i * 0.08 }}
                  className="flex items-start gap-4 rounded-2xl bg-white p-4 ring-1 ring-slate-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.03),0_12px_28px_-18px_rgba(15,23,42,0.18)]"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#0a1f44] via-[#1f6bff] to-[#5fd1f0] text-white shadow-[0_10px_24px_-10px_rgba(31,107,255,0.5)]">
                    <p.icon className="h-5 w-5" strokeWidth={2.2} />
                  </span>
                  <div className="min-w-0">
                    <div className="text-[15px] font-extrabold text-[#0a1f44]">
                      {p.value}
                    </div>
                    <div className="mt-0.5 text-[13.5px] font-medium text-slate-500">
                      {p.label}
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: easing, delay: 0.45 }}
              className="mt-10"
            >
              <Button as="a" href="#contact" variant="primary" size="lg">
                בקשו אחות מתאימה
                <ArrowLeft className="h-5 w-5 transition-transform group-hover/btn:-translate-x-1" />
              </Button>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Vital({ label, value, unit, trend, tone }) {
  return (
    <div className="rounded-xl bg-[#f7f9fc] p-3 ring-1 ring-slate-100">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">
          {label}
        </span>
        {trend ? (
          <span
            className={[
              "text-[10px] font-bold",
              tone === "ok" ? "text-emerald-600" : "text-rose-600",
            ].join(" ")}
          >
            {trend}
          </span>
        ) : null}
      </div>
      <div className="mt-1 flex items-baseline gap-1">
        <span className="text-[15px] font-extrabold text-[#0a1f44]">{value}</span>
        {unit ? <span className="text-[10.5px] font-bold text-slate-500">{unit}</span> : null}
      </div>
    </div>
  );
}
