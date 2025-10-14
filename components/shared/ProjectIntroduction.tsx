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
    <section className="py-8" style={{ backgroundColor: '#efebe7' }}>
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 lg:p-12">
          {/* Top Section - Badge and Title */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
            {/* Left - Badge with ID and Specs */}
            <div className="flex items-center gap-4 flex-wrap">
              <div className="bg-primary px-8 py-5 rounded-lg shadow-md h-[72px] flex items-center justify-center">
                <span className="text-white font-bold text-xl">{id}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-white rounded-lg px-8 py-5 border border-primary/20 hover:border-primary/40 hover:shadow-md transition-all duration-300 h-[72px] flex flex-col justify-center">
                  <span className="text-text-secondary text-xs uppercase tracking-wide font-medium">Powierzchnia:</span>
                  <span className="font-bold text-text-primary text-lg leading-tight">{surfaceArea}</span>
                </div>
                <div className="bg-white rounded-lg px-8 py-5 border border-primary/20 hover:border-primary/40 hover:shadow-md transition-all duration-300 h-[72px] flex flex-col justify-center">
                  <span className="text-text-secondary text-xs uppercase tracking-wide font-medium">Kosztorys:</span>
                  <span className="font-bold text-text-primary text-lg leading-tight">{estimatedBuildCost}</span>
                </div>
              </div>
            </div>

            {/* Right - Price and Availability */}
            <div className="text-right">
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-1">{price}</div>
              <div className="text-sm text-text-secondary">
                Dostępność: <span className="font-medium text-text-primary">{availability}</span>
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl lg:text-4xl font-bold text-text-primary mb-6 leading-tight">
            {title}
          </h1>

          {/* Technology and CTA */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pt-6 border-t border-border-light">
            {/* Technology Badge */}
            <div className="flex items-center gap-3">
              <span className="text-text-secondary text-sm uppercase tracking-wide font-medium">
                Technologia budowy:
              </span>
              <span className="bg-gray-100 px-4 py-2 rounded-lg text-text-primary font-bold text-sm uppercase tracking-wider">
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
