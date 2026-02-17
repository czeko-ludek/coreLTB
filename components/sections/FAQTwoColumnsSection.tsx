'use client';

import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { clsx } from 'clsx';
import { Icon } from '@/components/ui';
import { SectionHeader, SectionHeaderProps } from '@/components/shared';

// =============================================================================
// TYPES
// =============================================================================

type ContentBlock =
  | { type: 'paragraph'; value: string }
  | { type: 'list'; items: string[] };

export interface FAQItem {
  question: string;
  content: ContentBlock[];
}

export interface FAQTwoColumnsSectionProps {
  id?: string;
  header: SectionHeaderProps;
  items: FAQItem[];
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function FAQTwoColumnsSection({
  id,
  header,
  items,
}: FAQTwoColumnsSectionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: '50px 0px',
  });

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

  // Handle question click
  const handleQuestionClick = (index: number) => {
    if (isMobile) {
      setActiveIndex(index);
    } else {
      setActiveIndex(index);
    }
  };

  // Close bottom sheet
  const closeBottomSheet = () => {
    setActiveIndex(null);
  };

  // Render content block (paragraph or list)
  const renderContentBlock = (block: ContentBlock, index: number) => {
    if (block.type === 'paragraph') {
      return (
        <p
          key={index}
          className="mb-4 last:mb-0 text-base leading-relaxed text-gray-600"
          dangerouslySetInnerHTML={{
            __html: block.value.replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900">$1</strong>'),
          }}
        />
      );
    }

    if (block.type === 'list') {
      return (
        <ul key={index} className="mb-4 last:mb-0 space-y-3">
          {block.items.map((item, itemIndex) => (
            <li key={itemIndex} className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                <Icon name="check" size="sm" className="text-primary" />
              </span>
              <span
                className="text-base text-gray-600"
                dangerouslySetInnerHTML={{
                  __html: item.replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900">$1</strong>'),
                }}
              />
            </li>
          ))}
        </ul>
      );
    }

    return null;
  };

  const activeItem = activeIndex !== null ? items[activeIndex] : null;

  return (
    <section
      id={id || 'faq-section'}
      ref={ref}
      className="py-16 lg:py-24 scroll-mt-24 bg-background-beige"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div
          className={clsx(
            'mb-12 lg:mb-16',
            inView ? 'animate-fade-in-up' : 'opacity-0'
          )}
          style={{ animationDelay: '0.1s' }}
        >
          <SectionHeader {...header} align="center" theme="light" />
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Question List */}
          <div className="space-y-3">
            {items.map((item, index) => (
              <button
                key={index}
                onClick={() => handleQuestionClick(index)}
                className={clsx(
                  'w-full text-left p-5 rounded-2xl transition-all duration-300',
                  'flex items-center gap-4',
                  inView ? 'animate-fade-in-up' : 'opacity-0',
                  activeIndex === index
                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                    : 'bg-white hover:bg-zinc-50 text-text-primary shadow-sm'
                )}
                style={{ animationDelay: `${0.2 + index * 0.08}s` }}
              >
                {/* Number Badge */}
                <span
                  className={clsx(
                    'w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0',
                    activeIndex === index
                      ? 'bg-white/20 text-white'
                      : 'bg-primary/10 text-primary'
                  )}
                >
                  {index + 1}
                </span>
                {/* Question Text */}
                <span className="font-medium text-base">{item.question}</span>
              </button>
            ))}
          </div>

          {/* Right Column - Answer (Desktop Only - Sticky) */}
          <div className="hidden lg:block lg:sticky lg:top-32 lg:self-start">
            {activeItem && (
              <div
                className={clsx(
                  'bg-white rounded-3xl p-6 md:p-8 lg:p-10 shadow-lg',
                  inView ? 'animate-fade-in-up' : 'opacity-0'
                )}
                style={{ animationDelay: '0.3s' }}
              >
                {/* Answer Header */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon name="helpCircle" size="lg" className="text-primary" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-primary uppercase tracking-wider">
                      Pytanie {activeIndex !== null ? activeIndex + 1 : ''}
                    </span>
                    <h3 className="font-bold text-text-primary text-xl mt-1">
                      {activeItem.question}
                    </h3>
                  </div>
                </div>

                {/* Divider */}
                <div className="w-16 h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full mb-6" />

                {/* Answer Content */}
                <div className="text-gray-600">
                  {activeItem.content.map((block, idx) =>
                    renderContentBlock(block, idx)
                  )}
                </div>
              </div>
            )}

            {/* Placeholder when no selection on desktop */}
            {!activeItem && (
              <div className="bg-white/50 rounded-3xl p-10 border-2 border-dashed border-zinc-300 flex items-center justify-center min-h-[300px]">
                <p className="text-zinc-400 text-center">
                  Wybierz pytanie z listy,<br />aby zobaczyć odpowiedź
                </p>
              </div>
            )}
          </div>
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
                <div className="flex items-start gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon name="helpCircle" size="md" className="text-primary" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-primary uppercase tracking-wider">
                      Pytanie {activeIndex !== null ? activeIndex + 1 : ''}
                    </span>
                    <h3 className="font-bold text-text-primary text-lg mt-1">
                      {activeItem.question}
                    </h3>
                  </div>
                </div>

                {/* Divider */}
                <div className="w-12 h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full mb-5" />

                {/* Answer Content */}
                <div className="text-gray-600 pb-6">
                  {activeItem.content.map((block, idx) =>
                    renderContentBlock(block, idx)
                  )}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </section>
  );
}
