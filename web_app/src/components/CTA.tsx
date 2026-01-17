import { Link } from 'react-router-dom';
import type { CTAProps } from '../types';

export default function CTA({ text, onClick, href, variant = 'primary', icon }: CTAProps) {
    const variants = {
        primary: 'btn-primary inline-flex items-center justify-center',
        secondary: 'btn-secondary inline-flex items-center justify-center',
        text: 'text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold underline-offset-4 hover:underline transition-colors inline-flex items-center',
    };

    const className = variants[variant];

    const content = (
        <>
            {text}
            {icon && <span className="ml-1.5 inline-flex items-center">{icon}</span>}
        </>
    );

    if (href) {
        if (href.startsWith('http')) {
            return (
                <a 
                    href={href} 
                    className={className} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label={text}
                >
                    {content}
                </a>
            );
        }
        return (
            <Link 
                to={href} 
                className={className}
                aria-label={text}
            >
                {content}
            </Link>
        );
    }

    return (
        <button 
            onClick={onClick} 
            className={className}
            aria-label={text}
            type="button"
        >
            {content}
        </button>
    );
}
