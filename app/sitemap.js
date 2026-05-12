import { cities } from "./_data/cities";
import { services } from "./_data/services";
import { blogPosts } from "./_data/blogPosts";
import { hospitals } from "./_data/hospitals";
import { getSiteUrl } from "./lib/seo";

/** @returns {import('next').MetadataRoute.Sitemap} */
export default function sitemap() {
  const base = getSiteUrl();
  const last = new Date("2026-05-01");

  const entries = [
    { url: base, lastModified: last, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/cities`, lastModified: last, changeFrequency: "weekly", priority: 0.95 },
    { url: `${base}/services`, lastModified: last, changeFrequency: "weekly", priority: 0.95 },
    { url: `${base}/blog`, lastModified: last, changeFrequency: "weekly", priority: 0.92 },
    { url: `${base}/guides`, lastModified: last, changeFrequency: "weekly", priority: 0.93 },
    { url: `${base}/hospitals`, lastModified: last, changeFrequency: "weekly", priority: 0.93 },
    { url: `${base}/about`, lastModified: last, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/team`, lastModified: last, changeFrequency: "monthly", priority: 0.9 },
  ];

  hospitals.forEach((h) =>
    entries.push({
      url: `${base}/hospitals/${h.slug}`,
      lastModified: last,
      changeFrequency: "monthly",
      priority: 0.82,
    }),
  );

  cities.forEach((c) =>
    entries.push({
      url: `${base}/cities/${c.slug}`,
      lastModified: last,
      changeFrequency: "weekly",
      priority: 0.88,
    }),
  );

  services.forEach((s) =>
    entries.push({
      url: `${base}/services/${s.slug}`,
      lastModified: last,
      changeFrequency: "weekly",
      priority: 0.88,
    }),
  );

  blogPosts.forEach((p) =>
    entries.push({
      url: `${base}/blog/${p.slug}`,
      lastModified: new Date(p.updated || p.published),
      changeFrequency: "monthly",
      priority: 0.75,
    }),
  );

  return entries;
}
