'use client';

import React from 'react';
import Link from 'next/link';
import { clsx } from 'clsx';
import { useInView } from 'react-intersection-observer';
import { Icon } from '@/components/ui';
import type { ProjectCard } from '@/data/realizacje/types';

interface ProjectInfoCardProps {
  project: ProjectCard;
  stagesTotal: number;
  stagesCompleted: number;
}

export function ProjectInfoCard({ project, stagesTotal, stagesCompleted }: ProjectInfoCardProps) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const progress = Math.round((stagesCompleted / stagesTotal) * 100);
  const isCompleted = project.status === 'completed';

  const infoItems = [
    { icon: 'ruler' as const, label: 'Powierzchnia', value: `${project.surfaceArea} m\u00B2` },
    { icon: 'home' as const, label: 'Kondygnacje', value: project.floors },
    { icon: 'brickWall' as const, label: 'Technologia', value: project.technology },
    { icon: 'triangle' as const, label: 'Dach', value: project.roofType },
    { icon: 'mapPin' as const, label: 'Lokalizacja', value: project.location },
    { icon: 'calendar' as const, label: 'Start budowy', value: project.startDate },
  ];

  return (
    <div
      ref={ref}
      className={clsx(
        'bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden transition-all duration-700',
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      )}
    >
      <div className="p-6 md:p-8">
        {/* Status badge */}
        <div className="flex items-center justify-between mb-4">
          <span
            className={clsx(
              'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold',
              isCompleted
                ? 'bg-green-50 text-green-700 border border-green-200'
                : 'bg-primary/10 text-primary-dark border border-primary/30'
            )}
          >
            <span
              className={clsx(
                'w-2 h-2 rounded-full',
                isCompleted ? 'bg-green-500' : 'bg-primary animate-pulse'
              )}
            />
            {isCompleted ? 'Realizacja zakonczona' : 'Budowa w toku'}
          </span>
          {project.projectSource && (
            <span className="text-xs text-zinc-400">
              Projekt: {project.projectSource}
            </span>
          )}
        </div>

        {/* Info grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {infoItems.map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="h-9 w-9 rounded-lg bg-zinc-50 border border-zinc-100 flex items-center justify-center flex-shrink-0">
                <Icon name={item.icon} size="sm" className="text-primary" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold">
                  {item.label}
                </p>
                <p className="text-sm font-semibold text-zinc-800">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mb-5">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-zinc-500">
              Postep: etap {stagesCompleted} z {stagesTotal}
            </span>
            <span className="font-bold text-zinc-800">{progress}%</span>
          </div>
          <div className="h-3 bg-zinc-100 rounded-full overflow-hidden">
            <div
              className={clsx(
                'h-full rounded-full transition-all duration-1000 delay-500',
                isCompleted ? 'bg-green-500' : 'bg-primary'
              )}
              style={{ width: inView ? `${progress}%` : '0%' }}
            />
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/wycena"
            className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-zinc-900 font-bold text-sm px-5 py-3 rounded-xl transition-colors"
          >
            <Icon name="calculator" size="sm" />
            Sprawdź wycenę podobnego domu
          </Link>
          {project.city && (
            <Link
              href={`/obszar-dzialania/${project.city}`}
              className="inline-flex items-center justify-center gap-2 border border-zinc-200 hover:border-primary text-zinc-700 hover:text-primary font-medium text-sm px-5 py-3 rounded-xl transition-colors"
            >
              <Icon name="mapPin" size="sm" />
              Budowa domow w okolicy
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
