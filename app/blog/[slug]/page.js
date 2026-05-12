import { notFound } from "next/navigation";
import BlogArticlePage from "../../_components/BlogArticlePage";
import { blogPosts, postBySlug } from "../../_data/blogPosts";
import { absoluteUrl, canonicalPath } from "../../lib/seo";

export const revalidate = 86400;

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) {
    return { title: "לא נמצא | סיעוד פרימיום", robots: { index: false, follow: false } };
  }
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: canonicalPath(`/blog/${post.slug}`),
    openGraph: {
      type: "article",
      locale: "he_IL",
      url: absoluteUrl(`/blog/${post.slug}`),
      title: post.metaTitle,
      description: post.metaDescription,
      publishedTime: post.published,
      modifiedTime: post.updated,
    },
    robots: { index: true, follow: true },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) notFound();
  return <BlogArticlePage post={post} />;
}
