import React from 'react';
import Image from 'next/image';
import { Icon } from '@/components/ui';

export interface ProjectCardProps {
  image: { src: string; alt: string };
  title: string;
  category: string;
  location: string;
  details: Array<{ label: string; value: string }>;
  isActive?: boolean; // Optional now since we show all cards equally
}

export function ProjectCard({
  image,
  title,
  category,
  location,
  details,
}: ProjectCardProps) {
  return (
    <div className="relative group h-full">
      {/* Project image with overlay */}
      <div className="relative aspect-[4/5] rounded-xl overflow-hidden h-full">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />

        {/* Content on image */}
        <div className="absolute inset-0 p-6 flex flex-col justify-between">
          {/* Top section - Title, category, location */}
          <div className="space-y-3">
            <h3 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
              {title}
            </h3>
            <p className="text-sm lg:text-base text-white/90 flex items-center gap-2">
              {category}
            </p>
            <div className="flex items-center gap-2 text-white/80">
              <Icon name="mapPin" size="sm" className="text-primary" />
              <span className="text-sm lg:text-base">{location}</span>
            </div>
          </div>

          {/* Bottom section - Details grid */}
          <div className="grid grid-cols-2 gap-3">
            {details.map((detail, index) => (
              <div
                key={index}
                className="bg-white/95 backdrop-blur-sm p-3 lg:p-4 rounded-lg"
              >
                <p className="text-xs text-text-secondary uppercase mb-1 tracking-wide font-medium">
                  {detail.label}
                </p>
                <p className="text-sm lg:text-base font-bold text-text-dark">
                  {detail.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
