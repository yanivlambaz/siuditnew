import Link from "next/link";

import SiteHeader from "../_components/SiteHeader";
import SiteFooter from "../_components/SiteFooter";
import DeferredClientEngagement from "../_components/DeferredClientEngagement";
import Container from "../_components/ui/Container";
import SectionHeading from "../_components/sections/SectionHeading";
import { blogPosts } from "../_data/blogPosts";
import { FAQ, getFaqJsonLd } from "../_components/sections/faqData";
import { absoluteUrl, canonicalPath } from "../lib/seo";
import { publicWhatsappHref } from "../lib/contactUrls";
import { serializeJsonLd } from "../lib/serializeJsonLd";

export const metadata = {
  title: "בלוג סיעוד ואחות פרטית — מדריכים מקצועיים | סיעודית",
  description:
    "מעל 30 מדריכי SEO: אחות פרטית, אחות לבית חולים, אחרי ניתוח, עלויות, לילה, קשישים, פליאטיבי ועוד. כל המאמרים עם FAQ וקישורים פנימיים.",
  alternates: canonicalPath("/blog"),
  openGraph: { url: absoluteUrl("/blog"), title: "בלוג סיעודית", locale: "he_IL" },
};

export default function BlogIndexPage() {
  const sorted = [...blogPosts].sort((a, b) => (a.published < b.published ? 1 : -1));
  const faqJsonLd = getFaqJsonLd(FAQ.slice(0, 6));
  const whatsappHref = publicWhatsappHref();

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqJsonLd) }}
      />
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
              <li className="font-semibold text-[#0a1f44]">בלוג</li>
            </ol>
          </nav>

          <SectionHeading
            className="mt-10"
            align="start"
            eyebrow="למידה מקצועית"
            title="בלוג — מדריכים לאחות פרטית בישראל"
            subtitle="תכנים לחיפושים כמו אחות פרטית, אחות לבית, אחות לבית חולים, אחות אחרי ניתוח, אחות סיעודית ועוד. כל כתבה כוללת מבנה H2/H3, שאלות נפוצות, וקישורים לשירותים ולערים."
          />

          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sorted.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-[#1f6bff]/30 hover:shadow-md"
                >
                  <time className="text-[12px] font-bold text-slate-400">{p.published}</time>
                  <h2 className="mt-2 flex-1 text-[17px] font-extrabold leading-snug text-[#0a1f44]">
                    {p.title}
                  </h2>
                  <p className="mt-3 line-clamp-3 text-[14px] leading-relaxed text-slate-600">{p.metaDescription}</p>
                  <span className="mt-4 text-[13px] font-bold text-[#1f6bff]">קראו עוד ←</span>
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
