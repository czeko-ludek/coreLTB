import type { OpenNextConfig } from '@opennextjs/cloudflare'

const config: OpenNextConfig = {
  cloudflare: {
    // Routing configuration
    routes: {
      // Include all dynamic routes
      include: ['/*'],
      // Exclude static assets
      exclude: [
        '/_next/static/*',
        '/favicon.ico',
        '/images/*',
        '/*.png',
        '/*.jpg',
        '/*.jpeg',
        '/*.webp',
        '/*.svg',
        '/*.ico',
      ],
    },
  },
}

export default config
