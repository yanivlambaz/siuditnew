"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import Container from "../ui/Container";
import SectionHeading from "./SectionHeading";
import { FAQ } from "./faqData";

const easing = [0.22, 1, 0.36, 1];

export default function Faq({ items = FAQ }) {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section id="faq" className="relative scroll-mt-nav py-20 sm:py-[5.5rem] md:py-[6.75rem]">
      <Container size="wide">
        <SectionHeading
          eyebrow="שאלות נפוצות"
          title="לפני שמתחילים — בקצרה ובבירור"
          subtitle="תשובות לשאלות שחוזרות בכל שבוע. לשאלות ספציפיות לגבי תרופות, החמרה או כאב חד — תמיד עדיף גם לדבר עם הרופא המטפל."
        />

        <div className="mx-auto mt-12 max-w-3xl lg:mt-14">
          <div className="overflow-hidden rounded-3xl bg-white ring-1 ring-slate-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_18px_40px_-22px_rgba(15,23,42,0.18)]">
            {items.map((item, i) => {
              const open = openIdx === i;
              return (
                <div
                  key={item.q}
                  className={[
                    "border-slate-100",
                    i === 0 ? "" : "border-t",
                  ].join(" ")}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIdx(open ? -1 : i)}
                    aria-expanded={open}
                    className="flex w-full items-center justify-between gap-4 px-7 py-5 text-start transition-colors hover:bg-slate-50/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1f6bff]/45 sm:py-6"
                  >
                    <span className="text-[16.5px] font-extrabold tracking-tight text-[#0a1f44]">
                      {item.q}
                    </span>
                    <span
                      className={[
                        "grid h-9 w-9 shrink-0 place-items-center rounded-full transition-all duration-300",
                        open
                          ? "bg-[#0a1f44] text-white rotate-45"
                          : "bg-slate-100 text-slate-600",
                      ].join(" ")}
                    >
                      <Plus className="h-4 w-4" strokeWidth={2.4} />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open ? (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: easing }}
                        className="overflow-hidden"
                      >
                        <div className="px-7 pb-6 pt-0 text-[15px] leading-[1.78] text-slate-600">
                          {item.a}
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

