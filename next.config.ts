import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["k.kakaocdn.net"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "k.kakaocdn.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "k.kakaocdn.net",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
