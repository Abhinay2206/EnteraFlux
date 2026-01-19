import { useEffect, useState } from 'react';

export default function AnalyticsGraph() {
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        let animationFrameId: number;
        const animate = () => {
            setOffset((prev) => (prev + 1) % 1000);
            animationFrameId = requestAnimationFrame(animate);
        };
        animationFrameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrameId);
    }, []);



    // Stroke only path
    const generateStrokePath = (phase: number, amplitude: number, frequency: number, yOffset: number) => {
        const points = [];
        const width = 600;
        for (let x = 0; x <= width; x += 5) {
            const y = yOffset + Math.sin((x + offset * 2) * frequency + phase) * amplitude;
            points.push(`${x},${y}`);
        }
        return `M${points.join(' ')}`;
    }

    return (
        <div className="w-full h-full min-h-[300px] bg-neutral-50 dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden relative shadow-inner">
            {/* Grid Background */}
            <div className="absolute inset-0 grid grid-cols-12 grid-rows-6 opacity-10">
                {Array.from({ length: 72 }).map((_, i) => (
                    <div key={i} className="border-r border-b border-primary-500/20" />
                ))}
            </div>

            <svg className="w-full h-full absolute inset-0" viewBox="0 0 600 300" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="primaryGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(var(--color-primary-500), 0.1)" />
                        <stop offset="50%" stopColor="rgba(var(--color-primary-500), 0.5)" />
                        <stop offset="100%" stopColor="rgba(var(--color-primary-500), 0.1)" />
                    </linearGradient>
                    <linearGradient id="fadeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                    </linearGradient>
                </defs>

                {/* Data Stream 1 */}
                <path
                    d={generateStrokePath(0, 30, 0.02, 100)}
                    fill="none"
                    stroke="currentColor"
                    className="text-primary-400 dark:text-primary-500"
                    strokeWidth="2"
                    strokeOpacity="0.5"
                />
                {/* Data Stream 2 (Opposite Phase) */}
                <path
                    d={generateStrokePath(Math.PI, 20, 0.03, 150)}
                    fill="none"
                    stroke="currentColor"
                    className="text-secondary-400 dark:text-secondary-500"
                    strokeWidth="2"
                    strokeOpacity="0.6"
                />

                {/* Main Carrier Wave */}
                <path
                    d={generateStrokePath(0, 50, 0.015, 200)}
                    fill="none"
                    stroke="currentColor"
                    className="text-success-500 dark:text-success-400"
                    strokeWidth="3"
                />

                {/* Floating Points */}
                <circle cx="150" cy={200 + Math.sin((150 + offset * 2) * 0.015) * 50} r="4" className="fill-white dark:fill-neutral-900 stroke-success-500 stroke-2" />
                <circle cx="300" cy={200 + Math.sin((300 + offset * 2) * 0.015) * 50} r="4" className="fill-white dark:fill-neutral-900 stroke-success-500 stroke-2" />
                <circle cx="450" cy={200 + Math.sin((450 + offset * 2) * 0.015) * 50} r="4" className="fill-white dark:fill-neutral-900 stroke-success-500 stroke-2" />

            </svg>

            {/* Overlay UI Elements */}
            <div className="absolute top-4 left-4 flex gap-2">
                <div className="px-2 py-1 bg-white/80 dark:bg-neutral-800/80 backdrop-blur rounded border border-neutral-200 dark:border-neutral-700 text-xs font-mono text-neutral-600 dark:text-neutral-400">
                    HRV: 42ms
                </div>
                <div className="px-2 py-1 bg-white/80 dark:bg-neutral-800/80 backdrop-blur rounded border border-neutral-200 dark:border-neutral-700 text-xs font-mono text-neutral-600 dark:text-neutral-400">
                    BPM: 72
                </div>
            </div>
            <div className="absolute bottom-4 right-4 flex gap-2">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-success-100/20 dark:bg-success-900/20 rounded-full border border-success-200/50 dark:border-success-800/50">
                    <div className="w-2 h-2 rounded-full bg-success-500 animate-pulse" />
                    <span className="text-xs font-bold text-success-700 dark:text-success-400">LIVE MONITORING</span>
                </div>
            </div>
        </div>
    );
}
