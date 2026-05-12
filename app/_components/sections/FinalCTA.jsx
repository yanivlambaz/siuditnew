"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Phone, MessageCircle } from "lucide-react";
import Container from "../ui/Container";
import Button from "../ui/Button";
import { buildTelHrefClient, buildWhatsappHrefClient } from "../leadCapture/contactHref";

const easing = [0.22, 1, 0.36, 1];

export default function FinalCTA() {
  const telHref = buildTelHrefClient();
  const waHref = buildWhatsappHrefClient();
  return (
    <section className="relative isolate overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[#04122e]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-90"
        style={{
          backgroundImage:
            "radial-gradient(1000px circle at 15% 20%, rgba(31,107,255,0.55), transparent 55%), radial-gradient(900px circle at 85% 90%, rgba(95,209,240,0.4), transparent 55%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-noise opacity-40"
      />

      <Container size="wide" className="relative py-28 sm:py-40 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: easing }}
          className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-[11.5px] font-bold uppercase tracking-[0.18em] text-white ring-1 ring-white/20 backdrop-blur"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          זמינים עכשיו · חוזרים תוך דקות
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: easing, delay: 0.05 }}
          className="mx-auto mt-7 max-w-3xl text-balance text-[42px] font-extrabold leading-[1.04] tracking-tight text-white sm:text-[60px] md:text-[72px]"
        >
          אל תחכו לרגע הקריטי.
          <br />
          <span className="bg-gradient-to-l from-[#5fd1f0] via-white to-[#5fd1f0] bg-clip-text text-transparent">
            קבלו אחות עכשיו.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: easing, delay: 0.15 }}
          className="mx-auto mt-7 max-w-2xl text-pretty text-[18px] leading-[1.7] text-slate-300 sm:text-[19px]"
        >
          אחות פרטית מוסמכת בבית או בבית חולים. התאמה אישית, מענה תוך דקות
          וזמינות 24/7 — שקט נפשי שכל משפחה ראויה לו.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: easing, delay: 0.25 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-3"
        >
          <Button
            as="a"
            href="#contact"
            variant="gradient"
            size="xl"
            className="px-12"
          >
            <Phone className="h-5 w-5" strokeWidth={2.4} />
            קבלו אחות עכשיו
            <ArrowLeft className="h-5 w-5 transition-transform group-hover/btn:-translate-x-1" />
          </Button>
          <Button as="a" href="#services" variant="outline" size="xl">
            גלו את השירותים
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: easing, delay: 0.32 }}
          className="mt-5 flex flex-wrap items-center justify-center gap-3"
        >
          <Button as="a" href={telHref} variant="outline" size="xl">
            <Phone className="h-5 w-5" strokeWidth={2.4} />
            חייגו עכשיו
          </Button>
          <Button
            as="a"
            href={waHref}
            target="_blank"
            rel="noreferrer"
            variant="whatsapp"
            size="xl"
          >
            <MessageCircle className="h-5 w-5" strokeWidth={2.2} />
            WhatsApp מיידי
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
