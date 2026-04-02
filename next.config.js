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
    // NOTE: swiper usunięty — z optimizePackageImports/transpilePackages
    // webpack hoistował go do shared chunks (~164 KB eager na homepage mimo dynamic())
    optimizePackageImports: ['lucide-react'],
  },

  // ✅ Trailing slash - foldery z index.html (niezawodne na Cloudflare Pages)
  trailingSlash: true,

  // ✅ Powered by header - wyłączony dla bezpieczeństwa
  poweredByHeader: false,

  // ⚠️ Headers i redirects → plik public/_headers i public/_redirects
  // (async headers() / async redirects() nie działają z output: 'export')
}

module.exports = nextConfig

