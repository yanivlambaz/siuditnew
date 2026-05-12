import Link from "next/link";

import SiteHeader from "../_components/SiteHeader";
import SiteFooter from "../_components/SiteFooter";
import DeferredClientEngagement from "../_components/DeferredClientEngagement";
import Container from "../_components/ui/Container";
import SectionHeading from "../_components/sections/SectionHeading";
import { services } from "../_data/services";
import { absoluteUrl, canonicalPath } from "../lib/seo";
import { publicWhatsappHref } from "../lib/contactUrls";

export const metadata = {
  title: "שירותי אחות פרטית — דפי SEO מלאים | סיעוד פרימיום",
  description:
    "אחות פרטית לבית, לבית חולים, אחרי ניתוח, משמרות לילה, טיפולי IV, פליאטיבי, שיקום והשגחה רפואית. בחרו שירות לקריאת מדריך מלא.",
  alternates: canonicalPath("/services"),
  openGraph: { url: absoluteUrl("/services"), title: "שירותי אחות פרטית", locale: "he_IL" },
};

export default function ServicesIndexPage() {
  const whatsappHref = publicWhatsappHref();
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="pb-24 pt-10">
        <Container size="wide">
          <nav className="text-[13px] text-slate-500" aria-label="שביל ניווט">
            <ol className="flex flex-wrap gap-2">
              <li>
                <Link href="/" className="hover:text-[#1f6bff]">
                  עמוד הבית
                </Link>
                <span className="mx-2 text-slate-300">/</span>
              </li>
              <li className="font-semibold text-[#0a1f44]">שירותים</li>
            </ol>
          </nav>

          <SectionHeading
            className="mt-10"
            align="start"
            eyebrow="מחוזות טיפול"
            title="שירותי אחות פרטית — תוכן ארוך, FAQ וטופס המרות"
            subtitle="כל שירות נפתח בדף ייעודי עם מבנה SEO מלא, קישורים פנימיים לבלוג ולערים, וקריאה לפעולה ברורה."
          />

          <ul className="mt-14 grid gap-4 md:grid-cols-2">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="block rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-0.5 hover:border-[#1f6bff]/30 hover:shadow-md"
                >
                  <h2 className="text-[18px] font-extrabold text-[#0a1f44]">{s.title}</h2>
                  <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{s.shortDescription}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-[14px] font-bold text-[#1f6bff]">
                    לקריאת המדריך
                    <span aria-hidden>←</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </main>
      <SiteFooter />
      <DeferredClientEngagement whatsappHref={whatsappHref} siteMode="standard" />
    </div>
  );
}
