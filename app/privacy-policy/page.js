import Link from "next/link";
import SiteHeader from "../_components/SiteHeader";
import SiteFooter from "../_components/SiteFooter";
import WhatsAppFab from "../_components/WhatsAppFab";
import MobileStickyCTA from "../_components/MobileStickyCTA";
import DeferredClientEngagement from "../_components/DeferredClientEngagement";
import Container from "../_components/ui/Container";
import { absoluteUrl, canonicalPath } from "../lib/seo";
import { publicWhatsappHref } from "../lib/contactUrls";
import { orgTelHref } from "../lib/orgPhone";
import PrivacyPolicySections from "./PrivacyPolicySections";

const LAST_UPDATED_LABEL = "14.8.25";

export const metadata = {
  title: "מדיניות פרטיות · תקנון עוגיות | סיעוד פרימיום",
  description:
    "מדיניות הפרטיות של סיעוד פרימיום: איסוף מידע, עוגיות ומעקב, שיתוף עם צדדים שלישיים, זכויות נושאי מידע ופרטי התקשרות.",
  alternates: canonicalPath("/privacy-policy"),
  robots: { index: true, follow: true },
  openGraph: {
    url: absoluteUrl("/privacy-policy"),
    locale: "he_IL",
    title: "מדיניות פרטיות | סיעוד פרימיום",
    description: "תקנון פרטיות ושימוש ב-Cookies — סיעוד פרימיום",
  },
};

export default function PrivacyPolicyPage() {
  const whatsappHref = publicWhatsappHref();

  return (
    <div className="relative min-h-screen overflow-x-clip">
      <SiteHeader />

      <main id="top" className="pb-16 pt-8 sm:pb-28 sm:pt-14">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[min(52vh,420px)] bg-[radial-gradient(ellipse_90%_70%_at_50%_-10%,rgba(219,234,254,0.75),transparent),radial-gradient(ellipse_60%_50%_at_15%_30%,rgba(207,250,254,0.45),transparent)]"
        />

        <Container size="wide">
          <nav className="text-[13px] text-slate-600" aria-label="שביל ניווט">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="font-medium transition hover:text-[#1f6bff]">
                  עמוד הבית
                </Link>
              </li>
              <span className="text-slate-300">/</span>
              <li className="font-semibold text-[#0a1f44]">מדיניות פרטיות</li>
            </ol>
          </nav>

          <header className="mx-auto mt-10 max-w-3xl text-center sm:mt-14">
            <p className="text-[12px] font-bold uppercase tracking-[0.22em] text-[#1851d8]">מסמך משפטי · קריאה נוחה</p>
            <h1 className="mt-4 text-balance text-[2rem] font-extrabold tracking-tight text-[#0a1f44] sm:text-[2.75rem] sm:leading-[1.08]">
              מדיניות פרטיות
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-[16px] leading-[1.8] text-slate-600 sm:text-[17px]">
              מידע מהימן ומסודר על איסוף ושימוש במידע אישי, עוגיות, כלי מעקב וזכויותיכם — בכפוף לדין הישראלי.
            </p>
          </header>

          <div className="mx-auto mt-12 max-w-4xl sm:mt-16">
            <PrivacyPolicySections />
          </div>

          <aside className="mx-auto mt-14 max-w-4xl rounded-3xl border border-slate-200/90 bg-gradient-to-br from-[#0a1f44] to-[#142a52] p-6 text-white shadow-[0_24px_60px_-28px_rgba(10,31,68,0.45)] ring-1 ring-white/10 sm:p-8">
            <p className="text-[13px] font-bold uppercase tracking-[0.16em] text-cyan-200/90">תאריך עדכון</p>
            <p className="mt-3 text-lg font-extrabold sm:text-xl">מדיניות פרטיות זו מעודכנת ליום: {LAST_UPDATED_LABEL}</p>
            <p className="mt-3 text-[14px] leading-relaxed text-slate-200/90">
              לשאלות נוספות ניתן לפנות אלינו בטלפון{" "}
              <a href="tel:033742666" className="font-bold text-white underline-offset-4 hover:underline">
                03-3742666
              </a>{" "}
              או בדוא״ל{" "}
              <a href="mailto:info@siud.org" className="font-bold text-cyan-200 underline-offset-4 hover:text-white hover:underline">
                info@siud.org
              </a>
              .
            </p>
          </aside>

          <p className="mx-auto mt-10 max-w-3xl text-center text-[15px] text-slate-600">
            <Link href="/#contact" className="font-extrabold text-[#1851d8] underline-offset-4 transition hover:text-[#1f6bff] hover:underline">
              מעבר לטופס יצירת קשר באתר
            </Link>
          </p>
        </Container>
      </main>

      <SiteFooter />
      <WhatsAppFab href={whatsappHref} telHref={orgTelHref()} />
      <DeferredClientEngagement whatsappHref={whatsappHref} siteMode="standard" />
      <MobileStickyCTA whatsappHref={whatsappHref} />
    </div>
  );
}
