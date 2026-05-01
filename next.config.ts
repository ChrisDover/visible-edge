import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isProd ? "/visible-edge" : "",
  assetPrefix: isProd ? "/visible-edge" : undefined,
  images: { unoptimized: true },
};

export default nextConfig;
