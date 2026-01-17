import { useEffect, useRef, useState, type ReactNode } from 'react';

interface ScrollTextProps {
    children: ReactNode;
    delay?: number;
    className?: string;
}

export default function ScrollText({ children, delay = 0, className = '' }: ScrollTextProps) {
    const elementRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        // Small delay to ensure element is rendered
        const initTimeout = setTimeout(() => {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            setTimeout(() => {
                                setIsVisible(true);
                            }, delay);
                            observer.unobserve(entry.target);
                        }
                    });
                },
                {
                    threshold: 0.01,
                    rootMargin: '0px',
                }
            );

            observer.observe(element);

            return () => {
                observer.disconnect();
            };
        }, 50);

        return () => {
            clearTimeout(initTimeout);
        };
    }, [delay]);

    return (
        <div
            ref={elementRef}
            className={`transition-all duration-[1200ms] ease-out ${className}`}
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0px)' : 'translateY(50px)',
            }}
        >
            {children}
        </div>
    );
}
