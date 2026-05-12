import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Container from "./ui/Container";
import SectionHeading from "./sections/SectionHeading";
import { topicPillars, postsForPillar, servicesForPillar } from "../_data/topicClusters";

export default function TopicPillarSection() {
  return (
    <section className="relative scroll-mt-nav border-t border-slate-200/80 bg-[#f7f9fc]/60 py-16 sm:py-20">
      <Container size="wide">
        <SectionHeading
          eyebrow="מפת תוכן וסמכות נושאית"
          title="ארבעה צירים — קלאסטרים של שירותים ומדריכים"
          subtitle="כל ציר מרכז קישורים פנימיים לדפי שירות ולבלוג — כדי לחזק עומק נושאי ולמצוא מהר את הצעד הבא."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {topicPillars.map((pillar) => {
            const svc = servicesForPillar(pillar).slice(0, 4);
            const posts = postsForPillar(pillar).slice(0, 4);
            return (
              <div
                key={pillar.slug}
                className="rounded-3xl border border-slate-200/80 bg-white p-7 shadow-sm ring-1 ring-slate-100 sm:p-8"
              >
                <h3 className="text-[19px] font-extrabold tracking-tight text-[#0a1f44]">{pillar.title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-slate-600">{pillar.description}</p>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">שירותים</p>
                    <ul className="mt-2 space-y-1.5">
                      {svc.map((s) => (
                        <li key={s.slug}>
                          <Link
                            href={`/services/${s.slug}`}
                            className="group flex items-center justify-between gap-2 text-[13.5px] font-semibold text-[#1f6bff] hover:underline"
                          >
                            {s.title}
                            <ArrowLeft className="h-3.5 w-3.5 opacity-60 transition group-hover:-translate-x-0.5" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link href="/services" className="mt-3 inline-block text-[12.5px] font-bold text-[#0a1f44] hover:underline">
                      כל השירותים →
                    </Link>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">מדריכים</p>
                    <ul className="mt-2 space-y-1.5">
                      {posts.map((p) => (
                        <li key={p.slug}>
                          <Link
                            href={`/blog/${p.slug}`}
                            className="group flex items-center justify-between gap-2 text-[13.5px] font-semibold text-slate-700 hover:text-[#1f6bff]"
                          >
                            <span className="leading-snug">{p.title}</span>
                            <ArrowLeft className="h-3.5 w-3.5 shrink-0 text-[#1f6bff] opacity-50 transition group-hover:-translate-x-0.5" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link href="/blog" className="mt-3 inline-block text-[12.5px] font-bold text-[#0a1f44] hover:underline">
                      כל המאמרים →
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <p className="mt-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center text-[14px] font-semibold text-slate-600">
          <Link href="/about" className="text-[#1f6bff] hover:underline">
            אודות
          </Link>
          <span className="text-slate-300">·</span>
          <Link href="/team" className="text-[#1f6bff] hover:underline">
            הצוות המקצועי
          </Link>
          <span className="text-slate-300">·</span>
          <Link href="/hospitals" className="text-[#1f6bff] hover:underline">
            דפי בתי חולים מרכזיים
          </Link>
          <span className="text-slate-300">·</span>
          <Link href="/guides" className="text-[#1f6bff] hover:underline">
            עמוד עוגן — מפת הנושאים
          </Link>
        </p>
      </Container>
    </section>
  );
}
