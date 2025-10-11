import React from 'react';
import Image from 'next/image';
import { Button, Icon, SectionLabel } from '@/components/ui';

export interface HeroSectionProps {
  tagline: string;
  title: string;
  subtitle: string;
  backgroundImage: string;
  primaryButton: { text: string; href: string };
}

export function HeroSection({
  tagline,
  title,
  subtitle,
  backgroundImage,
  primaryButton,
}: HeroSectionProps) {
  return (
    <div className="px-0 md:px-[50px] mt-4 md:mt-8">
      <section className="relative min-h-[500px] md:min-h-[calc(100vh-140px)] flex items-center md:rounded-lg overflow-hidden mx-auto shadow-xl">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage}
            alt="Hero background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-12 relative z-10 py-20">
          <div className="max-w-3xl space-y-6">
            <SectionLabel>{tagline}</SectionLabel>
            
                    <h1 className="text-4xl md:text-5xl lg:text-hero font-extrabold text-white leading-tight">
                      {title}
                    </h1>
            
                    <p className="text-base md:text-body-lg text-white max-w-2xl">
                      {subtitle}
                    </p>
            
            <div className="pt-4">
              <Button
                variant="secondary"
                size="lg"
                href={primaryButton.href}
                rightIcon={<Icon name="arrowRight" size="sm" />}
              >
                {primaryButton.text}
              </Button>
            </div>
          </div>
        </div>

        {/* Slider Navigation - Right Side */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 z-10 flex flex-col items-center gap-4">
          <button className="w-12 h-12 rounded-full bg-primary text-white font-bold hover:bg-primary-dark transition-colors">
            01
          </button>
          <button className="w-12 h-12 rounded-full bg-white/20 text-white font-bold hover:bg-white/30 transition-colors">
            02
          </button>
          <button className="w-12 h-12 rounded-full bg-white/20 text-white font-bold hover:bg-white/30 transition-colors">
            03
          </button>
          <span className="text-white text-sm font-medium mt-2 [writing-mode:vertical-lr] rotate-180">
            Zobacz Wszystkie
          </span>
        </div>

      </section>
    </div>
  );
}

