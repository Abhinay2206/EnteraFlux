import { useState } from 'react';
import * as Icons from 'lucide-react';
import type { ModuleCardProps } from '../types';

export default function ModuleCard({ icon, title, description, features }: ModuleCardProps) {
    const [tilt, setTilt] = useState({ x: 0, y: 0 });

    // Get the icon component dynamically
    const IconComponent = Icons[icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        setTilt({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => {
        setTilt({ x: 0, y: 0 });
    };

    return (
        <div
            className="card-elevated card-glow shine-effect spotlight p-6 sm:p-8 group hover-lift magnetic relative overflow-hidden"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: 'transform 0.3s ease-out',
            }}
        >
            {/* Animated gradient border effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 via-success-500/20 to-primary-500/20 dark:from-primary-400/30 dark:via-success-400/30 dark:to-primary-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl animate-gradient-x"
                style={{ padding: '1px' }} />

            <div className="relative bg-white dark:bg-neutral-800 rounded-xl">
                <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/50 dark:to-primary-800/50 flex items-center justify-center group-hover:shadow-glow transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                        {IconComponent && (
                            <IconComponent className="w-7 h-7 text-primary-600 dark:text-primary-400 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500" />
                        )}
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2 group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors duration-300">
                            {title}
                        </h3>
                        <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">{description}</p>
                    </div>
                </div>
                <ul className="space-y-2 mt-6">
                    {features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-neutral-700 dark:text-neutral-300">
                            <Icons.Check className="w-4 h-4 text-success-500 dark:text-success-400 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
