import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Fix Windows permission issues during build
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Avoid scanning Windows system directories
      config.resolve.symlinks = false;
    }
    return config;
  },
  // Configuration options can be added here as needed
};

export default nextConfig;
