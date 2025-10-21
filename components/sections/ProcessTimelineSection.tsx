import React from 'react';
import { ProcessStepCard } from '@/components/shared/ProcessStepCard';
import { SectionLabel } from '@/components/ui';

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface ProcessTimelineSectionProps {
  steps: ProcessStep[];
}

/**
 * ProcessTimelineSection - Organizm
 *
 * Sekcja prezentująca timeline procesu współpracy krok po kroku.
 * Wizualizuje etapy budowy w przejrzysty sposób.
 *
 * Cechy:
 * - Beżowe tło
 * - Timeline z numerami w kółkach
 * - Linie łączące kroki (responsywne: poziome na desktop, pionowe na mobile)
 * - Maksymalnie 6 kroków dla czytelności
 */
export function ProcessTimelineSection({
  steps,
}: ProcessTimelineSectionProps) {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-12 md:mb-20">
          <SectionLabel>Proces</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary mt-4">
            Jak wygląda współpraca?
          </h2>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-8 relative">
          {steps.map((step, index) => (
            <ProcessStepCard
              key={index}
              number={step.number}
              title={step.title}
              description={step.description}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
