import Link from "next/link";
import SiteHeader from "../SiteHeader";
import SiteFooter from "../SiteFooter";
import WhatsAppFab from "../WhatsAppFab";
import MobileStickyCTA from "../MobileStickyCTA";
import DeferredClientEngagement from "../DeferredClientEngagement";
import Container from "../ui/Container";
import CookiePreferencesButton from "./CookiePreferencesButton";
import { publicWhatsappHref } from "../../lib/contactUrls";
import { orgTelHref } from "../../lib/orgPhone";

const LEGAL_PAGES = [
  { href: "/privacy-policy", label: "מדיניות פרטיות" },
  { href: "/terms", label: "תנאי שימוש" },
  { href: "/accessibility", label: "הצהרת נגישות" },
];

/**
 * Shared, RTL, responsive layout for all legal pages.
 * Provides consistent branding, heading hierarchy, readable width, internal
 * cross-linking between the legal pages and a "last updated" line.
 *
 * @param {{ title: string, lastUpdated: string, current: string, children: React.ReactNode }} props
 */
export default function LegalPageLayout({ title, lastUpdated, current, children }) {
  const whatsappHref = publicWhatsappHref();

  return (
    <div className="relative min-h-screen overflow-x-clip bg-white">
      <SiteHeader />

      <main id="top" className="pb-20 pt-8 sm:pb-28 sm:pt-12">
        <Container size="wide">
          <article className="mx-auto max-w-3xl">
            <header className="mb-8 sm:mb-10">
              <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#1851d8]">
                מסמכים משפטיים · Siudit
              </p>
              <h1 className="mt-3 text-balance text-[2rem] font-extrabold leading-tight tracking-tight text-[#0a1f44] sm:text-[2.5rem]">
                {title}
              </h1>
              {lastUpdated ? (
                <p className="mt-3 text-[13.5px] font-medium text-slate-500">
                  עודכן לאחרונה: {lastUpdated}
                </p>
              ) : null}

              <nav
                aria-label="ניווט מסמכים משפטיים"
                className="mt-6 flex flex-wrap gap-2"
              >
                {LEGAL_PAGES.filter((p) => p.href !== current).map((p) => (
                  <Link
                    key={p.href}
                    href={p.href}
                    className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-[13px] font-bold text-[#0a1f44] transition hover:border-slate-300 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1f6bff]/45"
                  >
                    {p.label}
                  </Link>
                ))}
                <CookiePreferencesButton className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-[13px] font-bold text-[#0a1f44] transition hover:border-slate-300 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1f6bff]/45" />
              </nav>
            </header>

            <div className="space-y-6 sm:space-y-8">{children}</div>

            <div className="mt-12 border-t border-slate-200 pt-6">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-5 py-2.5 text-[14px] font-bold text-[#0a1f44] shadow-sm transition hover:border-slate-300 hover:bg-white"
              >
                חזרה לעמוד הבית
              </Link>
            </div>
          </article>
        </Container>
      </main>

      <SiteFooter />
      <WhatsAppFab href={whatsappHref} telHref={orgTelHref()} />
      <DeferredClientEngagement whatsappHref={whatsappHref} siteMode="standard" />
      <MobileStickyCTA whatsappHref={whatsappHref} />
    </div>
  );
}

/** Reusable card section for legal content. */
export function LegalSection({ id, title, children }) {
  return (
    <section
      id={id}
      aria-labelledby={id ? `${id}-h` : undefined}
      className="scroll-mt-28 rounded-[1.5rem] border border-slate-200/85 bg-white/90 p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_14px_36px_-20px_rgba(15,23,42,0.12)] sm:p-8"
    >
      {title ? (
        <h2
          id={id ? `${id}-h` : undefined}
          className="text-balance border-e-4 border-[#1f6bff] pe-4 text-xl font-extrabold tracking-tight text-[#0a1f44] sm:text-[1.35rem]"
        >
          {title}
        </h2>
      ) : null}
      <div className={title ? "mt-5 space-y-4" : "space-y-4"}>{children}</div>
    </section>
  );
}

export function LegalP({ children, className = "" }) {
  return (
    <p
      className={[
        "text-pretty text-[15px] leading-[1.85] text-slate-700",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </p>
  );
}

export function LegalList({ items }) {
  return (
    <ul className="list-inside list-disc space-y-2 ps-1 text-[15px] leading-[1.8] text-slate-700 marker:text-[#1f6bff]">
      {items.map((t, i) => (
        <li key={i} className="ps-1">
          {t}
        </li>
      ))}
    </ul>
  );
}
