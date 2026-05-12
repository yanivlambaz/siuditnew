import Link from "next/link";
import { ArrowLeft, Phone, MessageCircle, MapPin } from "lucide-react";

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
import SectionHeading from "./sections/SectionHeading";
import ContactSection from "./sections/ContactSection";
import FinalCTA from "./sections/FinalCTA";
import TrustStrip from "./sections/TrustStrip";
import MedicalTrustBlock from "./MedicalTrustBlock";
import LicensingTrustSection from "./LicensingTrustSection";

import { cities } from "../_data/cities";
import { hospitals } from "../_data/hospitals";
import { blogPosts, postBySlug, relatedPostsForSlug } from "../_data/blogPosts";
import { FAQ as GLOBAL_FAQ } from "./sections/faqData";

import { breadcrumbJsonLd, faqPageJsonLd } from "../lib/seo";
import { publicWhatsappHref } from "../lib/contactUrls";
import { serializeJsonLd } from "../lib/serializeJsonLd";

export default function ServiceSeoPage({ service }) {
  const whatsappHref = publicWhatsappHref();
  const seedSlug =
    service.relatedPostSlugs?.find((s) => postBySlug(s)) ?? blogPosts[0]?.slug ?? "when-to-hire-private-nurse";
  const relatedPosts = relatedPostsForSlug(seedSlug, 3);
  const cityPick = cities.slice(0, 8);
  const faq = service.faq?.length ? service.faq : GLOBAL_FAQ.slice(0, 6);
  const hospitalLinks = hospitals.slice(0, 14);

  const breadcrumbItems = [
    { name: "עמוד הבית", href: "/" },
    { name: "שירותים", href: "/services" },
    { name: service.title, href: `/services/${service.slug}` },
  ];

  const jsonLd = [breadcrumbJsonLd(breadcrumbItems), faqPageJsonLd(faq)];

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

        <section className="relative isolate overflow-hidden pb-16 pt-8 sm:pb-24 sm:pt-12">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_-10%,#dbeafe,transparent_55%),radial-gradient(circle_at_20%_80%,#cdf3ff,transparent_45%)]"
          />
          <Container size="wide" className="relative">
            <FadeIn>
              <p className="inline-flex rounded-full border border-slate-200/80 bg-white/80 px-3.5 py-1.5 text-[12px] font-bold text-slate-700 backdrop-blur">
                שירות מוסמך · זמינות 24/7
              </p>
            </FadeIn>
            <FadeIn delay={0.05}>
              <h1 className="mt-6 max-w-4xl text-balance text-[36px] font-extrabold leading-[1.08] tracking-tight text-[#0a1f44] sm:text-[48px] md:text-[56px]">
                {service.h1}
              </h1>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="mt-6 max-w-3xl text-pretty text-[18px] leading-[1.75] text-slate-600">
                {service.intro}
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button as="a" href="#contact" variant="gradient" size="lg">
                  <Phone className="h-5 w-5" strokeWidth={2.4} />
                  הזמינו אחות עכשיו
                  <ArrowLeft className="h-5 w-5 transition-transform group-hover/btn:-translate-x-1" />
                </Button>
                <Button as="a" href={whatsappHref} target="_blank" rel="noreferrer" variant="secondary" size="lg">
                  <MessageCircle className="h-5 w-5" strokeWidth={2.2} />
                  וואטסאפ
                </Button>
              </div>
            </FadeIn>
          </Container>
        </section>

        <TrustStrip />
        <MedicalTrustBlock />
        <LicensingTrustSection compact />

        <section className="border-b border-slate-200/70 bg-[#f7f9fc]/50 py-10 sm:py-12">
          <Container size="wide">
            <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-slate-500">מיקוד לפי בית חולים</p>
            <h2 className="mt-2 text-[20px] font-extrabold text-[#0a1f44]">תיאום ליד בתי חולים מרכזיים</h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {hospitalLinks.map((h) => (
                <li key={h.slug}>
                  <Link
                    href={`/hospitals/${h.slug}`}
                    className="inline-block rounded-full bg-white px-3.5 py-1.5 text-[12.5px] font-semibold text-slate-700 ring-1 ring-slate-200/90 transition hover:ring-[#1f6bff]/40"
                  >
                    {h.shortName}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/hospitals" className="mt-4 inline-block text-[13px] font-bold text-[#1f6bff] hover:underline">
              כל בתי החולים ←
            </Link>
          </Container>
        </section>

        <article className="py-16 sm:py-24">
          <Container size="wide">
            <div className="mx-auto max-w-3xl space-y-14 text-[16px] leading-[1.9] text-slate-700">
              {service.body?.map((block) => (
                <div key={block.h2}>
                  <h2 className="text-2xl font-extrabold tracking-tight text-[#0a1f44]">{block.h2}</h2>
                  <div className="mt-5 space-y-4">
                    {block.paragraphs.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {service.benefits?.length ? (
              <div className="mx-auto mt-16 max-w-3xl rounded-3xl bg-[#f7f9fc] p-8 ring-1 ring-slate-200/80 sm:p-10">
                <h2 className="text-xl font-extrabold text-[#0a1f44]">למה לבחור בנו לשירות הזה</h2>
                <ul className="mt-5 space-y-3 text-[15px] font-medium text-slate-700">
                  {service.benefits.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1f6bff]" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {faq.length ? (
              <div className="mx-auto mt-16 max-w-3xl">
                <SectionHeading
                  align="start"
                  eyebrow="שאלות נפוצות"
                  title={`שאלות נפוצות: ${service.title}`}
                />
                <div className="mt-10 divide-y divide-slate-200 rounded-3xl bg-white ring-1 ring-slate-200/70">
                  {faq.map((item) => (
                    <div key={item.q} className="px-6 sm:px-8">
                      <h3 className="py-5 text-[16px] font-extrabold text-[#0a1f44]">{item.q}</h3>
                      <p className="pb-6 text-[15px] leading-relaxed text-slate-600">{item.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="mx-auto mt-20 max-w-3xl">
              <SectionHeading
                align="start"
                eyebrow="המשך ניווט"
                title="מאמרים קשורים ושירותי אחות בערים"
                subtitle="קישורים פנימיים לחיזוק מבנה האתר ולמציאת המידע הבא."
              />
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-white p-6">
                  <h3 className="font-extrabold text-[#0a1f44]">מדריכי בלוג</h3>
                  <ul className="mt-4 space-y-2 text-[14px] font-semibold text-slate-600">
                    {(service.relatedPostSlugs ?? []).slice(0, 5).map((slug) => {
                      const p = postBySlug(slug);
                      if (!p) return null;
                      return (
                        <li key={slug}>
                          <Link href={`/blog/${slug}`} className="hover:text-[#1f6bff]">
                            {p.title}
                          </Link>
                        </li>
                      );
                    })}
                    <li>
                      <Link href="/blog" className="text-[#1f6bff] hover:underline">
                        כל המאמרים
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-6">
                  <h3 className="font-extrabold text-[#0a1f44]">אחות פרטית בערים</h3>
                  <ul className="mt-4 space-y-2 text-[14px] font-semibold text-slate-600">
                    {cityPick.map((c) => (
                      <li key={c.slug}>
                        <Link href={`/cities/${c.slug}`} className="inline-flex items-center gap-1 hover:text-[#1f6bff]">
                          <MapPin className="h-3.5 w-3.5" />
                          אחות פרטית ב{c.name}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link href="/cities" className="text-[#1f6bff] hover:underline">
                        כל הערים
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-[#f8fafc] p-6 ring-1 ring-slate-100">
                  <h3 className="font-extrabold text-[#0a1f44]">סמכות ושקיפות</h3>
                  <ul className="mt-4 space-y-2 text-[14px] font-semibold text-slate-600">
                    <li>
                      <Link href="/about" className="text-[#1f6bff] hover:underline">
                        אודות סיעוד פרימיום
                      </Link>
                    </li>
                    <li>
                      <Link href="/team" className="text-[#1f6bff] hover:underline">
                        תהליכי שיבוץ והצוות המקצועי
                      </Link>
                    </li>
                    <li>
                      <Link href="/hospitals" className="text-[#1f6bff] hover:underline">
                        ליווי ליד בתי חולים
                      </Link>
                    </li>
                    <li>
                      <Link href="/guides" className="text-[#1f6bff] hover:underline">
                        מפת מדריכים
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              {relatedPosts.length ? (
                <div className="mt-8 rounded-2xl bg-[#0a1f44] p-6 text-white">
                  <h3 className="font-extrabold">קראו גם</h3>
                  <ul className="mt-3 space-y-2 text-[14px] font-semibold text-white/90">
                    {relatedPosts.map((p) => (
                      <li key={p.slug}>
                        <Link href={`/blog/${p.slug}`} className="hover:text-cyan-300">
                          {p.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </Container>
        </article>

        <ContactSection />
        <FinalCTA />
      </main>

      <SiteFooter />
      <WhatsAppFab href={whatsappHref} />
      <DeferredClientEngagement whatsappHref={whatsappHref} siteMode="standard" />
      <MobileStickyCTA whatsappHref={whatsappHref} />
    </div>
  );
}
