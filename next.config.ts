import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Disable Next/Image optimization to allow any external image source.
    // This avoids the need to configure every remote domain and removes the hostname check.
    // Trade-off: no automatic optimization/caching by Next.js.
    unoptimized: true,
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
  },
  devIndicators: {
    position: 'bottom-right'
  }


};

export default nextConfig;
