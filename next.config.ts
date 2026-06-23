import type { NextConfig } from "next";

/**
 * Static export: `next build` emits a fully static site into `out/`.
 * No server, no API routes, no runtime secrets — the smallest possible
 * attack surface for an open-source portfolio. Deployable to Vercel,
 * GitHub Pages, or any static host.
 */
const nextConfig: NextConfig = {
  output: "export",
  // Static export can't optimize images at runtime (no server), so serve them as-is.
  images: { unoptimized: true },
  // Emit `/projects/` -> `/projects/index.html` so deep links work on any static host.
  trailingSlash: true,
  // Fail the build on type errors instead of shipping them.
  typescript: { ignoreBuildErrors: false },
};

export default nextConfig;
