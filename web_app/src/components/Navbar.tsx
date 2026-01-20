import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Science', href: '/science' },
    { name: 'Research', href: '/research' },
    { name: 'Modules', href: '/modules' },
    { name: 'Roadmap', href: '/roadmap' },
    { name: 'Contact', href: '/contact' },
    { name: 'Legal', href: '/legal' },
];

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { isDark, toggleTheme } = useTheme();
    const location = useLocation();

    return (
        <div className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
            <nav className="max-w-7xl mx-auto rounded-2xl relative overflow-hidden bg-white/60 backdrop-blur-[32px] backdrop-saturate-150 border border-white/50 shadow-[0_4px_24px_0_rgba(0,0,0,0.08)] scale-100 dark:bg-gradient-to-br dark:from-neutral-900/60 dark:via-neutral-800/60 dark:to-neutral-900/60 dark:border-white/5 dark:shadow-[0_4px_24px_0_rgba(0,0,0,0.3)]">
                {/* Glossy overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent pointer-events-none rounded-2xl dark:from-white/10" />
                <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-white/80 to-transparent dark:via-white/20" />
                <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-neutral-200/50 to-transparent dark:via-neutral-700/50" />
                <div className="px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-3 group relative">
                            <div className="relative">
                                <div className="absolute inset-0 bg-primary-500 rounded-xl blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                                <div className="relative w-10 h-10 rounded-xl overflow-hidden group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-primary-600/30">
                                    <img
                                        src="/logo.png"
                                        alt="EnteraFlux Logo"
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col justify-center">
                                <span className="text-xl font-bold bg-gradient-to-r from-neutral-900 to-neutral-700 bg-clip-text text-transparent group-hover:from-primary-600 group-hover:to-primary-700 transition-all duration-500 dark:from-white dark:to-neutral-200 dark:group-hover:from-primary-400 dark:group-hover:to-primary-500 tracking-tight leading-none">
                                    EnteraFlux
                                </span>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-2">
                            {navigation.map((item, index) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    style={{ animationDelay: `${index * 50}ms` }}
                                    className={`relative px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 group overflow-hidden animate-fade-in ${location.pathname === item.href
                                        ? 'text-primary-700 dark:text-primary-300 bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-primary-500/20 dark:to-primary-500/5 shadow-sm'
                                        : 'text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-gradient-to-br hover:from-neutral-100 hover:to-neutral-50 dark:hover:from-neutral-800 dark:hover:to-neutral-800/50'
                                        }`}
                                >
                                    <span className="relative z-10 tracking-wide">{item.name}</span>
                                    {location.pathname === item.href && (
                                        <>
                                            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-transparent via-primary-600 to-transparent dark:via-primary-400 rounded-full animate-scale-in" />
                                            <span className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-transparent rounded-xl" />
                                        </>
                                    )}
                                    <span className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                                </Link>
                            ))}
                            <div className="w-px h-6 bg-gradient-to-b from-transparent via-neutral-300 to-transparent dark:via-neutral-600 mx-1" />
                            <button
                                onClick={toggleTheme}
                                className="relative p-2.5 rounded-xl text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-all duration-300 group overflow-hidden hover:bg-gradient-to-br hover:from-neutral-100 hover:to-neutral-50 dark:hover:from-neutral-800 dark:hover:to-neutral-800/50"
                                aria-label="Toggle dark mode"
                            >
                                <div className="relative z-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-180">
                                    {isDark ? (
                                        <Sun className="w-5 h-5 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
                                    ) : (
                                        <Moon className="w-5 h-5 text-indigo-600 drop-shadow-[0_0_8px_rgba(99,102,241,0.3)]" />
                                    )}
                                </div>
                                <span className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                            </button>
                        </div>

                        {/* Mobile menu button + Dark mode toggle */}
                        <div className="md:hidden flex items-center gap-2">
                            <button
                                onClick={toggleTheme}
                                className="relative p-2.5 rounded-xl hover:bg-gradient-to-br hover:from-neutral-100 hover:to-neutral-50 dark:hover:from-neutral-800 dark:hover:to-neutral-800/50 transition-all duration-300 group overflow-hidden active:scale-95"
                                aria-label="Toggle dark mode"
                            >
                                <div className="relative z-10 transition-transform duration-500 group-hover:rotate-180">
                                    {isDark ? (
                                        <Sun className="w-5 h-5 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
                                    ) : (
                                        <Moon className="w-5 h-5 text-indigo-600 drop-shadow-[0_0_8px_rgba(99,102,241,0.3)]" />
                                    )}
                                </div>
                                <span className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                            </button>
                            <button
                                className="relative p-2.5 rounded-xl hover:bg-gradient-to-br hover:from-neutral-100 hover:to-neutral-50 dark:hover:from-neutral-800 dark:hover:to-neutral-800/50 transition-all duration-300 group overflow-hidden active:scale-90"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                aria-label="Toggle menu"
                            >
                                <div className="relative z-10">
                                    {mobileMenuOpen ? (
                                        <X className="w-6 h-6 text-neutral-700 dark:text-neutral-300 transition-transform duration-300 rotate-90" />
                                    ) : (
                                        <Menu className="w-6 h-6 text-neutral-700 dark:text-neutral-300" />
                                    )}
                                </div>
                                <span className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                            </button>
                        </div>
                    </div>

                    {/* Mobile menu */}
                    <div className={`md:hidden transition-all duration-500 ease-out overflow-hidden ${mobileMenuOpen ? 'max-h-96 opacity-100 mb-4' : 'max-h-0 opacity-0'
                        }`}>
                        <div className="pt-4 pb-2 space-y-1.5 border-t border-neutral-200/50 dark:border-neutral-700/50 mt-2">
                            {navigation.map((item, index) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    style={{
                                        animationDelay: `${index * 50}ms`,
                                        transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(-20px)'
                                    }}
                                    className={`relative block px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 group overflow-hidden ${location.pathname === item.href
                                        ? 'bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-primary-900/30 dark:to-primary-900/10 text-primary-700 dark:text-primary-400 shadow-sm'
                                        : 'text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-gradient-to-br hover:from-neutral-100 hover:to-neutral-50 dark:hover:from-neutral-800 dark:hover:to-neutral-800/50 active:scale-[0.98]'
                                        }`}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <span className="relative z-10 tracking-wide">{item.name}</span>
                                    {location.pathname === item.href && (
                                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-3/4 bg-gradient-to-b from-primary-600 to-primary-700 dark:from-primary-400 dark:to-primary-500 rounded-r-full" />
                                    )}
                                    <span className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}
