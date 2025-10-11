import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export interface PartnerLogoProps {
  name: string;
  image: string;
  href?: string;
}

export function PartnerLogo({ name, image, href }: PartnerLogoProps) {
  const content = (
    <div className="p-4 transition-all duration-300 hover:scale-110">
      <div className="relative w-32 h-16 grayscale hover:grayscale-0 transition-all duration-300">
        <Image
          src={image}
          alt={name}
          fill
          className="object-contain"
        />
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </Link>
    );
  }

  return content;
}


