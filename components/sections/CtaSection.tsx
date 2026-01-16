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
  // Scroll-triggered animation
  const { ref: sectionRef, inView: sectionInView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <section ref={sectionRef} className="bg-[#efebe7] py-10 sm:py-12">
      <div className="mx-auto max-w-[96rem] px-4 sm:px-6 lg:px-8">
        {/* Bento Card - Asymetryczny Split */}
        <div
          className={`bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-xl ${
            sectionInView ? 'animate-fade-in-up' : 'opacity-0'
          }`}
          style={{ animationDelay: '0.2s' }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr]">
            {/* Lewa strona - CTA Content */}
            <div className="bg-gradient-to-br from-primary to-primary/90 p-6 md:p-8 lg:p-10 flex flex-col justify-center">
              <div
                className={`${
                  sectionInView ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: '0.3s' }}
              >
                <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full mb-4">
                  <span className="text-white text-xs font-bold uppercase tracking-wider">
                    Skontaktuj się z nami
                  </span>
                </div>

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 leading-tight">
                  Gotowy na budowę<br />swoich marzeń?
                </h2>

                <p className="text-white/90 text-sm md:text-base mb-6 leading-relaxed max-w-lg">
                  Umów się na bezpłatną konsultację i poznaj możliwości realizacji Twojego projektu.
                </p>

                <Button
                  variant="secondary"
                  size="lg"
                  href={primaryButton.href}
                  className="!bg-[#1a1a1a] font-bold shadow-xl !text-white hover:!bg-white hover:!text-[#1a1a1a] transition-all duration-300 hover:scale-105"
                  leftIcon={<Icon name="calendar" size="md" />}
                >
                  {primaryButton.text}
                </Button>
              </div>
            </div>

            {/* Prawa strona - Contact Info */}
            <div
              className={`bg-gray-50 p-6 md:p-8 flex flex-col justify-center ${
                sectionInView ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: '0.5s' }}
            >
              <div className="space-y-5">
                {/* Email */}
                <div className="group">
                  <div className="text-gray-400 text-xs uppercase tracking-wider mb-2 font-bold">
                    Email
                  </div>
                  <a
                    href={`mailto:${email}`}
                    className="flex items-center gap-3 text-gray-900 hover:text-primary transition-colors"
                  >
                    <div className="h-12 w-12 rounded-2xl bg-white shadow-md flex items-center justify-center group-hover:bg-primary group-hover:shadow-lg transition-all">
                      <Icon name="mail" size="md" className="text-primary group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-base md:text-lg font-bold break-all">{email}</span>
                  </a>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200"></div>

                {/* Social */}
                <div>
                  <div className="text-gray-400 text-xs uppercase tracking-wider mb-3 font-bold">
                    Śledź nas
                  </div>
                  <div className="flex items-center gap-3">
                    {socials.map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group h-12 w-12 rounded-2xl bg-white shadow-md flex items-center justify-center hover:bg-primary hover:shadow-lg transition-all hover:scale-110"
                        aria-label={`Odwiedź nas na ${social.platform}`}
                      >
                        <Icon name={social.platform} size="md" className="text-primary group-hover:text-white transition-colors" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
