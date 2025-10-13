import React from 'react';
import Image from 'next/image';
import { Icon } from '@/components/ui';

export interface ProjectCardProps {
  image: { src: string; alt: string };
  title: string;
  category: string;
  location: string;
  details: Array<{ label: string; value: string }>;
  isActive?: boolean;
}

export function ProjectCard({
  image,
  title,
  category,
  location,
  details,
}: ProjectCardProps) {
  return (
    <div className="relative group h-full bg-white rounded-xl shadow-md overflow-hidden">
      {/* Project image - 10% shorter height with zoom contained inside */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {/* Subtle dark gradient - top left corner only (for text readability) */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-transparent to-transparent pointer-events-none" />

        {/* Top left - Title & Category (on image) */}
        <div className="absolute top-6 left-6 z-10">
          <h3 className="text-2xl lg:text-3xl font-bold text-white leading-tight mb-2 drop-shadow-lg">
            {title}
          </h3>
          <p className="text-sm lg:text-base text-white/95 drop-shadow-md">
            {category}
          </p>
        </div>

        {/* Bottom left - Location badge (gold box with icon) */}
        <div className="absolute bottom-6 left-6 z-10">
          <div className="flex items-center gap-2 bg-primary px-4 py-2.5 rounded-lg shadow-lg">
            <Icon name="mapPin" size="sm" className="text-white" />
            <span className="text-sm lg:text-base font-medium text-white">{location}</span>
          </div>
        </div>
      </div>

      {/* Bottom section - Details grid (connected to image, no gap) */}
      <div className="p-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {details.map((detail, index) => (
            <div
              key={index}
              className="bg-gray-50 border border-primary/20 p-3 rounded-lg hover:border-primary/40 transition-colors duration-300"
            >
              <p className="text-sm text-text-secondary uppercase mb-1 tracking-wide font-medium">
                {detail.label}
              </p>
              <p className="text-base lg:text-lg font-bold text-text-dark">
                {detail.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
