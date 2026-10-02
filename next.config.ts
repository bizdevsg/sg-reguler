import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["id", "en"],
    defaultLocale: "id",
    localeDetection: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "portalnews.newsmaker.id",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.newsmaker.id",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "vellorist.biz.id",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "sg-admin.newsmaker.id",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/sg-admin/:path*",
        destination: "https://sg-admin.newsmaker.id/:path*",
      },
      {
        source: "/api/portalnews/:path*",
        destination: "https://portalnews.newsmaker.id/:path*",
      },
    ];
  },
};

export default nextConfig;
