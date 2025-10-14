'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FloorPlan } from '@/data/projects';
import { Icon } from '@/components/ui';

export interface ProjectFloorPlansProps {
  slug: string;
  floorPlans: FloorPlan[];
}

export function ProjectFloorPlans({ slug, floorPlans }: ProjectFloorPlansProps) {
  const [activePlanIndex, setActivePlanIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (index: number) => {
    setActivePlanIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
      <section className="py-12" style={{ backgroundColor: '#efebe7' }}>
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Rzuty i plan pomieszczeń
            </h2>
            <p className="text-text-secondary text-lg">
              Kliknij na rzut, aby zobaczyć go w powiększeniu
            </p>
          </div>

          {/* Floor Plan Switcher */}
          <div className="flex gap-4 mb-6">
            {floorPlans.map((plan, index) => (
              <button
                key={index}
                onClick={() => setActivePlanIndex(index)}
                className={`px-6 py-3 rounded-lg font-bold text-sm uppercase tracking-wide transition-all duration-300 ${
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
            <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-text-primary mb-4">
                {activePlan.name}
              </h3>
              <p className="text-text-secondary text-sm mb-6">
                Powierzchnia: <span className="font-bold text-text-primary">{activePlan.area}</span>
              </p>

              {/* Rooms List */}
              <div className="space-y-2 max-h-[500px] overflow-y-auto">
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

              {/* Total Area Summary */}
              <div className="mt-4 pt-4 border-t border-border-light">
                <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
                  <span className="text-text-primary font-bold uppercase text-sm">Razem</span>
                  <span className="text-text-primary font-bold text-lg">{activePlan.area}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal with Full-Screen Floor Plan + Rooms Table */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
          {/* Content - Full Width Layout */}
          <div className="w-full h-full grid grid-cols-1 lg:grid-cols-4 gap-0 relative">
            {/* Close Button - Positioned over the white table area */}
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 z-[10000] w-12 h-12 rounded-full bg-primary hover:bg-primary-dark flex items-center justify-center transition-colors duration-300 shadow-xl"
              aria-label="Zamknij rzut"
            >
              <Icon name="x" size="lg" className="text-white" />
            </button>
            {/* Left: Floor Plan Image - Full Height (3 columns, 75%) */}
            <div className="lg:col-span-3 relative bg-white flex items-center justify-center p-8">
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

            {/* Right: Rooms Table - Full Height (1 column, 25%) */}
            <div className="lg:col-span-1 bg-white flex flex-col overflow-hidden">
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
      )}
    </>
  );
}
