import React from 'react';
import Link from 'next/link';
import { Icon, IconName } from '@/components/ui';

export interface ServiceCardProps {
  iconName: IconName;
  serviceNumber: string;
  title: string;
  description: string;
  href: string;
}

export function ServiceCard({
  iconName,
  serviceNumber,
  title,
  description,
  href,
}: ServiceCardProps) {
  return (
    <div className="group relative h-full bg-white hover:bg-gray-50 rounded-xl p-8 border-t-2 border-primary/20 hover:border-t-primary border-x border-b border-transparent hover:border-primary/20 transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-xl flex flex-col">
      {/* Icon and Title - horizontal on desktop, vertical on mobile */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6 mb-6">
        {/* Icon */}
        <div className="flex-shrink-0">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
            <Icon name={iconName} size="xl" className="text-primary" />
          </div>
        </div>

        {/* Title - next to icon on desktop */}
        <Link href={href} className="lg:flex-1">
          <h3 className="text-h3 font-semibold text-text-primary group-hover:text-primary transition-colors duration-300 cursor-pointer">
            {title}
          </h3>
        </Link>
      </div>

      {/* Content */}
      <div className="relative space-y-4 flex-1 flex flex-col">
        <p className="text-body-md text-text-secondary leading-relaxed flex-1">
          {description}
        </p>

        <Link
          href={href}
          className="inline-flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all"
        >
          Zobacz Więcej
          <Icon name="arrowRight" size="sm" />
        </Link>
      </div>
    </div>
  );
}

