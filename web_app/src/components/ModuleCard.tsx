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

        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;

        setTilt({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => {
        setTilt({ x: 0, y: 0 });
    };

    return (
        <div
            className="premium-card spotlight-cursor card-glow p-8 group relative overflow-hidden"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1)`,
                transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
        >
            {/* Animated gradient border effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/0 via-primary-500/30 to-success-500/0 dark:from-primary-400/0 dark:via-primary-400/40 dark:to-success-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl" />

            {/* Glow effect that follows mouse */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute w-64 h-64 bg-primary-400/20 dark:bg-primary-400/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
                    style={{
                        left: `${(tilt.y + 15) * 3.33}%`,
                        top: `${(tilt.x + 15) * 3.33}%`
                    }}
                />
            </div>

            <div className="relative">
                <div className="flex items-start gap-5 mb-6">
                    <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/60 dark:to-primary-800/60 flex items-center justify-center group-hover:shadow-glow transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 glow-on-hover">
                        {IconComponent && (
                            <IconComponent className="w-8 h-8 text-primary-600 dark:text-primary-400 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500" />
                        )}
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3 group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors duration-300">
                            {title}
                        </h3>
                        <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">{description}</p>
                    </div>
                </div>
                <ul className="space-y-3 mt-6">
                    {features.map((feature, index) => (
                        <li
                            key={index}
                            className="flex items-start gap-3 text-sm text-neutral-700 dark:text-neutral-300 opacity-0 animate-fade-in-up"
                            style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'forwards' }}
                        >
                            <Icons.Check className="w-5 h-5 text-success-500 dark:text-success-400 flex-shrink-0 mt-0.5 group-hover:scale-125 transition-transform duration-300" />
                            <span className="leading-relaxed">{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
