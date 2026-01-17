import { useEffect, useRef, type ReactNode } from 'react';

interface ScrollRevealProps {
    children: ReactNode;
    animation?: 'fade' | 'slide' | 'scale' | 'text';
    delay?: number;
    once?: boolean;
    className?: string;
}

export default function ScrollReveal({
    children,
    animation = 'slide',
    delay = 0,
    once = true,
    className = '',
}: ScrollRevealProps) {
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Add revealed class after delay
                        setTimeout(() => {
                            element.classList.add('revealed');
                        }, delay);

                        // Unobserve if once is true
                        if (once) {
                            observer.unobserve(element);
                        }
                    } else if (!once) {
                        // Remove revealed class if not once
                        element.classList.remove('revealed');
                    }
                });
            },
            {
                threshold: 0.05,
                rootMargin: '0px 0px -50px 0px',
            }
        );

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, [delay, once]);

    const animationClass = animation === 'fade'
        ? 'scroll-reveal'
        : animation === 'scale'
            ? 'scroll-reveal'
            : animation === 'text'
                ? 'scroll-text'
                : 'scroll-reveal';

    return (
        <div ref={elementRef} className={`${animationClass} ${className}`}>
            {children}
        </div>
    );
}
