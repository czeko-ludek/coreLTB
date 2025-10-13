'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui';
import { SectionHeader, SectionHeaderProps, CompanyStatBox, CompanyStatBoxProps } from '@/components/shared';

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
    <section ref={sectionRef} style={{ backgroundColor: '#ffffff' }} className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left: Image with Stats Overlay */}
          <div className={`relative w-full aspect-square rounded-xl overflow-hidden lg:max-w-[590px] mx-auto lg:mx-0 shadow-2xl ring-1 ring-black/5 ${isVisible ? 'animate-curtain-reveal' : ''}`}>
            {/* Background Image */}
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
            />

            {/* Subtle gradient overlay for better box visibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

            {/* Stats Box Overlay - positioned at bottom with spacing */}
            <div className="absolute bottom-6 left-6 right-6 z-10">
              <CompanyStatBox {...stats} />
            </div>
          </div>

          {/* Right: Content */}
          <div className="space-y-6">
            <div className={isVisible ? 'animate-fade-in-up' : 'opacity-0'} style={{ animationDelay: '0.2s' }}>
              <SectionHeader {...header} align="left" theme="light" />
            </div>

            <div className="space-y-4">
              {content.map((paragraph, index) => (
                <p
                  key={index}
                  className={`text-body-md text-text-secondary leading-relaxed ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                  style={{ animationDelay: `${0.4 + index * 0.15}s` }}
                >
                  {paragraph}
                </p>
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

