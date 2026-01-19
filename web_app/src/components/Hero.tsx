import type { HeroProps } from '../types';
import CTA from './CTA';
import Badge from './Badge';
import AnimatedBackground from './AnimatedBackground';
import ScrollReveal from './ScrollReveal';
import { ArrowRight, Shield, CheckCircle, TrendingUp, Sparkles } from 'lucide-react';

export default function Hero({ title, subtitle, primaryCTA, secondaryCTA, badge }: HeroProps) {
    return (
        <section className="relative bg-gradient-to-br from-primary-50 via-white to-success-50/30 dark:bg-gradient-to-br dark:from-[#020617] dark:via-[#0f172a] dark:to-[#1e293b] overflow-hidden pb-20 lg:pb-32 transition-colors duration-300">
            {/* Enhanced animated gradient mesh background with parallax */}
            <div className="absolute inset-0 opacity-70 dark:opacity-80 parallax-layer">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-100/60 via-transparent to-success-100/60 dark:from-primary-500/30 dark:via-primary-600/10 dark:to-success-500/20 animated-gradient" />
            </div>

            {/* Large animated gradient orbs - enhanced with floating animation */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-48 -right-48 w-[700px] h-[700px] bg-gradient-to-br from-primary-400/50 to-primary-600/50 dark:from-primary-500/50 dark:to-primary-600/60 rounded-full blur-3xl float-element-slow"
                    style={{ animationDelay: '0s' }} />
                <div className="absolute -bottom-48 -left-48 w-[700px] h-[700px] bg-gradient-to-br from-success-400/40 to-success-600/40 dark:from-success-500/40 dark:to-success-600/50 rounded-full blur-3xl float-element-slow"
                    style={{ animationDelay: '2s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-primary-300/30 to-success-300/30 dark:from-primary-400/35 dark:to-success-500/40 rounded-full blur-3xl float-element"
                    style={{ animationDelay: '4s' }} />
            </div>

            {/* Floating geometric shapes for depth */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-32 h-32 border-2 border-primary-300/20 dark:border-primary-400/20 rounded-2xl rotate-12 float-element" style={{ animationDelay: '1s' }} />
                <div className="absolute top-40 right-20 w-24 h-24 border-2 border-success-300/20 dark:border-success-400/20 rounded-full float-element-fast" style={{ animationDelay: '0.5s' }} />
                <div className="absolute bottom-32 left-1/4 w-20 h-20 border-2 border-primary-300/20 dark:border-primary-400/20 rounded-lg -rotate-6 float-element-slow" style={{ animationDelay: '2.5s' }} />
                <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-gradient-to-br from-primary-400/10 to-success-400/10 rounded-full blur-xl float-element" style={{ animationDelay: '1.5s' }} />
            </div>

            {/* Floating particle background */}
            <AnimatedBackground particleCount={30} />

            {/* Content */}
            <div className="relative z-10 section-container text-center">
                {badge && (
                    <div className="mb-8 animate-fade-in-down">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-primary-200/60 dark:border-primary-700/50 shadow-lg glow-on-hover">
                            <Sparkles className="w-4 h-4 text-primary-600 dark:text-primary-400 animate-pulse" />
                            <Badge text={badge} variant="development" />
                        </div>
                    </div>
                )}

                <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 dark:from-white dark:via-neutral-100 dark:to-white bg-clip-text text-transparent mb-8 max-w-5xl mx-auto leading-tight slide-in-blur">
                    {title}
                </h1>

                <p className="text-xl sm:text-2xl lg:text-3xl text-neutral-700 dark:text-neutral-200 mb-6 max-w-4xl mx-auto font-semibold animate-fade-in-up animate-delay-200 leading-snug">
                    {subtitle}
                </p>

                {/* Professional value proposition with enhanced styling */}
                <ScrollReveal delay={300} direction="up">
                    <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 mb-12 max-w-3xl mx-auto leading-relaxed">
                        Clinical decision support platform leveraging continuous physiological monitoring and AI-powered predictive analytics to prevent adverse events in GLP-1 receptor agonist therapy.
                    </p>
                </ScrollReveal>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in-up animate-delay-400">
                    <div className="magnetic-button">
                        <CTA {...primaryCTA} icon={<ArrowRight className="w-5 h-5" />} />
                    </div>
                    {secondaryCTA && (
                        <div className="hover-scale">
                            <CTA {...secondaryCTA} />
                        </div>
                    )}
                </div>

                {/* Trust indicators with premium styling and staggered animations */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    <div className="group premium-card spotlight-cursor flex items-center justify-center gap-3 px-8 py-5 rounded-2xl bg-white/80 dark:bg-neutral-800/80 backdrop-blur-xl border border-neutral-200/70 dark:border-neutral-700/70 shadow-lg stagger-1 animate-fade-in-up animate-delay-500">
                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-success-100 to-success-200 dark:from-success-900/50 dark:to-success-800/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 glow-on-hover">
                            <Shield className="w-6 h-6 text-success-600 dark:text-success-400 group-hover:rotate-12 transition-transform duration-300" />
                        </div>
                        <span className="text-sm font-bold text-neutral-800 dark:text-neutral-200">Research-Backed</span>
                    </div>
                    <div className="group premium-card spotlight-cursor flex items-center justify-center gap-3 px-8 py-5 rounded-2xl bg-white/80 dark:bg-neutral-800/80 backdrop-blur-xl border border-neutral-200/70 dark:border-neutral-700/70 shadow-lg stagger-2 animate-fade-in-up animate-delay-500">
                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/50 dark:to-primary-800/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 glow-on-hover">
                            <CheckCircle className="w-6 h-6 text-primary-600 dark:text-primary-400 group-hover:rotate-12 transition-transform duration-300" />
                        </div>
                        <span className="text-sm font-bold text-neutral-800 dark:text-neutral-200">HIPAA-Compliant Architecture</span>
                    </div>
                    <div className="group premium-card spotlight-cursor flex items-center justify-center gap-3 px-8 py-5 rounded-2xl bg-white/80 dark:bg-neutral-800/80 backdrop-blur-xl border border-neutral-200/70 dark:border-neutral-700/70 shadow-lg stagger-3 animate-fade-in-up animate-delay-500">
                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-success-100 to-success-200 dark:from-success-900/50 dark:to-success-800/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 glow-on-hover">
                            <TrendingUp className="w-6 h-6 text-success-600 dark:text-success-400 group-hover:rotate-12 transition-transform duration-300" />
                        </div>
                        <span className="text-sm font-bold text-neutral-800 dark:text-neutral-200">Evidence-Based Methodology</span>
                    </div>
                </div>
            </div>

            {/* Bottom gradient fade - enhanced */}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white dark:from-[#0f172a] via-white/50 dark:via-[#0f172a]/50 to-transparent pointer-events-none" />

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 rounded-full border-2 border-neutral-400/50 dark:border-neutral-500/50 flex items-start justify-center p-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-500 animate-pulse" />
                </div>
            </div>
        </section>
    );
}
