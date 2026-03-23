import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { getLocalPageBySlug, getAllLocalPageSlugs } from '@/data/local';
import { companyData } from '@/data/company-data';
import { generateLocalPageSchema, sanitizeJsonLd } from '@/lib/schema';

import { PageHeader, Breadcrumbs } from '@/components/shared';
import {
  EmotionalHeroSection,
  FAQTwoColumnsSection,
  ContactCTASection,
} from '@/components/sections';
import { ServicePillarsSection } from '@/components/sections/local/ServicePillarsSection';
import { MidPageCTA } from '@/components/sections/local/MidPageCTA';
import { LocalExpertiseSection } from '@/components/sections/local/LocalExpertiseSection';
import { BuildingStagesSection } from '@/components/sections/local/BuildingStagesSection';
import { WhyUsSection } from '@/components/sections/local/WhyUsSection';
import { PartnerLogosMarquee } from '@/components/sections/local/PartnerLogosMarquee';
import { DistrictsSection } from '@/components/sections/local/DistrictsSection';

/**
 * Generate static params for SSG
 */
export async function generateStaticParams() {
  return getAllLocalPageSlugs().map((slug) => ({ slug }));
}

/**
 * Generate metadata for SEO
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getLocalPageBySlug(slug);

  if (!page) {
    return { title: 'Nie znaleziono strony' };
  }

  const pageUrl = `${companyData.url}/obszar-dzialania/${slug}`;

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: {
      canonical: pageUrl,
    },
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
}

/**
 * Strona lokalna — nowy layout (Layout A)
 */
export default async function LocalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getLocalPageBySlug(slug);

  if (!page) {
    notFound();
  }

  const schema = generateLocalPageSchema(page);
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

        {/* 2. PageHeader — panorama hero */}
        <PageHeader
          title={page.pageHeader.title}
          backgroundImage={page.pageHeader.backgroundImage}
        />

        {/* 3. EmotionalHeroSection — headline + CTA box */}
        <EmotionalHeroSection {...page.emotionalHero} />

        {/* 4. Partner logos — scrolling marquee */}
        <PartnerLogosMarquee logos={page.partnerLogos} />

        {/* 5. ServicePillarsSection — 3 karty usług */}
        <ServicePillarsSection
          header={page.servicePillars.header}
          pillars={page.servicePillars.pillars}
        />

        {/* 6. MidPageCTA — złoty/ciemny banner */}
        <MidPageCTA {...page.midCTA} />

        {/* 7. LocalExpertiseSection — obraz + karty specyfiki */}
        <LocalExpertiseSection
          header={page.expertise.header}
          cards={page.expertise.cards}
          image={page.expertise.image}
        />

        {/* 8. Additional Sections (etapy-realizacji, energooszczednosc, formalnosci) */}
        {page.additionalSections?.map((section) =>
          section.id === 'etapy-realizacji' ? (
            <BuildingStagesSection
              key={section.id}
              header={section.header}
              cards={section.cards}
              image={section.image}
            />
          ) : (
            <LocalExpertiseSection
              key={section.id}
              header={section.header}
              cards={section.cards}
              image={section.image ?? page.expertise.image}
            />
          )
        )}

        {/* 9. WhyUsSection — kompaktowy grid 2x2 */}
        <WhyUsSection {...page.whyUs} />

        {/* 10. Districts + Nearby Cities (combined) */}
        <DistrictsSection
          header={page.districts.header}
          items={page.districts.items}
          hubDescription={page.districts.hubDescription}
          nearbyCities={page.nearbyCities}
        />

        {/* 12. FAQTwoColumnsSection */}
        <FAQTwoColumnsSection
          id="faq-section"
          header={page.faq.header}
          items={page.faq.items}
        />

        {/* 13. ContactCTASection */}
        <ContactCTASection
          contactInfo={{
            phone: companyData.telephone,
            email: companyData.email,
          }}
          primaryButton={{ text: 'Umów Konsultację', href: `/umow-konsultacje?miasto=${slug}` }}
        />
      </main>

      {/* Schema.org JSON-LD */}
      <Script
        id={`schema-local-${slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd,
        }}
      />
    </>
  );
}
