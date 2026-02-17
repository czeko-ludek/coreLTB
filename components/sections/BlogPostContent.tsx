'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import { clsx } from 'clsx';
import { Icon } from '@/components/ui';
import { LocalPageSidebar, type TOCItem } from '@/components/shared';
import type { BlogPost, BlogAuthor } from './BentoBlogSection';

// =============================================================================
// INTERFACES
// =============================================================================

export interface BlogContentBlock {
  type: 'paragraph' | 'heading' | 'image' | 'list' | 'quote' | 'callout' | 'faq';
  content?: string;
  items?: string[];
  src?: string;
  alt?: string;
  caption?: string;
  level?: 2 | 3 | 4;
  variant?: 'info' | 'warning' | 'tip';
  // FAQ specific
  faqItems?: FAQItem[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BlogPostData extends BlogPost {
  content: BlogContentBlock[];
  tags?: string[];
}

export interface RelatedPost {
  id: string;
  image: { src: string; alt: string };
  category: string;
  date: string;
  title: string;
  href: string;
}

export interface BlogPostContentProps {
  post: BlogPostData;
  relatedPosts?: RelatedPost[];
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

function PostMeta({ post }: { post: BlogPostData }) {
  return (
    <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted mb-6">
      <span className="inline-flex items-center gap-1.5">
        <Icon name="calendar" size="sm" />
        {post.date}
      </span>
      {post.readTime && (
        <span className="inline-flex items-center gap-1.5">
          <Icon name="clock" size="sm" />
          {post.readTime}
        </span>
      )}
      <Link
        href={`/blog?category=${post.categoryId}`}
        className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary rounded-full font-medium hover:bg-primary/20 transition-colors"
      >
        {post.category}
      </Link>
    </div>
  );
}

function FAQAccordionItem({ question, answer, isOpen, onToggle }: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-[0_0_20px_rgba(0,0,0,0.08)] transition-all hover:shadow-[0_0_25px_rgba(0,0,0,0.12)]">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between p-4 md:p-5 text-left transition-colors hover:bg-gray-50/50"
        aria-expanded={isOpen}
      >
        <span className={`text-base font-semibold sm:text-lg pr-3 transition-colors ${
          isOpen ? 'text-primary' : 'text-text-primary'
        }`}>
          {question}
        </span>
        <Icon
          name="chevronDown"
          size="md"
          className={`shrink-0 text-primary transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-gray-100 px-4 md:px-5 py-4">
            <p
              className="text-text-secondary leading-relaxed"
              dangerouslySetInnerHTML={{ __html: answer }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function FAQSection({ items, sectionIndex }: { items: FAQItem[]; sectionIndex: number }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4 my-8">
      {items.map((item, index) => (
        <FAQAccordionItem
          key={index}
          question={item.question}
          answer={item.answer}
          isOpen={openIndex === index}
          onToggle={() => setOpenIndex(openIndex === index ? null : index)}
        />
      ))}
    </div>
  );
}

function AuthorBox({ author }: { author: BlogAuthor }) {
  return (
    <div className="flex items-center gap-4 p-6 bg-white rounded-2xl border border-zinc-200/60">
      {author.avatar ? (
        <Image
          src={author.avatar}
          alt={author.name}
          width={64}
          height={64}
          className="rounded-full ring-2 ring-primary/20"
        />
      ) : (
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <Icon name="users" size="lg" className="text-primary" />
        </div>
      )}
      <div>
        <p className="font-semibold text-text-primary">{author.name}</p>
        {author.role && (
          <p className="text-sm text-text-muted">{author.role}</p>
        )}
      </div>
    </div>
  );
}

function ContentRenderer({ block, index }: { block: BlogContentBlock; index: number }) {
  switch (block.type) {
    case 'paragraph':
      return (
        <p
          key={index}
          className="text-text-secondary leading-relaxed mb-6"
          dangerouslySetInnerHTML={{ __html: block.content || '' }}
        />
      );

    case 'heading': {
      const level = block.level || 2;
      const headingClasses = {
        2: 'text-2xl md:text-3xl font-bold text-text-primary mt-12 mb-6',
        3: 'text-xl md:text-2xl font-semibold text-text-primary mt-10 mb-4',
        4: 'text-lg md:text-xl font-semibold text-text-primary mt-8 mb-3',
      };
      const className = headingClasses[level];
      const id = generateSlug(block.content || '');

      if (level === 2) {
        return <h2 key={index} id={id} className={clsx(className, 'scroll-mt-[168px]')}>{block.content}</h2>;
      }
      if (level === 3) {
        return <h3 key={index} id={id} className={clsx(className, 'scroll-mt-[168px]')}>{block.content}</h3>;
      }
      return <h4 key={index} id={id} className={clsx(className, 'scroll-mt-[168px]')}>{block.content}</h4>;
    }

    case 'image':
      return (
        <figure key={index} className="my-8">
          <div className="relative aspect-[16/9] rounded-xl overflow-hidden">
            <Image
              src={block.src || ''}
              alt={block.alt || ''}
              fill
              className="object-cover"
            />
          </div>
          {block.caption && (
            <figcaption className="mt-3 text-sm text-text-muted text-center italic">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    case 'list':
      return (
        <ul key={index} className="space-y-3 mb-6 ml-6">
          {block.items?.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-text-secondary">
              <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span dangerouslySetInnerHTML={{ __html: item }} />
            </li>
          ))}
        </ul>
      );

    case 'quote':
      return (
        <blockquote
          key={index}
          className="my-8 pl-6 border-l-4 border-primary bg-primary/5 py-4 pr-6 rounded-r-xl"
        >
          <p className="text-lg italic text-text-primary mb-2">
            &ldquo;{block.content}&rdquo;
          </p>
          {block.caption && (
            <cite className="text-sm text-text-muted not-italic">— {block.caption}</cite>
          )}
        </blockquote>
      );

    case 'callout':
      const calloutStyles = {
        info: 'bg-blue-50 border-blue-200 text-blue-800',
        warning: 'bg-amber-50 border-amber-200 text-amber-800',
        tip: 'bg-green-50 border-green-200 text-green-800',
      };
      const calloutIcons = {
        info: 'info' as const,
        warning: 'alertTriangle' as const,
        tip: 'lightbulb' as const,
      };
      return (
        <div
          key={index}
          className={clsx(
            'my-6 p-4 rounded-xl border flex gap-4',
            calloutStyles[block.variant || 'info']
          )}
        >
          <Icon name={calloutIcons[block.variant || 'info']} size="md" className="flex-shrink-0 mt-0.5" />
          <p dangerouslySetInnerHTML={{ __html: block.content || '' }} />
        </div>
      );

    case 'faq':
      if (!block.faqItems || block.faqItems.length === 0) return null;
      return <FAQSection key={index} items={block.faqItems} sectionIndex={index} />;

    default:
      return null;
  }
}

function RelatedPostCard({ post }: { post: RelatedPost }) {
  return (
    <Link
      href={post.href}
      className="group bg-white rounded-2xl border border-zinc-200/60 overflow-hidden hover:shadow-lg transition-all duration-300 block"
    >
      <div className="aspect-[16/9] overflow-hidden relative">
        <Image
          src={post.image.src}
          alt={post.image.alt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1.5 bg-primary rounded-full text-xs font-semibold text-white uppercase tracking-wider">
            {post.category}
          </span>
        </div>
      </div>
      <div className="p-5">
        <span className="text-xs text-text-muted mb-2 block">{post.date}</span>
        <h3 className="font-semibold text-text-primary group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h3>
      </div>
    </Link>
  );
}

function ShareButtons() {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-text-muted">Udostępnij:</span>
      <button
        className="w-10 h-10 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-text-muted hover:bg-primary hover:border-primary hover:text-white transition-all"
        aria-label="Udostępnij na Facebook"
      >
        <Icon name="facebook" size="sm" />
      </button>
      <button
        className="w-10 h-10 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-text-muted hover:bg-primary hover:border-primary hover:text-white transition-all"
        aria-label="Udostępnij na LinkedIn"
      >
        <Icon name="linkedin" size="sm" />
      </button>
      <button
        className="w-10 h-10 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-text-muted hover:bg-primary hover:border-primary hover:text-white transition-all"
        aria-label="Skopiuj link"
      >
        <Icon name="link" size="sm" />
      </button>
    </div>
  );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function BlogPostContent({ post, relatedPosts }: BlogPostContentProps) {
  const { ref, inView } = useInView({
    threshold: 0.05,
    triggerOnce: true,
  });

  // Build TOC items from H2 headings only (not H3)
  const tocItems = useMemo<TOCItem[]>(() => {
    return post.content
      .filter(block => block.type === 'heading' && block.level === 2)
      .map(block => ({
        id: generateSlug(block.content || ''),
        title: block.content || '',
        level: 2,
      }));
  }, [post.content]);

  // Active section tracking
  const [activeSection, setActiveSection] = useState<string>(tocItems[0]?.id || '');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const HEADER_OFFSET = 168;

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => {
            const aTop = a.boundingClientRect.top;
            const bTop = b.boundingClientRect.top;
            return Math.abs(aTop - HEADER_OFFSET) - Math.abs(bTop - HEADER_OFFSET);
          });

        if (visibleSections.length > 0) {
          const topSection = visibleSections[0];
          setActiveSection(topSection.target.id);
        }
      },
      {
        rootMargin: `-${HEADER_OFFSET}px 0px -50% 0px`,
        threshold: [0, 0.1, 0.5],
      }
    );

    tocItems.forEach(item => {
      const element = document.getElementById(item.id);
      if (element && observerRef.current) {
        observerRef.current.observe(element);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [tocItems]);

  return (
    <article ref={ref} className="py-8 md:py-12 bg-background-beige">
      <div className="container mx-auto px-4 md:px-6">

        {/* Breadcrumbs */}
        <nav
          aria-label="Breadcrumb"
          className={clsx(
            'mb-6',
            inView ? 'animate-fade-in-up' : 'opacity-0'
          )}
          style={{ animationDelay: '0.1s' }}
        >
          <ol className="flex items-center gap-2 text-sm">
            <li className="flex items-center gap-2">
              <Link href="/" className="text-text-muted hover:text-primary transition-colors">
                Strona główna
              </Link>
            </li>
            <Icon name="chevronRight" size="sm" className="text-text-muted" />
            <li className="flex items-center gap-2">
              <Link href="/blog" className="text-text-muted hover:text-primary transition-colors">
                Blog
              </Link>
            </li>
            <Icon name="chevronRight" size="sm" className="text-text-muted" />
            <li>
              <span className="text-text-primary font-medium line-clamp-1">{post.title}</span>
            </li>
          </ol>
        </nav>

        {/* Main Content Grid - 2 kolumny */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">

          {/* Article Content */}
          <div
            className={clsx(
              'bg-white rounded-3xl border border-zinc-200/60 overflow-hidden',
              inView ? 'animate-fade-in-up' : 'opacity-0'
            )}
            style={{ animationDelay: '0.2s' }}
          >
            {/* Featured Image */}
            <div className="aspect-[2/1] relative">
              <Image
                src={post.image.src}
                alt={post.image.alt}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            {/* Article Body */}
            <div className="p-6 md:p-10">
              {/* Meta */}
              <PostMeta post={post} />

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-8 leading-tight">
                {post.title}
              </h1>

              {/* Content */}
              <div className="prose prose-lg max-w-none">
                {post.content.map((block, index) => (
                  <ContentRenderer key={index} block={block} index={index} />
                ))}
              </div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-10 pt-6 border-t border-zinc-200">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm text-text-muted">Tagi:</span>
                    {post.tags.map((tag, index) => (
                      <Link
                        key={index}
                        href={`/blog?tag=${tag.toLowerCase().replace(/\s+/g, '-')}`}
                        className="px-3 py-1 bg-zinc-100 text-text-secondary text-sm rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Share & Author */}
              <div className="mt-8 pt-6 border-t border-zinc-200 space-y-6">
                <ShareButtons />
                {post.author && <AuthorBox author={post.author} />}
              </div>
            </div>
          </div>

          {/* Sidebar - Only TOC, no CTA */}
          {tocItems.length > 0 && (
            <LocalPageSidebar
              sections={tocItems}
              activeSection={activeSection}
              inView={inView}
              showCTA={false}
            />
          )}
        </div>

        {/* Related Posts */}
        {relatedPosts && relatedPosts.length > 0 && (
          <section
            className={clsx(
              'mt-12',
              inView ? 'animate-fade-in-up' : 'opacity-0'
            )}
            style={{ animationDelay: '0.5s' }}
          >
            <h2 className="text-2xl font-bold text-text-primary mb-6">Podobne artykuły</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.slice(0, 3).map((relatedPost) => (
                <RelatedPostCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
