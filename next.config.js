/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Enable standalone output mode for Docker deployment
  experimental: {
    // This improves module resolution in Docker
    outputFileTracingRoot: process.cwd(),
  },
  images: {
    domains: ['images.unsplash.com', 'plus.unsplash.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
        pathname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
