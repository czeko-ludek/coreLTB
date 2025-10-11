import React from 'react';
import { SectionHeader, SectionHeaderProps, BlogPostCard, BlogPostCardProps } from '@/components/shared';

export interface BlogSectionProps {
  header: SectionHeaderProps;
  posts: BlogPostCardProps[];
}

export function BlogSection({ header, posts }: BlogSectionProps) {
  return (
    <section className="section-with-bg py-20">
      <div className="container mx-auto px-4">
        <SectionHeader {...header} align="center" theme="light" />
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <BlogPostCard key={index} {...post} />
          ))}
        </div>
      </div>
    </section>
  );
}

