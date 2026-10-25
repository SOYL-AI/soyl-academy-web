import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Product screenshots and photography are served as AVIF first, WebP second.
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
