import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { adminLogout, auth, onAuthStateChanged } from '../firebase';
import {
    Loader2, LogOut, Menu, X, BarChart3, Activity,
    ArrowRight, MessageSquare, ClipboardList, FlaskConical,
    Database, TrendingUp, ShieldCheck, Users,
} from 'lucide-react';

export default function AdminHub() {
    const [authChecking, setAuthChecking] = useState(true);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (!user) navigate('/admin', { replace: true });
            else setAuthChecking(false);
        });
        return unsub;
    }, [navigate]);

    const handleLogout = async () => {
        await adminLogout();
        navigate('/admin', { replace: true });
    };

    if (authChecking) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* ── Header ── */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 sm:gap-3">
                            <div className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900">
                                <ShieldCheck className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-white" />
                            </div>
                            <div>
                                <h1 className="text-base sm:text-lg font-bold text-gray-900">EnteraFlux Admin</h1>
                                <p className="text-[10px] sm:text-[11px] text-gray-400">Research & Analytics Console</p>
                            </div>
                        </div>

                        {/* Desktop actions */}
                        <div className="hidden sm:flex items-center gap-2">
                            <Link
                                to="/admin/feedback"
                                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                            >
                                <MessageSquare className="w-3.5 h-3.5" />
                                Feedback
                            </Link>
                            <div className="w-px h-6 bg-gray-200 mx-1" />
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-gray-500 hover:bg-gray-100 transition-colors cursor-pointer"
                            >
                                <LogOut className="w-3.5 h-3.5" />
                                Sign Out
                            </button>
                        </div>

                        {/* Mobile menu */}
                        <button
                            className="sm:hidden p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 cursor-pointer"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>

                    {mobileMenuOpen && (
                        <div className="sm:hidden mt-2 pt-2 border-t border-gray-100 flex flex-wrap gap-1.5 pb-1">
                            <Link to="/admin/feedback" className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-medium text-gray-600 hover:bg-gray-100">
                                <MessageSquare className="w-3 h-3" /> Feedback
                            </Link>
                            <button onClick={handleLogout} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-medium text-gray-500 hover:bg-gray-100 cursor-pointer">
                                <LogOut className="w-3 h-3" /> Sign Out
                            </button>
                        </div>
                    )}
                </div>
            </header>

            {/* ── Body ── */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
                {/* Welcome */}
                <div className="mb-8 sm:mb-10">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Welcome back</h2>
                    <p className="text-sm text-gray-500">Select a dashboard to get started.</p>
                </div>

                {/* ── Dashboard Cards ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">

                    {/* Survey Analytics Card */}
                    <Link
                        to="/admin/survey-analytics"
                        className="group relative bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-100/50 transition-all duration-300"
                    >
                        <div className="flex items-start justify-between mb-5">
                            <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-blue-50 group-hover:bg-blue-100 transition-colors">
                                <BarChart3 className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" />
                            </div>
                            <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Survey Analytics</h3>
                        <p className="text-sm text-gray-500 leading-relaxed mb-5">
                            Analyze survey responses with executive insights, research-grade breakdowns, and individual response management.
                        </p>
                        <div className="flex items-center gap-3 flex-wrap">
                            <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-medium px-2.5 py-1 rounded-lg bg-blue-50 text-blue-600">
                                <ClipboardList className="w-3 h-3" /> Executive Overview
                            </span>
                            <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-medium px-2.5 py-1 rounded-lg bg-blue-50 text-blue-600">
                                <TrendingUp className="w-3 h-3" /> Research Analytics
                            </span>
                            <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-medium px-2.5 py-1 rounded-lg bg-blue-50 text-blue-600">
                                <Users className="w-3 h-3" /> Response Data
                            </span>
                        </div>
                    </Link>

                    {/* Drug Analytics Card */}
                    <Link
                        to="/admin/datasets-drug-analytics"
                        className="group relative bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-100/50 transition-all duration-300"
                    >
                        <div className="flex items-start justify-between mb-5">
                            <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-emerald-50 group-hover:bg-emerald-100 transition-colors">
                                <Activity className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-600" />
                            </div>
                            <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Datasets & Drug Analytics</h3>
                        <p className="text-sm text-gray-500 leading-relaxed mb-5">
                            FAERS adverse events, GLP-1 clinical trials, risk scoring engine, AI-powered insights, and full dataset browsing.
                        </p>
                        <div className="flex items-center gap-3 flex-wrap">
                            <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-medium px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-600">
                                <FlaskConical className="w-3 h-3" /> Risk Score
                            </span>
                            <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-medium px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-600">
                                <Database className="w-3 h-3" /> FAERS + Trials
                            </span>
                            <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-medium px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-600">
                                <ShieldCheck className="w-3 h-3" /> AI Insights
                            </span>
                        </div>
                    </Link>

                </div>

                {/* Quick Links */}
                <div className="mt-8 sm:mt-10 flex items-center justify-center gap-4">
                    <Link
                        to="/admin/feedback"
                        className="flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-gray-700 transition-colors"
                    >
                        <MessageSquare className="w-3.5 h-3.5" />
                        Feedback & R&D
                    </Link>
                </div>

                {/* Footer */}
                <div className="text-center mt-12 sm:mt-16">
                    <p className="text-[10px] sm:text-[11px] text-gray-400">
                        © {new Date().getFullYear()} EnteraFlux — Admin Console
                    </p>
                </div>
            </div>
        </div>
    );
}
