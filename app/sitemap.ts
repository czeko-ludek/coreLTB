import { MetadataRoute } from 'next';
import { allServicesV2 } from '@/data/servicesV2';
import { allProjects } from '@/data/projects';

/**
 * Sitemap Generator for CoreLTB Builders
 *
 * Automatycznie generuje sitemap.xml dla wszystkich stron:
 * - Strony statyczne (homepage, oferta)
 * - Dynamiczne strony usług (/oferta/[slug])
 * - Dynamiczne strony projektów (/projekty/[slug])
 *
 * WAŻNE: Zmień BASE_URL przed deployment na produkcję!
 */

// TODO: Zmień na docelową domenę klienta przed wdrożeniem produkcyjnym
const BASE_URL = 'https://coreltb-v2.pages.dev';

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  // Strony statyczne
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/oferta`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  // Dynamiczne strony usług (/oferta/[slug])
  const servicePages: MetadataRoute.Sitemap = allServicesV2.map((service) => ({
    url: `${BASE_URL}/oferta/${service.slug}`,
    lastModified: service.updatedAt ? new Date(service.updatedAt) : currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Dynamiczne strony projektów (/projekty/[slug])
  const projectPages: MetadataRoute.Sitemap = allProjects.map((project) => ({
    url: `${BASE_URL}/projekty/${project.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Połącz wszystkie strony
  return [...staticPages, ...servicePages, ...projectPages];
}
