import { notFound } from "next/navigation";
import ServiceSeoPage from "../../_components/ServiceSeoPage";
import { serviceBySlug, services } from "../../_data/services";
import { absoluteUrl, canonicalPath } from "../../lib/seo";

export const revalidate = 86400;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const s = serviceBySlug(slug);
  if (!s) {
    return { title: "לא נמצא | סיעודית", robots: { index: false, follow: false } };
  }
  return {
    title: s.metaTitle,
    description: s.metaDescription,
    keywords: s.keywords,
    alternates: canonicalPath(`/services/${s.slug}`),
    openGraph: {
      type: "website",
      locale: "he_IL",
      url: absoluteUrl(`/services/${s.slug}`),
      title: s.metaTitle,
      description: s.metaDescription,
    },
    robots: { index: true, follow: true },
  };
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const s = serviceBySlug(slug);
  if (!s) notFound();
  return <ServiceSeoPage service={s} />;
}
