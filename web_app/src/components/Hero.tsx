import type { HeroProps } from '../types';
import CTA from './CTA';
import Badge from './Badge';
import AnimatedBackground from './AnimatedBackground';
import ScrollText from './ScrollText';
import { ArrowRight, Shield, CheckCircle, TrendingUp } from 'lucide-react';

export default function Hero({ title, subtitle, primaryCTA, secondaryCTA, badge }: HeroProps) {
    return (
        <section className="relative bg-gradient-to-br from-primary-50 via-white to-success-50/30 dark:bg-gradient-to-br dark:from-[#020617] dark:via-[#0f172a] dark:to-[#1e293b] overflow-hidden pb-16 lg:pb-24 transition-colors duration-300">
            {/* Animated gradient mesh background - enhanced */}
            <div className="absolute inset-0 opacity-70 dark:opacity-80">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-100/60 via-transparent to-success-100/60 dark:from-primary-500/30 dark:via-primary-600/10 dark:to-success-500/20" />
            </div>

            {/* Large animated gradient orbs - more vibrant and dynamic */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-48 -right-48 w-[700px] h-[700px] bg-gradient-to-br from-primary-400/50 to-primary-600/50 dark:from-primary-500/50 dark:to-primary-600/60 rounded-full blur-3xl animate-pulse"
                    style={{ animationDuration: '4s' }} />
                <div className="absolute -bottom-48 -left-48 w-[700px] h-[700px] bg-gradient-to-br from-success-400/40 to-success-600/40 dark:from-success-500/40 dark:to-success-600/50 rounded-full blur-3xl animate-pulse"
                    style={{ animationDuration: '6s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-primary-300/30 to-success-300/30 dark:from-primary-400/35 dark:to-success-500/40 rounded-full blur-3xl animate-pulse"
                    style={{ animationDuration: '8s' }} />
            </div>

            {/* Floating particle background */}
            <AnimatedBackground particleCount={30} />

            {/* Content */}
            <div className="relative z-10 section-container text-center">
                {badge && (
                    <div className="mb-6 animate-fade-in-down">
                        <Badge text={badge} variant="development" />
                    </div>
                )}

                <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 dark:from-white dark:via-neutral-100 dark:to-white bg-clip-text text-transparent mb-6 max-w-5xl mx-auto animate-fade-in-up animate-delay-100 leading-tight">
                    {title}
                </h1>

                <p className="text-xl sm:text-2xl lg:text-3xl text-neutral-700 dark:text-neutral-200 mb-5 max-w-4xl mx-auto font-semibold animate-fade-in-up animate-delay-200 leading-snug">
                    {subtitle}
                </p>

                {/* Professional value proposition with better styling */}
                <ScrollText delay={300}>
                    <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 mb-10 max-w-3xl mx-auto leading-relaxed">
                        Clinical decision support platform leveraging continuous physiological monitoring and AI-powered predictive analytics to prevent adverse events in GLP-1 receptor agonist therapy.
                    </p>
                </ScrollText>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-14 animate-fade-in-up animate-delay-400">
                    <CTA {...primaryCTA} icon={<ArrowRight className="w-5 h-5" />} />
                    {secondaryCTA && <CTA {...secondaryCTA} />}
                </div>

                {/* Trust indicators with enhanced styling and animations */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto animate-fade-in-up animate-delay-500">
                    <div className="group flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-white/70 dark:bg-neutral-800/70 backdrop-blur-md border border-neutral-200/70 dark:border-neutral-700/70 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 hover:bg-white/90 dark:hover:bg-neutral-800/90 magnetic shine-effect">
                        <Shield className="w-6 h-6 text-success-600 dark:text-success-400 flex-shrink-0 group-hover:scale-110 transition-transform duration-300 animate-bounce-subtle" />
                        <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">Research-Backed</span>
                    </div>
                    <div className="group flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-white/70 dark:bg-neutral-800/70 backdrop-blur-md border border-neutral-200/70 dark:border-neutral-700/70 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 hover:bg-white/90 dark:hover:bg-neutral-800/90 magnetic shine-effect">
                        <CheckCircle className="w-6 h-6 text-success-600 dark:text-success-400 flex-shrink-0 group-hover:scale-110 transition-transform duration-300 animate-bounce-subtle" />
                        <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">HIPAA-Compliant Architecture</span>
                    </div>
                    <div className="group flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-white/70 dark:bg-neutral-800/70 backdrop-blur-md border border-neutral-200/70 dark:border-neutral-700/70 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 hover:bg-white/90 dark:hover:bg-neutral-800/90 magnetic shine-effect">
                        <TrendingUp className="w-6 h-6 text-success-600 dark:text-success-400 flex-shrink-0 group-hover:scale-110 transition-transform duration-300 animate-bounce-subtle" />
                        <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">Evidence-Based Methodology</span>
                    </div>
                </div>
            </div>

            {/* Bottom gradient fade - more pronounced */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
        </section>
    );
}
