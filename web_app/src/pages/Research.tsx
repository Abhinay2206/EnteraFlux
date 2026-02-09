import { useEffect } from 'react';
import Section from '../components/Section';
import ScrollReveal from '../components/ScrollReveal';
import Badge from '../components/Badge';
import CTA from '../components/CTA';
import {
    FlaskConical,
    BookOpen,
    ShieldCheck,
    TrendingUp,
    Users,
    Brain,
    Heart,
    Activity,
    Dumbbell,
    ArrowRight,
    CheckCircle2,
    Globe,
    FileText,
    Building2,
    Lightbulb,
    Target,
    BarChart3,
    ChevronRight,
} from 'lucide-react';
import PharmacovigilanceChart from '../components/visualizations/PharmacovigilanceChart';

export default function Research() {
    useEffect(() => {
        document.title = 'Research — EnteraFlux';
    }, []);

    const researchPillars = [
        {
            icon: Heart,
            title: 'GLP-1 Side-Effect Patterns',
            desc: 'Published clinical trials document nausea, fatigue, and muscle loss in 40–50% of GLP-1 users. We map wearable signals against these known patterns — not to diagnose, but to help users notice and respond.',
            papers: 3,
            accent: 'from-primary-500 to-primary-600',
            bgLight: 'bg-primary-50',
            bgDark: 'dark:bg-primary-500/10',
            textLight: 'text-primary-600',
            textDark: 'dark:text-primary-400',
        },
        {
            icon: Activity,
            title: 'HRV & Autonomic Response',
            desc: 'Heart rate variability reflects autonomic nervous system balance. Research shows GLP-1 agonists can modulate vagal tone — we use HRV trends to surface recovery readiness and stress resilience.',
            papers: 5,
            accent: 'from-success-500 to-success-600',
            bgLight: 'bg-success-50',
            bgDark: 'dark:bg-success-500/10',
            textLight: 'text-success-600',
            textDark: 'dark:text-success-400',
        },
        {
            icon: Dumbbell,
            title: 'Sarcopenia & Muscle Preservation',
            desc: 'Rapid weight loss from GLP-1 therapy can accelerate muscle loss — especially in Indians with the "thin-fat" phenotype. Our protein guidance is informed by sports nutrition and metabolic research.',
            papers: 4,
            accent: 'from-warning-500 to-warning-600',
            bgLight: 'bg-warning-50',
            bgDark: 'dark:bg-warning-500/10',
            textLight: 'text-warning-600',
            textDark: 'dark:text-warning-400',
        },
        {
            icon: Brain,
            title: 'Sleep Architecture & Medication Timing',
            desc: 'Weight loss and GLP-1 medications can alter deep sleep and REM ratios. We surface sleep-stage trends so users can explore whether dose timing affects their rest quality.',
            papers: 2,
            accent: 'from-info-500 to-info-600',
            bgLight: 'bg-info-50',
            bgDark: 'dark:bg-info-500/10',
            textLight: 'text-info-600',
            textDark: 'dark:text-info-400',
        },
    ];

    const validationApproach = [
        {
            step: '01',
            title: 'Literature Review',
            desc: 'Every signal we track and every nudge we generate is grounded in peer-reviewed clinical trial data — primarily from STEP, SUSTAIN, and SURPASS programmes.',
            icon: BookOpen,
        },
        {
            step: '02',
            title: 'Clinical Advisory Input',
            desc: 'We consult with endocrinologists, sports nutritionists, and wearable-health researchers to validate our interpretation of biometric patterns.',
            icon: Users,
        },
        {
            step: '03',
            title: 'Personal Baseline Calibration',
            desc: 'Instead of population averages, we calibrate to each user\'s personal norms over a 2-week learning period — making insights individually relevant.',
            icon: Target,
        },
        {
            step: '04',
            title: 'Continuous Validation',
            desc: 'As we onboard beta users in Q3 2026, we\'ll gather anonymised feedback to refine our pattern-matching and improve guidance quality over time.',
            icon: TrendingUp,
        },
    ];

    const futurePlans = [
        {
            phase: 'Phase 2A',
            date: '2027',
            title: 'Pharma & Research Partnerships',
            desc: 'Aggregate, anonymised wellness data from Indian GLP-1 users — helping pharma companies understand real-world medication patterns in the Indian population.',
            icon: Building2,
            features: [
                'Real-world wellness data dashboards for pharma R&D teams',
                'Anonymised cohort analysis by medication type, dosage, and demographics',
                'Signal detection for emerging side-effect patterns in Indian users',
                'API access for approved research partners',
            ],
        },
        {
            phase: 'Phase 2B',
            date: '2027',
            title: 'Corporate Wellness Programs',
            desc: 'Offer GLP-1 lifestyle support as an employee wellness benefit — integrated with corporate health insurance and HR platforms.',
            icon: Users,
            features: [
                'Employer-sponsored GLP-1 wellness programmes',
                'Aggregate wellness analytics for HR teams (no individual data)',
                'Integration with Indian health insurance providers',
                'Employee engagement and adherence tracking',
            ],
        },
        {
            phase: 'Phase 2C',
            date: '2027+',
            title: 'Drug Authenticity Verification',
            desc: 'Help users verify that their GLP-1 medication is genuine — critical as generics flood the Indian market after patent expiry.',
            icon: ShieldCheck,
            features: [
                'QR / batch-code scanning for medication verification',
                'Database of approved GLP-1 generics in India',
                'Counterfeit reporting and community alerts',
                'Partnership with CDSCO and pharma manufacturers',
            ],
        },
    ];

    const keyStudies = [
        { title: 'STEP Trials (Novo Nordisk)', journal: 'NEJM, 2021–2023', finding: 'Semaglutide achieves 15–17% weight loss — but 44% of users report nausea, and lean mass loss is a documented concern.' },
        { title: 'SUSTAIN Programme', journal: 'Lancet Diabetes, 2017–2022', finding: 'Long-term GLP-1 use shows cardiovascular benefits, but gastrointestinal side effects drive discontinuation in >50% of users within Year 1.' },
        { title: 'SURPASS Trials (Eli Lilly)', journal: 'NEJM, 2022–2024', finding: 'Tirzepatide shows up to 22% weight loss — raising the importance of muscle-preservation strategies during rapid weight loss.' },
        { title: 'Indian "Thin-Fat" Phenotype Research', journal: 'Lancet, multiple studies', finding: 'Indians have higher visceral fat and lower muscle mass at the same BMI compared to Western populations — making sarcopenia prevention especially critical.' },
        { title: 'HRV & Autonomic Modulation by GLP-1', journal: 'Diabetes Care, 2020', finding: 'GLP-1 receptor agonists modulate vagal tone, with measurable effects on heart rate variability — supporting HRV as a relevant biometric signal.' },
    ];

    return (
        <div>
            {/* ── Hero ── */}
            <Section
                label="Research"
                title="Research Foundation & What's Next"
                subtitle="Everything we build is grounded in published research — and here's where we're headed"
                variant="gradient"
                firstSection
            >
                <div className="max-w-5xl mx-auto">
                    <ScrollReveal effect="rise" duration={1000}>
                        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 dark:from-primary-700 dark:via-primary-800 dark:to-primary-900 p-8 sm:p-12 text-white shadow-2xl shadow-primary-600/20">
                            <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/[0.06] rounded-full blur-2xl" />
                            <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-white/[0.04] rounded-full blur-2xl" />
                            <div className="relative z-10">
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-xs font-semibold tracking-wide mb-6">
                                    <FlaskConical className="w-3 h-3" />
                                    Research-Informed, Not Research-Claiming
                                </div>
                                <p className="text-lg sm:text-xl leading-relaxed text-white/90 mb-4">
                                    EnteraFlux is a wellness app — not a clinical tool. We don't diagnose, treat, or predict medical outcomes. But every feature we build is grounded in published clinical data and validated physiological principles.
                                </p>
                                <p className="text-sm text-white/60 leading-relaxed max-w-3xl">
                                    This page explains the research behind our approach, our validation methodology, and our plans for Phase 2 — where we'll bring enterprise-grade tools to pharma companies, employers, and researchers working in the Indian GLP-1 space.
                                </p>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </Section>

            {/* ── Research Pillars: 2x2 grid ── */}
            <Section
                label="Research Basis"
                title="What Our Science Rests On"
                subtitle="Four areas of published research inform every feature in EnteraFlux"
                variant="dark"
            >
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {researchPillars.map((pillar, i) => (
                            <ScrollReveal key={i} delay={i * 100} effect="flip-up">
                                <div className="group p-6 rounded-2xl border border-neutral-200/50 dark:border-white/[0.06] bg-white/60 dark:bg-white/[0.02] backdrop-blur-sm hover:border-primary-200 dark:hover:border-primary-500/20 transition-all duration-300 h-full relative overflow-hidden">
                                    {/* Top accent bar */}
                                    <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${pillar.accent} opacity-70`} />
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className={`w-11 h-11 rounded-xl ${pillar.bgLight} ${pillar.bgDark} flex items-center justify-center flex-shrink-0`}>
                                            <pillar.icon className={`w-5 h-5 ${pillar.textLight} ${pillar.textDark}`} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-sm font-bold text-neutral-900 dark:text-white mb-1 leading-snug">{pillar.title}</h3>
                                            <div className="flex items-center gap-1.5 text-[10px] text-neutral-400 dark:text-neutral-500">
                                                <FileText className="w-3 h-3" />
                                                <span>{pillar.papers}+ peer-reviewed references</span>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">{pillar.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </Section>

            {/* ── Key Studies: Numbered list ── */}
            <Section
                label="Evidence"
                title="Key Studies We Reference"
                subtitle="The clinical trials and research papers that inform our approach"
                variant="default"
            >
                <div className="max-w-4xl mx-auto space-y-4">
                    {keyStudies.map((study, i) => (
                        <ScrollReveal key={i} delay={i * 80} effect="rise">
                            <div className="group flex items-start gap-5 p-5 rounded-2xl border border-neutral-200/50 dark:border-white/[0.06] bg-white/60 dark:bg-white/[0.02] backdrop-blur-sm hover:border-primary-300 dark:hover:border-primary-500/20 transition-all duration-300 relative overflow-hidden">
                                {/* Left accent */}
                                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-primary-400 to-primary-600 opacity-50 group-hover:opacity-100 transition-opacity" />
                                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-500/10 flex items-center justify-center text-sm font-bold text-primary-600 dark:text-primary-400">
                                    {String(i + 1).padStart(2, '0')}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-3 mb-1.5">
                                        <h3 className="text-sm font-bold text-neutral-900 dark:text-white leading-snug">{study.title}</h3>
                                    </div>
                                    <p className="text-[11px] text-primary-500 dark:text-primary-400 font-medium mb-2">{study.journal}</p>
                                    <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">{study.finding}</p>
                                </div>
                                <ChevronRight className="w-4 h-4 text-neutral-300 dark:text-neutral-600 flex-shrink-0 mt-3 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors" />
                            </div>
                        </ScrollReveal>
                    ))}

                    <ScrollReveal delay={500} effect="blur-in">
                        <p className="text-center text-xs text-neutral-400 dark:text-neutral-500 mt-6">
                            We reference peer-reviewed publications only. We do not make clinical claims based on our own data at this stage.
                        </p>
                    </ScrollReveal>
                </div>
            </Section>

            {/* ── Validation Approach: Connected steps ── */}
            <Section
                label="Our Method"
                title="How We Validate What We Build"
                subtitle="A structured approach to ensuring our wellness guidance is meaningful and grounded"
                variant="gradient"
            >
                <div className="max-w-5xl mx-auto">
                    <div className="relative">
                        {/* Connection line — desktop */}
                        <div className="hidden lg:block absolute top-[52px] left-[calc(12.5%+20px)] right-[calc(12.5%+20px)] h-px bg-gradient-to-r from-primary-200 via-success-300 to-warning-200 dark:from-primary-800 dark:via-success-600 dark:to-warning-800" />

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {validationApproach.map((item, i) => (
                                <ScrollReveal key={i} delay={i * 120} effect="elastic-scale">
                                    <div className="relative text-center group">
                                        <div className="relative z-10 w-[104px] h-[104px] mx-auto mb-6 rounded-2xl bg-gradient-to-br from-white to-primary-50/40 dark:from-white/[0.04] dark:to-primary-500/[0.06] border border-primary-200/50 dark:border-primary-500/20 flex flex-col items-center justify-center shadow-sm shadow-primary-500/[0.05] group-hover:border-primary-400 dark:group-hover:border-primary-500/40 group-hover:shadow-lg group-hover:shadow-primary-500/[0.1] transition-all duration-300">
                                            <span className="text-[10px] font-bold text-primary-500 dark:text-primary-400 uppercase tracking-widest mb-1.5">{item.step}</span>
                                            <item.icon className="w-7 h-7 text-neutral-600 dark:text-neutral-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
                                        </div>
                                        <h3 className="text-sm font-bold text-neutral-900 dark:text-white mb-2">{item.title}</h3>
                                        <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-[220px] mx-auto">{item.desc}</p>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </div>
            </Section>

            {/* ── Signal Detection Viz ── */}
            <Section
                label="Phase 2 Preview"
                title="Real-World Signal Detection"
                subtitle="In Phase 2, we'll aggregate anonymised wellness data to help pharma and researchers understand GLP-1 patterns in India"
                variant="dark"
            >
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
                        <div className="lg:col-span-3">
                            <ScrollReveal delay={100} effect="zoom-in" duration={1000}>
                                <div className="rounded-2xl overflow-hidden border border-neutral-200/40 dark:border-white/[0.06]">
                                    <PharmacovigilanceChart />
                                </div>
                            </ScrollReveal>
                        </div>

                        <div className="lg:col-span-2 space-y-5">
                            <ScrollReveal delay={150} effect="slide-rotate">
                                <div className="p-5 rounded-2xl border border-warning-200/40 dark:border-warning-500/15 bg-white/60 dark:bg-white/[0.02] backdrop-blur-sm relative overflow-hidden">
                                    {/* Top accent */}
                                    <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-warning-400 to-warning-600 opacity-70" />
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-9 h-9 rounded-lg bg-warning-50 dark:bg-warning-500/10 flex items-center justify-center">
                                            <BarChart3 className="w-5 h-5 text-warning-600 dark:text-warning-400" />
                                        </div>
                                        <h3 className="text-sm font-bold text-neutral-900 dark:text-white">Population-Level Insights</h3>
                                    </div>
                                    <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                                        Aggregated, anonymised data from thousands of Indian GLP-1 users — revealing side-effect patterns, adherence trends, and lifestyle factors unique to the Indian population.
                                    </p>
                                </div>
                            </ScrollReveal>

                            <ScrollReveal delay={250} effect="tilt-in">
                                <div className="p-5 rounded-2xl border border-primary-200/40 dark:border-primary-500/15 bg-white/60 dark:bg-white/[0.02] backdrop-blur-sm relative overflow-hidden">
                                    {/* Top accent */}
                                    <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary-400 to-primary-600 opacity-70" />
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-9 h-9 rounded-lg bg-primary-50 dark:bg-primary-500/10 flex items-center justify-center">
                                            <Globe className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                                        </div>
                                        <h3 className="text-sm font-bold text-neutral-900 dark:text-white">India-First Data</h3>
                                    </div>
                                    <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                                        Most GLP-1 research comes from Western populations. EnteraFlux will generate India-specific wellness data — covering Indian diets, lifestyles, and the "thin-fat" phenotype.
                                    </p>
                                </div>
                            </ScrollReveal>

                            <ScrollReveal delay={350} effect="flip-up">
                                <div className="p-5 rounded-2xl border border-success-200/40 dark:border-success-500/15 bg-white/60 dark:bg-white/[0.02] backdrop-blur-sm relative overflow-hidden">
                                    {/* Top accent */}
                                    <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-success-400 to-success-600 opacity-70" />
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-9 h-9 rounded-lg bg-success-50 dark:bg-success-500/10 flex items-center justify-center">
                                            <ShieldCheck className="w-5 h-5 text-success-600 dark:text-success-400" />
                                        </div>
                                        <h3 className="text-sm font-bold text-neutral-900 dark:text-white">Privacy by Design</h3>
                                    </div>
                                    <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                                        All research data is fully anonymised and aggregated. Individual user data is never shared with third parties — ever. Users opt-in explicitly for any data contribution.
                                    </p>
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>
                </div>
            </Section>

            {/* ── Future Plans: Phase 2 Modules ── */}
            <Section
                label="What's Next"
                title="Phase 2: Enterprise & Research"
                subtitle="After our consumer launch, we're building tools for pharma, employers, and drug safety"
                variant="default"
            >
                <div className="max-w-5xl mx-auto space-y-6">
                    {futurePlans.map((plan, i) => (
                        <ScrollReveal key={i} delay={i * 120} effect="rise" duration={900}>
                            <div className="group p-6 sm:p-8 rounded-2xl border border-neutral-200/50 dark:border-white/[0.06] bg-white/60 dark:bg-white/[0.02] backdrop-blur-sm hover:border-primary-200 dark:hover:border-primary-500/20 transition-all duration-300 relative overflow-hidden">
                                {/* Top accent bar */}
                                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary-400 to-blue-500 opacity-70" />
                                <div className="flex flex-col sm:flex-row sm:items-start gap-5">
                                    <div className="flex items-center gap-4 sm:flex-col sm:items-start sm:w-32 flex-shrink-0">
                                        <div className="w-11 h-11 rounded-xl bg-primary-50 dark:bg-primary-500/10 flex items-center justify-center">
                                            <plan.icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                                        </div>
                                        <div>
                                            <Badge text={`${plan.phase} — ${plan.date}`} variant="status" />
                                        </div>
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-2">{plan.title}</h3>
                                        <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed mb-5">{plan.desc}</p>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                            {plan.features.map((feature, j) => (
                                                <div key={j} className="flex items-start gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                                                    <CheckCircle2 className="w-3.5 h-3.5 text-success-500 dark:text-success-400 flex-shrink-0 mt-0.5" />
                                                    <span>{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}

                    <ScrollReveal delay={400} effect="blur-in">
                        <p className="text-center text-xs text-neutral-400 dark:text-neutral-500">
                            Phase 2 features are planned for 2027 and beyond. They are not part of the current consumer app.
                        </p>
                    </ScrollReveal>
                </div>
            </Section>

            {/* ── Transparency ── */}
            <Section
                label="Transparency"
                title="What We Are — and What We're Not"
                subtitle="We believe in being upfront about our positioning"
                variant="gradient"
            >
                <div className="max-w-3xl mx-auto">
                    <ScrollReveal effect="rise" duration={900}>
                        <div className="p-8 rounded-2xl border border-neutral-200/50 dark:border-white/[0.06] bg-white/60 dark:bg-white/[0.02] backdrop-blur-sm">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                                {[
                                    { label: 'We ARE', items: ['A wellness & lifestyle companion', 'Research-informed (published studies)', 'Built for Indian GLP-1 users', 'Privacy-first and transparent'], color: 'success' },
                                    { label: 'We are NOT', items: ['A medical device or diagnostic tool', 'Making clinical claims', 'Replacing your doctor', 'Selling or sharing individual data'], color: 'error' },
                                ].map((col, i) => (
                                    <div key={i} className="space-y-3">
                                        <h4 className={`text-sm font-bold ${i === 0 ? 'text-success-600 dark:text-success-400' : 'text-error-600 dark:text-error-400'}`}>{col.label}</h4>
                                        <ul className="space-y-2">
                                            {col.items.map((item, j) => (
                                                <li key={j} className="flex items-start gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                                                    <CheckCircle2 className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${i === 0 ? 'text-success-500 dark:text-success-400' : 'text-error-500 dark:text-error-400'}`} />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-wrap gap-2 justify-center mb-6">
                                <Badge text="Wellness App — Not a Medical Device" variant="regulatory" />
                                <Badge text="Research-Informed Approach" variant="status" />
                                <Badge text="Currently In Development" variant="development" />
                            </div>

                            <p className="text-center text-neutral-500 dark:text-neutral-400 text-xs leading-relaxed">
                                EnteraFlux provides wellness tips informed by published research — not medical advice. Always consult your doctor for health decisions related to GLP-1 medications.
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </Section>

            {/* ── CTA ── */}
            <Section
                label="Get Involved"
                title="Interested in Our Research?"
                subtitle="Whether you're a researcher, pharma professional, or just curious — we'd love to hear from you"
                variant="dark"
                noPadding
            >
                <div className="max-w-3xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <ScrollReveal delay={100} effect="blur-in">
                            <div className="group p-6 rounded-2xl border border-primary-200/40 dark:border-primary-500/15 bg-white/60 dark:bg-white/[0.02] backdrop-blur-sm hover:border-primary-300 dark:hover:border-primary-500/25 transition-all duration-300 h-full flex flex-col relative overflow-hidden">
                                {/* Top accent */}
                                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary-400 to-primary-600 opacity-70" />
                                <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-500/10 flex items-center justify-center mb-4">
                                    <FlaskConical className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                                </div>
                                <span className="text-[11px] font-bold text-primary-500 dark:text-primary-400 uppercase tracking-widest mb-2">Researchers & Pharma</span>
                                <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-2">Phase 2 Partnerships</h3>
                                <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6 flex-1 leading-relaxed">
                                    Interested in real-world GLP-1 wellness data from Indian users? We're building enterprise tools for pharma, research institutions, and clinical networks.
                                </p>
                                <CTA text="Get In Touch" href="/contact?type=researcher" variant="primary" icon={<ArrowRight className="w-4 h-4" />} />
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={200} effect="blur-in">
                            <div className="group p-6 rounded-2xl border border-success-200/40 dark:border-success-500/15 bg-white/60 dark:bg-white/[0.02] backdrop-blur-sm hover:border-success-300 dark:hover:border-success-500/25 transition-all duration-300 h-full flex flex-col relative overflow-hidden">
                                {/* Top accent */}
                                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-success-400 to-success-600 opacity-70" />
                                <div className="w-10 h-10 rounded-xl bg-success-50 dark:bg-success-500/10 flex items-center justify-center mb-4">
                                    <Lightbulb className="w-5 h-5 text-success-600 dark:text-success-400" />
                                </div>
                                <span className="text-[11px] font-bold text-success-500 dark:text-success-400 uppercase tracking-widest mb-2">Investors & Partners</span>
                                <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-2">Back Our Mission</h3>
                                <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6 flex-1 leading-relaxed">
                                    India's GLP-1 market is about to grow rapidly. Help us build the country's first dedicated wellness companion for this space.
                                </p>
                                <CTA text="Contact Us" href="/contact?type=investor" variant="primary" icon={<ArrowRight className="w-4 h-4" />} />
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </Section>
        </div>
    );
}
