import React from 'react';
import Image from 'next/image';
import { Icon } from '@/components/ui';

export interface TeamMemberCardProps {
  image: { src: string; alt: string };
  name: string;
  role: string;
  description: string;
  socials: Array<{ platform: 'facebook' | 'twitter' | 'instagram' | 'linkedin'; href: string }>;
}

export function TeamMemberCard({
  image,
  name,
  role,
  description,
  socials,
}: TeamMemberCardProps) {
  return (
    <div className="group overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300">
      {/* Image section with hover overlay */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Overlay with social icons - appears on hover */}
        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          {socials.map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-text-dark hover:bg-primary hover:text-white transition-colors duration-300"
            >
              <Icon name={social.platform} size="sm" />
            </a>
          ))}
        </div>
      </div>

      {/* Info section */}
      <div className="p-6 space-y-2 bg-white">
        <h3 className="text-xl font-semibold text-text-primary">
          {name}
        </h3>
        <p className="text-sm font-medium text-primary">
          {role}
        </p>
        <p className="text-sm text-text-secondary leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

