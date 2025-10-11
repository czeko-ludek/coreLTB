'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Button, Icon } from '@/components/ui';
import { MegaMenu, MegaMenuItem } from '@/components/shared';

export interface HeaderProps {
  topBar: {
    phone: string;
    email: string;
    socials: Array<{ platform: 'facebook' | 'twitter' | 'instagram' | 'linkedin'; href: string }>;
  };
  logo: { src: string; alt: string };
  navLinks: Array<{ label: string; href: string }>;
  searchEnabled: boolean;
  ctaButton: { text: string; href: string };
  megaMenuItems?: MegaMenuItem[];
}

export function Header({
  topBar,
  logo,
  navLinks,
  searchEnabled,
  ctaButton,
  megaMenuItems = [],
}: HeaderProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`z-50 transition-all duration-300 ${
        isScrolled
          ? 'sticky top-0 px-0 md:px-[50px]'
          : 'px-0 md:px-[50px] py-4'
      }`}
      onMouseLeave={() => setMegaMenuOpen(false)}
    >
      <div className="relative">
        <header className={`bg-white shadow-lg overflow-hidden mx-auto transition-all duration-300 ${
          megaMenuOpen
            ? 'rounded-t-lg md:rounded-t-lg shadow-lg'
            : isScrolled
            ? 'rounded-b-lg md:rounded-b-lg shadow-lg'
            : 'rounded-lg md:rounded-lg shadow-lg'
        }`} style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
        {/* Top Bar - Hidden on Mobile */}
        <div className="bg-gray-50 hidden md:block border-b border-gray-200">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between py-2 text-sm">
              {/* Contact Info */}
              <div className="flex items-center gap-6 text-gray-700">
                <div className="flex items-center gap-2">
                  <Icon name="phone" size="sm" className="text-primary" />
                  <span className="font-medium">{topBar.phone}</span>
                </div>
                <span className="text-primary font-bold">•</span>
                <div className="flex items-center gap-2">
                  <Icon name="mail" size="sm" className="text-primary" />
                  <span className="font-medium">{topBar.email}</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-2.5">
                <span className="text-primary text-sm mr-2 font-semibold">Śledź nas:</span>
                {topBar.socials.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-primary transition-colors"
                  >
                    <Icon name={social.platform} size="sm" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="bg-white border-t border-gray-200 md:border-t-0">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between py-2.5 min-h-[107px]">
              {/* Logo - 96x87px */}
              <Link href="/" className="relative flex-shrink-0" style={{ width: '96px', height: '87px' }}>
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  className="object-contain"
                  priority
                />
              </Link>

              {/* Desktop Navigation Links */}
              <nav className="hidden lg:flex items-center gap-8">
                {navLinks.map((link, index) => {
                  const isActive = pathname === link.href || (link.href === '/oferta' && pathname.startsWith('/oferta'));
                  const isOferta = link.href === '/oferta';

                  if (isOferta) {
                    return (
                      <Link
                        key={index}
                        href={link.href}
                        onMouseEnter={() => setMegaMenuOpen(true)}
                        className={`text-base font-semibold transition-colors relative flex items-center gap-1 ${
                          isActive
                            ? 'text-primary'
                            : 'text-gray-700 hover:text-primary'
                        }`}
                      >
                        {link.label}
                        <Icon name="chevronDown" size="sm" className={`transition-transform ${megaMenuOpen ? 'rotate-180' : ''}`} />
                        {isActive && (
                          <span className="absolute -bottom-5 left-0 right-0 h-0.5 bg-primary"></span>
                        )}
                      </Link>
                    );
                  }

                  return (
                    <Link
                      key={index}
                      href={link.href}
                      className={`text-base font-semibold transition-colors relative ${
                        isActive
                          ? 'text-primary'
                          : 'text-gray-700 hover:text-primary'
                      }`}
                    >
                      {link.label}
                      {isActive && (
                        <span className="absolute -bottom-5 left-0 right-0 h-0.5 bg-primary"></span>
                      )}
                    </Link>
                  );
                })}
              </nav>

              {/* Mobile & Desktop Actions */}
              <div className="flex items-center gap-2.5">
                {searchEnabled && (
                  <button className="text-primary hover:text-primary-dark transition-colors p-1.5">
                    <Icon name="search" size="md" />
                  </button>
                )}
                
                <Button 
                  variant="primary" 
                  size="sm"
                  href={ctaButton.href}
                  rightIcon={<Icon name="arrowRight" size="sm" />}
                >
                  {ctaButton.text}
                </Button>

                {/* Hamburger Menu - Mobile Only */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden text-gray-700 hover:text-primary transition-colors p-1.5"
                  aria-label="Toggle menu"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {mobileMenuOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
              </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {mobileMenuOpen && (
              <div className="lg:hidden py-3 border-t border-gray-200">
                <nav className="flex flex-col space-y-2">
                  {navLinks.map((link, index) => {
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={index}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`text-sm font-semibold transition-colors px-2 py-1.5 ${
                          isActive
                            ? 'text-primary bg-primary/20 rounded'
                            : 'text-gray-700 hover:text-primary'
                        }`}
                      >
                        {link.label}
                      </Link>
                    );
                  })}

                </nav>
              </div>
            )}
          </div>
        </div>
        </header>

        {/* Mega Menu for Oferta - Positioned absolutely below header */}
        <div
          className={`absolute left-0 right-0 top-full z-40 transition-all duration-300 ${
            megaMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
          }`}
          onMouseEnter={() => setMegaMenuOpen(true)}
        >
          <MegaMenu items={megaMenuItems} isOpen={megaMenuOpen} />
        </div>
      </div>
    </div>
  );
}

