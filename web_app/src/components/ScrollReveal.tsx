import { useEffect, useRef, useState, type ReactNode } from 'react';

interface ScrollRevealProps {
    children: ReactNode;
    delay?: number;
    className?: string;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    duration?: number;
    threshold?: number;
}

export default function ScrollReveal({
    children,
    delay = 0,
    className = '',
    direction = 'up',
    duration = 800,
    threshold = 0.1
}: ScrollRevealProps) {
    const elementRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: threshold,
                rootMargin: '0px 0px -50px 0px',
            }
        );

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, [threshold]);

    const getTransform = () => {
        if (!isVisible) {
            switch (direction) {
                case 'up': return 'translateY(30px)';
                case 'down': return 'translateY(-30px)';
                case 'left': return 'translateX(30px)';
                case 'right': return 'translateX(-30px)';
                case 'none': return 'translate(0)';
                default: return 'translateY(30px)';
            }
        }
        return 'translate(0)';
    };

    return (
        <div
            ref={elementRef}
            className={`${className}`}
            style={{
                opacity: isVisible ? 1 : 0,
                transform: getTransform(),
                transition: `opacity ${duration}ms ease-out, transform ${duration}ms cubic-bezier(0.2, 0.8, 0.2, 1)`,
                transitionDelay: `${delay}ms`,
            }}
        >
            {children}
        </div>
    );
}
