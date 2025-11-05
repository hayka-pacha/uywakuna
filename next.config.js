/** @type {import('next').NextConfig} */
const nextConfig = {
  // Only enable static export for production builds
  // This allows Sanity Studio to work in development mode
  ...(process.env.NODE_ENV === 'production' && {
    output: 'export',
  }),
  reactStrictMode: true,
  images: {
    unoptimized: true, // Required for static export
  },
  typescript: {
    // Ignore TypeScript errors during build (including Turbopack generated code issues)
    ignoreBuildErrors: true
  },
  // Disable features incompatible with static export
  trailingSlash: true, // Recommended for S3 hosting
};

module.exports = nextConfig;
