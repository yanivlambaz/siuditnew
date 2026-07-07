import { notFound } from "next/navigation";
import CityLandingPage from "../../_components/CityLandingPage";
import { cities, cityBySlug } from "../../_data/cities";
import { absoluteUrl, canonicalPath } from "../../lib/seo";

/** ISR — אפשר עדכון תוכן בלי דיפלוי מלא כשיעברו ל־CMS */
export const revalidate = 86400;

export function generateStaticParams() {
  return cities.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const city = cityBySlug(slug);
  if (!city) {
    return { title: "לא נמצא | סיעודית", robots: { index: false, follow: false } };
  }
  const title = `אחות פרטית ב${city.name} | אחות לבית חולים, אחרי ניתוח וסיעוד 24/7`;
  const description = `אחות פרטית ב${city.name}: אחות לבית, אחות לבית חולים, אחות אחרי ניתוח, אחות סיעודית ואחות פרטית לפי שעה. זמינות מיידית, אחיות מוסמכות, מדריך מקומי מלא.`;
  return {
    title,
    description,
    keywords: [
      `אחות פרטית ב${city.name}`,
      `אחות לבית ב${city.name}`,
      `אחות לבית חולים ב${city.name}`,
      `אחות סיעודית ב${city.name}`,
      `אחות אחרי ניתוח ב${city.name}`,
      `אחות פרטית לפי שעה ב${city.name}`,
    ],
    alternates: canonicalPath(`/cities/${city.slug}`),
    openGraph: {
      type: "website",
      locale: "he_IL",
      url: absoluteUrl(`/cities/${city.slug}`),
      title,
      description,
    },
    robots: { index: true, follow: true },
  };
}

export default async function CityPage({ params }) {
  const { slug } = await params;
  const city = cityBySlug(slug);
  if (!city) notFound();
  return <CityLandingPage city={city} />;
}
