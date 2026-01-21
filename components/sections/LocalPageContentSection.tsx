'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import { clsx } from 'clsx';
import { Icon, type IconName } from '@/components/ui';
import { LocalPageSidebar, type TOCItem } from '@/components/shared/LocalPageSidebar';

// =============================================================================
// INTERFACES
// =============================================================================

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ContentBlock {
  type: 'paragraph' | 'heading' | 'list' | 'image' | 'quote' | 'callout' | 'faq';
  content?: string;
  items?: string[];
  level?: 2 | 3 | 4;
  src?: string;
  alt?: string;
  caption?: string;
  variant?: 'info' | 'warning' | 'tip';
  faqItems?: FAQItem[];
}

export interface LocalPageSection {
  id: string;
  title: string;
  content: ContentBlock[];
}

export interface District {
  label: string;
  href?: string;
}

export interface DistrictsData {
  id: string;
  title: string;
  description?: string;
  items: District[];
}

export interface FAQData {
  id: string;
  title: string;
  items: FAQItem[];
}

export interface WhyUsPoint {
  icon: IconName;
  title: string;
  description: string;
}

export interface WhyUsData {
  id: string;
  title: string;
  description?: string;
  points: WhyUsPoint[];
}

export interface OfferItem {
  icon: IconName;
  title: string;
  content: ContentBlock[];  // Pełny tekst dla SEO
  href?: string;  // Link do usługi (opcjonalny)
}

export interface OfferData {
  id: string;
  title: string;
  description?: string;
  items: OfferItem[];
  mainHref?: string;  // Główny link do strony oferty
}

export interface LocalPageContent {
  featuredImage?: {
    src: string;
    alt: string;
  };
  metaInfo?: string;
  sections: LocalPageSection[];
  offer?: OfferData;
  districts?: DistrictsData;
  whyUs?: WhyUsData;
  faq?: FAQData;
}

export interface LocalPageContentSectionProps {
  cityNameLocative: string;  // Odmiana miejscownikowa: "Rybniku", "Katowicach"
  content: LocalPageContent;
}

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

function ContentRenderer({ block, index }: { block: ContentBlock; index: number }) {
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
      const headingClasses: Record<2 | 3 | 4, string> = {
        2: 'text-2xl md:text-3xl font-bold text-text-primary mt-12 mb-6',
        3: 'text-xl md:text-2xl font-semibold text-text-primary mt-10 mb-4',
        4: 'text-lg md:text-xl font-semibold text-text-primary mt-8 mb-3',
      };
      const className = headingClasses[level];

      if (level === 2) {
        return <h2 key={index} className={className}>{block.content}</h2>;
      }
      if (level === 3) {
        return <h3 key={index} className={className}>{block.content}</h3>;
      }
      return <h4 key={index} className={className}>{block.content}</h4>;
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
          <p
            className="text-lg italic text-text-primary mb-2"
            dangerouslySetInnerHTML={{ __html: block.content || '' }}
          />
          {block.caption && (
            <cite className="text-sm text-text-muted not-italic">— {block.caption}</cite>
          )}
        </blockquote>
      );

    case 'callout': {
      const calloutStyles: Record<string, string> = {
        info: 'bg-blue-50 border-blue-200 text-blue-800',
        warning: 'bg-amber-50 border-amber-200 text-amber-800',
        tip: 'bg-green-50 border-green-200 text-green-800',
      };
      const calloutIcons: Record<string, IconName> = {
        info: 'info',
        warning: 'alertTriangle',
        tip: 'lightbulb',
      };
      const variant = block.variant || 'info';
      return (
        <div
          key={index}
          className={clsx(
            'my-6 p-4 rounded-xl border flex gap-4',
            calloutStyles[variant]
          )}
        >
          <Icon name={calloutIcons[variant]} size="md" className="flex-shrink-0 mt-0.5" />
          <p dangerouslySetInnerHTML={{ __html: block.content || '' }} />
        </div>
      );
    }

    default:
      return null;
  }
}

function DistrictsSection({ districts }: { districts: DistrictsData }) {
  return (
    <section id={districts.id} className="mt-12 pt-8 border-t border-zinc-200">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-text-primary">
          {districts.title}
        </h2>
        <span className="block w-16 h-1 bg-primary mt-3 rounded-full" />
      </div>
      {districts.description && (
        <p className="text-text-secondary mb-6">{districts.description}</p>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {districts.items.map((district, index) => (
          district.href ? (
            <Link
              key={index}
              href={district.href}
              className="px-4 py-2.5 bg-zinc-50 rounded-lg text-sm text-text-secondary hover:bg-primary/10 hover:text-primary transition-colors text-center"
            >
              {district.label}
            </Link>
          ) : (
            <span
              key={index}
              className="px-4 py-2.5 bg-zinc-50 rounded-lg text-sm text-text-secondary text-center"
            >
              {district.label}
            </span>
          )
        ))}
      </div>
    </section>
  );
}

function OfferSection({ offer }: { offer: OfferData }) {
  return (
    <section id={offer.id} className="mt-12 pt-8 border-t border-zinc-200 scroll-mt-[168px]">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-text-primary">
          {offer.title}
        </h2>
        <span className="block w-16 h-1 bg-primary mt-3 rounded-full" />
        {offer.description && (
          <p className="text-text-secondary mt-4">{offer.description}</p>
        )}
      </div>

      {/* Content - Detailed descriptions for SEO */}
      <div className="space-y-10">
        {offer.items.map((item, index) => (
          <div key={index} className="scroll-mt-[168px]">
            {/* Item Header - Icon + Linked Title */}
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                <Icon name={item.icon} size="md" className="text-white" />
              </div>
              <div>
                {item.href ? (
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-2"
                  >
                    <h3 className="text-xl font-bold text-text-primary group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <Icon
                      name="arrowRight"
                      size="sm"
                      className="text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </Link>
                ) : (
                  <h3 className="text-xl font-bold text-text-primary">
                    {item.title}
                  </h3>
                )}
              </div>
            </div>

            {/* Item Content */}
            <div className="pl-0 md:pl-16">
              {item.content.map((block, blockIndex) => (
                <ContentRenderer key={blockIndex} block={block} index={blockIndex} />
              ))}

              {/* "Szczegóły usługi" link at the end of content */}
              {item.href && (
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline mt-4"
                >
                  <span>Szczegóły usługi</span>
                  <Icon name="arrowRight" size="sm" className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Main CTA Link - At the bottom */}
      {offer.mainHref && (
        <div className="mt-10 pt-8 border-t border-zinc-200 flex justify-center">
          <Link
            href={offer.mainHref}
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20"
          >
            <span>Zobacz pełną ofertę</span>
            <Icon name="arrowRight" size="sm" />
          </Link>
        </div>
      )}
    </section>
  );
}

function WhyUsSection({ whyUs }: { whyUs: WhyUsData }) {
  return (
    <section id={whyUs.id} className="mt-12 pt-8 border-t border-zinc-200 scroll-mt-[168px]">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-text-primary">
          {whyUs.title}
        </h2>
        <span className="block w-16 h-1 bg-primary mt-3 rounded-full" />
        {whyUs.description && (
          <p className="text-text-secondary mt-4">{whyUs.description}</p>
        )}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {whyUs.points.map((point, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 border border-zinc-200 shadow-sm"
          >
            {/* Icon + Title row */}
            <div className="flex items-start gap-4 mb-3">
              <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                <Icon
                  name={point.icon}
                  size="sm"
                  className="text-white"
                />
              </div>
              <h3 className="text-base font-bold text-text-primary pt-2">
                {point.title}
              </h3>
            </div>

            {/* Description */}
            <p className="text-sm text-text-secondary leading-relaxed">
              {point.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function FAQSection({ faq }: { faq: FAQData }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const activeItem = activeIndex !== null ? faq.items[activeIndex] : null;

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Prevent body scroll when bottom sheet is open on mobile
  useEffect(() => {
    if (isMobile && activeIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobile, activeIndex]);

  const closeBottomSheet = () => {
    setActiveIndex(null);
  };

  return (
    <section id={faq.id} className="mt-12 pt-8 border-t border-zinc-200 scroll-mt-[168px]">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-text-primary">
          {faq.title}
        </h2>
        <span className="block w-16 h-1 bg-primary mt-3 rounded-full" />
      </div>

      {/* 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Left Column - Question List */}
        <div className="space-y-3">
          {faq.items.map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={clsx(
                'w-full text-left p-4 rounded-2xl transition-all duration-300',
                'flex items-center gap-3',
                activeIndex === index
                  ? 'bg-primary text-white shadow-lg shadow-primary/30'
                  : 'bg-zinc-50 hover:bg-zinc-100 text-text-primary'
              )}
            >
              {/* Number Badge */}
              <span
                className={clsx(
                  'w-7 h-7 rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0',
                  activeIndex === index
                    ? 'bg-white/20 text-white'
                    : 'bg-primary/10 text-primary'
                )}
              >
                {index + 1}
              </span>
              {/* Question Text */}
              <span className="font-medium text-sm">{item.question}</span>
            </button>
          ))}
        </div>

        {/* Right Column - Answer (Desktop Only) */}
        <div className="hidden lg:block lg:sticky lg:top-[180px] lg:self-start">
          {activeItem && (
            <div className="bg-zinc-50 rounded-2xl p-6">
              {/* Answer Header */}
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="helpCircle" size="md" className="text-primary" />
                </div>
                <div>
                  <span className="text-xs font-bold text-primary uppercase tracking-wider">
                    Pytanie {activeIndex !== null ? activeIndex + 1 : ''}
                  </span>
                  <h3 className="font-bold text-text-primary text-lg mt-0.5">
                    {activeItem.question}
                  </h3>
                </div>
              </div>

              {/* Divider */}
              <div className="w-12 h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full mb-4" />

              {/* Answer Content */}
              <p
                className="text-text-secondary leading-relaxed"
                dangerouslySetInnerHTML={{ __html: activeItem.answer }}
              />
            </div>
          )}

          {/* Placeholder when no selection */}
          {!activeItem && (
            <div className="bg-zinc-50/50 rounded-2xl p-6 border-2 border-dashed border-zinc-300 flex items-center justify-center min-h-[200px]">
              <p className="text-zinc-400 text-center text-sm">
                Wybierz pytanie z listy,<br />aby zobaczyć odpowiedź
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Bottom Sheet */}
      {isMobile && (
        <>
          {/* Overlay */}
          <div
            className={clsx(
              'fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 lg:hidden',
              activeIndex !== null ? 'opacity-100' : 'opacity-0 pointer-events-none'
            )}
            onClick={closeBottomSheet}
          />

          {/* Bottom Sheet */}
          <div
            className={clsx(
              'fixed bottom-0 left-0 right-0 z-[70] bg-white rounded-t-3xl shadow-2xl transition-transform duration-300 ease-out lg:hidden',
              'max-h-[85vh] overflow-hidden flex flex-col',
              activeIndex !== null ? 'translate-y-0' : 'translate-y-full'
            )}
          >
            {/* Handle bar */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1.5 bg-zinc-300 rounded-full" />
            </div>

            {/* Close button */}
            <button
              onClick={closeBottomSheet}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center hover:bg-zinc-200 transition-colors"
            >
              <Icon name="x" size="md" className="text-zinc-600" />
            </button>

            {/* Content */}
            {activeItem && (
              <div className="p-6 overflow-y-auto flex-1">
                {/* Answer Header */}
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon name="helpCircle" size="md" className="text-primary" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-primary uppercase tracking-wider">
                      Pytanie {activeIndex !== null ? activeIndex + 1 : ''}
                    </span>
                    <h3 className="font-bold text-text-primary text-lg mt-0.5">
                      {activeItem.question}
                    </h3>
                  </div>
                </div>

                {/* Divider */}
                <div className="w-12 h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full mb-4" />

                {/* Answer Content */}
                <p
                  className="text-text-secondary leading-relaxed pb-6"
                  dangerouslySetInnerHTML={{ __html: activeItem.answer }}
                />
              </div>
            )}
          </div>
        </>
      )}
    </section>
  );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function LocalPageContentSection({
  cityNameLocative,
  content,
}: LocalPageContentSectionProps) {
  const { ref, inView } = useInView({
    threshold: 0.05,
    triggerOnce: true,
  });

  // Build TOC items from sections + offer + districts + whyUs + faq (memoized to prevent useEffect re-runs)
  const tocItems: TOCItem[] = useMemo(() => [
    ...content.sections.map(s => ({ id: s.id, title: s.title })),
    ...(content.offer ? [{ id: content.offer.id, title: content.offer.title }] : []),
    ...(content.districts ? [{ id: content.districts.id, title: content.districts.title }] : []),
    ...(content.whyUs ? [{ id: content.whyUs.id, title: content.whyUs.title }] : []),
    ...(content.faq ? [{ id: content.faq.id, title: content.faq.title }] : []),
  ], [content.sections, content.offer, content.districts, content.whyUs, content.faq]);

  // Active section tracking
  const [activeSection, setActiveSection] = useState<string>(tocItems[0]?.id || '');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Header offset (sticky header ~150px + gap)
    const HEADER_OFFSET = 168;

    // Cleanup previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Create new observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Find the section that is most visible in viewport
        const visibleSections = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => {
            // Prefer sections closer to top of viewport
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

    // Observe all sections
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
    <section
      ref={ref}
      className="py-8 md:py-12"
      style={{ backgroundColor: '#efebe7' }}
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Main Content Grid - 2 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
          {/* Article Content */}
          <article
            className={clsx(
              'bg-white rounded-3xl border border-zinc-200/60 overflow-hidden',
              inView ? 'animate-fade-in-up' : 'opacity-0'
            )}
            style={{ animationDelay: '0.2s' }}
          >
            {/* Article Body */}
            <div className="p-6 md:p-10">
              {/* Content Sections */}
              {content.sections.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-[168px]">
                  <div className="mt-12 mb-6 first:mt-0">
                    <h2 className="text-2xl md:text-3xl font-bold text-text-primary">
                      {section.title}
                    </h2>
                    <span className="block w-16 h-1 bg-primary mt-3 rounded-full" />
                  </div>
                  {section.content.map((block, index) => (
                    <ContentRenderer key={index} block={block} index={index} />
                  ))}
                </section>
              ))}

              {/* Offer Section */}
              {content.offer && (
                <OfferSection offer={content.offer} />
              )}

              {/* Districts Section */}
              {content.districts && (
                <DistrictsSection districts={content.districts} />
              )}

              {/* Why Us Section */}
              {content.whyUs && (
                <WhyUsSection whyUs={content.whyUs} />
              )}

              {/* FAQ Section */}
              {content.faq && (
                <FAQSection faq={content.faq} />
              )}
            </div>
          </article>

          {/* Sidebar */}
          <LocalPageSidebar
            sections={tocItems}
            cityNameLocative={cityNameLocative}
            activeSection={activeSection}
            inView={inView}
          />
        </div>
      </div>
    </section>
  );
}
