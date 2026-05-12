import Link from "next/link";
import { ArrowLeft, Phone, MessageCircle, BookOpen } from "lucide-react";

import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import WhatsAppFab from "./WhatsAppFab";
import ScrollProgress from "./ScrollProgress";
import MobileStickyCTA from "./MobileStickyCTA";
import BlogArticleLeadCapture from "./leadCapture/BlogArticleLeadCapture";
import Container from "./ui/Container";
import Button from "./ui/Button";
import FadeIn from "./FadeIn";
import SeoBreadcrumbs from "./seo/SeoBreadcrumbs";
import SectionHeading from "./sections/SectionHeading";
import ContactSection from "./sections/ContactSection";
import FinalCTA from "./sections/FinalCTA";
import TrustStrip from "./sections/TrustStrip";
import { FAQ } from "./sections/faqData";
import { cities } from "../_data/cities";
import { serviceBySlug } from "../_data/services";
import { relatedPostsForSlug } from "../_data/blogPosts";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqPageJsonLd,
} from "../lib/seo";
import { publicWhatsappHref } from "../lib/contactUrls";
import { serializeJsonLd } from "../lib/serializeJsonLd";

const BLOG_FALLBACK_FAQ = FAQ.slice(0, 5);

export default function BlogArticlePage({ post }) {
  const whatsappHref = publicWhatsappHref();
  const related = relatedPostsForSlug(post.slug, 4).filter((p) => p.slug !== post.slug);
  const servicesPick = post.relatedServiceSlugs?.map((s) => serviceBySlug(s)).filter(Boolean) ?? [];
  const citiesPick = post.relatedCitySlugs?.map((slug) => cities.find((c) => c.slug === slug)).filter(Boolean) ?? cities.slice(0, 6);

  const breadcrumbItems = [
    { name: "עמוד הבית", href: "/" },
    { name: "בלוג", href: "/blog" },
    { name: post.title.slice(0, 48) + (post.title.length > 48 ? "…" : ""), href: `/blog/${post.slug}` },
  ];

  const jsonLd = [
    breadcrumbJsonLd(breadcrumbItems),
    articleJsonLd({
      title: post.title,
      description: post.metaDescription,
      urlPath: `/blog/${post.slug}`,
      datePublished: post.published,
      dateModified: post.updated,
    }),
    ...(post.faq?.length ? [faqPageJsonLd(post.faq)] : [faqPageJsonLd(BLOG_FALLBACK_FAQ)]),
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

        <article>
          <section className="relative isolate overflow-hidden pb-12 pt-6 sm:pb-16 sm:pt-10">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_-20%,#e0f2fe,transparent_50%)]"
            />
            <Container size="wide" className="relative">
              <FadeIn>
                <div className="flex flex-wrap items-center gap-3 text-[13px] font-semibold text-slate-500">
                  <BookOpen className="h-4 w-4 text-[#1f6bff]" strokeWidth={2.2} />
                  <time dateTime={post.published}>{post.published}</time>
                  <span>·</span>
                  <span>{post.readMinutes} דק׳ קריאה</span>
                </div>
              </FadeIn>
              <FadeIn delay={0.05}>
                <h1 className="mt-5 max-w-4xl text-balance text-[34px] font-extrabold leading-[1.1] tracking-tight text-[#0a1f44] sm:text-[46px] md:text-[52px]">
                  {post.title}
                </h1>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="mt-6 max-w-3xl text-pretty text-[18px] leading-[1.75] text-slate-600">
                  {post.intro}
                </p>
              </FadeIn>
              <FadeIn delay={0.12}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button as="a" href="#contact" variant="gradient" size="lg">
                    <Phone className="h-5 w-5" strokeWidth={2.4} />
                    שיחה עם צוות
                    <ArrowLeft className="h-5 w-5 transition-transform group-hover/btn:-translate-x-1" />
                  </Button>
                  <Button as="a" href={whatsappHref} target="_blank" rel="noreferrer" variant="secondary" size="lg">
                    <MessageCircle className="h-5 w-5" strokeWidth={2.2} />
                    וואטסאפ 24/7
                  </Button>
                </div>
              </FadeIn>
            </Container>
          </section>

          <TrustStrip />

          <div className="py-14 sm:py-20">
            <Container size="wide">
              <div className="mx-auto max-w-3xl space-y-14 text-[16px] leading-[1.9] text-slate-700">
                {post.sections.map((sec) => (
                  <section key={sec.h2}>
                    <h2 className="text-2xl font-extrabold tracking-tight text-[#0a1f44]">{sec.h2}</h2>
                    <div className="mt-5 space-y-4">
                      {sec.paragraphs.map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>

              {post.faq?.length ? (
                <div className="mx-auto mt-16 max-w-3xl">
                  <SectionHeading align="start" eyebrow="שאלות נפוצות" title="שאלות נפוצות על הנושא" />
                  <div className="mt-10 divide-y divide-slate-200 rounded-3xl bg-white ring-1 ring-slate-200/70">
                    {post.faq.map((item) => (
                      <div key={item.q} className="px-6 sm:px-8">
                        <h3 className="py-5 text-[16px] font-extrabold text-[#0a1f44]">{item.q}</h3>
                        <p className="pb-6 text-[15px] leading-relaxed text-slate-600">{item.a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="mx-auto mt-20 grid max-w-5xl gap-8 lg:grid-cols-2">
                <div className="rounded-3xl border border-slate-200 bg-[#f7f9fc] p-8">
                  <h3 className="text-lg font-extrabold text-[#0a1f44]">שירותים קשורים</h3>
                  <ul className="mt-4 space-y-2 text-[15px] font-semibold text-slate-600">
                    {servicesPick.map((s) => (
                      <li key={s.slug}>
                        <Link href={`/services/${s.slug}`} className="hover:text-[#1f6bff]">
                          {s.title}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link href="/services" className="text-[#1f6bff] hover:underline">
                        כל השירותים
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-white p-8">
                  <h3 className="text-lg font-extrabold text-[#0a1f44]">מדריכים לפי עיר</h3>
                  <ul className="mt-4 space-y-2 text-[15px] font-semibold text-slate-600">
                    {citiesPick.map((c) =>
                      c ? (
                        <li key={c.slug}>
                          <Link href={`/cities/${c.slug}`} className="hover:text-[#1f6bff]">
                            אחות פרטית ב{c.name}
                          </Link>
                        </li>
                      ) : null,
                    )}
                    <li>
                      <Link href="/cities" className="text-[#1f6bff] hover:underline">
                        כל הערים
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              {related.length ? (
                <div className="mx-auto mt-16 max-w-3xl">
                  <SectionHeading
                    align="start"
                    eyebrow="עוד בבלוג"
                    title="מאמרים קשורים"
                    subtitle="המשכו לקרוא — תוכן מקצועי לאורך כל משפך החיפוש."
                  />
                  <ul className="mt-8 space-y-3 text-[15px] font-semibold text-slate-700">
                    {related.map((p) => (
                      <li key={p.slug}>
                        <Link href={`/blog/${p.slug}`} className="hover:text-[#1f6bff]">
                          {p.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </Container>
          </div>
        </article>

        <ContactSection />
        <FinalCTA />
      </main>

      <SiteFooter />
      <WhatsAppFab href={whatsappHref} />
      <BlogArticleLeadCapture slug={post.slug} whatsappHref={whatsappHref} />
      <MobileStickyCTA whatsappHref={whatsappHref} />
    </div>
  );
}
