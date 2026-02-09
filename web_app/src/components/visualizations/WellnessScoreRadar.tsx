import { useEffect, useState, useRef } from 'react';

const metrics = [
    { label: 'Heart Rate', value: 78, max: 100, unit: 'bpm', color: '#EF4444', icon: '❤️' },
    { label: 'Sleep', value: 7.2, max: 10, unit: 'hrs', color: '#8B5CF6', icon: '🌙' },
    { label: 'Recovery', value: 72, max: 100, unit: '%', color: '#22C55E', icon: '⚡' },
    { label: 'HRV', value: 42, max: 80, unit: 'ms', color: '#3B82F6', icon: '📊' },
    { label: 'Steps', value: 6800, max: 10000, unit: '', color: '#F59E0B', icon: '🚶' },
    { label: 'Hydration', value: 65, max: 100, unit: '%', color: '#06B6D4', icon: '💧' },
];

export default function WellnessScoreRadar() {
    const [animProgress, setAnimProgress] = useState(0);
    const [hoveredMetric, setHoveredMetric] = useState<number | null>(null);
    const animRef = useRef<number | null>(null);

    useEffect(() => {
        const startTime = Date.now();
        const animate = () => {
            const elapsed = Date.now() - startTime;
            setAnimProgress(Math.min(1, elapsed / 1200));
            if (elapsed < 1200) {
                animRef.current = requestAnimationFrame(animate);
            }
        };
        animRef.current = requestAnimationFrame(animate);
        return () => { if (animRef.current !== null) cancelAnimationFrame(animRef.current); };
    }, []);

    const cx = 200;
    const cy = 160;
    const maxR = 110;
    const levels = 4;

    const getPoint = (index: number, value: number, max: number) => {
        const angle = (Math.PI * 2 * index) / metrics.length - Math.PI / 2;
        const r = (value / max) * maxR * animProgress;
        return {
            x: cx + Math.cos(angle) * r,
            y: cy + Math.sin(angle) * r,
        };
    };

    const getAxisEnd = (index: number) => {
        const angle = (Math.PI * 2 * index) / metrics.length - Math.PI / 2;
        return {
            x: cx + Math.cos(angle) * maxR,
            y: cy + Math.sin(angle) * maxR,
        };
    };

    const radarPath = metrics
        .map((m, i) => {
            const p = getPoint(i, m.value, m.max);
            return `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`;
        })
        .join(' ') + 'Z';

    return (
        <div className="w-full h-full min-h-[360px] rounded-2xl border border-neutral-200/50 dark:border-white/[0.06] overflow-hidden relative bg-gradient-to-br from-neutral-50 to-white dark:from-[#0c1222] dark:to-[#0a0f1e]">
            {/* Subtle radial bg */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(59,130,246,0.04),transparent_70%)] dark:bg-[radial-gradient(circle_at_50%_40%,rgba(59,130,246,0.06),transparent_70%)]" />

            <svg className="w-full h-full absolute inset-0" viewBox="0 0 400 340" preserveAspectRatio="xMidYMid meet">
                <defs>
                    <linearGradient id="radarFill" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="#22C55E" stopOpacity="0.1" />
                    </linearGradient>
                    <linearGradient id="radarStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#22C55E" stopOpacity="0.6" />
                    </linearGradient>
                </defs>

                {/* Grid levels */}
                {Array.from({ length: levels }).map((_, level) => {
                    const r = (maxR / levels) * (level + 1);
                    const points = metrics.map((_, i) => {
                        const angle = (Math.PI * 2 * i) / metrics.length - Math.PI / 2;
                        return `${cx + Math.cos(angle) * r},${cy + Math.sin(angle) * r}`;
                    });
                    return (
                        <polygon
                            key={level}
                            points={points.join(' ')}
                            fill="none"
                            className="stroke-neutral-200 dark:stroke-white/[0.06]"
                            strokeWidth="1"
                        />
                    );
                })}

                {/* Axis lines */}
                {metrics.map((_, i) => {
                    const end = getAxisEnd(i);
                    return (
                        <line key={`axis-${i}`}
                            x1={cx} y1={cy} x2={end.x} y2={end.y}
                            className="stroke-neutral-200 dark:stroke-white/[0.05]"
                            strokeWidth="1"
                        />
                    );
                })}

                {/* Filled radar area */}
                <path d={radarPath} fill="url(#radarFill)" stroke="url(#radarStroke)" strokeWidth="2" />

                {/* Data points */}
                {metrics.map((m, i) => {
                    const p = getPoint(i, m.value, m.max);
                    const isHovered = hoveredMetric === i;
                    return (
                        <g key={`point-${i}`}
                            onMouseEnter={() => setHoveredMetric(i)}
                            onMouseLeave={() => setHoveredMetric(null)}
                            className="cursor-pointer"
                        >
                            <circle cx={p.x} cy={p.y} r={isHovered ? 12 : 8} fill={m.color} opacity={0.15} />
                            <circle cx={p.x} cy={p.y} r={isHovered ? 5 : 4}
                                fill={m.color} className="transition-all duration-200"
                            />
                            <circle cx={p.x} cy={p.y} r="2" fill="white" opacity="0.8" />
                        </g>
                    );
                })}

                {/* Labels */}
                {metrics.map((m, i) => {
                    const angle = (Math.PI * 2 * i) / metrics.length - Math.PI / 2;
                    const labelR = maxR + 28;
                    const x = cx + Math.cos(angle) * labelR;
                    const y = cy + Math.sin(angle) * labelR;
                    const isHovered = hoveredMetric === i;

                    return (
                        <g key={`label-${i}`}>
                            <text x={x} y={y - 6} textAnchor="middle"
                                fontSize="9" fontWeight={isHovered ? '700' : '500'}
                                className="fill-neutral-700 dark:fill-neutral-300"
                            >
                                {m.icon} {m.label}
                            </text>
                            <text x={x} y={y + 6} textAnchor="middle"
                                fontSize="9" fontWeight="600"
                                fill={m.color} opacity={isHovered ? 1 : 0.7}
                            >
                                {m.value}{m.unit}
                            </text>
                        </g>
                    );
                })}
            </svg>

            {/* Corner badge */}
            <div className="absolute top-4 right-4">
                <div className="px-2.5 py-1 rounded-lg bg-success-50/80 dark:bg-success-500/10 border border-success-200/50 dark:border-success-500/20">
                    <span className="text-[10px] font-bold text-success-700 dark:text-success-400 uppercase tracking-wider">Wellness Score</span>
                </div>
            </div>

            {/* Bottom legend */}
            <div className="absolute bottom-3 left-0 right-0 text-center">
                <span className="text-[10px] text-neutral-400 dark:text-neutral-500">
                    {hoveredMetric !== null ? `${metrics[hoveredMetric].label}: ${metrics[hoveredMetric].value}${metrics[hoveredMetric].unit}` : 'Hover a metric to explore'}
                </span>
            </div>
        </div>
    );
}
