import type { NextConfig } from "next";
const isDev = process.env.NODE_ENV !== 'production';
const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowLocalIP: isDev,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // 구글 프로필 이미지 도메인
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4000',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '4000',
      },
      // 필요에 따라 홈서버 도메인 추가
    ],
  },
};
export default nextConfig;
