import { useEffect, useState } from 'react';

export default function MechanismAction() {
    const [pulses, setPulses] = useState<{ id: number, offset: number }[]>([]);

    useEffect(() => {
        let count = 0;
        const interval = setInterval(() => {
            setPulses(prev => [...prev.slice(-4), { id: count++, offset: 0 }]);
        }, 800);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        let animationFrame: number;
        const animate = () => {
            setPulses(prev => prev.map(p => ({ ...p, offset: p.offset + 1 })));
            animationFrame = requestAnimationFrame(animate);
        };
        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, []);

    // Simplified Brain Shape
    const brainPath = "M300,50 C350,50 400,80 400,130 C400,160 380,180 360,190 C360,210 370,230 360,250 C340,280 300,280 300,280 C300,280 260,280 240,250 C230,230 240,210 240,190 C220,180 200,160 200,130 C200,80 250,50 300,50 Z";

    // Vagus Nerve Path (Conceptual)
    const nervePath = "M300,280 C300,320 300,350 300,350";

    return (
        <div className="w-full h-[350px] bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden relative shadow-lg">
            <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-800 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />

            <svg className="w-full h-full absolute inset-0" viewBox="0 0 600 350">
                <defs>
                    <linearGradient id="nerveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                </defs>

                {/* Central Nervous System / Brain */}
                <path d={brainPath} className="fill-neutral-100 dark:fill-neutral-800 stroke-neutral-300 dark:stroke-neutral-700" strokeWidth="2" />

                {/* Vagus Nerve Connection */}
                <path d={nervePath} className="stroke-indigo-300 dark:stroke-indigo-900" strokeWidth="4" fill="none" />

                {/* Animated Signals traveling up/down */}
                {pulses.map((p) => {
                    const y = 280 - (p.offset % 200);
                    if (y < 80) return null;
                    return (
                        <circle key={p.id} cx="300" cy={y} r="4" className="fill-indigo-500 animate-ping" />
                    );
                })}

                {/* Active Regions */}
                <circle cx="340" cy="120" r="15" className="fill-primary-500/20 animate-pulse stroke-primary-500" strokeWidth="1" />
                <circle cx="260" cy="140" r="20" className="fill-secondary-500/20 animate-pulse stroke-secondary-500" strokeWidth="1" />

                {/* Labels (SVG Text) */}
                <text x="420" y="130" className="text-xs font-sans fill-neutral-500 dark:fill-neutral-400">Hypothalamus</text>
                <line x1="360" y1="125" x2="415" y2="125" className="stroke-neutral-300 dark:stroke-neutral-700" />

                <text x="140" y="145" className="text-xs font-sans fill-neutral-500 dark:fill-neutral-400">Brainstem (NTS)</text>
                <line x1="235" y1="145" x2="190" y2="145" className="stroke-neutral-300 dark:stroke-neutral-700" />
            </svg>

            <div className="absolute bottom-4 left-0 right-0 text-center">
                <div className="inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 rounded-full text-xs font-semibold text-indigo-700 dark:text-indigo-400">
                    VAGUS NERVE SIGNALING
                </div>
            </div>
        </div>
    );
}
