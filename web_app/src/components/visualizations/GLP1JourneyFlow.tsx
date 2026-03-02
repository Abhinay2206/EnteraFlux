import { useEffect, useState, useRef } from 'react';

const stages = [
    { label: 'Start Medication', icon: '💊', color: '#3B82F6', desc: 'Begin GLP-1 therapy' },
    { label: 'Calibrate', icon: '📊', color: '#8B5CF6', desc: '2-week baseline period' },
    { label: 'Analyse Patterns', icon: '📡', color: '#06B6D4', desc: 'Correlate body signals' },
    { label: 'Get Insights', icon: '💡', color: '#22C55E', desc: 'Personalised wellness tips' },
    { label: 'Feel Better', icon: '✨', color: '#F59E0B', desc: 'Improved daily wellness' },
];

export default function GLP1JourneyFlow() {
    const [activeStage, setActiveStage] = useState(0);
    const [particlePhase, setParticlePhase] = useState(0);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const animRef = useRef<number | null>(null);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setActiveStage(prev => (prev + 1) % stages.length);
        }, 2800);
        return () => { if (intervalRef.current !== null) clearInterval(intervalRef.current); };
    }, []);

    useEffect(() => {
        const animate = () => {
            setParticlePhase(prev => prev + 0.01);
            animRef.current = requestAnimationFrame(animate);
        };
        animRef.current = requestAnimationFrame(animate);
        return () => { if (animRef.current !== null) cancelAnimationFrame(animRef.current); };
    }, []);

    const getNodeX = (i: number) => 60 + i * 120;
    const nodeY = 120;

    return (
        <div className="w-full h-full min-h-[280px] rounded-2xl border border-neutral-200/50 dark:border-white/[0.06] overflow-hidden relative bg-gradient-to-br from-neutral-50 to-white dark:from-[#0c1222] dark:to-[#0a0f1e]">
            {/* Background grid */}
            <div className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px',
                }}
            />

            <svg className="w-full h-full absolute inset-0" viewBox="0 0 660 240" preserveAspectRatio="xMidYMid meet">
                <defs>
                    {stages.map((s, i) => (
                        <radialGradient key={`glow-${i}`} id={`stageGlow${i}`}>
                            <stop offset="0%" stopColor={s.color} stopOpacity={activeStage === i ? 0.3 : 0.05} />
                            <stop offset="100%" stopColor={s.color} stopOpacity="0" />
                        </radialGradient>
                    ))}
                    <linearGradient id="flowLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2" />
                        <stop offset="50%" stopColor="#22C55E" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.2" />
                    </linearGradient>
                </defs>

                {/* Connection lines */}
                {stages.slice(0, -1).map((_, i) => {
                    const x1 = getNodeX(i) + 24;
                    const x2 = getNodeX(i + 1) - 24;
                    const progress = i < activeStage ? 1 : i === activeStage ? (particlePhase * 20 % 1) : 0;
                    return (
                        <g key={`conn-${i}`}>
                            <line x1={x1} y1={nodeY} x2={x2} y2={nodeY}
                                stroke="url(#flowLineGrad)" strokeWidth="2" strokeDasharray="6 4"
                                opacity={0.4}
                            />
                            {i <= activeStage && (
                                <circle
                                    cx={x1 + (x2 - x1) * progress}
                                    cy={nodeY}
                                    r="3"
                                    fill={stages[i].color}
                                    opacity={0.8}
                                >
                                    <animate attributeName="opacity" values="0.4;1;0.4" dur="1.5s" repeatCount="indefinite" />
                                </circle>
                            )}
                        </g>
                    );
                })}

                {/* Stage nodes */}
                {stages.map((stage, i) => {
                    const x = getNodeX(i);
                    const isActive = activeStage === i;
                    const isPast = i < activeStage;

                    return (
                        <g key={i} className="cursor-pointer" onClick={() => setActiveStage(i)}>
                            {/* Glow */}
                            <circle cx={x} cy={nodeY} r={isActive ? 45 : 30} fill={`url(#stageGlow${i})`}>
                                {isActive && (
                                    <animate attributeName="r" values="40;50;40" dur="2s" repeatCount="indefinite" />
                                )}
                            </circle>

                            {/* Outer ring */}
                            <circle cx={x} cy={nodeY} r="24"
                                fill="none" stroke={stage.color}
                                strokeWidth={isActive ? 2.5 : 1}
                                strokeOpacity={isActive ? 0.8 : isPast ? 0.5 : 0.15}
                                strokeDasharray={isActive ? 'none' : '3 3'}
                            />

                            {/* Inner circle */}
                            <circle cx={x} cy={nodeY} r="20"
                                className="fill-white dark:fill-[#0c1222]"
                                stroke={stage.color}
                                strokeWidth={isActive ? 2 : 0.5}
                                strokeOpacity={isActive ? 0.6 : 0.2}
                            />

                            {/* Icon text */}
                            <text x={x} y={nodeY + 5} textAnchor="middle" fontSize="16">
                                {stage.icon}
                            </text>

                            {/* Label */}
                            <text x={x} y={nodeY + 48} textAnchor="middle"
                                className="fill-neutral-800 dark:fill-neutral-200"
                                fontSize="10" fontWeight={isActive ? '700' : '500'}
                                opacity={isActive ? 1 : 0.6}
                            >
                                {stage.label}
                            </text>

                            {/* Description */}
                            <text x={x} y={nodeY + 62} textAnchor="middle"
                                className="fill-neutral-500 dark:fill-neutral-400"
                                fontSize="8" opacity={isActive ? 0.8 : 0}
                            >
                                {stage.desc}
                            </text>
                        </g>
                    );
                })}
            </svg>

            {/* Active stage indicator */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5">
                {stages.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setActiveStage(i)}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                            i === activeStage ? 'w-6 bg-primary-500' : 'bg-neutral-300 dark:bg-neutral-600'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}
