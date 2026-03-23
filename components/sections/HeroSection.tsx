'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/components/ui';

export interface HeroSectionProps {
  tagline: string;
  title: string;
  subtitle: string;
  primaryButton: { text: string; href: string };
  images: Array<{ src: string; alt: string }>;
  mobileImages?: Array<{ src: string; alt: string }>;
  // Backward compatibility - single image converted to array
  backgroundImage?: string;
}

export function HeroSection({
  tagline,
  title,
  subtitle,
  primaryButton,
  images: imagesProp,
  mobileImages: mobileImagesProp,
  backgroundImage,
}: HeroSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Support both single backgroundImage and images array
  const images = imagesProp?.length
    ? imagesProp
    : backgroundImage
      ? [{ src: backgroundImage, alt: 'Hero background' }]
      : [{ src: '/slide-1.webp', alt: 'Hero background' }];

  // Mobile images — fallback to desktop images
  const mobileImages = mobileImagesProp?.length ? mobileImagesProp : images;

  // Track per-slide activation key — only changes when a slide BECOMES active,
  // not when it becomes inactive (so outgoing zoom animation keeps running).
  const [slideKeys, setSlideKeys] = useState<number[]>(() =>
    images.map((_, i) => (i === 0 ? 1 : 0))
  );

  useEffect(() => {
    setSlideKeys((prev) => {
      const next = [...prev];
      next[currentIndex] = Date.now();
      return next;
    });
  }, [currentIndex]);

  // Auto-advance every 4 seconds
  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <>
      {/* ====== MOBILE: obraz na gorze (do samej gory ekranu), tekst pod spodem ====== */}
      <div className="md:hidden -mt-[96px]">
        {/* Obraz - full-width, wjezdza pod sticky header */}
        <div className="relative h-[50vh] overflow-hidden">
          {mobileImages.map((image, index) => (
            <div
              key={`m-${index}`}
              className="absolute inset-0"
              style={{
                opacity: index === currentIndex ? 1 : 0,
                transition: 'opacity 1.2s ease-in-out',
              }}
            >
              <div
                className="absolute inset-0"
                key={`m-zoom-${index}-${slideKeys[index]}`}
                style={{
                  animation: 'kenBurnsZoom 6s linear forwards',
                }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  sizes="100vw"
                  quality={60}
                />
              </div>
            </div>
          ))}
          {/* Cinematic Overlay - jak na desktop */}
          <div className="absolute inset-0 z-[1]">
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/30 via-transparent to-zinc-900/50" />
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/80 via-zinc-900/20 to-transparent" />
          </div>
          <div
            className="absolute inset-0 z-[2] pointer-events-none"
            style={{ boxShadow: 'inset 0 0 60px 20px rgba(0,0,0,0.45)' }}
          />
        </div>

        {/* Tekst + CTA pod obrazem */}
        <div className="px-4 pt-3 pb-8 relative z-10 bg-background-beige text-center">
          <span
            className="text-primary font-bold text-xs uppercase tracking-[0.2em] mb-2 block opacity-0"
            style={{ animation: 'fadeIn 0.5s ease-out 0.3s forwards' }}
          >
            {tagline}
          </span>

          <h1
            className="text-[29px] font-black text-zinc-900 leading-[1.05] mb-3 opacity-0"
            style={{ animation: 'heroTextIn 0.8s ease-out 0.4s forwards' }}
          >
            {title.split(' ').slice(0, -1).join(' ')}{' '}
            <span className="text-primary">{title.split(' ').slice(-1)}</span>
          </h1>

          <p
            className="text-base text-zinc-500 leading-relaxed mb-5 opacity-0"
            style={{ animation: 'fadeIn 0.5s ease-out 0.5s forwards' }}
          >
            {subtitle}
          </p>

          <div
            className="flex flex-col items-center gap-2.5 opacity-0"
            style={{ animation: 'heroTextIn 0.5s ease-out 0.7s forwards' }}
          >
            <Link
              href="/wycena"
              className="inline-flex items-center justify-center gap-1.5 bg-primary text-zinc-900 font-bold py-2.5 rounded-sm text-sm w-full max-w-[280px] uppercase tracking-wider"
            >
              Darmowa wycena
            </Link>
            <Link
              href={primaryButton.href}
              className="group inline-flex items-center justify-center gap-1.5 bg-zinc-900 text-white font-bold py-2.5 rounded-sm text-sm w-full max-w-[280px] uppercase tracking-wider"
            >
              {primaryButton.text}
              <Icon name="arrowRight" size="sm" className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* ====== DESKTOP: oryginalne hero (obraz + tekst overlay) ====== */}
      <div className="hidden md:block px-4 md:px-[50px] mt-3 md:mt-6 mb-3 md:mb-6">
        <section className="relative min-h-[53vh] flex flex-col justify-center overflow-hidden bg-zinc-900 rounded-2xl">
          {/* Background Images with Zoom & Fade - Ken Burns style */}
          {images.map((image, index) => (
            <div
              key={`d-${index}`}
              className="absolute inset-0"
              style={{
                opacity: index === currentIndex ? 1 : 0,
                transition: 'opacity 1.2s ease-in-out',
              }}
            >
              <div
                className="absolute inset-0"
                key={`zoom-${index}-${slideKeys[index]}`}
                style={{
                  animation: 'kenBurnsZoom 6s linear forwards',
                }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  sizes="100vw"
                  quality={60}
                />
              </div>
            </div>
          ))}

          {/* Cinematic Overlay */}
          <div className="absolute inset-0 z-[1]">
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/30 via-transparent to-zinc-900/50" />
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/95 via-zinc-900/20 to-transparent" />
          </div>

          {/* Static Vignette */}
          <div
            className="absolute inset-0 z-[2] pointer-events-none rounded-2xl"
            style={{ boxShadow: 'inset 0 0 90px 30px rgba(0,0,0,0.55)' }}
          />

          {/* Content */}
          <div className="container mx-auto px-10 relative z-10 py-12">
            <div className="max-w-2xl">
              <div
                className="opacity-0"
                style={{ animation: 'heroTextIn 0.8s ease-out 0.3s forwards' }}
              >
                <span className="text-primary font-bold text-xs uppercase tracking-[0.3em] mb-4 block">
                  {tagline}
                </span>
              </div>

              <h1
                className="text-4xl lg:text-5xl font-black text-white leading-[0.95] mb-4 opacity-0"
                style={{ animation: 'heroTextIn 1s ease-out 0.5s forwards' }}
              >
                {title.split(' ').slice(0, -1).join(' ')}{' '}
                <span className="text-primary">{title.split(' ').slice(-1)}</span>
              </h1>

              <p
                className="text-base text-white/60 max-w-lg mb-6 leading-relaxed opacity-0"
                style={{ animation: 'fadeIn 0.6s ease-out 0.6s forwards' }}
              >
                {subtitle}
              </p>

              <div
                className="opacity-0"
                style={{ animation: 'heroTextIn 0.6s ease-out 1s forwards' }}
              >
                <Link
                  href={primaryButton.href}
                  className="group inline-flex items-center gap-2 bg-white text-zinc-900 font-bold px-5 py-2.5 rounded-full hover:bg-primary transition-colors duration-300 text-sm"
                >
                  {primaryButton.text}
                  <Icon name="arrowRight" size="sm" className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* Circular Progress Indicators */}
          {images.length > 1 && (
            <div
              className="absolute bottom-6 right-6 z-20 flex flex-col gap-2.5 opacity-0"
              style={{ animation: 'fadeIn 0.6s ease-out 1.2s forwards' }}
            >
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className="relative w-10 h-10 rounded-full group"
                >
                  <svg className="w-10 h-10 -rotate-90">
                    <circle
                      cx="20"
                      cy="20"
                      r="16"
                      fill="none"
                      stroke="rgba(255,255,255,0.15)"
                      strokeWidth="2"
                    />
                    {index === currentIndex && (
                      <circle
                        key={currentIndex}
                        cx="20"
                        cy="20"
                        r="16"
                        fill="none"
                        stroke="#dfbb68"
                        strokeWidth="2.5"
                        strokeDasharray="100"
                        strokeDashoffset="100"
                        style={{
                          animation: 'circleProgress 4s linear forwards',
                        }}
                      />
                    )}
                  </svg>
                  <span
                    className={`absolute inset-0 flex items-center justify-center text-sm font-bold transition-colors duration-300 ${
                      index === currentIndex ? 'text-primary' : 'text-white/50 group-hover:text-white/80'
                    }`}
                  >
                    {index + 1}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Bottom Gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-18 bg-gradient-to-t from-zinc-900 to-transparent z-[3] rounded-b-2xl" />
        </section>
      </div>
    </>
  );
}
