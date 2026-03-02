import { useEffect } from 'react';
import Hero from '../components/Hero';
import Section from '../components/Section';
import Timeline from '../components/Timeline';
import Badge from '../components/Badge';
import CTA from '../components/CTA';
import ScrollReveal from '../components/ScrollReveal';
import { BRAND, PROBLEMS, TIMELINE_PHASES, COMPLIANCE, AUDIENCE_CTAS, POSITIONING_PILLARS, PHASE2_MODULES } from '../data/content';
import { Activity, Heart, TrendingUp, Users, Dumbbell, BarChart3, Watch, Brain, MessageSquare, MapPin, Check, ArrowRight, Sparkles, Shield, ChevronRight } from 'lucide-react';
import ResearchValidation from '../components/ResearchValidation';
import AnalyticsGraph from '../components/visualizations/AnalyticsGraph';
import GLP1JourneyFlow from '../components/visualizations/GLP1JourneyFlow';
import WellnessScoreRadar from '../components/visualizations/WellnessScoreRadar';
import ProteinTracker from '../components/visualizations/ProteinTracker';
import IndiaAdoptionMap from '../components/visualizations/IndiaAdoptionMap';

export default function Home() {
    useEffect(() => {
        document.title = 'EnteraFlux — Wellness Companion for GLP-1 Medications in India';
    }, []);

    const stats = [
        { value: '2025', label: 'GLP-1 drugs launched in India', detail: 'Generics expected after March 2026', icon: MapPin, accent: 'from-primary-500 to-primary-600' },
        { value: '10%+', label: 'Indian adults with diabetes', detail: 'Many more are pre-diabetic', icon: Users, accent: 'from-success-500 to-success-600' },
        { value: '50%+', label: 'Users quit within Year 1', detail: 'Mostly due to side effects', icon: BarChart3, accent: 'from-warning-500 to-warning-600' },
    ];

    const steps = [
        { icon: Watch, title: 'Connect', desc: 'Link your smartwatch or fitness band — Mi Band, Noise, boAt, Apple Watch, Fitbit, and more.' },
        { icon: Activity, title: 'Calibrate', desc: 'The app spends 2 weeks learning your baseline heart rate, sleep, and recovery rhythms.' },
        { icon: Brain, title: 'Understand', desc: 'See meaningful changes from your baseline, especially after doses, travel, or poor sleep.' },
        { icon: MessageSquare, title: 'Act', desc: 'Get simple, personalised tips — like "have extra dal today" or "drink more water."' },
    ];

    return (
        <div>
            <Hero
                title={BRAND.name}
                subtitle={BRAND.tagline}
                primaryCTA={{
                    text: 'Give Feedback',
                    href: '/contact',
                    variant: 'primary',
                }}
                badge={COMPLIANCE.development}
            />

            {/* ── India Context: Stats Bar ── */}
            <Section
                label="India Context"
                title="Why India, Why Now"
                subtitle="GLP-1 medications are arriving in India — and millions of people need the right support"
                variant="default"
            >
                <div className="max-w-5xl mx-auto">
                    {/* Analytics Graph */}
                    <ScrollReveal delay={100} effect="zoom-in" duration={900}>
                        <div className="mb-16 h-[320px]">
                            <AnalyticsGraph />
                        </div>
                    </ScrollReveal>

                    {/* Stats: Modern horizontal bar */}
                    <div className="grid grid-cols-1 md:grid-cols-3 relative">
                        {stats.map((stat, i) => (
                            <ScrollReveal key={i} delay={i * 120} direction="up">
                                <div className={`relative p-8 ${i < stats.length - 1 ? 'md:border-r border-b md:border-b-0 border-neutral-200/60 dark:border-white/[0.06]' : ''}`}>
                                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.accent} flex items-center justify-center mb-5 shadow-lg shadow-black/[0.06]`}>
                                        <stat.icon className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white mb-1.5 tracking-tight">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-1">{stat.label}</div>
                                    <p className="text-xs text-neutral-400 dark:text-neutral-500">{stat.detail}</p>
                                </div>
                            </ScrollReveal>
                        ))}

                        {/* Background card */}
                        <div className="absolute inset-0 -z-10 rounded-2xl border border-neutral-200/60 dark:border-white/[0.06] bg-white/60 dark:bg-white/[0.02] backdrop-blur-sm" />
                    </div>
                </div>
            </Section>

            {/* ── Problems: Numbered List ── */}
            <Section
                label="The Challenge"
                title="Problems We're Solving"
                subtitle="Real challenges facing GLP-1 users in India — backed by research"
                variant="dark"
            >
                <div className="max-w-4xl mx-auto space-y-4">
                    {PROBLEMS.map((problem, index) => (
                        <ScrollReveal key={index} delay={index * 80} effect="rise">
                            <div className="group flex items-start gap-5 p-6 rounded-2xl border border-neutral-200/50 dark:border-white/[0.06] bg-white/60 dark:bg-white/[0.02] backdrop-blur-sm hover:border-warning-300 dark:hover:border-warning-500/20 transition-all duration-300 relative overflow-hidden">
                                {/* Left accent */}
                                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-warning-400 to-warning-600 opacity-60 group-hover:opacity-100 transition-opacity" />
                                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-warning-50 dark:bg-warning-500/10 flex items-center justify-center text-sm font-bold text-warning-600 dark:text-warning-400">
                                    {String(index + 1).padStart(2, '0')}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-base font-semibold text-neutral-900 dark:text-white mb-1.5 leading-snug">{problem.title}</h3>
                                    <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">{problem.description}</p>
                                </div>
                                <ChevronRight className="w-4 h-4 text-neutral-300 dark:text-neutral-600 flex-shrink-0 mt-3 group-hover:text-warning-500 dark:group-hover:text-warning-400 transition-colors" />
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </Section>

            {/* ── How It Works: Connected Steps ── */}
            <Section
                label="How It Works"
                title="Four Simple Steps"
                subtitle="From wearing your watch to feeling better every day"
                variant="default"
            >
                <div className="max-w-5xl mx-auto">
                    {/* Steps grid with connection line */}
                    <div className="relative">
                        {/* Connection line - desktop only */}
                        <div className="hidden lg:block absolute top-[52px] left-[calc(12.5%+20px)] right-[calc(12.5%+20px)] h-px bg-gradient-to-r from-primary-200 via-primary-400 to-primary-200 dark:from-primary-800 dark:via-primary-500 dark:to-primary-800" />

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {steps.map((step, i) => (
                                <ScrollReveal key={i} delay={i * 120} effect="elastic-scale">
                                    <div className="relative text-center group">
                                        {/* Number dot */}
                                        <div className="relative z-10 w-[104px] h-[104px] mx-auto mb-6 rounded-2xl bg-gradient-to-br from-white to-primary-50/50 dark:from-white/[0.04] dark:to-primary-500/[0.06] border border-primary-200/60 dark:border-primary-500/20 flex flex-col items-center justify-center shadow-sm shadow-primary-500/[0.06] group-hover:border-primary-400 dark:group-hover:border-primary-500/40 group-hover:shadow-lg group-hover:shadow-primary-500/[0.1] transition-all duration-300">
                                            <span className="text-[10px] font-bold text-primary-500 dark:text-primary-400 uppercase tracking-widest mb-1.5">Step {i + 1}</span>
                                            <step.icon className="w-7 h-7 text-primary-600 dark:text-primary-400 transition-colors" />
                                        </div>
                                        <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-2">{step.title}</h3>
                                        <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-[220px] mx-auto">{step.desc}</p>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>

                    {/* Journey Flow */}
                    <ScrollReveal delay={200} effect="blur-scale" duration={1000}>
                        <div className="mt-16 h-[280px]">
                            <GLP1JourneyFlow />
                        </div>
                    </ScrollReveal>
                </div>
            </Section>

            {/* ── What We Believe: Gradient Feature Card + Pillar Chips ── */}
            <Section
                label="Our Philosophy"
                title="What We Believe"
                subtitle="The principles that guide everything we build"
                variant="gradient"
            >
                <div className="max-w-5xl mx-auto">
                    {/* Mission: Gradient card */}
                    <ScrollReveal effect="rise" duration={1000}>
                        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 dark:from-primary-700 dark:via-primary-800 dark:to-primary-900 p-8 sm:p-12 mb-12 text-white shadow-2xl shadow-primary-600/20">
                            {/* Decorative circles */}
                            <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/[0.06] rounded-full blur-2xl" />
                            <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-white/[0.04] rounded-full blur-2xl" />

                            <div className="relative z-10">
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-xs font-semibold tracking-wide mb-6">
                                    <Sparkles className="w-3 h-3" />
                                    Our Mission
                                </div>
                                <p className="text-lg sm:text-xl leading-relaxed text-white/90 mb-6">{BRAND.mission}</p>
                                <p className="text-sm text-white/60 leading-relaxed max-w-3xl">
                                    We believe weight-loss medication should go hand in hand with better everyday habits. By combining the signals your smartwatch already collects with practical, Indian-lifestyle-friendly guidance, we help you move from confusion and discomfort to clarity and confidence.
                                </p>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Pillars: 2x3 small cards */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {POSITIONING_PILLARS.slice(0, 6).map((pillar, index) => {
                            const accents = [
                                'from-primary-400 to-primary-600',
                                'from-primary-500 to-blue-500',
                                'from-blue-400 to-primary-600',
                                'from-primary-400 to-blue-600',
                                'from-blue-500 to-primary-500',
                                'from-primary-600 to-blue-400',
                            ];
                            const icons = [Heart, Activity, Brain, Users, Shield, MapPin];
                            const Icon = icons[index] || Heart;
                            return (
                                <ScrollReveal key={index} delay={index * 80} effect="tilt-in">
                                    <div className="relative p-5 rounded-2xl border border-neutral-200/50 dark:border-white/[0.06] bg-white/60 dark:bg-white/[0.02] backdrop-blur-sm hover:border-primary-300 dark:hover:border-primary-500/20 transition-all duration-300 h-full overflow-hidden">
                                        {/* Top accent bar */}
                                        <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${accents[index]} opacity-80`} />
                                        <div className="flex items-center gap-3 mb-2.5">
                                            <div className="w-8 h-8 rounded-lg bg-primary-50 dark:bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                                                <Icon className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                                            </div>
                                            <h4 className="text-sm font-bold text-neutral-900 dark:text-white">{pillar.title}</h4>
                                        </div>
                                        <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">{pillar.description}</p>
                                    </div>
                                </ScrollReveal>
                            );
                        })}
                    </div>
                </div>
            </Section>

            {/* ── Module 1: Body Signals — Left text, Right viz ── */}
            <Section
                label="Module 1"
                title="Body Signals & Recovery Awareness"
                subtitle="Your smartwatch picks up signals every day. We help you understand what they mean."
                variant="default"
            >
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
                        {/* Left: Feature list */}
                        <div className="lg:col-span-2 space-y-4">
                            {[
                                { icon: Activity, title: '2-Week Calibration', desc: 'The app learns your personal baseline — heart rate, sleep, and recovery rhythms.' },
                                { icon: TrendingUp, title: 'Event-Based Check-ins', desc: 'After dose days, travel, or poor sleep, get relevant wellness nudges.' },
                                { icon: Heart, title: 'Weekly Trends', desc: 'Simple summaries of how your body signals change over time — no medical jargon.' },
                            ].map((item, i) => (
                                <ScrollReveal key={i} delay={i * 100} effect="slide-rotate">
                                    <div className="flex gap-4 p-4 rounded-xl hover:bg-neutral-50 dark:hover:bg-white/[0.02] transition-colors duration-300 group">
                                        <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-100 dark:group-hover:bg-primary-500/20 transition-colors">
                                            <item.icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-bold text-neutral-900 dark:text-white mb-1">{item.title}</h3>
                                            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>

                        {/* Right: Visualization */}
                        <div className="lg:col-span-3">
                            <ScrollReveal delay={200} effect="blur-scale" duration={1000}>
                                <div className="h-[360px] rounded-2xl border border-neutral-200/40 dark:border-white/[0.06] bg-white/40 dark:bg-white/[0.01] backdrop-blur-sm p-4 overflow-hidden">
                                    <WellnessScoreRadar />
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>

                    <div className="mt-14">
                        <ResearchValidation />
                    </div>
                </div>
            </Section>

            {/* ── Module 2: Muscle-Safe Coaching — Right viz, Left text ── */}
            <Section
                label="Module 2"
                title="Muscle-Safe Weight-Loss Coaching"
                subtitle="Lose fat, not muscle — with Indian-diet-friendly protein guidance"
                variant="dark"
            >
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
                        {/* Left: Visualization */}
                        <div className="lg:col-span-3 order-2 lg:order-1">
                            <ScrollReveal delay={100} effect="flip-left" duration={900}>
                                <div className="h-[300px] rounded-2xl border border-neutral-200/40 dark:border-white/[0.06] bg-white/40 dark:bg-white/[0.01] backdrop-blur-sm p-4 overflow-hidden">
                                    <ProteinTracker />
                                </div>
                            </ScrollReveal>
                        </div>

                        {/* Right: Feature cards */}
                        <div className="lg:col-span-2 order-1 lg:order-2 space-y-5">
                            {[
                                {
                                    icon: Dumbbell, title: 'Indian Protein Guide',
                                    items: ['Daily protein targets using dal, paneer, curd, eggs & chicken', 'Vegetarian and non-vegetarian meal ideas', 'Sarcopenia awareness and prevention'],
                                },
                                {
                                    icon: Activity, title: 'Recovery-Based Activity',
                                    items: ['Workouts adjusted to your energy and recovery', 'Hydration reminders based on activity & weather', 'Rest-day recommendations when you need it'],
                                },
                            ].map((card, i) => (
                                <ScrollReveal key={i} delay={i * 140} effect="tilt-in">
                                    <div className="p-5 rounded-2xl border border-success-200/40 dark:border-success-500/15 bg-white/60 dark:bg-white/[0.02] backdrop-blur-sm relative overflow-hidden">
                                        {/* Top accent */}
                                        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-success-400 to-success-600 opacity-70" />
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-9 h-9 rounded-lg bg-success-50 dark:bg-success-500/10 flex items-center justify-center">
                                                <card.icon className="w-4.5 h-4.5 text-success-600 dark:text-success-400" />
                                            </div>
                                            <h3 className="text-sm font-bold text-neutral-900 dark:text-white">{card.title}</h3>
                                        </div>
                                        <ul className="space-y-2">
                                            {card.items.map((item, j) => (
                                                <li key={j} className="flex items-start gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                                                    <Check className="w-3.5 h-3.5 text-success-500 dark:text-success-400 flex-shrink-0 mt-0.5" />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </div>
            </Section>

            {/* ── Phase 2 Preview: Bento layout ── */}
            <Section
                label="Coming Soon"
                title="Phase 2: Enterprise & Research"
                subtitle="After our consumer launch, we're building tools for pharma, employers, and researchers"
                variant="gradient"
            >
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
                        {/* Map — larger */}
                        <div className="lg:col-span-3">
                            <ScrollReveal delay={100} effect="zoom-in" duration={1000}>
                                <div className="h-[400px] rounded-2xl border border-neutral-200/40 dark:border-white/[0.06] bg-white/40 dark:bg-white/[0.01] backdrop-blur-sm p-4 overflow-hidden">
                                    <IndiaAdoptionMap />
                                </div>
                            </ScrollReveal>
                        </div>

                        {/* Module cards stacked */}
                        <div className="lg:col-span-2 space-y-4">
                            {PHASE2_MODULES.map((module, i) => (
                                <ScrollReveal key={module.id} delay={(i + 1) * 120} effect="flip-up">
                                    <div className="p-5 rounded-2xl border border-primary-200/40 dark:border-primary-500/15 bg-white/60 dark:bg-white/[0.02] backdrop-blur-sm relative overflow-hidden">
                                        {/* Top accent */}
                                        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary-400 to-blue-500 opacity-70" />
                                        <div className="mb-3">
                                            <Badge text="Phase 2 — Coming 2027" variant="status" />
                                        </div>
                                        <h3 className="text-sm font-bold text-neutral-900 dark:text-white mb-1.5">{module.title}</h3>
                                        <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">{module.description}</p>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                    <p className="text-center text-neutral-400 dark:text-neutral-500 text-xs mt-8">
                        Phase 2 features are planned for 2027 and beyond. They are not part of the current consumer app.
                    </p>
                </div>
            </Section>

            {/* ── Roadmap ── */}
            <Section
                label="Roadmap"
                title="Where We Are & Where We're Going"
                subtitle="A clear plan from today to launch — built for India"
            >
                <Timeline phases={TIMELINE_PHASES} />
                <div className="text-center mt-14">
                    <CTA text="See Full Roadmap" href="/roadmap" variant="text" icon={<ArrowRight className="w-4 h-4" />} />
                </div>
            </Section>

            {/* ── Current Status: Minimal strip ── */}
            <Section
                label="Transparency"
                title="Current Status"
                subtitle="We believe in being honest and open about where we are"
                variant="dark"
            >
                <div className="max-w-3xl mx-auto">
                    <div className="p-8 rounded-2xl border border-neutral-200/50 dark:border-white/[0.06] bg-white/60 dark:bg-white/[0.02] backdrop-blur-sm">
                        <div className="flex flex-wrap gap-2 justify-center mb-6">
                            <Badge text={COMPLIANCE.development} variant="development" />
                            <Badge text={COMPLIANCE.notMedicalDevice} variant="regulatory" />
                            <Badge text={COMPLIANCE.notClinicalUse} variant="regulatory" />
                            <Badge text={COMPLIANCE.pendingValidation} variant="status" />
                            <Badge text={COMPLIANCE.researchOnly} variant="research" />
                            <Badge text={COMPLIANCE.betaAccess} variant="development" />
                        </div>
                        <p className="text-center text-neutral-500 dark:text-neutral-400 text-sm max-w-2xl mx-auto leading-relaxed">
                            EnteraFlux is a <strong className="text-neutral-700 dark:text-neutral-300">wellness and lifestyle app</strong> — it is <strong className="text-neutral-700 dark:text-neutral-300">not a medical device</strong> and does not diagnose, treat, or prevent any condition. We provide research-informed wellness tips, not medical advice. Always consult your doctor for health decisions.
                        </p>
                    </div>
                </div>
            </Section>

            {/* ── Get Involved: Modern CTA Cards ── */}
            <Section
                label="Join Us"
                title="Get Involved"
                subtitle="Whether you're a GLP-1 user, doctor, researcher, or supporter — there's a place for you"
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
                    {AUDIENCE_CTAS.map((item, index) => (
                        <ScrollReveal key={index} delay={index * 100} effect="blur-in">
                            <div className="group relative p-6 rounded-2xl border border-neutral-200/50 dark:border-white/[0.06] bg-white/60 dark:bg-white/[0.02] backdrop-blur-sm hover:border-primary-200 dark:hover:border-primary-500/20 transition-all duration-300 h-full flex flex-col overflow-hidden">
                                {/* Top accent bar */}
                                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary-400 to-primary-600 opacity-70 group-hover:opacity-100 transition-opacity" />
                                <span className="text-[11px] font-bold text-primary-500 dark:text-primary-400 uppercase tracking-widest mb-3">{item.audience}</span>
                                <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-2">{item.title}</h3>
                                <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6 flex-1 leading-relaxed">{item.description}</p>
                                <CTA text={item.cta} href={item.href} variant="primary" icon={<ArrowRight className="w-4 h-4" />} />
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </Section>
        </div>
    );
}
