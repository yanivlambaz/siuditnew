import { notFound } from "next/navigation";
import HospitalSeoPage from "../../_components/HospitalSeoPage";
import { hospitalBySlug, hospitals } from "../../_data/hospitals";
import { absoluteUrl, canonicalPath } from "../../lib/seo";

export const revalidate = 86400;

export function generateStaticParams() {
  return hospitals.map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const h = hospitalBySlug(slug);
  if (!h) {
    return { title: "לא נמצא | סיעודית", robots: { index: false, follow: false } };
  }
  return {
    title: `אחות פרטית ליד ${h.shortName} | סיעודית`,
    description: `${h.context} ליווי מוסמך ליד ${h.name}, המשכיות בבית והסברים למשפחה.`,
    alternates: canonicalPath(`/hospitals/${h.slug}`),
    openGraph: {
      url: absoluteUrl(`/hospitals/${h.slug}`),
      locale: "he_IL",
      title: `אחות פרטית ליד ${h.shortName}`,
    },
    robots: { index: true, follow: true },
  };
}

export default async function HospitalPage({ params }) {
  const { slug } = await params;
  const h = hospitalBySlug(slug);
  if (!h) notFound();
  return <HospitalSeoPage hospital={h} />;
}
