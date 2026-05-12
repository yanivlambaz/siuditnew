import Link from "next/link";
import { ArrowLeft, ClipboardCheck, Headphones, Shield, Stethoscope, Users } from "lucide-react";

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
import { absoluteUrl, canonicalPath } from "../lib/seo";
import { publicWhatsappHref } from "../lib/contactUrls";

export const metadata = {
  title: "הצוות המקצועי · תהליכי שיבוץ ובקרה | סיעוד פרימיום",
  description:
    "איך מנוהל שיבוץ אחיות מוסמכות, איזה בקרות רישוי ותיעוד יש לפני כל התאמה, ואיך נשמרת שפה אנושית מול משפחות ומטופלים.",
  alternates: canonicalPath("/team"),
  openGraph: { url: absoluteUrl("/team"), locale: "he_IL" },
};

const ROLES = [
  {
    icon: Headphones,
    title: "ריכוז תיאום וקבלה",
    body: "איסוף מידע רפואי רלוונטי (בהסכמה), הבנת לוחות זמנים, שפה, וסביבה — כדי שלא תישארו בתחושת ריק מול טופס.",
  },
  {
    icon: Shield,
    title: "בקרת רישוי ומתאים",
    body: "בדיקת רישיון אחות בתוקף מול דרישות משרד הבריאות והתאמה למצב הטיפולי: בית, אשפוז, לילה, או שחרור מהיר.",
  },
  {
    icon: Stethoscope,
    title: "התייעצות מקצועית פנימית",
    body: "כשיש שאלת גבול מקצועי — מקפים את השיבוץ בהבנה קלינית, בלי לעקוף את הרופא המטפל או את המחלקה.",
  },
  {
    icon: ClipboardCheck,
    title: "תיעוד ושקיפות",
    body: "מה נכלל בטיפול, מה דורש הוראה, ומה תמיד עובר דרך הצוות הרפואי המוסמך — כדי שהמשפחה תדע מה לצפות.",
  },
  {
    icon: Users,
    title: "ליווי משפחה",
    body: "שיחות שמסבירות צעד־אחר־צעד, במיוחד בלילה הראשון או במעבר מהמחלקה לבית.",
  },
];

export default function TeamPage() {
  const whatsappHref = publicWhatsappHref();

  return (
    <div className="relative min-h-screen overflow-x-clip">
      <SiteHeader />

      <main id="top" className="pb-8">
        <section className="relative isolate overflow-hidden border-b border-slate-200/80 pb-16 pt-10 sm:pb-20 sm:pt-14">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_-10%,#dbeafe,transparent_55%),radial-gradient(circle_at_90%_70%,#cffafe,transparent_40%)]"
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
                <li className="font-semibold text-[#0a1f44]">הצוות המקצועי</li>
              </ol>
            </nav>

            <h1 className="mt-10 max-w-4xl text-balance text-[32px] font-extrabold leading-[1.1] tracking-tight text-[#0a1f44] sm:text-[44px]">
              תהליכי שיבוץ, בקרה ואחריות — לפני שמגיעה אחות לבית או למחלקה
            </h1>
            <p className="mt-6 max-w-3xl text-pretty text-[17px] leading-[1.8] text-slate-600 sm:text-[18px]">
              האתר לא מציג &quot;גלריית פנים&quot; של אנשי צוות — זה מכוון. בתחום טיפולי, סמכות אמיתית נמדדת בתהליכים ובשקיפות,
              לא בתמונת סטוק של &quot;צוות מחייך&quot;. כאן תמצאו את מבנה האחריות: מי עושה מה, ואיך נשמר סטנדרט מקצועי מול משפחות בכל הארץ.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button as="a" href="#contact" variant="gradient" size="lg">
                לשיחת התאמה
                <ArrowLeft className="h-5 w-5 transition-transform group-hover/btn:-translate-x-1" strokeWidth={2.4} />
              </Button>
              <Button as="a" href="/about" variant="secondary" size="lg">
                אודות המותג
              </Button>
            </div>
          </Container>
        </section>

        <section className="py-14 sm:py-16">
          <Container size="wide">
            <SectionHeading
              align="start"
              eyebrow="מבנה מקצועי"
              title="ארבעה כוחות משלימים — שמטרתם רצף טיפולי ושקט למשפחה"
              subtitle="התפקידים הבאים אינם &apos;מחלקה&apos; במשרד אחד; הם מתארים את סט היכולות שנדרש כדי לנהל שיבוץ ברמה ארצית, בלי לאבד רגישות אנושית."
            />
            <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {ROLES.map((r) => (
                <li
                  key={r.title}
                  className="flex flex-col gap-3 rounded-3xl border border-slate-200/80 bg-white p-7 shadow-sm ring-1 ring-slate-100"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#eff6ff] text-[#1f6bff] ring-1 ring-blue-100/80">
                    <r.icon className="h-5 w-5" strokeWidth={2.2} />
                  </span>
                  <h2 className="text-[16.5px] font-extrabold text-[#0a1f44]">{r.title}</h2>
                  <p className="text-[14.5px] leading-[1.75] text-slate-600">{r.body}</p>
                </li>
              ))}
            </ul>
          </Container>
        </section>

        <LicensingTrustSection compact />

        <section className="border-t border-slate-200/80 bg-[#f8fafc] py-14 sm:py-16">
          <Container size="wide" className="max-w-3xl">
            <h2 className="text-[22px] font-extrabold text-[#0a1f44] sm:text-[24px]">E-E-A-T באתר — בלי סיסמאות</h2>
            <p className="mt-4 text-[15px] leading-[1.85] text-slate-700">
              אנחנו משקיעים בתוכן מקצועי, בהפרדה ברורה בין ליווי סיעודי להחלטות רפואיות, ובקישורים פנימיים בין שירותים, ערים ובתי חולים.
              כשתראו טענה — היא אמורה להיות ניתנת לבדיקה או לעקיבה לוגית מתוך ההקשר (רישוי, גבולות תפקיד, המלצה לפנות למיון כשצריך).
            </p>
            <ul className="mt-8 space-y-3 text-[15px] font-semibold text-[#1f6bff]">
              <li>
                <Link href="/guides" className="inline-flex items-center gap-2 hover:underline">
                  <ArrowLeft className="h-4 w-4 rotate-180" strokeWidth={2.4} />
                  מפת מדריכים ומושגים
                </Link>
              </li>
              <li>
                <Link href="/hospitals" className="inline-flex items-center gap-2 hover:underline">
                  <ArrowLeft className="h-4 w-4 rotate-180" strokeWidth={2.4} />
                  דפי בתי חולים
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
