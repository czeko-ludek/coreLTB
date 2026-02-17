// components/shared/ProjectOptimalPrice.tsx
import React from 'react';
import { hasDefinition, getDefinition } from '@/data/definitions';
import { InfoTooltip } from './InfoTooltip';

export interface ProjectOptimalPriceProps {
  title: string;
  stageName: string;
  price: string;
}

export function ProjectOptimalPrice({ title, stageName, price }: ProjectOptimalPriceProps) {
  const hasInfo = hasDefinition(stageName);
  const definition = hasInfo ? getDefinition(stageName) : null;

  return (
    <section className="py-8 md:py-12 bg-background-beige">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-text-primary mb-6 md:mb-8 text-center">
            {title}
          </h2>

          {/* Price Card */}
          <div className="bg-white rounded-xl overflow-hidden shadow-xl border-2 border-primary/20">
            {/* Header - Golden background */}
            <div className="bg-primary px-6 py-4">
              <div className="flex items-center justify-center gap-2">
                <h3 className="text-white font-bold text-lg md:text-xl uppercase tracking-wide text-center">
                  {stageName}
                </h3>
                {hasInfo && definition && (
                  <div className="[&_.text-primary]:text-white [&_.text-gray-400]:text-white/80 [&_.hover\:text-primary]:hover:text-white">
                    <InfoTooltip definition={definition} />
                  </div>
                )}
              </div>
            </div>

            {/* Price Display */}
            <div className="p-8 md:p-12 text-center">
              <div className="mb-3 text-text-secondary text-sm md:text-base uppercase tracking-wide font-medium">
                Najbardziej optymalna cena
              </div>
              <div className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary mb-4">
                {price}
              </div>
              <div className="text-text-secondary text-sm md:text-base">
                * Cena minimalna dla wybranego stanu
              </div>
            </div>

            {/* Info Badge */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <p className="text-xs md:text-sm text-text-secondary text-center italic">
                Podana cena jest szacunkowa i może się różnić w zależności od lokalizacji, materiałów i specyfikacji projektu.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
