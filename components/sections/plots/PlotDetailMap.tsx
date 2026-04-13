'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import 'leaflet/dist/leaflet.css';
import { Icon } from '@/components/ui';
import type { Plot } from '@/data/plots/types';
import { extractAddress } from '@/data/plots/helpers';

interface PlotDetailMapProps {
  plot: Plot;
}

/**
 * PlotDetailMap — larger map with approximate location circle.
 * Coordinates are geocoded from address, NOT exact plot position.
 * Shows a radius circle + "Lokalizacja przyblizona" label.
 * Fullscreen toggle.
 */
export function PlotDetailMap({ plot }: PlotDetailMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const leafletMapRef = useRef<any>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const address = extractAddress(plot);
  const locationLabel = address ? `${address}, ${plot.city}` : plot.city;

  // Toggle fullscreen
  const toggleFullscreen = useCallback(() => {
    setIsFullscreen((prev) => !prev);
  }, []);

  // Escape closes fullscreen
  useEffect(() => {
    if (!isFullscreen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsFullscreen(false);
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isFullscreen]);

  // Initialize/re-initialize map when fullscreen changes
  useEffect(() => {
    if (!mapRef.current) return;

    // Clean up previous map
    if (leafletMapRef.current) {
      leafletMapRef.current.remove();
      leafletMapRef.current = null;
    }

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const L = require('leaflet');

    const { lat, lng } = plot.coordinates;

    const map = L.map(mapRef.current, {
      center: [lat, lng],
      zoom: 14,
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: isFullscreen,
    });

    // CartoDB Voyager tiles
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
    }).addTo(map);

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Approximate location circle (radius ~200m)
    L.circle([lat, lng], {
      radius: 200,
      color: '#c9a96e',
      weight: 2,
      opacity: 0.7,
      fillColor: '#c9a96e',
      fillOpacity: 0.12,
      dashArray: '6, 4',
    }).addTo(map);

    // Center marker (small dot)
    const markerIcon = L.divIcon({
      className: 'plot-detail-pin',
      html: `<div style="
        width: 16px;
        height: 16px;
        background: #c9a96e;
        border: 3px solid #fff;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      "></div>`,
      iconSize: [16, 16],
      iconAnchor: [8, 8],
    });

    const marker = L.marker([lat, lng], { icon: markerIcon }).addTo(map);

    // Popup with "approximate location" note
    marker.bindPopup(
      `<div style="text-align:center;padding:4px 8px;min-width:180px">
        <p style="font-weight:700;font-size:14px;margin:0 0 4px">${plot.city}${plot.district ? ', ' + plot.district : ''}</p>
        <p style="color:#71717a;font-size:12px;margin:0">Lokalizacja przyblizona</p>
      </div>`,
      { closeButton: false, offset: [0, -12] }
    );

    leafletMapRef.current = map;

    // Invalidate size after render (important for fullscreen transition)
    setTimeout(() => map.invalidateSize(), 100);

    return () => {
      map.remove();
      leafletMapRef.current = null;
    };
  }, [plot.coordinates, plot.city, plot.district, isFullscreen]);

  const mapContent = (
    <div className="relative w-full h-full">
      <div ref={mapRef} className="w-full h-full rounded-xl" />

      {/* "Approximate location" badge */}
      <div className="absolute top-4 left-4 z-[500] bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-primary/30 border-2 border-primary" />
        <span className="text-xs font-medium text-text-secondary">Lokalizacja przyblizona</span>
      </div>

      {/* Fullscreen toggle button */}
      <button
        onClick={toggleFullscreen}
        className="absolute top-4 right-4 z-[500] w-9 h-9 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-zinc-50 transition-colors"
        title={isFullscreen ? 'Zamknij pelny ekran' : 'Pelny ekran'}
      >
        <Icon name={isFullscreen ? 'minimize2' : 'maximize2'} size="sm" className="text-zinc-600" />
      </button>
    </div>
  );

  return (
    <>
      {/* Normal view */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[96rem]">
          <h2 className="text-xl md:text-2xl font-bold text-text-primary mb-4">Lokalizacja</h2>
          <p className="text-sm text-text-muted mb-4 flex items-center gap-2">
            <Icon name="mapPin" size="sm" />
            {locationLabel}
            <span className="text-xs bg-zinc-100 px-2 py-0.5 rounded-full">przyblizona</span>
          </p>
          <div className="h-[350px] md:h-[450px] rounded-xl overflow-hidden border border-zinc-200/60">
            {!isFullscreen && mapContent}
          </div>
        </div>
      </section>

      {/* Fullscreen overlay */}
      {isFullscreen && (
        <div className="fixed inset-0 z-[1000] bg-white flex flex-col">
          <div className="shrink-0 border-b border-zinc-200 bg-white px-4 py-3 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-text-primary">{plot.city}{plot.district ? `, ${plot.district}` : ''}</h3>
              <p className="text-xs text-text-muted flex items-center gap-1">
                <Icon name="mapPin" size="sm" />
                {locationLabel}
                <span className="bg-zinc-100 px-1.5 py-0.5 rounded-full">przyblizona</span>
              </p>
            </div>
            <button
              onClick={() => setIsFullscreen(false)}
              className="w-9 h-9 rounded-lg bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center transition-colors"
              title="Zamknij (Escape)"
            >
              <Icon name="x" size="sm" className="text-zinc-600" />
            </button>
          </div>
          <div className="flex-1">
            {mapContent}
          </div>
        </div>
      )}
    </>
  );
}
