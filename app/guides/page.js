import Link from "next/link";
import SiteHeader from "../_components/SiteHeader";
import SiteFooter from "../_components/SiteFooter";
import DeferredClientEngagement from "../_components/DeferredClientEngagement";
import Container from "../_components/ui/Container";
import SectionHeading from "../_components/sections/SectionHeading";
import { topicPillars, servicesForPillar, postsForPillar } from "../_data/topicClusters";
import { hospitals } from "../_data/hospitals";
import { cities } from "../_data/cities";
import { absoluteUrl, canonicalPath, faqPageJsonLd } from "../lib/seo";
import { publicWhatsappHref } from "../lib/contactUrls";
import { serializeJsonLd } from "../lib/serializeJsonLd";

/* Reuse homepage FAQ tone for index 'about the hub' */
const GUIDE_FAQ = [
  {
    q: "למה האתר בנוי ב'מפת נושאים'?",
    a: "כדי לחבר בין שירותים, מדריכים ועמודים מקומיים (ערים ובתי חולים) בצורה שקוף למשתמש ולגוגל — סמכות טופית לאורך זמן.",
  },
  {
    q: "איך בוחרים נקודת כניסה נכונה?",
    a: "אם יודעים איפה האשפוז או בית החולים — התחילו מדף בית החולים או הערים. אם מחפשים הבנה כללית — התחילו מהבלוג או מדף שירות מתאים.",
  },
  {
    q: "מתי לפנות למד״א או למיון?",
    a: "בחולשה פתאומית, קושי נשימתי, כאב חזה, אובדן הכרה או כל חשש לחיים — מיד חירום. האחות הפרטית מסייעת בהמשכיות אחרי יציבות קלינית.",
  },
  {
    q: "האם האחיות מוסמכות?",
    a: "כן — השיבוץ נעשה לאחר בדיקת רישיון משרד הבריאות והתאמת ניסיון למקרה.",
  },
];

export const metadata = {
  title: "מדריך סמכות — אחות פרטית בישראל | סיעודית",
  description:
    "עמוד עוגן: מפת נושאים, שירותים, בלוג, ערים ובתי חולים — המסלול המלא לליווי אחות פרטית בפריסה ארצית.",
  alternates: canonicalPath("/guides"),
  openGraph: { url: absoluteUrl("/guides"), locale: "he_IL" },
};

export default function GuidesHubPage() {
  const faqLd = faqPageJsonLd(GUIDE_FAQ);
  const whatsappHref = publicWhatsappHref();

  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqLd) }} />

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
              <li className="font-semibold text-[#0a1f44]">מדריך ומפת נושאים</li>
            </ol>
          </nav>

          <SectionHeading
            className="mt-10"
            align="start"
            eyebrow="Pillar + clusters"
            title="המסלול המלא: מאחות פרטית בבית ועד ליד כל בית חולים מרכזי"
            subtitle="בחרו ציר נושא, היכנסו לשירות הרלוונטי או למדריך — ומשם המשיכו לעמוד עיר / בית חולים לפי שם החיפוש שלכם."
          />

          <div className="mt-12 rounded-3xl border border-slate-200 bg-white p-8 ring-1 ring-slate-100 sm:p-10">
            <h2 className="text-xl font-extrabold text-[#0a1f44]">ניווט עומק באתר</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 text-[14.5px] font-semibold">
              <li>
                <Link href="/about" className="text-[#1f6bff] hover:underline">
                  אודות — מי אנחנו ומה העקרונות
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-[#1f6bff] hover:underline">
                  הצוות המקצועי — תהליכי שיבוץ ובקרה
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-[#1f6bff] hover:underline">
                  כל דפי השירותים (עמוד מפתח)
                </Link>
              </li>
              <li>
                <Link href="/cities" className="text-[#1f6bff] hover:underline">
                  כל דפי הערים
                </Link>
              </li>
              <li>
                <Link href="/hospitals" className="text-[#1f6bff] hover:underline">
                  כל דפי בתי החולים ({hospitals.length})
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-[#1f6bff] hover:underline">
                  כל המאמרים
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-[#1f6bff] hover:underline">
                  טופס לידים (דף הבית)
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="text-[#1f6bff] hover:underline">
                  שאלות נפוצות (דף הבית)
                </Link>
              </li>
            </ul>
          </div>

          <div className="mt-14 space-y-8">
            {topicPillars.map((pillar) => {
              const svc = servicesForPillar(pillar);
              const posts = postsForPillar(pillar);
              return (
                <div key={pillar.slug} className="rounded-2xl border border-slate-200 bg-[#f7f9fc]/50 p-6 sm:p-8">
                  <h3 className="text-[22px] font-extrabold text-[#0a1f44]">{pillar.title}</h3>
                  <p className="mt-2 text-[15px] text-slate-600">{pillar.description}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {svc.map((s) => (
                      <Link
                        key={s.slug}
                        href={`/services/${s.slug}`}
                        className="rounded-full bg-white px-4 py-2 text-[13px] font-bold text-[#0a1f44] ring-1 ring-slate-200 hover:ring-[#1f6bff]/35"
                      >
                        {s.title}
                      </Link>
                    ))}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {posts.map((p) => (
                      <Link
                        key={p.slug}
                        href={`/blog/${p.slug}`}
                        className="rounded-full bg-white px-4 py-2 text-[13px] font-semibold text-slate-700 ring-1 ring-slate-200 hover:text-[#1f6bff]"
                      >
                        {p.title}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <SectionHeading className="mt-16" align="start" eyebrow="מיקומים" title="ערים ובתי חולים" subtitle="" />
          <div className="mt-6 flex flex-wrap gap-2">
            {cities.slice(0, 12).map((c) => (
              <Link
                key={c.slug}
                href={`/cities/${c.slug}`}
                className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[12.5px] font-semibold text-slate-700 hover:border-[#1f6bff]/30"
              >
                {c.name}
              </Link>
            ))}
            <Link href="/cities" className="rounded-full bg-[#0a1f44] px-3 py-1.5 text-[12.5px] font-bold text-white">
              + כל הערים
            </Link>
          </div>
        </Container>

        <Container size="wide" className="mt-16">
          <SectionHeading align="start" eyebrow="שאלות על המדריך" title="FAQ — מבנה האתר" />
          <div className="mt-8 max-w-3xl divide-y divide-slate-200 rounded-3xl bg-white ring-1 ring-slate-200/70">
            {GUIDE_FAQ.map((item) => (
              <div key={item.q} className="px-6 py-5 sm:px-8">
                <h3 className="font-extrabold text-[#0a1f44]">{item.q}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{item.a}</p>
              </div>
            ))}
          </div>
        </Container>
      </main>
      <SiteFooter />
      <DeferredClientEngagement whatsappHref={whatsappHref} siteMode="standard" />
    </div>
  );
}
