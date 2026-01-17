'use client';

import React from 'react';
import { useInView } from 'react-intersection-observer';
import { clsx } from 'clsx';
import { SectionHeader, SectionHeaderProps, BlogPostCard, BlogPostCardProps } from '@/components/shared';

export interface BlogSectionProps {
  header: SectionHeaderProps;
  posts: BlogPostCardProps[];
}

export function BlogSection({ header, posts }: BlogSectionProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: '50px 0px',
  });

  return (
    <section ref={ref} className="section-with-bg py-20">
      <div className="container mx-auto px-4">
        <div
          className={clsx(inView ? 'animate-fade-in-up' : 'opacity-0')}
          style={{ animationDelay: '0.1s' }}
        >
          <SectionHeader {...header} align="center" theme="light" />
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <div
              key={index}
              className={clsx(inView ? 'animate-fade-in-up' : 'opacity-0')}
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <BlogPostCard {...post} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
