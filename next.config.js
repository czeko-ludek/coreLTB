/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ Usunięto 'output: export' - pełny tryb serwerowy Next.js 15

  // ✅ Optymalizacja obrazów (AVIF + WebP)
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },

  // ✅ React 19 Strict Mode (zalecane dla dev)
  reactStrictMode: true,

  // ✅ Optymalizacje dla Next.js 15
  experimental: {
    // Optymalizuje importy pakietów (zmniejsza bundle size)
    optimizePackageImports: ['lucide-react', 'swiper'],
  },

  // ✅ Kompresja (Cloudflare też kompresuje, ale warto mieć)
  compress: true,

  // ✅ Trailing slash - bez slasha na końcu URL (lepsze dla SEO)
  trailingSlash: false,

  // ✅ Powered by header - wyłączony dla bezpieczeństwa
  poweredByHeader: false,

  // ✅ Optymalizacja fontów Google Fonts
  optimizeFonts: true,

  // ✅ Swiper CSS inlining (dla lepszego LCP)
  transpilePackages: ['swiper'],

  // ✅ Headers dla lepszej security i cache
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
        ],
      },
      {
        // Cache dla obrazów (1 rok)
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache dla statycznych assetów (1 rok)
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig

