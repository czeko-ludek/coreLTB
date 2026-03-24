'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { clsx } from 'clsx';
import { Icon, type IconName } from '@/components/ui';
import { trackPhoneClick } from '@/lib/analytics';

// =============================================================================
// INTERFACES
// =============================================================================

export interface ContactInfo {
  phone: string;
  email: string;
  address?: string; // Ignored in new design, kept for backward compatibility
}

export interface ContactCTASectionProps {
  header?: unknown; // Ignored in new design, kept for backward compatibility
  contactInfo: ContactInfo;
  primaryButton?: {
    text: string;
    href: string;
  };
  socials?: Array<{
    platform: 'facebook' | 'instagram' | 'linkedin';
    href: string;
  }>;
}

// =============================================================================
// COMPONENT
// =============================================================================

export const ContactCTASection: React.FC<ContactCTASectionProps> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  header, // Ignored - kept for backward compatibility
  contactInfo,
  primaryButton = { text: 'Umów Konsultację', href: '/umow-konsultacje' },
  socials,
}) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: '-100px 0px',
  });

  return (
    <section id="kontakt" ref={ref} className="bg-background-beige py-8 sm:py-12">
      <div className="mx-auto max-w-[96rem] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* Left: Content */}
          <div
            className={clsx(
              'bg-zinc-900 rounded-2xl overflow-hidden',
              'transition-all duration-700',
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            )}
          >
            <div className="p-6 md:p-8 lg:p-10 flex flex-col justify-center h-full">
              {/* Label */}
              <span
                className={clsx(
                  'text-primary font-bold text-xs uppercase tracking-[0.2em] block mb-3',
                  'transition-all duration-500 delay-200',
                  inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'
                )}
              >
                Skontaktuj się z nami
              </span>

              {/* H2 */}
              <h2
                className={clsx(
                  'text-3xl md:text-4xl lg:text-5xl font-black text-white leading-[0.95] mb-4',
                  'transition-all duration-700 delay-300',
                  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                )}
              >
                GOTOWY NA
                <br />
                <span className="text-primary">BUDOWĘ?</span>
              </h2>

              {/* Subtitle */}
              <p
                className={clsx(
                  'text-zinc-400 text-base md:text-lg mb-6 max-w-xl',
                  'transition-all duration-500 delay-[400ms]',
                  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                )}
              >
                Umów bezpłatną konsultację. Porozmawiajmy o Twoim projekcie.
              </p>

              {/* Contact Row */}
              <div
                className={clsx(
                  'flex flex-wrap items-center gap-5 mb-6',
                  'transition-all duration-500 delay-500',
                  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                )}
              >
                {/* Phone */}
                <a
                  href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                  onClick={() => trackPhoneClick('contact-cta')}
                  className="group flex items-center gap-3"
                >
                  <div className="h-11 w-11 rounded-xl bg-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon name="phone" className="text-zinc-900" size="md" />
                  </div>
                  <div>
                    <div className="text-zinc-500 text-[10px] uppercase tracking-wider font-bold">
                      Telefon
                    </div>
                    <div className="text-lg md:text-xl font-bold text-white group-hover:text-primary transition-colors">
                      {contactInfo.phone}
                    </div>
                  </div>
                </a>

                {/* Divider */}
                <div className="hidden md:block w-px h-10 bg-zinc-700" />

                {/* Email */}
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="group flex items-center gap-3"
                >
                  <div className="h-11 w-11 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center group-hover:border-primary group-hover:scale-110 transition-all duration-300">
                    <Icon name="mail" className="text-primary" size="md" />
                  </div>
                  <div>
                    <div className="text-zinc-500 text-[10px] uppercase tracking-wider font-bold">
                      Email
                    </div>
                    <div className="text-base md:text-lg font-bold text-white group-hover:text-primary transition-colors">
                      {contactInfo.email}
                    </div>
                  </div>
                </a>
              </div>

              {/* CTA Button + Socials */}
              <div
                className={clsx(
                  'flex flex-wrap items-center gap-4',
                  'transition-all duration-500 delay-[600ms]',
                  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                )}
              >
                <Link
                  href={primaryButton.href}
                  className="group inline-flex items-center gap-3 bg-primary hover:bg-white text-zinc-900 font-bold text-sm px-6 py-3 rounded-xl transition-all duration-300"
                >
                  {primaryButton.text}
                  <div className="h-7 w-7 rounded-full bg-zinc-900 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <Icon name="arrowRight" className="text-white" size="sm" />
                  </div>
                </Link>

                {/* Socials */}
                {socials && socials.length > 0 && (
                  <div className="flex items-center gap-2">
                    {socials.map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Odwiedź nasz profil na ${social.platform.charAt(0).toUpperCase() + social.platform.slice(1)}`}
                        className="h-10 w-10 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-primary hover:border-primary hover:scale-110 hover:-translate-y-0.5 transition-all duration-300"
                      >
                        <Icon name={social.platform as IconName} size="sm" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right: Image */}
          <div
            className={clsx(
              'relative min-h-[300px] rounded-2xl overflow-hidden',
              'transition-all duration-700 delay-300',
              inView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            )}
          >
            <Image
              src="/images/cta.webp"
              alt="CoreLTB Builders - Budowa domu"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
