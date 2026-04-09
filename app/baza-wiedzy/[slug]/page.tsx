import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getBlogPostDataBySlug,
  getAllBlogSlugs,
  getRelatedPosts,
  toRelatedPost,
} from '@/data/blog-data';
import { BlogPostContent } from '@/components/sections';
import { companyData } from '@/data/company-data';
import type { FAQItem } from '@/components/sections/BlogPostContent';

/**
 * Generate static params for SSG
 */
export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
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
  const post = getBlogPostDataBySlug(slug);

  if (!post) {
    return {
      title: 'Nie znaleziono artykułu | Baza Wiedzy CoreLTB Builders',
    };
  }

  const pageUrl = `${companyData.url}/baza-wiedzy/${slug}`;

  return {
    title: `${post.title} | Baza Wiedzy CoreLTB Builders`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: pageUrl,
      type: 'article',
      publishedTime: new Date(post.dateTimestamp).toISOString(),
      authors: post.author ? [post.author.name] : undefined,
      images: [
        {
          url: post.image.src,
          width: 1200,
          height: 630,
          alt: post.image.alt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.image.src],
    },
  };
}

/**
 * Strona pojedynczego wpisu z Bazy Wiedzy
 */
export default async function BazaWiedzyPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostDataBySlug(slug);

  if (!post) {
    notFound();
  }

  // Pobierz powiązane posty
  const relatedPosts = getRelatedPosts(slug, 3).map(toRelatedPost);

  // Wyciągnij FAQ items z content blocks (dla FAQ Schema)
  const faqItems: FAQItem[] = post.content
    .filter((block) => block.type === 'faq' && block.faqItems)
    .flatMap((block) => block.faqItems!);

  // Article Schema JSON-LD
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: `${companyData.url}${post.image.src}`,
    datePublished: new Date(post.dateTimestamp).toISOString(),
    author: {
      '@type': 'Organization',
      name: 'CoreLTB Builders',
      url: companyData.url,
    },
    publisher: {
      '@type': 'Organization',
      name: 'CoreLTB Builders',
      url: companyData.url,
      logo: {
        '@type': 'ImageObject',
        url: `${companyData.url}/logo.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${companyData.url}/baza-wiedzy/${slug}`,
    },
  };

  // FAQ Schema JSON-LD (tylko jeśli artykuł ma FAQ)
  const faqSchema = faqItems.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer.replace(/<[^>]*>/g, ''), // strip HTML tags
      },
    })),
  } : null;

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <BlogPostContent post={post} relatedPosts={relatedPosts} />
    </main>
  );
}
