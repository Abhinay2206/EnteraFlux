import { useEffect, useState } from 'react';
import { Heart, Activity, Dna, Droplet, Zap, Sparkles } from 'lucide-react';

export interface Particle {
    id: number;
    icon: 'Heart' | 'Activity' | 'Dna' | 'Droplet' | 'Zap' | 'Sparkles';
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
    opacity: number;
}

interface AnimatedBackgroundProps {
    particleCount?: number;
    className?: string;
}

const iconComponents = {
    Heart,
    Activity,
    Dna,
    Droplet,
    Zap,
    Sparkles,
};

export default function AnimatedBackground({
    particleCount = 15,
    className = ''
}: AnimatedBackgroundProps) {
    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
        const icons: Array<'Heart' | 'Activity' | 'Dna' | 'Droplet' | 'Zap' | 'Sparkles'> =
            ['Heart', 'Activity', 'Dna', 'Droplet', 'Zap', 'Sparkles'];

        const newParticles: Particle[] = Array.from({ length: particleCount }, (_, i) => ({
            id: i,
            icon: icons[Math.floor(Math.random() * icons.length)],
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 30 + 20, // 20-50px
            duration: Math.random() * 10 + 10, // 10-20s
            delay: Math.random() * 5, // 0-5s
            opacity: Math.random() * 0.15 + 0.05, // 0.05-0.2
        }));

        setParticles(newParticles);
    }, [particleCount]);

    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
            {particles.map((particle) => {
                const IconComponent = iconComponents[particle.icon];

                return (
                    <div
                        key={particle.id}
                        className="absolute animate-float"
                        style={{
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            width: `${particle.size}px`,
                            height: `${particle.size}px`,
                            animationDuration: `${particle.duration}s`,
                            animationDelay: `${particle.delay}s`,
                            opacity: particle.opacity,
                        }}
                    >
                        <IconComponent
                            className="w-full h-full text-primary-400"
                            style={{ filter: 'blur(1px)' }}
                        />
                    </div>
                );
            })}
        </div>
    );
}
