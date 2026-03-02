import { useEffect, useState } from 'react';
import type { HeroProps } from '../types';
import CTA from './CTA';
import { ArrowRight, Shield, CheckCircle, TrendingUp, Heart, Activity, Moon, Utensils, Droplets } from 'lucide-react';

export default function Hero({ primaryCTA, secondaryCTA, badge }: HeroProps) {
    const [mounted, setMounted] = useState(false);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    useEffect(() => { setMounted(true); }, []);

    return (
        <section className="relative min-h-[100dvh] bg-white dark:bg-[#0a0f1e] overflow-clip transition-colors duration-300">
            {/* ── Animated mesh background ── */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Primary orb — top-right, slow drift */}
                <div
                    className="absolute w-[700px] h-[700px] rounded-full blur-[140px] opacity-[0.07] dark:opacity-[0.10]"
                    style={{
                        background: 'radial-gradient(circle, #3B82F6, transparent 70%)',
                        top: '-15%',
                        right: '-10%',
                        animation: 'heroOrb1 20s ease-in-out infinite',
                    }}
                />
                {/* Success orb — bottom-left */}
                <div
                    className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-[0.05] dark:opacity-[0.08]"
                    style={{
                        background: 'radial-gradient(circle, #22C55E, transparent 70%)',
                        bottom: '-10%',
                        left: '-5%',
                        animation: 'heroOrb2 25s ease-in-out infinite',
                    }}
                />
                {/* Indigo orb — center, subtle */}
                <div
                    className="absolute w-[400px] h-[400px] rounded-full blur-[100px] opacity-[0.04] dark:opacity-[0.06]"
                    style={{
                        background: 'radial-gradient(circle, #6366F1, transparent 70%)',
                        top: '40%',
                        left: '30%',
                        animation: 'heroOrb3 18s ease-in-out infinite',
                    }}
                />
            </div>

            {/* Fine grain noise */}
            <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    backgroundSize: '128px 128px',
                }}
            />

            {/* ── Main layout: left text + right visual ── */}
            <div className="relative z-10 w-full max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 pt-20 sm:pt-28 lg:pt-30 pb-15 sm:pb-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[calc(100dvh-10rem)]">

                    {/* ── Left column: copy ── */}
                    <div className="lg:col-span-6 xl:col-span-5">
                        {/* Badge */}
                        {badge && (
                            <div className={`mb-7 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'}`}>
                                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-widest text-primary-600 dark:text-primary-400 bg-primary-50/80 dark:bg-primary-500/10 border border-primary-200/50 dark:border-primary-500/20">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75" />
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500" />
                                    </span>
                                    {badge}
                                </span>
                            </div>
                        )}

                        {/* Headline — big, emotional, two-tone */}
                        <h1 className={`transition-all duration-1000 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                            <span className="block text-[2.5rem] sm:text-5xl lg:text-[3.5rem] xl:text-6xl font-extrabold tracking-[-0.03em] leading-[1.06] text-neutral-900 dark:text-white">
                                Feel better on
                            </span>
                            <span className="block text-[2.5rem] sm:text-5xl lg:text-[3.5rem] xl:text-6xl font-extrabold tracking-[-0.03em] leading-[1.06]">
                                <span className="relative">
                                    <span className="bg-gradient-to-r from-primary-600 via-primary-500 to-success-500 dark:from-primary-400 dark:via-blue-400 dark:to-emerald-400 bg-clip-text text-transparent">GLP-1 medication.</span>
                                    {/* Underline accent */}
                                    <svg className="absolute -bottom-2 left-0 w-full h-3 text-primary-500/20 dark:text-primary-400/20" viewBox="0 0 200 8" preserveAspectRatio="none">
                                        <path d="M0 7 Q50 0, 100 4 Q150 8, 200 1" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                                    </svg>
                                </span>
                            </span>
                        </h1>

                        {/* Sub-copy */}
                        <p className={`mt-7 text-lg sm:text-xl text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-lg transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                            Your smartwatch already tracks your body. We turn those signals into personalised wellness guidance, made for Indian diets & lifestyles.
                        </p>

                        {/* CTAs */}
                        <div className={`mt-9 flex flex-col sm:flex-row items-start gap-3.5 transition-all duration-1000 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                            <CTA {...primaryCTA} icon={<ArrowRight className="w-5 h-5" />} />
                            {secondaryCTA && <CTA {...secondaryCTA} />}
                        </div>

                        {/* Trust row */}
                        <div className={`mt-10 flex flex-wrap items-center gap-x-5 gap-y-2.5 transition-all duration-1000 delay-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                            {[
                                { icon: Shield, label: 'Research-Informed' },
                                { icon: CheckCircle, label: 'Made for India' },
                                { icon: TrendingUp, label: 'Not a Medical Device' },
                            ].map((t, i) => (
                                <div key={i} className="flex items-center gap-1.5">
                                    <t.icon className="w-3.5 h-3.5 text-success-500/70 dark:text-success-400/70" />
                                    <span className="text-xs text-neutral-400 dark:text-neutral-500 font-medium">{t.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── Right column: living app preview ── */}
                    <div className={`lg:col-span-6 xl:col-span-7 transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-[0.97]'}`}>
                        <div className="relative max-w-xl mx-auto lg:max-w-none">
                            {/* ── Main bento grid ── */}
                            <div className="grid grid-cols-6 gap-3">
                                {/* Wellness Score — big card, spans 4 cols */}
                                <div className="col-span-4 row-span-2 rounded-2xl border border-neutral-200/60 dark:border-white/[0.06] bg-white/80 dark:bg-white/[0.03] backdrop-blur-xl p-6 relative overflow-hidden group hover:border-primary-200 dark:hover:border-primary-500/20 transition-all duration-500">
                                    <div className="flex items-center justify-between mb-5">
                                        <div>
                                            <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-0.5">Wellness Score</p>
                                            <p className="text-xs text-neutral-400 dark:text-neutral-500">Today</p>
                                        </div>
                                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/25">
                                            <Activity className="w-4 h-4 text-white" />
                                        </div>
                                    </div>

                                    {/* Score ring */}
                                    <div className="flex items-center gap-6">
                                        <div className="relative flex-shrink-0">
                                            <svg className="w-28 h-28" viewBox="0 0 120 120">
                                                <circle cx="60" cy="60" r="50" fill="none" strokeWidth="7" className="stroke-neutral-100 dark:stroke-white/[0.04]" />
                                                <circle
                                                    cx="60" cy="60" r="50" fill="none" strokeWidth="7" strokeLinecap="round"
                                                    stroke="url(#heroScoreGrad)"
                                                    strokeDasharray="314"
                                                    strokeDashoffset={mounted ? '56' : '314'}
                                                    transform="rotate(-90 60 60)"
                                                    style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1) 0.8s' }}
                                                />
                                                <defs>
                                                    <linearGradient id="heroScoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                                        <stop offset="0%" stopColor="#3B82F6" />
                                                        <stop offset="100%" stopColor="#22C55E" />
                                                    </linearGradient>
                                                </defs>
                                            </svg>
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="text-center">
                                                    <span className="text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">82</span>
                                                    <span className="text-xs text-neutral-400 dark:text-neutral-500 block -mt-0.5">/100</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Mini stats */}
                                        <div className="flex-1 space-y-3">
                                            {[
                                                { label: 'Recovery', value: 'Good', color: 'bg-success-500' },
                                                { label: 'Sleep Quality', value: '7.2 hrs', color: 'bg-indigo-500' },
                                                { label: 'Hydration', value: 'On Track', color: 'bg-primary-500' },
                                            ].map((s, i) => (
                                                <div key={i} className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <div className={`w-1.5 h-1.5 rounded-full ${s.color}`} />
                                                        <span className="text-[11px] text-neutral-500 dark:text-neutral-400">{s.label}</span>
                                                    </div>
                                                    <span className="text-[11px] font-semibold text-neutral-700 dark:text-neutral-300">{s.value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Heart Rate — small card, 2 cols */}
                                <div className="col-span-2 rounded-2xl border border-neutral-200/60 dark:border-white/[0.06] bg-white/80 dark:bg-white/[0.03] backdrop-blur-xl p-4 flex flex-col justify-between hover:border-red-200 dark:hover:border-red-500/20 transition-all duration-500">
                                    <div className="w-7 h-7 rounded-lg bg-red-50 dark:bg-red-500/10 flex items-center justify-center mb-2">
                                        <Heart className="w-3.5 h-3.5 text-red-500 dark:text-red-400" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-0.5">Heart Rate</p>
                                        <p className="text-xl font-bold text-neutral-900 dark:text-white tracking-tight">68 <span className="text-xs font-medium text-neutral-400">bpm</span></p>
                                    </div>
                                    {/* Mini sparkline */}
                                    <svg className="w-full h-6 mt-2" viewBox="0 0 80 20">
                                        <polyline
                                            points="0,14 8,12 16,15 24,10 32,13 40,8 48,11 56,6 64,9 72,7 80,10"
                                            fill="none" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"
                                        />
                                    </svg>
                                </div>

                                {/* HRV — small card */}
                                <div className="col-span-2 rounded-2xl border border-neutral-200/60 dark:border-white/[0.06] bg-white/80 dark:bg-white/[0.03] backdrop-blur-xl p-4 flex flex-col justify-between hover:border-primary-200 dark:hover:border-primary-500/20 transition-all duration-500">
                                    <div className="w-7 h-7 rounded-lg bg-primary-50 dark:bg-primary-500/10 flex items-center justify-center mb-2">
                                        <Activity className="w-3.5 h-3.5 text-primary-500 dark:text-primary-400" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-0.5">HRV</p>
                                        <p className="text-xl font-bold text-neutral-900 dark:text-white tracking-tight">48 <span className="text-xs font-medium text-neutral-400">ms</span></p>
                                    </div>
                                    <div className="flex items-center gap-1 mt-2">
                                        <TrendingUp className="w-3 h-3 text-success-500" />
                                        <span className="text-[10px] text-success-600 dark:text-success-400 font-medium">+6% this week</span>
                                    </div>
                                </div>

                                {/* Protein nudge — wide card, 4 cols */}
                                <div className="col-span-4 rounded-2xl border border-neutral-200/60 dark:border-white/[0.06] bg-gradient-to-r from-success-50/50 to-white dark:from-success-500/[0.04] dark:to-white/[0.02] backdrop-blur-xl p-4 hover:border-success-200 dark:hover:border-success-500/20 transition-all duration-500">
                                    <div className="flex items-start gap-3">
                                        <div className="w-9 h-9 rounded-xl bg-success-100 dark:bg-success-500/15 flex items-center justify-center flex-shrink-0">
                                            <Utensils className="w-4 h-4 text-success-600 dark:text-success-400" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 mb-0.5">Protein Tip | Lunch</p>
                                            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-snug">Add a cup of curd for 8g extra protein. You're at 42g / 65g today.</p>
                                        </div>
                                    </div>
                                    {/* Progress bar */}
                                    <div className="mt-3 h-1.5 rounded-full bg-neutral-100 dark:bg-white/[0.04] overflow-hidden">
                                        <div
                                            className="h-full rounded-full bg-gradient-to-r from-success-400 to-success-500"
                                            style={{ width: mounted ? '65%' : '0%', transition: 'width 1.2s cubic-bezier(0.4, 0, 0.2, 1) 1.2s' }}
                                        />
                                    </div>
                                </div>

                                {/* Deep Sleep — 2 cols */}
                                <div className="col-span-2 rounded-2xl border border-neutral-200/60 dark:border-white/[0.06] bg-white/80 dark:bg-white/[0.03] backdrop-blur-xl p-4 hover:border-indigo-200 dark:hover:border-indigo-500/20 transition-all duration-500">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Moon className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                                        <span className="text-[10px] text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">Deep Sleep</span>
                                    </div>
                                    <p className="text-xl font-bold text-neutral-900 dark:text-white tracking-tight">1h 42m</p>
                                    <p className="text-[10px] text-neutral-400 dark:text-neutral-500 mt-1">vs 1h 28m avg</p>
                                </div>

                                {/* Hydration reminder — 2 cols */}
                                <div className="col-span-2 rounded-2xl border border-neutral-200/60 dark:border-white/[0.06] bg-white/80 dark:bg-white/[0.03] backdrop-blur-xl p-4 hover:border-sky-200 dark:hover:border-sky-500/20 transition-all duration-500">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Droplets className="w-3.5 h-3.5 text-sky-500 dark:text-sky-400" />
                                        <span className="text-[10px] text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">Hydration</span>
                                    </div>
                                    <p className="text-xl font-bold text-neutral-900 dark:text-white tracking-tight">1.8L</p>
                                    <p className="text-[10px] text-neutral-400 dark:text-neutral-500 mt-1">Target: 2.5L</p>
                                </div>
                            </div>

                            {/* Subtle glow behind the grid */}
                            <div className="absolute -inset-8 bg-gradient-to-br from-primary-200/20 via-transparent to-success-200/20 dark:from-primary-500/[0.06] dark:to-success-500/[0.04] rounded-3xl blur-2xl -z-10 pointer-events-none" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-[#0a0f1e] to-transparent pointer-events-none" />

            {/* Orb keyframes */}
            <style>{`
                @keyframes heroOrb1 {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(-40px, 30px) scale(1.05); }
                    66% { transform: translate(20px, -20px) scale(0.95); }
                }
                @keyframes heroOrb2 {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(30px, -40px) scale(1.08); }
                    66% { transform: translate(-20px, 20px) scale(0.92); }
                }
                @keyframes heroOrb3 {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    50% { transform: translate(40px, 30px) scale(1.1); }
                }
            `}</style>
        </section>
    );
}
