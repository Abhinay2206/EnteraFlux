import { useEffect } from 'react';
import Section from '../components/Section';
import ScrollReveal from '../components/ScrollReveal';
import { Activity, Heart, Brain, Moon, TrendingUp, Database, ChevronRight, Watch, Smartphone, Radio, ArrowRight, Zap } from 'lucide-react';
import MechanismAction from '../components/visualizations/MechanismAction';
import WellnessScoreRadar from '../components/visualizations/WellnessScoreRadar';

export default function Science() {
    useEffect(() => {
        document.title = 'Science | EnteraFlux';
    }, []);

    const metrics = [
        { icon: Heart, title: 'Heart Rate Variability (HRV)', desc: 'Reflects autonomic nervous system balance. GLP-1 agonists can modulate vagal tone, and HRV changes from your personal baseline can indicate shifts in recovery readiness and stress resilience day to day.' },
        { icon: Activity, title: 'Resting Heart Rate', desc: 'A reliable proxy for cardiovascular load. We identify subtle shifts from your personal baseline after dose days, poor sleep, or dehydration, all of which are common during GLP-1 therapy.' },
        { icon: Moon, title: 'Sleep Architecture', desc: 'Deep sleep and REM ratios change with weight loss and medication timing. We surface trends so you can explore how dose timing affects your rest.' },
        { icon: TrendingUp, title: 'Recovery Score', desc: 'A composite signal combining HRV, sleep quality, and resting HR, calibrated to your personal baseline over the first two weeks.' },
        { icon: Database, title: 'Weekly Trends', desc: 'Rolling 7-day and 30-day views of all signals, highlighting dose-day effects, travel disruptions, and lifestyle pattern changes.' },
        { icon: Brain, title: 'Event-Based Check-ins', desc: 'After dose days, travel, illness, or poor sleep, the app prompts a short check-in and correlates your subjective feel with objective signals.' },
    ];

    const pipeline = [
        { step: 'Collect', title: 'Wearable Data Ingestion', desc: 'Raw sensor data from your smartwatch (heart rate, steps, sleep stages, SpO₂) streamed via Health Connect or Apple HealthKit.', accent: 'from-primary-500 to-primary-600' },
        { step: 'Process', title: 'Baseline Calibration', desc: 'Two weeks of learning your personal norms. We build a statistical model of your resting HR, HRV range, and sleep patterns. No population averages.', accent: 'from-success-500 to-success-600' },
        { step: 'Surface', title: 'Contextual Insights', desc: 'Deviations from your baseline are correlated with medication timing and lifestyle factors to generate actionable, jargon-free wellness nudges.', accent: 'from-warning-500 to-warning-600' },
    ];

    const wearables = [
        { name: 'Apple Watch', note: 'Series 4+' },
        { name: 'Mi Band', note: '5, 6, 7, 8' },
        { name: 'Noise', note: 'ColorFit series' },
        { name: 'boAt', note: 'Storm, Lunar' },
        { name: 'Fitbit', note: 'Charge 5+' },
        { name: 'Samsung', note: 'Galaxy Watch 4+' },
    ];

    return (
        <div>
            {/* ── Hero / Intro ── */}
            <Section
                label="How It Works"
                title="The Science Behind EnteraFlux"
                subtitle="We turn everyday wearable signals into meaningful wellness guidance, based on physiology, not hype"
                variant="default"
            >
                <div className="max-w-5xl mx-auto">
                    <ScrollReveal effect="rise" duration={1000}>
                        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 dark:from-primary-700 dark:via-primary-800 dark:to-primary-900 p-8 sm:p-12 mb-12 text-white shadow-2xl shadow-primary-600/20">
                            <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/[0.06] rounded-full blur-2xl" />
                            <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-white/[0.04] rounded-full blur-2xl" />
                            <div className="relative z-10">
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-xs font-semibold tracking-wide mb-6">
                                    <Zap className="w-3 h-3" />
                                    Research-Informed Wellness
                                </div>
                                <p className="text-lg sm:text-xl leading-relaxed text-white/90 mb-4">
                                    GLP-1 receptor agonists (semaglutide, liraglutide, tirzepatide) are changing weight management. But the medication is only half the story.
                                </p>
                                <p className="text-sm text-white/60 leading-relaxed max-w-3xl">
                                    Side effects like nausea, fatigue, and muscle loss affect over 50% of users. EnteraFlux uses the biometric signals your smartwatch already collects to help you understand how your body is responding, and what you can do about it, every day.
                                </p>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </Section>

            {/* ── Calibration: Left viz, Right text ── */}
            <Section
                label="Calibration"
                title="Your Personal Baseline"
                subtitle="No two bodies respond the same way, so we start by learning yours"
                variant="dark"
            >
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
                        {/* Left: Visualization */}
                        <div className="lg:col-span-3">
                            <ScrollReveal delay={100} effect="zoom-in" duration={900}>
                                <div className="h-[360px] rounded-2xl border border-neutral-200/40 dark:border-white/[0.06] bg-white/40 dark:bg-white/[0.01] backdrop-blur-sm p-4 overflow-hidden">
                                    <MechanismAction />
                                </div>
                            </ScrollReveal>
                        </div>

                        {/* Right: Explanation */}
                        <div className="lg:col-span-2 space-y-5">
                            <ScrollReveal delay={150} effect="slide-rotate">
                                <div className="p-5 rounded-2xl border border-primary-200/40 dark:border-primary-500/15 bg-white/60 dark:bg-white/[0.02] backdrop-blur-sm relative overflow-hidden">
                                    {/* Top accent */}
                                    <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary-400 to-primary-600 opacity-70" />
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-9 h-9 rounded-lg bg-primary-50 dark:bg-primary-500/10 flex items-center justify-center">
                                            <Activity className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                                        </div>
                                        <h3 className="text-sm font-bold text-neutral-900 dark:text-white">2-Week Learning Period</h3>
                                    </div>
                                    <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                                        During the first 14 days, the app collects resting heart rate, HRV, sleep stages, and step patterns to build a statistical model of <strong className="text-neutral-700 dark:text-neutral-300">your</strong> normal, not a population average.
                                    </p>
                                </div>
                            </ScrollReveal>

                            <ScrollReveal delay={250} effect="tilt-in">
                                <div className="p-5 rounded-2xl border border-success-200/40 dark:border-success-500/15 bg-white/60 dark:bg-white/[0.02] backdrop-blur-sm relative overflow-hidden">
                                    {/* Top accent */}
                                    <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-success-400 to-success-600 opacity-70" />
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-9 h-9 rounded-lg bg-success-50 dark:bg-success-500/10 flex items-center justify-center">
                                            <TrendingUp className="w-5 h-5 text-success-600 dark:text-success-400" />
                                        </div>
                                        <h3 className="text-sm font-bold text-neutral-900 dark:text-white">Baseline Deviation Analysis</h3>
                                    </div>
                                    <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                                        Once calibrated, the app surfaces meaningful deviations from your baseline: a 10% HRV drop after a dose day, disrupted deep sleep after travel, or elevated resting HR during dehydration. It also explains what it might mean.
                                    </p>
                                </div>
                            </ScrollReveal>

                            <ScrollReveal delay={350} effect="flip-up">
                                <div className="p-5 rounded-2xl border border-warning-200/40 dark:border-warning-500/15 bg-white/60 dark:bg-white/[0.02] backdrop-blur-sm relative overflow-hidden">
                                    {/* Top accent */}
                                    <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-warning-400 to-warning-600 opacity-70" />
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-9 h-9 rounded-lg bg-warning-50 dark:bg-warning-500/10 flex items-center justify-center">
                                            <Brain className="w-5 h-5 text-warning-600 dark:text-warning-400" />
                                        </div>
                                        <h3 className="text-sm font-bold text-neutral-900 dark:text-white">Continuous Refinement</h3>
                                    </div>
                                    <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                                        Your baseline isn't static. As your body adapts to the medication and your fitness improves, the model recalibrates so that insights stay relevant week after week.
                                    </p>
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>
                </div>
            </Section>

            {/* ── Body Signals: Numbered List ── */}
            <Section
                label="Body Signals"
                title="Six Signals We Analyse"
                subtitle="Each metric is chosen for its relevance to GLP-1 therapy, not because it looks impressive on a dashboard"
                variant="default"
            >
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
                        {/* Left: Numbered list */}
                        <div className="lg:col-span-3 space-y-4">
                            {metrics.map((metric, index) => (
                                <ScrollReveal key={index} delay={index * 80} effect="rise">
                                    <div className="group flex items-start gap-5 p-5 rounded-2xl border border-neutral-200/50 dark:border-white/[0.06] bg-white/60 dark:bg-white/[0.02] backdrop-blur-sm hover:border-primary-300 dark:hover:border-primary-500/20 transition-all duration-300 relative overflow-hidden">
                                        {/* Left accent */}
                                        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-primary-400 to-primary-600 opacity-50 group-hover:opacity-100 transition-opacity" />
                                        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-500/10 flex items-center justify-center text-sm font-bold text-primary-600 dark:text-primary-400">
                                            {String(index + 1).padStart(2, '0')}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-sm font-bold text-neutral-900 dark:text-white mb-1.5 leading-snug">{metric.title}</h3>
                                            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">{metric.desc}</p>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-neutral-300 dark:text-neutral-600 flex-shrink-0 mt-3 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors" />
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>

                        {/* Right: Radar viz */}
                        <div className="lg:col-span-2">
                            <ScrollReveal delay={200} effect="blur-scale" duration={1000}>
                                <div className="h-[360px] rounded-2xl border border-neutral-200/40 dark:border-white/[0.06] bg-white/40 dark:bg-white/[0.01] backdrop-blur-sm p-4 overflow-hidden sticky top-24">
                                    <WellnessScoreRadar />
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>
                </div>
            </Section>

            {/* ── The Pipeline: 3 Horizontal Connected Steps ── */}
            <Section
                label="The Pipeline"
                title="From Raw Data to Clear Guidance"
                subtitle="Three stages turn noisy sensor data into something you can actually act on"
                variant="gradient"
            >
                <div className="max-w-5xl mx-auto">
                    <div className="relative">
                        {/* Connection line — desktop only */}
                        <div className="hidden lg:block absolute top-[52px] left-[calc(16.67%+20px)] right-[calc(16.67%+20px)] h-px bg-gradient-to-r from-primary-200 via-success-300 to-warning-200 dark:from-primary-800 dark:via-success-600 dark:to-warning-800" />

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {pipeline.map((item, i) => (
                                <ScrollReveal key={i} delay={i * 150} effect="elastic-scale">
                                    <div className="relative text-center group">
                                        {/* Icon box */}
                                        <div className="relative z-10 w-[104px] h-[104px] mx-auto mb-6 rounded-2xl bg-gradient-to-br from-white to-primary-50/40 dark:from-white/[0.04] dark:to-primary-500/[0.06] border border-primary-200/50 dark:border-primary-500/20 flex flex-col items-center justify-center shadow-sm shadow-primary-500/[0.05] group-hover:border-primary-400 dark:group-hover:border-primary-500/40 group-hover:shadow-lg group-hover:shadow-primary-500/[0.1] transition-all duration-300">
                                            <span className="text-[10px] font-bold uppercase tracking-widest mb-1.5">
                                                <span className={`bg-gradient-to-r ${item.accent} bg-clip-text text-transparent`}>{item.step}</span>
                                            </span>
                                            {i === 0 && <Radio className="w-7 h-7 text-primary-600 dark:text-primary-400 transition-colors" />}
                                            {i === 1 && <Brain className="w-7 h-7 text-success-600 dark:text-success-400 transition-colors" />}
                                            {i === 2 && <Zap className="w-7 h-7 text-warning-600 dark:text-warning-400 transition-colors" />}
                                        </div>

                                        <h3 className="text-sm font-bold text-neutral-900 dark:text-white mb-2">{item.title}</h3>
                                        <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-[260px] mx-auto">{item.desc}</p>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>

                    {/* Arrow indicators between steps — mobile */}
                    <div className="flex justify-center mt-8 lg:hidden">
                        <div className="flex items-center gap-2 text-xs text-neutral-400 dark:text-neutral-500">
                            <span>Collect</span>
                            <ArrowRight className="w-3 h-3" />
                            <span>Process</span>
                            <ArrowRight className="w-3 h-3" />
                            <span>Surface</span>
                        </div>
                    </div>
                </div>
            </Section>

            {/* ── Wearable Compatibility ── */}
            <Section
                label="Compatibility"
                title="Works With Your Watch"
                subtitle="We support the smartwatches and fitness bands most popular in India, plus global favourites"
                variant="dark"
            >
                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {wearables.map((w, i) => (
                            <ScrollReveal key={i} delay={i * 60} effect="tilt-in">
                                <div className="p-5 rounded-2xl border border-primary-200/40 dark:border-primary-500/15 bg-white/60 dark:bg-white/[0.02] backdrop-blur-sm hover:border-primary-300 dark:hover:border-primary-500/25 transition-all duration-300 text-center group relative overflow-hidden">
                                    {/* Top accent */}
                                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary-400 to-blue-500 opacity-60" />
                                    <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-500/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary-100 dark:group-hover:bg-primary-500/20 transition-colors">
                                        <Watch className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                                    </div>
                                    <h4 className="text-sm font-bold text-neutral-900 dark:text-white mb-1">{w.name}</h4>
                                    <p className="text-xs text-neutral-400 dark:text-neutral-500">{w.note}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                    <ScrollReveal delay={400} effect="blur-in">
                        <div className="mt-8 p-5 rounded-2xl border border-neutral-200/50 dark:border-white/[0.06] bg-white/60 dark:bg-white/[0.02] backdrop-blur-sm text-center">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <Smartphone className="w-4 h-4 text-primary-500 dark:text-primary-400" />
                                <h4 className="text-sm font-bold text-neutral-900 dark:text-white">Integration Layer</h4>
                            </div>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-xl mx-auto">
                                Data flows through <strong className="text-neutral-700 dark:text-neutral-300">Apple HealthKit</strong> (iOS) or <strong className="text-neutral-700 dark:text-neutral-300">Health Connect</strong> (Android). We never access raw sensor APIs directly. Your phone's health platform handles permissions and privacy.
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </Section>
        </div>
    );
}
