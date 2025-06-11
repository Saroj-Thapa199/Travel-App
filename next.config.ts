import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: `5yeh6d47mm.ufs.sh`,
        pathname: "/f/*",
      },
    ],
  },
};

export default nextConfig;
