interface SkeletonProps {
    variant?: 'text' | 'circle' | 'rectangle';
    width?: string;
    height?: string;
    className?: string;
}

export default function SkeletonLoader({ 
    variant = 'rectangle', 
    width = 'w-full', 
    height = 'h-4',
    className = '' 
}: SkeletonProps) {
    const variantClasses = {
        text: 'skeleton-text',
        circle: 'skeleton-circle',
        rectangle: 'skeleton',
    };

    return (
        <div className={`${variantClasses[variant]} ${width} ${height} ${className}`} />
    );
}

export function SkeletonCard() {
    return (
        <div className="card p-6 space-y-4">
            <div className="flex items-start gap-4">
                <SkeletonLoader variant="circle" width="w-12" height="h-12" />
                <div className="flex-1 space-y-2">
                    <SkeletonLoader height="h-6" width="w-3/4" />
                    <SkeletonLoader height="h-4" width="w-full" />
                </div>
            </div>
            <div className="space-y-2">
                <SkeletonLoader height="h-4" />
                <SkeletonLoader height="h-4" width="w-5/6" />
                <SkeletonLoader height="h-4" width="w-4/6" />
            </div>
        </div>
    );
}
