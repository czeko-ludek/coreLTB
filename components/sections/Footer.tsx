'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@/components/ui';
import { PLATFORM_NAMES } from '@/lib/utils';

export interface FooterProps {
  contactInfo: Array<{
    iconName: 'phone' | 'clock' | 'mail' | 'mapPin';
    title: string;
    content: string;
  }>;
  logo: { src: string; alt: string };
  about: string;
  linkGroups: Array<{
    title: string;
    titleHref?: string;
    links: Array<{ label: string; href: string }>;
  }>;
  newsletter: {
    title: string;
    description: string;
    placeholder: string;
  };
  bottomBar: {
    copyright: string;
    links: Array<{ label: string; href: string }>;
  };
  socials: Array<{
    platform: 'facebook' | 'twitter' | 'instagram' | 'linkedin' | 'youtube';
    href: string;
  }>;
}

export function Footer({
  contactInfo,
  logo,
  about,
  linkGroups,
  newsletter,
  bottomBar,
  socials,
}: FooterProps) {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter API integration
    setEmail('');
  };

  return (
    <footer className="bg-background-dark text-white">
      {/* Top Section - Contact Info */}
      <div className="border-b border-border-dark">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon name={info.iconName} size="lg" className="text-primary" />
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white mb-1">
                    {info.title}
                  </h4>
                  <p className="text-sm text-text-secondary">
                    {info.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Middle Section - Links & Newsletter */}
      <div className="border-b border-border-dark">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* About Column */}
            <div className="space-y-4">
              <Link href="/" className="relative inline-block w-32 h-10">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  className="object-contain"
                  sizes="128px"
                />
              </Link>
              <p className="text-sm text-text-secondary leading-relaxed">
                {about}
              </p>
              <div className="flex gap-3">
                {socials.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Odwiedź nasz profil na ${PLATFORM_NAMES[social.platform]}`}
                      className="w-9 h-9 rounded-full bg-surface-dark flex items-center justify-center text-white hover:bg-primary transition-colors"
                    >
                      <Icon name={social.platform} size="sm" />
                    </a>
                ))}
              </div>
            </div>

            {/* Link Groups */}
            {linkGroups.map((group, index) => (
              <div key={index}>
                {group.titleHref ? (
                  <Link
                    href={group.titleHref}
                    className="text-base font-semibold text-white mb-4 block hover:text-primary transition-colors"
                  >
                    {group.title}
                  </Link>
                ) : (
                  <h4 className="text-base font-semibold text-white mb-4">
                    {group.title}
                  </h4>
                )}
                <ul className="space-y-3">
                  {group.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href={link.href}
                        className="text-sm text-text-secondary hover:text-primary transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Newsletter Column */}
            <div>
              <h4 className="text-base font-semibold text-white mb-4">
                {newsletter.title}
              </h4>
              <p className="text-sm text-text-secondary mb-4">
                {newsletter.description}
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={newsletter.placeholder}
                  required
                  className="flex-1 px-4 py-2 bg-surface-dark text-white rounded-l-md border border-border-dark focus:outline-none focus:border-primary"
                />
                <button
                  type="submit"
                  aria-label="Zapisz się do newslettera"
                  className="px-4 py-2 bg-primary text-white rounded-r-md hover:bg-primary-dark transition-colors flex items-center justify-center"
                >
                  <Icon name="arrowRight" size="sm" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Copyright */}
      <div className="bg-black/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-text-secondary">
            <p>{bottomBar.copyright}</p>
            <div className="flex gap-6">
              {bottomBar.links.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}


