"use client";

import { motion } from "framer-motion";
import { Users, Clock, BadgeCheck, MapPin, Award, Stethoscope } from "lucide-react";
import Container from "../ui/Container";

const easing = [0.22, 1, 0.36, 1];

const ITEMS = [
  { value: "פריסה ארצית", label: "ליווי בבית ובית חולים", icon: Users },
  { value: "תוך שעות", label: "תיאום טיפוסי בדחיפות", icon: Clock },
  { value: "רישוי בתוקף", label: "אימות מול משרד הבריאות", icon: BadgeCheck },
  { value: "מצפון לדרום", label: "בית חולים ושחרור הביתה", icon: MapPin },
  { value: "צוות בוגר", label: "ניסיון מוסדי וקהילה", icon: Award },
  { value: "התמחויות", label: "מאשפוז ועד שיקום", icon: Stethoscope },
];

export default function TrustStrip() {
  return (
    <section className="relative border-y border-slate-200/70 bg-white/65 backdrop-blur-md">
      <Container size="wide" className="py-7 sm:py-9">
        <div className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3 lg:grid-cols-6 lg:gap-x-8">
          {ITEMS.map((t, i) => (
            <motion.div
              key={t.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: easing, delay: i * 0.05 }}
              className="group flex items-center gap-3 rounded-2xl py-1 transition-colors hover:bg-slate-50/80"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-50 text-[#1f6bff] ring-1 ring-blue-100/80 transition duration-300 group-hover:bg-[#1f6bff] group-hover:text-white group-hover:shadow-md group-hover:shadow-blue-500/20">
                <t.icon className="h-[18px] w-[18px]" strokeWidth={2.2} />
              </span>
              <div className="min-w-0">
                <div className="truncate text-[13.5px] font-extrabold text-[#0a1f44]">
                  {t.value}
                </div>
                <div className="truncate text-[11.5px] font-medium text-slate-500">
                  {t.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
