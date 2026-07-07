"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Wallet, ShieldCheck, FileText, ArrowLeft } from "lucide-react";
import Container from "../ui/Container";
import Button from "../ui/Button";
import { track } from "../../lib/analytics";

const ease = [0.22, 1, 0.36, 1];

const POINTS = [
  { icon: ShieldCheck, text: "ביטוח סיעודי או בריאות פרטי — בהתאם לתנאי הפוליסה" },
  { icon: Wallet, text: "החזרים אפשריים מקופת החולים במקרים מסוימים" },
  { icon: FileText, text: "נשמח לכוון אתכם לגבי המסמכים והבדיקה מול הגורם הרלוונטי" },
];

export default function Reimbursement() {
  const reduceMotion = useReducedMotion();
  return (
    <section id="reimbursement" className="relative scroll-mt-nav py-16 sm:py-20">
      <Container size="wide">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease }}
          className="mx-auto max-w-4xl overflow-hidden rounded-[28px] border border-slate-200/80 bg-gradient-to-br from-white to-[#f4f8ff] p-7 shadow-[0_20px_60px_-30px_rgba(10,31,68,0.22)] sm:p-10"
        >
          <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3.5 py-1.5 text-[11.5px] font-bold uppercase tracking-[0.16em] text-[#1851d8] ring-1 ring-blue-100/80">
                <Wallet className="h-3.5 w-3.5" strokeWidth={2.4} />
                החזרים וזכאות
              </p>
              <h2 className="mt-5 text-balance text-[26px] font-extrabold leading-[1.12] tracking-tight text-[#0a1f44] sm:text-[32px]">
                ייתכן שאתם זכאים להחזר
              </h2>
              <p className="mt-4 text-pretty text-[15.5px] leading-[1.7] text-slate-600">
                במקרים מסוימים ניתן לקבל החזר עבור שירותי אחות פרטית מקופת החולים או מביטוח פרטי,
                בהתאם לתנאי הזכאות והפוליסה.
              </p>
              <div className="mt-7">
                <Button
                  as="a"
                  href="#matching"
                  variant="primary"
                  size="lg"
                  onClick={() => track("reimbursement_click")}
                >
                  בדקו את אפשרויות ההחזר
                  <ArrowLeft className="h-5 w-5 transition-transform group-hover/btn:-translate-x-1" />
                </Button>
              </div>
            </div>

            <ul className="space-y-3">
              {POINTS.map((p) => (
                <li
                  key={p.text}
                  className="flex items-start gap-3 rounded-2xl bg-white p-4 ring-1 ring-slate-200/70"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#eff6ff] text-[#1f6bff] ring-1 ring-blue-100">
                    <p.icon className="h-5 w-5" strokeWidth={2.2} />
                  </span>
                  <span className="min-w-0 pt-1 text-[14px] font-semibold leading-relaxed text-slate-700">
                    {p.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
