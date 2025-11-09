/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/**',
      },
    ],
  },
  typescript: {
    // Ignore TypeScript errors during build (including Turbopack generated code issues)
    ignoreBuildErrors: true
  },
};

module.exports = nextConfig;
