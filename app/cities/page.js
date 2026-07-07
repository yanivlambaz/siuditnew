import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  CheckCircle2,
  HeartPulse,
  MapPinned,
  ShieldCheck,
  Sparkles,
  Stethoscope,
} from "lucide-react";

import SiteHeader from "../_components/SiteHeader";
import SiteFooter from "../_components/SiteFooter";
import DeferredClientEngagement from "../_components/DeferredClientEngagement";
import CitiesDirectoryClient from "../_components/cities/CitiesDirectoryClient";
import CitiesStickyContact from "../_components/cities/CitiesStickyContact";
import Container from "../_components/ui/Container";
import { cities } from "../_data/cities";
import { hospitals } from "../_data/hospitals";
import { absoluteUrl, canonicalPath, citiesNationwideHubGraphJsonLd } from "../lib/seo";
import { orgPhoneDisplayIl, orgTelHref } from "../lib/orgPhone";
import { publicWhatsappHref } from "../lib/contactUrls";
import { serializeJsonLd } from "../lib/serializeJsonLd";

const FEATURED_SLUGS = ["tel-aviv", "jerusalem", "haifa", "beer-sheva", "netanya", "rishon-lezion"];

export const metadata = {
  title: "אחות פרטית בכל הארץ | סיעודית — שירות אחיות 24/7",
  description:
    "מרכז שירות ארצי: אחות פרטית לבית חולים או לבית בתל אביב, ירושלים, חיפה, באר שבע, נתניה, השרון והפריפריה. חיפוש עיר, מפת כיסוי, בתי חולים מרכזיים ומענה Whatsapp.",
  alternates: canonicalPath("/cities"),
  openGraph: {
    url: absoluteUrl("/cities"),
    title: "אחות פרטית בפריסה ארצית — סיעודית",
    description: "האינדקס המלא לעיר שלכם: מדריכים מקומיים, ליד בתי חולים, והתאמת אחות מוסמכת.",
    locale: "he_IL",
  },
};

export default function CitiesIndexPage() {
  const hubJsonLd = citiesNationwideHubGraphJsonLd();
  const whatsappHref = publicWhatsappHref();
  const telHref = orgTelHref();
  const phoneDisplay = orgPhoneDisplayIl();

  const sorted = [...cities].sort((a, b) => a.name.localeCompare(b.name, "he"));
  const featured = FEATURED_SLUGS.map((slug) => cities.find((c) => c.slug === slug)).filter(Boolean);
  const cityDirectoryPayload = sorted.map((c) => ({
    slug: c.slug,
    name: c.name,
    region: c.region,
    hospitals: c.hospitals ?? [],
  }));

  const hospitalShowcase = hospitals.slice(0, 9);

  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(hubJsonLd) }} />

      <SiteHeader />
      <main className="relative pb-32 pt-0">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#04122e] via-[#0a1f44] to-[#143a8f] text-white">
          <div className="pointer-events-none absolute inset-0 opacity-30">
            <div className="absolute -start-20 top-10 h-72 w-72 rounded-full bg-[#1f6bff] blur-[100px]" />
            <div className="absolute -end-16 bottom-0 h-80 w-80 rounded-full bg-[#5fd1f0] blur-[110px]" />
          </div>
          <Container size="wide" className="relative py-14 sm:py-20 lg:py-24">
            <nav aria-label="שביל ניווט" className="text-[13px] text-slate-300">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/" className="transition hover:text-white">
                    עמוד הבית
                  </Link>
                  <span className="mx-2 text-slate-500">/</span>
                </li>
                <li className="font-semibold text-white">פריסה ארצית וערים</li>
              </ol>
            </nav>

            <div className="mt-10 flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-3xl">
                <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-[12.5px] font-bold tracking-wide text-[#c7e4ff] backdrop-blur">
                  <Sparkles className="h-4 w-4 text-[#5fd1f0]" aria-hidden />
                  האינדקס הארצי המוביל — אחות פרטית בישראל
                </p>
                <h1 className="mt-6 text-3xl font-black leading-[1.15] tracking-tight sm:text-4xl lg:text-[2.65rem]">
                  שירות רפואי פרטי ארצי — מענה ליד כל בית חולים ומדריך מקומי לכל עיר מרכזית
                </h1>
                <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-slate-200 sm:text-[17px]">
                  סיעודית מנגישה אחיות מוסמכות משרד הבריאות לכל שלב — אשפוז, שחרור, החלמה בבית והמשכיות טיפולית —
                  עם תיעוד מקצועי, שפות מרובות והיכרות מעשית עם בתי החולים שבהם אתם נמצאים. זהו לא רשימת ערים: זו נקודת
                  הכניסה הארצית שלכם לייעוץ, לשיבוץ ולשקט נפשי.
                </p>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <a
                    href="#cities-explorer"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#1f6bff] px-6 py-3.5 text-[15px] font-extrabold text-white shadow-lg shadow-[#1f6bff]/25 transition hover:bg-[#1558e0]"
                  >
                    <MapPinned className="h-5 w-5" aria-hidden />
                    חיפוש עיר ומפת כיסוי
                  </a>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/25 bg-white/10 px-6 py-3.5 text-[15px] font-extrabold text-white backdrop-blur transition hover:bg-white/16"
                  >
                    דברו איתנו ב-WhatsApp
                  </a>
                  <Link
                    href="/services/private-nurse-home"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-[15px] font-bold text-white/90 underline-offset-4 hover:underline"
                  >
                    <span>אחות פרטית לבית</span>
                    <ArrowLeft className="h-4 w-4" aria-hidden />
                  </Link>
                </div>
              </div>

              <div className="grid w-full max-w-md shrink-0 grid-cols-2 gap-4 sm:gap-5 lg:max-w-sm">
                <div className="col-span-2 rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="h-9 w-9 shrink-0 text-[#5fd1f0]" strokeWidth={2} />
                    <div>
                      <p className="text-[22px] font-black tabular-nums">{sorted.length}+</p>
                      <p className="text-[13px] font-semibold text-slate-200">מדריכים מקומיים מלאים</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur">
                  <HeartPulse className="h-8 w-8 text-[#5fd1f0]" strokeWidth={2} />
                  <p className="mt-3 text-[20px] font-black">{hospitals.length}</p>
                  <p className="text-[12.5px] font-semibold leading-snug text-slate-200">דפי בתי חולים</p>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur">
                  <Stethoscope className="h-8 w-8 text-[#5fd1f0]" strokeWidth={2} />
                  <p className="mt-3 text-[20px] font-black">24/7</p>
                  <p className="text-[12.5px] font-semibold leading-snug text-slate-200">מענה לשיבוץ דחוף</p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <Container size="wide" className="-mt-8 relative z-10">
          {/* Nationwide trust strip */}
          <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-lg font-extrabold text-[#0a1f44] sm:text-xl">מערכת אמון ארצית — לא עוד שירות מקומי בודד</h2>
                <p className="mt-2 max-w-2xl text-[14.5px] leading-relaxed text-slate-600">
                  אנחנו חושבים בפרספקטיבה של גיוס, בקרת רישוי והתאמה קלינית — כדי שכל פנייה, מכל עיר, תקבל אותו דגל איכות:
                  מהירות תגובה, שקיפות, ורגישות משפחתית.
                </p>
              </div>
              <ul className="grid shrink-0 gap-3 sm:grid-cols-2">
                {[
                  "אחיות עם רישיון מוסמך — בדיקה לפני כל שיבוץ",
                  "התאמת שפה, מגזר וניסיון קליני (גריאטריה, ילדים, אונקולוגיה ועוד)",
                  "תיעוד ושיחת תיאום מסודרת מול בית החולים כשצריך",
                  "המשכיות מהמחלקה לבית — אותה שפה טיפולית",
                ].map((t) => (
                  <li key={t} className="flex gap-2 text-[13.5px] font-semibold text-[#0a1f44]">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#1f6bff]" aria-hidden />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Featured cities */}
          <section className="mt-16 sm:mt-20" aria-labelledby="featured-cities-heading">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[12.5px] font-bold uppercase tracking-wider text-[#1f6bff]">ערים מובילות</p>
                <h2 id="featured-cities-heading" className="mt-2 text-2xl font-black text-[#0a1f44] sm:text-3xl">
                  עוצמה טיפולית בפריסה ארצית
                </h2>
              </div>
              <Link
                href="#cities-explorer"
                className="text-[14px] font-bold text-[#1f6bff] underline-offset-4 hover:underline"
              >
                לכל שאר הערים במפה ↓
              </Link>
            </div>
            <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" role="list">
              {featured.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/cities/${c.slug}`}
                    className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-[#1f6bff]/30 hover:shadow-lg"
                  >
                    <div className="absolute start-0 top-0 h-1 w-full bg-gradient-to-l from-[#1f6bff] to-[#5fd1f0]" />
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-xl font-extrabold text-[#0a1f44]">אחות פרטית ב{c.name}</h3>
                          <p className="mt-1 text-[13px] font-semibold text-slate-500">{c.region}</p>
                        </div>
                        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#eff6ff] text-[#1f6bff] transition group-hover:scale-105">
                          <MapPinned className="h-5 w-5" strokeWidth={2.2} />
                        </span>
                      </div>
                      <p className="mt-4 line-clamp-4 text-[14px] leading-relaxed text-slate-600">{c.intro}</p>
                      <span className="mt-auto pt-5 text-[14px] font-extrabold text-[#1f6bff]">
                        מעבר למדריך המלא ←
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Hospital-based service */}
          <section className="mt-20 sm:mt-24" aria-labelledby="hospital-service-heading">
            <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-8 sm:p-10 lg:p-12">
              <div className="max-w-3xl">
                <p className="text-[12.5px] font-bold uppercase tracking-wider text-[#1f6bff]">ליד המחלקה — ובבית אחרי השחרור</p>
                <h2 id="hospital-service-heading" className="mt-3 text-2xl font-black text-[#0a1f44] sm:text-3xl">
                  שירות מבוסס בתי חולים — כי רוב הסיפורים מתחילים באשפוז
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-slate-600">
                  כשמחפשים «אחות פרטית ליד איכילוב / הדסה / רמב״ם / סורוקה» — צריך מענה שמבין פרוטוקולי שחרור, תרופות ודינמיקה
                  משפחתית. לכל בית חולים יש אצלנו דף SEO ממוקד המקשר חזרה לעיר ולמאגר השירותים הרחב.
                </p>
              </div>
              <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" role="list">
                {hospitalShowcase.map((h) => (
                  <li key={h.slug}>
                    <Link
                      href={`/hospitals/${h.slug}`}
                      className="flex h-full gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-[#1f6bff]/35 hover:shadow-md"
                    >
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#0a1f44] text-white">
                        <Building2 className="h-5 w-5" strokeWidth={2.2} />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[15px] font-extrabold text-[#0a1f44]">{h.shortName}</span>
                        <span className="mt-1 block text-[12.5px] text-slate-500">{h.name}</span>
                        <span className="mt-2 block text-[12.5px] leading-snug text-slate-600 line-clamp-2">
                          {h.context}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/hospitals"
                  className="inline-flex rounded-2xl bg-[#0a1f44] px-6 py-3.5 text-[14px] font-extrabold text-white shadow-md transition hover:bg-[#152a5c]"
                >
                  לכל בתי החולים ({hospitals.length})
                </Link>
                <Link
                  href="/services/private-nurse-hospital"
                  className="inline-flex rounded-2xl border-2 border-[#0a1f44] px-6 py-3.5 text-[14px] font-extrabold text-[#0a1f44] transition hover:bg-[#0a1f44]/5"
                >
                  אחות פרטית לבית חולים — המדריך
                </Link>
              </div>
            </div>
          </section>

          {/* Interactive directory */}
          <div className="mt-20 sm:mt-24">
            <div className="mb-8 max-w-3xl">
              <h2 className="text-2xl font-black text-[#0a1f44] sm:text-3xl">מצאו את העיר שלכם</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
                חיפוש חופשי, סינון לפי אזור, ומפת ישראל אינטראקטיבית — כדי לצלול ישר לדף עם תוכן עומק, המלצות מקומיות
                וקישורים רלוונטיים.
              </p>
            </div>
            <CitiesDirectoryClient cities={cityDirectoryPayload} />
          </div>

          {/* SEO longform — 800+ words */}
          <article
            className="prose prose-slate mt-20 max-w-none sm:mt-24"
            lang="he"
            aria-labelledby="seo-article-heading"
          >
            <h2 id="seo-article-heading" className="text-2xl font-black text-[#0a1f44] sm:text-3xl">
              מדריך ארצי: איך לבחור אחות פרטית בישראל — פריסה, איכות ובתי חולים מרכזיים
            </h2>
            <div className="mt-8 space-y-5 text-[15px] leading-[1.85] text-slate-700 max-w-none">
              <p>
                בישראל, הביקוש לשירותי <strong>אחות פרטית</strong> לא מפסיק לגדול — וזה לא מקרי. השגרה הארצית מתפרסת בין מרכזי
                תרבות ותעסוקה לבין פריפריה עם מרחקים ארוכים לבית חולים; משפחות עובדות נאבקות לשלב טיפול במטופל עם ימי עבודה
                מלאים; ושחרור מוקדם ממחלקות עמוסות הפך לנורמה שדורשת המשכיות בבית הברורה ומעשית. כשאתם נכנסים לעמוד הזה,
                אתם בעצם נכנסים למפת כניסה ארצית: לא ל«עוד עמוד פנימי באתר», אלא לתשתית שמחברת בין הערים שבהן אתם חיים,
                בין <Link href="/hospitals">בתי החולים המרכזיים</Link>, לבין{" "}
                <Link href="/services">מאגר השירותים</Link> שממוקד סוגי טיפול — בבית, בלילה, אחרי ניתוח, או לצד מיטה
                במחלקה.
              </p>
              <p>
                ההבדל בין ספק שמציע «מישהי שתבוא» לבין שירות שמנהל רישוי, ניסיון קליני והתאמת שפה — הוא ההבדל בין חוסר
                ודאות לבין שקט נפשי. האחות המוסמכת אינה תחליף לרופא; היא אשת מקצוע שפועלת בהתאם להוראות רפואיות, יודעת
                לתעד, לזהות סימנים שמחייבים חיבור לצוות בבית החולים או למיון, ומבינה את המשמעות של בית מאובטח לקשיש או
                לחולה אחרי פרצדורה. לכן כל ערך שמופיע כאן מלווה בניסוח שמדגיש גם מקצועיות וגם גבולות תפקיד ברורים — זה לא
                רק עניין משפטי; זה חלק מאמון המטופל.
              </p>
              <h3 className="pt-4 text-xl font-extrabold text-[#0a1f44]">פריסה ארצית כברירת מחדל — למה זה משנה לכם?</h3>
              <p>
                משפחה מבאר שבע שמנווטת לסורוקה חווה טלטול שונה ממשפחה במרכז תל אביב שליד איכילוב או אסותא; משפחה בירושלים
                מתמודדת עם ריבוי מגזרים ושפות; ומשפחה בנתניה או בשרון רוצה לדעת שיש מענה מהיר גם כשהכבישים פקוקים. כשמתכננים
                ליווי, חשוב לא רק «מי זמין» אלא «מי מכיר את הדינמיקה באזור». לכן בנינו דפי עיר עשירים — לא כסיסמאות SEO,
                אלא כמדריכי כניסה עם הקשר אמיתי: איך נראים שחרורים, אילו שכונות דורשות לוגיסטיקה של זמן, ואיך נראים גשרים
                טיפוליים מבית החולים אל הבית.
              </p>
              <p>
                אם אתם מתחילים מהמונחים «אחות פרטית בישראל» או «אחות פרטית בפריסה ארצית», זה הדיוק: כאן אתם עוברים מחיפוש
                כללי לכיוון קונקרטי: <Link href="/guides">מפת המדריכים שלנו</Link>, מעבר לשירות{" "}
                <Link href="/services/home-medical-supervision">השגחה רפואית בבית</Link>, או הבנה מתי נכון לשלב{" "}
                <Link href="/services/night-nurse">אחות לילה</Link>. ככל שההחלטה מהירה יותר — כך גדל הסיכוי ששגרת התרופות
                וההחלמה תיראה שלמה ולא שברירית.
              </p>
              <h3 className="pt-4 text-xl font-extrabold text-[#0a1f44]">בית חולים כנקודת ציון — לא רק כתובת בווייז</h3>
              <p>
                חיפושים כמו «אחות פרטית ליד רמב״ם» או «אחות פרטית בהדסה» נולדים ממקום חווייתי: המשפחה כבר «גרה» במחלקה,
                מכירה את קצב הסידורים והשיחות עם הצוות — ורוצה מישהו צמוד שמדבר אותה שפה. בשביל זה יש לנו{" "}
                <Link href="/blog/hospital-private-nurse-guide">מאמר על אחות פרטית בבית חולים</Link> ודפים ייעודיים
                לבתי חולים, שכל אחד מהם חוזר ומתחבר לעיר, לשירותים ולמאמרים כדי לשמור על מסלול קריאה הגיוני — גם לגוגל וגם
                לבן אדם עייף שמחפש מידע בלילה.
              </p>
              <p>
                במקביל, לא מספיק «להיות ליד בית החולים»: הרבה פעמים הצורך האמיתי מתחיל דקות אחרי שחרור — כשצריך להפוך את
                הבית למקום בטוח להחלמה. כאן נכנסת התמונה של{" "}
                <Link href="/services/post-surgery-nurse">אחות אחרי ניתוח</Link> ושל{" "}
                <Link href="/services/elderly-care-nurse">אחות לקשישים</Link>, לצד הבנת עלויות והחזרים כפי שמופיע במאמרים
                מסוג <Link href="/blog/private-nurse-cost-israel">עלות אחות פרטית בישראל</Link> או{" "}
                <Link href="/blog/insurance-reimbursement-nurse">ביטוח והחזרים</Link>.
              </p>
              <h3 className="pt-4 text-xl font-extrabold text-[#0a1f44]">סמכות ארצית: איך להשתמש בעמוד הזה נכון</h3>
              <p>
                התחילו מהעיר או מבית החולים שמדבר אליכם. הכנסו לדף העיר כדי לקרוא הקדמה מקומית; משם עברו לדף שירות שמתאר את
                מצבכם — בית או אשפוז. אם אתם עדיין בוחנים אמון, כדאי לקרוא טקסטים כמו{" "}
                <Link href="/blog/choosing-nurse-agency">איך לבחור גורם שיביא אמון אמיתי</Link> או{" "}
                <Link href="/blog/when-to-hire-private-nurse">מתי בכלל צריך אחות פרטית</Link>. בסוף העניין, סמכות אמיתית
                לא נמדדת במילה «פרימיום» אלא בעקביות: רישוי, שקיפות, ויכולת להסביר בפשטות מה נכלל ומה לא.
              </p>
              <p>
                ברוח אותו עקרון, עמודים אזוריים כמו{" "}
                <Link href="/blog/mobile-nurse-tel-aviv-area">אחות פרטית במרכז הארץ</Link>,{" "}
                <Link href="/blog/jerusalem-cultural-sensitivity">רגישות תרבותית בירושלים</Link>,{" "}
                <Link href="/blog/north-israel-nurse">אחות פרטית בצפון</Link> ו-
                <Link href="/blog/south-negev-nurse">בדרום ובנגב</Link> משלימים את התמונה הגאוגרפית — הם לא מחליפים דף
                עיר; הם נותנים הקשר למי שמחפש את המילה הגדולה לפני המילה המדויקת.
              </p>
              <p>
                לסיום, אם אתם כאן כי חוויתם את הלחץ שבין מה שהרופא הסביר במחלקה לבין מה שקורה בפעולה בבית — אתם לא לבד.
                הדיוק הטיפולי, השקט של בן הזוג או הילדים, וההקטנה של טעויות תרופה והחמצות מעקב הם בדיוק הסיבה שקיימת תשתית
                ארצית שכזו. כשאתם מוכנים, השאירו פרטים בטופס באתר או דברו איתנו בוואטסאפ — ונבנה יחד תוכנית שעומדת למבחן
                הלילה הראשון אחרי השחרור, וגם למחרת.
              </p>
              <h3 className="pt-4 text-xl font-extrabold text-[#0a1f44]">שאלות שכדאי לשאול לפני שמזמינים — בכל עיר</h3>
              <p>
                לא משנה אם אתם מחיפה, מירושלים או מהנגב: רשימת בדיקה קצרה תחסוך אי-הבנות. שאלו אילו רישיונות מוצגים, איך
                נראה תהליך החלפה אם האחות חולה, מה קורה במצב שבו נדרשת חציית קו בין הסתכלות קלינית לבין שיקול של בן משפחה,
                ואיך מתבצע תיעוד שמיועד לרופא המטפל. עבור חלק מהמשפחות חשוב גם לברר ניסיון ספציפי — למשל ליד מאיר, בילינסון
                או אסותא — ולשמוע איך בפועל מתואמת כניסה למחלקה מול אבטחה ושעות ביקור. ככל שהתשובות מדויקות ולא עמומות, כך
                קל יותר להסתכל על העליה משפחתית הכוללת ולא רק על שורת מחיר.
              </p>
              <p>
                אם אתם מתכננים טווח ארוך יותר, כדאי לשלב בקריאה גם נושאי מניעה ובטיחות בבית — כמו
                <Link href="/blog/fall-prevention-elderly"> מניעת נפילות בקרב קשישים</Link> או{" "}
                <Link href="/blog/wound-care-at-home"> טיפול בפצעים בבית</Link> — כדי שהשגרה החדשה תתמוך במטופל ולא תיצור
                עומס מעבר לנדרש. המטרה היא לא «להסתובב באתר», אלא לצאת עם החלטה ברורה: מי מלווה אתכם, באיזו שפה, באיזו
                משמרת, ומה קורה כשהמצב משתנה בלילה.
              </p>
            </div>
          </article>

          {/* Resource hub */}
          <section className="mt-16 rounded-3xl border border-slate-200 bg-slate-50 p-8 sm:p-10" aria-labelledby="resources-heading">
            <h2 id="resources-heading" className="text-xl font-extrabold text-[#0a1f44] sm:text-2xl">
              המשיכו לקרוא — שירותים ומאמרים שמקשרים לעיר או לבית החולים
            </h2>
            <div className="mt-8 grid gap-8 lg:grid-cols-2">
              <div>
                <h3 className="text-[13px] font-bold uppercase tracking-wide text-slate-500">שירותים</h3>
                <ul className="mt-4 space-y-2 text-[14.5px] font-bold">
                  <li>
                    <Link className="text-[#1f6bff] hover:underline" href="/services/private-nurse-home">
                      אחות פרטית לבית
                    </Link>
                  </li>
                  <li>
                    <Link className="text-[#1f6bff] hover:underline" href="/services/private-nurse-hospital">
                      אחות פרטית לבית חולים
                    </Link>
                  </li>
                  <li>
                    <Link className="text-[#1f6bff] hover:underline" href="/services/post-surgery-nurse">
                      אחרי ניתוח — ליווי ומניעת סיבוכים
                    </Link>
                  </li>
                  <li>
                    <Link className="text-[#1f6bff] hover:underline" href="/services/iv-treatment-home">
                      טיפולי IV בבית
                    </Link>
                  </li>
                  <li>
                    <Link className="text-[#1f6bff] hover:underline" href="/services/palliative-care">
                      סיעוד פליאטיבי
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-[13px] font-bold uppercase tracking-wide text-slate-500">מאמרים נבחרים</h3>
                <ul className="mt-4 space-y-2 text-[14.5px] font-bold">
                  <li>
                    <Link className="text-[#1f6bff] hover:underline" href="/blog/faq-private-nurse-myths">
                      מיתוסים מול עובדות — אחות פרטית
                    </Link>
                  </li>
                  <li>
                    <Link className="text-[#1f6bff] hover:underline" href="/blog/medication-management-home">
                      ניהול תרופות בבית
                    </Link>
                  </li>
                  <li>
                    <Link className="text-[#1f6bff] hover:underline" href="/blog/dementia-family-guide">
                      דמנציה — מדריך למשפחה
                    </Link>
                  </li>
                  <li>
                    <Link className="text-[#1f6bff] hover:underline" href="/blog/stroke-recovery-home">
                      שיקום אחרי שבץ בבית
                    </Link>
                  </li>
                  <li>
                    <Link className="text-[#1f6bff] hover:underline" href="/guides">
                      מפת המדריכים והנושאים המלאה
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Bottom CTA */}
          <section className="mt-16 overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#0a1f44] to-[#1f3a7a] px-8 py-12 text-center text-white sm:px-12">
            <h2 className="text-2xl font-black sm:text-3xl">רוצים להתחיל בשיחה קצרה וממוקדת?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-slate-200">
              ספרו לנו באיזו עיר אתם, איך קוראים לבית החולים, ומה חלון הזמן — נחזור עם כיוון טיפולי והצעה להמשך, בלי אלמנט
              לחץ מיותר.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center rounded-2xl bg-[#25D366] px-7 py-4 text-[15px] font-extrabold text-white shadow-lg transition hover:bg-[#1ebe5b] sm:w-auto"
              >
                שלחו ב-WhatsApp
              </a>
              <a
                href={telHref}
                className="inline-flex w-full items-center justify-center rounded-2xl border border-white/35 bg-white/10 px-7 py-4 text-[15px] font-extrabold text-white backdrop-blur transition hover:bg-white/14 sm:w-auto tabular-nums"
              >
                חייגו — {phoneDisplay}
              </a>
            </div>
          </section>
        </Container>
      </main>
      <SiteFooter />
      <DeferredClientEngagement whatsappHref={whatsappHref} siteMode="standard" />
      <CitiesStickyContact whatsappHref={whatsappHref} telHref={telHref} />
    </div>
  );
}
