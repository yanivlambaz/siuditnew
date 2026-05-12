import Link from "next/link";
import { ArrowLeft, Phone, MessageCircle, Building2, MapPin, BookOpen, Shield } from "lucide-react";

import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import WhatsAppFab from "./WhatsAppFab";
import ScrollProgress from "./ScrollProgress";
import MobileStickyCTA from "./MobileStickyCTA";
import DeferredClientEngagement from "./DeferredClientEngagement";
import Container from "./ui/Container";
import Button from "./ui/Button";
import SeoBreadcrumbs from "./seo/SeoBreadcrumbs";
import SectionHeading from "./sections/SectionHeading";
import ContactSection from "./sections/ContactSection";
import FinalCTA from "./sections/FinalCTA";
import TrustStrip from "./sections/TrustStrip";
import MedicalTrustBlock from "./MedicalTrustBlock";
import LicensingTrustSection from "./LicensingTrustSection";
import TopicClusterCard from "./TopicClusterCard";

import { cityBySlug } from "../_data/cities";
import { hospitalsInCity, hospitals } from "../_data/hospitals";
import { services } from "../_data/services";
import { blogPosts } from "../_data/blogPosts";
import { buildHospitalFaq } from "../lib/buildHospitalSeoContent";
import {
  breadcrumbJsonLd,
  faqPageJsonLd,
  hospitalAreaServiceJsonLd,
} from "../lib/seo";
import { publicWhatsappHref } from "../lib/contactUrls";
import { serializeJsonLd } from "../lib/serializeJsonLd";

export default function HospitalSeoPage({ hospital }) {
  const city = cityBySlug(hospital.citySlug);
  const cityName = city?.name ?? "האזור";
  const whatsappHref = publicWhatsappHref();
  const faq = buildHospitalFaq(hospital, cityName);
  const sameCityHospitals = hospitalsInCity(hospital.citySlug).filter((h) => h.slug !== hospital.slug);
  const servicePick = services.filter((s) =>
    ["private-nurse-hospital", "private-nurse-home", "post-surgery-nurse", "night-nurse"].includes(s.slug),
  );
  const blogPick = blogPosts.filter((p) =>
    ["hospital-private-nurse-guide", "when-to-hire-private-nurse", "post-surgery-nurse-at-home"].includes(p.slug),
  );

  const breadcrumbItems = [
    { name: "עמוד הבית", href: "/" },
    { name: "בתי חולים", href: "/hospitals" },
    { name: `${hospital.shortName}`, href: `/hospitals/${hospital.slug}` },
  ];

  const jsonLd = [
    hospitalAreaServiceJsonLd(hospital, { name: cityName, slug: hospital.citySlug, region: hospital.region }),
    breadcrumbJsonLd(breadcrumbItems),
    faqPageJsonLd(faq),
  ];

  return (
    <div className="relative min-h-screen overflow-x-clip">
      {jsonLd.map((data, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }} />
      ))}

      <ScrollProgress />
      <SiteHeader />

      <main id="top">
        <Container size="wide" className="pt-4">
          <SeoBreadcrumbs items={breadcrumbItems} />
        </Container>

        <section className="relative isolate overflow-hidden pb-14 pt-8 sm:pb-20 sm:pt-11">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_-10%,#dbeafe,transparent_55%),radial-gradient(circle_at_20%_70%,#cdf3ff,transparent_45%)]"
          />
          <Container size="wide" className="relative">
            <p className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/85 px-3.5 py-1.5 text-[12px] font-bold text-slate-700 backdrop-blur">
              <Building2 className="h-3.5 w-3.5 text-[#1f6bff]" strokeWidth={2.4} />
              ליווי ליד {hospital.shortName} · {cityName}
            </p>
            <h1 className="mt-6 max-w-4xl text-balance text-[34px] font-extrabold leading-[1.08] tracking-tight text-[#0a1f44] sm:text-[48px] md:text-[54px]">
              אחות פרטית ליד {hospital.name}
            </h1>
            <p className="mt-6 max-w-3xl text-pretty text-[17px] leading-[1.75] text-slate-600 sm:text-[18px]">
              {hospital.context} שירות סיעוד פרימיום מתמקד בליווי מוסמך במחלקה ובבית ב{cityName}: ניהול תרופות לפי הוראה,
              ניטור תצפיתי, תמיכה במשפחה והמשכיות אחרי שחרור — בגובה העיניים ובלי הבטחות יתר.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button as="a" href="#contact" variant="gradient" size="lg">
                <Phone className="h-5 w-5" strokeWidth={2.4} />
                תיאום מהיר
                <ArrowLeft className="h-5 w-5 transition-transform group-hover/btn:-translate-x-1" />
              </Button>
              <Button as="a" href={whatsappHref} target="_blank" rel="noreferrer" variant="secondary" size="lg">
                <MessageCircle className="h-5 w-5" strokeWidth={2.2} />
                וואטסאפ
              </Button>
            </div>
            {city ? (
              <p className="mt-6 text-[14px] font-semibold text-slate-500">
                <Link href={`/cities/${city.slug}`} className="text-[#1f6bff] underline-offset-4 hover:underline">
                  כל השירותים ומדריך האזור ב{cityName} ←
                </Link>
              </p>
            ) : null}
          </Container>
        </section>

        <TrustStrip />
        <MedicalTrustBlock />
        <LicensingTrustSection compact />

        <section className="py-16 sm:py-20">
          <Container size="wide">
            <SectionHeading
              align="start"
              eyebrow="המשך לפי נושא"
              title={`מה משפחות מחפשות ליד ${hospital.shortName}`}
              subtitle="קישורים מהירים לשירותים ולמדריכים — כדי לבנות החלטה מושכלת לפני שמדברים איתנו."
            />
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              <TopicClusterCard
                title="שירותים רלוונטיים"
                links={servicePick.map((s) => ({ href: `/services/${s.slug}`, label: s.title }))}
              />
              <TopicClusterCard
                title="מאמרי עומק"
                links={blogPick.map((p) => ({ href: `/blog/${p.slug}`, label: p.title }))}
                icon={BookOpen}
              />
              <TopicClusterCard
                title="סמכות ושקיפות"
                icon={Shield}
                links={[
                  { href: "/about", label: "אודות סיעוד פרימיום" },
                  { href: "/team", label: "תהליכי שיבוץ והצוות המקצועי" },
                  { href: `/cities/${hospital.citySlug}`, label: `דף מלא לאזור ${cityName}` },
                ]}
              />
            </div>
          </Container>
        </section>

        <section className="border-y border-slate-200/80 bg-[#f7f9fc] py-14 sm:py-16 md:py-20">
          <Container size="wide">
            <SectionHeading
              align="start"
              eyebrow="בתי חולים באזור"
              title={`עוד מוקדי אשפוז ב${cityName}`}
              subtitle="דפים מקומיים נוספים — לקידום מבנה נושאי ולמציאת מידע לפי בית החולים שבו אתם נמצאים."
            />
            {sameCityHospitals.length ? (
              <ul className="mt-8 flex flex-wrap gap-3">
                {sameCityHospitals.map((h) => (
                  <li key={h.slug}>
                    <Link
                      href={`/hospitals/${h.slug}`}
                      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-[13px] font-semibold text-slate-700 shadow-sm transition hover:border-[#1f6bff]/30 hover:text-[#0a1f44] sm:px-5"
                    >
                      <MapPin className="h-3.5 w-3.5 text-[#1f6bff]" />
                      אחות פרטית ליד {h.shortName}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-6 text-[15px] text-slate-600">
                <Link href="/hospitals" className="font-bold text-[#1f6bff] hover:underline">
                  לכל דפי בתי החולים ({hospitals.length})
                </Link>
              </p>
            )}
          </Container>
        </section>

        <section className="py-16 sm:py-20" id="hospital-faq">
          <Container size="wide">
            <SectionHeading
              eyebrow="שאלות נפוצות"
              title={`ליד ${hospital.shortName} — מה חשוב לדעת`}
              subtitle="תשובות כלליות; לגבי מצב רפואי ספציפי עקבו אחרי הרופא המטפל והמחלקה."
            />
            <div className="mx-auto mt-10 max-w-3xl divide-y divide-slate-100 rounded-3xl bg-white ring-1 ring-slate-200/70">
              {faq.map((item) => (
                <div key={item.q} className="px-6 sm:px-8">
                  <h2 className="py-4 text-[15.5px] font-extrabold text-[#0a1f44] sm:text-[16px]">{item.q}</h2>
                  <p className="pb-5 text-[15px] leading-[1.75] text-slate-600 sm:pb-6">{item.a}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <ContactSection defaultCity={cityName} />
        <FinalCTA />
      </main>

      <SiteFooter />
      <WhatsAppFab href={whatsappHref} />
      <DeferredClientEngagement whatsappHref={whatsappHref} siteMode="standard" />
      <MobileStickyCTA whatsappHref={whatsappHref} />
    </div>
  );
}
