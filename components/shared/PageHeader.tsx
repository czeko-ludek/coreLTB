import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export interface PageHeaderProps {
  title: string;
  watermarkText: string;
  breadcrumbs: Array<{ label: string; href: string }>;
  backgroundImage: string;
}

export function PageHeader({
  title,
  watermarkText,
  breadcrumbs,
  backgroundImage,
}: PageHeaderProps) {
  return (
    <div className="px-0 md:px-[50px] mt-8">
      <section className="relative h-[300px] md:h-[400px] overflow-hidden rounded-lg shadow-lg">
        {/* Background Image - LCP optimized */}
        <Image
          src={backgroundImage}
          alt={title}
          fill
          className="object-cover rounded-lg"
          priority
          fetchPriority="high"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
        />

        {/* Gradient Overlay - Modern Smooth Gradient */}
        <div className="absolute inset-0 rounded-lg" style={{
          background: 'linear-gradient(90deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.5) 35%, rgba(0,0,0,0.2) 65%, transparent 100%)'
        }}></div>

        {/* Title - Left Aligned */}
        <div className="absolute inset-0 flex items-center z-10 px-4 md:px-8 left-0 overflow-hidden">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-[400px] md:max-w-[600px]">
            {title}
          </h1>
          {/* Watermark Text - Stroke Only, Next to Title - Single line */}
          <div
            className="text-[50px] md:text-[70px] lg:text-[90px] font-bold uppercase select-none pointer-events-none ml-4 md:ml-8 whitespace-nowrap"
            style={{
              WebkitTextStroke: '1px rgba(255, 255, 255, 0.4)',
              color: 'transparent'
            }}
            aria-hidden="true"
          >
            {watermarkText}
          </div>
        </div>

        {/* Breadcrumbs - Bottom Edge of Header */}
        <nav className="absolute bottom-0 left-4 md:left-8 z-20 flex items-center gap-2 md:gap-3 text-xs md:text-sm bg-white px-4 md:px-8 py-3 md:py-4 rounded-t-lg shadow-lg">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={crumb.href}>
              {index > 0 && (
                <span className="text-gray-400 font-bold">•</span>
              )}
              <Link
                href={crumb.href}
                className={
                  index === breadcrumbs.length - 1
                    ? 'text-primary font-bold uppercase tracking-wider'
                    : 'text-gray-900 hover:text-primary transition-colors uppercase tracking-wider font-bold'
                }
              >
                {crumb.label}
              </Link>
            </React.Fragment>
          ))}
        </nav>
      </section>
    </div>
  );
}
