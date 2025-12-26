import { getAllPosts } from "@/lib/sanity/client";
import { NextResponse } from "next/server";

export async function GET() {
  const posts = await getAllPosts();
  const siteUrl = "https://uywakuna.info";

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Uywakuna - Tu Zoológico Virtual</title>
    <link>${siteUrl}</link>
    <description>Blog educativo bilingüe (ES/FR) sobre la fauna y biodiversidad de América del Sur</description>
    <language>es</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
    ${posts
      .slice(0, 50) // Limit to 50 most recent posts
      .map((post) => {
        const title = post.title_es || post.title_fr || 'Sin título';
        const description = post.excerpt_es || post.excerpt_fr || '';
        const slug = post.slug_es || post.slug_fr;
        const pubDate = post.publishedAt || post._createdAt;

        return `
    <item>
      <title><![CDATA[${title}]]></title>
      <link>${siteUrl}/post/${slug}</link>
      <guid isPermaLink="true">${siteUrl}/post/${slug}</guid>
      <description><![CDATA[${description}]]></description>
      <pubDate>${new Date(pubDate).toUTCString()}</pubDate>
      <author>contact@uywakuna.info (${post.author?.name || 'Uywakuna Team'})</author>
      ${post.categories?.map(cat => `<category>${cat.title_es || cat.title_fr}</category>`).join('\n      ') || ''}
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
