import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/components/ui';

export interface ProjectCardProps {
  image: { src: string; alt: string };
  title: string;
  category: string;
  location: string;
  details: Array<{ label: string; value: string }>;
  isActive: boolean;
}

export function ProjectCard({
  image,
  title,
  category,
  location,
  details,
  isActive,
}: ProjectCardProps) {
  return (
    <div
      className={`relative transition-all duration-500 ${
        isActive
          ? 'scale-100 opacity-100'
          : 'scale-90 opacity-50 brightness-75'
      }`}
    >
      {/* Project image - much taller for better info box display */}
      <div className="relative aspect-[1/1] rounded-xl overflow-hidden">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover"
        />
      </div>

      {/* Info box - animated fade-in from right - wider with tighter spacing */}
      {isActive && (
        <div className="absolute right-4 bottom-4 top-4 w-[52%] bg-surface-light rounded-xl shadow-2xl p-6 space-y-3 animate-fade-in-right"
        >
          {/* Title and category with subtle background */}
          <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-text-dark mb-2 leading-tight">
              {title}
            </h3>
            <p className="text-sm text-text-secondary flex items-center gap-1.5">
              <Icon name="building" size="sm" />
              {category}
            </p>
          </div>

          {/* Location with subtle background */}
          <div className="flex items-center gap-2 text-text-secondary bg-primary/5 p-2.5 rounded-lg border border-primary/10">
            <Icon name="mapPin" size="sm" className="text-primary" />
            <span className="text-sm font-medium">{location}</span>
          </div>

          {/* Details grid with individual backgrounds */}
          <div className="grid grid-cols-2 gap-2.5 pt-1">
            {details.map((detail, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white p-2.5 rounded-lg border border-gray-100 hover:border-primary/20 transition-colors duration-300"
              >
                <p className="text-xs text-text-secondary uppercase mb-1 tracking-wide font-semibold">
                  {detail.label}
                </p>
                <p className="text-base font-bold text-text-dark leading-tight">
                  {detail.value}
                </p>
              </div>
            ))}
          </div>

          {/* Call to action button */}
          <Link
            href="/projekty"
            className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg mt-2"
          >
            Zobacz realizację
            <Icon name="arrowRight" size="sm" />
          </Link>
        </div>
      )}
    </div>
  );
}


