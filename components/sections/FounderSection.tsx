'use client';

import React from 'react';
import { useInView } from 'react-intersection-observer';
import clsx from 'clsx';
import { Icon } from '@/components/ui';

interface CareerMilestone {
  role: string;
  place: string;
  description: string;
}

const MILESTONES: CareerMilestone[] = [
  {
    role: 'Projektant',
    place: 'Początek kariery zawodowej',
    description:
      'Karierę zawodową rozpoczął jako projektant budowlany. Wiedzę praktyczną zdobywał jednak znacznie wcześniej — od najmłodszych lat towarzyszył na budowach swojej matce, mgr inż. Barbarze Lędzkiej, projektantce i kierownikowi budowy. To pod jej okiem uczył się projektowania i zarządzania procesem budowlanym.',
  },
  {
    role: 'Inspektor Nadzoru Budowlanego',
    place: 'PINB Jaworzno',
    description:
      'Na stanowisku Inspektora w Powiatowym Inspektoracie Nadzoru Budowlanego w Jaworznie rozpatrywał sprawy z zakresu prawa budowlanego i prowadził postępowania administracyjne. To doświadczenie dało mu dogłębną znajomość przepisów i procedur, z których korzysta do dziś.',
  },
  {
    role: 'Inżynier Budowy — deweloperka mieszkaniowa',
    place: 'Olkusz i Sosnowiec',
    description:
      'Jako bezpośrednie wsparcie Kierownika Budowy i Kierownika Projektu przy realizacjach deweloperskich odpowiadał za rozdzielanie prac ekip wykonawczych oraz współudział w planowaniu harmonogramów robót.',
  },
  {
    role: 'Inżynier Budowy — budownictwo wysokościowe',
    place: 'Cavatina Global Office Park, Katowice',
    description:
      'Budynek biurowy o wysokości ponad 100 metrów w ścisłym centrum Katowic. Tempo realizacji: jedno piętro w tydzień. Wymagający projekt pod względem logistyki, bezpieczeństwa i koordynacji branż w warunkach gęstej zabudowy miejskiej.',
  },
  {
    role: 'Inżynier Budowy — hale magazynowo-logistyczne',
    place: 'Goldbeck GmbH, delegacje krajowe',
    description:
      'Realizacja obiektów o powierzchniach powyżej 20 000 m² samych hal, plus place manewrowe i parkingi. Praca w delegacjach na budowach rozłożonych po całym kraju, wymagająca samodzielności i sprawnej koordynacji dużych zespołów.',
  },
  {
    role: 'Regionalny Menadżer Techniczny',
    place: 'Budownictwo jednorodzinne, Śląsk',
    description:
      'Pełna odpowiedzialność za procesy budowlane w regionie — od organizacji ekip, przez nadzór jakości, po rozliczenia z inwestorami. Wszystkie decyzje techniczne i operacyjne spoczywały bezpośrednio na jego barkach.',
  },
  {
    role: 'Kierownik Robót — konstrukcje aluminiowe',
    place: 'Subopol',
    description:
      'Montaż ślusarki aluminiowej i fasad aluminiowych. Uzupełnienie kompetencji o specjalistyczną wiedzę z zakresu systemów elewacyjnych i przeszkleń wielkogabarytowych.',
  },
];

export function FounderSection() {
  const { ref, inView } = useInView({
    threshold: 0.05,
    triggerOnce: true,
  });

  return (
    <section ref={ref} className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[80rem] px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <span
            className={clsx(
              'inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-6',
              inView ? 'animate-fade-in-up' : 'opacity-0'
            )}
            style={{ animationDelay: '0.1s' }}
          >
            Założyciel
          </span>

          <h2
            className={clsx(
              'text-h3 md:text-h2 lg:text-display font-bold font-heading text-zinc-900 leading-[1.1] mb-6',
              inView ? 'animate-fade-in-up' : 'opacity-0'
            )}
            style={{ animationDelay: '0.2s' }}
          >
            Tomasz Lędzki
            <span className="block text-primary mt-1">mgr inż. budownictwa</span>
          </h2>

          <p
            className={clsx(
              'text-base md:text-lg text-zinc-600 leading-relaxed',
              inView ? 'animate-fade-in-up' : 'opacity-0'
            )}
            style={{ animationDelay: '0.3s' }}
          >
            Prezes CoreLTB Builders. Inżynier z wieloletnim doświadczeniem zdobywanym
            na budowach od budownictwa jednorodzinnego, przez deweloperskie, wysokościowe,
            po wielkopowierzchniowe hale logistyczne. Każdy etap kariery wniósł konkretne
            kompetencje, które dziś przekłada na bezpieczeństwo i jakość realizacji dla
            inwestorów indywidualnych.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line — desktop only */}
          <div className="hidden lg:block absolute left-[23px] top-4 bottom-4 w-px bg-gradient-to-b from-primary/40 via-primary/20 to-transparent" />

          <div className="space-y-6 lg:space-y-8">
            {MILESTONES.map((milestone, index) => (
              <div
                key={index}
                className={clsx(
                  'group relative',
                  inView ? 'animate-fade-in-up' : 'opacity-0'
                )}
                style={{ animationDelay: `${0.4 + index * 0.08}s` }}
              >
                <div className="flex gap-5 lg:gap-8">
                  {/* Timeline dot */}
                  <div className="hidden lg:flex flex-shrink-0 w-[47px] items-start pt-1">
                    <div className="w-[11px] h-[11px] rounded-full bg-primary ring-4 ring-primary/10 group-hover:ring-primary/25 transition-all duration-300" />
                  </div>

                  {/* Card */}
                  <div className="flex-1 bg-zinc-50 rounded-2xl border border-zinc-200/60 p-6 md:p-8 group-hover:shadow-md group-hover:border-primary/20 transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4 mb-3">
                      <h3 className="text-lg font-bold font-heading text-zinc-900 group-hover:text-primary transition-colors duration-300">
                        {milestone.role}
                      </h3>
                      <span className="text-sm text-primary font-medium flex-shrink-0">
                        {milestone.place}
                      </span>
                    </div>
                    <p className="text-sm md:text-base text-zinc-600 leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CoreLTB Vision — summary card */}
        <div
          className={clsx(
            'mt-10 lg:mt-14 bg-zinc-900 rounded-2xl p-8 sm:p-10 lg:p-12',
            'flex flex-col sm:flex-row items-start gap-6 sm:gap-10',
            inView ? 'animate-fade-in-up' : 'opacity-0'
          )}
          style={{ animationDelay: '1s' }}
        >
          {/* Icon */}
          <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-primary flex items-center justify-center">
            <Icon name="shieldCheck" size="lg" className="text-white" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="text-xl sm:text-2xl font-bold font-heading text-white mb-3 leading-tight">
              Dlaczego CoreLTB Builders?
            </h3>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed mb-4">
              Suma tych doświadczeń — od nadzoru budowlanego, przez wieżowce i hale logistyczne,
              po budownictwo jednorodzinne — doprowadziła do utworzenia CoreLTB Builders.
              Miejsca, w którym inwestor otrzymuje kompleksową obsługę na każdym etapie:
              od projektu, przez budowę i wykończenie wnętrz, po pełne zagospodarowanie terenu.
            </p>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
              CoreLTB to bezpieczne miejsce dla inwestora — oparte na realnej wiedzy
              inżynierskiej, sprawdzonych procesach i osobistym zaangażowaniu Tomasza
              Lędzkiego w każdą realizację.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
