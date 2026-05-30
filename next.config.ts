import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // /case-studies was retired — case studies now live as one
      // entry type inside the Studio Journal at /journal.
      {
        source: "/case-studies",
        destination: "/journal",
        permanent: true,
      },
      {
        source: "/case-studies/:slug",
        destination: "/journal/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
