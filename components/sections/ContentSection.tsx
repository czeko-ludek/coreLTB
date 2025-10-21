import React from 'react';

export interface ContentBlock {
  title: string;
  content: string;
}

export interface ContentSectionProps {
  contentBlocks: ContentBlock[];
  /**
   * Wariant tła sekcji
   * @default 'white'
   */
  variant?: 'white' | 'beige';
}

/**
 * ContentSection - Organizm
 *
 * Elastyczna sekcja do wyświetlania bloków treści tekstowej.
 * Może być używana wielokrotnie na stronie z różnymi wariantami tła.
 *
 * Cechy:
 * - Wspiera warianty tła (białe / beżowe)
 * - Wspiera formatowanie wieloliniowe (whitespace-pre-line)
 * - Responsywne paddingi
 * - Czytelna typografia
 */
export function ContentSection({
  contentBlocks,
  variant = 'white',
}: ContentSectionProps) {
  const bgClass = variant === 'beige' ? 'bg-background' : 'bg-white';

  return (
    <section className={`${bgClass} py-16 md:py-24`}>
      <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-5xl">
        <div className="space-y-12 md:space-y-16">
          {contentBlocks.map((block, index) => (
            <div key={index} className="space-y-4">
              {/* Title */}
              <h3 className="text-2xl md:text-3xl font-bold text-text-primary">
                {block.title}
              </h3>

              {/* Content */}
              <div className="text-base md:text-lg text-text-secondary leading-relaxed whitespace-pre-line">
                {block.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
