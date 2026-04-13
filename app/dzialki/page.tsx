import type { Metadata } from 'next';
import { companyData } from '@/data/company-data';
import { allPlots } from '@/data/plots';
import { generatePlotFAQ } from '@/data/plots/seo';
import { ContactCTASection } from '@/components/sections';
import { PlotsListingSection } from '@/components/sections/plots/PlotsListingSection';

export const metadata: Metadata = {
  title: 'Działki budowlane na Śląsku - sprawdzone pod budowę domu | CoreLTB',
  description:
    'Działki budowlane na sprzedaż na Śląsku. Sprawdzone pod budowę domu jednorodzinnego - MPZP, media, warunki gruntowe. Wodzisław Śląski, Rybnik, Gorzyce i okolice.',
  alternates: {
    canonical: `${companyData.url}/dzialki`,
  },
  openGraph: {
    title: 'Działki budowlane na Śląsku | CoreLTB Builders',
    description:
      'Sprawdzone działki budowlane pod budowę domu na Śląsku. Informacje o mediach, MPZP i warunkach gruntowych.',
    url: `${companyData.url}/dzialki`,
    type: 'website',
  },
};

export default function DzialkiPage() {
  const available = allPlots.filter((p) => p.availability === 'dostepna');
  const faq = generatePlotFAQ('na Śląsku', allPlots);

  // FAQPage schema
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

  // WebPage + Product/AggregateOffer schema
  const prices = available.map((p) => p.price);
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        url: `${companyData.url}/dzialki`,
        isPartOf: {
          '@type': 'WebSite',
          name: 'CoreLTB Builders',
          url: companyData.url,
          inLanguage: 'pl',
        },
        name: 'Dzialki budowlane na Slasku',
        description: 'Sprawdzone dzialki budowlane na sprzedaz na Slasku.',
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              item: { '@id': companyData.url, name: 'CoreLTB' },
            },
            {
              '@type': 'ListItem',
              position: 2,
              item: { '@id': `${companyData.url}/dzialki`, name: 'Dzialki budowlane' },
            },
          ],
        },
      },
      ...(available.length > 0
        ? [
            {
              '@type': 'Product',
              additionalType: 'RealEstateListing',
              name: 'Dzialki budowlane na Slasku',
              description: `${available.length} dzialek budowlanych na sprzedaz na Slasku.`,
              url: `${companyData.url}/dzialki`,
              offers: {
                '@type': 'AggregateOffer',
                businessFunction: 'SELL',
                lowPrice: Math.min(...prices).toString(),
                highPrice: Math.max(...prices).toString(),
                priceCurrency: 'PLN',
                offerCount: available.length.toString(),
              },
            },
          ]
        : []),
    ],
  };

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

      <PlotsListingSection plots={allPlots} faq={faq} />

      <ContactCTASection
        contactInfo={{
          phone: companyData.telephone,
          email: companyData.email,
        }}
      />
    </>
  );
}
