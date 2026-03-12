'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  watermarkText?: string;
  breadcrumbs?: Array<{ label: string; href: string }>;
  backgroundImage: string;
}

export function PageHeader({
  title,
  subtitle,
  backgroundImage,
}: PageHeaderProps) {
  return (
    <div className="px-4 md:px-[50px] mt-8">
      <section className="relative h-[350px] md:h-[450px] overflow-hidden rounded-3xl shadow-2xl">
        {/* 1. Background Image with zoom animation */}
        <Image
          src={backgroundImage}
          alt={title}
          fill
          className="object-cover animate-hero-zoom"
          priority
          fetchPriority="high"
          sizes="100vw"
        />

        {/* 2. Dark Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* 3. Centered Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 leading-tight px-2"
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl px-2"
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        {/* 4. Decorative Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/50 to-transparent" />
      </section>
    </div>
  );
}
