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
    Loader2,
    LogOut,
    Trash2,
    RefreshCw,
    ChevronDown,
    ChevronUp,
    Search,
    BarChart3,
    AlertCircle,
    Users,
    Clock,
    TrendingUp,
    PieChart,
    Activity,
    Eye,
    Download,
    MessageSquare,
} from 'lucide-react';

/* ═══════════════════════════════════════════
   Types & Constants
   ═══════════════════════════════════════════ */

interface SurveyResponse {
    id: string;
    submitted_at?: string;
    [key: string]: unknown;
}

const QUESTION_LABELS: Record<string, string> = {
    q1_age: 'Age',
    q2_gender: 'Gender',
    q3_body_type: 'Body Type',
    q4_medical_conditions: 'Medical Conditions',
    q5_tried_weight_loss: 'Tried to Lose Weight',
    q6_methods: 'Methods Tried',
    q6_other: 'Other Methods',
    q7_biggest_difficulty: 'Biggest Difficulty',
    q8_consistency_duration: 'Consistency Duration',
    q9_why_stop: 'Why Stop',
    q10_heard_about_injections: 'Heard About Injections',
    q11_where_heard: 'Where Heard',
    q12_opinion: 'Opinion on Medication',
    q13_consider_using: 'Consider Using',
    q14_concerns: 'Concerns',
    q14_other: 'Other Concerns',
    q15_family_members: 'Family Members',
    q16_relatives_know: 'Relatives Know',
    q17_know_anyone: 'Know Anyone',
    q18_support_family: 'Support Family',
    q19_why_or_why_not: 'Why / Why Not',
    q20_use_apps: 'Use Health Apps',
    q21_why_stopped_apps: 'Why Stopped Apps',
    q22_support_type: 'Support Type Wanted',
    q23_would_use_app: 'Would Use App',
    q24_useful_features: 'Useful Features',
    q25_would_pay: 'Would Pay',
    q26_monthly_amount: 'Monthly Amount',
    q27_what_convinces: 'What Convinces',
};

const HIDDEN_FIELDS = ['id', 'submitted_at'];

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
        return new Date(iso).toLocaleString('en-IN', {
            dateStyle: 'medium',
            timeStyle: 'short',
        });
    } catch {
        return iso;
    }
}

function countField(responses: SurveyResponse[], field: string): Record<string, number> {
    const counts: Record<string, number> = {};
    for (const r of responses) {
        const val = r[field];
        if (Array.isArray(val)) {
            for (const item of val) {
                const key = String(item);
                if (key) counts[key] = (counts[key] || 0) + 1;
            }
        } else if (val && String(val).trim()) {
            const key = String(val);
            counts[key] = (counts[key] || 0) + 1;
        }
    }
    return counts;
}

const BAR_COLORS = [
    'bg-blue-500', 'bg-emerald-500', 'bg-violet-500', 'bg-amber-500',
    'bg-rose-500', 'bg-cyan-500', 'bg-orange-500', 'bg-pink-500',
];

/* ═══════════════════════════════════════════
   Analytics Chart Components
   ═══════════════════════════════════════════ */

function DistributionChart({
    title,
    icon: Icon,
    data,
    total,
}: {
    title: string;
    icon: React.ElementType;
    data: Record<string, number>;
    total: number;
}) {
    const entries = Object.entries(data).sort((a, b) => b[1] - a[1]);
    if (entries.length === 0) {
        return (
            <div className="bg-white rounded-xl border border-gray-200 p-5">
                <div className="flex items-center gap-2 mb-4">
                    <Icon className="w-4 h-4 text-gray-400" />
                    <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
                </div>
                <p className="text-xs text-gray-400">No data yet</p>
            </div>
        );
    }
    const maxCount = Math.max(...entries.map(([, c]) => c));

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-gray-400" />
                    <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
                </div>
                <span className="text-xs text-gray-400">{total} responses</span>
            </div>
            <div className="space-y-2.5">
                {entries.map(([label, count], i) => {
                    const pct = total > 0 ? Math.round((count / total) * 100) : 0;
                    return (
                        <div key={label}>
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-xs text-gray-600 truncate max-w-[60%]">{label}</span>
                                <span className="text-xs font-semibold text-gray-900">{count} <span className="text-gray-400 font-normal">({pct}%)</span></span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                                <div
                                    className={`h-full rounded-full ${BAR_COLORS[i % BAR_COLORS.length]} transition-all duration-500`}
                                    style={{ width: `${maxCount > 0 ? (count / maxCount) * 100 : 0}%` }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function StatCard({
    label,
    value,
    sub,
    icon: Icon,
    color,
}: {
    label: string;
    value: string | number;
    sub?: string;
    icon: React.ElementType;
    color: string;
}) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
                    {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
                </div>
                <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${color}`}>
                    <Icon className="w-5 h-5 text-white" />
                </div>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════
   Response Card (expandable + delete)
   ═══════════════════════════════════════════ */

function ResponseCard({
    response,
    index,
    onDelete,
    deleting,
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
                className="flex items-center justify-between px-5 py-3.5 cursor-pointer select-none"
                onClick={() => setExpanded(!expanded)}
            >
                <div className="flex items-center gap-3 min-w-0">
                    <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-slate-100 text-slate-500 text-xs font-bold shrink-0">
                        {index}
                    </span>
                    <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-medium text-gray-900">
                                {response.q1_age ? `Age: ${String(response.q1_age)}` : 'No age'}
                            </span>
                            {typeof response.q2_gender === 'string' && response.q2_gender && (
                                <span className="text-[11px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 font-medium">
                                    {response.q2_gender}
                                </span>
                            )}
                            {typeof response.q3_body_type === 'string' && response.q3_body_type && (
                                <span className="text-[11px] px-2 py-0.5 rounded-full bg-green-50 text-green-600 font-medium">
                                    {response.q3_body_type}
                                </span>
                            )}
                        </div>
                        <div className="flex items-center gap-3 mt-0.5">
                            <span className="text-[11px] text-gray-400 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {formatDate(response.submitted_at)}
                            </span>
                            <span className="text-[11px] text-gray-400">{answered}/{fields.length} answered</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                    <button
                        onClick={(e) => { e.stopPropagation(); onDelete(response.id); }}
                        disabled={deleting === response.id}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50 cursor-pointer"
                        title="Delete"
                    >
                        {deleting === response.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                    </button>
                    {expanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                </div>
            </div>
            {expanded && (
                <div className="border-t border-gray-100 px-5 py-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {fields.map(([key, val]) => (
                            <div key={key} className="px-3 py-2 rounded-lg bg-gray-50">
                                <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-0.5">
                                    {QUESTION_LABELS[key] || key}
                                </p>
                                <p className="text-sm text-gray-800 break-words">{formatValue(val)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

/* ═══════════════════════════════════════════
   Tabs
   ═══════════════════════════════════════════ */

type Tab = 'analytics' | 'responses';

/* ═══════════════════════════════════════════
   Main Dashboard
   ═══════════════════════════════════════════ */

export default function AdminDashboard() {
    const [responses, setResponses] = useState<SurveyResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [authChecking, setAuthChecking] = useState(true);
    const [error, setError] = useState('');
    const [deleting, setDeleting] = useState<string | null>(null);
    const [search, setSearch] = useState('');
    const [activeTab, setActiveTab] = useState<Tab>('analytics');
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

    // Filtered responses for the table
    const filtered = useMemo(() => {
        if (!search.trim()) return responses;
        const q = search.toLowerCase();
        return responses.filter((r) =>
            Object.values(r).some((v) => {
                if (Array.isArray(v)) return v.some((x) => String(x).toLowerCase().includes(q));
                return String(v).toLowerCase().includes(q);
            })
        );
    }, [search, responses]);

    // Analytics computations
    const analytics = useMemo(() => {
        const total = responses.length;
        const ageData = countField(responses, 'q1_age');
        const genderData = countField(responses, 'q2_gender');
        const bodyTypeData = countField(responses, 'q3_body_type');
        const triedWeightLoss = countField(responses, 'q5_tried_weight_loss');
        const consistency = countField(responses, 'q8_consistency_duration');
        const heardInjections = countField(responses, 'q10_heard_about_injections');
        const considerUsing = countField(responses, 'q13_consider_using');
        const supportFamily = countField(responses, 'q18_support_family');
        const useApps = countField(responses, 'q20_use_apps');
        const wouldUseApp = countField(responses, 'q23_would_use_app');
        const wouldPay = countField(responses, 'q25_would_pay');
        const monthlyAmount = countField(responses, 'q26_monthly_amount');
        const methods = countField(responses, 'q6_methods');
        const concerns = countField(responses, 'q14_concerns');
        const supportType = countField(responses, 'q22_support_type');
        const familyMembers = countField(responses, 'q15_family_members');
        const relativesKnow = countField(responses, 'q16_relatives_know');
        const knowAnyone = countField(responses, 'q17_know_anyone');
        const whereHeard = countField(responses, 'q11_where_heard');

        // Medical conditions — parse free-text field
        const medicalConditions: Record<string, number> = {};
        for (const r of responses) {
            const val = String(r.q4_medical_conditions ?? '').trim();
            if (val && val.toLowerCase() !== 'none' && val !== '—') {
                // split on commas, slashes, etc.
                const parts = val.split(/[,\/;]+/).map((s) => s.trim()).filter(Boolean);
                for (const p of parts) {
                    const key = p.charAt(0).toUpperCase() + p.slice(1).toLowerCase();
                    medicalConditions[key] = (medicalConditions[key] || 0) + 1;
                }
            }
        }

        // Timeline — responses per day
        const timeline: Record<string, number> = {};
        for (const r of responses) {
            if (r.submitted_at) {
                const day = String(r.submitted_at).slice(0, 10); // YYYY-MM-DD
                timeline[day] = (timeline[day] || 0) + 1;
            }
        }

        // Demographic summary stats
        const overweightCount = (bodyTypeData['Slightly overweight'] || 0) + (bodyTypeData['Overweight'] || 0);
        const overweightPct = total > 0 ? Math.round((overweightCount / total) * 100) : 0;
        const triedYes = (triedWeightLoss['Yes, multiple times'] || 0) + (triedWeightLoss['Yes, once'] || 0);
        const triedPct = total > 0 ? Math.round((triedYes / total) * 100) : 0;
        const hasMedicalCount = Object.values(medicalConditions).reduce((a, b) => a + b, 0);

        // Headline metrics
        const yesOrMaybeUseApp = (wouldUseApp['Yes'] || 0) + (wouldUseApp['Maybe'] || 0);
        const appInterestPct = total > 0 ? Math.round((yesOrMaybeUseApp / total) * 100) : 0;

        const yesOrMaybePay = (wouldPay['Yes'] || 0) + (wouldPay['Maybe'] || 0);
        const payWillingnessPct = total > 0 ? Math.round((yesOrMaybePay / total) * 100) : 0;

        const heardYes = heardInjections['Yes'] || 0;
        const awarenessPct = total > 0 ? Math.round((heardYes / total) * 100) : 0;

        return {
            total, ageData, genderData, bodyTypeData, triedWeightLoss, consistency,
            heardInjections, considerUsing, supportFamily, useApps, wouldUseApp,
            wouldPay, monthlyAmount, methods, concerns, supportType, familyMembers,
            relativesKnow, knowAnyone, whereHeard, medicalConditions, timeline,
            overweightPct, triedPct, hasMedicalCount,
            appInterestPct, payWillingnessPct, awarenessPct,
        };
    }, [responses]);

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
        const header = allKeys.map((k) => QUESTION_LABELS[k] || k).join(',');
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
                <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-slate-900">
                            <BarChart3 className="w-4.5 h-4.5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-base font-bold text-gray-900">Survey Analytics</h1>
                            <p className="text-[11px] text-gray-400">EnteraFlux Research Dashboard</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
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
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 py-6">
                {/* ── Error ── */}
                {error && (
                    <div className="mb-6 flex items-center gap-2 p-4 rounded-xl bg-red-50 border border-red-200">
                        <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                        <p className="text-sm text-red-600">{error}</p>
                    </div>
                )}

                {/* ── Loading ── */}
                {loading && (
                    <div className="flex items-center justify-center py-32">
                        <div className="text-center">
                            <Loader2 className="w-8 h-8 animate-spin text-gray-300 mx-auto mb-3" />
                            <p className="text-sm text-gray-400">Loading survey data...</p>
                        </div>
                    </div>
                )}

                {!loading && (
                    <>
                        {/* ── Headline Stats ── */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                            <StatCard label="Total Responses" value={analytics.total} icon={Users} color="bg-blue-600" />
                            <StatCard label="App Interest" value={`${analytics.appInterestPct}%`} sub="Yes + Maybe" icon={TrendingUp} color="bg-emerald-600" />
                            <StatCard label="Pay Willingness" value={`${analytics.payWillingnessPct}%`} sub="Yes + Maybe" icon={Activity} color="bg-violet-600" />
                            <StatCard label="Awareness" value={`${analytics.awarenessPct}%`} sub="Heard of injections" icon={Eye} color="bg-amber-600" />
                        </div>

                        {/* ── Tab Navigation ── */}
                        <div className="flex items-center gap-1 mb-6 bg-white rounded-lg border border-gray-200 p-1 w-fit">
                            <button
                                onClick={() => setActiveTab('analytics')}
                                className={`flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${activeTab === 'analytics'
                                    ? 'bg-slate-900 text-white'
                                    : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                <PieChart className="w-3.5 h-3.5" />
                                Analytics
                            </button>
                            <button
                                onClick={() => setActiveTab('responses')}
                                className={`flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${activeTab === 'responses'
                                    ? 'bg-slate-900 text-white'
                                    : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                <Eye className="w-3.5 h-3.5" />
                                Responses ({responses.length})
                            </button>
                        </div>

                        {/* ═══ Analytics Tab ═══ */}
                        {activeTab === 'analytics' && (
                            <div className="space-y-6">
                                {/* Section 1: Demographics */}
                                <div>
                                    <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Demographics</h2>
                                    {/* Demographic overview summary */}
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                                        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
                                            <p className="text-2xl font-bold text-gray-900">{analytics.overweightPct}%</p>
                                            <p className="text-[11px] text-gray-500 mt-0.5">Overweight / Slightly</p>
                                        </div>
                                        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
                                            <p className="text-2xl font-bold text-gray-900">{analytics.triedPct}%</p>
                                            <p className="text-[11px] text-gray-500 mt-0.5">Tried Weight Loss</p>
                                        </div>
                                        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
                                            <p className="text-2xl font-bold text-gray-900">{analytics.hasMedicalCount}</p>
                                            <p className="text-[11px] text-gray-500 mt-0.5">Medical Conditions</p>
                                        </div>
                                        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
                                            <p className="text-2xl font-bold text-gray-900">{Object.keys(analytics.timeline).length}</p>
                                            <p className="text-[11px] text-gray-500 mt-0.5">Active Days</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                        <DistributionChart title="Age Distribution" icon={Users} data={analytics.ageData} total={analytics.total} />
                                        <DistributionChart title="Gender" icon={Users} data={analytics.genderData} total={analytics.total} />
                                        <DistributionChart title="Body Type" icon={Activity} data={analytics.bodyTypeData} total={analytics.total} />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {Object.keys(analytics.medicalConditions).length > 0 && (
                                            <DistributionChart title="Medical Conditions" icon={Activity} data={analytics.medicalConditions} total={analytics.total} />
                                        )}
                                        {/* Response Timeline */}
                                        <div className="bg-white rounded-xl border border-gray-200 p-5 md:col-span-2">
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center gap-2">
                                                    <Clock className="w-4 h-4 text-gray-400" />
                                                    <h3 className="text-sm font-semibold text-gray-700">Response Timeline</h3>
                                                </div>
                                                <span className="text-xs text-gray-400">{analytics.total} total</span>
                                            </div>
                                            {Object.keys(analytics.timeline).length > 0 ? (
                                                <div className="flex items-end gap-1.5 h-24">
                                                    {Object.entries(analytics.timeline).sort().map(([day, count]) => {
                                                        const maxInTimeline = Math.max(...Object.values(analytics.timeline));
                                                        const heightPct = maxInTimeline > 0 ? (count / maxInTimeline) * 100 : 0;
                                                        return (
                                                            <div key={day} className="flex-1 flex flex-col items-center gap-1 min-w-0">
                                                                <span className="text-[10px] font-semibold text-gray-600">{count}</span>
                                                                <div
                                                                    className="w-full rounded-t-md bg-blue-500 transition-all duration-500 min-h-[4px]"
                                                                    style={{ height: `${Math.max(heightPct, 5)}%` }}
                                                                    title={`${day}: ${count} responses`}
                                                                />
                                                                <span className="text-[9px] text-gray-400 truncate w-full text-center">{day.slice(5)}</span>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            ) : (
                                                <p className="text-xs text-gray-400">No timeline data</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Section 2: Weight Loss Behavior */}
                                <div>
                                    <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Weight Loss Behavior</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <DistributionChart title="Tried Weight Loss" icon={TrendingUp} data={analytics.triedWeightLoss} total={analytics.total} />
                                        <DistributionChart title="Methods Used" icon={Activity} data={analytics.methods} total={analytics.total} />
                                        <DistributionChart title="Consistency Duration" icon={Clock} data={analytics.consistency} total={analytics.total} />
                                    </div>
                                </div>

                                {/* Section 3: Medication Perception */}
                                <div>
                                    <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Medication Perception</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <DistributionChart title="Heard About Injections" icon={Eye} data={analytics.heardInjections} total={analytics.total} />
                                        <DistributionChart title="Would Consider Using" icon={TrendingUp} data={analytics.considerUsing} total={analytics.total} />
                                        <DistributionChart title="Concerns" icon={AlertCircle} data={analytics.concerns} total={analytics.total} />
                                    </div>
                                </div>

                                {/* Section 4: Family & Social */}
                                <div>
                                    <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Family & Social Influence</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <DistributionChart title="Family Health History" icon={Users} data={analytics.familyMembers} total={analytics.total} />
                                        <DistributionChart title="Support Family Member" icon={Users} data={analytics.supportFamily} total={analytics.total} />
                                        <DistributionChart title="Use Health Apps" icon={Activity} data={analytics.useApps} total={analytics.total} />
                                    </div>
                                </div>

                                {/* Section 5: Business Viability */}
                                <div>
                                    <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Business Viability</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <DistributionChart title="Would Use App" icon={TrendingUp} data={analytics.wouldUseApp} total={analytics.total} />
                                        <DistributionChart title="Would Pay" icon={Activity} data={analytics.wouldPay} total={analytics.total} />
                                        <DistributionChart title="Monthly Budget" icon={BarChart3} data={analytics.monthlyAmount} total={analytics.total} />
                                    </div>
                                </div>

                                {/* Section 6: Support Preferences */}
                                <div>
                                    <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Support Preferences</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <DistributionChart title="Desired Support Type" icon={Users} data={analytics.supportType} total={analytics.total} />
                                        <div className="bg-white rounded-xl border border-gray-200 p-5">
                                            <div className="flex items-center gap-2 mb-4">
                                                <PieChart className="w-4 h-4 text-gray-400" />
                                                <h3 className="text-sm font-semibold text-gray-700">Key Takeaways</h3>
                                            </div>
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-emerald-50 border border-emerald-100">
                                                    <span className="text-xs text-gray-600">App Interest (Yes + Maybe)</span>
                                                    <span className="text-sm font-bold text-emerald-700">{analytics.appInterestPct}%</span>
                                                </div>
                                                <div className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-violet-50 border border-violet-100">
                                                    <span className="text-xs text-gray-600">Payment Willingness</span>
                                                    <span className="text-sm font-bold text-violet-700">{analytics.payWillingnessPct}%</span>
                                                </div>
                                                <div className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-amber-50 border border-amber-100">
                                                    <span className="text-xs text-gray-600">Medication Awareness</span>
                                                    <span className="text-sm font-bold text-amber-700">{analytics.awarenessPct}%</span>
                                                </div>
                                                <div className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-blue-50 border border-blue-100">
                                                    <span className="text-xs text-gray-600">Total Data Points</span>
                                                    <span className="text-sm font-bold text-blue-700">{analytics.total}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ═══ Responses Tab ═══ */}
                        {activeTab === 'responses' && (
                            <div>
                                {/* Search */}
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="flex-1 relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="text"
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            placeholder="Search by any field..."
                                            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm text-gray-900 placeholder-gray-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-500/20 focus:outline-none transition-colors"
                                        />
                                    </div>
                                    <span className="text-xs text-gray-400 shrink-0">
                                        {filtered.length} of {responses.length}
                                    </span>
                                </div>

                                {/* Empty */}
                                {filtered.length === 0 && (
                                    <div className="text-center py-16">
                                        <Users className="w-10 h-10 text-gray-200 mx-auto mb-3" />
                                        <p className="text-sm text-gray-400">
                                            {search ? 'No responses match your search.' : 'No responses yet.'}
                                        </p>
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
                <div className="text-center mt-12 pb-6">
                    <p className="text-[11px] text-gray-400">
                        © {new Date().getFullYear()} EnteraFlux — Admin Dashboard · Data refreshes on page load
                    </p>
                </div>
            </div>
        </div>
    );
}
