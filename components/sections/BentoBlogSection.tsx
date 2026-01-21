'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import { clsx } from 'clsx';
import { Icon, IconName } from '@/components/ui';

// =============================================================================
// INTERFACES
// =============================================================================

export interface BlogCategory {
  id: string;
  label: string;
}

export interface BlogAuthor {
  name: string;
  role?: string;
  avatar?: string;
}

export interface FeaturedPost {
  type: 'featured';
  image: { src: string; alt: string };
  category: string;
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  author: BlogAuthor;
  href: string;
}

export interface TallPost {
  type: 'tall';
  image: { src: string; alt: string };
  category: string;
  location?: string;
  title: string;
  excerpt: string;
  href: string;
}

export interface StandardPost {
  type: 'standard';
  icon: IconName;
  iconColor: 'primary' | 'blue' | 'green';
  date: string;
  title: string;
  excerpt: string;
  href: string;
}

export interface RecommendedPost {
  type: 'recommended';
  image: { src: string; alt: string };
  category: string;
  date: string;
  title: string;
  href: string;
}

export interface ImagePost {
  type: 'image';
  image: { src: string; alt: string };
  category: string;
  date: string;
  title: string;
  excerpt: string;
  href: string;
}

export interface QuoteBlock {
  type: 'quote';
  quote: string;
  author: BlogAuthor;
}

export interface WidePost {
  type: 'wide';
  image: { src: string; alt: string };
  category: string;
  title: string;
  excerpt: string;
  href: string;
}

export interface NewsletterBlock {
  type: 'newsletter';
  title: string;
  description: string;
}

export type BlogGridItem = FeaturedPost | TallPost | StandardPost | QuoteBlock | WidePost | NewsletterBlock | RecommendedPost | ImagePost;

export interface Breadcrumb {
  label: string;
  href?: string;
}

// Uniwersalny typ posta do filtrowania
export interface BlogPost {
  id: string;
  image: { src: string; alt: string };
  category: string;
  categoryId: string;
  date: string;
  dateTimestamp: number; // timestamp do sortowania
  readTime?: string;
  title: string;
  excerpt: string;
  author?: BlogAuthor;
  href: string;
}

export interface BentoBlogSectionProps {
  breadcrumbs?: Breadcrumb[];
  title: string;
  titleHighlight?: string;
  description: string;
  categories: BlogCategory[];
  posts: BlogPost[]; // wszystkie posty
  loadMoreLabel?: string;
}

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

function FeaturedPostCard({ post, inView, delay }: { post: FeaturedPost; inView: boolean; delay: number }) {
  return (
    <Link
      href={post.href}
      className={clsx(
        'group relative col-span-1 md:col-span-2 row-span-2 bg-white rounded-2xl border border-zinc-200/60 overflow-hidden hover:shadow-lg hover:shadow-zinc-200/50 transition-all duration-500 flex flex-col',
        inView ? 'animate-fade-in-up' : 'opacity-0'
      )}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="h-64 sm:h-80 overflow-hidden relative">
        <Image
          src={post.image.src}
          alt={post.image.alt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1.5 bg-primary rounded-full text-xs font-semibold text-white uppercase tracking-wider shadow-sm">
            {post.category}
          </span>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow justify-between">
        <div>
          <div className="flex items-center gap-2 text-text-muted text-xs mb-3 font-medium">
            <Icon name="calendar" size="sm" />
            <span>{post.date}</span>
            <span className="w-1 h-1 rounded-full bg-zinc-300"></span>
            <span>{post.readTime}</span>
          </div>
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-text-primary mb-3 group-hover:text-primary transition-colors">
            {post.title}
          </h2>
          <p className="text-text-secondary text-sm leading-relaxed line-clamp-2">
            {post.excerpt}
          </p>
        </div>
        <div className="mt-6 pt-6 border-t border-zinc-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {post.author.avatar ? (
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={32}
                height={32}
                className="rounded-full ring-2 ring-white"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name="users" size="sm" className="text-primary" />
              </div>
            )}
            <span className="text-xs font-medium text-text-secondary">{post.author.name}</span>
          </div>
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-zinc-200 text-text-muted group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all duration-300">
            <Icon name="arrowRight" size="sm" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function TallPostCard({ post, inView, delay }: { post: TallPost; inView: boolean; delay: number }) {
  return (
    <article
      className={clsx(
        'group relative col-span-1 row-span-2 bg-[#1a1a1a] rounded-2xl border border-zinc-800 overflow-hidden flex flex-col',
        inView ? 'animate-fade-in-up' : 'opacity-0'
      )}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="h-1/2 overflow-hidden relative">
        <Image
          src={post.image.src}
          alt={post.image.alt}
          fill
          className="object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent"></div>
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-zinc-800/80 backdrop-blur-sm border border-zinc-700 rounded-full text-xs font-semibold text-zinc-200 uppercase tracking-wider">
            {post.category}
          </span>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow justify-end">
        {post.location && (
          <div className="flex items-center gap-2 text-zinc-400 text-xs mb-3 font-medium">
            <Icon name="mapPin" size="sm" />
            <span>{post.location}</span>
          </div>
        )}
        <h3 className="text-lg md:text-xl font-semibold tracking-tight text-white mb-3">
          {post.title}
        </h3>
        <p className="text-zinc-400 text-sm leading-relaxed mb-6 line-clamp-3">
          {post.excerpt}
        </p>
        <Link
          href={post.href}
          className="inline-flex items-center gap-2 text-sm text-white font-medium hover:gap-3 transition-all"
        >
          Zobacz szczegóły
          <Icon name="arrowRight" size="sm" />
        </Link>
      </div>
    </article>
  );
}

function StandardPostCard({ post, inView, delay }: { post: StandardPost; inView: boolean; delay: number }) {
  const iconBgColors = {
    primary: 'bg-primary/10 text-primary',
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
  };

  return (
    <article
      className={clsx(
        'group bg-white col-span-1 rounded-2xl border border-zinc-200/60 p-6 flex flex-col justify-between hover:border-primary/30 hover:shadow-md transition-all',
        inView ? 'animate-fade-in-up' : 'opacity-0'
      )}
      style={{ animationDelay: `${delay}s` }}
    >
      <div>
        <div className="flex justify-between items-start mb-4">
          <div className={clsx('w-10 h-10 rounded-lg flex items-center justify-center', iconBgColors[post.iconColor])}>
            <Icon name={post.icon} size="md" />
          </div>
          <span className="text-xs font-medium text-text-muted">{post.date}</span>
        </div>
        <h3 className="text-lg font-semibold tracking-tight text-text-primary mb-2 group-hover:text-primary transition-colors">
          {post.title}
        </h3>
        <p className="text-sm text-text-secondary leading-relaxed">
          {post.excerpt}
        </p>
      </div>
    </article>
  );
}

function QuoteBlockCard({ block, inView, delay }: { block: QuoteBlock; inView: boolean; delay: number }) {
  return (
    <div
      className={clsx(
        'col-span-1 md:col-span-2 lg:col-span-1 bg-[#efebe7] rounded-2xl border border-zinc-200/60 p-6 flex flex-col justify-center items-center text-center relative overflow-hidden',
        inView ? 'animate-fade-in-up' : 'opacity-0'
      )}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="absolute top-0 right-0 p-4 opacity-5">
        <Icon name="quote" className="w-24 h-24" />
      </div>
      <p className="text-lg font-medium text-text-primary italic relative z-10">
        &ldquo;{block.quote}&rdquo;
      </p>
      <div className="mt-4 flex flex-col items-center">
        <span className="text-xs font-bold text-text-primary uppercase tracking-widest">{block.author.name}</span>
        {block.author.role && (
          <span className="text-xs text-text-secondary">{block.author.role}</span>
        )}
      </div>
    </div>
  );
}

function WidePostCard({ post, inView, delay }: { post: WidePost; inView: boolean; delay: number }) {
  return (
    <article
      className={clsx(
        'group col-span-1 md:col-span-2 bg-white rounded-2xl border border-zinc-200/60 overflow-hidden hover:shadow-md transition-shadow flex flex-col sm:flex-row',
        inView ? 'animate-fade-in-up' : 'opacity-0'
      )}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="p-6 sm:w-1/2 flex flex-col justify-center">
        <span className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">{post.category}</span>
        <h3 className="text-xl font-semibold tracking-tight text-text-primary mb-3">
          {post.title}
        </h3>
        <p className="text-sm text-text-secondary mb-6">
          {post.excerpt}
        </p>
        <Link
          href={post.href}
          className="text-sm font-medium text-text-primary underline decoration-zinc-300 underline-offset-4 hover:decoration-primary transition-all"
        >
          Czytaj dalej
        </Link>
      </div>
      <div className="sm:w-1/2 h-48 sm:h-auto relative overflow-hidden">
        <Image
          src={post.image.src}
          alt={post.image.alt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
    </article>
  );
}

function NewsletterBlockCard({ block, inView, delay }: { block: NewsletterBlock; inView: boolean; delay: number }) {
  return (
    <div
      className={clsx(
        'col-span-1 bg-[#1a1a1a] rounded-2xl p-6 flex flex-col justify-center relative overflow-hidden',
        inView ? 'animate-fade-in-up' : 'opacity-0'
      )}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="absolute -right-4 -top-4 text-zinc-800">
        <Icon name="mail" className="w-24 h-24" />
      </div>
      <h3 className="text-white font-semibold text-lg relative z-10 mb-2">{block.title}</h3>
      <p className="text-zinc-400 text-xs mb-4 relative z-10">{block.description}</p>
      <form className="relative z-10 space-y-2">
        <input
          type="email"
          placeholder="Twój email"
          className="w-full bg-zinc-800 border border-zinc-700 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-zinc-600"
        />
        <button
          type="button"
          className="w-full bg-primary text-white text-sm font-medium rounded-lg px-3 py-2 hover:bg-primary-dark transition-colors"
        >
          Zapisz się
        </button>
      </form>
    </div>
  );
}

function RecommendedPostCard({ post, inView, delay }: { post: RecommendedPost; inView: boolean; delay: number }) {
  return (
    <Link
      href={post.href}
      className={clsx(
        'group flex gap-4 bg-white rounded-xl p-3 border border-zinc-200/60 hover:border-primary/30 hover:shadow-md transition-all',
        inView ? 'animate-fade-in-up' : 'opacity-0'
      )}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden relative">
        <Image
          src={post.image.src}
          alt={post.image.alt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="flex flex-col justify-center min-w-0">
        <span className="inline-block w-fit px-2 py-0.5 bg-primary rounded text-[10px] font-semibold text-white uppercase tracking-wider mb-1.5">{post.category}</span>
        <h3 className="text-sm font-semibold text-text-primary line-clamp-2 group-hover:text-primary transition-colors">
          {post.title}
        </h3>
        <span className="text-xs text-text-muted mt-1">{post.date}</span>
      </div>
    </Link>
  );
}

// Karta dla głównego (featured) posta - używa BlogPost
function MainPostCard({ post, inView, delay }: { post: BlogPost; inView: boolean; delay: number }) {
  return (
    <Link
      href={post.href}
      className={clsx(
        'group relative bg-white rounded-2xl border border-zinc-200/60 overflow-hidden hover:shadow-lg hover:shadow-zinc-200/50 transition-all duration-500 flex flex-col h-full',
        inView ? 'animate-fade-in-up' : 'opacity-0'
      )}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="h-64 sm:h-80 overflow-hidden relative">
        <Image
          src={post.image.src}
          alt={post.image.alt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1.5 bg-primary rounded-full text-xs font-semibold text-white uppercase tracking-wider shadow-sm">
            {post.category}
          </span>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow justify-between">
        <div>
          <div className="flex items-center gap-2 text-text-muted text-xs mb-3 font-medium">
            <Icon name="calendar" size="sm" />
            <span>{post.date}</span>
            {post.readTime && (
              <>
                <span className="w-1 h-1 rounded-full bg-zinc-300"></span>
                <span>{post.readTime}</span>
              </>
            )}
          </div>
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-text-primary mb-3 group-hover:text-primary transition-colors">
            {post.title}
          </h2>
          <p className="text-text-secondary text-sm leading-relaxed line-clamp-2">
            {post.excerpt}
          </p>
        </div>
        <div className="mt-6 pt-6 border-t border-zinc-100 flex items-center justify-between">
          {post.author ? (
            <div className="flex items-center gap-2">
              {post.author.avatar ? (
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  width={32}
                  height={32}
                  className="rounded-full ring-2 ring-white"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon name="users" size="sm" className="text-primary" />
                </div>
              )}
              <span className="text-xs font-medium text-text-secondary">{post.author.name}</span>
            </div>
          ) : (
            <div />
          )}
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-zinc-200 text-text-muted group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all duration-300">
            <Icon name="arrowRight" size="sm" />
          </span>
        </div>
      </div>
    </Link>
  );
}

// Karta dla polecanych postów - używa BlogPost
function SmallPostCard({ post, inView, delay }: { post: BlogPost; inView: boolean; delay: number }) {
  return (
    <Link
      href={post.href}
      className={clsx(
        'group flex gap-4 bg-white rounded-xl p-3 border border-zinc-200/60 hover:border-primary/30 hover:shadow-md transition-all',
        inView ? 'animate-fade-in-up' : 'opacity-0'
      )}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden relative">
        <Image
          src={post.image.src}
          alt={post.image.alt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="flex flex-col justify-center min-w-0">
        <span className="inline-block w-fit px-2 py-0.5 bg-primary rounded text-[10px] font-semibold text-white uppercase tracking-wider mb-1.5">{post.category}</span>
        <h3 className="text-sm font-semibold text-text-primary line-clamp-2 group-hover:text-primary transition-colors">
          {post.title}
        </h3>
        <span className="text-xs text-text-muted mt-1">{post.date}</span>
      </div>
    </Link>
  );
}

// Karta dla dolnych postów - używa BlogPost
function GridPostCard({ post, inView, delay }: { post: BlogPost; inView: boolean; delay: number }) {
  return (
    <Link
      href={post.href}
      className={clsx(
        'group bg-white rounded-2xl border border-zinc-200/60 overflow-hidden hover:shadow-lg hover:shadow-zinc-200/50 transition-all duration-500 block',
        inView ? 'animate-fade-in-up' : 'opacity-0'
      )}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="aspect-[4/3] overflow-hidden relative">
        <Image
          src={post.image.src}
          alt={post.image.alt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1.5 bg-primary rounded-full text-xs font-semibold text-white uppercase tracking-wider shadow-sm">
            {post.category}
          </span>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 text-text-muted text-xs mb-2">
          <Icon name="calendar" size="sm" />
          <span>{post.date}</span>
        </div>
        <h3 className="text-lg font-semibold tracking-tight text-text-primary mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-sm text-text-secondary leading-relaxed line-clamp-2 mb-4">
          {post.excerpt}
        </p>
        <span className="inline-flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all">
          Czytaj więcej
          <Icon name="arrowRight" size="sm" />
        </span>
      </div>
    </Link>
  );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function BentoBlogSection({
  breadcrumbs,
  title,
  titleHighlight,
  description,
  categories,
  posts,
  loadMoreLabel = 'Załaduj więcej wpisów',
}: BentoBlogSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const { ref, inView } = useInView({
    threshold: 0.05,
    triggerOnce: true,
    rootMargin: '50px 0px',
  });

  // Filtrowanie i sortowanie postów
  const filteredPosts = React.useMemo(() => {
    const filtered = activeCategory === 'all'
      ? [...posts]
      : posts.filter(post => post.categoryId === activeCategory);

    // Sortuj po dacie (najnowsze najpierw)
    return filtered.sort((a, b) => b.dateTimestamp - a.dateTimestamp);
  }, [posts, activeCategory]);

  // Rozdzielenie postów na sekcje
  const { mainPost, bottomPosts, recommendedPosts } = React.useMemo(() => {
    if (filteredPosts.length === 0) {
      return { mainPost: null, bottomPosts: [], recommendedPosts: [] };
    }

    // Najnowszy post = główny (featured)
    const main = filteredPosts[0];

    // Następne 3 najnowsze = dolne kafelki
    const bottom = filteredPosts.slice(1, 4);

    // Reszta = polecane (starsze posty)
    const recommended = filteredPosts.slice(4);

    return { mainPost: main, bottomPosts: bottom, recommendedPosts: recommended };
  }, [filteredPosts]);

  return (
    <section ref={ref} className="pt-6 pb-16 md:pt-8 md:pb-24" style={{ backgroundColor: '#efebe7' }}>
      <div className="container mx-auto px-4 md:px-6">

        {/* Header */}
        <div
          className={clsx('max-w-3xl mb-8', inView ? 'animate-fade-in-up' : 'opacity-0')}
          style={{ animationDelay: '0.1s' }}
        >
          {/* Breadcrumbs */}
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav aria-label="Breadcrumb" className="mb-4">
              <ol className="flex items-center gap-2 text-sm">
                {breadcrumbs.map((crumb, index) => (
                  <li key={index} className="flex items-center gap-2">
                    {index > 0 && (
                      <Icon name="chevronRight" size="sm" className="text-text-muted" />
                    )}
                    {crumb.href ? (
                      <Link
                        href={crumb.href}
                        className="text-text-muted hover:text-primary transition-colors"
                      >
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className="text-text-primary font-medium">{crumb.label}</span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          )}

          {/* Title - H1 */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary mb-4">
            {title}
            {titleHighlight && (
              <>
                <br />
                <span className="text-primary">{titleHighlight}</span>
              </>
            )}
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
            {description}
          </p>
        </div>

        {/* Category Filters - rozciągnięte na pełną szerokość */}
        <div
          className={clsx(
            'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-8',
            inView ? 'animate-fade-in-up' : 'opacity-0'
          )}
          style={{ animationDelay: '0.2s' }}
        >
          <button
            onClick={() => setActiveCategory('all')}
            className={clsx(
              'px-4 py-3 rounded-lg text-sm font-semibold uppercase tracking-wide transition-all duration-300 text-center',
              activeCategory === 'all'
                ? 'bg-primary text-white shadow-md hover:bg-primary-dark'
                : 'bg-white text-text-primary border-2 border-zinc-200 hover:border-primary hover:text-primary'
            )}
          >
            Wszystkie
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={clsx(
                'px-4 py-3 rounded-lg text-sm font-semibold uppercase tracking-wide transition-all duration-300 text-center',
                activeCategory === cat.id
                  ? 'bg-primary text-white shadow-md hover:bg-primary-dark'
                  : 'bg-white text-text-primary border-2 border-zinc-200 hover:border-primary hover:text-primary'
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Brak postów */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <Icon name="fileText" size="xl" className="text-text-muted mx-auto mb-4" />
            <p className="text-text-secondary text-lg">Brak wpisów w tej kategorii.</p>
          </div>
        )}

        {/* Main Bento Grid - Featured + Recommended */}
        {mainPost && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Left: Featured Post (sticky on desktop) */}
            <div className="lg:col-span-2">
              <div className="lg:sticky lg:top-24">
                <MainPostCard post={mainPost} inView={inView} delay={0.3} />
              </div>
            </div>

            {/* Right: Recommended Posts */}
            <div className="lg:col-span-1">
              {recommendedPosts.length > 0 && (
                <div
                  className={clsx(
                    'bg-white rounded-2xl border border-zinc-200/60 p-5 h-full',
                    inView ? 'animate-fade-in-up' : 'opacity-0'
                  )}
                  style={{ animationDelay: '0.35s' }}
                >
                  {/* Polecane Header */}
                  <h2 className="text-lg font-bold text-text-primary uppercase tracking-wide mb-4">Polecane</h2>

                  {/* Recommended Posts List */}
                  <div className="space-y-3 max-h-[500px] overflow-y-auto scrollbar-hide">
                    {recommendedPosts.map((post, index) => (
                      <SmallPostCard
                        key={post.id}
                        post={post}
                        inView={inView}
                        delay={0.4 + index * 0.05}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Bottom: Image Posts Grid */}
        {bottomPosts.length > 0 && (
          <div
            className={clsx(
              'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
              inView ? 'animate-fade-in-up' : 'opacity-0'
            )}
            style={{ animationDelay: '0.6s' }}
          >
            {bottomPosts.map((post, index) => (
              <GridPostCard
                key={post.id}
                post={post}
                inView={inView}
                delay={0.65 + index * 0.1}
              />
            ))}
          </div>
        )}

        {/* Load More Button */}
        {filteredPosts.length > 0 && (
          <div
            className={clsx('mt-12 flex justify-center', inView ? 'animate-fade-in-up' : 'opacity-0')}
            style={{ animationDelay: '0.9s' }}
          >
            <button className="group flex items-center gap-2 px-6 py-3 rounded-full border border-zinc-200 bg-white text-text-secondary hover:border-primary hover:text-text-primary transition-all text-sm font-medium">
              <Icon name="chevronDown" size="sm" className="group-hover:translate-y-1 transition-transform duration-300" />
              {loadMoreLabel}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
