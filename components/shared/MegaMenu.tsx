'use client';

import React from 'react';
import Link from 'next/link';
import { Icon } from '@/components/ui';

export interface MegaMenuItem {
  icon: string;
  title: string;
  description: string;
  href: string;
}

export interface MegaMenuProps {
  items: MegaMenuItem[];
  isOpen: boolean;
}

export function MegaMenu({ items, isOpen }: MegaMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="bg-white shadow-2xl rounded-b-lg overflow-hidden" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="group flex gap-4 p-6 rounded-lg hover:bg-gray-50 transition-all duration-300 border border-transparent hover:border-primary/20"
            >
              {/* Icon */}
              <div className="flex-shrink-0">
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Icon name={item.icon} size="lg" className="text-primary" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                  {item.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
