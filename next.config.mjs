/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    outputFileTracingIncludes: {
      "/api/**": ["./prisma/prisma/dev.db"],
    },
  },
};

export default nextConfig;
