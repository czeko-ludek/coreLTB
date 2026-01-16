'use client';

import { useState, useEffect } from 'react';
import { Icon, IconName } from '@/components/ui';

export interface TOCSection {
  id: string;
  label: string;
  icon: IconName;
}

interface TableOfContentsProps {
  sections: TOCSection[];
}

export function TableOfContents({ sections }: TableOfContentsProps) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id || '');
  const [showTOC, setShowTOC] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show TOC after scrolling past hero (PageHeader)
      const heroHeight = 500; // Approximate PageHeader + Intro height
      setShowTOC(window.scrollY > heroHeight);

      // Update active section based on scroll position
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + window.scrollY;
          const elementBottom = elementTop + rect.height;

          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  return (
    <div
      className={`
        hidden xl:block flex-shrink-0 transition-all duration-500 ease-out
        ${isCollapsed ? 'w-0' : 'w-56 -ml-[200px]'}
      `}
    >
      <nav className={`
        bg-white rounded-2xl shadow-lg border border-gray-100 transform-gpu overflow-hidden transition-all duration-500
        ${isCollapsed
          ? 'fixed left-4 top-[180px] w-16 z-50'
          : 'sticky top-[180px] z-40'
        }
        ${showTOC
          ? 'opacity-100 translate-x-0'
          : 'opacity-0 -translate-x-8 pointer-events-none'
        }
      `}>
        {/* Toggle Button */}
        <div className="border-b border-gray-100 p-2">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-gray-50 transition-colors group"
            aria-label={isCollapsed ? 'Rozwiń spis treści' : 'Zwiń spis treści'}
          >
            <Icon
              name={isCollapsed ? 'chevronRight' : 'chevronLeft'}
              className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors"
            />
          </button>
        </div>

        {/* Collapsed View - Only Icons */}
        {isCollapsed && (
          <div className="p-2 space-y-1.5">
            {sections.map((section, index) => {
              const isActive = activeSection === section.id;

              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  title={section.label}
                  className={`
                    group flex items-center justify-center p-2.5 rounded-lg transition-all duration-300
                    ${isActive
                      ? 'bg-primary text-white shadow-md shadow-primary/20'
                      : 'hover:bg-gray-50 text-gray-600'
                    }
                  `}
                  style={{
                    transitionDelay: showTOC ? `${index * 30}ms` : '0ms'
                  }}
                >
                  <Icon
                    name={section.icon}
                    className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-white' : 'text-gray-600 group-hover:text-primary'
                    }`}
                  />
                  {isActive && (
                    <div className="absolute right-0 w-1 h-6 bg-primary rounded-l-full" />
                  )}
                </a>
              );
            })}
          </div>
        )}

        {/* Expanded View - Full TOC */}
        {!isCollapsed && (
          <div className="p-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 px-2">
              Spis Treści
            </h3>
            <div className="space-y-1.5">
              {sections.map((section, index) => {
                const isActive = activeSection === section.id;

                return (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className={`
                      group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300
                      ${isActive
                        ? 'bg-primary text-white shadow-md shadow-primary/20'
                        : 'hover:bg-gray-50 text-gray-600'
                      }
                    `}
                    style={{
                      transitionDelay: showTOC ? `${index * 40}ms` : '0ms'
                    }}
                  >
                    <div
                      className={`
                        flex items-center justify-center
                        w-8 h-8
                        rounded-lg
                        flex-shrink-0
                        transition-all duration-300
                        ${isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-gray-100 text-gray-600 group-hover:bg-primary/10 group-hover:text-primary'
                        }
                      `}
                    >
                      <Icon name={section.icon} className="w-4 h-4" />
                    </div>

                    <p
                      className={`
                        text-sm font-semibold leading-tight flex-1
                        ${isActive ? 'text-white' : 'text-gray-900 group-hover:text-primary'}
                      `}
                    >
                      {section.label}
                    </p>

                    {isActive && (
                      <div className="w-1 h-6 bg-white rounded-full" />
                    )}
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
