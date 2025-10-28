'use client';

import React, { useState } from 'react';
import { Icon, IconName } from '@/components/ui';

// Content Block Types (same as TimelineStep)
type ContentBlock =
  | { type: 'paragraph'; value: string }
  | { type: 'list'; items: string[] };

export interface AccordionItemProps {
  iconName?: IconName;
  title: string;
  content: ContentBlock[];
}

export const AccordionItem: React.FC<AccordionItemProps> = ({ iconName, title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Render content block (paragraph or list)
  const renderContentBlock = (block: ContentBlock, index: number) => {
    if (block.type === 'paragraph') {
      return (
        <p
          key={index}
          className="mb-3 text-sm md:text-base leading-relaxed text-text/80"
          dangerouslySetInnerHTML={{
            __html: block.value.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
          }}
        />
      );
    }

    if (block.type === 'list') {
      return (
        <ul key={index} className="mb-3 space-y-1.5">
          {block.items.map((item, itemIndex) => (
            <li
              key={itemIndex}
              className="text-sm md:text-base leading-relaxed text-text/80"
              dangerouslySetInnerHTML={{
                __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
              }}
            />
          ))}
        </ul>
      );
    }

    return null;
  };

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-[0_0_20px_rgba(0,0,0,0.08)] transition-all hover:shadow-[0_0_25px_rgba(0,0,0,0.12)]">
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-4 md:p-5 text-left transition-colors hover:bg-gray-50/50"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3 pr-3">
          {iconName && (
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <Icon name={iconName} size="sm" className="text-primary" />
            </div>
          )}
          <span className={`text-base font-semibold sm:text-lg md:text-xl transition-colors ${
            isOpen ? 'text-primary' : 'text-text'
          }`}>
            {title}
          </span>
        </div>
        <Icon
          name="chevronDown"
          size="md"
          className={`shrink-0 text-primary transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Content */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-gray-100 px-4 md:px-5 py-4 accordion-content">
            {content.map((block, index) => renderContentBlock(block, index))}
          </div>
        </div>
      </div>
    </div>
  );
};
