import { useEffect, useState } from 'react';

export default function ModulesIntegration() {
    const [rotation, setRotation] = useState(0);

    useEffect(() => {
        let animationFrame: number;
        const animate = () => {
            setRotation(prev => (prev + 0.2) % 360);
            animationFrame = requestAnimationFrame(animate);
        };
        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, []);

    const modules = [
        { label: 'Monitor', color: 'text-primary-500', stroke: 'stroke-primary-500' },
        { label: 'Coach', color: 'text-success-500', stroke: 'stroke-success-500' },
        { label: 'Research', color: 'text-secondary-500', stroke: 'stroke-secondary-500' },
        { label: 'Safety', color: 'text-warning-500', stroke: 'stroke-warning-500' },
        { label: 'Defense', color: 'text-red-500', stroke: 'stroke-red-500' },
    ];

    const getPos = (i: number, radius: number, offsetRot: number) => {
        const angle = (i * (360 / modules.length) + offsetRot) * (Math.PI / 180);
        return {
            x: 300 + Math.cos(angle) * radius,
            y: 175 + Math.sin(angle) * radius
        };
    };

    return (
        <div className="w-full h-[350px] bg-neutral-50 dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden relative shadow-inner">

            <svg className="w-full h-full absolute inset-0" viewBox="0 0 600 350">
                {/* Central Core */}
                <circle cx="300" cy="175" r="40" className="fill-white dark:fill-neutral-800 stroke-neutral-200 dark:stroke-neutral-700 shadow-sm" strokeWidth="2" />
                <text x="300" y="180" textAnchor="middle" className="text-xs font-bold fill-neutral-800 dark:fill-white pointer-events-none" style={{ fontSize: '10px' }}>CORE AI</text>

                {/* Connecting Lines */}
                {modules.map((_, i) => {
                    const pos = getPos(i, 110, rotation);
                    return (
                        <line
                            key={`line-${i}`}
                            x1="300" y1="175"
                            x2={pos.x} y2={pos.y}
                            className={`stroke-neutral-300 dark:stroke-neutral-700`}
                            strokeWidth="1"
                            strokeDasharray="4 4"
                        />
                    );
                })}

                {/* Orbiting Modules */}
                {modules.map((m, i) => {
                    const pos = getPos(i, 110, rotation);
                    return (
                        <g key={i} transform={`translate(${pos.x}, ${pos.y})`}>
                            <circle r="28" className="fill-white dark:fill-neutral-800 shadow-lg" />
                            <circle r="28" className={`fill-none ${m.stroke}`} strokeWidth="2" strokeOpacity="0.8" />
                            <text
                                y="4"
                                textAnchor="middle"
                                className={`text-[10px] font-bold ${m.color} uppercase`}
                                style={{ fontSize: '9px' }}
                            >
                                {m.label}
                            </text>
                        </g>
                    );
                })}

                {/* Outer Ring */}
                <circle cx="300" cy="175" r="140" className="fill-none stroke-neutral-200 dark:stroke-neutral-800" strokeWidth="1" />
            </svg>
        </div>
    );
}
