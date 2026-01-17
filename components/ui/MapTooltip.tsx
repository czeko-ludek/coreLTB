'use client';

import React from 'react';
import { clsx } from 'clsx';
import { Icon } from './Icon';
import { getCityById } from '@/data/map-data';

interface MapTooltipProps {
  cityId: string;
  position: { x: number; y: number };
  className?: string;
}

/**
 * MapTooltip - Tooltip displayed when hovering over a city on the map
 *
 * Shows city name and whether it has a dedicated page or is "coming soon"
 */
export function MapTooltip({ cityId, position, className }: MapTooltipProps) {
  const city = getCityById(cityId);

  if (!city) return null;

  return (
    <div
      className={clsx('map-tooltip animate-fade-in-up', className)}
      style={{
        left: position.x,
        top: position.y,
        animationDuration: '0.2s',
      }}
    >
      <p className="map-tooltip-title">{city.name}</p>
      {city.hasPage ? (
        <p className="map-tooltip-subtitle">
          <Icon name="arrowRight" size="sm" />
          <span>Kliknij, aby zobaczyć</span>
        </p>
      ) : (
        <p className="map-tooltip-subtitle coming-soon">
          <span>Strona w przygotowaniu</span>
        </p>
      )}
    </div>
  );
}

export default MapTooltip;
