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
        default: 'bg-white dark:bg-gradient-to-b dark:from-[#0f172a] dark:to-[#1e293b]',
        dark: 'bg-neutral-50 dark:bg-gradient-to-b dark:from-[#020617] dark:via-[#0f172a] dark:to-[#1e293b]',
        gradient: 'bg-gradient-to-b from-white to-neutral-50 dark:from-[#020617] dark:via-[#0f172a]/90 dark:to-[#1e293b]',
    };

    return (
        <section id={id} className={`${variants[variant]} ${firstSection ? 'pt-28 sm:pt-32 lg:pt-36' : ''} ${className} transition-colors duration-300`}>
            <div className="section-container">
                {(title || subtitle) && (
                    <ScrollReveal animation="slide" delay={0}>
                        <div className="text-center mb-16 lg:mb-20">
                            {title && (
                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
                                    {title}
                                </h2>
                            )}
                            {subtitle && (
                                <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
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
