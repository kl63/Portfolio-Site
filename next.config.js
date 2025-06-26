/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Enable standalone output mode for Docker deployment
  outputFileTracingRoot: process.cwd(), // Improves module resolution in Docker
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
