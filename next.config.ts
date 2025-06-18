import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  images: {
    domains: ["k.kakaocdn.net", "objectstorage.ap-chuncheon-1.oraclecloud.com"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "*.kakaocdn.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.kakaocdn.net",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
