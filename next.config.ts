import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.hitpaw.*',
      },
      
    ],
    // 可选：添加其他图像优化配置
    // formats: ['image/webp'],
    // minimumCacheTTL: 60,
  }
};

export default nextConfig;