import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import {
  getLocalPageBySlug,
  getAllLocalPageSlugs,
  type LocalPageData,
} from '@/data/local-pages';
import { PageHeader } from '@/components/shared';
import {
  LocalPageContentSection,
  ContactCTASection,
  type LocalPageContent,
  type LocalContentBlock,
  type LocalPageSection,
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
 * Convert old ContentBlock format to new format
 */
function convertContentBlock(block: { type: string; value?: string; items?: string[] }): LocalContentBlock {
  if (block.type === 'paragraph') {
    // Convert **bold** markdown to <strong> tags
    const htmlContent = (block.value || '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    return { type: 'paragraph', content: htmlContent };
  }
  if (block.type === 'list') {
    // Convert **bold** in list items
    const htmlItems = (block.items || []).map(item =>
      item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    );
    return { type: 'list', items: htmlItems };
  }
  return { type: 'paragraph', content: '' };
}

/**
 * Convert old ImageTextSection items to LocalPageSection
 */
function convertSection(
  id: string,
  title: string,
  items: Array<{ icon: string; title: string; content: Array<{ type: string; value?: string; items?: string[] }> }>
): LocalPageSection {
  const content: LocalContentBlock[] = [];

  items.forEach((item, index) => {
    // Add H3 heading for each item
    if (index > 0) {
      content.push({ type: 'heading', level: 3, content: item.title });
    } else {
      // First item - just add content without extra heading (section title is H2)
      content.push({ type: 'heading', level: 3, content: item.title });
    }

    // Add content blocks
    item.content.forEach(block => {
      content.push(convertContentBlock(block));
    });
  });

  return { id, title, content };
}

/**
 * Convert old LocalPageData to new LocalPageContent format
 */
function convertToLocalPageContent(page: LocalPageData): LocalPageContent {
  const sections: LocalPageSection[] = [];

  // Intro section from EmotionalHero subtitle
  if (page.emotionalHero.subtitle) {
    const introContent: LocalContentBlock[] = [
      { type: 'paragraph', content: page.emotionalHero.subtitle },
    ];

    // Add benefits as callout
    if (page.emotionalHero.benefits && page.emotionalHero.benefits.length > 0) {
      introContent.push({
        type: 'callout',
        variant: 'tip',
        content: `<strong>Nasze atuty:</strong><br/>${page.emotionalHero.benefits.join('<br/>')}`,
      });
    }

    sections.push({
      id: 'wprowadzenie',
      title: 'Wprowadzenie',
      content: introContent,
    });
  }

  // Building Stages / Offer - as dedicated card section with full content
  const offer = {
    id: 'oferta',
    title: page.buildingStages.header.title,
    description: page.buildingStages.header.description,
    mainHref: '/oferta/kompleksowa-budowa-domow',
    items: page.buildingStages.items.map(item => ({
      icon: item.icon,
      title: item.title,
      content: item.content.map(block => {
        if (block.type === 'paragraph') {
          return {
            type: 'paragraph' as const,
            content: block.value.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
          };
        }
        if (block.type === 'list') {
          return {
            type: 'list' as const,
            items: block.items.map(i => i.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')),
          };
        }
        return block;
      }),
      href: '/oferta/kompleksowa-budowa-domow',
    })),
  };

  // Local Specifics section
  sections.push(
    convertSection(
      'specyfika-lokalna',
      page.localSpecifics.header.title,
      page.localSpecifics.items
    )
  );

  // Energy Efficiency section (optional)
  if (page.energyEfficiency) {
    sections.push(
      convertSection(
        'energooszczednosc',
        page.energyEfficiency.header.title,
        page.energyEfficiency.items
      )
    );
  }

  // Formalities section (optional)
  if (page.formalities) {
    sections.push(
      convertSection(
        'formalnosci',
        page.formalities.header.title,
        page.formalities.items
      )
    );
  }

  // Why Us - as dedicated section with cards
  const whyUs = page.whyUs && page.whyUs.points.length > 0 ? {
    id: 'dlaczego-my',
    title: page.whyUs.header.title,
    description: page.whyUs.header.description,
    points: page.whyUs.points,
  } : undefined;

  // Districts
  const districts = page.districts ? {
    id: 'dzielnice',
    title: page.districts.header.title,
    description: page.districts.header.description,
    items: page.districts.hub.cities.map(city => ({
      label: city.label,
      href: city.url !== '#' ? city.url : undefined,
    })),
  } : undefined;

  // FAQ
  const faq = page.faq && page.faq.items.length > 0 ? {
    id: 'faq',
    title: page.faq.header.title,
    items: page.faq.items.map(item => ({
      question: item.question,
      answer: item.answer.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
    })),
  } : undefined;

  return {
    sections,
    offer,
    districts,
    whyUs,
    faq,
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

  // Convert old data format to new LocalPageContent format
  const content = convertToLocalPageContent(page);

  return (
    <>
      <main>
        {/* Hero - PageHeader (reużywalny) */}
        <PageHeader {...page.pageHeader} />

        {/* Main Content - Blog-style 2-column layout */}
        <LocalPageContentSection
          cityNameLocative={page.cityNameLocative}
          content={content}
        />

        {/* Contact CTA Section */}
        <ContactCTASection
          contactInfo={{
            phone: companyData.telephone,
            email: companyData.email,
          }}
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
