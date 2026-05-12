import Link from "next/link";
import { ArrowLeft, BookOpen, Building2, HeartHandshake, MapPin } from "lucide-react";

import SiteHeader from "../_components/SiteHeader";
import SiteFooter from "../_components/SiteFooter";
import WhatsAppFab from "../_components/WhatsAppFab";
import MobileStickyCTA from "../_components/MobileStickyCTA";
import DeferredClientEngagement from "../_components/DeferredClientEngagement";
import Container from "../_components/ui/Container";
import SectionHeading from "../_components/sections/SectionHeading";
import ContactSection from "../_components/sections/ContactSection";
import LicensingTrustSection from "../_components/LicensingTrustSection";
import Button from "../_components/ui/Button";
import { cities } from "../_data/cities";
import { absoluteUrl, canonicalPath } from "../lib/seo";
import { publicWhatsappHref } from "../lib/contactUrls";

export const metadata = {
  title: "אודות סיעוד פרימיום · ליווי אחות פרטית בישראל",
  description:
    "מי אנחנו, איך עובד שיבוץ אחיות מוסמכות, ומה עומד מאחורי הסטנדרט הרפואי והאנושי — בבית ובבית חולים, בפריסה ארצית.",
  alternates: canonicalPath("/about"),
  openGraph: { url: absoluteUrl("/about"), locale: "he_IL" },
};

export default function AboutPage() {
  const whatsappHref = publicWhatsappHref();
  const sampleCities = cities.slice(0, 6);

  return (
    <div className="relative min-h-screen overflow-x-clip">
      <SiteHeader />

      <main id="top" className="pb-8">
        <section className="relative isolate overflow-hidden border-b border-slate-200/80 bg-[#f8fafc] pb-16 pt-10 sm:pb-20 sm:pt-14">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_75%_-20%,#dbeafe,transparent_50%),radial-gradient(circle_at_15%_80%,#e0f2fe,transparent_45%)]"
          />
          <Container size="wide">
            <nav className="text-[13px] text-slate-500" aria-label="שביל ניווט">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/" className="hover:text-[#1f6bff]">
                    עמוד הבית
                  </Link>
                </li>
                <span className="text-slate-300">/</span>
                <li className="font-semibold text-[#0a1f44]">אודות</li>
              </ol>
            </nav>

            <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-slate-200/90 bg-white/90 px-3.5 py-1.5 text-[12px] font-bold text-slate-700 shadow-sm backdrop-blur">
              <HeartHandshake className="h-3.5 w-3.5 text-[#1f6bff]" strokeWidth={2.4} />
              סיעוד פרטי · סטנדרט ארצי · שפה אנושית
            </p>

            <h1 className="mt-6 max-w-4xl text-balance text-[34px] font-extrabold leading-[1.1] tracking-tight text-[#0a1f44] sm:text-[46px]">
              פלטפורמה ארצית לליווי אחות פרטית — עם דגש על רישוי, רצף טיפולי ושקט למשפחה
            </h1>
            <p className="mt-6 max-w-3xl text-pretty text-[17px] leading-[1.8] text-slate-600 sm:text-[18px]">
              סיעוד פרימיום נבנתה סביב צורך שחוזר שוב ושוב: רגע שבו בית ובית חולים נפגשים, וההחלטות צריכות להיות מהירות — אבל לא שטחיות.
              אנחנו מרכזים תיאום, בקרת איכות בשיבוץ, ושקיפות מול המשפחה והמערך הרפואי, בלי להחליף את שיקול הדעת הקליני של הרופא המטפל.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button as="a" href="#contact" variant="gradient" size="lg">
                לתיאום ולהתאמה
                <ArrowLeft className="h-5 w-5 transition-transform group-hover/btn:-translate-x-1" strokeWidth={2.4} />
              </Button>
              <Button as="a" href="/team" variant="secondary" size="lg">
                מבנה הצוות והבקרה
              </Button>
            </div>
          </Container>
        </section>

        <LicensingTrustSection />

        <section className="py-14 sm:py-16 md:py-20">
          <Container size="wide">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div>
                <h2 className="text-[22px] font-extrabold tracking-tight text-[#0a1f44] sm:text-[26px]">מה אנחנו כן — ומה לא</h2>
                <ul className="mt-6 space-y-4 text-[15px] leading-[1.85] text-slate-700">
                  <li className="rounded-2xl border border-slate-200/80 bg-white p-5 ring-1 ring-slate-100">
                    <span className="font-extrabold text-[#0a1f44]">כן:</span>{" "}
                    התאמת אחות לפי מצב רפואי, סביבת טיפול (בית / אשפוז), שפה ורגישות תרבותית, וזמינות אמיתית סביב השעון.
                  </li>
                  <li className="rounded-2xl border border-slate-200/80 bg-white p-5 ring-1 ring-slate-100">
                    <span className="font-extrabold text-[#0a1f44]">כן:</span>{" "}
                    תיעוד תהליך, הסבר גבולות מקצועיים, וליווי שיח עם המשפחה כשהמצב משתנה — במיוחד אחרי ניתוח או שחרור מבית חולים.
                  </li>
                  <li className="rounded-2xl border border-amber-100/80 bg-amber-50/40 p-5 ring-1 ring-amber-100/60">
                    <span className="font-extrabold text-amber-900">לא:</span>{" "}
                    הבטחות רפואיות, &quot;פלאים&quot; בשורת כותרת, או יצירת תחושה שאחות פרטית מחליפה רופא/ה או מחלקה.
                  </li>
                </ul>
              </div>
              <div className="rounded-3xl border border-slate-200/80 bg-[#0a1f44] p-8 text-white shadow-lg ring-1 ring-white/10 sm:p-10">
                <h2 className="text-xl font-extrabold">למה זה מרגיש אחרת מדף נחיתה &quot;גנרי&quot;</h2>
                <p className="mt-4 text-[15px] leading-[1.85] text-white/88">
                  כי אנחנו מתייחסים לזה כמו שצריך להתייחס לרגע הזה: עם אחריות מקצועית, שפה רגישה, ומבנה תוכן שמסביר לאן אתם הולכים
                  לפני שמילאתם טופס. הדפים המקומיים (ערים ובתי חולים), הבלוג והמדריכים קיימים כדי שתבינו את השטח — לא רק כדי &quot;למכור קליק&quot;.
                </p>
                <ul className="mt-8 space-y-3 text-[14.5px] font-semibold text-white/92">
                  <li className="flex gap-2">
                    <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" strokeWidth={2.2} />
                    <Link href="/hospitals" className="underline-offset-4 hover:underline">
                      דפי בתי חולים — כניסה לפי המוסד שבו אתם נמצאים
                    </Link>
                  </li>
                  <li className="flex gap-2">
                    <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" strokeWidth={2.2} />
                    <Link href="/guides" className="underline-offset-4 hover:underline">
                      מפת מדריכים — הבנה לפני החלטה
                    </Link>
                  </li>
                  <li className="flex gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" strokeWidth={2.2} />
                    <Link href="/cities" className="underline-offset-4 hover:underline">
                      דפים מקומיים לפי עיר — SEO מקומי עם ערך אמיתי
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </Container>
        </section>

        <section className="border-y border-slate-200/80 bg-white py-14 sm:py-16">
          <Container size="wide">
            <SectionHeading
              align="start"
              eyebrow="ניווט פנימי"
              title="המשך מכאן לפי מה שדחוף לכם עכשיו"
              subtitle="קישורים מהירים לצירים המרכזיים באתר — שירותים, אזור מגורים ובתי חולים."
            />
            <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {sampleCities.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/cities/${c.slug}`}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 py-3.5 text-[14px] font-semibold text-[#0a1f44] transition hover:border-[#1f6bff]/35 hover:bg-white"
                  >
                    אחות פרטית ב{c.name}
                    <ArrowLeft className="h-4 w-4 text-[#1f6bff]" strokeWidth={2.4} />
                  </Link>
                </li>
              ))}
              <li className="sm:col-span-2 lg:col-span-3">
                <Link
                  href="/cities"
                  className="inline-flex items-center gap-2 text-[15px] font-bold text-[#1f6bff] hover:underline"
                >
                  כל דפי הערים
                  <ArrowLeft className="h-4 w-4" strokeWidth={2.4} />
                </Link>
              </li>
            </ul>
          </Container>
        </section>

        <ContactSection />
      </main>

      <SiteFooter />
      <WhatsAppFab href={whatsappHref} />
      <DeferredClientEngagement whatsappHref={whatsappHref} siteMode="standard" />
      <MobileStickyCTA whatsappHref={whatsappHref} />
    </div>
  );
}
