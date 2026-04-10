import { MetadataRoute } from 'next';
import { allServicesV2 } from '@/data/servicesV2';
import { allProjects } from '@/data/projects';
import { getAllLocalPageSlugs } from '@/data/local';
import { getAllNadzorSlugs } from '@/data/nadzor';
import { getAllRealizationSlugs } from '@/data/realizacje';
import { companyData } from '@/data/company-data';

// Wymagane dla output: 'export' (static HTML)
export const dynamic = 'force-static';

const BASE_URL = companyData.url;

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
      url: `${BASE_URL}/o-nas`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/oferta`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/projekty`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/baza-wiedzy`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/kontakt`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/partnerzy`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/obszar-dzialania`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // Landing pages (conversion)
    {
      url: `${BASE_URL}/wycena`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/umow-konsultacje`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/analiza-dzialki`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    // Legal pages
    {
      url: `${BASE_URL}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
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

  // Regionalne strony lokalne (/obszar-dzialania/[slug])
  const localPages: MetadataRoute.Sitemap = getAllLocalPageSlugs().map((slug) => ({
    url: `${BASE_URL}/obszar-dzialania/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Strony nadzoru per-miasto (/kierownik-budowy-[miasto])
  const nadzorPages: MetadataRoute.Sitemap = getAllNadzorSlugs().map((slug) => ({
    url: `${BASE_URL}/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Strony realizacji (/realizacje/[slug])
  const realizationPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/realizacje`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    ...getAllRealizationSlugs().map((slug) => ({
      url: `${BASE_URL}/realizacje/${slug}`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  ];

  return [...staticPages, ...servicePages, ...projectPages, ...localPages, ...nadzorPages, ...realizationPages];
}
