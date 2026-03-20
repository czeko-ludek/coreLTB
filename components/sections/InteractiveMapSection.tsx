'use client';

import React, { useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useInView } from 'react-intersection-observer';
import { clsx } from 'clsx';
import { Icon } from '@/components/ui';
import { MapTooltip } from '@/components/ui/MapTooltip';
import { SectionHeader } from '@/components/shared';
import { PolandMapSVG } from '@/components/shared/PolandMapSVG';
import {
  VoivodeshipId,
  MapCity,
  mapVoivodeships,
  getVoivodeshipById,
} from '@/data/map-data';

/* CSS transition style for fade-in-up on scroll */
const cssTransitionStyle = {
  transitionProperty: 'opacity, transform',
  transitionDuration: '600ms',
  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
} as const;

interface InteractiveMapSectionProps {
  header: {
    label: string;
    title: string;
    description?: string;
  };
}

type MapView = 'overview' | 'zoomed';

interface TooltipState {
  cityId: string;
  position: { x: number; y: number };
}

/**
 * InteractiveMapSection - Hero section with interactive SVG map
 *
 * Features:
 * - 3 clickable voivodeships (śląskie, małopolskie, opolskie)
 * - Zoom on voivodeship click
 * - City markers with navigation to local pages
 * - Legend showing active vs coming soon
 * - Back button in zoomed mode
 * - Hidden on mobile (shows CityListSection instead)
 */
export function InteractiveMapSection({ header }: InteractiveMapSectionProps) {
  const router = useRouter();

  // CSS transition inView hooks
  const { ref: headerRef, inView: headerInView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: mapContainerRef, inView: mapContainerInView } = useInView({ triggerOnce: true, threshold: 0.15 });

  // Ref for tooltip positioning (non-transformed container)
  const tooltipContainerRef = useRef<HTMLDivElement>(null);

  // Map state
  const [view, setView] = useState<MapView>('overview');
  const [activeVoivodeship, setActiveVoivodeship] = useState<VoivodeshipId | null>(null);
  const [hoveredVoivodeship, setHoveredVoivodeship] = useState<VoivodeshipId | null>(null);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  // Handlers
  const handleVoivodeshipClick = useCallback((voivodeshipId: VoivodeshipId) => {
    if (view === 'overview') {
      // Click in overview mode - zoom to voivodeship
      setActiveVoivodeship(voivodeshipId);
      setView('zoomed');
      setHoveredVoivodeship(null);
    } else if (view === 'zoomed') {
      // Click in zoomed mode - return to overview
      setView('overview');
      setActiveVoivodeship(null);
      setTooltip(null);
    }
  }, [view]);

  const handleVoivodeshipHover = useCallback((voivodeshipId: VoivodeshipId | null) => {
    if (view === 'overview') {
      setHoveredVoivodeship(voivodeshipId);
    }
  }, [view]);

  const handleCityClick = useCallback((city: MapCity) => {
    if (city.hasPage && city.slug) {
      router.push(`/obszar-dzialania/${city.slug}`);
    }
  }, [router]);

  const handleCityHover = useCallback((cityId: string | null, position?: { x: number; y: number }) => {
    if (cityId && position) {
      setTooltip({ cityId, position });
    } else {
      setTooltip(null);
    }
  }, []);

  const handleBackClick = useCallback(() => {
    setView('overview');
    setActiveVoivodeship(null);
    setTooltip(null);
  }, []);

  // Get active voivodeship name for display
  const activeVoivName = activeVoivodeship
    ? getVoivodeshipById(activeVoivodeship)?.name
    : null;

  return (
    <section
      className="hidden lg:block bg-background-beige py-16 sm:py-20"
    >
      <div className="mx-auto max-w-[83rem] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={headerRef}
          className={clsx(
            'mb-12',
            headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
          )}
          style={cssTransitionStyle}
        >
          <SectionHeader
            label={header.label}
            title={header.title}
            description={header.description}
            align="center"
            theme="light"
          />
        </div>

        {/* Map Container */}
        <div
          ref={mapContainerRef}
          className={clsx(
            'relative bg-white rounded-3xl shadow-[0_0_20px_rgba(0,0,0,0.05)] overflow-hidden map-wrapper',
            mapContainerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
          )}
          style={cssTransitionStyle}
        >
          {/* Voivodeship Pills — always visible at top */}
          <div className="relative z-20 flex items-center justify-center gap-3 pt-5 pb-2 px-6">
            {mapVoivodeships.map((voiv) => {
              const isActive = activeVoivodeship === voiv.id;
              const isHovered = hoveredVoivodeship === voiv.id;

              return (
                <button
                  key={voiv.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleVoivodeshipClick(voiv.id);
                  }}
                  onMouseEnter={() => handleVoivodeshipHover(voiv.id)}
                  onMouseLeave={() => handleVoivodeshipHover(null)}
                  className={clsx(
                    'group flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer',
                    isActive
                      ? 'bg-primary text-white shadow-md'
                      : isHovered
                        ? 'bg-primary/15 text-primary'
                        : 'bg-gray-100 text-gray-600 hover:bg-primary/10 hover:text-primary',
                  )}
                >
                  <span
                    className={clsx(
                      'w-2 h-2 rounded-full transition-colors duration-200',
                      isActive
                        ? 'bg-white'
                        : isHovered
                          ? 'bg-primary'
                          : 'bg-gray-400 group-hover:bg-primary',
                    )}
                  />
                  <span>Woj. {voiv.name}</span>
                </button>
              );
            })}
          </div>

          {/* Back Button (zoomed mode only) */}
          {view === 'zoomed' && (
            <button
              onClick={handleBackClick}
              className={clsx(
                'map-back-button',
                'absolute top-4 left-4 z-20',
                'animate-[fadeIn_400ms_ease-out_forwards]',
              )}
            >
              <Icon name="chevronLeft" size="sm" />
              <span>Wszystkie województwa</span>
            </button>
          )}


          {/* SVG Map */}
          <div
            ref={tooltipContainerRef}
            className={clsx(
              'relative aspect-[16/9] p-6',
              mapContainerInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95',
            )}
            onClick={view === 'zoomed' ? handleBackClick : undefined}
            style={{
              cursor: view === 'zoomed' ? 'pointer' : 'default',
              transformOrigin: 'center center',
              transitionProperty: 'opacity, transform',
              transitionDuration: '600ms',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDelay: '150ms',
            }}
          >
            <PolandMapSVG
              view={view}
              activeVoivodeship={activeVoivodeship}
              hoveredVoivodeship={hoveredVoivodeship}
              hoveredCity={tooltip?.cityId ?? null}
              tooltipContainerRef={tooltipContainerRef}
              onVoivodeshipClick={handleVoivodeshipClick}
              onVoivodeshipHover={handleVoivodeshipHover}
              onCityClick={handleCityClick}
              onCityHover={handleCityHover}
            />

            {/* Voivodeship Name Label (hover state) */}
            {view === 'overview' && hoveredVoivodeship && (
              <div
                className="voivodeship-hover-label"
                data-voivodeship={hoveredVoivodeship}
              >
                {getVoivodeshipById(hoveredVoivodeship)?.name}
              </div>
            )}

            {/* Tooltip - rendered in non-transformed container */}
            {tooltip && view === 'zoomed' && (
              <MapTooltip cityId={tooltip.cityId} position={tooltip.position} />
            )}
          </div>


          {/* Instructions (overview mode) */}
          {view === 'overview' && (
            <div
              className={clsx(
                'absolute bottom-4 left-4 z-20',
                'px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full',
                'text-sm text-gray-500',
                'flex items-center gap-2'
              )}
            >
              <Icon name="mousePointer" size="sm" className="text-primary" />
              <span>Kliknij na województwo, aby zobaczyć miasta</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default InteractiveMapSection;
