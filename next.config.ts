import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // assetPrefix: './',
  trailingSlash: true,
  images: {unoptimized: true},
  reactStrictMode: true,
  env: {
    HIRO_API_KEY: process.env.HIRO_API_KEY,
  }, 
};

module.exports = nextConfig;
