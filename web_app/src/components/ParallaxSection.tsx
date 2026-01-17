import { type ReactNode, useEffect, useRef } from 'react';

interface ParallaxSectionProps {
    children: ReactNode;
    speed?: number;
    className?: string;
}

export default function ParallaxSection({ children, speed = 0.5, className = '' }: ParallaxSectionProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!ref.current) return;

            const scrolled = window.scrollY;
            const rect = ref.current.getBoundingClientRect();
            const elementTop = rect.top + scrolled;
            const elementVisible = scrolled + window.innerHeight;

            if (elementVisible > elementTop && scrolled < elementTop + rect.height) {
                const yPos = (scrolled - elementTop) * speed;
                ref.current.style.transform = `translateY(${yPos}px)`;
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [speed]);

    return (
        <div ref={ref} className={`parallax ${className}`}>
            {children}
        </div>
    );
}
