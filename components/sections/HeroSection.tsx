'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
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

  // Auto-advance every 4 seconds (synced with Ken Burns animation)
  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <>
      {/* ====== MOBILE: obraz na górze (do samej góry ekranu), tekst pod spodem ====== */}
      <div className="md:hidden -mt-[96px]">
        {/* Obraz - full-width, wjeżdża pod sticky header (88px = header 72px + py-2 padding 16px) */}
        <div className="relative h-[50vh] overflow-hidden">
          {mobileImages.map((image, index) => (
            <motion.div
              key={`m-${index}-${currentIndex === index ? 'active' : 'inactive'}`}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: index === currentIndex ? 1 : 0 }}
              transition={{ opacity: { duration: 1.2, ease: 'easeInOut' } }}
            >
              <motion.div
                className="absolute inset-0"
                initial={{ scale: 1.0 }}
                animate={index === currentIndex ? { scale: 1.15 } : { scale: 1.0 }}
                transition={{ scale: { duration: 4, ease: 'linear' } }}
                key={`m-zoom-${index}-${currentIndex}`}
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
              </motion.div>
            </motion.div>
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
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-primary font-bold text-xs uppercase tracking-[0.2em] mb-2 block"
          >
            {tagline}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-[29px] font-black text-zinc-900 leading-[1.05] mb-3"
          >
            {title.split(' ').slice(0, -1).join(' ')}{' '}
            <span className="text-primary">{title.split(' ').slice(-1)}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-base text-zinc-500 leading-relaxed mb-5"
          >
            {subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col items-center gap-2.5"
          >
            <Link
              href="/kontakt"
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
          </motion.div>
        </div>
      </div>

      {/* ====== DESKTOP: oryginalne hero (obraz + tekst overlay) ====== */}
      <div className="hidden md:block px-4 md:px-[50px] mt-3 md:mt-6 mb-3 md:mb-6">
        <section className="relative min-h-[53vh] flex flex-col justify-center overflow-hidden bg-zinc-900 rounded-2xl">
          {/* Background Images with Zoom & Fade - Ken Burns style */}
          {images.map((image, index) => (
            <motion.div
              key={`${index}-${currentIndex === index ? 'active' : 'inactive'}`}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{
                opacity: index === currentIndex ? 1 : 0,
              }}
              transition={{
                opacity: { duration: 1.2, ease: 'easeInOut' },
              }}
            >
              <motion.div
                className="absolute inset-0"
                initial={{ scale: 1.0 }}
                animate={index === currentIndex ? { scale: 1.15 } : { scale: 1.0 }}
                transition={{
                  scale: { duration: 4, ease: 'linear' },
                }}
                key={`zoom-${index}-${currentIndex}`}
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
              </motion.div>
            </motion.div>
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
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <span className="text-primary font-bold text-xs uppercase tracking-[0.3em] mb-4 block">
                  {tagline}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="text-4xl lg:text-5xl font-black text-white leading-[0.95] mb-4"
              >
                {title.split(' ').slice(0, -1).join(' ')}{' '}
                <span className="text-primary">{title.split(' ').slice(-1)}</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="text-base text-white/60 max-w-lg mb-6 leading-relaxed"
              >
                {subtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
              >
                <Link
                  href={primaryButton.href}
                  className="group inline-flex items-center gap-2 bg-white text-zinc-900 font-bold px-5 py-2.5 rounded-full hover:bg-primary transition-colors duration-300 text-sm"
                >
                  {primaryButton.text}
                  <Icon name="arrowRight" size="sm" className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Circular Progress Indicators */}
          {images.length > 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="absolute bottom-6 right-6 z-20 flex flex-col gap-2.5"
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
                      <motion.circle
                        cx="20"
                        cy="20"
                        r="16"
                        fill="none"
                        stroke="#dfbb68"
                        strokeWidth="2.5"
                        strokeDasharray="100"
                        initial={{ strokeDashoffset: 100 }}
                        animate={{ strokeDashoffset: 0 }}
                        transition={{ duration: 4, ease: 'linear' }}
                        key={currentIndex}
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
            </motion.div>
          )}

          {/* Bottom Gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-18 bg-gradient-to-t from-zinc-900 to-transparent z-[3] rounded-b-2xl" />
        </section>
      </div>
    </>
  );
}
