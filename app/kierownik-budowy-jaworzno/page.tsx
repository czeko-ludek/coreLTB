import type { Metadata } from 'next';
import Script from 'next/script';
import { getNadzorPageBySlug } from '@/data/nadzor';
import { companyData } from '@/data/company-data';
import {
  generateFAQPageSchema,
  generateBreadcrumbSchema,
  sanitizeJsonLd,
} from '@/lib/schema';
import { getLocalBusinessSchema, getProviderSchema } from '@/data/company-data';

import { PageHeader, Breadcrumbs } from '@/components/shared';
import {
  EmotionalHeroSection,
  FAQTwoColumnsSection,
  ContactCTASection,
} from '@/components/sections';
import { WhyUsSection } from '@/components/sections/local/WhyUsSection';
import { LocalExpertiseSection } from '@/components/sections/local/LocalExpertiseSection';
import { MidPageCTA } from '@/components/sections/local/MidPageCTA';

// ── Static data ──
const SLUG = 'kierownik-budowy-jaworzno';
const page = getNadzorPageBySlug(SLUG)!;
const pageUrl = `${companyData.url}/${SLUG}`;

// ── Metadata ──
export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
  openGraph: {
    title: page.metaTitle,
    description: page.metaDescription,
    url: pageUrl,
    type: 'website',
    images: [
      {
        url: page.pageHeader.backgroundImage,
        width: 1200,
        height: 630,
      },
    ],
  },
};

// ── Schema.org ──
function generateNadzorSchema() {
  const graphItems: object[] = [];

  // 1. Service Schema — nadzór budowlany z pricing
  graphItems.push({
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${pageUrl}#service`,
    name: `Kierownik budowy ${page.cityName}`,
    description: page.emotionalHero.subtitle,
    provider: getProviderSchema(),
    areaServed: page.areaServed.map((area) => ({
      '@type': 'City',
      name: area,
    })),
    url: pageUrl,
    offers: {
      '@type': 'Offer',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: '5000',
        priceCurrency: 'PLN',
        unitText: 'od',
      },
    },
  });

  // 2. FAQPage Schema
  if (page.faq.items.length > 0) {
    graphItems.push(generateFAQPageSchema(page.faq.items, pageUrl));
  }

  // 3. LocalBusiness Schema
  const localBusiness = {
    ...getLocalBusinessSchema(),
    url: pageUrl,
    ...(page.geoCoordinates && {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: page.geoCoordinates.latitude,
        longitude: page.geoCoordinates.longitude,
      },
    }),
  };
  graphItems.push(localBusiness);

  // 4. Breadcrumb Schema
  graphItems.push(
    generateBreadcrumbSchema(page.pageHeader.breadcrumbs, pageUrl)
  );

  return { '@context': 'https://schema.org', '@graph': graphItems };
}

// ── Page Component ──
export default function KierownikBudowyJaworznoPage() {
  const schema = generateNadzorSchema();
  const jsonLd = sanitizeJsonLd(schema);

  return (
    <>
      <main>
        {/* 1. Breadcrumbs — nad hero */}
        <Breadcrumbs
          items={page.pageHeader.breadcrumbs.map((crumb, i, arr) => ({
            label: crumb.label,
            href: i < arr.length - 1 ? crumb.href : undefined,
          }))}
          className="container mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2"
        />

        {/* 2. PageHeader — hero z H1 */}
        <PageHeader
          title={page.pageHeader.title}
          backgroundImage={page.pageHeader.backgroundImage}
        />

        {/* 3. EmotionalHeroSection — intro + cennik + CTA box */}
        <EmotionalHeroSection {...page.emotionalHero} />

        {/* 4. WhyUsSection — 4 karty usług */}
        <WhyUsSection
          label={page.services.header.label ?? ''}
          title={page.services.header.title}
          competencies={page.services.items}
        />

        {/* 5. LocalExpertiseSection — szkody górnicze KWK Sobieski */}
        <LocalExpertiseSection
          header={page.localExpertise.header}
          cards={page.localExpertise.cards}
          image={
            page.localExpertise.image ?? {
              src: page.pageHeader.backgroundImage,
              alt: page.pageHeader.title,
            }
          }
        />

        {/* 6. Cennik — tabela z cenami */}
        <section className="py-12 lg:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            {/* Header */}
            <div className="text-center mb-10">
              <span className="inline-block bg-primary/10 text-primary font-bold text-xs uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-4">
                {page.pricing.header.label}
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-zinc-900 mb-4">
                {page.pricing.header.title}
              </h2>
              <p className="text-zinc-600 text-lg max-w-2xl mx-auto">
                {page.pricing.header.description}
              </p>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-2xl border border-zinc-200 shadow-sm mb-8">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-zinc-900 text-white">
                    <th className="px-6 py-4 font-bold text-sm uppercase tracking-wider">
                      Usługa
                    </th>
                    <th className="px-6 py-4 font-bold text-sm uppercase tracking-wider">
                      Cena
                    </th>
                    <th className="px-6 py-4 font-bold text-sm uppercase tracking-wider hidden sm:table-cell">
                      Model rozliczenia
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {page.pricing.rows.map((row, i) => (
                    <tr
                      key={row.service}
                      className={`border-b border-zinc-100 ${i % 2 === 0 ? 'bg-white' : 'bg-zinc-50'}`}
                    >
                      <td className="px-6 py-4 text-zinc-800 font-medium">
                        {row.service}
                      </td>
                      <td className="px-6 py-4 text-primary font-bold whitespace-nowrap">
                        {row.price}
                      </td>
                      <td className="px-6 py-4 text-zinc-500 text-sm hidden sm:table-cell">
                        {row.model}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Note */}
            <p className="text-sm text-zinc-500 text-center mb-8">
              {page.pricing.note}
            </p>

            {/* Comparison: Ryczałt vs za wizytę */}
            <div className="bg-background-beige rounded-2xl p-6 md:p-8">
              <h3 className="text-xl font-bold text-zinc-900 mb-3">
                {page.pricing.comparison.title}
              </h3>
              <p className="text-zinc-600 leading-relaxed">
                {page.pricing.comparison.description}
              </p>
            </div>
          </div>
        </section>

        {/* 7. MidPageCTA — cross-link do pełnej oferty + strony budowy */}
        <MidPageCTA
          headline="Potrzebujesz nadzoru"
          highlightedText={`w ${page.cityNameLocative}?`}
          phone={companyData.telephone}
          image={page.localExpertise.image?.src}
          buttons={[
            {
              text: 'Pełna oferta nadzoru',
              href: page.relatedLinks.mainServicePage,
              variant: 'primary',
            },
            ...(page.relatedLinks.localBuildPage
              ? [
                  {
                    text: `Budowa domów ${page.cityName}`,
                    href: page.relatedLinks.localBuildPage,
                    variant: 'outline-white' as const,
                  },
                ]
              : []),
          ]}
        />

        {/* 8. Dzielnice — obszar działania */}
        <section className="py-12 lg:py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="text-center mb-10">
              <span className="inline-block bg-primary/10 text-primary font-bold text-xs uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-4">
                {page.districts.header.label}
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-zinc-900 mb-4">
                {page.districts.header.title}
              </h2>
              <p className="text-zinc-600 text-lg max-w-2xl mx-auto">
                {page.districts.header.description}
              </p>
            </div>

            {/* Grid of districts */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-8">
              {page.districts.items.map((district) => (
                <div
                  key={district}
                  className="bg-zinc-50 rounded-xl px-4 py-3 text-center text-zinc-700 font-medium text-sm hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  {district}
                </div>
              ))}
            </div>

            {/* Description */}
            <p className="text-zinc-600 text-center max-w-3xl mx-auto leading-relaxed">
              {page.districts.description}
            </p>
          </div>
        </section>

        {/* 9. Trust signals — E-E-A-T (uprawnienia, OC, raporty) */}
        <WhyUsSection
          label={page.trustSignals.header.label ?? ''}
          title={page.trustSignals.header.title}
          competencies={page.trustSignals.items}
        />

        {/* 10. FAQ */}
        <FAQTwoColumnsSection
          id="faq-section"
          header={page.faq.header}
          items={page.faq.items}
        />

        {/* 11. ContactCTASection */}
        <ContactCTASection
          contactInfo={{
            phone: companyData.telephone,
            email: companyData.email,
          }}
          primaryButton={{ text: 'Umów Nadzór', href: '/umow-konsultacje?usluga=nadzor&miasto=jaworzno' }}
        />
      </main>

      {/* Schema.org JSON-LD */}
      <Script
        id={`schema-nadzor-${SLUG}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
    </>
  );
}
