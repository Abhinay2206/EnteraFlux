import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-neutral-900 dark:bg-neutral-950 border-t border-neutral-800 dark:border-neutral-900 relative overflow-hidden transition-colors duration-300">
            {/* Animated gradient accent */}
            <div className="absolute top-0 left-0 right-0 h-1 gradient-primary" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Company Info */}
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-2 mb-4 group">
                            <div className="w-10 h-10 rounded-lg bg-primary-600 flex items-center justify-center group-hover:bg-primary-700 transition-all duration-300 group-hover:scale-110 group-hover:shadow-glow">
                                <span className="text-white font-bold">EF</span>
                            </div>
                            <span className="text-xl font-bold text-white">EnteraFlux</span>
                        </div>
                        <p className="text-neutral-400 dark:text-neutral-500 text-sm mb-4 max-w-md">
                            AI-powered metabolic safety and research intelligence for GLP-1 therapy patients.
                            Making metabolic therapies safer, more tolerable, and more accessible.
                        </p>
                        <p className="text-neutral-500 dark:text-neutral-600 text-xs italic">
                            Platform Under Development • Research-Only Phase • Not a Medical Device
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Platform</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/science" className="text-neutral-400 dark:text-neutral-500 hover:text-white dark:hover:text-neutral-300 text-sm transition-colors relative group">
                                    Science
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300" />
                                </Link>
                            </li>
                            <li>
                                <Link to="/research" className="text-neutral-400 dark:text-neutral-500 hover:text-white dark:hover:text-neutral-300 text-sm transition-colors relative group">
                                    Research
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300" />
                                </Link>
                            </li>
                            <li>
                                <Link to="/modules" className="text-neutral-400 dark:text-neutral-500 hover:text-white dark:hover:text-neutral-300 text-sm transition-colors relative group">
                                    Modules
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300" />
                                </Link>
                            </li>
                            <li>
                                <Link to="/roadmap" className="text-neutral-400 dark:text-neutral-500 hover:text-white dark:hover:text-neutral-300 text-sm transition-colors relative group">
                                    Roadmap
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300" />
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Legal & Compliance</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/legal" className="text-neutral-400 dark:text-neutral-500 hover:text-white dark:hover:text-neutral-300 text-sm transition-colors relative group">
                                    Legal Disclaimers
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300" />
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-neutral-400 dark:text-neutral-500 hover:text-white dark:hover:text-neutral-300 text-sm transition-colors relative group">
                                    Contact Us
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300" />
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-neutral-800 dark:border-neutral-900 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-neutral-500 dark:text-neutral-600 text-sm">
                        © {new Date().getFullYear()} EnteraFlux. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
