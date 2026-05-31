import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "12mb",
    },
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
