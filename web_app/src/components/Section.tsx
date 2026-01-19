import type { SectionProps } from '../types';
import ScrollReveal from './ScrollReveal';

export default function Section({
    title,
    subtitle,
    children,
    variant = 'default',
    className = '',
    id,
    firstSection = false,
}: SectionProps) {
    const variants = {
        default: 'bg-white dark:bg-gradient-to-b dark:from-[#0f172a] dark:to-[#1e293b] relative',
        dark: 'bg-neutral-50 dark:bg-gradient-to-b dark:from-[#020617] dark:via-[#0f172a] dark:to-[#1e293b] relative',
        gradient: 'bg-gradient-to-b from-white to-neutral-50 dark:from-[#020617] dark:via-[#0f172a]/90 dark:to-[#1e293b] relative',
    };

    return (
        <section id={id} className={`${variants[variant]} ${firstSection ? 'pt-20 sm:pt-24 lg:pt-28' : ''} ${className} transition-colors duration-300 overflow-hidden`}>
            {/* Decorative background elements */}
            {variant === 'gradient' && (
                <div className="absolute inset-0 opacity-30 dark:opacity-20 pointer-events-none">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary-200/40 to-transparent dark:from-primary-500/20 rounded-full blur-3xl float-element-slow" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-success-200/40 to-transparent dark:from-success-500/20 rounded-full blur-3xl float-element" />
                </div>
            )}

            <div className="section-container relative z-10">
                {(title || subtitle) && (
                    <ScrollReveal delay={0} direction="up">
                        <div className="text-center mb-16 lg:mb-20 relative">
                            {/* Decorative line above title */}
                            {title && (
                                <div className="flex items-center justify-center mb-6">
                                    <div className="h-px w-12 bg-gradient-to-r from-transparent via-primary-500 dark:via-primary-400 to-transparent" />
                                    <div className="mx-3 w-2 h-2 rounded-full bg-primary-500 dark:bg-primary-400 animate-pulse" />
                                    <div className="h-px w-12 bg-gradient-to-r from-transparent via-primary-500 dark:via-primary-400 to-transparent" />
                                </div>
                            )}

                            {title && (
                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white mb-4 bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 dark:from-white dark:via-neutral-100 dark:to-white bg-clip-text">
                                    {title}
                                </h2>
                            )}
                            {subtitle && (
                                <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
                                    {subtitle}
                                </p>
                            )}
                        </div>
                    </ScrollReveal>
                )}
                {children}
            </div>
        </section>
    );
}
