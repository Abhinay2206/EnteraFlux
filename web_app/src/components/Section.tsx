import type { SectionProps } from '../types';
import ScrollReveal from './ScrollReveal';

interface ExtendedSectionProps extends SectionProps {
    label?: string;
    noPadding?: boolean;
}

export default function Section({
    title,
    subtitle,
    children,
    variant = 'default',
    className = '',
    id,
    firstSection = false,
    label,
    noPadding = false,
}: ExtendedSectionProps) {
    const variants = {
        default: 'bg-white/80 dark:bg-[#0a0f1e]/80',
        dark: 'bg-neutral-50/90 dark:bg-[#060b18]/90',
        gradient: 'bg-gradient-to-b from-white/80 via-primary-50/20 to-white/80 dark:from-[#0a0f1e]/80 dark:via-[#0d1429]/80 dark:to-[#0a0f1e]/80',
    };

    return (
        <section id={id} className={`${variants[variant]} ${firstSection ? 'pt-24 sm:pt-28' : ''} ${className} relative transition-colors duration-300 overflow-clip backdrop-blur-[0.5px]`}>
            {/* Top divider line */}
            <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12">
                <div className="h-px bg-gradient-to-r from-transparent via-neutral-200/70 dark:via-neutral-800/70 to-transparent" />
            </div>

            <div className={noPadding ? 'max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-20' : 'max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 py-20 sm:py-28 lg:py-32'}>
                {(title || subtitle || label) && (
                    <ScrollReveal delay={0} effect="blur-in" duration={900}>
                        <div className="text-center mb-14 lg:mb-20">
                            {label && (
                                <div className="mb-4">
                                    <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-widest text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-500/10 border border-primary-200/50 dark:border-primary-500/20">
                                        {label}
                                    </span>
                                </div>
                            )}
                            {title && (
                                <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-neutral-900 dark:text-white mb-5 tracking-tight leading-[1.15]">
                                    {title}
                                </h2>
                            )}
                            {subtitle && (
                                <p className="text-lg text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
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
