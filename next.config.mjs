import { withContentlayer } from "next-contentlayer"

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  transpilePackages: ["ass-code", "shaka"],
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ["@trpc/server"],
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

    remotePatterns: [
      { protocol: "https", hostname: "pbs.twimg.com", pathname: "/**" },
      { protocol: "https", hostname: "beebom.com", pathname: "/**" },
      {
        protocol: "https",
        hostname: "shorturl.at",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.punkapi.com",
        pathname: "/**",
      },
    ],
  },
  webpack: (config) => {
    // This is only intended to pass CI and should be skiped in your app
    if (config.name === "server") config.optimization.concatenateModules = false

    return config
  },
}
export default withContentlayer(nextConfig)
