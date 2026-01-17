import React from 'react';
import { clsx } from 'clsx';

export interface BentoGridItemProps {
    children: React.ReactNode;
    className?: string;
    colSpan?: 1 | 2 | 3 | 4;
    rowSpan?: 1 | 2 | 3 | 4;
    style?: React.CSSProperties;
}

export const BentoGridItem: React.FC<BentoGridItemProps> = ({
    children,
    className,
    colSpan = 1,
    rowSpan = 1,
    style,
}) => {
    return (
        <div
            className={clsx(
                'bg-white rounded-3xl p-6 shadow-[0_0_20px_rgba(0,0,0,0.05)] border border-gray-100/50 overflow-hidden relative transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,0,0,0.08)]',
                // Column Spans
                colSpan === 2 && 'md:col-span-2',
                colSpan === 3 && 'md:col-span-3',
                colSpan === 4 && 'md:col-span-4',
                // Row Spans
                rowSpan === 2 && 'md:row-span-2',
                rowSpan === 3 && 'md:row-span-3',
                rowSpan === 4 && 'md:row-span-4',
                className
            )}
            style={style}
        >
            {children}
        </div>
    );
};
