/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ Static export dla Cloudflare Pages (output → out/)
  output: 'export',

  // ✅ Obrazy — static export wymaga unoptimized
  // Optymalizacja odbywa się na etapie builda (WebP/AVIF już w public/)
  images: {
    unoptimized: true,
  },

  // ✅ React 19 Strict Mode (zalecane dla dev)
  reactStrictMode: true,

  // ✅ Optymalizacje dla Next.js 15
  experimental: {
    // Optymalizuje importy pakietów (zmniejsza bundle size)
    optimizePackageImports: ['lucide-react', 'swiper', 'framer-motion'],
  },

  // ✅ Trailing slash - bez slasha na końcu URL (lepsze dla SEO)
  trailingSlash: false,

  // ✅ Powered by header - wyłączony dla bezpieczeństwa
  poweredByHeader: false,

  // ✅ Swiper CSS inlining (dla lepszego LCP)
  transpilePackages: ['swiper'],

  // ⚠️ Headers i redirects → plik public/_headers i public/_redirects
  // (async headers() / async redirects() nie działają z output: 'export')
}

module.exports = nextConfig

