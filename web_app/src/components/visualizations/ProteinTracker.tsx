import { useEffect, useState, useRef } from 'react';

const foods = [
    { name: 'Dal (1 bowl)', protein: 9, emoji: '🍲', color: '#F59E0B' },
    { name: 'Paneer (100g)', protein: 18, emoji: '🧀', color: '#8B5CF6' },
    { name: 'Eggs (2)', protein: 12, emoji: '🥚', color: '#EF4444' },
    { name: 'Curd (200g)', protein: 8, emoji: '🥛', color: '#3B82F6' },
    { name: 'Chicken (100g)', protein: 25, emoji: '🍗', color: '#22C55E' },
    { name: 'Chana (1 bowl)', protein: 15, emoji: '🫘', color: '#EC4899' },
];

const dailyTarget = 70; // grams

export default function ProteinTracker() {
    const [animProgress, setAnimProgress] = useState(0);
    const [hoveredFood, setHoveredFood] = useState<number | null>(null);
    const animRef = useRef<number | null>(null);

    useEffect(() => {
        const startTime = Date.now();
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(1, elapsed / 1500);
            // Ease out cubic
            setAnimProgress(1 - Math.pow(1 - progress, 3));
            if (progress < 1) {
                animRef.current = requestAnimationFrame(animate);
            }
        };
        animRef.current = requestAnimationFrame(animate);
        return () => { if (animRef.current !== null) cancelAnimationFrame(animRef.current); };
    }, []);

    const consumed = foods.reduce((sum, f) => sum + f.protein, 0);
    const percentage = Math.min(100, (consumed / dailyTarget) * 100);

    // Build ring segments
    const ringRadius = 70;
    const ringCx = 120;
    const ringCy = 110;
    const circumference = 2 * Math.PI * ringRadius;

    let cumulativeAngle = 0;

    return (
        <div className="w-full h-full min-h-[300px] rounded-2xl border border-neutral-200/50 dark:border-white/[0.06] overflow-hidden relative bg-gradient-to-br from-neutral-50 to-white dark:from-[#0c1222] dark:to-[#0a0f1e]">
            {/* Background texture */}
            <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
                style={{
                    backgroundImage: `
                        linear-gradient(45deg, currentColor 25%, transparent 25%),
                        linear-gradient(-45deg, currentColor 25%, transparent 25%),
                        linear-gradient(45deg, transparent 75%, currentColor 75%),
                        linear-gradient(-45deg, transparent 75%, currentColor 75%)
                    `,
                    backgroundSize: '20px 20px',
                    backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0',
                }}
            />

            <div className="flex h-full">
                {/* Ring chart */}
                <div className="w-[240px] flex-shrink-0 relative">
                    <svg viewBox="0 0 240 220" className="w-full h-full">
                        {/* Background ring */}
                        <circle cx={ringCx} cy={ringCy} r={ringRadius}
                            fill="none" className="stroke-neutral-100 dark:stroke-white/[0.04]"
                            strokeWidth="16"
                        />

                        {/* Segment rings */}
                        {foods.map((food, i) => {
                            const segmentPortion = food.protein / dailyTarget;
                            const segmentLength = circumference * segmentPortion * animProgress;
                            const offset = circumference * (cumulativeAngle / dailyTarget);
                            // eslint-disable-next-line react-hooks/immutability
                            cumulativeAngle += food.protein;

                            return (
                                <circle key={i}
                                    cx={ringCx} cy={ringCy} r={ringRadius}
                                    fill="none" stroke={food.color}
                                    strokeWidth={hoveredFood === i ? 20 : 16}
                                    strokeDasharray={`${segmentLength} ${circumference}`}
                                    strokeDashoffset={-offset * animProgress}
                                    strokeLinecap="round"
                                    className="transition-all duration-200"
                                    opacity={hoveredFood !== null && hoveredFood !== i ? 0.3 : 0.85}
                                    transform={`rotate(-90 ${ringCx} ${ringCy})`}
                                    onMouseEnter={() => setHoveredFood(i)}
                                    onMouseLeave={() => setHoveredFood(null)}
                                    style={{ cursor: 'pointer' }}
                                />
                            );
                        })}

                        {/* Center text */}
                        <text x={ringCx} y={ringCy - 10} textAnchor="middle"
                            fontSize="28" fontWeight="800"
                            className="fill-neutral-900 dark:fill-white"
                        >
                            {Math.round(consumed * animProgress)}g
                        </text>
                        <text x={ringCx} y={ringCy + 10} textAnchor="middle"
                            fontSize="10" className="fill-neutral-400 dark:fill-neutral-500"
                        >
                            of {dailyTarget}g target
                        </text>
                        <text x={ringCx} y={ringCy + 26} textAnchor="middle"
                            fontSize="9" fontWeight="600"
                            fill={percentage >= 100 ? '#22C55E' : percentage >= 70 ? '#F59E0B' : '#EF4444'}
                        >
                            {Math.round(percentage * animProgress)}% achieved
                        </text>
                    </svg>
                </div>

                {/* Food list */}
                <div className="flex-1 py-5 pr-5 flex flex-col justify-center gap-2">
                    {foods.map((food, i) => (
                        <div key={i}
                            className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 cursor-pointer ${
                                hoveredFood === i 
                                    ? 'bg-neutral-100 dark:bg-white/[0.06]' 
                                    : 'hover:bg-neutral-50 dark:hover:bg-white/[0.03]'
                            }`}
                            onMouseEnter={() => setHoveredFood(i)}
                            onMouseLeave={() => setHoveredFood(null)}
                        >
                            <span className="text-lg">{food.emoji}</span>
                            <div className="flex-1 min-w-0">
                                <div className="text-xs font-medium text-neutral-700 dark:text-neutral-300 truncate">{food.name}</div>
                                <div className="w-full h-1.5 rounded-full bg-neutral-100 dark:bg-white/[0.04] mt-1 overflow-hidden">
                                    <div
                                        className="h-full rounded-full transition-all duration-700"
                                        style={{
                                            width: `${(food.protein / 30) * 100 * animProgress}%`,
                                            background: food.color,
                                        }}
                                    />
                                </div>
                            </div>
                            <span className="text-xs font-bold tabular-nums" style={{ color: food.color }}>
                                {food.protein}g
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Label */}
            <div className="absolute top-3 left-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                    Daily Protein · Indian Diet
                </span>
            </div>
        </div>
    );
}
