import {
  ORG_STREET_LINE,
  ORG_LOCALITY,
  ORG_EMAIL,
  ORG_LEGAL_NAME,
  ORG_PHONE_DISPLAY,
  ORG_PHONE_E164,
} from "./orgInfo";
import { serializeJsonLd } from "./serializeJsonLd";

const FALLBACK_SITE = "https://siudit.co.il";

function normalizePublicSiteUrl(raw) {
  const s0 = raw == null ? "" : String(raw).trim();
  if (!s0) return FALLBACK_SITE;
  let s = s0.replace(/\/$/, "");
  if (!/^https?:\/\//i.test(s)) s = `https://${s}`;
  try {
    const u = new URL(s);
    if (u.protocol !== "http:" && u.protocol !== "https:") return FALLBACK_SITE;
    return u.origin;
  } catch {
    return FALLBACK_SITE;
  }
}

const DEFAULT_SITE = normalizePublicSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);

const ORG_NAME = "סיעודית — שירות אחיות 24/7";

export function getSiteUrl() {
  return DEFAULT_SITE;
}

export function absoluteUrl(path = "") {
  const base = getSiteUrl();
  if (!path || path === "/") return base;
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

export function canonicalPath(path) {
  return { canonical: absoluteUrl(path) };
}

/** @returns {{ street?: string, city?: string, phone?: string, phoneE164?: string, email?: string }} */
export function getPublicBusinessContact() {
  const phoneEnv = process.env.NEXT_PUBLIC_ORG_PHONE?.trim();
  return {
    street: process.env.NEXT_PUBLIC_ORG_STREET || ORG_STREET_LINE,
    city: process.env.NEXT_PUBLIC_ORG_CITY || ORG_LOCALITY,
    phone: phoneEnv || ORG_PHONE_DISPLAY,
    phoneE164: ORG_PHONE_E164,
    email: process.env.NEXT_PUBLIC_ORG_EMAIL || ORG_EMAIL,
  };
}

/**
 * Global graph: WebSite + MedicalBusiness/LocalBusiness (inject once — e.g. root layout).
 */
export function primarySiteGraphJsonLd() {
  const base = getSiteUrl();
  const { street, city, phone, phoneE164, email } = getPublicBusinessContact();
  const orgId = `${base}/#organization`;
  const websiteId = `${base}/#website`;

  const address =
    street || city
      ? {
          "@type": "PostalAddress",
          addressCountry: "IL",
          ...(street ? { streetAddress: street } : {}),
          ...(city ? { addressLocality: city } : {}),
        }
      : { "@type": "PostalAddress", addressCountry: "IL", addressLocality: "Israel" };

  /** @type {Record<string, unknown>[]} */
  const graph = [
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: base,
      name: "סיעודית",
      inLanguage: "he-IL",
      publisher: { "@id": orgId },
      ...(email
        ? {
            potentialAction: {
              "@type": "ContactAction",
              target: `mailto:${email}`,
            },
          }
        : {}),
    },
    {
      "@type": ["MedicalBusiness", "LocalBusiness"],
      "@id": orgId,
      name: ORG_NAME,
      legalName: ORG_LEGAL_NAME,
      url: base,
      description:
        "אחיות מוסמכות משרד הבריאות לליווי בבית ובית חולים, המשכיות אחרי שחרור וניהול טיפול לפי הוראה רפואית. שירות ארצי בישראל.",
      image: `${base}/images/siudit-logo.png`,
      priceRange: "$$",
      ...(phone ? { telephone: phoneE164 ?? phone } : {}),
      ...(email ? { email } : {}),
      address,
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: phoneE164 ?? phone,
          contactType: "customer service",
          areaServed: "IL",
          availableLanguage: ["Hebrew"],
        },
      ],
      areaServed: { "@type": "Country", name: "Israel" },
      medicalSpecialty: [
        { "@type": "MedicalSpecialty", name: "Nursing" },
        { "@type": "MedicalSpecialty", name: "HomeHealthCare" },
      ],
      knowsAbout: [
        "אחות פרטית",
        "אחות לבית חולים",
        "טיפול סיעודי",
        "המשכיות טיפול אחרי אשפוז",
      ],
    },
  ];

  return { "@context": "https://schema.org", "@graph": graph };
}

/** Never throws — safe for root layout (bad env / stringify edge cases). */
export function safePrimarySiteGraphJsonLdString() {
  try {
    return serializeJsonLd(primarySiteGraphJsonLd());
  } catch (err) {
    console.error("[seo] primarySiteGraphJsonLd failed", err);
    return serializeJsonLd({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "@id": `${FALLBACK_SITE}/#website`,
          url: FALLBACK_SITE,
          name: "סיעודית",
          inLanguage: "he-IL",
        },
      ],
    });
  }
}

/**
 * @param {{ name?: string, url?: string, logo?: string }} org
 */
export function organizationJsonLd(org = {}) {
  const base = getSiteUrl();
  const { phone, phoneE164, email } = getPublicBusinessContact();
  return {
    "@context": "https://schema.org",
    "@type": ["MedicalBusiness", "LocalBusiness"],
    "@id": `${base}/#organization`,
    name: org.name ?? ORG_NAME,
    legalName: ORG_LEGAL_NAME,
    url: org.url ?? base,
    logo: org.logo ?? `${base}/images/siudit-logo.png`,
    description:
      org.description ??
      "אחות פרטית לבית ולבית חולים בישראל. אחיות מוסמכות, זמינות לפי צורך, התאמה אישית.",
    ...(phone ? { telephone: phoneE164 ?? phone } : {}),
    ...(email ? { email } : {}),
    ...(phone
      ? {
          contactPoint: [
            {
              "@type": "ContactPoint",
              telephone: phoneE164 ?? phone,
              contactType: "customer service",
              areaServed: "IL",
              availableLanguage: ["Hebrew"],
            },
          ],
        }
      : {}),
    areaServed: { "@type": "Country", name: "Israel" },
    medicalSpecialty: { "@type": "MedicalSpecialty", name: "Nursing" },
    priceRange: "$$",
  };
}

export function breadcrumbJsonLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.href),
    })),
  };
}

export function faqPageJsonLd(faqPairs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqPairs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

export function articleJsonLd({ title, description, urlPath, datePublished, dateModified }) {
  const base = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished: datePublished ?? dateModified,
    dateModified: dateModified ?? datePublished,
    author: { "@type": "Organization", name: "סיעודית", "@id": `${base}/#organization` },
    publisher: { "@type": "Organization", name: "סיעודית", "@id": `${base}/#organization` },
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(urlPath) },
  };
}

export function localCityJsonLd(city) {
  const base = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": ["MedicalClinic", "LocalBusiness"],
    "@id": `${absoluteUrl(`/cities/${city.slug}`)}#local`,
    name: `סיעודית — אחות פרטית ב${city.name}`,
    url: absoluteUrl(`/cities/${city.slug}`),
    parentOrganization: { "@id": `${base}/#organization` },
    medicalSpecialty: { "@type": "MedicalSpecialty", name: "Nursing" },
    areaServed: {
      "@type": "City",
      name: city.name,
      containedInPlace: { "@type": "AdministrativeArea", name: city.region ?? "ישראל" },
    },
    priceRange: "$$",
    isAcceptingNewPatients: true,
  };
}

/**
 * @param {import('../_data/hospitals.js').Hospital} hospital
 * @param {{ name: string, slug: string, region?: string }} city
 */
export function hospitalAreaServiceJsonLd(hospital, city) {
  const base = getSiteUrl();
  const url = absoluteUrl(`/hospitals/${hospital.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": `${url}#service`,
    name: `סיעודית — ליווי אחות פרטית ליד ${hospital.shortName}`,
    url,
    parentOrganization: { "@id": `${base}/#organization` },
    description: `תיאום אחות פרטית מוסמכת לליווי בבית החולים ${hospital.shortName} וב${city.name}, והמשכיות טיפול בבית — לפי הוראה רפואית ובהתאם לצורך.`,
    medicalSpecialty: { "@type": "MedicalSpecialty", name: "Nursing" },
    areaServed: [
      { "@type": "City", name: city.name },
      {
        "@type": "MedicalOrganization",
        name: hospital.name,
      },
    ],
    priceRange: "$$",
  };
}

/** Merge FAQ into a single @graph with primary org refs (optional homepage). */
export function faqGraphJsonLd(faqPairs) {
  return { "@context": "https://schema.org", "@graph": [faqPageJsonLd(faqPairs)] };
}

/**
 * /cities hub: BreadcrumbList + page-scoped LocalBusiness/MedicalBusiness (nationwide directory landing).
 * Parent org remains the primary `@id` at `/#organization`.
 */
export function citiesNationwideHubGraphJsonLd() {
  const base = getSiteUrl();
  const hubUrl = absoluteUrl("/cities");
  const orgId = `${base}/#organization`;
  const { street, city, phone, email } = getPublicBusinessContact();

  const address =
    street || city
      ? {
          "@type": "PostalAddress",
          addressCountry: "IL",
          ...(street ? { streetAddress: street } : {}),
          ...(city ? { addressLocality: city } : {}),
        }
      : { "@type": "PostalAddress", addressCountry: "IL", addressLocality: "Israel" };

  /** @type {Record<string, unknown>[]} */
  const graph = [
    {
      "@type": "BreadcrumbList",
      "@id": `${hubUrl}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "עמוד הבית",
          item: base,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "אחות פרטית בכל הארץ — ערים ופריסה ארצית",
          item: hubUrl,
        },
      ],
    },
    {
      "@type": ["MedicalBusiness", "LocalBusiness"],
      "@id": `${hubUrl}#directory`,
      name: "סיעודית — אינדקס אחות פרטית בפריסה ארצית",
      legalName: ORG_LEGAL_NAME,
      url: hubUrl,
      description:
        "מרכז נחיתה ארצי לשירותי אחות פרטית בישראל: מיפוי ערים, בתי חולים מרכזיים, מעבר מהירה לייעוץ והתאמת אחות מוסמכת לפי אזור, שפה וצורך קליני — לבית ולבית חולים.",
      ...(phone ? { telephone: phone } : {}),
      ...(email ? { email } : {}),
      image: `${base}/images/siudit-logo.png`,
      priceRange: "$$",
      address,
      parentOrganization: { "@id": orgId },
      areaServed: { "@type": "Country", name: "Israel" },
      medicalSpecialty: [
        { "@type": "MedicalSpecialty", name: "Nursing" },
        { "@type": "MedicalSpecialty", name: "HomeHealthCare" },
      ],
      knowsAbout: [
        "אחות פרטית",
        "אחות פרטית לבית חולים",
        "המשכיות טיפול אחרי אשפוז",
        "סיעוד בקהילה",
      ],
    },
  ];

  return { "@context": "https://schema.org", "@graph": graph };
}
