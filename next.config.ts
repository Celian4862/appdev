import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Remove the env section - AUTH_SECRET should not be public
  experimental: {
    // Enable experimental features for better performance if needed
  },
  // Add webpack configuration for better Tailwind v4 compatibility
  webpack: (config, { isServer }) => {
    // Ensure proper handling of native modules on Vercel
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
      };
    }
    return config;
  },
};

export default nextConfig;
