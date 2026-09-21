import type { NextConfig } from "next";
const isDev = process.env.NODE_ENV !== "production";
const nextConfig: NextConfig = {
  redirects: async () => {
    return [
      {
        source: "/blog",
        destination: "/blog/all",
        permanent: true,
      },
      {
        source: "/blog/write",
        destination: "/blog/write/new",
        permanent: true,
      },
    ];
  },
  images: {
    dangerouslyAllowLocalIP: isDev,
    remotePatterns: [
      // 1. 로컬 백엔드
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "4000",
        pathname: "/**",
      },
      // 2. 프로덕션 백엔드
      {
        protocol: "https",
        hostname: "api.mink-stud.io",
        pathname: "/**",
      },
      // 3. 카카오 CDN (서브도메인: k, t1, img1 등 대응)
      {
        protocol: "https",
        hostname: "*.kakaocdn.net",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "*.kakaocdn.net",
        pathname: "/**",
      },
      // 4. 카카오 CDN (루트 도메인 대응)
      {
        protocol: "https",
        hostname: "kakaocdn.net",
        pathname: "/**",
      },
    ],
  },
};
export default nextConfig;
