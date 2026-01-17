import type { BadgeProps } from '../types';

export default function Badge({ text, variant = 'status', withDot = false }: BadgeProps) {
    const variants = {
        development: 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 border-primary-200 dark:border-primary-700',
        regulatory: 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700',
        research: 'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-700',
        status: 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-neutral-700',
    };

    return (
        <span
            className={`inline-flex items-center px-3.5 py-1.5 rounded-lg text-xs font-semibold border ${variants[variant]} transition-all duration-300 hover:scale-105 magnetic ${withDot ? 'badge-dot badge-' + variant : ''}`}
        >
            {text}
        </span>
    );
}
