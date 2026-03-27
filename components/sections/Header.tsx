'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Button, Icon } from '@/components/ui';
import { MegaMenu, MegaMenuItem } from '@/components/shared';
import { trackPhoneClick } from '@/lib/analytics';
export interface HeaderProps {
  topBar: {
    phone: string;
    email: string;
    socials?: Array<{ platform: 'facebook' | 'twitter' | 'instagram' | 'linkedin'; href: string }>;
  };
  logo: { src: string; alt: string };
  navLinks: Array<{ label: string; href: string }>;
  searchEnabled: boolean;
  ctaButton: { text: string; href: string };
  megaMenuItems?: MegaMenuItem[];
}

// Ikony dla linków nawigacji mobile
const navIconMap: Record<string, string> = {
  '/': 'home',
  '/o-nas': 'users',
  '/partnerzy': 'handshake',
  '/oferta': 'briefcase',
  '/projekty': 'building',
  '/baza-wiedzy': 'fileText',
  '/kontakt': 'mail',
};

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
  const [ofertaExpanded, setOfertaExpanded] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll state for header styling — hysteresis to prevent jitter.
  // The header padding change alters its height, which shifts content and
  // can push scrollY back across a single threshold, causing an infinite loop.
  // Solution: require crossing a HIGHER threshold to shrink, and a LOWER one to grow back.
  useEffect(() => {
    const SCROLL_DOWN_THRESHOLD = 80;  // shrink header after 80px
    const SCROLL_UP_THRESHOLD = 10;    // restore padding only near top

    const handleScroll = () => {
      const y = window.scrollY;
      setIsScrolled(prev => {
        if (!prev && y > SCROLL_DOWN_THRESHOLD) return true;
        if (prev && y < SCROLL_UP_THRESHOLD) return false;
        return prev;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open (works on iOS too)
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.inset = '0';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.inset = '';
      document.body.style.width = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.inset = '';
      document.body.style.width = '';
    };
  }, [mobileMenuOpen]);

  // Close mobile menu handler
  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  // Measure header height → CSS variable for sticky elements
  const headerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const update = () => {
      document.documentElement.style.setProperty('--header-height', `${el.offsetHeight}px`);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={headerRef}
      className={`sticky top-0 z-50 transition-[padding] duration-300 px-0 md:px-[50px] ${
        isScrolled ? '' : 'py-2 md:py-4'
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
        {/* Main Navigation */}
        <div className="bg-white">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between py-2 min-h-[72px] md:min-h-[107px]">
              {/* Logo - Responsive sizing */}
              <Link href="/" className="relative flex-shrink-0 w-[64px] h-[58px] md:w-[96px] md:h-[87px]">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  className="object-contain"
                  sizes="96px"
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
                  <button
                    aria-label="Szukaj"
                    className="text-primary hover:text-primary-dark transition-colors p-1.5"
                  >
                    <Icon name="search" size="md" />
                  </button>
                )}
                
                {/* Mobile: compact button */}
                <span className="lg:hidden">
                  <Button variant="primary" size="sm" href={ctaButton.href}>
                    Wycena
                  </Button>
                </span>
                {/* Desktop: full button with icon */}
                <span className="hidden lg:inline-flex">
                  <Button
                    variant="primary"
                    size="md"
                    href={ctaButton.href}
                    leftIcon={<Icon name="calculator" size="sm" />}
                  >
                    {ctaButton.text}
                  </Button>
                </span>

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

          </div>
        </div>
        </header>

        {/* Mobile Menu - Slide-in drawer z lewej */}
        {/* Overlay tło */}
        <div
          className={`fixed inset-0 bg-black/40 z-[60] lg:hidden transition-opacity duration-300 ${
            mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={closeMobileMenu}
        />

        {/* Drawer */}
        <div
          className={`fixed top-0 right-0 bottom-0 w-full bg-white z-[70] lg:hidden
            shadow-2xl flex flex-col
            transition-transform duration-300 ease-out
            ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
          `}
        >
          {/* Logo + zamknij */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
            <Link href="/" onClick={closeMobileMenu} className="relative w-[56px] h-[50px]">
              <Image src={logo.src} alt={logo.alt} fill className="object-contain" sizes="56px" />
            </Link>
            <button
              onClick={closeMobileMenu}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
              aria-label="Zamknij menu"
            >
              <Icon name="x" size="md" />
            </button>
          </div>

          {/* Nawigacja — scrollowalna */}
          <nav className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 flex flex-col gap-0.5">
            {navLinks.filter(link => link.href !== '/').map((link, index) => {
              const isActive = pathname === link.href || (link.href === '/oferta' && pathname.startsWith('/oferta'));
              const isOferta = link.href === '/oferta';
              const iconName = navIconMap[link.href] || 'arrowRight';

              if (isOferta && megaMenuItems.length > 0) {
                return (
                  <div key={index}>
                    {/* Oferta — klik rozwija/zwija submenu */}
                    <button
                      onClick={() => setOfertaExpanded(!ofertaExpanded)}
                      className={`w-full flex items-center justify-between px-3 py-3 rounded-lg text-[15px] font-semibold transition-colors ${
                        isActive ? 'text-primary bg-primary/5' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon name={iconName as import('@/components/ui').IconName} size="md" className={isActive ? 'text-primary' : 'text-gray-400'} />
                        {link.label}
                      </div>
                      <Icon
                        name="chevronDown"
                        size="sm"
                        className={`text-gray-400 transition-transform duration-200 ${ofertaExpanded ? 'rotate-180' : ''}`}
                      />
                    </button>

                    {/* Rozwinięte podkategorie */}
                    <div className={`overflow-hidden transition-all duration-300 ${
                      ofertaExpanded ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="ml-5 pl-3 border-l-2 border-primary/20 py-1 flex flex-col gap-0.5">
                        {megaMenuItems.map((item, subIndex) => (
                          <Link
                            key={subIndex}
                            href={item.href}
                            onClick={closeMobileMenu}
                            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                              pathname === item.href
                                ? 'text-primary bg-primary/5'
                                : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                            }`}
                          >
                            <Icon name={item.icon as import('@/components/ui').IconName} size="sm" className={pathname === item.href ? 'text-primary' : 'text-gray-400'} />
                            {item.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={index}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className={`flex items-center gap-3 px-3 py-3 rounded-lg text-[15px] font-semibold transition-colors ${
                    isActive ? 'text-primary bg-primary/5' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon name={iconName as import('@/components/ui').IconName} size="md" className={isActive ? 'text-primary' : 'text-gray-400'} />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA + kontakt — zawsze na dole */}
          <div className="flex-shrink-0 px-5 py-4 border-t border-gray-100 bg-gray-50/80">
            <Link
              href="/wycena"
              onClick={closeMobileMenu}
              className="flex items-center justify-center gap-2 w-full bg-primary text-zinc-900 font-bold py-3 rounded-xl text-[15px] mb-3"
            >
              <Icon name="calculator" size="sm" />
              Darmowa wycena
            </Link>
            <div className="flex gap-2">
              <a
                href={`tel:${topBar.phone.replace(/\s/g, '')}`}
                onClick={() => trackPhoneClick('header-mobile')}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white border border-gray-200 text-sm font-semibold text-gray-700 hover:border-primary/30 transition-colors"
              >
                <Icon name="phone" size="sm" className="text-primary" />
                Zadzwoń
              </a>
              <a
                href={`mailto:${topBar.email}`}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white border border-gray-200 text-sm font-semibold text-gray-700 hover:border-primary/30 transition-colors"
              >
                <Icon name="mail" size="sm" className="text-primary" />
                Napisz
              </a>
            </div>
          </div>
        </div>

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

