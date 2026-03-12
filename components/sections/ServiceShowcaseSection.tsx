'use client';

import React from 'react';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { SectionHeader, SectionHeaderProps } from '@/components/shared';
import { Button, Icon, IconName } from '@/components/ui';

export interface ServiceShowcaseItem {
  iconName: IconName;
  title: string;
  description: string;
  image: string;
  href: string;
}

export interface ServiceShowcaseSectionProps {
  header: SectionHeaderProps;
  services: ServiceShowcaseItem[];
}

export function ServiceShowcaseSection({ header, services }: ServiceShowcaseSectionProps) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [animationPhase, setAnimationPhase] = React.useState<'idle' | 'exit' | 'enter'>('idle');

  // Scroll-triggered animation
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const handleServiceClick = (index: number) => {
    if (index === activeIndex || isAnimating) return;

    setIsAnimating(true);

    // Phase 1: Exit animation (scale down + fade)
    setAnimationPhase('exit');

    // Phase 2: Change content after exit completes
    setTimeout(() => {
      setActiveIndex(index);
      setAnimationPhase('enter');
    }, 250); // Duration of exit animation

    // Phase 3: Enter animation completes, reset to idle
    setTimeout(() => {
      setAnimationPhase('idle');
      setIsAnimating(false);
    }, 600); // Exit (250ms) + Enter (350ms)
  };

  const safeIndex = Math.min(activeIndex, services.length - 1);
  const activeService = services[safeIndex];

  return (
    <section ref={ref} className="py-24 bg-background-beige">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <div className={inView ? 'animate-fade-in-up' : 'opacity-0'} style={{ animationDelay: '0.2s' }}>
            <SectionHeader {...header} align="left" theme="light" />
          </div>
        </div>

        {/* Navigation Tiles - MOBILE ONLY (na górze przed treścią) */}
        <div
          className={`lg:hidden grid grid-cols-2 md:grid-cols-3 gap-3 mb-8 ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}
          style={{ animationDelay: '0.3s' }}
        >
          {services.map((service, index) => (
            <button
              key={`mobile-nav-${index}`}
              onClick={() => handleServiceClick(index)}
              className={`relative group p-4 rounded-xl transition-all duration-300 ${
                activeIndex === index
                  ? 'bg-primary text-white shadow-lg scale-[1.02]'
                  : 'bg-white text-gray-700 hover:bg-gray-50 hover:shadow-md'
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <Icon
                  name={service.iconName}
                  size="lg"
                  className={activeIndex === index ? 'text-white' : 'text-primary'}
                />
                <span className="text-xs font-semibold text-center leading-tight">
                  {service.title}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Navigation Tiles - DESKTOP ONLY (nad treścią) */}
        <div
          className={`hidden lg:grid lg:grid-cols-6 gap-4 mb-8 ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}
          style={{ animationDelay: '0.3s' }}
        >
          {services.map((service, index) => (
            <button
              key={`desktop-nav-${index}`}
              onClick={() => handleServiceClick(index)}
              className={`relative group p-6 rounded-xl transition-all duration-300 ${
                activeIndex === index
                  ? 'bg-primary text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50 hover:shadow-md'
              }`}
            >
              <div className="flex flex-col items-center gap-3">
                <Icon
                  name={service.iconName}
                  size="xl"
                  className={activeIndex === index ? 'text-white' : 'text-primary'}
                />
                <span className="text-sm font-semibold text-center">
                  {service.title}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Main Showcase Card - z animacją Scale Down + Fade + Scale Up */}
        <div
          className={`relative mb-8 ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}
          style={{ animationDelay: '0.4s' }}
        >
          {/* Render all services for SEO, show only active one */}
          {services.map((service, index) => (
            <div
              key={index}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-6 ${
                index === activeIndex ? '' : 'hidden'
              }`}
            >
              {/* Left: Content Box */}
              <div
                className={`bg-white rounded-2xl shadow-2xl overflow-hidden transition-all ${
                  index === activeIndex && animationPhase === 'exit' ? 'service-exit-active' : ''
                } ${
                  index === activeIndex && animationPhase === 'enter' ? 'service-enter-active' : ''
                }`}
              >
                <div className="p-8 lg:p-12 flex flex-col justify-center h-full" style={{ minHeight: '500px' }}>
                  <div className="space-y-6">
                    <h2 className="text-4xl lg:text-5xl font-bold leading-tight text-gray-900">
                      {service.title}
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {service.description}
                    </p>
                    <div className="pt-4">
                      <Button
                        variant="outline"
                        size="lg"
                        href={service.href}
                        rightIcon={<Icon name="arrowRight" size="sm" />}
                      >
                        Zobacz Szczegóły
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Image Box */}
              <div
                className={`relative rounded-2xl overflow-hidden shadow-2xl transition-all ${
                  index === activeIndex && animationPhase === 'exit' ? 'service-exit-active' : ''
                } ${
                  index === activeIndex && animationPhase === 'enter' ? 'service-enter-active' : ''
                }`}
                style={{ minHeight: '500px' }}
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={65}
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
