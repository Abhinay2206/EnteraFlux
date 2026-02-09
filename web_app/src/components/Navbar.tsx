import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Moon, Sun, ChevronRight } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const navigation = [
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Features', href: '/features' },
    { name: 'Research', href: '/research' },
    { name: 'Roadmap', href: '/roadmap' },
];

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { isDark, toggleTheme } = useTheme();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMobileMenuOpen(false);
    }, [location.pathname]);

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-2' : 'py-4'}`}>
            {/* Full-width blur backdrop behind header area */}
            <div className={`absolute inset-0 transition-all duration-500 pointer-events-none ${
                scrolled
                    ? 'bg-white/70 dark:bg-[#0a0f1e]/70 backdrop-blur-xl'
                    : 'bg-gradient-to-b from-white/80 via-white/40 to-transparent dark:from-[#0a0f1e]/80 dark:via-[#0a0f1e]/40 dark:to-transparent backdrop-blur-sm'
            }`} style={{ maskImage: 'linear-gradient(to bottom, black 60%, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent)' }} />

            <nav className={`relative max-w-[1200px] mx-4 lg:mx-auto rounded-2xl transition-all duration-500 ${
                scrolled
                    ? 'bg-white/90 dark:bg-[#0c1225]/90 backdrop-blur-2xl shadow-lg shadow-black/[0.06] dark:shadow-black/30 border border-neutral-200/60 dark:border-white/[0.08] ring-1 ring-black/[0.03] dark:ring-white/[0.03]'
                    : 'bg-transparent'
            }`}>
                <div className="px-5 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
                            <div className="relative w-9 h-9 rounded-xl overflow-hidden transition-transform duration-300 group-hover:scale-110 ring-1 ring-black/[0.06] dark:ring-white/[0.08]">
                                <img src="/logo.png" alt="EnteraFlux" className="w-full h-full object-contain" />
                            </div>
                            <span className="text-[17px] font-bold text-neutral-900 dark:text-white tracking-tight">
                                Entera<span className="text-primary-600 dark:text-primary-400">Flux</span>
                            </span>
                        </Link>

                        {/* Desktop Navigation - Center */}
                        <div className="hidden lg:flex items-center gap-1">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={`relative px-4 py-2 rounded-lg text-[13.5px] font-medium transition-all duration-200 ${
                                        location.pathname === item.href
                                            ? 'text-primary-600 dark:text-primary-400'
                                            : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                                    }`}
                                >
                                    {item.name}
                                    {location.pathname === item.href && (
                                        <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-primary-500 dark:bg-primary-400 rounded-full" />
                                    )}
                                </Link>
                            ))}
                        </div>

                        {/* Desktop Right Actions */}
                        <div className="hidden lg:flex items-center gap-3">
                            <button
                                onClick={toggleTheme}
                                className="p-2.5 rounded-xl text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/80 dark:hover:bg-white/[0.06] transition-all duration-200"
                                aria-label="Toggle dark mode"
                            >
                                {isDark ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
                            </button>
                            <Link
                                to="/contact"
                                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-[13px] font-semibold bg-primary-600 dark:bg-primary-500 text-white hover:bg-primary-700 dark:hover:bg-primary-600 transition-all duration-200 shadow-sm shadow-primary-600/20 hover:shadow-md hover:shadow-primary-600/25"
                            >
                                Get Early Access
                                <ChevronRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>

                        {/* Mobile controls */}
                        <div className="lg:hidden flex items-center gap-1">
                            <button
                                onClick={toggleTheme}
                                className="p-2.5 rounded-xl text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-white/[0.06] transition-colors"
                                aria-label="Toggle dark mode"
                            >
                                {isDark ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
                            </button>
                            <button
                                className="p-2.5 rounded-xl text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-white/[0.06] transition-colors"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                aria-label="Toggle menu"
                            >
                                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile menu */}
                    <div className={`lg:hidden transition-all duration-300 ease-out overflow-hidden ${
                        mobileMenuOpen ? 'max-h-[400px] opacity-100 pb-5' : 'max-h-0 opacity-0'
                    }`}>
                        <div className="pt-3 space-y-1 border-t border-neutral-200/50 dark:border-white/[0.06]">
                            <Link
                                to="/"
                                className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                                    location.pathname === '/'
                                        ? 'bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400'
                                        : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-white/[0.04]'
                                }`}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Home
                            </Link>
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                                        location.pathname === item.href
                                            ? 'bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400'
                                            : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-white/[0.04]'
                                    }`}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <div className="pt-3">
                                <Link
                                    to="/contact"
                                    className="block w-full text-center px-4 py-3 rounded-xl text-sm font-semibold bg-primary-600 dark:bg-primary-500 text-white hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Get Early Access
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}
