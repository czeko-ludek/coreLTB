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
    <div className="group relative bg-white hover:bg-gray-50 rounded-xl p-8 border-t-2 border-primary/20 hover:border-t-primary border-x border-b border-transparent hover:border-primary/20 transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-xl">
      {/* Icon in top left */}
      <div className="mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
          <Icon name={iconName} size="lg" className="text-primary" />
        </div>
      </div>

      {/* Service number watermark */}
      <div className="absolute top-8 right-8 text-8xl font-bold text-gray-100 select-none">
        {serviceNumber}
      </div>

      {/* Content */}
      <div className="relative space-y-4">
        <Link href={href}>
          <h3 className="text-h3 font-semibold text-text-primary group-hover:text-primary transition-colors duration-300 cursor-pointer">
            {title}
          </h3>
        </Link>

        <p className="text-body-md text-text-secondary leading-relaxed">
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

