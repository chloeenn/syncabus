import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['pdf-parse'],
  allowedDevOrigins: ['192.168.2.165'],
};

export default nextConfig;