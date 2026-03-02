import { Link } from 'react-router-dom';
import { Mail, ArrowRight } from 'lucide-react';

export default function Footer() {
    const footerLinks = {
        product: [
            { name: 'How It Works', href: '/how-it-works' },
            { name: 'Features', href: '/features' },
            { name: 'Roadmap', href: '/roadmap' },
        ],
        company: [
            { name: 'Future Plans', href: '/future-plans' },
            { name: 'Contact Us', href: '/contact' },
            { name: 'Research Survey', href: '/public/survey' },
            { name: 'Admin Dashboard', href: '/admin' },
        ],
        legal: [
            { name: 'Legal Disclaimers', href: '/legal' },
        ],
    };

    return (
        <footer className="bg-neutral-950 dark:bg-[#050810] border-t border-neutral-800/50 dark:border-white/[0.04]">
            {/* Top CTA band */}
            <div className="border-b border-neutral-800/40 dark:border-white/[0.03]">
                <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 py-14">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div>
                            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-tight">
                                Help shape the future of GLP-1 wellness in India
                            </h3>
                            <p className="text-neutral-400 text-sm max-w-lg">
                                Share your feedback as a patient or developer, or join our R&D team. Help us build India's first wellness companion for GLP-1 medication users.
                            </p>
                        </div>
                        <Link
                            to="/contact"
                            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-primary-600/25 hover:shadow-xl hover:shadow-primary-600/30 flex-shrink-0"
                        >
                            Give Feedback
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main footer content */}
            <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 py-14">
                <div className="grid grid-cols-2 md:grid-cols-12 gap-10 mb-12">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-5">
                        <div className="flex items-center gap-2.5 mb-5">
                            <div className="w-9 h-9 rounded-xl bg-primary-600 flex items-center justify-center">
                                <span className="text-white text-sm font-bold">EF</span>
                            </div>
                            <span className="text-lg font-bold text-white tracking-tight">
                                Entera<span className="text-primary-400">Flux</span>
                            </span>
                        </div>
                        <p className="text-neutral-400 text-sm leading-relaxed mb-4 max-w-sm">
                            A wellness companion for people in India on GLP-1 weight-loss medications. Indian-diet-friendly protein tips, body signal awareness, and muscle-safe coaching.
                        </p>
                        <div className="flex items-center gap-2 text-neutral-600 text-xs">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                            <span>Currently In Development</span>
                            <span className="text-neutral-700">·</span>
                            <span>Wellness App | Not a Medical Device</span>
                        </div>
                    </div>

                    {/* Product links */}
                    <div className="md:col-span-2 md:col-start-7">
                        <h4 className="text-xs font-semibold text-neutral-300 mb-4 uppercase tracking-wider">Product</h4>
                        <ul className="space-y-3">
                            {footerLinks.product.map((link) => (
                                <li key={link.name}>
                                    <Link to={link.href} className="text-neutral-500 hover:text-neutral-200 text-sm transition-colors duration-200">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company links */}
                    <div className="md:col-span-2">
                        <h4 className="text-xs font-semibold text-neutral-300 mb-4 uppercase tracking-wider">Company</h4>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <Link to={link.href} className="text-neutral-500 hover:text-neutral-200 text-sm transition-colors duration-200">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal + Contact */}
                    <div className="md:col-span-3">
                        <h4 className="text-xs font-semibold text-neutral-300 mb-4 uppercase tracking-wider">Legal</h4>
                        <ul className="space-y-3 mb-6">
                            {footerLinks.legal.map((link) => (
                                <li key={link.name}>
                                    <Link to={link.href} className="text-neutral-500 hover:text-neutral-200 text-sm transition-colors duration-200">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <div className="flex items-center gap-2">
                            <Mail className="w-3.5 h-3.5 text-neutral-600" />
                            <a href="mailto:contact.enteraflux@gmail.com" className="text-neutral-500 hover:text-primary-400 text-xs transition-colors">
                                contact.enteraflux@gmail.com
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-neutral-800/50 dark:border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-neutral-600 text-xs">
                        © {new Date().getFullYear()} EnteraFlux. All rights reserved.
                    </p>
                    <p className="text-neutral-700 text-xs">
                        Built with ❤️ for India
                    </p>
                </div>
            </div>
        </footer>
    );
}
