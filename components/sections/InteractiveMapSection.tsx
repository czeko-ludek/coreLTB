'use client';

import React, { useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { Icon } from '@/components/ui';
import { MapTooltip } from '@/components/ui/MapTooltip';
import { SectionHeader } from '@/components/shared';
import { PolandMapSVG } from '@/components/shared/PolandMapSVG';
import {
  VoivodeshipId,
  MapCity,
  getVoivodeshipById,
  getMapStats,
} from '@/data/map-data';
import {
  fadeInUp,
  scaleIn,
  fadeIn,
  viewportConfig,
} from '@/lib/animations';

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

  // Ref for tooltip positioning (non-transformed container)
  const tooltipContainerRef = useRef<HTMLDivElement>(null);

  // Map state
  const [view, setView] = useState<MapView>('overview');
  const [activeVoivodeship, setActiveVoivodeship] = useState<VoivodeshipId | null>(null);
  const [hoveredVoivodeship, setHoveredVoivodeship] = useState<VoivodeshipId | null>(null);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  // Get map stats for legend
  const stats = getMapStats();

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

  // Custom viewport config for this section (threshold 0.2)
  const mapViewportConfig = {
    once: true,
    margin: '-50px 0px',
    amount: 0.2,
  };

  return (
    <section
      ref={sectionRef}
      className="hidden lg:block bg-background-beige py-16 sm:py-20"
    >
      <div className="mx-auto max-w-[83rem] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="mb-12"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={mapViewportConfig}
        >
          <SectionHeader
            label={header.label}
            title={header.title}
            description={header.description}
            align="center"
            theme="light"
          />
        </motion.div>

        {/* Map Container */}
        <motion.div
          className="relative bg-white rounded-3xl shadow-[0_0_20px_rgba(0,0,0,0.05)] overflow-hidden map-wrapper"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={mapViewportConfig}
        >
          {/* Back Button (zoomed mode only) */}
          {view === 'zoomed' && (
            <motion.button
              onClick={handleBackClick}
              className={clsx(
                'map-back-button',
                'absolute top-4 left-4 z-20'
              )}
              variants={fadeIn}
              initial="hidden"
              animate="visible"
            >
              <Icon name="chevronLeft" size="sm" />
              <span>Wszystkie województwa</span>
            </motion.button>
          )}

          {/* Active Voivodeship Name (zoomed mode) */}
          {view === 'zoomed' && activeVoivName && (
            <motion.div
              className={clsx(
                'absolute top-4 left-1/2 -translate-x-1/2 z-20',
                'px-4 py-2 bg-primary/10 rounded-full',
                'text-sm font-bold text-primary uppercase tracking-wider'
              )}
              variants={fadeIn}
              initial="hidden"
              animate="visible"
            >
              Województwo {activeVoivName}
            </motion.div>
          )}

          {/* SVG Map */}
          <motion.div
            ref={tooltipContainerRef}
            className="relative aspect-[16/9] p-6"
            onClick={view === 'zoomed' ? handleBackClick : undefined}
            style={{
              cursor: view === 'zoomed' ? 'pointer' : 'default',
              transformOrigin: 'center center'
            }}
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
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
          </motion.div>

          {/* Legend */}
          <div className="absolute bottom-4 right-4 z-20">
            <div className="map-legend">
              <div className="map-legend-item">
                <span className="map-legend-dot active" />
                <span className="map-legend-text">
                  Aktywne strony ({stats.citiesWithPages})
                </span>
              </div>
              <div className="map-legend-item">
                <span className="map-legend-dot coming-soon" />
                <span className="map-legend-text">
                  Wkrótce ({stats.citiesComingSoon})
                </span>
              </div>
            </div>
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
        </motion.div>
      </div>
    </section>
  );
}

export default InteractiveMapSection;
