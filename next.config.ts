import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "s3-us-west-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "5cc.images.fantasyflightgames.com",
      },
    ],
  },
};

export default nextConfig;
