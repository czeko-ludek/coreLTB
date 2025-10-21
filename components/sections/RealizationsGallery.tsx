'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { SectionLabel, Icon } from '@/components/ui';

export interface Realization {
  image: string;
  alt: string;
  title?: string;
  location?: string;
}

export interface RealizationsGalleryProps {
  realizations: Realization[];
}

/**
 * RealizationsGallery - Organizm
 *
 * Galeria zdjęć z realizowanych budów. Pokazuje konkretne przykłady prac firmy.
 * Kluczowy element proof - wizualne potwierdzenie doświadczenia.
 *
 * Cechy:
 * - Biała tło
 * - Responsywna siatka (1 col mobile, 2 tablet, 3 desktop)
 * - Efekt hover na obrazach
 * - Opcjonalne tytuły i lokalizacje
 */
export function RealizationsGallery({
  realizations,
}: RealizationsGalleryProps) {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <SectionLabel>Realizacje</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary mt-4">
            Nasze budowy – zobacz efekty naszej pracy
          </h2>
          <p className="text-base md:text-lg text-text-secondary mt-6 max-w-3xl mx-auto">
            Regularnie publikujemy zdjęcia z naszych budów. Zobacz, jak powstają domy
            krok po kroku i przekonaj się o jakości naszego wykonawstwa.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {realizations.map((realization, index) => (
            <div
              key={index}
              className="
                group
                bg-background rounded-xl overflow-hidden
                shadow-lg
                transition-all duration-300 ease-out
                hover:shadow-2xl hover:-translate-y-2
              "
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={realization.image}
                  alt={realization.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Info (if title or location exists) */}
              {(realization.title || realization.location) && (
                <div className="p-4 md:p-6">
                  {realization.title && (
                    <h4 className="text-lg font-bold text-text-primary mb-1">
                      {realization.title}
                    </h4>
                  )}
                  {realization.location && (
                    <div className="flex items-center gap-2 text-sm text-text-secondary">
                      <Icon name="mapPin" size="sm" className="text-primary" />
                      <span>{realization.location}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
