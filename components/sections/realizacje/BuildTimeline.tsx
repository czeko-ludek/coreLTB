'use client';

import React from 'react';
import type { BuildStage, MidBuildCTA } from '@/data/realizacje/types';
import { BuildStageEntry } from './BuildStageEntry';
import { MidBuildCTABlock } from './MidBuildCTABlock';

interface BuildTimelineProps {
  stages: BuildStage[];
  midCTAs?: MidBuildCTA[];
  /** Map of stageId -> global image index offset (for shared lightbox) */
  stageImageOffsets: Record<string, number>;
  /** Open shared lightbox at global index */
  onImageClick: (globalIndex: number) => void;
}

export function BuildTimeline({ stages, midCTAs = [], stageImageOffsets, onImageClick }: BuildTimelineProps) {
  const sortedStages = [...stages].sort((a, b) => a.order - b.order);

  // Build interleaved list of stages + CTAs
  const elements: Array<{ type: 'stage'; data: BuildStage } | { type: 'cta'; data: MidBuildCTA }> = [];

  for (const stage of sortedStages) {
    elements.push({ type: 'stage', data: stage });
    const cta = midCTAs.find((c) => c.afterStageOrder === stage.order);
    if (cta) {
      elements.push({ type: 'cta', data: cta });
    }
  }

  return (
    <div className="prose prose-lg max-w-none blog-prose">
      {elements.map((el, i) => {
        if (el.type === 'stage') {
          return (
            <BuildStageEntry
              key={`stage-${el.data.id}`}
              stage={el.data}
              index={i}
              isLast={i === elements.length - 1}
              globalImageOffset={stageImageOffsets[el.data.id] ?? 0}
              onImageClick={onImageClick}
            />
          );
        }
        return (
          <MidBuildCTABlock
            key={`cta-${el.data.afterStageOrder}`}
            cta={el.data}
          />
        );
      })}
    </div>
  );
}
