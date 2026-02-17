'use client';

import React from 'react';
import Link from 'next/link';
import { SectionHeader } from '@/components/shared';
import { Icon, IconName } from '@/components/ui';

interface KnowledgeArticle {
    icon: IconName;
    title: string;
    desc: string;
    href: string;
    highlight?: boolean;
}

interface BentoKnowledgeSectionProps {
    header: {
        label: string;
        title: string;
        description: string;
    };
    articles: KnowledgeArticle[];
}

export const BentoKnowledgeSection: React.FC<BentoKnowledgeSectionProps> = ({ header, articles }) => {
    return (
        <section className="bg-background-beige py-16 sm:py-20 lg:py-24">
            <div className="mx-auto max-w-[96rem] px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12">
                    <SectionHeader
                        label={header.label}
                        title={header.title}
                        description={header.description}
                        align="center"
                        theme="light"
                    />
                </div>

                {/* Knowledge Cards Grid - 2x2 on Desktop, Stack on Mobile */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    {articles.map((article, index) => (
                        <Link
                            key={index}
                            href={article.href}
                            className={`
                                bg-white rounded-3xl p-8 
                                border 
                                ${article.highlight ? 'border-primary' : 'border-gray-100'}
                                hover:border-primary 
                                shadow-sm 
                                hover:shadow-[0_10px_40px_-10px_rgba(26,26,26,0.1)] 
                                transition-all duration-300 
                                group
                                flex flex-col
                            `}
                        >
                            {/* Icon Circle */}
                            <div className={`
                                w-14 h-14 rounded-full mb-6 
                                flex items-center justify-center
                                ${article.highlight
                                    ? 'bg-primary text-white'
                                    : 'bg-background-light text-primary group-hover:bg-primary group-hover:text-white'
                                }
                                transition-all duration-300
                            `}>
                                <Icon name={article.icon} className="w-6 h-6" />
                            </div>

                            {/* Title */}
                            <h3 className="text-xl lg:text-2xl font-bold text-text-dark mb-3 leading-tight group-hover:text-primary transition-colors">
                                {article.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-600 text-sm lg:text-base leading-relaxed flex-grow">
                                {article.desc}
                            </p>

                            {/* Read More Arrow */}
                            <div className="mt-6 flex items-center gap-2 text-primary font-semibold text-sm">
                                <span>Czytaj więcej</span>
                                <Icon name="arrowRight" className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};
