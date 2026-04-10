import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { getRealizationBySlug, getAllRealizationSlugs } from '@/data/realizacje';
import { companyData } from '@/data/company-data';
import { Breadcrumbs } from '@/components/shared';
import { ContactCTASection, FAQTwoColumnsSection } from '@/components/sections';
import { RealizationArticle } from '@/components/sections/realizacje/RealizationArticle';
import { RealizationContent } from '@/components/sections/realizacje/RealizationContent';

// ─── Static Params ───────────────────────────────────────────

export async function generateStaticParams() {
  return getAllRealizationSlugs().map((slug) => ({ slug }));
}

// ─── Metadata ────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = getRealizationBySlug(slug);

  if (!data) return { title: 'Nie znaleziono realizacji' };

  const pageUrl = `${companyData.url}/realizacje/${slug}`;

  return {
    title: data.meta.title,
    description: data.meta.description,
    alternates: { canonical: pageUrl },
    openGraph: {
      title: data.meta.title,
      description: data.meta.description,
      url: pageUrl,
      type: 'article',
      images: [{ url: data.project.heroImage, width: 1200, height: 630 }],
    },
  };
}

// ─── Schema.org ──────────────────────────────────────────────

function generateSchema(data: NonNullable<ReturnType<typeof getRealizationBySlug>>) {
  const images = data.stages.flatMap((s) => s.images.map((img) => `${companyData.url}${img.src}`));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const schema: any[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: data.project.title,
      description: data.meta.description,
      image: images.slice(0, 5),
      author: {
        '@type': 'Organization',
        name: companyData.name,
        url: companyData.url,
      },
      publisher: {
        '@type': 'Organization',
        name: companyData.name,
        logo: { '@type': 'ImageObject', url: `${companyData.url}/images/logo.webp` },
      },
      mainEntityOfPage: `${companyData.url}/realizacje/${data.slug}`,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ImageGallery',
      name: `Dziennik budowy: ${data.project.title}`,
      description: data.meta.description,
      image: images,
      about: { '@type': 'Place', name: data.project.location },
    },
  ];

  if (data.faq && data.faq.items.length > 0) {
    schema.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: data.faq.items.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.content
            .map((block) =>
              block.type === 'paragraph' ? block.value : block.items.join(', ')
            )
            .join(' '),
        },
      })),
    });
  }

  return schema;
}

// ─── Page Component ──────────────────────────────────────────

export default async function RealizationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = getRealizationBySlug(slug);

  if (!data) notFound();

  const schemas = generateSchema(data);

  const breadcrumbs = [
    { label: 'Strona glowna', href: '/' },
    { label: 'Realizacje', href: '/realizacje' },
    { label: data.project.title },
  ];

  return (
    <>
      {/* Schema.org */}
      {schemas.map((schema, i) => (
        <Script
          key={i}
          id={`schema-realizacja-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* Blog-style article layout */}
      <article className="py-8 md:py-12 bg-background-beige">
        <div className="container mx-auto px-4 md:px-6">
          {/* Breadcrumbs */}
          <Breadcrumbs items={breadcrumbs} className="mb-6" />

          {/* Main content grid — blog layout with TOC sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4 lg:gap-8">

            {/* TOC — mobile: collapsible at top, desktop: sticky sidebar (right col) */}
            <div className="order-first lg:order-last">
              <RealizationContent data={data} />
            </div>

            {/* Article content (left column) — client component with shared lightbox */}
            <div className="bg-white rounded-3xl border border-zinc-200/60 overflow-hidden order-last lg:order-first">
              <RealizationArticle data={data} />
            </div>
          </div>
        </div>
      </article>

      {/* FAQ */}
      {data.faq && data.faq.items.length > 0 && (
        <div className="bg-background-beige">
          <div className="mx-auto max-w-[1400px]">
            <FAQTwoColumnsSection
              id="faq-realizacja"
              header={data.faq.header}
              items={data.faq.items}
            />
          </div>
        </div>
      )}

      {/* Contact CTA */}
      <ContactCTASection
        contactInfo={{
          phone: companyData.telephone,
          email: companyData.email,
        }}
      />
    </>
  );
}
