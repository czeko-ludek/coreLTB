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

  return (
    <main>
      <BlogPostContent post={post} relatedPosts={relatedPosts} />
    </main>
  );
}
