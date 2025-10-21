import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getServiceBySlug, allServices } from '@/data/services';
import { allProjects } from '@/data/projects';
import { PageHeader } from '@/components/shared';
import { FloatingCTA } from '@/components/ui';
import {
  ServiceHeroSection,
  IconicFeaturesSection,
  FlexibilitySection,
  ProcessTimelineSection,
  ServiceAreaSection,
  ProofSection,
  ContentSection,
  RealizationsGallery,
} from '@/components/sections';
import { RelatedProjectsSection } from '@/components/shared';

// Generate static params for all services
export async function generateStaticParams() {
  return allServices.map((service) => ({
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
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: 'Usługa nie znaleziona',
    };
  }

  return {
    title: service.metaTitle || `${service.title} | CoreLTB Builders`,
    description:
      service.metaDescription ||
      `${service.description}. ${service.subtitle}`,
    openGraph: {
      title: service.title,
      description: service.subtitle,
      images: [service.heroImage],
    },
  };
}

// Main Service Page Component
export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  // Handle 404
  if (!service) {
    notFound();
  }

  // Use all projects for ServiceProjectsSection

  return (
    <main>
      {/* Floating CTA - sticky button */}
      <FloatingCTA text={service.cta.buttonText} href={service.cta.buttonLink} />

      {/* Page Header with breadcrumbs and hero image */}
      <PageHeader
        title={service.title}
        watermarkText={service.category.toUpperCase()}
        backgroundImage={service.heroImage}
        breadcrumbs={[
          { label: 'Strona główna', href: '/' },
          { label: 'Oferta', href: '/oferta' },
          { label: service.category, href: '' },
        ]}
      />

      {/* Hero Section - title, subtitle, description */}
      <ServiceHeroSection
        title={service.title}
        subtitle={service.subtitle}
        description={service.description}
      />

      {/* Iconic Features - 4 main benefits */}
      <IconicFeaturesSection features={service.features} />

      {/* Flexibility Section - start cooperation at any stage */}
      <FlexibilitySection
        title={service.flexibilityOptions.title}
        options={service.flexibilityOptions.options}
      />

      {/* Process Timeline - steps of cooperation */}
      <ProcessTimelineSection steps={service.processSteps} />

      {/* Sprawdzone Projekty Section - reuses RelatedProjectsSection */}
      <RelatedProjectsSection
        currentProjectSlug="" // Nie wykluczamy żadnego projektu
        allProjects={allProjects.map((p) => ({
          slug: p.slug,
          title: p.title,
          surfaceArea: p.surfaceArea,
          price: p.price,
        }))}
      />

      {/* Proof/Trust Section - statistics */}
      <ProofSection proofItems={service.proofItems} />

      {/* Content Sections - flexible text blocks */}
      {service.contentSections.length > 0 && (
        <ContentSection
          contentBlocks={service.contentSections}
          variant="white"
        />
      )}

      {/* Realizations Gallery - photos from construction sites */}
      {service.realizations.length > 0 && (
        <RealizationsGallery realizations={service.realizations} />
      )}

      {/* Service Area - map of provinces (at the bottom) */}
      <ServiceAreaSection
        provinces={service.serviceArea.provinces}
        description={service.serviceArea.description}
      />
    </main>
  );
}
