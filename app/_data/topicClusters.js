import { services } from "./services";
import { blogPosts } from "./blogPosts";

/** Pillar hubs + supporting URLs for topical authority & internal linking */
export const topicPillars = [
  {
    slug: "home-continuity",
    title: "המשכיות בבית",
    description: "אחרי שחרור, כרוני, קשישות — טיפול לפי הוראה ושקט למשפחה.",
    serviceSlugs: ["private-nurse-home", "elderly-care-nurse", "home-medical-supervision", "night-nurse"],
    postSlugs: ["elderly-care-at-home", "post-surgery-nurse-at-home", "chronic-conditions-nurse"],
  },
  {
    slug: "hospital-and-acute",
    title: "בית חולים ומצבים חריפים",
    description: "ליווי במחלקה, ניהול מעברים, תיאום מול צוותים.",
    serviceSlugs: ["private-nurse-hospital", "post-surgery-nurse", "iv-treatment-home"],
    postSlugs: ["when-to-hire-private-nurse", "hospital-private-nurse-guide"],
  },
  {
    slug: "recovery-rehab",
    title: "החלמה ושיקום",
    description: "ימים ראשונים אחרי פרוצדורה, שיקום תפקודי ומניעת סיבוכים.",
    serviceSlugs: ["post-surgery-nurse", "rehabilitation-nurse", "private-nurse-home"],
    postSlugs: ["post-surgery-nurse-at-home", "recovery-after-surgery-home"],
  },
  {
    slug: "complex-chronic",
    title: "מצבים מורכבים ולוגיסטיקה",
    description: "כלים למידע, ביטוח והחלטות — לצד שירות האחות.",
    postSlugs: ["private-nurse-cost-israel", "insurance-reimbursement-nurse", "choosing-nurse-agency"],
    serviceSlugs: ["palliative-care", "home-medical-supervision"],
  },
];

export function pillarBySlug(slug) {
  return topicPillars.find((p) => p.slug === slug);
}

export function servicesForPillar(pillar) {
  return pillar.serviceSlugs?.map((s) => services.find((x) => x.slug === s)).filter(Boolean) ?? [];
}

export function postsForPillar(pillar) {
  return pillar.postSlugs?.map((s) => blogPosts.find((p) => p.slug === s)).filter(Boolean) ?? [];
}
