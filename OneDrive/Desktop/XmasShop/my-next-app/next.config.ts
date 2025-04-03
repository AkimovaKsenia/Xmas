import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    SERVER_URL: process.env.SERVER_URL,
  },
  async rewrites() {
    return [
      {
        source: "/uploads/:path*",
        destination: `http://localhost:4200/uploads/:path*`,
      },
    ];
  },
};

export default nextConfig;
