import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getProjectBySlug, allProjects } from '@/data/projects';
import {
  ProjectGalleryHero,
  ProjectIntroduction,
  ProjectTabs,
  ProjectFloorPlans,
  ProjectOptimalPrice,
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

  return {
    title: `${project.title} - ${project.id} | CoreLTB Builders`,
    description: `${project.title}. Powierzchnia: ${project.surfaceArea}.${project.estimatedBuildCost ? ` Szacunkowy koszt: ${project.estimatedBuildCost}.` : ''} Technologia: ${project.technology}.`,
    openGraph: {
      title: project.title,
      description: `Projekt ${project.id} - ${project.surfaceArea}`,
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

  // Prepare related projects data
  const relatedProjects = allProjects.map((p) => ({
    slug: p.slug,
    title: p.title,
    surfaceArea: p.surfaceArea,
    price: p.price,
  }));

  return (
    <main>
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

      {/* Optimal Price Display — only if cost data available */}
      {project.costCalculation && project.costCalculation.items.length > 0 && (
      <ProjectOptimalPrice
        title={project.costCalculation.title}
        stageName="Stan surowy zamknięty"
        price={project.costCalculation.items.find(item => item.name === 'Stan surowy zamknięty')?.prices.min || 'N/A'}
      />
      )}

      {/* CTA for Project Modifications */}
      <ProjectModificationCTA />

      {/* Related Projects Section */}
      <RelatedProjectsSection
        currentProjectSlug={project.slug}
        allProjects={relatedProjects}
      />
    </main>
  );
}
