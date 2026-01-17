import type { ResponsiveGridProps } from '../types';

export default function ResponsiveGrid({
    children,
    columns = { mobile: 1, tablet: 2, desktop: 3 },
    gap = 6,
    className = '',
}: ResponsiveGridProps) {
    const gridCols: Record<number, string> = {
        1: 'grid-cols-1',
        2: 'grid-cols-2',
        3: 'grid-cols-3',
        4: 'grid-cols-4',
    };

    const tabletCols: Record<number, string> = {
        1: 'md:grid-cols-1',
        2: 'md:grid-cols-2',
        3: 'md:grid-cols-3',
        4: 'md:grid-cols-4',
    };

    const desktopCols: Record<number, string> = {
        1: 'lg:grid-cols-1',
        2: 'lg:grid-cols-2',
        3: 'lg:grid-cols-3',
        4: 'lg:grid-cols-4',
    };

    const gapClass = `gap-${gap}`;

    return (
        <div
            className={`grid ${gridCols[columns.mobile || 1]} ${tabletCols[columns.tablet || 2]} ${desktopCols[columns.desktop || 3]} ${gapClass} ${className}`}
        >
            {children}
        </div>
    );
}
