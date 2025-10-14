import React from 'react';
import { Button } from '@/components/ui';

export interface ProjectIntroductionProps {
  id: string;
  surfaceArea: string;
  estimatedBuildCost: string;
  title: string;
  technology: string;
  price: string;
  availability: string;
}

export function ProjectIntroduction({
  id,
  surfaceArea,
  estimatedBuildCost,
  title,
  technology,
  price,
  availability,
}: ProjectIntroductionProps) {
  return (
    <section className="py-6 md:py-8" style={{ backgroundColor: '#efebe7' }}>
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-8 lg:p-12">
          {/* Top Section - Badge and Title */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 md:gap-6 mb-6 md:mb-8">
            {/* Left - Badge with ID and Specs */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4 flex-wrap">
              <div className="bg-primary px-6 py-4 md:px-8 md:py-5 rounded-lg shadow-md h-auto md:h-[72px] flex items-center justify-center">
                <span className="text-white font-bold text-lg md:text-xl">{id}</span>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4 w-full sm:w-auto">
                <div className="bg-white rounded-lg px-4 py-3 md:px-8 md:py-5 border border-primary/20 hover:border-primary/40 hover:shadow-md transition-all duration-300 h-auto md:h-[72px] flex flex-col justify-center w-full sm:w-auto">
                  <span className="text-text-secondary text-xs uppercase tracking-wide font-medium">Powierzchnia:</span>
                  <span className="font-bold text-text-primary text-base md:text-lg leading-tight">{surfaceArea}</span>
                </div>
                <div className="bg-white rounded-lg px-4 py-3 md:px-8 md:py-5 border border-primary/20 hover:border-primary/40 hover:shadow-md transition-all duration-300 h-auto md:h-[72px] flex flex-col justify-center w-full sm:w-auto">
                  <span className="text-text-secondary text-xs uppercase tracking-wide font-medium">Kosztorys:</span>
                  <span className="font-bold text-text-primary text-base md:text-lg leading-tight">{estimatedBuildCost}</span>
                </div>
              </div>
            </div>

            {/* Right - Price and Availability */}
            <div className="text-left lg:text-right">
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-1">{price}</div>
              <div className="text-sm text-text-secondary">
                Dostępność: <span className="font-medium text-text-primary">{availability}</span>
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-text-primary mb-4 md:mb-6 leading-tight">
            {title}
          </h1>

          {/* Technology and CTA */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 md:gap-6 pt-4 md:pt-6 border-t border-border-light">
            {/* Technology Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
              <span className="text-text-secondary text-xs md:text-sm uppercase tracking-wide font-medium">
                Technologia budowy:
              </span>
              <span className="bg-gray-100 px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-text-primary font-bold text-xs md:text-sm uppercase tracking-wider">
                {technology}
              </span>
            </div>

            {/* CTA Button - Only ZAMAWIAM */}
            <div className="flex gap-4">
              <Button variant="primary" size="lg" href="/kontakt">
                ZAMAWIAM
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
