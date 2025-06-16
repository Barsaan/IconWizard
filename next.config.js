/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_OPENAI_API_KEY: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY
  },
  images: {
    unoptimized: false, // Re-enable image optimization
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*', // Allow all remote image sources
      }
    ]
  },
  // Add additional configuration to handle potential image issues
  webpack: (config, { isServer }) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  }
};

module.exports = nextConfig
