'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Icon, IconName } from '@/components/ui';
import { SectionHeader, SectionHeaderProps } from '@/components/shared/SectionHeader';
import { fadeInUp, viewportConfig } from '@/lib/animations';

export interface ServicePillar {
  icon: IconName;
  title: string;
  description: string;
  bullets: string[];
  href: string;
  linkText: string;
}

export interface ServicePillarsSectionProps {
  header: SectionHeaderProps;
  pillars: ServicePillar[];
}

export function ServicePillarsSection({ header, pillars }: ServicePillarsSectionProps) {
  return (
    <section className="bg-background-beige py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={viewportConfig}>
          <SectionHeader {...header} />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {pillars.map((pillar, index) => (
            <Link key={pillar.title} href={pillar.href} className="group">
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                transition={{ delay: index * 0.15 }}
                className="bg-white rounded-2xl p-8 shadow-sm group-hover:shadow-lg group-hover:ring-2 group-hover:ring-primary/20 transition-all flex flex-col h-full"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon name={pillar.icon} className="text-primary" size="lg" />
                </div>

                <h3 className="text-h5 font-heading font-bold mt-4 group-hover:text-primary transition-colors">{pillar.title}</h3>
                <p className="text-body-sm text-text-secondary mt-2">{pillar.description}</p>

                <ul className="space-y-2 mt-4">
                  {pillar.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2 text-body-sm text-text-secondary">
                      <Icon name="check" size="sm" className="text-primary mt-0.5 shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <span className="mt-auto pt-6 inline-flex items-center gap-2 text-primary font-bold group-hover:text-primary-dark transition-colors">
                  {pillar.linkText}
                  <Icon name="arrowRight" size="sm" className="transition-transform group-hover:translate-x-1" />
                </span>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
