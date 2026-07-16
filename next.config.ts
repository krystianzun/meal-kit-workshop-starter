import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Avoid picking a parent folder lockfile as the workspace root
    root: process.cwd(),
  },
};

export default nextConfig;
