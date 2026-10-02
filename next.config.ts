import type { NextConfig } from 'next';

// On GitHub Pages the site lives at /nidhis-kitchen/, so GitHub sets
// NEXT_PUBLIC_BASE_PATH while building. On your Mac it's empty.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig: NextConfig = {
  output: 'export', // "npm run build" makes plain website files in the "out" folder
  basePath,
  images: { unoptimized: true },
};

export default nextConfig;
