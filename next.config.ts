import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: { styledComponents: true },
  output: "export",
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
