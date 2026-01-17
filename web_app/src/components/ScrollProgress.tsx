import { useState, useEffect } from 'react';

export default function ScrollProgress() {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const updateScrollProgress = () => {
            const scrollPx = document.documentElement.scrollTop;
            const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (scrollPx / winHeightPx) * 100;
            setScrollProgress(scrolled);
        };

        window.addEventListener('scroll', updateScrollProgress);
        return () => window.removeEventListener('scroll', updateScrollProgress);
    }, []);

    return (
        <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-neutral-200/30 dark:bg-neutral-800/30 pointer-events-none">
            <div
                className="progress-bar h-full rounded-r-full transition-all duration-150"
                style={{ width: `${scrollProgress}%` }}
            />
        </div>
    );
}
