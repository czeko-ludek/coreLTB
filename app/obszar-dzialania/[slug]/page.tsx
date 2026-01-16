import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import {
  getLocalPageBySlug,
  getAllLocalPageSlugs
} from '@/data/local-pages';
import { PageHeader, TableOfContents, TOCSection } from '@/components/shared';
import { SectionLabel } from '@/components/ui';
import {
  AreasSection,
  BusinessResponsibilitySection,
  ServicesAccordionSection,
  PricingSection,
  SimpleImageTextSection,
  ContactCTASection
} from '@/components/sections';
import { generateLocalPageSchema, sanitizeJsonLd } from '@/lib/schema';
import { companyData } from '@/data/company-data';

/**
 * Generate static params for SSG
 */
export async function generateStaticParams() {
  const slugs = getAllLocalPageSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
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
    return {
      title: 'Nie znaleziono strony',
    };
  }

  const pageUrl = `${companyData.url}/obszar-dzialania/${slug}`;

  return {
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
}

/**
 * Strona lokalna - dynamiczna dla każdego miasta
 */
export default async function LocalPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const page = getLocalPageBySlug(slug);

  if (!page) {
    notFound();
  }

  // Generate Schema.org
  const schema = generateLocalPageSchema(page);
  const jsonLd = sanitizeJsonLd(schema);

  // Build Table of Contents sections
  const tocSections: TOCSection[] = [
    { id: 'intro', label: 'Wprowadzenie', icon: 'info' },
    { id: 'building-stages', label: 'Etapy Realizacji', icon: 'building' },
    { id: 'local-specifics', label: 'Specyfika Lokalna', icon: 'mapPin' },
  ];

  // Add optional sections
  if (page.pricing) {
    tocSections.push({ id: 'pricing', label: 'Cennik', icon: 'coins' });
  }
  if (page.energyEfficiency) {
    tocSections.push({ id: 'energy-efficiency', label: 'Energooszczędność', icon: 'leaf' });
  }
  if (page.formalities) {
    tocSections.push({ id: 'formalities', label: 'Formalności', icon: 'fileText' });
  }

  // Add remaining sections
  tocSections.push(
    { id: 'districts', label: 'Gdzie Budujemy', icon: 'map' },
    { id: 'why-us', label: 'Dlaczego My', icon: 'award' },
    { id: 'faq', label: 'Pytania i Odpowiedzi', icon: 'helpCircle' }
  );

  return (
    <>
      <main>
        {/* Hero - PageHeader (reużywalny) */}
        <PageHeader {...page.pageHeader} />

        {/* Intro Section */}
        <section id="intro" className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-[96rem] px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <SectionLabel>{page.intro.label}</SectionLabel>
              <div className="space-y-4 mt-6">
                {page.intro.paragraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-base md:text-lg text-text-secondary leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: paragraph.replace(
                        /\*\*(.*?)\*\*/g,
                        '<strong class="font-bold text-text-primary">$1</strong>'
                      ),
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Wrapper Container for TOC + All Sections */}
        <div className="relative mt-5">
          <div className="mx-auto max-w-[96rem]">
            <div className="flex gap-4">
              {/* Table of Contents - Left Side (sticky) */}
              <TableOfContents sections={tocSections} />

              {/* Main Content - Right Side */}
              <div className="flex-1 space-y-5">
            {/* Building Stages - SimpleImageTextSection */}
            <SimpleImageTextSection
              id="building-stages"
              header={page.buildingStages.header}
              items={page.buildingStages.items}
              imageSrc={page.buildingStages.imageSrc}
              imageAlt={page.buildingStages.imageAlt}
            />

            {/* Local Specifics - SimpleImageTextSection */}
            <SimpleImageTextSection
              id="local-specifics"
              header={page.localSpecifics.header}
              items={page.localSpecifics.items}
              imageSrc={page.localSpecifics.imageSrc}
              imageAlt={page.localSpecifics.imageAlt}
            />

            {/* Pricing Section (optional) */}
            {page.pricing && (
              <PricingSection
                id="pricing"
                header={page.pricing.header}
                rows={page.pricing.rows}
                disclaimer={page.pricing.disclaimer}
              />
            )}

            {/* Energy Efficiency - SimpleImageTextSection (optional) */}
            {page.energyEfficiency && (
              <SimpleImageTextSection
                id="energy-efficiency"
                header={page.energyEfficiency.header}
                items={page.energyEfficiency.items}
                imageSrc={page.energyEfficiency.imageSrc}
                imageAlt={page.energyEfficiency.imageAlt}
              />
            )}

            {/* Formalities - SimpleImageTextSection (optional) */}
            {page.formalities && (
              <SimpleImageTextSection
                id="formalities"
                header={page.formalities.header}
                items={page.formalities.items}
                imageSrc={page.formalities.imageSrc}
                imageAlt={page.formalities.imageAlt}
              />
            )}

            {/* Districts Section - AreasSection style (1 hub only) */}
            <AreasSection
              id="districts"
              header={page.districts.header}
              hubs={[page.districts.hub]}
            />

            {/* Why Us Section - reusing BusinessResponsibilitySection */}
            <BusinessResponsibilitySection
              id="why-us"
              header={page.whyUs.header}
              cards={[...page.whyUs.points]}
            />

            {/* FAQ Section - reusing ServicesAccordionSection */}
            <ServicesAccordionSection
              id="faq"
              header={page.faq.header}
              services={page.faq.items.map(item => ({
                title: item.question,
                content: [
                  { type: 'paragraph', value: item.answer }
                ]
              }))}
            />

            {/* Contact CTA Section - Formularz kontaktowy */}
            <ContactCTASection
              header={{
                label: "SKONTAKTUJ SIĘ Z NAMI",
                title: `Budowa domów ${page.cityName} - Umów bezpłatną konsultację`,
                description: "Zadzwoń lub wypełnij formularz, a my skontaktujemy się z Tobą w ciągu 24 godzin.",
              }}
              contactInfo={{
                phone: companyData.telephone,
                email: companyData.email,
                address: `${companyData.address.streetAddress}, ${companyData.address.postalCode} ${companyData.address.addressLocality}`,
              }}
            />
              </div>
            </div>
          </div>
        </div>
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
