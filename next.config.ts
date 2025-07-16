import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Remove the env section - AUTH_SECRET should not be public
  experimental: {
    // Enable experimental features for better performance if needed
  },
};

export default nextConfig;
