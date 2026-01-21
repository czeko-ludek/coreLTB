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
  // Backward compatibility - single image converted to array
  backgroundImage?: string;
}

export function HeroSection({
  tagline,
  title,
  subtitle,
  primaryButton,
  images: imagesProp,
  backgroundImage,
}: HeroSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Support both single backgroundImage and images array
  const images = imagesProp?.length
    ? imagesProp
    : backgroundImage
      ? [{ src: backgroundImage, alt: 'Hero background' }]
      : [{ src: '/slide-1.webp', alt: 'Hero background' }];

  // Auto-advance every 4 seconds (synced with Ken Burns animation)
  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="px-4 md:px-[50px] mt-4 md:mt-8">
      <section className="relative min-h-[500px] md:min-h-[70vh] flex flex-col justify-center overflow-hidden bg-zinc-900 rounded-2xl">
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
              />
            </motion.div>
          </motion.div>
        ))}

        {/* Cinematic Overlay - Strong left only, right side fully visible */}
        <div className="absolute inset-0 z-[1]">
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/30 via-transparent to-zinc-900/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/95 via-zinc-900/20 to-transparent" />
        </div>

        {/* Static Vignette - no animation for better performance */}
        <div
          className="absolute inset-0 z-[2] pointer-events-none rounded-2xl"
          style={{ boxShadow: 'inset 0 0 120px 40px rgba(0,0,0,0.55)' }}
        />

        {/* Content */}
        <div className="container mx-auto px-6 md:px-10 relative z-10 py-12 md:py-16">
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
              className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-[0.95] mb-5"
            >
              {title.split(' ').slice(0, -1).join(' ')}
              <br />
              <span className="text-primary">{title.split(' ').slice(-1)}</span>
            </motion.h1>

            {/* LCP Element - No animation, visible immediately for best LCP score */}
            <p className="text-lg text-white/60 max-w-lg mb-8 leading-relaxed">
              {subtitle}
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <Link
                href={primaryButton.href}
                className="group inline-flex items-center gap-2 bg-white text-zinc-900 font-bold px-6 py-3 rounded-full hover:bg-primary transition-colors duration-300 text-sm"
              >
                {primaryButton.text}
                <Icon name="arrowRight" size="sm" className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Circular Progress Indicators - Bottom Right, Vertical */}
        {images.length > 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="absolute bottom-8 right-8 z-20 flex flex-col gap-3"
          >
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className="relative w-12 h-12 rounded-full group"
              >
                <svg className="w-12 h-12 -rotate-90">
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    fill="none"
                    stroke="rgba(255,255,255,0.15)"
                    strokeWidth="2"
                  />
                  {index === currentIndex && (
                    <motion.circle
                      cx="24"
                      cy="24"
                      r="20"
                      fill="none"
                      stroke="#dfbb68"
                      strokeWidth="2.5"
                      strokeDasharray="126"
                      initial={{ strokeDashoffset: 126 }}
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
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-zinc-900 to-transparent z-[3] rounded-b-2xl" />
      </section>
    </div>
  );
}
