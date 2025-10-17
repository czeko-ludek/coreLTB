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
    description: `${project.title}. Powierzchnia: ${project.surfaceArea}. Szacunkowy koszt: ${project.estimatedBuildCost}. Technologia: ${project.technology}.`,
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
      {/* Gallery Hero Section */}
      <ProjectGalleryHero
        slug={project.slug}
        alt={project.alt}
        galleryImageCount={project.galleryImageCount}
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
      />

      {/* Specifications Tabs */}
      <ProjectTabs specifications={project.specifications} />

      {/* Floor Plans with Modal */}
      <ProjectFloorPlans slug={project.slug} floorPlans={project.floorPlans} />

      {/* Optimal Price Display */}
      <ProjectOptimalPrice
        title={project.costCalculation.title}
        stageName="Stan surowy zamknięty"
        price={project.costCalculation.items.find(item => item.name === 'Stan surowy zamknięty')?.prices.min || 'N/A'}
      />

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
