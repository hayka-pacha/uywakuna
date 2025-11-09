/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.sanity.io'], // Allow Sanity CDN images
  },
  typescript: {
    // Ignore TypeScript errors during build (including Turbopack generated code issues)
    ignoreBuildErrors: true
  },
};

module.exports = nextConfig;
