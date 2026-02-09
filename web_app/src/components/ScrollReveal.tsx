import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from 'react';

type Effect =
    | 'fade-up'
    | 'fade-down'
    | 'fade-left'
    | 'fade-right'
    | 'zoom-in'
    | 'zoom-out'
    | 'flip-up'
    | 'flip-left'
    | 'blur-in'
    | 'blur-scale'
    | 'slide-rotate'
    | 'clip-up'
    | 'clip-left'
    | 'tilt-in'
    | 'elastic-scale'
    | 'rise'
    | 'none';

interface ScrollRevealProps {
    children: ReactNode;
    delay?: number;
    className?: string;
    /** @deprecated Use `effect` instead — kept for backward compat */
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    effect?: Effect;
    duration?: number;
    threshold?: number;
    /** 0-1 parallax strength — 0 = none, 1 = full (default 0) */
    parallax?: number;
    /** If true, component re-hides when it leaves viewport */
    repeat?: boolean;
}

/*── Effect definitions ─────────────────────────────────*/

interface EffectDef {
    hidden: CSSProperties;
    visible: CSSProperties;
    easing: string;
}

const effects: Record<Effect, EffectDef> = {
    'fade-up': {
        hidden: { opacity: 0, transform: 'translateY(40px)' },
        visible: { opacity: 1, transform: 'translateY(0)' },
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
    },
    'fade-down': {
        hidden: { opacity: 0, transform: 'translateY(-40px)' },
        visible: { opacity: 1, transform: 'translateY(0)' },
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
    },
    'fade-left': {
        hidden: { opacity: 0, transform: 'translateX(50px)' },
        visible: { opacity: 1, transform: 'translateX(0)' },
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
    },
    'fade-right': {
        hidden: { opacity: 0, transform: 'translateX(-50px)' },
        visible: { opacity: 1, transform: 'translateX(0)' },
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
    },
    'zoom-in': {
        hidden: { opacity: 0, transform: 'scale(0.85)' },
        visible: { opacity: 1, transform: 'scale(1)' },
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
    },
    'zoom-out': {
        hidden: { opacity: 0, transform: 'scale(1.15)' },
        visible: { opacity: 1, transform: 'scale(1)' },
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
    },
    'flip-up': {
        hidden: { opacity: 0, transform: 'perspective(800px) rotateX(25deg) translateY(30px)' },
        visible: { opacity: 1, transform: 'perspective(800px) rotateX(0deg) translateY(0)' },
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
    },
    'flip-left': {
        hidden: { opacity: 0, transform: 'perspective(800px) rotateY(-15deg) translateX(40px)' },
        visible: { opacity: 1, transform: 'perspective(800px) rotateY(0deg) translateX(0)' },
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
    },
    'blur-in': {
        hidden: { opacity: 0, filter: 'blur(12px)', transform: 'translateY(20px)' },
        visible: { opacity: 1, filter: 'blur(0px)', transform: 'translateY(0)' },
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
    },
    'blur-scale': {
        hidden: { opacity: 0, filter: 'blur(8px)', transform: 'scale(0.92)' },
        visible: { opacity: 1, filter: 'blur(0px)', transform: 'scale(1)' },
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
    },
    'slide-rotate': {
        hidden: { opacity: 0, transform: 'translateX(60px) rotate(3deg)' },
        visible: { opacity: 1, transform: 'translateX(0) rotate(0deg)' },
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
    },
    'clip-up': {
        hidden: { opacity: 0, transform: 'translateY(50px) scaleY(0.95)' },
        visible: { opacity: 1, transform: 'translateY(0) scaleY(1)' },
        easing: 'cubic-bezier(0.77, 0, 0.175, 1)',
    },
    'clip-left': {
        hidden: { opacity: 0, transform: 'translateX(50px) scaleX(0.95)' },
        visible: { opacity: 1, transform: 'translateX(0) scaleX(1)' },
        easing: 'cubic-bezier(0.77, 0, 0.175, 1)',
    },
    'tilt-in': {
        hidden: { opacity: 0, transform: 'perspective(600px) rotateY(-8deg) rotateX(4deg) translateZ(-30px)' },
        visible: { opacity: 1, transform: 'perspective(600px) rotateY(0) rotateX(0) translateZ(0)' },
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
    },
    'elastic-scale': {
        hidden: { opacity: 0, transform: 'scale(0.7)' },
        visible: { opacity: 1, transform: 'scale(1)' },
        easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    },
    rise: {
        hidden: { opacity: 0, transform: 'translateY(60px) scale(0.96)' },
        visible: { opacity: 1, transform: 'translateY(0) scale(1)' },
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
    },
    none: {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        easing: 'ease-out',
    },
};

/** Map legacy direction prop to new effect */
function directionToEffect(dir: string): Effect {
    const map: Record<string, Effect> = {
        up: 'fade-up',
        down: 'fade-down',
        left: 'fade-left',
        right: 'fade-right',
        none: 'none',
    };
    return map[dir] ?? 'fade-up';
}

export default function ScrollReveal({
    children,
    delay = 0,
    className = '',
    direction,
    effect,
    duration = 800,
    threshold = 0.1,
    parallax = 0,
    repeat = false,
}: ScrollRevealProps) {
    const elementRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [offsetY, setOffsetY] = useState(0);

    // Resolve which effect to use (new prop wins over legacy direction)
    const resolvedEffect = effect ?? (direction ? directionToEffect(direction) : 'fade-up');
    const def = effects[resolvedEffect];

    // Intersection Observer
    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        if (!repeat) observer.unobserve(entry.target);
                    } else if (repeat) {
                        setIsVisible(false);
                    }
                });
            },
            { threshold: 0.01, rootMargin: '50px 0px -20px 0px' },
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, [threshold, repeat]);

    // Parallax scroll listener
    useEffect(() => {
        if (parallax <= 0) return;
        const element = elementRef.current;
        if (!element) return;

        const onScroll = () => {
            const rect = element.getBoundingClientRect();
            const center = rect.top + rect.height / 2;
            const viewCenter = window.innerHeight / 2;
            const diff = (center - viewCenter) * parallax * 0.12;
            setOffsetY(diff);
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, [parallax]);

    // Build transition string — include filter & clip-path if the effect uses them
    const transitionProps = ['opacity', 'transform'];
    if ('filter' in def.hidden) transitionProps.push('filter');
    if ('clipPath' in def.hidden) transitionProps.push('clip-path');
    const transitionStr = transitionProps
        .map((p) => `${p} ${duration}ms ${def.easing}`)
        .join(', ');

    const parallaxTransform = parallax > 0 ? ` translateY(${offsetY}px)` : '';

    const currentStyles: CSSProperties = isVisible
        ? { ...def.visible, transform: (def.visible.transform ?? '') + parallaxTransform }
        : { ...def.hidden, transform: (def.hidden.transform ?? '') + parallaxTransform };

    return (
        <div
            ref={elementRef}
            className={className}
            style={{
                ...currentStyles,
                transition: transitionStr,
                transitionDelay: `${delay}ms`,
                willChange: transitionProps.join(', '),
            }}
        >
            {children}
        </div>
    );
}
