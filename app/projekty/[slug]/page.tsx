import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import {
  getProjectBySlug,
  allProjects,
  buildCalculatorUrl,
  parseSurfaceArea,
  generateProjectSeoTitle,
  generateProjectSeoDescription,
  getCategoryLabel,
} from '@/data/projects';
import { companyData } from '@/data/company-data';
import {
  ProjectGalleryHero,
  ProjectIntroduction,
  ProjectTabs,
  ProjectFloorPlans,
  ProjectModificationCTA,
  RelatedProjectsSection,
} from '@/components/shared';
import { ProjectElevations } from '@/components/shared/ProjectElevations';
import { MirrorModeProvider } from '@/contexts/MirrorModeContext';

// Generate static params for all projects
export async function generateStaticParams() {
  return allProjects.map((project) => ({
    slug: project.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Projekt nie znaleziony',
    };
  }

  const seoTitle = generateProjectSeoTitle(project);
  const seoDescription = generateProjectSeoDescription(project);
  const area = Math.round(parseSurfaceArea(project.surfaceArea));
  const category = getCategoryLabel(project.category);
  const pageUrl = `${companyData.url}/projekty/${slug}`;

  // OpenGraph title — shorter, no CTA (social shares look cleaner without it)
  const ogTitle = `Projekt domu ${project.title} · ${area} m² ${category}`;

  return {
    title: seoTitle,
    description: seoDescription,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: ogTitle,
      description: seoDescription,
      url: pageUrl,
      type: 'article',
      images: [
        {
          url: `/images/projekty/${slug}/main.jpg`,
          width: 1200,
          height: 630,
          alt: `Wizualizacja projektu domu ${project.title} – ${area} m², dom ${category}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: seoDescription,
      images: [`/images/projekty/${slug}/main.jpg`],
    },
  };
}

// Main Project Page Component
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  // Handle 404
  if (!project) {
    notFound();
  }

  // Find similar projects — score by category match, surface area proximity, garage match.
  // Diversify by source so results aren't all from one collection.
  const currentArea = parseSurfaceArea(project.surfaceArea);
  const scored = allProjects
    .filter((p) => p.slug !== project.slug)
    .map((p) => {
      let score = 0;
      // Same category: +3
      if (p.category === project.category) score += 3;
      // Same garage status: +1
      if (!!p.garage === !!project.garage) score += 1;
      // Surface area proximity: +2 for <20%, +1 for <40%
      const pArea = parseSurfaceArea(p.surfaceArea);
      const areaDiff = currentArea > 0 ? Math.abs(pArea - currentArea) / currentArea : 1;
      if (areaDiff < 0.2) score += 2;
      else if (areaDiff < 0.4) score += 1;
      return { p, score, areaDiff };
    })
    .sort((a, b) => b.score - a.score || a.areaDiff - b.areaDiff);

  // Diversify: pick top matches but limit max 4 from same source
  const relatedProjects: typeof scored = [];
  const sourceCounts: Record<string, number> = {};
  const MAX_PER_SOURCE = 4;

  for (const item of scored) {
    if (relatedProjects.length >= 8) break;
    const src = item.p.source ?? 'own';
    const count = sourceCounts[src] ?? 0;
    if (count >= MAX_PER_SOURCE) continue;
    sourceCounts[src] = count + 1;
    relatedProjects.push(item);
  }

  const relatedProjectsMapped = relatedProjects.map(({ p }) => ({
    slug: p.slug,
    title: p.title,
    surfaceArea: p.surfaceArea,
    price: p.price,
    source: p.source,
  }));

  // Schema.org structured data — Product + BreadcrumbList
  const area = Math.round(parseSurfaceArea(project.surfaceArea));
  const category = getCategoryLabel(project.category);
  const pageUrl = `${companyData.url}/projekty/${slug}`;

  const schemaJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      // Product schema — project as a product offering
      {
        '@type': 'Product',
        '@id': `${pageUrl}#product`,
        name: `Projekt domu ${project.title}`,
        description: `Dom ${category}, ${area} m² powierzchni uzytkowej, technologia ${project.technology.toLowerCase()}.${project.description ? ` ${project.description.slice(0, 200)}` : ''}`,
        image: `${companyData.url}/images/projekty/${slug}/main.jpg`,
        url: pageUrl,
        brand: {
          '@type': 'Organization',
          name: 'CoreLTB Builders',
        },
        additionalProperty: [
          { '@type': 'PropertyValue', name: 'Powierzchnia uzytkowa', value: `${area} m²`, unitCode: 'MTK' },
          { '@type': 'PropertyValue', name: 'Kategoria', value: category },
          { '@type': 'PropertyValue', name: 'Technologia', value: project.technology },
          ...(project.roomCount ? [{ '@type': 'PropertyValue', name: 'Liczba pokoi', value: String(project.roomCount) }] : []),
          ...(project.garage ? [{ '@type': 'PropertyValue', name: 'Garaz', value: project.garage }] : []),
        ],
        ...(project.price ? {
          offers: {
            '@type': 'Offer',
            priceCurrency: 'PLN',
            price: project.price.replace(/[^\d]/g, ''),
            description: `Cena projektu architektonicznego: ${project.price}`,
            availability: 'https://schema.org/InStock',
            url: pageUrl,
          },
        } : {}),
      },
      // BreadcrumbList schema
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Strona glowna', item: companyData.url },
          { '@type': 'ListItem', position: 2, name: 'Projekty domow', item: `${companyData.url}/projekty` },
          { '@type': 'ListItem', position: 3, name: project.title, item: pageUrl },
        ],
      },
    ],
  };

  return (
    <main>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd).replace(/</g, '\\u003c') }}
      />

      <MirrorModeProvider hasMirror={project.hasMirror ?? false}>
        {/* Gallery Hero Section */}
        <ProjectGalleryHero
          slug={project.slug}
          alt={project.alt}
          galleryImageCount={project.galleryImageCount}
          source={project.source}
        />

        {/* Introduction Section with Price and CTA */}
        <ProjectIntroduction
          id={project.id}
          surfaceArea={project.surfaceArea}
          estimatedBuildCost={project.estimatedBuildCost}
          title={project.title}
          technology={project.technology}
          price={project.price}
          availability={project.availability}
          hasMirror={project.hasMirror}
          calculatorUrl={buildCalculatorUrl(project)}
        />

        {/* Specifications Tabs (bez zakładki "Koszty") */}
        <ProjectTabs specifications={project.specifications.filter(tab => tab.title !== 'Koszty')} />

        {/* Floor Plans with Modal */}
        <ProjectFloorPlans slug={project.slug} floorPlans={project.floorPlans} />

        {/* Elevations, Cross Section & Site Plan */}
        <ProjectElevations
          slug={project.slug}
          elevationImageCount={project.elevationImageCount}
          hasCrossSection={project.hasCrossSection}
          hasSitePlan={project.hasSitePlan}
          lotWidth={project.lotWidth}
          lotLength={project.lotLength}
          elevationWidth={project.elevationWidth}
        />
      </MirrorModeProvider>

      {/* CTA for Project Modifications */}
      <ProjectModificationCTA />

      {/* Related Projects Section */}
      <RelatedProjectsSection
        currentProjectSlug={project.slug}
        allProjects={relatedProjectsMapped}
      />
    </main>
  );
}
