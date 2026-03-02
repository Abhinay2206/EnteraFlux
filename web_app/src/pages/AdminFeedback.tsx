import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    fetchFeedback,
    fetchRDApplications,
    deleteFeedbackEntry,
    deleteRDApplication,
    adminLogout,
    auth,
    onAuthStateChanged,
} from '../firebase';
import {
    MessageSquare,
    Beaker,
    Loader2,
    LogOut,
    RefreshCw,
    Download,
    ChevronDown,
    ChevronUp,
    Trash2,
    Mail,
    User,
    Building,
    ArrowLeft,
    AlertCircle,
    Search,
} from 'lucide-react';

/* ═══════════════════════════════════════════
   Types
   ═══════════════════════════════════════════ */

interface FeedbackEntry {
    id: string;
    name?: string;
    email?: string;
    role?: string;
    message?: string;
    submitted_at?: string;
    [key: string]: unknown;
}

interface RDApplication {
    id: string;
    name?: string;
    email?: string;
    organization?: string;
    expertise?: string;
    motivation?: string;
    submitted_at?: string;
    [key: string]: unknown;
}

type ActiveTab = 'feedback' | 'rnd';

/* ═══════════════════════════════════════════
   Utilities
   ═══════════════════════════════════════════ */

function formatDate(iso?: string): string {
    if (!iso) return '—';
    try {
        return new Date(iso).toLocaleDateString('en-IN', {
            day: 'numeric', month: 'short', year: 'numeric',
            hour: '2-digit', minute: '2-digit',
        });
    } catch { return iso; }
}

function roleBadge(role?: string) {
    const colors: Record<string, string> = {
        patient: 'bg-blue-100 text-blue-700',
        developer: 'bg-purple-100 text-purple-700',
        clinician: 'bg-emerald-100 text-emerald-700',
        researcher: 'bg-amber-100 text-amber-700',
        other: 'bg-gray-100 text-gray-600',
    };
    const cls = colors[role || ''] || colors.other;
    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${cls}`}>
            {role || 'Unknown'}
        </span>
    );
}

/* ═══════════════════════════════════════════
   Expandable Card Components
   ═══════════════════════════════════════════ */

function FeedbackCard({
    entry, onDelete, deleting,
}: {
    entry: FeedbackEntry; onDelete: (id: string) => void; deleting: string | null;
}) {
    const [open, setOpen] = useState(false);
    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-gray-300 transition-colors">
            <button onClick={() => setOpen(!open)} className="w-full px-5 py-4 flex items-center justify-between text-left cursor-pointer">
                <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                        <User className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-semibold text-gray-900 truncate">{entry.name || 'Anonymous'}</span>
                            {roleBadge(entry.role)}
                        </div>
                        <p className="text-xs text-gray-400 mt-0.5">{formatDate(entry.submitted_at)}</p>
                    </div>
                </div>
                {open ? <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />}
            </button>
            {open && (
                <div className="px-5 pb-5 border-t border-gray-100 pt-4 space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <a href={`mailto:${entry.email}`} className="text-blue-600 hover:underline">{entry.email || '—'}</a>
                    </div>
                    <div>
                        <p className="text-xs font-medium text-gray-500 mb-1">Message</p>
                        <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3 whitespace-pre-wrap">{entry.message || '—'}</p>
                    </div>
                    <div className="flex justify-end">
                        <button
                            onClick={() => onDelete(entry.id)}
                            disabled={deleting === entry.id}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-red-600 hover:bg-red-50 transition-colors disabled:opacity-40 cursor-pointer"
                        >
                            {deleting === entry.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Trash2 className="w-3 h-3" />}
                            Delete
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

function RDCard({
    entry, onDelete, deleting,
}: {
    entry: RDApplication; onDelete: (id: string) => void; deleting: string | null;
}) {
    const [open, setOpen] = useState(false);
    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-gray-300 transition-colors">
            <button onClick={() => setOpen(!open)} className="w-full px-5 py-4 flex items-center justify-between text-left cursor-pointer">
                <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                        <Beaker className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div className="min-w-0">
                        <span className="text-sm font-semibold text-gray-900 truncate block">{entry.name || 'Anonymous'}</span>
                        <p className="text-xs text-gray-400 mt-0.5">{entry.expertise || 'No expertise listed'} · {formatDate(entry.submitted_at)}</p>
                    </div>
                </div>
                {open ? <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />}
            </button>
            {open && (
                <div className="px-5 pb-5 border-t border-gray-100 pt-4 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex items-center gap-2 text-sm">
                            <Mail className="w-4 h-4 text-gray-400" />
                            <a href={`mailto:${entry.email}`} className="text-blue-600 hover:underline">{entry.email || '—'}</a>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <Building className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-700">{entry.organization || 'Not specified'}</span>
                        </div>
                    </div>
                    <div>
                        <p className="text-xs font-medium text-gray-500 mb-1">Area of Expertise</p>
                        <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3">{entry.expertise || '—'}</p>
                    </div>
                    <div>
                        <p className="text-xs font-medium text-gray-500 mb-1">Motivation</p>
                        <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3 whitespace-pre-wrap">{entry.motivation || '—'}</p>
                    </div>
                    <div className="flex justify-end">
                        <button
                            onClick={() => onDelete(entry.id)}
                            disabled={deleting === entry.id}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-red-600 hover:bg-red-50 transition-colors disabled:opacity-40 cursor-pointer"
                        >
                            {deleting === entry.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Trash2 className="w-3 h-3" />}
                            Delete
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

/* ═══════════════════════════════════════════
   Main Component
   ═══════════════════════════════════════════ */

export default function AdminFeedback() {
    const [feedback, setFeedback] = useState<FeedbackEntry[]>([]);
    const [rdApps, setRdApps] = useState<RDApplication[]>([]);
    const [loading, setLoading] = useState(true);
    const [authChecking, setAuthChecking] = useState(true);
    const [error, setError] = useState('');
    const [deleting, setDeleting] = useState<string | null>(null);
    const [search, setSearch] = useState('');
    const [activeTab, setActiveTab] = useState<ActiveTab>('feedback');
    const navigate = useNavigate();

    // Auth guard
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (!user) navigate('/admin', { replace: true });
            else setAuthChecking(false);
        });
        return unsub;
    }, [navigate]);

    const loadData = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const [fb, rd] = await Promise.all([fetchFeedback(), fetchRDApplications()]);
            setFeedback(fb as FeedbackEntry[]);
            setRdApps(rd as RDApplication[]);
        } catch (err) {
            console.error(err);
            setError('Failed to load data. Check Firestore rules and connection.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!authChecking) loadData();
    }, [authChecking, loadData]);

    const handleDeleteFeedback = async (id: string) => {
        setDeleting(id);
        const ok = await deleteFeedbackEntry(id);
        if (ok) setFeedback((p) => p.filter((e) => e.id !== id));
        setDeleting(null);
    };

    const handleDeleteRD = async (id: string) => {
        setDeleting(id);
        const ok = await deleteRDApplication(id);
        if (ok) setRdApps((p) => p.filter((e) => e.id !== id));
        setDeleting(null);
    };

    const handleLogout = async () => {
        await adminLogout();
        navigate('/admin', { replace: true });
    };

    const handleExportCSV = () => {
        const rows = activeTab === 'feedback' ? feedback : rdApps;
        if (rows.length === 0) return;
        const keys = Object.keys(rows[0]).filter((k) => k !== 'id');
        const header = keys.join(',');
        const body = rows.map((r) => keys.map((k) => `"${String((r as Record<string, unknown>)[k] ?? '').replace(/"/g, '""')}"`).join(',')).join('\n');
        const blob = new Blob([header + '\n' + body], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${activeTab}_export_${new Date().toISOString().slice(0, 10)}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    // Filter
    const filteredFeedback = useMemo(() => {
        if (!search.trim()) return feedback;
        const q = search.toLowerCase();
        return feedback.filter((e) =>
            [e.name, e.email, e.role, e.message].some((v) => String(v || '').toLowerCase().includes(q))
        );
    }, [search, feedback]);

    const filteredRD = useMemo(() => {
        if (!search.trim()) return rdApps;
        const q = search.toLowerCase();
        return rdApps.filter((e) =>
            [e.name, e.email, e.organization, e.expertise, e.motivation].some((v) => String(v || '').toLowerCase().includes(q))
        );
    }, [search, rdApps]);

    if (authChecking) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
            </div>
        );
    }

    const currentList = activeTab === 'feedback' ? filteredFeedback : filteredRD;
    const totalFeedback = feedback.length;
    const totalRD = rdApps.length;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* ── Header ── */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link
                            to="/admin/dashboard"
                            className="flex items-center justify-center w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
                            title="Back to Survey Analytics"
                        >
                            <ArrowLeft className="w-4 h-4 text-gray-600" />
                        </Link>
                        <div>
                            <h1 className="text-base font-bold text-gray-900">Feedback & R&D</h1>
                            <p className="text-[11px] text-gray-400">Submissions from Contact Page</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleExportCSV}
                            disabled={currentList.length === 0}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-40 cursor-pointer"
                        >
                            <Download className="w-3.5 h-3.5" />
                            Export CSV
                        </button>
                        <button
                            onClick={loadData}
                            disabled={loading}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-40 cursor-pointer"
                        >
                            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                            Refresh
                        </button>
                        <div className="w-px h-6 bg-gray-200 mx-1" />
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-gray-500 hover:bg-gray-100 transition-colors cursor-pointer"
                        >
                            <LogOut className="w-3.5 h-3.5" />
                            Sign Out
                        </button>
                    </div>
                </div>
            </header>

            <div className="max-w-5xl mx-auto px-6 py-8">
                {/* ── Stats ── */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white rounded-xl border border-gray-200 p-4">
                        <p className="text-xs font-medium text-gray-500 mb-1">Total Feedback</p>
                        <p className="text-2xl font-bold text-gray-900">{totalFeedback}</p>
                    </div>
                    <div className="bg-white rounded-xl border border-gray-200 p-4">
                        <p className="text-xs font-medium text-gray-500 mb-1">R&D Applications</p>
                        <p className="text-2xl font-bold text-gray-900">{totalRD}</p>
                    </div>
                    <div className="bg-white rounded-xl border border-gray-200 p-4">
                        <p className="text-xs font-medium text-gray-500 mb-1">Patient Feedback</p>
                        <p className="text-2xl font-bold text-blue-600">
                            {feedback.filter((e) => e.role === 'patient').length}
                        </p>
                    </div>
                    <div className="bg-white rounded-xl border border-gray-200 p-4">
                        <p className="text-xs font-medium text-gray-500 mb-1">Developer Feedback</p>
                        <p className="text-2xl font-bold text-purple-600">
                            {feedback.filter((e) => e.role === 'developer').length}
                        </p>
                    </div>
                </div>

                {/* ── Tabs ── */}
                <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-1 bg-white rounded-xl border border-gray-200 p-1">
                        <button
                            onClick={() => setActiveTab('feedback')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${activeTab === 'feedback'
                                    ? 'bg-slate-900 text-white'
                                    : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            <MessageSquare className="w-3.5 h-3.5" />
                            Feedback ({totalFeedback})
                        </button>
                        <button
                            onClick={() => setActiveTab('rnd')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${activeTab === 'rnd'
                                    ? 'bg-slate-900 text-white'
                                    : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            <Beaker className="w-3.5 h-3.5" />
                            R&D Applications ({totalRD})
                        </button>
                    </div>

                    {/* Search */}
                    <div className="flex-1 relative max-w-xs ml-auto">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 bg-white text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-colors"
                        />
                    </div>
                </div>

                {/* ── Error ── */}
                {error && (
                    <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 flex items-center gap-3">
                        <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                        <p className="text-sm text-red-700">{error}</p>
                    </div>
                )}

                {/* ── Loading ── */}
                {loading && (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                    </div>
                )}

                {/* ── Content ── */}
                {!loading && (
                    <div className="space-y-3">
                        {currentList.length === 0 ? (
                            <div className="text-center py-16 text-gray-400 text-sm">
                                {search.trim() ? 'No results match your search.' : `No ${activeTab === 'feedback' ? 'feedback' : 'R&D applications'} yet.`}
                            </div>
                        ) : (
                            <>
                                {activeTab === 'feedback' &&
                                    filteredFeedback.map((e) => (
                                        <FeedbackCard key={e.id} entry={e} onDelete={handleDeleteFeedback} deleting={deleting} />
                                    ))}
                                {activeTab === 'rnd' &&
                                    filteredRD.map((e) => (
                                        <RDCard key={e.id} entry={e} onDelete={handleDeleteRD} deleting={deleting} />
                                    ))}
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
