import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Output standalone build for Docker
  output: "standalone",
  
  // Set workspace root to avoid lockfile warnings
  outputFileTracingRoot: path.join(__dirname),
  
  // Enable static image imports
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // Experimental features for better performance
  experimental: {
    // Enable server actions
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
};

export default nextConfig;
