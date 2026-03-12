'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Icon, IconName } from '@/components/ui';
import { fadeInUp, viewportConfig } from '@/lib/animations';

interface WhyUsCard {
  icon: IconName;
  title: string;
  description: string;
}

export interface WhyUsSectionProps {
  label: string;
  title: string;
  competencies: WhyUsCard[];
}

export function WhyUsSection({ label, title, competencies }: WhyUsSectionProps) {
  return (
    <section className="py-12 lg:py-16 bg-background-beige">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            {label}
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-text-primary">
            {title}
          </h2>
        </motion.div>

        {/* 4 kolumny — max 4 karty */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {competencies.slice(0, 4).map((comp, index) => (
            <motion.div
              key={comp.title}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              transition={{ delay: index * 0.1 }}
              className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg hover:ring-2 hover:ring-primary/20 transition-all text-center"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Icon name={comp.icon} size="lg" className="text-primary" />
              </div>
              <h3 className="text-lg font-bold text-text-primary mt-4 group-hover:text-primary transition-colors">
                {comp.title}
              </h3>
              <p className="text-sm text-text-secondary mt-2 leading-relaxed">
                {comp.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
