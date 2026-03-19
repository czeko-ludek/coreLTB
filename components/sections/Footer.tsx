'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@/components/ui';
import { PLATFORM_NAMES } from '@/lib/utils';

// ── Types ──

interface FooterLink {
  label: string;
  href: string;
}

interface AreaColumn {
  subtitle: string;
  links: FooterLink[];
}

export interface FooterProps {
  logo: { src: string; alt: string };
  about: string;
  topBar: {
    phone: string;
    phoneHref: string;
    email: string;
    hours: string;
  };
  companyLinks: FooterLink[];
  serviceLinks: FooterLink[];
  areas: {
    title: string;
    titleHref: string;
    columns: AreaColumn[];
  };
  locations: Array<{
    name: string;
    address: string;
  }>;
  socials: Array<{
    platform: 'facebook' | 'twitter' | 'instagram' | 'linkedin' | 'youtube';
    href: string;
  }>;
  bottomBar: {
    copyright: string;
    links: FooterLink[];
  };
}

// ── Component ──

export function Footer({
  logo,
  about,
  topBar,
  companyLinks,
  serviceLinks,
  areas,
  locations,
  socials,
  bottomBar,
}: FooterProps) {
  return (
    <footer className="bg-background-dark text-white">
      {/* ── Contact Bar — prominent strip with phone, email, hours ── */}
      <div className="bg-primary/10 border-b border-primary/20">
        <div className="container mx-auto px-4 py-5">
          <div className="flex flex-wrap items-center justify-between gap-6">
            {/* Phone */}
            <a
              href={topBar.phoneHref}
              className="flex items-center gap-3 group"
            >
              <span className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                <Icon name="phone" size="md" className="text-primary" />
              </span>
              <div>
                <p className="text-xs text-text-tertiary uppercase tracking-wider">Zadzwoń</p>
                <p className="text-base font-semibold text-white group-hover:text-primary transition-colors">
                  {topBar.phone}
                </p>
              </div>
            </a>

            {/* Email */}
            <a
              href={`mailto:${topBar.email}`}
              className="flex items-center gap-3 group"
            >
              <span className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                <Icon name="mail" size="md" className="text-primary" />
              </span>
              <div>
                <p className="text-xs text-text-tertiary uppercase tracking-wider">Napisz</p>
                <p className="text-base font-semibold text-white group-hover:text-primary transition-colors">
                  {topBar.email}
                </p>
              </div>
            </a>

            {/* Hours */}
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Icon name="clock" size="md" className="text-primary" />
              </span>
              <div>
                <p className="text-xs text-text-tertiary uppercase tracking-wider">Godziny</p>
                <p className="text-base font-semibold text-white">{topBar.hours}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Section ── */}
      <div className="border-b border-border-dark">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-x-6 gap-y-10">
            {/* Logo + About + Socials — 3 cols */}
            <div className="col-span-2 md:col-span-3 lg:col-span-3 space-y-5">
              <Link href="/" className="relative inline-block w-40 h-14">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  className="object-contain object-left"
                  sizes="160px"
                />
              </Link>
              <p className="text-sm text-text-secondary leading-relaxed">
                {about}
              </p>

              {/* Locations with icons */}
              <div className="space-y-3 pt-2">
                {locations.map((loc, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <Icon name="mapPin" size="sm" className="text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-white">{loc.name}</p>
                      <p className="text-xs text-text-secondary leading-snug">
                        {loc.address}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Socials */}
              <div className="flex gap-2 pt-1">
                {socials.map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Odwiedź nasz profil na ${PLATFORM_NAMES[social.platform]}`}
                    className="w-9 h-9 rounded-full bg-surface-dark flex items-center justify-center text-text-secondary hover:text-white hover:bg-primary transition-colors"
                  >
                    <Icon name={social.platform} size="sm" />
                  </a>
                ))}
              </div>
            </div>

            {/* Firma — 1 col */}
            <div className="col-span-1 lg:col-span-1">
              <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
                Firma
              </h4>
              <ul className="space-y-2.5">
                {companyLinks.map((link, i) => (
                  <li key={i}>
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

            {/* Usługi — 2 cols */}
            <div className="col-span-1 lg:col-span-2">
              <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
                Usługi
              </h4>
              <ul className="space-y-2.5">
                {serviceLinks.map((link, i) => (
                  <li key={i}>
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

            {/* Obszar Działania — 4 cols, 3 sub-columns */}
            <div className="col-span-2 md:col-span-3 lg:col-span-4">
              <Link
                href={areas.titleHref}
                className="text-sm font-semibold text-white mb-4 block uppercase tracking-wider hover:text-primary transition-colors"
              >
                {areas.title}
              </Link>
              <div className="grid grid-cols-3 gap-x-4">
                {areas.columns.map((col, i) => (
                  <div key={i}>
                    <p className="text-[11px] font-medium text-primary/70 uppercase tracking-wider mb-2">
                      {col.subtitle}
                    </p>
                    <ul className="space-y-1.5">
                      {col.links.map((link, j) => (
                        <li key={j}>
                          <Link
                            href={link.href}
                            className="text-[13px] leading-snug text-text-secondary hover:text-primary transition-colors"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA — 2 cols */}
            <div className="col-span-2 md:col-span-3 lg:col-span-2">
              <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
                Bezpłatna wycena
              </h4>
              <p className="text-sm text-text-secondary leading-relaxed mb-4">
                Planujesz budowę domu? Skontaktuj się z nami — przygotujemy wycenę w&nbsp;48h.
              </p>
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
              >
                <Icon name="mail" size="sm" />
                Napisz do nas
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="bg-black/40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-text-secondary">
            <p>{bottomBar.copyright}</p>
            <div className="flex gap-4">
              {bottomBar.links.map((link, i) => (
                <Link
                  key={i}
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
