import { useEffect, useState, useRef } from 'react';

// Major Indian cities with approximate positions on a simplified map
const cities = [
    { name: 'Mumbai', x: 145, y: 210, users: 2400, tier: 1 },
    { name: 'Delhi', x: 180, y: 95, users: 3100, tier: 1 },
    { name: 'Bangalore', x: 170, y: 280, users: 1800, tier: 1 },
    { name: 'Chennai', x: 200, y: 285, users: 1200, tier: 1 },
    { name: 'Hyderabad', x: 185, y: 240, users: 1500, tier: 1 },
    { name: 'Kolkata', x: 260, y: 165, users: 900, tier: 2 },
    { name: 'Pune', x: 155, y: 225, users: 800, tier: 2 },
    { name: 'Ahmedabad', x: 140, y: 165, users: 700, tier: 2 },
    { name: 'Jaipur', x: 155, y: 125, users: 500, tier: 2 },
    { name: 'Lucknow', x: 210, y: 120, users: 450, tier: 2 },
    { name: 'Kochi', x: 165, y: 310, users: 350, tier: 3 },
    { name: 'Chandigarh', x: 175, y: 80, users: 300, tier: 3 },
];

// Simplified India outline path
const indiaPath = `M170,45 L195,55 L210,60 L215,65 L220,75 L225,80 L235,80 L245,85 L255,90 L265,95 
L275,110 L280,125 L280,140 L275,155 L270,165 L265,170 L260,180 L255,190 L250,200 
L245,215 L240,225 L235,240 L225,255 L215,270 L210,280 L205,290 L200,300 L195,310 
L190,320 L185,325 L175,330 L165,320 L160,310 L155,300 L150,285 L145,270 L140,255 
L135,240 L130,225 L125,210 L120,195 L118,180 L120,165 L122,150 L128,135 L132,120 
L138,105 L142,90 L148,75 L155,65 L162,55 L170,45Z`;

export default function IndiaAdoptionMap() {
    const [activePulses, setActivePulses] = useState<Array<{ id: number; x: number; y: number; r: number; opacity: number }>>([]);
    const [hoveredCity, setHoveredCity] = useState<number | null>(null);
    const [, setCounter] = useState(0);
    const animRef = useRef<number | null>(null);

    useEffect(() => {
        let count = 0;
        const animate = () => {
            count++;

            // Emit new pulse every ~60 frames from a random city
            if (count % 60 === 0) {
                const city = cities[Math.floor(Math.random() * cities.length)];
                setActivePulses(prev => [...prev.slice(-8), {
                    id: count,
                    x: city.x,
                    y: city.y,
                    r: 4,
                    opacity: 0.7,
                }]);
            }

            // Animate pulses
            setActivePulses(prev =>
                prev.map(p => ({ ...p, r: p.r + 0.3, opacity: p.opacity - 0.008 }))
                    .filter(p => p.opacity > 0)
            );

            setCounter(count);
            animRef.current = requestAnimationFrame(animate);
        };
        animRef.current = requestAnimationFrame(animate);
        return () => { if (animRef.current !== null) cancelAnimationFrame(animRef.current); };
    }, []);

    const totalUsers = cities.reduce((sum, c) => sum + c.users, 0);

    return (
        <div className="w-full h-full min-h-[400px] rounded-2xl border border-neutral-200/50 dark:border-white/[0.06] overflow-hidden relative bg-gradient-to-br from-neutral-50 via-primary-50/10 to-neutral-50 dark:from-[#0c1222] dark:via-[#0a1228] dark:to-[#0a0f1e]">
            {/* Subtle grid */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04]"
                style={{
                    backgroundImage: 'radial-gradient(circle, currentColor 0.5px, transparent 0.5px)',
                    backgroundSize: '24px 24px',
                }}
            />

            <svg className="w-full h-full absolute inset-0" viewBox="0 0 400 380" preserveAspectRatio="xMidYMid meet">
                <defs>
                    <linearGradient id="indiaFill" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.06" />
                        <stop offset="100%" stopColor="#22C55E" stopOpacity="0.04" />
                    </linearGradient>
                    {[1, 2, 3].map(tier => (
                        <radialGradient key={tier} id={`cityGlow${tier}`}>
                            <stop offset="0%" stopColor={tier === 1 ? '#3B82F6' : tier === 2 ? '#8B5CF6' : '#22C55E'} stopOpacity="0.4" />
                            <stop offset="100%" stopColor={tier === 1 ? '#3B82F6' : tier === 2 ? '#8B5CF6' : '#22C55E'} stopOpacity="0" />
                        </radialGradient>
                    ))}
                </defs>

                {/* India outline */}
                <path d={indiaPath} fill="url(#indiaFill)"
                    className="stroke-neutral-300 dark:stroke-white/[0.08]"
                    strokeWidth="1.5" strokeLinejoin="round"
                />

                {/* Pulses */}
                {activePulses.map(p => (
                    <circle key={p.id} cx={p.x} cy={p.y} r={p.r}
                        fill="none" stroke="#3B82F6" strokeWidth="1"
                        opacity={p.opacity}
                    />
                ))}

                {/* City dots */}
                {cities.map((city, i) => {
                    const isHovered = hoveredCity === i;
                    const dotR = city.tier === 1 ? 5 : city.tier === 2 ? 3.5 : 2.5;
                    const glowR = city.tier === 1 ? 20 : 14;

                    return (
                        <g key={i}
                            onMouseEnter={() => setHoveredCity(i)}
                            onMouseLeave={() => setHoveredCity(null)}
                            className="cursor-pointer"
                        >
                            <circle cx={city.x} cy={city.y} r={glowR}
                                fill={`url(#cityGlow${city.tier})`}
                                opacity={isHovered ? 1 : 0.5}
                            />
                            <circle cx={city.x} cy={city.y} r={dotR}
                                fill={city.tier === 1 ? '#3B82F6' : city.tier === 2 ? '#8B5CF6' : '#22C55E'}
                                opacity={isHovered ? 1 : 0.8}
                                className="transition-all duration-200"
                            />
                            {city.tier === 1 && (
                                <circle cx={city.x} cy={city.y} r={dotR + 3}
                                    fill="none"
                                    stroke={city.tier === 1 ? '#3B82F6' : '#8B5CF6'}
                                    strokeWidth="1" opacity="0.3"
                                >
                                    <animate attributeName="r" values={`${dotR + 2};${dotR + 8};${dotR + 2}`}
                                        dur="3s" repeatCount="indefinite"
                                    />
                                    <animate attributeName="opacity" values="0.3;0;0.3" dur="3s" repeatCount="indefinite" />
                                </circle>
                            )}

                            {/* City label on hover */}
                            {isHovered && (
                                <>
                                    <rect x={city.x - 40} y={city.y - 32} width="80" height="22" rx="6"
                                        className="fill-white dark:fill-neutral-800" opacity="0.95"
                                    />
                                    <text x={city.x} y={city.y - 18} textAnchor="middle"
                                        fontSize="9" fontWeight="600"
                                        className="fill-neutral-800 dark:fill-neutral-100"
                                    >
                                        {city.name} · {city.users.toLocaleString()}
                                    </text>
                                </>
                            )}
                        </g>
                    );
                })}
            </svg>

            {/* Top-left label */}
            <div className="absolute top-4 left-4">
                <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-1">Projected Reach</div>
                <div className="text-2xl font-bold text-neutral-900 dark:text-white">{totalUsers.toLocaleString()}<span className="text-sm font-normal text-neutral-400 ml-1">users</span></div>
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 flex gap-4">
                {[
                    { color: '#3B82F6', label: 'Tier 1' },
                    { color: '#8B5CF6', label: 'Tier 2' },
                    { color: '#22C55E', label: 'Tier 3' },
                ].map((item, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                        <span className="text-[10px] text-neutral-500 dark:text-neutral-400">{item.label}</span>
                    </div>
                ))}
            </div>

            {/* Live indicator */}
            <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-primary-50/80 dark:bg-primary-500/10 border border-primary-200/50 dark:border-primary-500/20">
                <div className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" />
                <span className="text-[10px] font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wider">Target Cities</span>
            </div>
        </div>
    );
}
