'use client';

import React from 'react';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { Icon } from '@/components/ui';
import { SectionHeader, SectionHeaderProps, NumberedListItem, NumberedListItemProps } from '@/components/shared';

export interface HowItWorksSectionProps {
  header: SectionHeaderProps;
  steps: NumberedListItemProps[];
  video: { placeholderImage: string; videoUrl: string };
}

export function HowItWorksSection({ header, steps, video }: HowItWorksSectionProps) {
  // Scroll-triggered animation
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const handleVideoPlay = () => {
    // Video play logic here
    console.log('Play video:', video.videoUrl);
  };

  return (
    <section ref={ref} className="section-with-bg py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* Left: Video Placeholder with curtain reveal */}
          <div className={`relative h-full min-h-[400px] bg-black rounded-xl overflow-hidden shadow-2xl ring-1 ring-black/5 animate-curtain-reveal ${inView ? 'curtain-animate' : ''}`}>
            <Image
              src={video.placeholderImage}
              alt="Video placeholder"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />

            {/* Play Button */}
            <button
              onClick={handleVideoPlay}
              className="absolute bottom-6 right-6 flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all group z-20"
            >
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <Icon name="play" size="sm" className="text-white" />
              </div>
              <span className="font-semibold text-text-primary">Obejrzyj Wideo</span>
            </button>
          </div>

          {/* Right: Steps */}
          <div className="space-y-6">
            <div className={inView ? 'animate-fade-in-up' : 'opacity-0'} style={{ animationDelay: '0.2s' }}>
              <SectionHeader {...header} align="left" theme="light" />
            </div>

            <div className="mt-8">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={inView ? 'animate-fade-in-up' : 'opacity-0'}
                  style={{ animationDelay: `${0.4 + index * 0.15}s` }}
                >
                  <NumberedListItem
                    {...step}
                    isLast={index === steps.length - 1}
                    isVisible={inView}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

