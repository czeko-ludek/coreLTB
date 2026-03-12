'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import { clsx } from 'clsx';
import {
  VoivodeshipId,
  mapVoivodeships,
  getCityByNameInSvg,
  MapCity,
} from '@/data/map-data';

interface PolandMapSVGProps {
  view: 'overview' | 'zoomed';
  activeVoivodeship: VoivodeshipId | null;
  hoveredVoivodeship: VoivodeshipId | null;
  hoveredCity: string | null;
  /** Ref do rodzica (nietransformowanego) dla poprawnego pozycjonowania tooltipa */
  tooltipContainerRef: React.RefObject<HTMLDivElement | null>;
  onVoivodeshipClick: (id: VoivodeshipId) => void;
  onVoivodeshipHover: (id: VoivodeshipId | null) => void;
  onCityClick: (city: MapCity) => void;
  onCityHover: (cityId: string | null, position?: { x: number; y: number }) => void;
  className?: string;
}

// Store callbacks in refs to avoid stale closures in event listeners
interface CallbackRefs {
  onVoivodeshipClick: (id: VoivodeshipId) => void;
  onVoivodeshipHover: (id: VoivodeshipId | null) => void;
  onCityClick: (city: MapCity) => void;
  onCityHover: (cityId: string | null, position?: { x: number; y: number }) => void;
}

/**
 * PolandMapSVG - Interactive SVG map component
 *
 * Loads the SVG file and adds interactivity:
 * - Click/hover on voivodeships
 * - Click/hover on cities
 * - Dynamic class updates based on state
 */
export function PolandMapSVG({
  view,
  activeVoivodeship,
  hoveredVoivodeship,
  hoveredCity,
  tooltipContainerRef,
  onVoivodeshipClick,
  onVoivodeshipHover,
  onCityClick,
  onCityHover,
  className,
}: PolandMapSVGProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Store callbacks in refs to always have current versions in event listeners
  const callbacksRef = useRef<CallbackRefs>({
    onVoivodeshipClick,
    onVoivodeshipHover,
    onCityClick,
    onCityHover,
  });

  // Keep refs updated with latest callbacks
  useEffect(() => {
    callbacksRef.current = {
      onVoivodeshipClick,
      onVoivodeshipHover,
      onCityClick,
      onCityHover,
    };
  }, [onVoivodeshipClick, onVoivodeshipHover, onCityClick, onCityHover]);

  // Store event listeners for cleanup
  const listenersRef = useRef<Array<{ element: Element; type: string; handler: EventListener }>>([]);

  // Helper to add event listener and track for cleanup
  const addTrackedListener = useCallback((element: Element, type: string, handler: EventListener) => {
    element.addEventListener(type, handler);
    listenersRef.current.push({ element, type, handler });
  }, []);

  // Load and inject SVG
  useEffect(() => {
    const loadSVG = async () => {
      try {
        const response = await fetch('/mapa_3_wojewodztwa.svg');
        const svgText = await response.text();

        if (containerRef.current) {
          containerRef.current.innerHTML = svgText;
          svgRef.current = containerRef.current.querySelector('svg');

          if (svgRef.current) {
            // Add base classes
            svgRef.current.classList.add('w-full', 'h-full');

            // Remove title elements to prevent browser native tooltip
            svgRef.current.querySelectorAll('title').forEach((el) => el.remove());

            // Setup initial interactivity
            setupVoivodeshipInteractivity();
            setupCityInteractivity();
          }
        }
      } catch (error) {
        console.error('Failed to load map SVG:', error);
      }
    };

    loadSVG();

    // Cleanup: remove all event listeners on unmount
    return () => {
      listenersRef.current.forEach(({ element, type, handler }) => {
        element.removeEventListener(type, handler);
      });
      listenersRef.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Setup voivodeship click/hover handlers
  const setupVoivodeshipInteractivity = useCallback(() => {
    if (!svgRef.current) return;

    mapVoivodeships.forEach((voiv) => {
      const group = svgRef.current?.querySelector(`#${voiv.svgGroupId}`);
      if (group) {
        // Add map-voivodeship class
        group.classList.add('map-voivodeship');

        // Click handler - use ref to always get current callback
        const clickHandler = (e: Event) => {
          e.stopPropagation();
          callbacksRef.current.onVoivodeshipClick(voiv.id);
        };
        addTrackedListener(group, 'click', clickHandler);

        // Hover handlers - use ref to always get current callback
        const enterHandler = () => {
          callbacksRef.current.onVoivodeshipHover(voiv.id);
        };
        addTrackedListener(group, 'mouseenter', enterHandler);

        const leaveHandler = () => {
          callbacksRef.current.onVoivodeshipHover(null);
        };
        addTrackedListener(group, 'mouseleave', leaveHandler);
      }
    });
  }, [addTrackedListener]);

  // Setup city click/hover handlers - simple approach without DOM modification
  const setupCityInteractivity = useCallback(() => {
    if (!svgRef.current) return;

    // Find all text elements with class "label" (city names)
    const labels = svgRef.current.querySelectorAll('text.label');

    labels.forEach((label) => {
      const cityName = label.textContent?.trim();
      if (!cityName) return;

      const city = getCityByNameInSvg(cityName);
      if (!city) return;

      // Find the corresponding circle (previous sibling)
      const circle = label.previousElementSibling as SVGCircleElement;

      // Store city data on elements using SVGElement's dataset
      (label as unknown as HTMLElement).dataset.cityId = city.id;
      (label as unknown as HTMLElement).dataset.voivodeship = city.voivodeship;

      // Shared handlers for both circle and label
      const clickHandler = (e: Event) => {
        e.stopPropagation();
        callbacksRef.current.onCityClick(city);
      };

      const enterHandler = (e: Event) => {
        const mouseEvent = e as MouseEvent;
        const parentRect = tooltipContainerRef.current?.getBoundingClientRect();
        if (parentRect) {
          callbacksRef.current.onCityHover(city.id, {
            x: mouseEvent.clientX - parentRect.left,
            y: mouseEvent.clientY - parentRect.top + 15,
          });
        }
      };

      const leaveHandler = () => {
        callbacksRef.current.onCityHover(null);
      };

      // Add handlers to label (city name text)
      if (city.hasPage) {
        (label as SVGElement).style.cursor = 'pointer';
      }
      addTrackedListener(label, 'click', clickHandler);
      addTrackedListener(label, 'mouseenter', enterHandler);
      addTrackedListener(label, 'mouseleave', leaveHandler);

      // Add handlers to circle (city dot)
      if (circle) {
        (circle as unknown as HTMLElement).dataset.cityId = city.id;
        (circle as unknown as HTMLElement).dataset.voivodeship = city.voivodeship;
        if (city.hasPage) {
          circle.style.cursor = 'pointer';
        }
        addTrackedListener(circle, 'click', clickHandler);
        addTrackedListener(circle, 'mouseenter', enterHandler);
        addTrackedListener(circle, 'mouseleave', leaveHandler);
      }
    });
  }, [addTrackedListener]);

  // Update voivodeship classes based on state
  useEffect(() => {
    if (!svgRef.current) return;

    mapVoivodeships.forEach((voiv) => {
      const group = svgRef.current?.querySelector(`#${voiv.svgGroupId}`);
      if (!group) return;

      // Remove all state classes
      group.classList.remove('hovered', 'active', 'faded');

      // Add appropriate classes based on state
      if (view === 'overview') {
        if (hoveredVoivodeship === voiv.id) {
          group.classList.add('hovered');
        }
      } else if (view === 'zoomed') {
        if (activeVoivodeship === voiv.id) {
          group.classList.add('active');
        } else {
          group.classList.add('faded');
        }
      }
    });
  }, [view, activeVoivodeship, hoveredVoivodeship]);

  // Update cities visibility based on state
  // Uses data-voivodeship attribute set during setup
  useEffect(() => {
    if (!svgRef.current) return;

    // Get all circles and labels with voivodeship data
    const allCircles = svgRef.current.querySelectorAll('circle.miasto[data-voivodeship]');
    const allLabels = svgRef.current.querySelectorAll('text.label[data-voivodeship]');

    // Determine which voivodeship to show cities for
    const targetVoivodeship = view === 'zoomed' ? activeVoivodeship : hoveredVoivodeship;

    // Update circles
    allCircles.forEach((circle) => {
      const voiv = (circle as unknown as HTMLElement).dataset.voivodeship;
      circle.classList.remove('miasto-visible', 'miasto-preview');

      if (voiv === targetVoivodeship) {
        if (view === 'zoomed') {
          circle.classList.add('miasto-visible');
        } else if (view === 'overview' && hoveredVoivodeship) {
          circle.classList.add('miasto-preview');
        }
      }
    });

    // Update labels
    allLabels.forEach((label) => {
      const voiv = (label as unknown as HTMLElement).dataset.voivodeship;
      label.classList.remove('label-visible');

      if (voiv === targetVoivodeship && view === 'zoomed') {
        label.classList.add('label-visible');
      }
    });
  }, [view, activeVoivodeship, hoveredVoivodeship, hoveredCity]);

  return (
    <div
      ref={containerRef}
      className={clsx(
        'map-container w-full h-full',
        view === 'zoomed' && activeVoivodeship && `zoomed-${activeVoivodeship}`,
        className
      )}
      aria-label="Interaktywna mapa Polski z województwami śląskim, małopolskim i opolskim"
      role="img"
    />
  );
}

export default PolandMapSVG;
