import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // GitHub Pages 部署时使用
  // basePath: "/clawsoul",
  // assetPrefix: "/clawsoul/",
};

export default nextConfig;
