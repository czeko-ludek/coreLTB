import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getServiceV2BySlug, allServicesV2 } from '@/data/servicesV2';
import { PageHeader, Breadcrumbs } from '@/components/shared';
import {
  EmotionalHeroSection,
  PhilosophyTimelineSection,
  FAQTwoColumnsSection,
  AreasSection,
  TestimonialsSection,
  CooperationTimelineSectionNoLine,
  ContactCTASection,
} from '@/components/sections'; // ✅ Centralized import
import { FloatingCTA } from '@/components/ui'; // ✅ Centralized import

// Generate static params for all services
export async function generateStaticParams() {
  return allServicesV2.map((service) => ({
    slug: service.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceV2BySlug(slug);

  if (!service) {
    return {
      title: 'Usługa nie znaleziona',
    };
  }

  return {
    title: service.metaTitle || `${service.title} | CoreLTB Builders`,
    description: service.metaDescription || service.emotionalHero.subtitle,
    openGraph: {
      title: service.title,
      description: service.emotionalHero.subtitle,
      images: [service.pageHeader.backgroundImage],
    },
  };
}

// Main Service Page Component V2
export default async function ServicePageV2({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceV2BySlug(slug);

  // Handle 404
  if (!service) {
    notFound();
  }

  // Breadcrumbs items (współdzielone między desktop i mobile)
  const breadcrumbItems = service.pageHeader.breadcrumbs.map((crumb, index, arr) => ({
    label: crumb.label,
    href: index < arr.length - 1 ? crumb.href : undefined,
  }));

  return (
    <main>
      {/* Breadcrumbs — nad hero */}
      <Breadcrumbs
        items={breadcrumbItems}
        className="container mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2"
      />

      {/* PageHeader z hero image — mobile + desktop */}
      <PageHeader
        title={service.pageHeader.title}
        watermarkText={service.pageHeader.watermarkText}
        backgroundImage={service.pageHeader.backgroundImage}
      />

      {/* Sekcja 1: CTA box pierwszy na mobile, tekst drugi */}
      <EmotionalHeroSection {...service.emotionalHero} />

      {/* Sekcja 2: Nasza Filozofia */}
      <PhilosophyTimelineSection {...service.philosophyTimeline} />

      {/* Sekcja 3: Etapy Współpracy (Timeline) - USUNIĘTE (brzydki timeline z linią) */}
      {/* {service.cooperationTimeline && (
        <CooperationTimelineSection {...service.cooperationTimeline} />
      )} */}

      {/* Sekcja 3 (alternatywna): Timeline bez linii (dla Projektowanie) */}
      {service.cooperationTimelineNoLine && (
        <CooperationTimelineSectionNoLine {...service.cooperationTimelineNoLine} />
      )}

      {/* Sekcja 4: Logistyka i Zasięg (opcjonalna) - ZARAZ PO ARTYKULE */}
      {service.areasData && (
        <AreasSection {...service.areasData} />
      )}

      {/* Sekcja 5: FAQ - Najczęściej zadawane pytania (2-kolumnowy layout) */}
      {service.servicesAccordion && (
        <FAQTwoColumnsSection
          header={service.servicesAccordion.header}
          items={service.servicesAccordion.services.map((s) => ({
            question: s.title,
            content: s.content,
          }))}
        />
      )}

      {/* Sekcja 6: Opinie Klientów */}
      <TestimonialsSection {...service.testimonials} />

      {/* Sekcja 7: Wezwanie do Działania (Kontakt) */}
      <ContactCTASection {...service.contactCTA} />

      {/* Sticky FloatingCTA - pojawia się gdy użytkownik scrolluje poniżej EmotionalHeroSection */}
      <FloatingCTA
        text="Umów bezpłatną konsultację"
        href="/umow-konsultacje"
        hideWhenSectionVisible="emotional-hero"
      />
    </main>
  );
}
