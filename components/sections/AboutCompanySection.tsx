'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui';
import { SectionHeader, SectionHeaderProps, CompanyStatBox, CompanyStatBoxProps } from '@/components/shared';
import { formatBold } from '@/lib/utils';

export interface AboutCompanySectionProps {
  header: SectionHeaderProps;
  content: string[];
  stats: CompanyStatBoxProps;
  ctaButton: { text: string; href: string };
  image: { src: string; alt: string };
}

export function AboutCompanySection({
  header,
  content,
  stats,
  ctaButton,
  image,
}: AboutCompanySectionProps) {
  const [isVisible, setIsVisible] = React.useState(false);
  const sectionRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // Check if IntersectionObserver is available (client-side only)
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-surface-light">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left: Image + Stats */}
          <div className="lg:max-w-[590px] mx-auto lg:mx-0">
            <div className={`relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/5 bg-zinc-900 animate-curtain-reveal ${isVisible ? 'curtain-animate' : ''}`}>
              {/* Logo */}
              <Image
                src="/images/logo-white.webp"
                alt="CoreLTB Builders — Budowa Domów"
                fill
                className="object-contain p-12 md:p-20"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                fetchPriority="high"
              />
            </div>

            {/* Stats pod obrazem — wyrównane do szerokości obrazu */}
            <div className="mt-4">
              <CompanyStatBox {...stats} />
            </div>
          </div>

          {/* Right: Content */}
          <div className="space-y-6">
            <div className={isVisible ? 'animate-fade-in-up' : 'opacity-0'} style={{ animationDelay: '0.2s' }}>
              <SectionHeader {...header} align="left" theme="light" />
            </div>

            <div className="space-y-4 about-content">
              {content.map((paragraph, index) => (
                <p
                  key={index}
                  className={`text-body-md text-text-secondary leading-relaxed ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                  style={{ animationDelay: `${0.4 + index * 0.15}s` }}
                  dangerouslySetInnerHTML={{
                    __html: formatBold(paragraph, 'font-bold text-text'),
                  }}
                />
              ))}
            </div>

            <div className={`pt-4 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.8s' }}>
              <Button variant="outline" size="md" href={ctaButton.href}>
                {ctaButton.text}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

