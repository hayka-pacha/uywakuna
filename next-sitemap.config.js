/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://uywakuna.info",
  generateRobotsTxt: false, // We manage robots.txt manually for better AI bot control
  generateIndexSitemap: false, // Single sitemap.xml is sufficient for small sites
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 7000, // All URLs in one file

  // Optimize for SEO
  exclude: [
    '/api/*',
    '/admin/*',
    '/_next/*',
    '/404',
    '/500'
  ],

  // Additional paths for better indexation
  additionalPaths: async (config) => {
    const result = [];

    // Add homepage with high priority
    result.push({
      loc: '/',
      changefreq: 'daily',
      priority: 1.0,
      lastmod: new Date().toISOString(),
    });

    // Add about page
    result.push({
      loc: '/about',
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    });

    // Add archive page
    result.push({
      loc: '/archive',
      changefreq: 'daily',
      priority: 0.9,
      lastmod: new Date().toISOString(),
    });

    return result;
  },

  // Transform function to add image metadata for posts
  transform: async (config, path) => {
    // Default transformation
    const defaultTransform = {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };

    // Add image metadata for blog posts
    if (path.startsWith('/post/')) {
      return {
        ...defaultTransform,
        changefreq: 'weekly',
        priority: 0.9,
        // Note: Image metadata would require fetching post data from Sanity
        // This is handled server-side during build with next-sitemap postbuild
        // For now, we prioritize posts higher for better SEO
      };
    }

    return defaultTransform;
  },

  // Robot.txt rules (not generated since we manage manually)
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
};
