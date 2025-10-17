'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FloorPlan } from '@/data/projects';
import { Icon, Portal } from '@/components/ui';

export interface ProjectFloorPlansProps {
  slug: string;
  floorPlans: FloorPlan[];
}

export function ProjectFloorPlans({ slug, floorPlans }: ProjectFloorPlansProps) {
  const [activePlanIndex, setActivePlanIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100); // Start at 100%
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const openModal = (index: number) => {
    setActivePlanIndex(index);
    setIsModalOpen(true);
    setZoomLevel(100); // Reset zoom when opening
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setZoomLevel(100); // Reset zoom when closing
  };

  const centerScrollToZoom = (newZoom: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Get current scroll position and container dimensions
    const scrollLeft = container.scrollLeft;
    const scrollTop = container.scrollTop;
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    // Calculate center point in current scroll view
    const centerX = scrollLeft + containerWidth / 2;
    const centerY = scrollTop + containerHeight / 2;

    // Calculate zoom ratio
    const oldZoom = zoomLevel / 100;
    const newZoomRatio = newZoom / 100;
    const zoomChange = newZoomRatio / oldZoom;

    // Calculate new scroll position to keep center point in view
    const newScrollLeft = centerX * zoomChange - containerWidth / 2;
    const newScrollTop = centerY * zoomChange - containerHeight / 2;

    // Update zoom level
    setZoomLevel(newZoom);

    // Apply new scroll position after zoom (use setTimeout to wait for DOM update)
    setTimeout(() => {
      container.scrollLeft = newScrollLeft;
      container.scrollTop = newScrollTop;
    }, 0);
  };

  const zoomIn = () => {
    const newZoom = Math.min(zoomLevel + 20, 200);
    centerScrollToZoom(newZoom);
  };

  const zoomOut = () => {
    const newZoom = Math.max(zoomLevel - 20, 100);
    centerScrollToZoom(newZoom);
  };

  // Handle keyboard ESC to close
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isModalOpen]);

  const activePlan = floorPlans[activePlanIndex];

  return (
    <>
      <section className="py-8 md:py-12" style={{ backgroundColor: '#efebe7' }}>
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-text-primary mb-3 md:mb-4">
              Rzuty i plan pomieszczeń
            </h2>
            <p className="text-text-secondary text-base md:text-lg">
              Kliknij na rzut, aby zobaczyć go w powiększeniu
            </p>
          </div>

          {/* Floor Plan Switcher */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-6">
            {floorPlans.map((plan, index) => (
              <button
                key={index}
                onClick={() => setActivePlanIndex(index)}
                className={`px-4 py-2.5 md:px-6 md:py-3 rounded-lg font-bold text-xs md:text-sm uppercase tracking-wide transition-all duration-300 ${
                  activePlanIndex === index
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-white text-text-secondary hover:bg-gray-100 hover:text-text-primary'
                }`}
              >
                {plan.name} {plan.area}
              </button>
            ))}
          </div>

          {/* Layout: Floor Plan (left) + Rooms Table (right) */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Left: Floor Plan Image (3 columns, 70% width) - Clickable */}
            <div className="lg:col-span-3">
              <div
                className="relative bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer group"
                onClick={() => openModal(activePlanIndex)}
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={`/images/projekty/${slug}/${activePlan.image}`}
                    alt={`Rzut ${activePlan.name}`}
                    fill
                    className="object-contain p-8 transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-primary px-6 py-3 rounded-lg">
                      <span className="text-white font-bold">Kliknij aby powiększyć</span>
                    </div>
                  </div>
                </div>

                {/* Floor Info Badge */}
                <div className="absolute top-6 left-6 bg-primary px-4 py-2 rounded-lg shadow-lg">
                  <span className="text-white font-bold">{activePlan.name}</span>
                  <span className="text-white/90 ml-2">{activePlan.area}</span>
                </div>
              </div>
            </div>

            {/* Right: Rooms Table (2 columns, 30% width) - Always Visible */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-bold text-text-primary mb-3 md:mb-4">
                {activePlan.name}
              </h3>
              <p className="text-text-secondary text-sm mb-4 md:mb-6">
                Powierzchnia: <span className="font-bold text-text-primary">{activePlan.area}</span>
              </p>

              {/* Rooms List */}
              <div className="space-y-2 max-h-[400px] md:max-h-[500px] overflow-y-auto">
                {activePlan.rooms.map((room, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2.5 md:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  >
                    <span className="text-text-primary font-medium text-xs md:text-sm">{room.name}</span>
                    <span className="text-text-primary font-bold text-xs md:text-sm">{room.area}</span>
                  </div>
                ))}
              </div>

              {/* Total Area Summary */}
              <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-border-light">
                <div className="flex items-center justify-between p-2.5 md:p-3 bg-primary/10 rounded-lg">
                  <span className="text-text-primary font-bold uppercase text-xs md:text-sm">Razem</span>
                  <span className="text-text-primary font-bold text-base md:text-lg">{activePlan.area}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal with Full-Screen Floor Plan + Rooms Table */}
      {isModalOpen && (
        <Portal>
          <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-auto">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 md:top-6 md:right-6 z-[10000] w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary hover:bg-primary-dark flex items-center justify-center transition-colors duration-300 shadow-xl"
              aria-label="Zamknij rzut"
            >
              <Icon name="x" size="md" className="text-white md:w-6 md:h-6" />
            </button>

            {/* Mobile: Stacked Layout (Plan on top, Table below) */}
            <div className="lg:hidden w-full h-full flex flex-col bg-white">
              {/* Floor Plan Image - Top */}
              <div ref={scrollContainerRef} className="relative bg-gray-100 min-h-[50vh] overflow-auto">
                <div
                  className="relative transition-transform duration-300 origin-center"
                  style={{
                    transform: `scale(${zoomLevel / 100})`,
                    width: `${100 * (zoomLevel / 100)}%`,
                    height: `${50 * (zoomLevel / 100)}vh`,
                    minHeight: '50vh'
                  }}
                >
                  <Image
                    src={`/images/projekty/${slug}/${activePlan.image}`}
                    alt={`Rzut ${activePlan.name}`}
                    fill
                    className="object-contain"
                    sizes="100vw"
                  />
                </div>
              </div>

              {/* Zoom Controls - Fixed Bottom (Mobile) - Horizontal */}
              <div className="sticky bottom-0 left-0 right-0 flex justify-center py-3 bg-gray-100 z-[10001]">
                <div className="flex flex-row items-center gap-2 bg-black/60 backdrop-blur-sm px-3 py-2 rounded-full">
                  <button
                    onClick={zoomOut}
                    disabled={zoomLevel <= 100}
                    className="w-9 h-9 rounded-full bg-primary hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors duration-300"
                    aria-label="Pomniejsz"
                  >
                    <Icon name="minus" size="sm" className="text-white" />
                  </button>
                  <div className="px-3 py-1 rounded-full bg-white/90 min-w-[50px] flex items-center justify-center">
                    <span className="text-xs font-bold text-text-primary">{zoomLevel}%</span>
                  </div>
                  <button
                    onClick={zoomIn}
                    disabled={zoomLevel >= 200}
                    className="w-9 h-9 rounded-full bg-primary hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors duration-300"
                    aria-label="Powiększ"
                  >
                    <Icon name="plus" size="sm" className="text-white" />
                  </button>
                </div>
              </div>

              {/* Rooms Table - Bottom */}
              <div className="bg-white flex flex-col">
                <div className="p-4 border-b border-border-light">
                  <h3 className="text-xl font-bold text-text-primary mb-2">
                    {activePlan.name}
                  </h3>
                  <p className="text-text-secondary text-sm">
                    Powierzchnia: <span className="font-bold text-text-primary">{activePlan.area}</span>
                  </p>
                </div>

                {/* Rooms List */}
                <div className="p-4">
                  <div className="space-y-2">
                    {activePlan.rooms.map((room, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg"
                      >
                        <span className="text-text-primary font-medium text-xs">{room.name}</span>
                        <span className="text-text-primary font-bold text-xs">{room.area}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Total Area Summary */}
                <div className="p-4 border-t border-border-light bg-gray-50">
                  <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
                    <span className="text-text-primary font-bold uppercase text-xs">Razem</span>
                    <span className="text-text-primary font-bold text-lg">{activePlan.area}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop: Side-by-Side Layout */}
            <div className="hidden lg:grid w-full h-full grid-cols-4 gap-0 relative">
              {/* Left: Floor Plan Image - Full Height (3 columns, 75%) */}
              <div className="col-span-3 relative bg-white flex flex-col">
                {/* Scrollable Image Container */}
                <div ref={scrollContainerRef} className="flex-1 overflow-auto">
                  <div
                    className="relative transition-transform duration-300 origin-center p-8"
                    style={{
                      transform: `scale(${zoomLevel / 100})`,
                      width: `${100 * (zoomLevel / 100)}%`,
                      height: `${100 * (zoomLevel / 100)}%`,
                      minHeight: '100%'
                    }}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={`/images/projekty/${slug}/${activePlan.image}`}
                        alt={`Rzut ${activePlan.name}`}
                        fill
                        className="object-contain"
                        sizes="75vw"
                      />
                    </div>
                  </div>
                </div>

                {/* Zoom Controls - Fixed Bottom (Desktop) - Horizontal */}
                <div className="sticky bottom-0 left-0 right-0 flex justify-center py-4 bg-white border-t border-gray-200 z-[10001]">
                  <div className="flex flex-row items-center gap-2 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full">
                    <button
                      onClick={zoomOut}
                      disabled={zoomLevel <= 100}
                      className="w-10 h-10 rounded-full bg-primary hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors duration-300"
                      aria-label="Pomniejsz"
                    >
                      <Icon name="minus" size="md" className="text-white" />
                    </button>
                    <div className="px-4 py-1.5 rounded-full bg-white/90 min-w-[60px] flex items-center justify-center">
                      <span className="text-sm font-bold text-text-primary">{zoomLevel}%</span>
                    </div>
                    <button
                      onClick={zoomIn}
                      disabled={zoomLevel >= 200}
                      className="w-10 h-10 rounded-full bg-primary hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors duration-300"
                      aria-label="Powiększ"
                    >
                      <Icon name="plus" size="md" className="text-white" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Right: Rooms Table - Full Height (1 column, 25%) */}
              <div className="col-span-1 bg-white flex flex-col overflow-hidden">
                <div className="p-6 border-b border-border-light">
                  <h3 className="text-2xl font-bold text-text-primary mb-2">
                    {activePlan.name}
                  </h3>
                  <p className="text-text-secondary">
                    Powierzchnia: <span className="font-bold text-text-primary">{activePlan.area}</span>
                  </p>
                </div>

                {/* Scrollable Rooms List */}
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="space-y-3">
                    {activePlan.rooms.map((room, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                      >
                        <span className="text-text-primary font-medium text-sm">{room.name}</span>
                        <span className="text-text-primary font-bold text-sm">{room.area}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Total Area Summary - Sticky at Bottom */}
                <div className="p-6 border-t border-border-light bg-gray-50">
                  <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg">
                    <span className="text-text-primary font-bold uppercase text-sm">Razem</span>
                    <span className="text-text-primary font-bold text-xl">{activePlan.area}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
}
