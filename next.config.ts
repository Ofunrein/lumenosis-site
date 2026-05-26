import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "ap.rdcpix.com" },
    ],
  },
};

const withMDX = createMDX({});
export default withMDX(nextConfig);
