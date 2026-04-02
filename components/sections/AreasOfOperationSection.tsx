'use client';

import React, { useState, useCallback, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useInView } from 'react-intersection-observer';
import { SectionHeader } from '@/components/shared';
import { Icon } from '@/components/ui';
import { MapTooltip } from '@/components/ui/MapTooltip';
import { PolandMapSVG } from '@/components/shared/PolandMapSVG';
import './AreasOfOperation.css';
import {
	VoivodeshipId,
	MapCity,
	mapVoivodeships,
	getVoivodeshipById,
} from '@/data/map-data';
import { clsx } from 'clsx';

/* ────────────────────────────────────────────
   Types (public API – re-exported from index)
   ──────────────────────────────────────────── */

export interface AreasCity {
	label: string;
	href?: string;
}

export interface AreasHub {
	name: string;
	cities: AreasCity[];
}

export interface AreasOfOperationSectionProps {
	id?: string;
	header: {
		label: string;
		title: string;
		description?: string;
	};
	hubs: AreasHub[];
}

/* ────────────────────────────────────────────
   Internal helpers
   ──────────────────────────────────────────── */

const hubIcons = ['mapPin', 'building', 'map'] as const;

type MapView = 'overview' | 'zoomed';

interface TooltipState {
	cityId: string;
	position: { x: number; y: number };
}

/* CSS transition style for fade-in-up on scroll */
const cssTransitionStyle = {
	transitionProperty: 'opacity, transform',
	transitionDuration: '600ms',
	transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
} as const;

/* ────────────────────────────────────────────
   Component
   ──────────────────────────────────────────── */

export const AreasOfOperationSection: React.FC<AreasOfOperationSectionProps> = ({
	id,
	header,
	hubs,
}) => {
	const router = useRouter();

	/* — mobile: inView trigger — */
	const { ref: mobileRef, inView: mobileInView } = useInView({
		threshold: 0.1,
		triggerOnce: true,
		rootMargin: '50px 0px',
	});

	/* — desktop: inView triggers for CSS transitions — */
	const { ref: headerRef, inView: headerInView } = useInView({ triggerOnce: true, threshold: 0.2 });
	const { ref: mapContainerRef, inView: mapContainerInView } = useInView({ triggerOnce: true, threshold: 0.15 });

	/* — desktop: map state — */
	const tooltipContainerRef = useRef<HTMLDivElement>(null);
	const [view, setView] = useState<MapView>('overview');
	const [activeVoivodeship, setActiveVoivodeship] = useState<VoivodeshipId | null>(null);
	const [hoveredVoivodeship, setHoveredVoivodeship] = useState<VoivodeshipId | null>(null);
	const [tooltip, setTooltip] = useState<TooltipState | null>(null);

	/* — map handlers — */
	const handleVoivodeshipClick = useCallback(
		(voivodeshipId: VoivodeshipId) => {
			if (view === 'overview') {
				setActiveVoivodeship(voivodeshipId);
				setView('zoomed');
				setHoveredVoivodeship(null);
			} else {
				setView('overview');
				setActiveVoivodeship(null);
				setTooltip(null);
			}
		},
		[view],
	);

	const handleVoivodeshipHover = useCallback(
		(voivodeshipId: VoivodeshipId | null) => {
			if (view === 'overview') setHoveredVoivodeship(voivodeshipId);
		},
		[view],
	);

	const handleCityClick = useCallback(
		(city: MapCity) => {
			if (city.hasPage && city.slug) {
				router.push(`/obszar-dzialania/${city.slug}`);
			}
		},
		[router],
	);

	const handleCityHover = useCallback(
		(cityId: string | null, position?: { x: number; y: number }) => {
			if (cityId && position) {
				setTooltip({ cityId, position });
			} else {
				setTooltip(null);
			}
		},
		[],
	);

	const handleBackClick = useCallback(() => {
		setView('overview');
		setActiveVoivodeship(null);
		setTooltip(null);
	}, []);

	return (
		<section id={id} className="bg-background-beige py-8 md:py-16 sm:py-20">
			<div className="mx-auto max-w-[83rem] px-4 sm:px-6 lg:px-8">

				{/* ═══════════════════════════════════════
				    SHARED: Section Header
				   ═══════════════════════════════════════ */}
				<div
					ref={headerRef}
					className={clsx(
						'mb-6 md:mb-12',
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

				{/* ═══════════════════════════════════════
				    DESKTOP (lg+): Interactive SVG Map
				   ═══════════════════════════════════════ */}
				<div
					ref={mapContainerRef}
					className={clsx(
						'hidden lg:block relative bg-white rounded-3xl shadow-[0_0_20px_rgba(0,0,0,0.05)] overflow-hidden map-wrapper',
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

					{/* Back Button (zoomed mode) */}
					{view === 'zoomed' && (
						<button
							onClick={handleBackClick}
							className="map-back-button absolute top-4 left-4 z-20 animate-[fadeIn_400ms_ease-out_forwards]"
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

						{/* Voivodeship hover label */}
						{view === 'overview' && hoveredVoivodeship && (
							<div
								className="voivodeship-hover-label"
								data-voivodeship={hoveredVoivodeship}
							>
								{getVoivodeshipById(hoveredVoivodeship)?.name}
							</div>
						)}

						{/* Tooltip */}
						{tooltip && view === 'zoomed' && (
							<MapTooltip cityId={tooltip.cityId} position={tooltip.position} />
						)}
					</div>

					{/* Legend removed — clean map */}

					{/* Instructions (overview) */}
					{view === 'overview' && (
						<div
							className={clsx(
								'absolute bottom-4 left-4 z-20',
								'px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full',
								'text-xs text-gray-400',
								'flex items-center gap-2',
							)}
						>
							<Icon name="mousePointer" size="sm" className="text-gray-400" />
							<span>Kliknij lub najedź na mapę / etykietę powyżej</span>
						</div>
					)}
				</div>

				{/* ═══════════════════════════════════════
				    MOBILE (<lg): Hub Cards with city links
				   ═══════════════════════════════════════ */}
				<div ref={mobileRef} className="lg:hidden space-y-5">
					{hubs.map((hub, index) => (
						<div
							key={index}
							className={clsx(
								mobileInView ? 'animate-fade-in-up' : 'opacity-0',
							)}
							style={{ animationDelay: `${0.15 + index * 0.1}s` }}
						>
							{/* Hub name */}
							<div className="flex items-center gap-2 mb-3">
								<div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
									<Icon
										name={hubIcons[index % hubIcons.length]}
										className="text-primary"
										size="sm"
									/>
								</div>
								<h3 className="text-sm font-semibold text-text-primary">
									{hub.name}
								</h3>
							</div>

							{/* Cities as button-style cards */}
							<div className="grid grid-cols-2 gap-2">
								{hub.cities.map((city, cityIndex) => {
									const classes = "flex items-center gap-2.5 rounded-lg border border-gray-200 bg-white px-3 py-2.5 transition-all";
									if (city.href) {
										return (
											<Link
												key={cityIndex}
												href={city.href}
												className={`${classes} hover:border-primary hover:shadow-sm`}
											>
												<Icon name="mapPin" className="h-4 w-4 text-primary shrink-0" />
												<span className="text-xs font-medium text-zinc-800">{city.label}</span>
											</Link>
										);
									}
									return (
										<div key={cityIndex} className={`${classes} opacity-60`}>
											<Icon name="mapPin" className="h-4 w-4 text-gray-400 shrink-0" />
											<span className="text-xs font-medium text-zinc-500">{city.label}</span>
										</div>
									);
								})}
							</div>
						</div>
					))}
				</div>

				{/* CTA link — shared (both viewports) */}
				<div
					className={clsx(
						'mt-6 md:mt-10 text-center',
						mobileInView ? 'animate-fade-in-up' : 'opacity-0',
						'lg:opacity-100 lg:animate-none',
					)}
					style={{ animationDelay: '0.5s' }}
				>
					<Link
						href="/obszar-dzialania"
						className="inline-flex items-center justify-center gap-2 bg-zinc-900 text-white font-bold px-5 py-2.5 rounded-sm text-xs uppercase tracking-wider hover:bg-zinc-800 transition-colors"
					>
						Zobacz pełną mapę i wszystkie lokalizacje
						<Icon name="arrowRight" size="sm" />
					</Link>
				</div>
			</div>
		</section>
	);
};
