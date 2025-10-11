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
      <div className="bg-surface-light rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200">
        {/* Image */}
        <div className="relative w-full h-64 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Title */}
          <h3 className="text-2xl font-bold text-text-primary group-hover:text-primary transition-colors">
            {title}
          </h3>

          {/* Description */}
          <p className="text-text-secondary text-sm leading-relaxed">
            {description}
          </p>

          {/* Features */}
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <Icon name="check" size="sm" className="text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-text-secondary">{feature}</span>
              </li>
            ))}
          </ul>

          {/* Read More Link */}
          <div className="pt-2">
            <span className="inline-flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
              Czytaj Więcej
              <Icon name="arrowRight" size="sm" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
