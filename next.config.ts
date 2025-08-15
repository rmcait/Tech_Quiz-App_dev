import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel最適化設定
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client'],
  },
  // 静的ファイル最適化
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  // ビルド最適化
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
