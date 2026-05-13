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

/** נשמר ללא שינוי לעומת הדף הקודם — SEO זהה */
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
    <div className="relative min-h-screen overflow-x-clip bg-white">
      <SiteHeader />

      <main id="top" className="pb-20 pt-8 sm:pb-28 sm:pt-12">
        <Container size="wide">
          <article className="mx-auto max-w-2xl rounded-2xl bg-white px-4 py-2 sm:px-6">
            <header className="mb-10 text-center sm:mb-12">
              <h1 className="text-balance text-[2rem] font-extrabold leading-tight tracking-tight text-[#0a1f44] sm:text-[2.5rem]">
                מדיניות פרטיות
              </h1>
              <p className="mt-4 text-[17px] font-semibold leading-relaxed text-slate-700 sm:text-lg">
                סיעוד פרימיום | siudit.co.il
              </p>
              <div className="mt-8 sm:mt-10">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-5 py-2.5 text-[14px] font-bold text-[#0a1f44] shadow-sm transition hover:border-slate-300 hover:bg-white"
                >
                  חזרה לעמוד הבית
                </Link>
              </div>
            </header>

            <div className="space-y-10 text-[15px] leading-[1.85] text-slate-700 sm:text-[15.5px] sm:leading-[1.8]">
              <section aria-labelledby="privacy-placeholder-heading">
                <h2 id="privacy-placeholder-heading" className="mb-4 text-xl font-extrabold text-[#0a1f44] sm:text-2xl">
                  נוסח מדיניות הפרטיות
                </h2>
                <p>
                  התוכן המלא של מדיניות הפרטיות יוטמע כאן בדיוק כפי שימסר, ללא עריכת ניסוח. ניתן להדביק בפנייה הבאה
                  את הנוסח המלא — והוא יחליף את פיסת טקסט זו.
                </p>
              </section>
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
