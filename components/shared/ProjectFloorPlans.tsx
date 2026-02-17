'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';
import { FloorPlan } from '@/data/projects';
import { Icon, Portal } from '@/components/ui';
import { useToggle } from '@/hooks/useToggle';
import { useMirrorMode } from '@/contexts/MirrorModeContext';
import { MirrorToggle } from './MirrorToggle';

export interface ProjectFloorPlansProps {
  slug: string;
  floorPlans: FloorPlan[];
}

export function ProjectFloorPlans({ slug, floorPlans }: ProjectFloorPlansProps) {
  const [activePlanIndex, setActivePlanIndex] = useState(0);
  const [isModalOpen, , setIsModalOpen] = useToggle(false);
  const { hasMirror, getMirrorPath } = useMirrorMode();

  /** Resolve floor plan image path with mirror mode support */
  const getFloorPlanImagePath = useCallback(
    (planImage: string) => getMirrorPath(`/images/projekty/${slug}/${planImage}`),
    [slug, getMirrorPath]
  );

  // --- Pan/Zoom state (stored in refs — no React re-render on every wheel/mouse event) ---
  // Two refs needed: mobile AND desktop are both in DOM simultaneously (CSS hides one).
  // applyTransformDOM updates both so whichever is visible gets the correct transform.
  const mobileImageWrapperRef = useRef<HTMLDivElement | null>(null);
  const desktopImageWrapperRef = useRef<HTMLDivElement | null>(null);
  const transformRef = useRef({ scale: 1, x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ mouseX: 0, mouseY: 0, startX: 0, startY: 0 });

  // Only this triggers React re-render — the % number displayed in the badge
  const [displayScale, setDisplayScale] = useState(100);

  /** Apply transform directly to DOM — bypasses React reconciliation for smooth 60fps */
  const applyTransformDOM = useCallback((scale: number, x: number, y: number) => {
    transformRef.current = { scale, x, y };
    const css = `translate(${x}px, ${y}px) scale(${scale})`;
    // Update both wrappers — only the currently visible one matters visually
    if (mobileImageWrapperRef.current) mobileImageWrapperRef.current.style.transform = css;
    if (desktopImageWrapperRef.current) desktopImageWrapperRef.current.style.transform = css;
    // Avoid re-render if displayed % hasn't changed
    const rounded = Math.round(scale * 100);
    setDisplayScale(prev => (prev !== rounded ? rounded : prev));
  }, []);

  const resetTransform = useCallback(() => {
    applyTransformDOM(1, 0, 0);
  }, [applyTransformDOM]);

  const openModal = useCallback((index: number) => {
    setActivePlanIndex(index);
    setIsModalOpen(true);
    transformRef.current = { scale: 1, x: 0, y: 0 };
    setDisplayScale(100);
    // Reset deferred — wrappers not yet mounted at this point (Portal renders after)
    requestAnimationFrame(() => {
      const css = 'translate(0px, 0px) scale(1)';
      if (mobileImageWrapperRef.current) mobileImageWrapperRef.current.style.transform = css;
      if (desktopImageWrapperRef.current) desktopImageWrapperRef.current.style.transform = css;
    });
  }, [setIsModalOpen]);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    resetTransform();
  }, [setIsModalOpen, resetTransform]);

  /** Switch floor plan inside the modal — reset zoom so the new plan is centered */
  const switchPlanInModal = useCallback((index: number) => {
    setActivePlanIndex(index);
    resetTransform();
  }, [resetTransform]);

  // Zoom buttons (step-based, zoom toward center)
  const zoomIn = useCallback(() => {
    const { scale, x, y } = transformRef.current;
    const newScale = Math.min(scale * 1.4, 6);
    const factor = newScale / scale;
    // Zoom toward center → cx=0, cy=0 → newX = x * factor
    applyTransformDOM(newScale, x * factor, y * factor);
  }, [applyTransformDOM]);

  const zoomOut = useCallback(() => {
    const { scale, x, y } = transformRef.current;
    const newScale = Math.max(scale / 1.4, 1);
    if (newScale <= 1.01) {
      applyTransformDOM(1, 0, 0); // full reset — snap back to center
    } else {
      const factor = newScale / scale;
      applyTransformDOM(newScale, x * factor, y * factor);
    }
  }, [applyTransformDOM]);

  // 1. Body scroll lock when modal open
  useEffect(() => {
    document.body.style.overflow = isModalOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isModalOpen]);

  // 2. ESC closes modal
  useEffect(() => {
    if (!isModalOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isModalOpen, closeModal]);

  /**
   * 3. Callback ref for the image viewport container (React 19 — returns cleanup).
   *    Attaches wheel (zoom toward cursor) + mouse drag (pan) listeners immediately
   *    when the DOM element mounts — no timing issues with Portal.
   *
   *    Math: transform-origin: center center
   *      cx = mouseX - containerWidth/2  (cursor relative to container center)
   *      factor = newScale / oldScale
   *      newTx = cx * (1 - factor) + tx * factor   (zoom toward cursor, not center)
   */
  const containerCallbackRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;

    // --- Wheel → smooth zoom toward cursor ---
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      const rect = node.getBoundingClientRect();
      const cx = e.clientX - rect.left - node.clientWidth / 2;
      const cy = e.clientY - rect.top - node.clientHeight / 2;

      const { scale, x, y } = transformRef.current;

      // Smooth exponential zoom — feels like trackpad/Google Maps
      const factor = Math.pow(0.998, e.deltaY);
      const newScale = Math.min(Math.max(scale * factor, 1), 6);

      // Clamp back to 1 (reset position) when zooming out below minimum
      if (newScale <= 1.005) {
        applyTransformDOM(1, 0, 0);
        return;
      }

      const f = newScale / scale;
      const newX = cx * (1 - f) + x * f;
      const newY = cy * (1 - f) + y * f;

      applyTransformDOM(newScale, newX, newY);
    };

    // --- Mouse drag → pan ---
    const handleMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return; // left button only
      isDraggingRef.current = true;
      dragStartRef.current = {
        mouseX: e.clientX,
        mouseY: e.clientY,
        startX: transformRef.current.x,
        startY: transformRef.current.y,
      };
      node.style.cursor = 'grabbing';
      e.preventDefault();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const dx = e.clientX - dragStartRef.current.mouseX;
      const dy = e.clientY - dragStartRef.current.mouseY;
      applyTransformDOM(
        transformRef.current.scale,
        dragStartRef.current.startX + dx,
        dragStartRef.current.startY + dy
      );
    };

    const stopDrag = () => {
      isDraggingRef.current = false;
      node.style.cursor = 'grab';
    };

    node.addEventListener('wheel', handleWheel, { passive: false });
    node.addEventListener('mousedown', handleMouseDown);
    node.addEventListener('mousemove', handleMouseMove);
    node.addEventListener('mouseup', stopDrag);
    node.addEventListener('mouseleave', stopDrag);

    // React 19: cleanup called on unmount
    return () => {
      node.removeEventListener('wheel', handleWheel);
      node.removeEventListener('mousedown', handleMouseDown);
      node.removeEventListener('mousemove', handleMouseMove);
      node.removeEventListener('mouseup', stopDrag);
      node.removeEventListener('mouseleave', stopDrag);
    };
  }, [applyTransformDOM]);

  const activePlan = floorPlans[activePlanIndex];

  return (
    <>
      <section className="py-8 md:py-12 bg-background-beige">
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
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:items-stretch">
            {/* Left: Floor Plan Image (3 columns, 70% width) - Clickable */}
            <div className="lg:col-span-3 lg:flex lg:flex-col">
              <div
                className="relative bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer group lg:flex-1"
                onClick={() => openModal(activePlanIndex)}
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={getFloorPlanImagePath(activePlan.image)}
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

                {/* Mirror Toggle */}
                {hasMirror && (
                  <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10" onClick={(e) => e.stopPropagation()}>
                    <MirrorToggle />
                  </div>
                )}
              </div>
            </div>

            {/* Right: Rooms Table (2 columns, 30% width) - Always Visible */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-4 md:p-6 flex flex-col">
              <h3 className="text-lg md:text-xl font-bold text-text-primary mb-3 md:mb-4 flex-shrink-0">
                {activePlan.name}
              </h3>
              <p className="text-text-secondary text-sm mb-4 md:mb-6 flex-shrink-0">
                Powierzchnia: <span className="font-bold text-text-primary">{activePlan.area}</span>
              </p>

              {/* Rooms List */}
              <div className="space-y-2 flex-1 overflow-y-auto min-h-0">
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
              <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-border-light flex-shrink-0">
                <div className="flex items-center justify-between p-2.5 md:p-3 bg-primary/10 rounded-lg">
                  <span className="text-text-primary font-bold uppercase text-xs md:text-sm">Razem</span>
                  <span className="text-text-primary font-bold text-base md:text-lg">{activePlan.area}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Modal ─────────────────────────────────────────────────────────────── */}
      {isModalOpen && (
        <Portal>
          <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">

            {/* ── MOBILE: Stacked (image top, table bottom) ── */}
            <div className="lg:hidden w-full h-full flex flex-col bg-white">
              {/* Top bar: Floor Plan Switcher + Close Button */}
              <div className="flex items-center gap-2 p-3 bg-white border-b border-gray-200 flex-shrink-0">
                {floorPlans.length > 1 && floorPlans.map((plan, index) => (
                  <button
                    key={index}
                    onClick={() => switchPlanInModal(index)}
                    className={`px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wide transition-all duration-300 whitespace-nowrap ${
                      activePlanIndex === index
                        ? 'bg-primary text-white shadow-lg'
                        : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
                    }`}
                  >
                    {plan.name}
                  </button>
                ))}
                <button
                  onClick={closeModal}
                  className="ml-auto w-10 h-10 rounded-full bg-primary hover:bg-primary-dark flex items-center justify-center transition-colors duration-300 shadow-xl flex-shrink-0"
                  aria-label="Zamknij rzut"
                >
                  <Icon name="x" size="md" className="text-white" />
                </button>
              </div>
              {/* Image viewport — cursor:grab, overflow hidden */}
              <div
                ref={containerCallbackRef}
                className="relative bg-gray-50 flex-1 overflow-hidden cursor-grab select-none"
              >
                {/* Image wrapper — transform applied directly here */}
                <div
                  ref={mobileImageWrapperRef}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    transformOrigin: 'center center',
                    transform: 'translate(0px, 0px) scale(1)',
                    willChange: 'transform',
                  }}
                >
                  <Image
                    src={getFloorPlanImagePath(activePlan.image)}
                    alt={`Rzut ${activePlan.name}`}
                    fill
                    className="object-contain p-4"
                    sizes="100vw"
                  />
                </div>

                {/* Zoom badge — top-left */}
                <div className="absolute top-3 left-3 z-10 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-lg pointer-events-none">
                  <span className="text-white text-xs font-bold">{displayScale}%</span>
                </div>
              </div>

              {/* Zoom Controls bar */}
              <div className="flex justify-center items-center gap-3 py-3 bg-gray-100 border-t border-gray-200">
                <button
                  onClick={zoomOut}
                  disabled={displayScale <= 100}
                  className="w-9 h-9 rounded-full bg-primary hover:bg-primary-dark disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                  aria-label="Pomniejsz"
                >
                  <Icon name="minus" size="sm" className="text-white" />
                </button>
                <button
                  onClick={resetTransform}
                  className="px-3 py-1.5 rounded-full bg-white border border-gray-300 text-xs font-bold text-text-primary hover:border-primary transition-colors"
                >
                  Reset
                </button>
                <button
                  onClick={zoomIn}
                  disabled={displayScale >= 600}
                  className="w-9 h-9 rounded-full bg-primary hover:bg-primary-dark disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                  aria-label="Powiększ"
                >
                  <Icon name="plus" size="sm" className="text-white" />
                </button>
              </div>

              {/* Rooms Table */}
              <div className="bg-white border-t border-gray-200 max-h-[35vh] overflow-y-auto overscroll-contain">
                <div className="p-4 border-b border-border-light sticky top-0 bg-white z-10">
                  <h3 className="text-base font-bold text-text-primary">
                    {activePlan.name} — <span className="text-primary">{activePlan.area}</span>
                  </h3>
                </div>
                <div className="p-4 space-y-2">
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
                <div className="p-4 border-t border-border-light bg-gray-50">
                  <div className="flex items-center justify-between p-2.5 bg-primary/10 rounded-lg">
                    <span className="text-text-primary font-bold uppercase text-xs">Razem</span>
                    <span className="text-text-primary font-bold">{activePlan.area}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ── DESKTOP: Side-by-side (image 75% | table 25%) ── */}
            <div className="hidden lg:grid w-full h-full grid-cols-4">
              {/* Left: Image + controls */}
              <div className="col-span-3 flex flex-col bg-gray-50">
                {/* Image viewport */}
                <div
                  ref={containerCallbackRef}
                  className="relative flex-1 overflow-hidden cursor-grab select-none"
                >
                  {/* Image wrapper — transform here */}
                  <div
                    ref={desktopImageWrapperRef}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      transformOrigin: 'center center',
                      transform: 'translate(0px, 0px) scale(1)',
                      willChange: 'transform',
                    }}
                  >
                    <Image
                      src={getFloorPlanImagePath(activePlan.image)}
                      alt={`Rzut ${activePlan.name}`}
                      fill
                      className="object-contain p-8"
                      sizes="75vw"
                    />
                  </div>

                  {/* Zoom badge */}
                  <div className="absolute top-4 left-4 z-10 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-lg pointer-events-none">
                    <span className="text-white text-sm font-bold">{displayScale}%</span>
                  </div>
                </div>

                {/* Zoom Controls bar */}
                <div className="flex items-center justify-between gap-4 px-6 py-3 bg-white border-t border-gray-200">
                  {/* Hint */}
                  <p className="text-xs text-text-muted hidden xl:block">
                    Kółko myszy — przybliż/oddal &nbsp;·&nbsp; Przytrzymaj i przeciągnij — przesuń
                  </p>
                  {/* Buttons */}
                  <div className="flex items-center gap-3 mx-auto xl:mx-0">
                    <button
                      onClick={zoomOut}
                      disabled={displayScale <= 100}
                      className="w-10 h-10 rounded-full bg-primary hover:bg-primary-dark disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                      aria-label="Pomniejsz"
                    >
                      <Icon name="minus" size="md" className="text-white" />
                    </button>
                    <button
                      onClick={resetTransform}
                      className="px-4 py-1.5 rounded-full bg-white border border-gray-300 text-sm font-bold text-text-primary hover:border-primary transition-colors"
                    >
                      Reset
                    </button>
                    <button
                      onClick={zoomIn}
                      disabled={displayScale >= 600}
                      className="w-10 h-10 rounded-full bg-primary hover:bg-primary-dark disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                      aria-label="Powiększ"
                    >
                      <Icon name="plus" size="md" className="text-white" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Right: Rooms Table */}
              <div className="col-span-1 bg-white flex flex-col overflow-hidden border-l border-gray-200">
                {/* Top bar: Floor Plan Switcher + Close Button */}
                <div className="flex items-center gap-2 p-4 border-b border-gray-200 flex-shrink-0">
                  {floorPlans.length > 1 && floorPlans.map((plan, index) => (
                    <button
                      key={index}
                      onClick={() => switchPlanInModal(index)}
                      className={`flex-1 px-3 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wide transition-all duration-300 ${
                        activePlanIndex === index
                          ? 'bg-primary text-white shadow-lg'
                          : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
                      }`}
                    >
                      {plan.name}
                    </button>
                  ))}
                  <button
                    onClick={closeModal}
                    className="ml-auto w-10 h-10 rounded-full bg-primary hover:bg-primary-dark flex items-center justify-center transition-colors duration-300 shadow-xl flex-shrink-0"
                    aria-label="Zamknij rzut"
                  >
                    <Icon name="x" size="md" className="text-white" />
                  </button>
                </div>
                <div className="p-6 border-b border-border-light flex-shrink-0">
                  <h3 className="text-xl font-bold text-text-primary mb-1">
                    {activePlan.name}
                  </h3>
                  <p className="text-text-secondary text-sm">
                    Powierzchnia: <span className="font-bold text-primary">{activePlan.area}</span>
                  </p>
                </div>

                <div className="flex-1 overflow-y-auto overscroll-y-contain p-4">
                  <div className="space-y-2">
                    {activePlan.rooms.map((room, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <span className="text-text-primary font-medium text-sm">{room.name}</span>
                        <span className="text-text-primary font-bold text-sm">{room.area}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-5 border-t border-border-light bg-gray-50 flex-shrink-0">
                  <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
                    <span className="text-text-primary font-bold uppercase text-sm">Razem</span>
                    <span className="text-text-primary font-bold text-lg">{activePlan.area}</span>
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
