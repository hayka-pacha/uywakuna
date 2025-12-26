import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/sanity/client';

export const revalidate = 3600; // Revalidate every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://uywakuna.info';

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/archive`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  // Dynamic blog posts
  let dynamicPages: MetadataRoute.Sitemap = [];

  try {
    const posts = await getAllPosts();

    dynamicPages = posts.flatMap((post) => {
      const pages: MetadataRoute.Sitemap = [];

      // Spanish version (canonical)
      if (post.slug_es) {
        pages.push({
          url: `${baseUrl}/post/${post.slug_es}`,
          lastModified: new Date(post._updatedAt || post.publishedAt || post._createdAt),
          changeFrequency: 'weekly',
          priority: 0.9,
        });
      }

      // French version
      if (post.slug_fr) {
        pages.push({
          url: `${baseUrl}/post/${post.slug_fr}`,
          lastModified: new Date(post._updatedAt || post.publishedAt || post._createdAt),
          changeFrequency: 'weekly',
          priority: 0.9,
        });
      }

      return pages;
    });
  } catch (error) {
    console.error('Error fetching posts for sitemap:', error);
  }

  return [...staticPages, ...dynamicPages];
}
