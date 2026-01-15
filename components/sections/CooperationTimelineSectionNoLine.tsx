'use client';

import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { TimelineNav, TimelineNavItem, TimelineStepNoLine, SectionHeader, SectionHeaderProps } from '@/components/shared';
import { IconName } from '@/components/ui';

// Content Blocks dla elastycznego formatowania
type ContentBlock =
  | { type: 'paragraph'; value: string }
  | { type: 'list'; items: string[] };

export interface TimelineStepNoLineData {
  id: string;
  number: number;
  icon: IconName; // Ikona w nawigacji + floating badge
  label: string; // Label w nawigacji + floating badge
  title: string;
  content: ContentBlock[];
  imageSrc: string;
  imageAlt: string;
}

export interface CooperationTimelineSectionNoLineProps {
  header: SectionHeaderProps;
  steps: TimelineStepNoLineData[];
}

export function CooperationTimelineSectionNoLine({
  header,
  steps,
}: CooperationTimelineSectionNoLineProps) {
  const [activeStep, setActiveStep] = useState(1);

  // Scroll-triggered animations - osobne dla nagłówka i nawigacji
  const { ref: headlineRef, inView: headlineInView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const { ref: navRef, inView: navInView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  // Tworzenie navItems z kroków + dodatkowy element FAQ (bez odpowiadającego kroku timeline)
  const navItems: TimelineNavItem[] = [
    ...steps.map((step) => ({
      id: step.id,
      number: step.number,
      icon: step.icon,
      label: step.label,
    })),
    // Ostatni element nawigacji FAQ - scrolluje do ServicesAccordionSection (NIE renderuje kroku timeline)
    {
      id: 'faq-section', // Ogólne ID dla FAQ (działa dla wszystkich usług)
      number: steps.length + 1, // Dynamiczny number (5 dla 4 kroków, 8 dla 7 kroków)
      icon: 'helpCircle' as const,
      label: 'FAQ',
    }
  ];

  const handleStepInView = (stepNumber: number) => {
    setActiveStep(stepNumber);
  };

  return (
    <section className="bg-background py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header with SectionHeader */}
        <div ref={headlineRef} className={headlineInView ? 'animate-fade-in-up' : 'opacity-0'}
            style={{ animationDelay: '0.1s' }}>
          <SectionHeader {...header} align="center" theme="light" />
        </div>

        {/* Navigation */}
        <div ref={navRef} className={navInView ? 'animate-fade-in-up' : 'opacity-0'} style={{ animationDelay: '0.3s' }}>
          <TimelineNav items={navItems} activeStep={activeStep} />
        </div>

        {/* Timeline Content - BEZ pionowej linii - Pełna szerokość jak nawigacja */}
        <div className="relative">
          {/* Kroki timeline - BEZ linii i ikon po lewej */}
          <div className="space-y-6 md:space-y-0">
            {steps.map((step, index) => (
              <TimelineStepNoLine
                key={step.id}
                id={step.id}
                number={step.number}
                icon={step.icon}
                label={step.label}
                title={step.title}
                content={step.content}
                imageSrc={step.imageSrc}
                imageAlt={step.imageAlt}
                isActive={activeStep === step.number}
                isLast={index === steps.length - 1}
                onInView={handleStepInView}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
