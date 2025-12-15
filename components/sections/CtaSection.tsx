'use client';

import React from 'react';
import { Button, Icon } from '@/components/ui';
import { useInView } from 'react-intersection-observer';

export interface CtaSectionProps {
  title: string;
  email: string;
  primaryButton: { text: string; href: string };
  socials: Array<{
    platform: 'facebook' | 'twitter' | 'instagram' | 'linkedin' | 'youtube';
    href: string;
  }>;
}

export function CtaSection({
  title,
  email,
  primaryButton,
  socials,
}: CtaSectionProps) {
  // Scroll-triggered animation for curtain reveal
  const { ref: sectionRef, inView: sectionInView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <section ref={sectionRef} className="bg-background py-8">
      <div className="px-0 md:px-[50px]">
        <div
          className={`animate-cta-curtain-reveal rounded-lg shadow-lg ${
            sectionInView ? 'cta-curtain-animate' : ''
          }`}
          style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
        >
          <div
            className="bg-gradient-to-br from-primary via-primary to-primary/90 rounded-lg overflow-hidden"
          >
            <div className="container mx-auto px-6 py-8 md:py-10">
              {/* Title */}
              <h2
                className={`text-3xl md:text-6xl lg:text-7xl font-bold mb-8 md:mb-10 ${
                  sectionInView ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: '0.6s' }}
              >
                <span className="text-white block">Gotowy na budowę</span>
                <span className="block" style={{ color: '#1a1a1a' }}>swoich marzeń?</span>
              </h2>

              {/* 3-Column Grid with Dividers */}
              <div
                className={`grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 items-center md:divide-x md:divide-white/40 ${
                  sectionInView ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: '0.8s' }}
              >
              {/* Email Column */}
              <div className="md:pr-6">
                <div className="text-white/80 text-xs md:text-sm uppercase tracking-wider mb-2 font-medium">
                  Email
                </div>
                <a
                  href={`mailto:${email}`}
                  className="text-white text-lg md:text-xl font-semibold hover:text-white/90 transition-colors break-words flex items-center gap-2"
                >
                  <Icon name="mail" size="md" className="flex-shrink-0" />
                  <span>{email}</span>
                </a>
              </div>

              {/* CTA Column */}
              <div className="text-center md:px-6">
                <div className="text-white/80 text-xs md:text-sm uppercase tracking-wider mb-3 font-medium">
                  Skontaktuj się
                </div>
                <Button
                  variant="secondary"
                  size="lg"
                  href={primaryButton.href}
                  className="w-full md:w-auto bg-white font-bold shadow-md !text-[#1a1a1a] hover:!bg-[#1a1a1a] hover:!text-white transition-all duration-200"
                  leftIcon={<Icon name="calendar" size="sm" />}
                >
                  {primaryButton.text}
                </Button>
              </div>

              {/* Social Column */}
              <div className="text-center md:text-right md:pl-6">
                <div className="text-white/80 text-xs md:text-sm uppercase tracking-wider mb-3 font-medium">
                  Social
                </div>
                <div className="flex items-center justify-center md:justify-end gap-3">
                  {socials.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white rounded-full p-3 transition-all duration-200 hover:scale-110 hover:shadow-lg"
                      style={{ color: '#1a1a1a' }}
                      aria-label={`Odwiedź nas na ${social.platform}`}
                    >
                      <Icon name={social.platform} size="md" />
                    </a>
                  ))}
                </div>
              </div>
              </div> {/* Close grid */}
            </div> {/* Close container */}
          </div> {/* Close bg-gradient */}
        </div> {/* Close animate-cta-curtain-reveal */}
      </div> {/* Close px-0 */}
    </section>
  );
}


