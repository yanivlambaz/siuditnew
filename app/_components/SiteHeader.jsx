"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import BrandLockup from "./BrandLockup";
import Container from "./ui/Container";
import Button from "./ui/Button";
import { buildTelHrefClient, buildWhatsappHrefClient } from "./leadCapture/contactHref";
import { orgPhoneDisplayIl } from "../lib/orgPhone";

const NAV_LINKS = [
  { label: "שירותים", href: "/services" },
  { label: "ערים", href: "/cities" },
  { label: "בתי חולים", href: "/hospitals" },
  { label: "אודות", href: "/about" },
  { label: "הצוות המקצועי", href: "/team" },
  { label: "מדריכים", href: "/guides" },
  { label: "בלוג", href: "/blog" },
  { label: "איך זה עובד", href: "/#process" },
  { label: "יצירת קשר", href: "/#contact" },
];

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={[
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-[0_1px_0_rgba(15,23,42,0.06),0_10px_30px_-20px_rgba(15,23,42,0.18)]"
          : "bg-white/40 backdrop-blur-md",
      ].join(" ")}
    >
      <Container size="wide" className="flex h-[72px] items-center justify-between gap-4">
        <Link
          href="/"
          aria-label="לעמוד הבית"
          className="shrink min-w-0 transition hover:opacity-90"
        >
          <BrandLockup theme="light" />
        </Link>

        <nav
          className="hidden items-center gap-8 text-[14px] font-semibold text-slate-600 lg:flex"
          aria-label="ניווט ראשי"
        >
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="relative transition hover:text-[#0a1f44] after:pointer-events-none after:absolute after:inset-x-0 after:-bottom-1.5 after:h-px after:origin-right after:scale-x-0 after:bg-[#0a1f44] after:transition-transform after:duration-300 hover:after:scale-x-100"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <a
            href={buildTelHrefClient()}
            className="hidden min-w-0 items-center gap-2 rounded-full px-3 py-2 text-[13px] font-bold text-[#0a1f44] ring-1 ring-slate-200/90 transition hover:bg-slate-50 md:inline-flex"
          >
            <Phone className="h-4 w-4 shrink-0 text-[#1f6bff]" strokeWidth={2.4} />
            <span className="tabular-nums tracking-tight">{orgPhoneDisplayIl()}</span>
          </a>
          <a
            href={buildWhatsappHrefClient()}
            target="_blank"
            rel="noreferrer"
            className="hidden h-11 items-center gap-2 rounded-full bg-emerald-50 px-3.5 text-[13px] font-bold text-emerald-900 ring-1 ring-emerald-200/90 transition hover:bg-emerald-100/90 lg:inline-flex"
          >
            <MessageCircle className="h-4 w-4 shrink-0 text-[#128C7E]" strokeWidth={2.3} />
            WhatsApp מיידי
          </a>
          <Button as="a" href="/#contact" variant="primary" size="sm" className="hidden sm:inline-flex">
            דברו איתנו
          </Button>
          <button
            type="button"
            aria-label={open ? "סגירת תפריט" : "פתיחת תפריט"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white/80 text-[#0a1f44] transition hover:bg-white lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      <div
        className={[
          "lg:hidden overflow-hidden border-t border-slate-200/60 bg-white/95 backdrop-blur-xl transition-[max-height,opacity] duration-300 ease-out",
          open ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0",
        ].join(" ")}
      >
        <Container size="wide" className="py-4">
          <nav className="flex flex-col" aria-label="ניווט נייד">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-slate-100 py-3 text-[15px] font-semibold text-slate-700 transition hover:text-[#0a1f44]"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-4 grid gap-2 border-t border-slate-100 pt-4">
              <a
                href={buildTelHrefClient()}
                className="flex items-center justify-center gap-2 rounded-2xl bg-[#0a1f44] py-3.5 text-[15px] font-extrabold text-white shadow-sm transition active:scale-[0.99]"
              >
                <Phone className="h-5 w-5" strokeWidth={2.3} />
                חייגו עכשיו · {orgPhoneDisplayIl()}
              </a>
              <a
                href={buildWhatsappHrefClient()}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50/95 py-3.5 text-[15px] font-extrabold text-emerald-900 transition active:scale-[0.99]"
              >
                <MessageCircle className="h-5 w-5 text-[#128C7E]" strokeWidth={2.2} />
                WhatsApp מיידי
              </a>
            </div>
            <div className="pt-4">
              <Button
                as="a"
                href="/#contact"
                variant="gradient"
                size="md"
                className="w-full"
                onClick={() => setOpen(false)}
              >
                קבלו אחות עכשיו
              </Button>
            </div>
          </nav>
        </Container>
      </div>
    </header>
  );
}
