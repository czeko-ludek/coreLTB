'use client';

import React, { useEffect, useRef, useCallback, useImperativeHandle, forwardRef } from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import type { Plot } from '@/data/plots/types';

export interface PlotMapHandle {
  /** Center + zoom to a specific plot */
  focusPlot: (slug: string) => void;
}

interface PlotMapProps {
  plots: Plot[];
  highlightedSlug: string | null;
  onPlotHover: (slug: string | null) => void;
  onPlotClick: (slug: string) => void;
  /** Nominatim search query to fetch & display administrative boundary */
  boundaryQuery?: string | null;
  /** Called when visible plots change (after zoom/pan/cluster click) with slugs in viewport */
  onVisiblePlotsChange?: (slugs: string[]) => void;
}

/** Format price as full number with spaces + zl: 225 000 zl */
function formatPrice(price: number): string {
  if (price >= 1000000) {
    return `${(price / 1000000).toFixed(1)} mln zł`;
  }
  return price.toLocaleString('pl-PL').replace(/\u00a0/g, ' ') + ' zł';
}

const AVAILABILITY_COLORS: Record<string, string> = {
  dostepna: '#22c55e',
  rezerwacja: '#dfbb68',
  sprzedana: '#71717a',
};

/**
 * PlotMap — Leaflet map with MarkerCluster + price pill markers.
 * Uses OpenStreetMap DE tiles (better detail & Polish labels).
 * Popup opens on CLICK. Boundary overlay from Nominatim.
 */
export const PlotMap = forwardRef<PlotMapHandle, PlotMapProps>(
  function PlotMap({ plots, highlightedSlug, onPlotHover, onPlotClick, boundaryQuery, onVisiblePlotsChange }, ref) {
    const mapRef = useRef<HTMLDivElement>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const leafletMapRef = useRef<any>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const markersRef = useRef<Map<string, any>>(new Map());
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const clusterGroupRef = useRef<any>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const boundaryLayerRef = useRef<any>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const maskLayerRef = useRef<any>(null);
    const plotsDataRef = useRef<Map<string, Plot>>(new Map());
    const callbacksRef = useRef({ onPlotHover, onPlotClick, onVisiblePlotsChange });

    callbacksRef.current = { onPlotHover, onPlotClick, onVisiblePlotsChange };

    const createPinIcon = useCallback((plot: Plot, isHighlighted: boolean) => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const L = require('leaflet');
      const color = AVAILABILITY_COLORS[plot.availability] || '#22c55e';
      const price = formatPrice(plot.price);

      const html = isHighlighted
        ? `<div class="plot-dot plot-dot--active" style="--pin-color:${color}">
             <span class="plot-dot-label plot-dot-label--active">${price}</span>
           </div>`
        : `<div class="plot-dot" style="--pin-color:${color}">
             <span class="plot-dot-label">${price}</span>
           </div>`;

      // Wider for full prices + zl, 25% larger
      const textLen = price.length;
      const w = isHighlighted ? Math.max(88, textLen * 9 + 28) : Math.max(80, textLen * 8.5 + 24);
      const h = isHighlighted ? 34 : 32;

      return L.divIcon({
        className: 'plot-pin-wrapper',
        html,
        iconSize: [w, h],
        iconAnchor: [w / 2, h / 2],
        popupAnchor: [0, -(h / 2) - 4],
      });
    }, []);

    // Expose focusPlot to parent
    useImperativeHandle(ref, () => ({
      focusPlot(slug: string) {
        const marker = markersRef.current.get(slug);
        const map = leafletMapRef.current;
        const cluster = clusterGroupRef.current;
        if (!marker || !map) return;

        const plot = plotsDataRef.current.get(slug);
        if (!plot) return;

        if (cluster) {
          cluster.zoomToShowLayer(marker, () => {
            map.flyTo(
              [plot.coordinates.lat, plot.coordinates.lng],
              Math.max(map.getZoom(), 14),
              { duration: 0.6 }
            );
            marker.openPopup();
          });
        } else {
          map.flyTo(
            [plot.coordinates.lat, plot.coordinates.lng],
            Math.max(map.getZoom(), 14),
            { duration: 0.6 }
          );
          marker.openPopup();
        }
      },
    }), []);

    // Initialize map (once)
    useEffect(() => {
      if (!mapRef.current || leafletMapRef.current) return;

      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const L = require('leaflet');

      const map = L.map(mapRef.current, {
        center: [50.05, 18.45],
        zoom: 10,
        zoomControl: false,
        attributionControl: false,
        dragging: true,
        doubleClickZoom: true,
        touchZoom: true,
        scrollWheelZoom: false, // Ctrl+scroll activates
      });

      // ── Ctrl+scroll zoom with dark overlay ──
      const mapContainer = map.getContainer();

      const overlay = document.createElement('div');
      overlay.className = 'plot-map-gesture-overlay';
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      overlay.innerHTML = `<span class="plot-map-gesture-text">${
        isMac ? 'Użyj \u2318 + scroll, aby przybliżać mapę' : 'Użyj Ctrl + scroll, aby przybliżać mapę'
      }</span>`;
      mapContainer.appendChild(overlay);

      let hideTimer: ReturnType<typeof setTimeout> | null = null;

      const handleWheel = (e: WheelEvent) => {
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault();
          const delta = e.deltaY > 0 ? -1 : 1;
          map.setZoom(map.getZoom() + delta, { animate: true });
          overlay.classList.remove('plot-map-gesture-overlay--visible');
          if (hideTimer) clearTimeout(hideTimer);
        } else {
          overlay.classList.add('plot-map-gesture-overlay--visible');
          if (hideTimer) clearTimeout(hideTimer);
          hideTimer = setTimeout(() => {
            overlay.classList.remove('plot-map-gesture-overlay--visible');
          }, 1500);
        }
      };

      mapContainer.addEventListener('wheel', handleWheel, { passive: false });

      // CartoDB Voyager — clean, colorful, Polish labels only
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
      }).addTo(map);

      L.control.zoom({ position: 'topright' }).addTo(map);

      leafletMapRef.current = map;

      return () => {
        mapContainer.removeEventListener('wheel', handleWheel);
        map.remove();
        leafletMapRef.current = null;
      };
    }, []);

    // Add markers + cluster group when plots change
    useEffect(() => {
      if (!leafletMapRef.current) return;

      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const L = require('leaflet');
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      require('leaflet.markercluster');

      const map = leafletMapRef.current;

      // Remove old cluster group
      if (clusterGroupRef.current) {
        map.removeLayer(clusterGroupRef.current);
        clusterGroupRef.current = null;
      }
      markersRef.current.clear();
      plotsDataRef.current.clear();

      // Create cluster group — zoom on click, NO spiderfy
      const clusterGroup = L.markerClusterGroup({
        maxClusterRadius: 40,
        spiderfyOnMaxZoom: false,
        showCoverageOnHover: false,
        zoomToBoundsOnClick: true,
        animate: true,
        animateAddingMarkers: false,
        disableClusteringAtZoom: 16,
        iconCreateFunction: (cluster: { getChildCount: () => number }) => {
          const count = cluster.getChildCount();
          const size = count < 5 ? 42 : count < 15 ? 52 : 62;
          return L.divIcon({
            html: `<div class="plot-cluster" style="width:${size}px;height:${size}px">
                     <span class="plot-cluster-count">${count}</span>
                   </div>`,
            className: 'plot-cluster-wrapper',
            iconSize: [size, size],
            iconAnchor: [size / 2, size / 2],
          });
        },
      });

      const availablePlots = plots.filter((p) => p.availability !== 'sprzedana');

      availablePlots.forEach((plot) => {
        const icon = createPinIcon(plot, false);

        const marker = L.marker([plot.coordinates.lat, plot.coordinates.lng], {
          icon,
          riseOnHover: true,
        });

        // ── Build popup content ──
        const allImages = [plot.thumbnailSrc, ...plot.images].filter(Boolean);
        const galleryId = `gallery-${plot.slug}`;
        let thumbHtml: string;

        if (allImages.length > 1) {
          const imagesHtml = allImages.map((src: string, i: number) =>
            `<img src="${src}" alt="${plot.title} - zdjecie ${i + 1}" class="plot-popup-slide" style="display:${i === 0 ? 'block' : 'none'}" data-index="${i}" />`
          ).join('');
          thumbHtml = `<div class="plot-popup-thumb plot-popup-gallery" data-gallery="${galleryId}" data-count="${allImages.length}">
            ${imagesHtml}
            <button class="plot-popup-nav plot-popup-nav--prev" data-dir="-1">&lsaquo;</button>
            <button class="plot-popup-nav plot-popup-nav--next" data-dir="1">&rsaquo;</button>
            <span class="plot-popup-counter">1/${allImages.length}</span>
          </div>`;
        } else if (allImages.length === 1) {
          thumbHtml = `<div class="plot-popup-thumb">
               <img src="${allImages[0]}" alt="${plot.title}" />
             </div>`;
        } else {
          thumbHtml = `<div class="plot-popup-thumb plot-popup-thumb--empty">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d4d4d8" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
             </div>`;
        }

        const mediaItems: string[] = [];
        if (plot.media.water) mediaItems.push('Woda');
        if (plot.media.electricity) mediaItems.push('Prąd');
        if (plot.media.gas) mediaItems.push('Gaz');
        if (plot.media.sewer) mediaItems.push('Kanalizacja');
        const mediaPills = mediaItems.map(m =>
          `<span class="plot-popup-media-pill">${m}</span>`
        ).join('');

        const popupContent = `
          <div class="plot-popup">
            <button class="plot-popup-close" title="Zamknij">&times;</button>
            ${thumbHtml}
            <div class="plot-popup-body">
              <p class="plot-popup-price">${plot.price.toLocaleString('pl-PL')} zł</p>
              <p class="plot-popup-address">${plot.city}${plot.district ? ', ' + plot.district : ''}</p>
              <div class="plot-popup-specs">
                <div class="plot-popup-spec">
                  <span class="plot-popup-spec-value">${plot.area}</span>
                  <span class="plot-popup-spec-label">m²</span>
                </div>
                <div class="plot-popup-spec-separator"></div>
                <div class="plot-popup-spec">
                  <span class="plot-popup-spec-value">${plot.pricePerM2}</span>
                  <span class="plot-popup-spec-label">zł/m²</span>
                </div>
                <div class="plot-popup-spec-separator"></div>
                <div class="plot-popup-spec">
                  <span class="plot-popup-spec-value">${mediaItems.length}</span>
                  <span class="plot-popup-spec-label">media</span>
                </div>
              </div>
              ${mediaPills ? `<div class="plot-popup-media-row">${mediaPills}</div>` : ''}
              <a href="/dzialki/${plot.slug}" class="plot-popup-cta">
                Zobacz działkę
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </a>
            </div>
          </div>
        `;

        marker.bindPopup(popupContent, {
          className: 'plot-popup-container',
          closeButton: false,
          offset: [0, -8],
          maxWidth: 425,
          minWidth: 350,
        });

        // Close button inside popup
        marker.on('popupopen', () => {
          const popup = marker.getPopup();
          const container = popup?.getElement();
          if (!container) return;

          const closeBtn = container.querySelector('.plot-popup-close');
          if (closeBtn) {
            closeBtn.addEventListener('click', (e: Event) => {
              e.stopPropagation();
              marker.closePopup();
            });
          }

          // Gallery navigation
          const navBtns = container.querySelectorAll('.plot-popup-nav');
          navBtns.forEach((btn: HTMLElement) => {
            btn.addEventListener('click', (e: Event) => {
              e.stopPropagation();
              const dir = parseInt((e.currentTarget as HTMLElement).dataset.dir || '1');
              const gallery = container.querySelector('.plot-popup-gallery');
              if (!gallery) return;

              const slides = gallery.querySelectorAll('.plot-popup-slide') as NodeListOf<HTMLElement>;
              const count = slides.length;
              let current = 0;
              slides.forEach((s: HTMLElement, i: number) => { if (s.style.display !== 'none') current = i; });

              const next = (current + dir + count) % count;
              slides.forEach((s: HTMLElement, i: number) => { s.style.display = i === next ? 'block' : 'none'; });

              const counter = gallery.querySelector('.plot-popup-counter');
              if (counter) counter.textContent = `${next + 1}/${count}`;
            });
          });
        });

        // Hover: only highlight sidebar, NO popup
        marker.on('mouseover', () => {
          callbacksRef.current.onPlotHover(plot.slug);
        });
        marker.on('mouseout', () => {
          callbacksRef.current.onPlotHover(null);
        });

        // Click: toggle popup (Leaflet default opens on click, click again closes)
        marker.on('click', () => {
          callbacksRef.current.onPlotClick(plot.slug);
        });

        clusterGroup.addLayer(marker);
        markersRef.current.set(plot.slug, marker);
        plotsDataRef.current.set(plot.slug, plot);
      });

      map.addLayer(clusterGroup);
      clusterGroupRef.current = clusterGroup;

      // ── Report visible plots on bounds change (zoom/pan/cluster click) ──
      const reportVisiblePlots = () => {
        const cb = callbacksRef.current.onVisiblePlotsChange;
        if (!cb) return;
        const mapBounds = map.getBounds();
        const visibleSlugs: string[] = [];
        markersRef.current.forEach((marker, slug) => {
          if (mapBounds.contains(marker.getLatLng())) {
            visibleSlugs.push(slug);
          }
        });
        cb(visibleSlugs);
      };

      map.on('moveend', reportVisiblePlots);
      map.on('zoomend', reportVisiblePlots);

      // Also fire on cluster click (after zoom animation completes)
      clusterGroup.on('clusterclick', () => {
        // moveend will fire after the zoom animation — reportVisiblePlots handles it
      });

      // Fit bounds with padding
      if (availablePlots.length > 0) {
        const bounds = L.latLngBounds(availablePlots.map((p: Plot) => [p.coordinates.lat, p.coordinates.lng]));
        map.fitBounds(bounds, { padding: [60, 60], maxZoom: 12 });
      }
    }, [plots, createPinIcon]);

    // Highlight update — only swap icons, NO zoom/bounds reset
    useEffect(() => {
      markersRef.current.forEach((marker, slug) => {
        const plot = plotsDataRef.current.get(slug);
        if (!plot) return;
        const isHighlighted = slug === highlightedSlug;
        marker.setIcon(createPinIcon(plot, isHighlighted));
        marker.setZIndexOffset(isHighlighted ? 1000 : 0);
      });
    }, [highlightedSlug, createPinIcon]);

    // ── Boundary overlay: fetch GeoJSON from Nominatim + draw inverted mask ──
    useEffect(() => {
      const map = leafletMapRef.current;
      if (!map) return;

      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const L = require('leaflet');

      // Clean up previous boundary layers
      if (boundaryLayerRef.current) {
        map.removeLayer(boundaryLayerRef.current);
        boundaryLayerRef.current = null;
      }
      if (maskLayerRef.current) {
        map.removeLayer(maskLayerRef.current);
        maskLayerRef.current = null;
      }

      if (!boundaryQuery) return;

      let cancelled = false;

      const fetchBoundary = async () => {
        try {
          const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(boundaryQuery)}&format=json&polygon_geojson=1&countrycodes=pl&limit=1&polygon_threshold=0.001`;

          const res = await fetch(url, {
            headers: { 'User-Agent': 'CoreLTB-plots (biuro@coreltb.pl)' },
          });

          if (cancelled) return;
          const data = await res.json();
          if (cancelled || !data[0]?.geojson) return;

          const geojson = data[0].geojson;
          const bbox = data[0].boundingbox; // [south, north, west, east]

          // ── 1. Draw boundary outline (subtle dark stroke, light gold fill) ──
          const boundaryLayer = L.geoJSON(
            { type: 'Feature', geometry: geojson, properties: {} },
            {
              style: {
                color: '#1c2637',
                weight: 2,
                opacity: 0.85,
                fillColor: '#c9a96e',
                fillOpacity: 0.06,
                dashArray: undefined,
              },
            }
          );

          if (cancelled) return;

          // ── 2. Create inverted polygon mask (dim everything outside) ──
          // World bounds as outer ring
          const worldOuter: [number, number][] = [
            [-90, -180], [-90, 180], [90, 180], [90, -180], [-90, -180],
          ];

          // Extract boundary coordinates as hole(s)
          let holes: [number, number][][] = [];

          if (geojson.type === 'Polygon') {
            // Nominatim returns [lng, lat] — Leaflet needs [lat, lng]
            holes = geojson.coordinates.map((ring: number[][]) =>
              ring.map((coord: number[]) => [coord[1], coord[0]] as [number, number])
            );
          } else if (geojson.type === 'MultiPolygon') {
            // For multi-polygons, collect all outer rings as holes
            holes = geojson.coordinates.map((polygon: number[][][]) =>
              polygon[0].map((coord: number[]) => [coord[1], coord[0]] as [number, number])
            );
          }

          if (holes.length > 0) {
            const maskLayer = L.polygon(
              [worldOuter, ...holes],
              {
                color: 'transparent',
                fillColor: '#1c2637',
                fillOpacity: 0.10,
                stroke: false,
                interactive: false,
              }
            );

            if (!cancelled) {
              maskLayer.addTo(map);
              maskLayerRef.current = maskLayer;
            }
          }

          if (!cancelled) {
            boundaryLayer.addTo(map);
            boundaryLayerRef.current = boundaryLayer;

            // ── 3. Zoom to boundary bounds ──
            if (bbox) {
              const bounds = L.latLngBounds(
                [parseFloat(bbox[0]), parseFloat(bbox[2])], // SW
                [parseFloat(bbox[1]), parseFloat(bbox[3])], // NE
              );
              map.flyToBounds(bounds, {
                padding: [40, 40],
                maxZoom: 14,
                duration: 0.8,
              });
            }
          }
        } catch (err) {
          console.warn('Failed to fetch boundary from Nominatim:', err);
        }
      };

      fetchBoundary();

      return () => {
        cancelled = true;
      };
    }, [boundaryQuery]);

    return (
      <div ref={mapRef} className="w-full h-full min-h-[400px] rounded-2xl" />
    );
  }
);
