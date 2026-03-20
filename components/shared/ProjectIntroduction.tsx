import React from 'react';
import Link from 'next/link';
import { Icon } from '@/components/ui';
import { MirrorToggle } from './MirrorToggle';

export interface ProjectIntroductionProps {
  id: string;
  surfaceArea: string;
  estimatedBuildCost?: string;
  title: string;
  technology: string;
  price: string;
  availability: string;
  hasMirror?: boolean;
  /** Full /wycena URL with pre-filled calculator params */
  calculatorUrl?: string;
}

export function ProjectIntroduction({
  id,
  surfaceArea,
  estimatedBuildCost,
  title,
  technology,
  price,
  availability,
  hasMirror,
  calculatorUrl,
}: ProjectIntroductionProps) {
  return (
    <section className="py-6 md:py-8 bg-background-beige">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="mb-4" aria-label="Ścieżka nawigacji">
          <ol className="flex items-center gap-2 text-sm flex-wrap">
            <li className="flex items-center gap-2">
              <Link href="/" className="text-text-muted hover:text-primary transition-colors">
                Strona główna
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <Icon name="chevronRight" size="sm" className="text-text-muted" />
              <Link href="/projekty" className="text-text-muted hover:text-primary transition-colors">
                Projekty
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <Icon name="chevronRight" size="sm" className="text-text-muted" />
              <span className="text-text-primary font-medium">{title}</span>
            </li>
          </ol>
        </nav>

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
            {/* Technology Badge + Mirror Toggle */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
              <span className="text-text-secondary text-xs md:text-sm uppercase tracking-wide font-medium">
                Technologia budowy:
              </span>
              <span className="bg-gray-100 px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-text-primary font-bold text-xs md:text-sm uppercase tracking-wider">
                {technology}
              </span>
              {hasMirror && (
                <>
                  <span className="hidden sm:block text-border-light text-lg">|</span>
                  <MirrorToggle />
                </>
              )}
            </div>

            {/* CTA Button */}
            <Link
              href={calculatorUrl || '/wycena'}
              className="bg-primary hover:bg-primary-dark rounded-lg px-6 py-3 md:px-8 md:py-4 transition-all duration-300 flex items-center gap-2 group"
            >
              <Icon name="calculator" size="md" className="text-white" />
              <span className="font-bold text-white text-sm md:text-base">Poznaj cenę budowy</span>
              <Icon name="arrowRight" size="sm" className="text-white group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
