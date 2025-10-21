'use client';

import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { TimelineNav, TimelineNavItem, TimelineStep, SectionHeader, SectionHeaderProps } from '@/components/shared';
import { IconName } from '@/components/ui';

export interface TimelineStepData {
  id: string;
  number: number;
  icon: IconName;
  label: string;
  title: string;
  content: string;
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

        {/* Timeline Content with vertical line */}
        <div className="relative">
          {/* Pionowa linia timeline - ELEGANCKA, GRUBSZA, ZŁOTA z gradientem */}
          <div
            className="hidden md:block absolute left-0 top-0 w-1.5 rounded-full shadow-2xl"
            style={{
              height: '100%',
              left: '2rem',
              background: 'linear-gradient(180deg, rgba(223,187,104,0.3) 0%, rgba(223,187,104,1) 15%, rgba(223,187,104,1) 85%, rgba(223,187,104,0.3) 100%)',
              boxShadow: '0 0 20px rgba(223,187,104,0.4), 0 0 40px rgba(223,187,104,0.2)'
            }}
          />

          {/* Kroki timeline */}
          <div className="space-y-6 md:space-y-0">
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
      </div>
    </section>
  );
}
