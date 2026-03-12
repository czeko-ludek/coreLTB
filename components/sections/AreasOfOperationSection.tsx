'use client';

import React, { useState, useCallback, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/shared';
import { Icon } from '@/components/ui';
import { MapTooltip } from '@/components/ui/MapTooltip';
import { PolandMapSVG } from '@/components/shared/PolandMapSVG';
import {
	VoivodeshipId,
	MapCity,
	mapVoivodeships,
	getVoivodeshipById,
	getMapStats,
} from '@/data/map-data';
import { fadeInUp, scaleIn, fadeIn } from '@/lib/animations';
import { clsx } from 'clsx';

/* ────────────────────────────────────────────
   Types (public API – re-exported from index)
   ──────────────────────────────────────────── */

export interface AreasCity {
	label: string;
	href: string;
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

const mapViewportConfig = {
	once: true,
	margin: '-50px 0px',
	amount: 0.2,
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

	/* — desktop: map state — */
	const tooltipContainerRef = useRef<HTMLDivElement>(null);
	const [view, setView] = useState<MapView>('overview');
	const [activeVoivodeship, setActiveVoivodeship] = useState<VoivodeshipId | null>(null);
	const [hoveredVoivodeship, setHoveredVoivodeship] = useState<VoivodeshipId | null>(null);
	const [tooltip, setTooltip] = useState<TooltipState | null>(null);

	const stats = getMapStats();

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

	const activeVoivName = activeVoivodeship
		? getVoivodeshipById(activeVoivodeship)?.name
		: null;

	return (
		<section id={id} className="bg-background-beige py-16 sm:py-20">
			<div className="mx-auto max-w-[83rem] px-4 sm:px-6 lg:px-8">

				{/* ═══════════════════════════════════════
				    SHARED: Section Header
				   ═══════════════════════════════════════ */}
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

				{/* ═══════════════════════════════════════
				    DESKTOP (lg+): Interactive SVG Map
				   ═══════════════════════════════════════ */}
				<motion.div
					className="hidden lg:block relative bg-white rounded-3xl shadow-[0_0_20px_rgba(0,0,0,0.05)] overflow-hidden map-wrapper"
					variants={fadeInUp}
					initial="hidden"
					whileInView="visible"
					viewport={mapViewportConfig}
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
						<motion.button
							onClick={handleBackClick}
							className="map-back-button absolute top-4 left-4 z-20"
							variants={fadeIn}
							initial="hidden"
							animate="visible"
						>
							<Icon name="chevronLeft" size="sm" />
							<span>Wszystkie województwa</span>
						</motion.button>
					)}

					{/* SVG Map */}
					<motion.div
						ref={tooltipContainerRef}
						className="relative aspect-[16/9] p-6"
						onClick={view === 'zoomed' ? handleBackClick : undefined}
						style={{
							cursor: view === 'zoomed' ? 'pointer' : 'default',
							transformOrigin: 'center center',
						}}
						variants={scaleIn}
						initial="hidden"
						whileInView="visible"
						viewport={mapViewportConfig}
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
				</motion.div>

				{/* ═══════════════════════════════════════
				    MOBILE (<lg): Hub Cards with city links
				   ═══════════════════════════════════════ */}
				<div ref={mobileRef} className="lg:hidden">
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
						{hubs.map((hub, index) => (
							<article
								key={index}
								className={clsx(
									'bg-white rounded-2xl p-6 shadow-sm border border-border-light',
									mobileInView ? 'animate-fade-in-up' : 'opacity-0',
								)}
								style={{ animationDelay: `${0.15 + index * 0.1}s` }}
							>
								{/* Hub icon + name */}
								<div className="flex items-center gap-3 mb-4">
									<div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
										<Icon
											name={hubIcons[index % hubIcons.length]}
											className="text-primary"
											size="md"
										/>
									</div>
									<h3 className="text-base font-semibold text-text-primary leading-tight">
										{hub.name}
									</h3>
								</div>

								{/* Cities list */}
								<ul className="space-y-1.5">
									{hub.cities.map((city, cityIndex) => (
										<li key={cityIndex}>
											<Link
												href={city.href}
												className="group flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors"
											>
												<span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors shrink-0" />
												{city.label}
											</Link>
										</li>
									))}
								</ul>
							</article>
						))}
					</div>
				</div>

				{/* CTA link — shared (both viewports) */}
				<div
					className={clsx(
						'mt-10 text-center',
						mobileInView ? 'animate-fade-in-up' : 'opacity-0',
						'lg:opacity-100 lg:animate-none',
					)}
					style={{ animationDelay: '0.5s' }}
				>
					<Link
						href="/obszar-dzialania"
						className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-dark transition-colors"
					>
						Zobacz pełną mapę i wszystkie lokalizacje
						<Icon name="arrowRight" size="sm" />
					</Link>
				</div>
			</div>
		</section>
	);
};
