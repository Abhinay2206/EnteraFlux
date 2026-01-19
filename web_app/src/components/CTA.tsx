import { Link } from 'react-router-dom';
import type { CTAProps } from '../types';

export default function CTA({ text, onClick, href, variant = 'primary', icon }: CTAProps) {
    const baseClasses = 'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group';

    const variants = {
        primary: 'btn-primary ripple-effect shadow-lg hover:shadow-xl dark:shadow-xl-dark dark:hover:shadow-2xl',
        secondary: 'btn-secondary hover-scale',
        text: 'text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 hover:underline underline-offset-4 px-0',
    };

    const content = (
        <>
            {/* Ripple effect background */}
            {variant === 'primary' && (
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
            )}

            <span className="relative z-10 flex items-center gap-2">
                {text}
                {icon && (
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                        {icon}
                    </span>
                )}
            </span>
        </>
    );

    if (href) {
        if (href.startsWith('http')) {
            return (
                <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${baseClasses} ${variants[variant]}`}
                    aria-label={text}
                >
                    {content}
                </a>
            );
        }
        return (
            <Link to={href} className={`${baseClasses} ${variants[variant]}`} aria-label={text}>
                {content}
            </Link>
        );
    }

    return (
        <button
            onClick={onClick}
            className={`${baseClasses} ${variants[variant]}`}
            aria-label={text}
            type="button"
        >
            {content}
        </button>
    );
}
