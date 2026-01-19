import { useEffect, useState } from 'react';

export default function PharmacovigilanceChart() {
    const [streamData, setStreamData] = useState<number[]>([]);
    const [signals, setSignals] = useState<{ x: number, y: number, r: number, opacity: number }[]>([]);

    useEffect(() => {
        let animationFrame: number;
        let count = 0;

        const animate = () => {
            count++;

            // Add new data point to stream graph
            if (count % 2 === 0) {
                setStreamData(prev => {
                    const next = [...prev, Math.sin(count * 0.05) * 20 + Math.random() * 10 + 50];
                    return next.length > 50 ? next.slice(1) : next;
                });
            }

            // Create random signals
            if (Math.random() > 0.95) {
                setSignals(prev => [...prev, { x: 50 + Math.random() * 500, y: 50 + Math.random() * 200, r: 0, opacity: 1 }]);
            }

            // Animate signals (expand and fade)
            setSignals(prev => prev.map(s => ({ ...s, r: s.r + 0.5, opacity: s.opacity - 0.01 })).filter(s => s.opacity > 0));

            animationFrame = requestAnimationFrame(animate);
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, []);

    // Generate stream path
    const getStreamPath = () => {
        if (streamData.length < 2) return "";
        const points = streamData.map((d, i) => `${i * (600 / 50)}, ${300 - d}`);
        return `M0,300 L0,${300 - streamData[0]} L${points.join(' ')} L600,${300 - streamData[streamData.length - 1]} L600,300 Z`;
    }

    return (
        <div className="w-full h-[350px] bg-neutral-900 rounded-2xl border border-neutral-800 overflow-hidden relative shadow-2xl flex items-center justify-center">
            {/* Map Background Hint */}
            <div className="absolute inset-0 opacity-10"
                style={{ backgroundImage: 'radial-gradient(circle at center, #333 1px, transparent 1px)', backgroundSize: '20px 20px' }}
            />

            <svg className="w-full h-full absolute inset-0" viewBox="0 0 600 350">
                {/* Simulated Data Stream Graph at bottom */}
                <path d={getStreamPath()} className="fill-primary-900/40 stroke-primary-500/50" strokeWidth="1" />

                {/* Signals */}
                {signals.map((s, i) => (
                    <g key={i}>
                        <circle cx={s.x} cy={s.y} r={s.r} className="fill-none stroke-warning-500" strokeWidth="1" strokeOpacity={s.opacity} />
                        <circle cx={s.x} cy={s.y} r={2} className="fill-warning-400" fillOpacity={s.opacity} />
                    </g>
                ))}

                {/* Connecting lines for "Network" effect */}
                {signals.length > 1 && signals.map((s, i) => (
                    i < signals.length - 1 && Math.random() > 0.5 ? (
                        <line
                            key={`l-${i}`}
                            x1={s.x} y1={s.y}
                            x2={signals[i + 1].x} y2={signals[i + 1].y}
                            className="stroke-warning-500/20"
                            strokeWidth="0.5"
                        />
                    ) : null
                ))}
            </svg>

            {/* UI Overlay */}
            <div className="absolute top-4 left-4">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                    <span className="text-xs font-mono text-red-400">SIGNAL DETECTION ACTIVE</span>
                </div>
                <div className="text-[10px] text-neutral-500 font-mono">
                    SOURCES: SOCIAL, CLINICAL, TRIALS
                </div>
            </div>
            <div className="absolute bottom-4 right-4 flex flex-col items-end gap-1">
                <div className="text-2xl font-bold text-white font-mono">{signals.length}</div>
                <div className="text-xs text-neutral-500 font-mono uppercase">Avg. Signals / Hr</div>
            </div>
        </div>
    );
}
