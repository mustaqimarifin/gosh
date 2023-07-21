const { get } = require("@vercel/edge-config");
const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ["@trpc/server", "@prisma/client"],
    swcPlugins: [
      [
        "next-superjson-plugin",
        {
          excluded: [],
        },
      ],
    ],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // Twitter Profile Picture
    remotePatterns: [
      { protocol: "https", hostname: "pbs.twimg.com", pathname: "/**" },
      { protocol: "https", hostname: "beebom.com", pathname: "/**" },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
    ],
  },
  webpack: (config) => {
    // This is only intended to pass CI and should be skiped in your app
    if (config.name === "server")
      config.optimization.concatenateModules = false;

    return config;
  },
};
module.exports = withContentlayer(nextConfig);
