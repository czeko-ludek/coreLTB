'use client';

import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { TimelineNav, TimelineNavItem, TimelineStep, SectionHeader, SectionHeaderProps } from '@/components/shared';
import { IconName } from '@/components/ui';

// Content Blocks dla elastycznego formatowania
type ContentBlock =
  | { type: 'paragraph'; value: string }
  | { type: 'list'; items: string[] };

export interface TimelineStepData {
  id: string;
  number: number;
  icon: IconName;
  label: string;
  title: string;
  content: ContentBlock[];
  imageSrc: string;
  imageAlt: string;
}

export interface CooperationTimelineSectionProps {
  header: SectionHeaderProps;
  steps: TimelineStepData[];
}

export function CooperationTimelineSection({
  header,
  steps,
}: CooperationTimelineSectionProps) {
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

  const navItems: TimelineNavItem[] = steps.map((step) => ({
    id: step.id,
    number: step.number,
    icon: step.icon,
    label: step.label,
  }));

  const handleStepInView = (stepNumber: number) => {
    setActiveStep(stepNumber);
  };

  return (
    <section className="py-16 lg:py-24 relative overflow-hidden" style={{ backgroundColor: '#efebe7' }}>
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

        {/* Timeline Content - Zigzag Layout */}
        <div className="mt-12 lg:mt-16 space-y-8 lg:space-y-12">
          {steps.map((step, index) => (
            <TimelineStep
              key={step.id}
              id={step.id}
              number={step.number}
              icon={step.icon}
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
    </section>
  );
}
