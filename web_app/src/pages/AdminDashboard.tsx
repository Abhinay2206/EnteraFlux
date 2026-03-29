import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    fetchSurveyResponses,
    deleteSurveyResponse,
    adminLogout,
    auth,
    onAuthStateChanged,
} from '../firebase';
import {
    Loader2, LogOut, Trash2, RefreshCw, ChevronDown, ChevronUp,
    Search, BarChart3, AlertCircle, Users, Clock, Eye, Download,
    MessageSquare, Target, Beaker, Menu, X, Filter, ArrowUpDown,
    Calendar, RotateCcw, Activity,
} from 'lucide-react';
import type { SurveyResponse } from '../utils/analyticsUtils';
import { QUESTION_LABELS, classifyRisk } from '../utils/analyticsUtils';
import ExecutiveOverview from '../components/admin/ExecutiveOverview';
import ResearchAnalytics from '../components/admin/ResearchAnalytics';


/* ═══════════════════════════════════════════
   Constants
   ═══════════════════════════════════════════ */

const HIDDEN_FIELDS = ['id', 'submitted_at'];

const ALL_QUESTION_LABELS: Record<string, string> = {
    ...QUESTION_LABELS,
    q6_other: 'Other Methods',
    q9_why_stop: 'Why Stop',
    q14_other: 'Other Concerns',
    q19_why_or_why_not: 'Why / Why Not',
    q21_why_stopped_apps: 'Why Stopped Apps',
};

/* ═══════════════════════════════════════════
   Utility Functions
   ═══════════════════════════════════════════ */

function formatValue(val: unknown): string {
    if (val === null || val === undefined || val === '') return '—';
    if (Array.isArray(val)) return val.length > 0 ? val.join(', ') : '—';
    return String(val);
}

function formatDate(iso?: string): string {
    if (!iso) return '—';
    try {
        return new Date(iso).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
    } catch {
        return iso;
    }
}

/* ═══════════════════════════════════════════
   Response Card
   ═══════════════════════════════════════════ */

function ResponseCard({
    response, index, onDelete, deleting,
}: {
    response: SurveyResponse;
    index: number;
    onDelete: (id: string) => void;
    deleting: string | null;
}) {
    const [expanded, setExpanded] = useState(false);
    const fields = Object.entries(response).filter(([key]) => !HIDDEN_FIELDS.includes(key));
    const answered = fields.filter(([, v]) => {
        if (v === null || v === undefined || v === '') return false;
        if (Array.isArray(v) && v.length === 0) return false;
        return true;
    }).length;

    return (
        <div className="bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-all">
            <div
                className="flex items-center justify-between px-4 sm:px-5 py-3 sm:py-3.5 cursor-pointer select-none"
                onClick={() => setExpanded(!expanded)}
            >
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <span className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-slate-100 text-slate-500 text-[10px] sm:text-xs font-bold shrink-0">
                        {index}
                    </span>
                    <div className="min-w-0">
                        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                            <span className="text-xs sm:text-sm font-medium text-gray-900">
                                {response.q1_age ? `Age: ${String(response.q1_age)}` : 'No age'}
                            </span>
                            {typeof response.q2_gender === 'string' && response.q2_gender && (
                                <span className="text-[10px] px-1.5 sm:px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 font-medium">
                                    {response.q2_gender}
                                </span>
                            )}
                            {typeof response.q3_body_type === 'string' && response.q3_body_type && (
                                <span className="text-[10px] px-1.5 sm:px-2 py-0.5 rounded-full bg-green-50 text-green-600 font-medium hidden sm:inline-flex">
                                    {response.q3_body_type}
                                </span>
                            )}
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3 mt-0.5">
                            <span className="text-[10px] text-gray-400 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {formatDate(response.submitted_at)}
                            </span>
                            <span className="text-[10px] text-gray-400">{answered}/{fields.length} answered</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
                    <button
                        onClick={(e) => { e.stopPropagation(); onDelete(response.id); }}
                        disabled={deleting === response.id}
                        className="p-1 sm:p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50 cursor-pointer"
                        title="Delete"
                    >
                        {deleting === response.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                    </button>
                    {expanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                </div>
            </div>
            {expanded && (
                <div className="border-t border-gray-100 px-4 sm:px-5 py-3 sm:py-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                        {fields.map(([key, val]) => (
                            <div key={key} className="px-2.5 sm:px-3 py-2 rounded-lg bg-gray-50">
                                <p className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-0.5">
                                    {ALL_QUESTION_LABELS[key] || key}
                                </p>
                                <p className="text-xs sm:text-sm text-gray-800 break-words">{formatValue(val)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

/* ═══════════════════════════════════════════
   Filter Pill
   ═══════════════════════════════════════════ */

function FilterPill({ label, onClear }: { label: string; onClear: () => void }) {
    return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 text-[10px] sm:text-xs text-gray-700 font-medium">
            {label}
            <button onClick={onClear} className="ml-0.5 text-gray-400 hover:text-gray-700 cursor-pointer"><X className="w-3 h-3" /></button>
        </span>
    );
}

/* ═══════════════════════════════════════════
   Tab Types
   ═══════════════════════════════════════════ */

type Tab = 'executive' | 'research' | 'responses';

const TABS: { key: Tab; label: string; icon: React.ElementType; shortLabel: string }[] = [
    { key: 'executive', label: 'Executive', shortLabel: 'Executive', icon: Target },
    { key: 'research', label: 'Research', shortLabel: 'Research', icon: Beaker },
    { key: 'responses', label: 'Responses', shortLabel: 'Data', icon: Eye },
];

/* ═══════════════════════════════════════════
   Main Dashboard
   ═══════════════════════════════════════════ */

type SortKey = 'newest' | 'oldest' | 'age_asc' | 'age_desc' | 'completeness';

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
    { key: 'newest', label: 'Newest first' },
    { key: 'oldest', label: 'Oldest first' },
    { key: 'age_asc', label: 'Age ↑' },
    { key: 'age_desc', label: 'Age ↓' },
    { key: 'completeness', label: 'Most complete' },
];

interface Filters {
    age: string;
    gender: string;
    bodyType: string;
    appInterest: string;
    payIntent: string;
    awareness: string;
    riskLevel: string;
    triedWL: string;
    dateFrom: string;
    dateTo: string;
}

const EMPTY_FILTERS: Filters = {
    age: '', gender: '', bodyType: '', appInterest: '', payIntent: '',
    awareness: '', riskLevel: '', triedWL: '', dateFrom: '', dateTo: '',
};

function getUniqueValues(responses: SurveyResponse[], field: string): string[] {
    const set = new Set<string>();
    for (const r of responses) {
        const v = r[field];
        if (typeof v === 'string' && v.trim()) set.add(v.trim());
    }
    return Array.from(set).sort();
}

export default function AdminDashboard() {
    const [responses, setResponses] = useState<SurveyResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [authChecking, setAuthChecking] = useState(true);
    const [error, setError] = useState('');
    const [deleting, setDeleting] = useState<string | null>(null);
    const [search, setSearch] = useState('');
    const [activeTab, setActiveTab] = useState<Tab>('executive');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);
    const [sortBy, setSortBy] = useState<SortKey>('newest');
    const [showFilters, setShowFilters] = useState(false);
    const navigate = useNavigate();

    // Auth guard
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (!user) navigate('/admin', { replace: true });
            else setAuthChecking(false);
        });
        return unsub;
    }, [navigate]);

    const loadResponses = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const data = await fetchSurveyResponses();
            setResponses(data as SurveyResponse[]);
        } catch (err) {
            console.error(err);
            setError('Failed to load responses. Check Firestore rules and connection.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!authChecking) loadResponses();
    }, [authChecking, loadResponses]);

    // Dynamic filter options derived from data
    const filterOptions = useMemo(() => ({
        age: getUniqueValues(responses, 'q1_age'),
        gender: getUniqueValues(responses, 'q2_gender'),
        bodyType: getUniqueValues(responses, 'q3_body_type'),
        appInterest: getUniqueValues(responses, 'q23_would_use_app'),
        payIntent: getUniqueValues(responses, 'q25_would_pay'),
        awareness: getUniqueValues(responses, 'q10_heard_about_injections'),
        triedWL: getUniqueValues(responses, 'q5_tried_weight_loss'),
    }), [responses]);

    const activeFilterCount = useMemo(() =>
        Object.values(filters).filter((v) => v.trim() !== '').length,
    [filters]);

    // Filtered + sorted responses for the table
    const filtered = useMemo(() => {
        let list = responses;

        // Text search
        if (search.trim()) {
            const q = search.toLowerCase();
            list = list.filter((r) =>
                Object.values(r).some((v) => {
                    if (Array.isArray(v)) return v.some((x) => String(x).toLowerCase().includes(q));
                    return String(v).toLowerCase().includes(q);
                })
            );
        }

        // Dropdown filters
        if (filters.age) list = list.filter((r) => r.q1_age === filters.age);
        if (filters.gender) list = list.filter((r) => r.q2_gender === filters.gender);
        if (filters.bodyType) list = list.filter((r) => r.q3_body_type === filters.bodyType);
        if (filters.appInterest) list = list.filter((r) => r.q23_would_use_app === filters.appInterest);
        if (filters.payIntent) list = list.filter((r) => r.q25_would_pay === filters.payIntent);
        if (filters.awareness) list = list.filter((r) => r.q10_heard_about_injections === filters.awareness);
        if (filters.triedWL) list = list.filter((r) => r.q5_tried_weight_loss === filters.triedWL);
        if (filters.riskLevel) list = list.filter((r) => classifyRisk(r) === filters.riskLevel);

        // Date range filters
        if (filters.dateFrom) {
            list = list.filter((r) => (r.submitted_at || '') >= filters.dateFrom);
        }
        if (filters.dateTo) {
            const to = filters.dateTo + 'T23:59:59';
            list = list.filter((r) => (r.submitted_at || '') <= to);
        }

        // Sort
        list = [...list].sort((a, b) => {
            switch (sortBy) {
                case 'oldest':
                    return (a.submitted_at || '').localeCompare(b.submitted_at || '');
                case 'age_asc': {
                    const ageA = parseFloat(String(a.q1_age || '0').replace(/[^0-9.]/g, ''));
                    const ageB = parseFloat(String(b.q1_age || '0').replace(/[^0-9.]/g, ''));
                    return ageA - ageB;
                }
                case 'age_desc': {
                    const ageA2 = parseFloat(String(a.q1_age || '0').replace(/[^0-9.]/g, ''));
                    const ageB2 = parseFloat(String(b.q1_age || '0').replace(/[^0-9.]/g, ''));
                    return ageB2 - ageA2;
                }
                case 'completeness': {
                    const cA = Object.values(a).filter((v) => v !== null && v !== undefined && v !== '' && !(Array.isArray(v) && v.length === 0)).length;
                    const cB = Object.values(b).filter((v) => v !== null && v !== undefined && v !== '' && !(Array.isArray(v) && v.length === 0)).length;
                    return cB - cA;
                }
                case 'newest':
                default:
                    return (b.submitted_at || '').localeCompare(a.submitted_at || '');
            }
        });

        return list;
    }, [search, responses, filters, sortBy]);

    const handleDelete = async (id: string) => {
        if (!window.confirm('Delete this survey response permanently?')) return;
        setDeleting(id);
        const ok = await deleteSurveyResponse(id);
        if (ok) setResponses((prev) => prev.filter((r) => r.id !== id));
        setDeleting(null);
    };

    const handleLogout = async () => {
        await adminLogout();
        navigate('/admin', { replace: true });
    };

    const handleExportCSV = () => {
        if (responses.length === 0) return;
        const allKeys = Array.from(new Set(responses.flatMap((r) => Object.keys(r))));
        const header = allKeys.map((k) => ALL_QUESTION_LABELS[k] || k).join(',');
        const rows = responses.map((r) =>
            allKeys.map((k) => {
                const v = r[k];
                const str = Array.isArray(v) ? v.join('; ') : String(v ?? '');
                return `"${str.replace(/"/g, '""')}"`;
            }).join(',')
        );
        const csv = [header, ...rows].join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `survey_responses_${new Date().toISOString().slice(0, 10)}.csv`;
        a.click();
        URL.revokeObjectURL(url);
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
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3">
                    {/* Top row */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 sm:gap-3">
                            <div className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-900">
                                <BarChart3 className="w-4 h-4 text-white" />
                            </div>
                            <div>
                                <h1 className="text-sm sm:text-base font-bold text-gray-900">Survey Analytics</h1>
                                <p className="text-[10px] sm:text-[11px] text-gray-400">EnteraFlux Research Dashboard</p>
                            </div>
                        </div>

                        {/* Desktop actions */}
                        <div className="hidden sm:flex items-center gap-2">
                            <button
                                onClick={handleExportCSV}
                                disabled={responses.length === 0}
                                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-40 cursor-pointer"
                            >
                                <Download className="w-3.5 h-3.5" />
                                Export CSV
                            </button>
                            <button
                                onClick={loadResponses}
                                disabled={loading}
                                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-40 cursor-pointer"
                            >
                                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                                Refresh
                            </button>
                            <div className="w-px h-6 bg-gray-200 mx-1" />
                            <Link
                                to="/admin/dashboard"
                                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                            >
                                <BarChart3 className="w-3.5 h-3.5" />
                                Dashboard
                            </Link>
                            <Link
                                to="/admin/feedback"
                                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                            >
                                <MessageSquare className="w-3.5 h-3.5" />
                                Feedback
                            </Link>
                            <Link
                                to="/admin/datasets-drug-analytics"
                                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                            >
                                <Activity className="w-3.5 h-3.5" />
                                Drug Analytics
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

                        {/* Mobile menu button */}
                        <button
                            className="sm:hidden p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors cursor-pointer"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>

                    {/* Mobile menu */}
                    {mobileMenuOpen && (
                        <div className="sm:hidden mt-2 pt-2 border-t border-gray-100 flex flex-wrap gap-1.5 pb-1">
                            <button
                                onClick={() => { handleExportCSV(); setMobileMenuOpen(false); }}
                                disabled={responses.length === 0}
                                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-40 cursor-pointer"
                            >
                                <Download className="w-3 h-3" /> Export
                            </button>
                            <button
                                onClick={() => { loadResponses(); setMobileMenuOpen(false); }}
                                disabled={loading}
                                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-40 cursor-pointer"
                            >
                                <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} /> Refresh
                            </button>
                            <Link
                                to="/admin/dashboard"
                                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-medium text-gray-600 hover:bg-gray-100"
                            >
                                <BarChart3 className="w-3 h-3" /> Dashboard
                            </Link>
                            <Link
                                to="/admin/feedback"
                                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-medium text-gray-600 hover:bg-gray-100"
                            >
                                <MessageSquare className="w-3 h-3" /> Feedback
                            </Link>
                            <Link
                                to="/admin/datasets-drug-analytics"
                                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-medium text-gray-600 hover:bg-gray-100"
                            >
                                <Activity className="w-3 h-3" /> Drug Analytics
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-medium text-gray-500 hover:bg-gray-100 cursor-pointer"
                            >
                                <LogOut className="w-3 h-3" /> Sign Out
                            </button>
                        </div>
                    )}
                </div>

                {/* ── Tab Bar ── */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex items-center gap-0.5 sm:gap-1 overflow-x-auto scrollbar-hide -mb-px">
                        {TABS.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.key;
                            return (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveTab(tab.key)}
                                    className={`flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-2.5 text-[10px] sm:text-xs font-medium border-b-2 transition-colors whitespace-nowrap cursor-pointer ${isActive
                                        ? 'border-slate-900 text-slate-900'
                                        : 'border-transparent text-gray-400 hover:text-gray-600 hover:border-gray-300'
                                        }`}
                                >
                                    <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                    <span className="sm:hidden">{tab.shortLabel}</span>
                                    <span className="hidden sm:inline">{tab.label}</span>
                                    {tab.key === 'responses' && (
                                        <span className={`ml-0.5 text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-slate-900 text-white' : 'bg-gray-100 text-gray-500'
                                            }`}>
                                            {responses.length}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </header>

            {/* ── Body ── */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
                {/* Error */}
                {error && (
                    <div className="mb-4 sm:mb-6 flex items-center gap-2 p-3 sm:p-4 rounded-xl bg-red-50 border border-red-200">
                        <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                        <p className="text-xs sm:text-sm text-red-600">{error}</p>
                    </div>
                )}

                {/* Loading */}
                {loading && (
                    <div className="flex items-center justify-center py-24 sm:py-32">
                        <div className="text-center">
                            <Loader2 className="w-7 h-7 sm:w-8 sm:h-8 animate-spin text-gray-300 mx-auto mb-3" />
                            <p className="text-xs sm:text-sm text-gray-400">Loading survey data...</p>
                        </div>
                    </div>
                )}

                {!loading && (
                    <>
                        {/* ═══ Executive Tab ═══ */}
                        {activeTab === 'executive' && <ExecutiveOverview responses={responses} />}

                        {/* ═══ Research Tab ═══ */}
                        {activeTab === 'research' && <ResearchAnalytics responses={responses} />}


                        {/* ═══ Responses Tab ═══ */}
                        {activeTab === 'responses' && (
                            <div>
                                {/* ── Search + Filter Toggle + Sort ── */}
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="flex-1 relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="text"
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            placeholder="Search by any field..."
                                            className="w-full pl-10 pr-4 py-2 sm:py-2.5 rounded-lg border border-gray-200 bg-white text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-500/20 focus:outline-none transition-colors"
                                        />
                                    </div>

                                    {/* Filter toggle */}
                                    <button
                                        onClick={() => setShowFilters(!showFilters)}
                                        className={`flex items-center gap-1.5 px-3 py-2 sm:py-2.5 rounded-lg border text-xs font-medium transition-colors shrink-0 cursor-pointer ${
                                            showFilters || activeFilterCount > 0
                                                ? 'border-gray-900 bg-gray-900 text-white'
                                                : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                                        }`}
                                    >
                                        <Filter className="w-3.5 h-3.5" />
                                        <span className="hidden sm:inline">Filters</span>
                                        {activeFilterCount > 0 && (
                                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                                                showFilters || activeFilterCount > 0 ? 'bg-white text-gray-900' : 'bg-gray-900 text-white'
                                            }`}>{activeFilterCount}</span>
                                        )}
                                    </button>

                                    {/* Sort */}
                                    <div className="relative shrink-0">
                                        <div className="flex items-center">
                                            <ArrowUpDown className="absolute left-2.5 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                                            <select
                                                value={sortBy}
                                                onChange={(e) => setSortBy(e.target.value as SortKey)}
                                                className="appearance-none pl-8 pr-6 py-2 sm:py-2.5 rounded-lg border border-gray-200 bg-white text-xs text-gray-600 focus:border-slate-500 focus:ring-2 focus:ring-slate-500/20 focus:outline-none cursor-pointer"
                                            >
                                                {SORT_OPTIONS.map((opt) => (
                                                    <option key={opt.key} value={opt.key}>{opt.label}</option>
                                                ))}
                                            </select>
                                            <ChevronDown className="absolute right-2 w-3 h-3 text-gray-400 pointer-events-none" />
                                        </div>
                                    </div>
                                </div>

                                {/* ── Filter Panel ── */}
                                {showFilters && (
                                    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 mb-4">
                                        <div className="flex items-center justify-between mb-3">
                                            <h4 className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">Filter Responses</h4>
                                            {activeFilterCount > 0 && (
                                                <button
                                                    onClick={() => setFilters(EMPTY_FILTERS)}
                                                    className="flex items-center gap-1 text-[10px] sm:text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
                                                >
                                                    <RotateCcw className="w-3 h-3" /> Clear all
                                                </button>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3">
                                            {/* Age */}
                                            <div>
                                                <label className="block text-[9px] sm:text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-1">Age</label>
                                                <select value={filters.age} onChange={(e) => setFilters((f) => ({ ...f, age: e.target.value }))} className="w-full px-2.5 py-2 rounded-lg border border-gray-200 bg-white text-xs text-gray-700 focus:border-slate-500 focus:ring-2 focus:ring-slate-500/20 focus:outline-none cursor-pointer">
                                                    <option value="">All ages</option>
                                                    {filterOptions.age.map((v) => <option key={v} value={v}>{v}</option>)}
                                                </select>
                                            </div>

                                            {/* Gender */}
                                            <div>
                                                <label className="block text-[9px] sm:text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-1">Gender</label>
                                                <select value={filters.gender} onChange={(e) => setFilters((f) => ({ ...f, gender: e.target.value }))} className="w-full px-2.5 py-2 rounded-lg border border-gray-200 bg-white text-xs text-gray-700 focus:border-slate-500 focus:ring-2 focus:ring-slate-500/20 focus:outline-none cursor-pointer">
                                                    <option value="">All genders</option>
                                                    {filterOptions.gender.map((v) => <option key={v} value={v}>{v}</option>)}
                                                </select>
                                            </div>

                                            {/* Body Type */}
                                            <div>
                                                <label className="block text-[9px] sm:text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-1">Body Type</label>
                                                <select value={filters.bodyType} onChange={(e) => setFilters((f) => ({ ...f, bodyType: e.target.value }))} className="w-full px-2.5 py-2 rounded-lg border border-gray-200 bg-white text-xs text-gray-700 focus:border-slate-500 focus:ring-2 focus:ring-slate-500/20 focus:outline-none cursor-pointer">
                                                    <option value="">All types</option>
                                                    {filterOptions.bodyType.map((v) => <option key={v} value={v}>{v}</option>)}
                                                </select>
                                            </div>

                                            {/* App Interest */}
                                            <div>
                                                <label className="block text-[9px] sm:text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-1">App Interest</label>
                                                <select value={filters.appInterest} onChange={(e) => setFilters((f) => ({ ...f, appInterest: e.target.value }))} className="w-full px-2.5 py-2 rounded-lg border border-gray-200 bg-white text-xs text-gray-700 focus:border-slate-500 focus:ring-2 focus:ring-slate-500/20 focus:outline-none cursor-pointer">
                                                    <option value="">All</option>
                                                    {filterOptions.appInterest.map((v) => <option key={v} value={v}>{v}</option>)}
                                                </select>
                                            </div>

                                            {/* Pay Intent */}
                                            <div>
                                                <label className="block text-[9px] sm:text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-1">Pay Intent</label>
                                                <select value={filters.payIntent} onChange={(e) => setFilters((f) => ({ ...f, payIntent: e.target.value }))} className="w-full px-2.5 py-2 rounded-lg border border-gray-200 bg-white text-xs text-gray-700 focus:border-slate-500 focus:ring-2 focus:ring-slate-500/20 focus:outline-none cursor-pointer">
                                                    <option value="">All</option>
                                                    {filterOptions.payIntent.map((v) => <option key={v} value={v}>{v}</option>)}
                                                </select>
                                            </div>

                                            {/* Awareness */}
                                            <div>
                                                <label className="block text-[9px] sm:text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-1">Awareness</label>
                                                <select value={filters.awareness} onChange={(e) => setFilters((f) => ({ ...f, awareness: e.target.value }))} className="w-full px-2.5 py-2 rounded-lg border border-gray-200 bg-white text-xs text-gray-700 focus:border-slate-500 focus:ring-2 focus:ring-slate-500/20 focus:outline-none cursor-pointer">
                                                    <option value="">All</option>
                                                    {filterOptions.awareness.map((v) => <option key={v} value={v}>{v}</option>)}
                                                </select>
                                            </div>

                                            {/* Tried Weight Loss */}
                                            <div>
                                                <label className="block text-[9px] sm:text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-1">Tried WL</label>
                                                <select value={filters.triedWL} onChange={(e) => setFilters((f) => ({ ...f, triedWL: e.target.value }))} className="w-full px-2.5 py-2 rounded-lg border border-gray-200 bg-white text-xs text-gray-700 focus:border-slate-500 focus:ring-2 focus:ring-slate-500/20 focus:outline-none cursor-pointer">
                                                    <option value="">All</option>
                                                    {filterOptions.triedWL.map((v) => <option key={v} value={v}>{v}</option>)}
                                                </select>
                                            </div>

                                            {/* Risk Level */}
                                            <div>
                                                <label className="block text-[9px] sm:text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-1">Risk Level</label>
                                                <select value={filters.riskLevel} onChange={(e) => setFilters((f) => ({ ...f, riskLevel: e.target.value }))} className="w-full px-2.5 py-2 rounded-lg border border-gray-200 bg-white text-xs text-gray-700 focus:border-slate-500 focus:ring-2 focus:ring-slate-500/20 focus:outline-none cursor-pointer">
                                                    <option value="">All</option>
                                                    <option value="High">High</option>
                                                    <option value="Medium">Medium</option>
                                                    <option value="Low">Low</option>
                                                </select>
                                            </div>
                                        </div>

                                        {/* Date Range */}
                                        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 mt-3 sm:max-w-sm">
                                            <div>
                                                <label className="block text-[9px] sm:text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                                                    <Calendar className="w-3 h-3" /> From
                                                </label>
                                                <input
                                                    type="date"
                                                    value={filters.dateFrom}
                                                    onChange={(e) => setFilters((f) => ({ ...f, dateFrom: e.target.value }))}
                                                    className="w-full px-2.5 py-2 rounded-lg border border-gray-200 bg-white text-xs text-gray-700 focus:border-slate-500 focus:ring-2 focus:ring-slate-500/20 focus:outline-none cursor-pointer"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[9px] sm:text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                                                    <Calendar className="w-3 h-3" /> To
                                                </label>
                                                <input
                                                    type="date"
                                                    value={filters.dateTo}
                                                    onChange={(e) => setFilters((f) => ({ ...f, dateTo: e.target.value }))}
                                                    className="w-full px-2.5 py-2 rounded-lg border border-gray-200 bg-white text-xs text-gray-700 focus:border-slate-500 focus:ring-2 focus:ring-slate-500/20 focus:outline-none cursor-pointer"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* ── Active filter pills ── */}
                                {activeFilterCount > 0 && !showFilters && (
                                    <div className="flex items-center gap-1.5 flex-wrap mb-3">
                                        {filters.age && <FilterPill label={`Age: ${filters.age}`} onClear={() => setFilters((f) => ({ ...f, age: '' }))} />}
                                        {filters.gender && <FilterPill label={`Gender: ${filters.gender}`} onClear={() => setFilters((f) => ({ ...f, gender: '' }))} />}
                                        {filters.bodyType && <FilterPill label={`Body: ${filters.bodyType}`} onClear={() => setFilters((f) => ({ ...f, bodyType: '' }))} />}
                                        {filters.appInterest && <FilterPill label={`Interest: ${filters.appInterest}`} onClear={() => setFilters((f) => ({ ...f, appInterest: '' }))} />}
                                        {filters.payIntent && <FilterPill label={`Pay: ${filters.payIntent}`} onClear={() => setFilters((f) => ({ ...f, payIntent: '' }))} />}
                                        {filters.awareness && <FilterPill label={`Aware: ${filters.awareness}`} onClear={() => setFilters((f) => ({ ...f, awareness: '' }))} />}
                                        {filters.triedWL && <FilterPill label={`WL: ${filters.triedWL}`} onClear={() => setFilters((f) => ({ ...f, triedWL: '' }))} />}
                                        {filters.riskLevel && <FilterPill label={`Risk: ${filters.riskLevel}`} onClear={() => setFilters((f) => ({ ...f, riskLevel: '' }))} />}
                                        {filters.dateFrom && <FilterPill label={`From: ${filters.dateFrom}`} onClear={() => setFilters((f) => ({ ...f, dateFrom: '' }))} />}
                                        {filters.dateTo && <FilterPill label={`To: ${filters.dateTo}`} onClear={() => setFilters((f) => ({ ...f, dateTo: '' }))} />}
                                        <button
                                            onClick={() => setFilters(EMPTY_FILTERS)}
                                            className="text-[10px] text-gray-400 hover:text-gray-600 font-medium ml-1 cursor-pointer"
                                        >Clear all</button>
                                    </div>
                                )}

                                {/* ── Results count ── */}
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-[10px] sm:text-xs text-gray-400">
                                        {filtered.length} of {responses.length} responses
                                    </span>
                                </div>

                                {/* Empty */}
                                {filtered.length === 0 && (
                                    <div className="text-center py-12 sm:py-16">
                                        <Users className="w-8 h-8 sm:w-10 sm:h-10 text-gray-200 mx-auto mb-3" />
                                        <p className="text-xs sm:text-sm text-gray-400">
                                            {search || activeFilterCount > 0 ? 'No responses match your filters.' : 'No responses yet.'}
                                        </p>
                                        {activeFilterCount > 0 && (
                                            <button
                                                onClick={() => { setFilters(EMPTY_FILTERS); setSearch(''); }}
                                                className="mt-2 text-xs text-gray-500 hover:text-gray-700 font-medium cursor-pointer"
                                            >Clear all filters</button>
                                        )}
                                    </div>
                                )}

                                {/* List */}
                                {filtered.length > 0 && (
                                    <div className="space-y-2">
                                        {filtered.map((r, i) => (
                                            <ResponseCard
                                                key={r.id}
                                                response={r}
                                                index={i + 1}
                                                onDelete={handleDelete}
                                                deleting={deleting}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </>
                )}

                {/* Footer */}
                <div className="text-center mt-8 sm:mt-12 pb-4 sm:pb-6">
                    <p className="text-[10px] sm:text-[11px] text-gray-400">
                        © {new Date().getFullYear()} EnteraFlux — Admin Dashboard · Data refreshes on page load
                    </p>
                </div>
            </div>
        </div>
    );
}
