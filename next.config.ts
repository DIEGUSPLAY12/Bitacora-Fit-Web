import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: "/Bitacora-Fit-Web",
  assetPrefix: "/Bitacora-Fit-Web",
  trailingSlash: true,
};

export default nextConfig;
