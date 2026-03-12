import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@/components/ui';

export interface ServiceCardSimpleProps {
  image: string;
  title: string;
  description: string;
  features: string[];
  href: string;
}

export function ServiceCardSimple({
  image,
  title,
  description,
  features,
  href,
}: ServiceCardSimpleProps) {
  return (
    <Link href={href} className="group block">
      <div className="bg-surface-light rounded-xl overflow-hidden shadow-md hover:shadow-lg hover:shadow-zinc-200/50 transition-all duration-500 border border-gray-200">
        {/* Image — aspect-[2/1] shorter by ~20% vs 3/2 */}
        <div className="relative w-full aspect-[2/1] overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {/* Content — tight padding */}
        <div className="p-3 space-y-1.5">
          {/* Title */}
          <h3 className="text-xl font-bold text-text-primary group-hover:text-primary transition-colors leading-tight">
            {title}
          </h3>

          {/* Short description */}
          <p className="text-text-secondary text-sm leading-relaxed line-clamp-2">
            {description}
          </p>

          {/* Link — przejdź do usługi */}
          <div className="pt-1">
            <span className="inline-flex items-center gap-1.5 text-primary font-medium text-xs group-hover:gap-2.5 transition-all">
              Przejdź do usługi
              <Icon name="arrowRight" size="sm" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
