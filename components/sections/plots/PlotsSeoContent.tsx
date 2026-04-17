import React from 'react';

interface PlotsSeoContentProps {
  content: string;
}

export function PlotsSeoContent({ content }: PlotsSeoContentProps) {
  return (
    <div className="mt-16 md:mt-20">
      {/* Subtle separator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-12" />

      <div className="seo-content-grid">
        <div
          className="seo-rich-content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
}
