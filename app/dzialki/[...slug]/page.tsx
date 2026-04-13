import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { companyData } from '@/data/company-data';
import { allPlots, getPlotsByLocation, getPlotBySlug, getAllPlotSlugs } from '@/data/plots';
import { generatePlotFAQ } from '@/data/plots/seo';
import {
  cleanDescription,
  extractAddress,
  extractDistrict,
  formatPrice,
  getMediaLabels,
} from '@/data/plots/helpers';
import {
  LOCATIONS,
  getLocationBreadcrumb,
  getAllIndexableLocationSlugs,
  type LocationEntry,
} from '@/data/plots/locations';
import { ContactCTASection } from '@/components/sections';
import { PlotsListingSection } from '@/components/sections/plots/PlotsListingSection';
import { PlotDetailPage } from '@/components/sections/plots/PlotDetailPage';
import { getPlotCitySEO } from '@/data/plots/seo';
import type { Plot } from '@/data/plots/types';

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

/** Resolve slug array to a location entry. Supports both flat and hierarchical URLs. */
function resolveLocation(slugParts: string[]): LocationEntry | null {
  // Last segment is the actual location slug
  const locationSlug = slugParts[slugParts.length - 1];
  const loc = LOCATIONS[locationSlug];
  if (!loc) return null;

  // Validate the path matches the hierarchy (if multiple segments)
  if (slugParts.length > 1) {
    const breadcrumb = getLocationBreadcrumb(locationSlug);
    const expectedSlugs = breadcrumb.map((b) => b.slug);
    // Path segments should be a suffix of the breadcrumb
    const pathValid = slugParts.every((seg) => expectedSlugs.includes(seg));
    if (!pathValid) return null;
  }

  return loc;
}

// ── Generate static params for all indexable locations + individual plots ──
export async function generateStaticParams() {
  const params: { slug: string[] }[] = [];

  // Location pages (hierarchical)
  const locationSlugs = getAllIndexableLocationSlugs();
  for (const locationSlug of locationSlugs) {
    const breadcrumb = getLocationBreadcrumb(locationSlug);
    const relevantParts = breadcrumb.filter((b) => b.level !== 'wojewodztwo');
    if (relevantParts.length > 0) {
      params.push({ slug: relevantParts.map((b) => b.slug) });
    }
  }

  // Individual plot detail pages (single segment)
  const plotSlugs = getAllPlotSlugs();
  for (const plotSlug of plotSlugs) {
    params.push({ slug: [plotSlug] });
  }

  return params;
}

// ── Dynamic metadata (plot detail OR location listing) ──
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  // Single segment — check if it's a plot first
  if (slug.length === 1) {
    const plot = getPlotBySlug(slug[0]);
    if (plot) {
      return buildPlotMetadata(plot);
    }
  }

  // Otherwise, location listing
  const loc = resolveLocation(slug);
  if (!loc) return {};

  // Use city SEO config if available (for meta title/description)
  const metaCitySeo = getPlotCitySEO(loc.slug);
  const plots = getPlotsByLocation(loc.slug);
  const avail = plots.filter((p) => p.availability === 'dostepna');
  const count = avail.length;
  const canonicalPath = `/dzialki/${slug.join('/')}`;
  const mpzp = avail.filter((p) => p.mpzp === 'tak').length;
  const minPriceStr = avail.length > 0 ? Math.min(...avail.map((p) => p.price)).toLocaleString('pl-PL') : null;
  const areas = avail.map((p) => p.area);
  const areaRange = areas.length > 0 ? `${Math.min(...areas)}-${Math.max(...areas)} m2` : '';

  const title = metaCitySeo?.metaTitle
    || `Działki budowlane ${loc.name} - ${count} ofert${minPriceStr ? ` od ${minPriceStr} zł` : ''} | CoreLTB`;
  const description = metaCitySeo?.metaDescription
    || `${count} działek budowlanych na sprzedaż ${loc.nameLocative}. ${minPriceStr ? `Ceny od ${minPriceStr} zł. ` : ''}${areaRange ? `Powierzchnie ${areaRange}. ` : ''}${mpzp > 0 ? `${mpzp} z MPZP. ` : ''}Sprawdzone pod budowę domu — media, warunki gruntowe.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${companyData.url}${canonicalPath}`,
    },
    openGraph: {
      title,
      description,
      url: `${companyData.url}${canonicalPath}`,
      type: 'website',
    },
  };
}

/** Build SEO metadata for an individual plot detail page */
function buildPlotMetadata(plot: Plot): Metadata {
  const district = extractDistrict(plot.title) || plot.district;
  const locationDisplay = district ? `${plot.city}, ${district}` : plot.city;
  const address = extractAddress(plot);
  const mediaLabels = getMediaLabels(plot);
  const canonicalPath = `/dzialki/${plot.slug}`;

  const title = `Dzialka ${plot.area} m2 ${locationDisplay} - ${formatPrice(plot.price)} zl | CoreLTB`;
  const description = `Dzialka budowlana ${plot.area} m2 na sprzedaz w ${locationDisplay}. Cena ${formatPrice(plot.price)} zl (${plot.pricePerM2} zl/m2). ${plot.mpzp === 'tak' ? 'MPZP — plan miejscowy.' : ''} Media: ${mediaLabels.length > 0 ? mediaLabels.join(', ') : 'do weryfikacji'}.${address ? ` ${address}.` : ''} Sprawdz koszt budowy domu.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${companyData.url}${canonicalPath}`,
    },
    openGraph: {
      title,
      description,
      url: `${companyData.url}${canonicalPath}`,
      type: 'website',
      ...(plot.thumbnailSrc && {
        images: [
          {
            url: `${companyData.url}${plot.thumbnailSrc}`,
            width: 1200,
            height: 630,
            alt: `Dzialka budowlana ${plot.area} m2 ${locationDisplay}`,
          },
        ],
      }),
    },
  };
}

// ── Build Schema.org JSON-LD ──
function buildSchemaJsonLd(loc: LocationEntry, slugParts: string[], plots: typeof allPlots) {
  const available = plots.filter((p) => p.availability === 'dostepna');
  const canonicalUrl = `${companyData.url}/dzialki/${slugParts.join('/')}`;

  // BreadcrumbList
  const breadcrumb = getLocationBreadcrumb(loc.slug);
  const breadcrumbSchema = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: {
          '@id': companyData.url,
          '@type': 'WebPage',
          url: companyData.url,
          name: 'CoreLTB',
        },
      },
      {
        '@type': 'ListItem',
        position: 2,
        item: {
          '@id': `${companyData.url}/dzialki`,
          '@type': 'WebPage',
          url: `${companyData.url}/dzialki`,
          name: 'Dzialki budowlane',
        },
      },
      ...breadcrumb
        .filter((b) => b.level !== 'wojewodztwo')
        .map((b, i) => {
          const parts = getLocationBreadcrumb(b.slug)
            .filter((x) => x.level !== 'wojewodztwo')
            .map((x) => x.slug);
          return {
            '@type': 'ListItem',
            position: i + 3,
            item: {
              '@id': `${companyData.url}/dzialki/${parts.join('/')}`,
              '@type': 'WebPage',
              url: `${companyData.url}/dzialki/${parts.join('/')}`,
              name: b.name,
            },
          };
        }),
    ],
  };

  // WebPage
  const webPageSchema = {
    '@type': 'WebPage',
    url: canonicalUrl,
    isPartOf: {
      '@type': 'WebSite',
      name: 'CoreLTB Builders',
      url: companyData.url,
      description: 'Budowa domow jednorodzinnych na Slasku',
      inLanguage: 'pl',
    },
    name: `Dzialki budowlane ${loc.name}`,
    description: `Dzialki budowlane na sprzedaz ${loc.nameLocative}. Sprawdzone pod budowe domu.`,
    breadcrumb: breadcrumbSchema,
  };

  // Product + AggregateOffer (like OtoDom)
  const schemas: Record<string, unknown>[] = [webPageSchema, breadcrumbSchema];

  if (available.length > 0) {
    const prices = available.map((p) => p.price);
    const productSchema = {
      '@type': 'Product',
      additionalType: 'RealEstateListing',
      name: `Dzialki budowlane ${loc.name}`,
      description: `${available.length} dzialek budowlanych na sprzedaz ${loc.nameLocative}.`,
      url: canonicalUrl,
      ...(available[0]?.thumbnailSrc && { image: `${companyData.url}${available[0].thumbnailSrc}` }),
      offers: {
        '@type': 'AggregateOffer',
        businessFunction: 'SELL',
        lowPrice: Math.min(...prices).toString(),
        highPrice: Math.max(...prices).toString(),
        priceCurrency: 'PLN',
        offerCount: available.length.toString(),
        offers: available.slice(0, 10).map((plot) => ({
          '@type': 'Offer',
          availability: 'InStock',
          price: plot.price,
          priceCurrency: 'PLN',
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            priceCurrency: 'PLN',
            unitCode: 'MTK',
            unitText: 'm2',
            price: plot.pricePerM2,
          },
          name: plot.title,
          url: `${companyData.url}/dzialki/${plot.slug}`,
          ...(plot.thumbnailSrc && { image: `${companyData.url}${plot.thumbnailSrc}` }),
          itemOffered: {
            '@type': 'Place',
            description: plot.description?.slice(0, 200),
            address: {
              '@type': 'PostalAddress',
              addressCountry: 'Polska',
              addressLocality: plot.city,
              addressRegion: 'slaskie',
            },
          },
        })),
      },
    };
    schemas.push(productSchema);
  }

  return {
    '@context': 'https://schema.org',
    '@graph': schemas,
  };
}

// ── Schema.org for individual plot detail ──
function buildPlotDetailSchema(plot: Plot) {
  const district = extractDistrict(plot.title) || plot.district;
  const locationDisplay = district ? `${plot.city}, ${district}` : plot.city;
  const address = extractAddress(plot);
  const description = cleanDescription(plot.description);
  const canonicalUrl = `${companyData.url}/dzialki/${plot.slug}`;

  const breadcrumbSchema = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: { '@id': companyData.url, '@type': 'WebPage', url: companyData.url, name: 'CoreLTB' },
      },
      {
        '@type': 'ListItem',
        position: 2,
        item: { '@id': `${companyData.url}/dzialki`, '@type': 'WebPage', url: `${companyData.url}/dzialki`, name: 'Dzialki budowlane' },
      },
      {
        '@type': 'ListItem',
        position: 3,
        item: { '@id': canonicalUrl, '@type': 'WebPage', url: canonicalUrl, name: `Dzialka ${plot.area} m2 ${locationDisplay}` },
      },
    ],
  };

  const realEstateSchema = {
    '@type': 'RealEstateListing',
    name: `Dzialka budowlana ${plot.area} m2 - ${locationDisplay}`,
    description: description?.slice(0, 300) || `Dzialka budowlana ${plot.area} m2 na sprzedaz w ${locationDisplay}.`,
    url: canonicalUrl,
    datePosted: new Date(plot.dateAdded).toISOString().split('T')[0],
    ...(plot.thumbnailSrc && { image: `${companyData.url}${plot.thumbnailSrc}` }),
    offers: {
      '@type': 'Offer',
      price: plot.price,
      priceCurrency: 'PLN',
      availability: plot.availability === 'dostepna' ? 'InStock' : plot.availability === 'rezerwacja' ? 'PreOrder' : 'SoldOut',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: plot.pricePerM2,
        priceCurrency: 'PLN',
        unitCode: 'MTK',
        unitText: 'm2',
      },
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: plot.coordinates.lat,
      longitude: plot.coordinates.lng,
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'PL',
      addressLocality: plot.city,
      addressRegion: 'slaskie',
      ...(address && { streetAddress: address }),
    },
    additionalProperty: [
      { '@type': 'PropertyValue', name: 'Powierzchnia', value: `${plot.area} m2` },
      { '@type': 'PropertyValue', name: 'MPZP', value: plot.mpzp === 'tak' ? 'Tak' : plot.mpzp === 'nie' ? 'Nie' : 'Do weryfikacji' },
      { '@type': 'PropertyValue', name: 'Ksztalt', value: plot.plotShape },
      { '@type': 'PropertyValue', name: 'Teren', value: plot.terrain },
    ],
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [breadcrumbSchema, realEstateSchema],
  };
}

// ── Page component (handles both plot detail + location listing) ──
export default async function DzialkiSlugPage({ params }: PageProps) {
  const { slug } = await params;

  // ── Plot detail page (single segment matching a plot slug) ──
  if (slug.length === 1) {
    const plot = getPlotBySlug(slug[0]);
    if (plot) {
      const plotSchema = buildPlotDetailSchema(plot);

      return (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(plotSchema) }}
          />

          <PlotDetailPage plot={plot} />

          <ContactCTASection
            contactInfo={{
              phone: companyData.telephone,
              email: companyData.email,
            }}
          />
        </>
      );
    }
  }

  // ── Location listing page (hierarchical slugs) ──
  const loc = resolveLocation(slug);
  if (!loc) notFound();

  const plots = getPlotsByLocation(loc.slug);
  const faq = generatePlotFAQ(loc.nameLocative, plots);

  // Combined schema: structured data + FAQ
  const structuredData = buildSchemaJsonLd(loc, slug, plots);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  // Build breadcrumb data for UI
  const breadcrumb = getLocationBreadcrumb(loc.slug);
  const uiBreadcrumbs = [
    { label: 'Działki', href: '/dzialki' },
    ...breadcrumb
      .filter((b) => b.level !== 'wojewodztwo')
      .map((b) => {
        const parts = getLocationBreadcrumb(b.slug)
          .filter((x) => x.level !== 'wojewodztwo')
          .map((x) => x.slug);
        return {
          label: b.name,
          href: `/dzialki/${parts.join('/')}`,
        };
      }),
  ];

  // SEO data from city-specific config (if exists)
  const citySeo = getPlotCitySEO(loc.slug);

  // H1 and description — prefer city SEO config, fallback to dynamic description
  const h1 = citySeo?.h1 || 'Działki budowlane';
  const h1Highlight = citySeo?.h1Highlight || loc.nameLocative;

  // Build rich dynamic description with real stats
  const available = plots.filter((p) => p.availability === 'dostepna');
  const mpzpCount = available.filter((p) => p.mpzp === 'tak').length;
  const fullMediaCount = available.filter(
    (p) => p.media.water && p.media.electricity && p.media.gas && p.media.sewer
  ).length;
  const prices = available.map((p) => p.price);
  const minPrice = prices.length > 0 ? Math.min(...prices) : 0;

  const descParts: string[] = [];
  if (available.length > 0) {
    descParts.push(`${available.length} ${available.length === 1 ? 'działka budowlana' : 'działek budowlanych'} ${loc.nameLocative} od ${minPrice.toLocaleString('pl-PL')} zł.`);
  } else {
    descParts.push(`Działki budowlane ${loc.nameLocative}.`);
  }
  if (mpzpCount > 0) descParts.push(`${mpzpCount} z MPZP.`);
  if (fullMediaCount > 0) descParts.push(`${fullMediaCount} z pełnym uzbrojeniem.`);
  descParts.push('Sprawdzone pod budowę domu — media, warunki gruntowe, kształt terenu.');

  const description = citySeo?.description || descParts.join(' ');

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <PlotsListingSection
        plots={plots}
        activeCity={loc.slug}
        h1={h1}
        h1Highlight={h1Highlight}
        description={description}
        faq={faq}
        breadcrumbs={uiBreadcrumbs}
        seoContent={citySeo?.seoContent}
      />

      <ContactCTASection
        contactInfo={{
          phone: companyData.telephone,
          email: companyData.email,
        }}
      />
    </>
  );
}
