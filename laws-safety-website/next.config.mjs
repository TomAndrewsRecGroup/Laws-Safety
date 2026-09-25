/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Serve AVIF/WebP first so modern browsers get the smallest LCP image,
    // falling back to the original format automatically.
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 86400,
  },

  async rewrites() {
    // The IndexNow key file: /{key}.txt is served by /api/indexnow/key. The
    // key is read at build time, which is when Vercel exposes it; with no key
    // configured there is no rewrite and the path 404s like any other.
    const key = (process.env.INDEXNOW_API_KEY || '').trim();
    return /^[a-f0-9]{8,64}$/i.test(key) ? [{ source: `/${key}.txt`, destination: '/api/indexnow/key' }] : [];
  },

  async redirects() {
    return [
      // NOTE: the canonical host is www.laws-safety.com. The non-www to www
      // redirect is handled by Vercel domain settings, NOT here. A host-based
      // redirect in next.config causes redirect loops on Vercel.

      // Aliases people type or older links may carry. Every entry here is also
      // asserted by scripts/seo-audit.mjs (LEGACY_URLS), so a redirect that is
      // removed without a reason fails the audit.
      { source: '/home', destination: '/', permanent: true },
      { source: '/index', destination: '/', permanent: true },
      { source: '/about-us', destination: '/about', permanent: true },
      { source: '/about-stephen', destination: '/about', permanent: true },
      { source: '/stephen-laws', destination: '/about', permanent: true },
      { source: '/services', destination: '/expertise', permanent: true },
      { source: '/services/:slug*', destination: '/expertise', permanent: true },
      { source: '/disciplines', destination: '/expertise', permanent: true },
      { source: '/disciplines/:slug', destination: '/expertise/:slug', permanent: true },
      { source: '/industries', destination: '/sectors', permanent: true },
      { source: '/industries/:slug', destination: '/sectors/:slug', permanent: true },
      { source: '/areas', destination: '/locations', permanent: true },
      { source: '/areas/:slug', destination: '/locations/:slug', permanent: true },
      { source: '/blog', destination: '/insights', permanent: true },
      { source: '/blog/:slug*', destination: '/insights', permanent: true },
      { source: '/news', destination: '/insights', permanent: true },
      { source: '/guides', destination: '/insights', permanent: true },
      { source: '/guides/:slug', destination: '/insights/:slug', permanent: true },
      { source: '/reviews', destination: '/testimonials', permanent: true },
      { source: '/contact-us', destination: '/contact', permanent: true },
      { source: '/privacy', destination: '/legal', permanent: true },
      { source: '/privacy-policy', destination: '/legal', permanent: true },
      { source: '/terms', destination: '/legal', permanent: true },
      { source: '/cookies', destination: '/legal', permanent: true },
      { source: '/feed', destination: '/rss.xml', permanent: true },
      { source: '/feed.xml', destination: '/rss.xml', permanent: true },
    ];
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              // 'unsafe-inline' is needed for Next.js's inline scripts and the
              // gtag bootstrap; 'unsafe-eval' is not needed and is deliberately absent.
              "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com https://vercel.live https://www.googletagmanager.com https://www.google-analytics.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https://www.google-analytics.com https://www.googletagmanager.com",
              "font-src 'self' data:",
              "connect-src 'self' https://vitals.vercel-insights.com https://vercel.live https://www.google-analytics.com https://region1.google-analytics.com https://www.googletagmanager.com",
              "frame-src 'self' https://vercel.live",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'self'",
              'upgrade-insecure-requests',
            ].join('; '),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
