import { getPostsByCategory, getAllCategories } from "@/lib/sanity/client";
import { NextResponse } from "next/server";

export const revalidate = 3600; // Revalidate every hour

// Generate static params for all categories
export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((cat) => ({
    category: cat.category,
  }));
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ category: string }> }
) {
  const { category } = await params;
  const posts = await getPostsByCategory(category);
  const siteUrl = "https://uywakuna.info";

  // Get category info from first post
  const categoryInfo = posts?.[0]?.categories?.find(
    (cat: any) => cat.slug?.current === category
  );
  const categoryTitle = categoryInfo?.title_es || categoryInfo?.title_fr || category;
  const categoryTitleFr = categoryInfo?.title_fr || categoryInfo?.title_es || category;

  if (!posts || posts.length === 0) {
    return new NextResponse(
      `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Uywakuna - ${categoryTitle}</title>
    <link>${siteUrl}/category/${category}</link>
    <description>No hay artículos disponibles en esta categoría</description>
  </channel>
</rss>`,
      {
        headers: {
          'Content-Type': 'application/xml',
          'Cache-Control': 'public, s-maxage=3600',
        },
      }
    );
  }

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Uywakuna - ${categoryTitle}</title>
    <link>${siteUrl}/category/${category}</link>
    <description>Artículos sobre ${categoryTitle} en Uywakuna - Tu Zoológico Virtual. Articles sur ${categoryTitleFr}.</description>
    <language>es</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed/${category}" rel="self" type="application/rss+xml" />
    ${posts
      .slice(0, 30) // Limit to 30 posts per category
      .map((post: any) => {
        const title = post.title_es || post.title_fr || 'Sin título';
        const description = post.excerpt_es || post.excerpt_fr || '';
        const slug = post.slug_es?.current || post.slug_fr?.current || post.slug_es || post.slug_fr;
        const pubDate = post.publishedAt || post._createdAt;

        return `
    <item>
      <title><![CDATA[${title}]]></title>
      <link>${siteUrl}/post/${slug}</link>
      <guid isPermaLink="true">${siteUrl}/post/${slug}</guid>
      <description><![CDATA[${description}]]></description>
      <pubDate>${new Date(pubDate).toUTCString()}</pubDate>
      <author>contact@uywakuna.info (${post.author?.name || 'Uywakuna Team'})</author>
      <category>${categoryTitle}</category>
    </item>`;
      })
      .join('')}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
    },
  });
}
