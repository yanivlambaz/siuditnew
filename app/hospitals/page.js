import Link from "next/link";
import SiteHeader from "../_components/SiteHeader";
import SiteFooter from "../_components/SiteFooter";
import DeferredClientEngagement from "../_components/DeferredClientEngagement";
import Container from "../_components/ui/Container";
import SectionHeading from "../_components/sections/SectionHeading";
import { hospitals } from "../_data/hospitals";
import { cityBySlug } from "../_data/cities";
import { absoluteUrl, canonicalPath } from "../lib/seo";
import { publicWhatsappHref } from "../lib/contactUrls";

export const metadata = {
  title: "בתי חולים — אחות פרטית ליד מרכזים רפואיים בישראל | סיעודית",
  description:
    "דפי נחיתה לפי בתי חולים מרכזיים: ליווי מוסמך במחלקה, המשכיות אחרי שחרור ותיאום ארצי. בחרו בית חולים וקבלו מידע ממוקד.",
  alternates: canonicalPath("/hospitals"),
  openGraph: { url: absoluteUrl("/hospitals"), locale: "he_IL" },
};

export default function HospitalsIndexPage() {
  const grouped = [...hospitals].sort((a, b) => a.region.localeCompare(b.region, "he"));
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
              <li className="font-semibold text-[#0a1f44]">בתי חולים</li>
            </ol>
          </nav>

          <SectionHeading
            className="mt-10"
            align="start"
            eyebrow="מבנה סמכות מקומי"
            title="אחות פרטית ליד בתי חולים מרכזיים"
            subtitle="כל דף מקשר לעיר הרלוונטית, לשירותים ולמדריכים — כדי לענות על חיפושים סביב «אחות פרטית + בית חולים» עם הקשר קליני אמיתי."
          />

          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {grouped.map((h) => {
              const city = cityBySlug(h.citySlug);
              return (
                <li key={h.slug}>
                  <Link
                    href={`/hospitals/${h.slug}`}
                    className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-[#1f6bff]/28 hover:shadow-md"
                  >
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{h.region}</span>
                    <h2 className="mt-1 text-[17px] font-extrabold text-[#0a1f44]">{h.name}</h2>
                    {city ? (
                      <span className="mt-2 text-[13px] font-medium text-slate-500">אזור: {city.name}</span>
                    ) : null}
                    <p className="mt-3 line-clamp-3 flex-1 text-[14px] leading-relaxed text-slate-600">{h.context}</p>
                    <span className="mt-4 text-[13px] font-bold text-[#1f6bff]">למדריך ליד {h.shortName} ←</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </main>
      <SiteFooter />
      <DeferredClientEngagement whatsappHref={whatsappHref} siteMode="standard" />
    </div>
  );
}
