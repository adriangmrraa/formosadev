import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages (no Node server at runtime).
  output: "export",
  // GitHub Pages resolves /section/index.html reliably.
  trailingSlash: true,
  images: {
    // No Image Optimization API on static hosting; serve files as-is.
    unoptimized: true,
  },
};

export default nextConfig;
