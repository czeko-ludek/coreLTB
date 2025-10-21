'use client';

import React from 'react';
import { Icon, IconName } from '@/components/ui';
import { clsx } from 'clsx';

export interface TimelineNavItem {
  id: string;
  number: number;
  icon: IconName;
  label: string;
}

export interface TimelineNavProps {
  items: TimelineNavItem[];
  activeStep: number;
}

export function TimelineNav({ items, activeStep }: TimelineNavProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Offset dla sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav
      className="mb-16 md:mb-20"
      aria-label="Etapy współpracy"
    >
      {/* Biały kontener dla nawigacji */}
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
        {/* Kontener z linią w tle */}
        <div className="relative">
          {/* Złota linia łącząca na desktop (ukryta na mobile) */}
          <div className="hidden md:block absolute top-6 md:top-7 left-0 right-0 h-0.5 bg-primary/30"
               style={{ margin: '0 7%' }} />

          {/* Desktop & Mobile - grid with labels below */}
          <div className="relative grid grid-cols-4 md:grid-cols-8 gap-3 md:gap-4">
            {items.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className="flex flex-col items-center gap-2"
                aria-label={`${item.label} (Etap ${item.number})`}
                aria-current={activeStep === item.number ? 'step' : undefined}
              >
                <div
                  className={clsx(
                    'flex items-center justify-center',
                    'w-12 h-12 md:w-14 md:h-14 rounded-full border-2',
                    'transition-all duration-300 relative z-10',
                    activeStep === item.number
                      ? 'bg-primary border-primary text-white shadow-lg scale-110'
                      : 'bg-white border-gray-300 text-gray-600 hover:border-primary hover:text-primary hover:scale-105'
                  )}
                >
                  <Icon
                    name={item.icon}
                    size="sm"
                    className={clsx(
                      'transition-colors duration-300',
                      activeStep === item.number ? 'text-white' : ''
                    )}
                  />
                </div>
                <span
                  className={clsx(
                    'text-xs md:text-sm font-medium text-center leading-tight',
                    activeStep === item.number ? 'text-primary' : 'text-gray-600'
                  )}
                >
                  {item.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
