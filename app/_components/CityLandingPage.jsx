import Link from "next/link";
import { ArrowLeft, Phone, MessageCircle, MapPin, ShieldCheck, Sparkles, Activity, BookOpen } from "lucide-react";

import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import WhatsAppFab from "./WhatsAppFab";
import ScrollProgress from "./ScrollProgress";
import MobileStickyCTA from "./MobileStickyCTA";
import DeferredClientEngagement from "./DeferredClientEngagement";
import Container from "./ui/Container";
import Button from "./ui/Button";
import FadeIn from "./FadeIn";
import SeoBreadcrumbs from "./seo/SeoBreadcrumbs";

import TrustStrip from "./sections/TrustStrip";
import ServicesBento from "./sections/ServicesBento";
import CareScene from "./sections/CareScene";
import ProcessTimeline from "./sections/ProcessTimeline";
import Testimonials from "./sections/Testimonials";
import ContactSection from "./sections/ContactSection";
import FinalCTA from "./sections/FinalCTA";
import SectionHeading from "./sections/SectionHeading";
import MedicalTrustBlock from "./MedicalTrustBlock";
import LicensingTrustSection from "./LicensingTrustSection";

import { cityBySlug, cities } from "../_data/cities";
import { hospitalsInCity } from "../_data/hospitals";
import { services } from "../_data/services";
import { relatedPostsForCity } from "../_data/blogPosts";
import { buildCitySeoSections, buildCityFaq } from "../lib/buildCitySeoContent";
import {
  breadcrumbJsonLd,
  faqPageJsonLd,
  localCityJsonLd,
} from "../lib/seo";
import { publicWhatsappHref } from "../lib/contactUrls";
import { serializeJsonLd } from "../lib/serializeJsonLd";

export default function CityLandingPage({ city }) {
  const whatsappHref = publicWhatsappHref();
  const cityName = city.name;
  const sections = buildCitySeoSections(city);
  const cityFaq = buildCityFaq(city);
  const blogPosts = relatedPostsForCity(city.slug);
  const servicePick = services.filter((s) =>
    ["private-nurse-home", "private-nurse-hospital", "post-surgery-nurse", "night-nurse"].includes(s.slug),
  );
  const nearby =
    city.nearbyCitySlugs?.map((slug) => cityBySlug(slug)).filter(Boolean) ?? [];
  const otherCities = cities.filter((c) => c.slug !== city.slug).slice(0, 12);

  const breadcrumbItems = [
    { name: "עמוד הבית", href: "/" },
    { name: "ערים", href: "/cities" },
    { name: `אחות פרטית ב${cityName}`, href: `/cities/${city.slug}` },
  ];

  const jsonLd = [
    localCityJsonLd(city),
    breadcrumbJsonLd(breadcrumbItems),
    faqPageJsonLd(cityFaq),
  ];

  return (
    <div className="relative min-h-screen overflow-x-clip">
      {jsonLd.map((data, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
        />
      ))}

      <ScrollProgress />
      <SiteHeader />

      <main id="top">
        <Container size="wide" className="pt-4">
          <SeoBreadcrumbs items={breadcrumbItems} />
        </Container>

        <CityHero cityName={cityName} whatsappHref={whatsappHref} />
        <TrustStrip />
        <MedicalTrustBlock />
        <LicensingTrustSection compact />
        <CityHospitalsSection citySlug={city.slug} cityName={cityName} />
        <ServicesBento />
        <CareScene />
        <ProcessTimeline />
        <Testimonials />

        <CityLongContent cityName={cityName} sections={sections} />

        <InternalSeoHub
          city={city}
          servicePick={servicePick}
          blogPosts={blogPosts}
        />

        <CityFaqSection cityName={cityName} faq={cityFaq} />

        <ContactSection defaultCity={cityName} />
        <NearbyCities cities={nearby.length ? nearby : otherCities} currentName={cityName} />
        <FinalCTA />
      </main>

      <SiteFooter />

      <WhatsAppFab href={whatsappHref} />
      <DeferredClientEngagement whatsappHref={whatsappHref} siteMode="standard" />
      <MobileStickyCTA whatsappHref={whatsappHref} />
    </div>
  );
}

function CityHero({ cityName, whatsappHref }) {
  return (
    <section className="relative isolate overflow-hidden pt-6 sm:pt-10">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -top-40 right-1/2 h-[700px] w-[900px] translate-x-1/2 rounded-full bg-gradient-to-br from-[#dbeafe] via-[#cdf3ff] to-transparent blur-3xl opacity-80" />
        <div className="absolute top-40 -right-20 h-[460px] w-[460px] rounded-full bg-gradient-to-br from-[#a5f3fc]/40 to-transparent blur-3xl" />
      </div>

      <Container size="wide" className="relative pb-20 pt-6 text-center sm:pb-28 sm:pt-14">
        <FadeIn>
          <p className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/70 px-3.5 py-1.5 text-[12px] font-bold text-slate-700 shadow-[0_1px_2px_rgba(15,23,42,0.04)] backdrop-blur">
            <MapPin className="h-3.5 w-3.5 text-[#1f6bff]" strokeWidth={2.4} />
            {cityName} · ליווי בבית ובבית חולים · זמינות 24/7
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h1 className="mx-auto mt-7 max-w-4xl text-balance text-[42px] font-extrabold leading-[1.04] tracking-tight text-[#0a1f44] sm:text-[58px] md:text-[68px]">
            אחות פרטית <span className="gradient-text-medical">ב{cityName}</span>
            <br />
            אחות לבית, לבית חולים ולאחר ניתוח — תוך שעות
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="mx-auto mt-7 max-w-2xl text-pretty text-[17px] leading-[1.75] text-slate-600 sm:text-[18.5px]">
            כשמחפשים ליווי אחרי שחרור, במחלקה, או בבית — חשוב לא רק «מישהו שיגיע», אלא אחות שיודעת לקרוא נכון את ההנחיות ולדווח בזמן.
            נבנה לכם תוכנית זמן ריאלית ל{cityName}, עם דגש על רישוי, ניסיון ושפה שמתאימה למשפחה.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button as="a" href="#contact" variant="gradient" size="lg">
              <Phone className="h-5 w-5" strokeWidth={2.4} />
              קבלו אחות עכשיו
              <ArrowLeft className="h-5 w-5 transition-transform group-hover/btn:-translate-x-1" />
            </Button>
            <Button
              as="a"
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              variant="secondary"
              size="lg"
            >
              <MessageCircle className="h-5 w-5" strokeWidth={2.2} />
              וואטסאפ — זמינות מיידית
            </Button>
          </div>
        </FadeIn>

        <FadeIn delay={0.4}>
          <ul className="mt-10 inline-flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[13.5px] font-semibold text-slate-600">
            <li className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#1f6bff]" strokeWidth={2.4} />
              רישיון משרד הבריאות
            </li>
            <li className="inline-flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#1f6bff]" strokeWidth={2.4} />
              התאמה תרבותית ושפתית
            </li>
            <li className="inline-flex items-center gap-2">
              <Activity className="h-4 w-4 text-[#1f6bff]" strokeWidth={2.4} />
              סביבות רפואיות מרכזיות באזור
            </li>
          </ul>
        </FadeIn>
      </Container>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-white/70 to-transparent"
      />
    </section>
  );
}

function CityLongContent({ cityName, sections }) {
  return (
    <section className="relative scroll-mt-nav py-20 sm:py-[5.5rem] md:py-[6.75rem]" id="city-guide">
      <Container size="wide">
        <SectionHeading
          eyebrow="מדריך מקומי"
          title={`איך נבחרים ליווי נכון ב${cityName}`}
          subtitle={`תוכן מפורט לפי אזור — סביב בתי החולים, שכונות והמשכיות אחרי אשפוז. לקריאה נוחה, בלי ניסוחי קידום אוטומטיים.`}
        />

        <FadeIn>
          <article className="prose-site mx-auto mt-12 max-w-3xl space-y-10 rounded-3xl bg-white p-8 text-slate-700 ring-1 ring-slate-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_18px_40px_-22px_rgba(15,23,42,0.18)] sm:p-11 sm:space-y-11">
            {sections.map((block) => (
              <div key={block.h2}>
                <h2 className="text-lg font-extrabold tracking-tight text-[#0a1f44] sm:text-xl">
                  {block.h2}
                </h2>
                <div className="mt-4 space-y-3 sm:mt-5 sm:space-y-4">
                  {block.paragraphs.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>
            ))}
          </article>
        </FadeIn>
      </Container>
    </section>
  );
}

function InternalSeoHub({ city, servicePick, blogPosts }) {
  return (
    <section className="relative border-y border-slate-200/80 bg-[#f7f9fc] py-16 sm:py-20 md:py-24">
      <Container size="wide">
        <SectionHeading
          eyebrow="המשך בנוחות שלכם"
          title="שירותים, מדריכים וערים סמוכות"
          subtitle="בחירות קריאה נוספות — כדי להבין את המצב ולבחור בקור רוח."
        />

        <div className="mt-10 grid gap-6 sm:mt-12 lg:grid-cols-3 lg:gap-8">
          <div className="rounded-3xl bg-white p-7 ring-1 ring-slate-200/70 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-8">
            <h3 className="text-lg font-extrabold text-[#0a1f44]">שירותים פופולריים</h3>
            <ul className="mt-5 space-y-3 text-[15px] font-semibold text-slate-600">
              {servicePick.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="rounded-lg text-[#1f6bff] underline-offset-4 transition hover:text-[#0a1f44] hover:underline">
                    {s.title} ב{city.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/about" className="rounded-lg text-[#1f6bff] underline-offset-4 transition hover:text-[#0a1f44] hover:underline">
                  אודות המותג והסטנדרט המקצועי
                </Link>
              </li>
              <li>
                <Link href="/team" className="rounded-lg text-[#1f6bff] underline-offset-4 transition hover:text-[#0a1f44] hover:underline">
                  תהליכי שיבוץ והצוות המקצועי
                </Link>
              </li>
              <li>
                <Link href="/services" className="rounded-lg text-[#1f6bff] underline-offset-4 transition hover:text-[#0a1f44] hover:underline">
                  כל דפי השירותים
                </Link>
              </li>
            </ul>
          </div>

          <div className="rounded-3xl bg-white p-7 ring-1 ring-slate-200/70 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-8">
            <h3 className="flex items-center gap-2 text-lg font-extrabold text-[#0a1f44]">
              <BookOpen className="h-5 w-5 text-[#1f6bff]" strokeWidth={2.2} />
              מדריכים בבלוג
            </h3>
            <ul className="mt-5 space-y-3 text-[15px] font-semibold text-slate-600">
              {blogPosts.map((p) => (
                <li key={p.slug}>
                  <Link href={`/blog/${p.slug}`} className="rounded-lg text-[#1f6bff] underline-offset-4 transition hover:text-[#0a1f44] hover:underline">
                    {p.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/blog" className="rounded-lg text-[#1f6bff] underline-offset-4 transition hover:text-[#0a1f44] hover:underline">
                  כל המאמרים
                </Link>
              </li>
            </ul>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-[#0a1f44] to-[#1f3a5f] p-8 text-white shadow-lg ring-1 ring-white/10">
            <h3 className="text-lg font-extrabold">רוצים להתחיל ב{city.name}?</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-white/85">
              השאירו פרטים בטופס — נחזור תוך דקות עם התאמת אחות ומתן מענה לשאלות עלות וזמינות.
            </p>
            <Button as="a" href="#contact" variant="outline" size="md" className="mt-6 w-full sm:w-auto">
              טופס יצירת קשר
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

function CityFaqSection({ cityName, faq }) {
  return (
    <section className="scroll-mt-nav py-16 sm:py-20 md:py-24" id="city-faq">
      <Container size="wide">
        <SectionHeading
          eyebrow="שאלות נפוצות"
          title={`לפני שמתחילים ב${cityName}`}
          subtitle="תשובות קצרות וברורות. לדיוק רפואי ספציפי — תמיד עדיף גם להתייעץ עם הרופא המטפל."
        />
        <FadeIn>
          <div className="mx-auto mt-10 max-w-3xl divide-y divide-slate-100 rounded-3xl bg-white ring-1 ring-slate-200/70 sm:mt-12">
            {faq.map((item) => (
              <div key={item.q} className="px-6 sm:px-8">
                <h3 className="py-4 text-[15.5px] font-extrabold leading-snug text-[#0a1f44] sm:py-5 sm:text-[16px]">{item.q}</h3>
                <p className="pb-5 text-[15px] leading-[1.75] text-slate-600 sm:pb-6">{item.a}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}

function NearbyCities({ cities, currentName }) {
  const list = cities.filter((c) => c.name !== currentName);
  return (
    <section className="relative scroll-mt-nav py-20 sm:py-[5.25rem] md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 inset-y-0 -z-10 bg-[#f7f9fc]"
      />
      <Container size="wide">
        <SectionHeading
          eyebrow="ערים נוספות"
          title="אותו סטנדרט — גם מחוץ לעיר"
          subtitle="דפים מקומיים לערים נוספות, כדי שתמצאו מידע רלוונטי גם אם נוסעים בין בית ובית מטופלים."
        />

        <FadeIn>
          <div className="mt-12 flex flex-wrap justify-center gap-3 sm:mt-14">
            {list.map((c) => (
              <Link
                key={c.slug}
                href={`/cities/${c.slug}`}
                className="group inline-flex items-center gap-2 rounded-full border border-slate-200/90 bg-white px-4 py-2.5 text-[13px] font-semibold text-slate-700 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-[transform,box-shadow,border-color,background-color,color] duration-300 motion-safe:hover:-translate-y-0.5 motion-safe:hover:border-[#1f6bff]/28 motion-safe:hover:bg-[#0a1f44] motion-safe:hover:text-white motion-safe:hover:shadow-[0_18px_40px_-14px_rgba(15,23,42,0.22)] motion-reduce:hover:translate-y-0 sm:px-5"
              >
                <MapPin className="h-3.5 w-3.5 text-[#1f6bff] transition group-hover:text-cyan-300" strokeWidth={2.4} />
                אחות פרטית ב{c.name}
                <ArrowLeft className="h-3.5 w-3.5 opacity-0 transition-all group-hover:-translate-x-0.5 group-hover:opacity-100" strokeWidth={2.4} />
              </Link>
            ))}
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}

function CityHospitalsSection({ citySlug, cityName }) {
  const list = hospitalsInCity(citySlug);
  if (!list.length) return null;
  return (
    <section className="border-y border-slate-200/75 bg-white py-12 sm:py-14">
      <Container size="wide">
        <SectionHeading
          align="start"
          eyebrow="בתי חולים בעיר"
          title={`אחות פרטית ליד בתי החולים המרכזיים ב${cityName}`}
          subtitle="דפי נחיתה ייעודיים לפי מוסד — לקישור פנימי חזק ולחיפושים סביב שם בית החולים."
        />
        <ul className="mt-8 flex flex-wrap gap-2.5 sm:gap-3">
          {list.map((h) => (
            <li key={h.slug}>
              <Link
                href={`/hospitals/${h.slug}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-[#f7f9fc] px-4 py-2 text-[13px] font-semibold text-[#0a1f44] transition hover:border-[#1f6bff]/35 hover:bg-white"
              >
                {h.shortName}
                <ArrowLeft className="h-3.5 w-3.5 text-[#1f6bff]" />
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-[14px] font-semibold text-slate-600">
          <Link href="/hospitals" className="text-[#1f6bff] hover:underline">
            כל דפי בתי החולים באתר ←
          </Link>
        </p>
      </Container>
    </section>
  );
}
