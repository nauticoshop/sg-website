import type { NextConfig } from "next";

/**
 * Site config. The big block here is `redirects()` — it preserves
 * SEO and any external links that still point at the old WordPress
 * URL structure. When the domain cuts over from Cloudways to Vercel,
 * none of these old URLs should 404.
 */
const nextConfig: NextConfig = {
  async redirects() {
    return [
      // -------------------------------------------------------------
      // Internal restructure: case studies fold into the journal
      // -------------------------------------------------------------
      { source: "/case-studies", destination: "/journal", permanent: true },
      { source: "/case-studies/:slug", destination: "/journal/:slug", permanent: true },

      // -------------------------------------------------------------
      // WordPress → Next.js URL rewrites
      // (covers the most common WP page slugs and Salient/Elementor
      //  permalink conventions; extend the list as we discover more
      //  inbound URLs in the analytics logs)
      // -------------------------------------------------------------
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/about-us/", destination: "/about", permanent: true },
      { source: "/our-services", destination: "/services", permanent: true },
      { source: "/services-2", destination: "/services", permanent: true },
      { source: "/what-we-do", destination: "/services", permanent: true },
      { source: "/our-work", destination: "/journal", permanent: true },
      { source: "/portfolio", destination: "/journal", permanent: true },
      { source: "/work", destination: "/journal", permanent: true },
      { source: "/blog", destination: "/journal", permanent: true },
      { source: "/blog/:slug", destination: "/journal/:slug", permanent: true },
      { source: "/news", destination: "/journal", permanent: true },
      { source: "/news/:slug", destination: "/journal/:slug", permanent: true },
      { source: "/editorial", destination: "/journal", permanent: true },
      { source: "/editorial/:slug", destination: "/journal/:slug", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/get-in-touch", destination: "/contact", permanent: true },
      { source: "/careers-2", destination: "/careers", permanent: true },
      { source: "/join-us", destination: "/careers", permanent: true },
      { source: "/our-team", destination: "/about/team", permanent: true },
      { source: "/team", destination: "/about/team", permanent: true },
      { source: "/nautical-network", destination: "/about/nautical-network", permanent: true },
      { source: "/sister-brand", destination: "/about/nautical-network", permanent: true },
      { source: "/book-a-call", destination: "/discovery-call", permanent: true },
      { source: "/book", destination: "/discovery-call", permanent: true },
      { source: "/schedule", destination: "/discovery-call", permanent: true },
      { source: "/privacy-policy", destination: "/privacy", permanent: true },
      { source: "/terms-of-service", destination: "/terms", permanent: true },
      { source: "/terms-and-conditions", destination: "/terms", permanent: true },

      // -------------------------------------------------------------
      // Vertical / industry page renames
      // -------------------------------------------------------------
      { source: "/industries", destination: "/verticals", permanent: true },
      { source: "/industry", destination: "/verticals", permanent: true },
      { source: "/our-industries", destination: "/verticals", permanent: true },
      { source: "/markets", destination: "/verticals", permanent: true },
      { source: "/marine-yachting", destination: "/verticals/marine", permanent: true },
      { source: "/marine-and-yachting", destination: "/verticals/marine", permanent: true },
      { source: "/luxury-real-estate", destination: "/verticals/real-estate", permanent: true },
      { source: "/real-estate-development", destination: "/verticals/real-estate", permanent: true },
      { source: "/exotic-luxury-automotive", destination: "/verticals/exotic-automotive", permanent: true },
      { source: "/luxury-automotive", destination: "/verticals/exotic-automotive", permanent: true },
      { source: "/luxury-goods-experiences", destination: "/verticals/luxury-goods", permanent: true },

      // -------------------------------------------------------------
      // Legacy WP system paths that occasionally show up in logs
      // -------------------------------------------------------------
      { source: "/wp-admin/:path*", destination: "/", permanent: false },
      { source: "/wp-login.php", destination: "/", permanent: false },
      { source: "/index.php", destination: "/", permanent: true },
      { source: "/home", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
