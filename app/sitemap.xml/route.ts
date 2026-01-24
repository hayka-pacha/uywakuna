import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/sanity/client';
import { urlForImage } from '@/lib/sanity/image';

export const revalidate = 3600; // Revalidate every hour

/**
 * Escapes XML special characters to prevent malformed XML
 */
function escapeXml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Generates image sitemap XML for a post
 * Returns empty string if no valid image exists
 */
function generateImageXml(post: any, locale: 'es' | 'fr'): string {
  if (!post?.mainImage?.asset?._ref) {
    return '';
  }

  const imageData = urlForImage(post.mainImage);
  if (!imageData?.src) {
    return '';
  }

  const title = post[`title_${locale}`] || post.title_es || '';
  const caption = post[`excerpt_${locale}`] || post.excerpt_es || '';

  return `
<image:image>
<image:loc>${escapeXml(imageData.src)}</image:loc>
<image:title>${escapeXml(title)}</image:title>
<image:caption>${escapeXml(caption)}</image:caption>
</image:image>`;
}

export async function GET() {
  try {
    const baseUrl = 'https://uywakuna.info';
    const now = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

    // Static pages
    const staticPages = `<url>
<loc>${baseUrl}</loc>
<lastmod>${now}</lastmod>
<changefreq>daily</changefreq>
<priority>1</priority>
</url>
<url>
<loc>${baseUrl}/about</loc>
<lastmod>${now}</lastmod>
<changefreq>weekly</changefreq>
<priority>0.8</priority>
</url>
<url>
<loc>${baseUrl}/archive</loc>
<lastmod>${now}</lastmod>
<changefreq>daily</changefreq>
<priority>0.9</priority>
</url>`;

    // Dynamic blog posts with images
    const posts = await getAllPosts();
    const dynamicPages = posts.flatMap((post) => {
      const pages: string[] = [];
      const lastmod = new Date(post._updatedAt || post.publishedAt || post._createdAt).toISOString().split('T')[0];

      // Spanish version (canonical)
      if (post.slug_es?.current) {
        const url = `${baseUrl}/post/${post.slug_es.current}`;
        const imageXml = generateImageXml(post, 'es');

        pages.push(`<url>
<loc>${url}</loc>
<lastmod>${lastmod}</lastmod>
<changefreq>weekly</changefreq>
<priority>0.9</priority>${imageXml}
</url>`);
      }

      // French version (only if different from Spanish slug to avoid duplicates)
      if (post.slug_fr?.current && post.slug_fr.current !== post.slug_es?.current) {
        const url = `${baseUrl}/post/${post.slug_fr.current}`;
        const imageXml = generateImageXml(post, 'fr');

        pages.push(`<url>
<loc>${url}</loc>
<lastmod>${lastmod}</lastmod>
<changefreq>weekly</changefreq>
<priority>0.9</priority>${imageXml}
</url>`);
      }

      return pages;
    });

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${staticPages}
${dynamicPages.join('\n')}
</urlset>`;

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new NextResponse('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>', {
      status: 500,
      headers: { 'Content-Type': 'application/xml' }
    });
  }
}
