import { ReactNode } from 'react';

interface BentoGridProps {
    children: ReactNode;
    className?: string;
}

interface BentoItemProps {
    children: ReactNode;
    className?: string;
    size?: 'normal' | 'large' | 'tall';
    gradient?: boolean;
}

export function BentoGrid({ children, className = '' }: BentoGridProps) {
    return (
        <div className={`bento-grid ${className}`}>
            {children}
        </div>
    );
}

export function BentoItem({ children, className = '', size = 'normal', gradient = false }: BentoItemProps) {
    const sizeClasses = {
        normal: '',
        large: 'bento-item-large',
        tall: 'bento-item-tall',
    };

    return (
        <div className={`bento-item ${sizeClasses[size]} ${gradient ? 'gradient-border' : ''} ${className}`}>
            {gradient ? <div className="p-6">{children}</div> : children}
        </div>
    );
}
