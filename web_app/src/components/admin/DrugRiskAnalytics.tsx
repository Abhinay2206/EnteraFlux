import { useMemo } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
    PieChart, Pie, Cell, Legend,
} from 'recharts';
import {
    Activity, AlertTriangle, Users, TrendingUp, ShieldCheck, Beaker, Lightbulb,
    Database, Brain, Sparkles, Zap, FileWarning, FlaskConical,
    ChevronRight, Search, HeartPulse, ShieldAlert, Dna, Pill,
} from 'lucide-react';
import StatCard from './StatCard';
import HeatmapTable from './HeatmapTable';
import { MiniLineChart } from './MiniBarChart';
import type {
    FaersRecord, GLP1Trial, AIInsight,
} from '../../utils/drugAnalyticsUtils';
import {
    computeDataOverview,
    getTopAdverseEvents,
    getSeverityDistribution,
    getRareCriticalEvents,
    getDemographicRiskHeatmap,
    getGenderDistribution,
    getAgeGroupDistribution,
    getTemporalTrends,
    getComparativeAnalysis,
    computeRiskScore,
    generateAIInsights,
    getTrialPhaseDistribution,
    getTrialStatusDistribution,
} from '../../utils/drugAnalyticsUtils';

/* ═══════════════════════════════════════════
   Props
   ═══════════════════════════════════════════ */

interface DrugRiskAnalyticsProps {
    faersData: FaersRecord[];
    trialsData: GLP1Trial[];
}

/* ─── Pie Chart Colors ─── */
const SEVERITY_COLORS: Record<string, string> = {
    Mild: '#22c55e',
    Moderate: '#f59e0b',
    Severe: '#ef4444',
    Fatal: '#1e1b4b',
};

const PIE_COLORS = ['#3b82f6', '#8b5cf6', '#06b6d4', '#f59e0b', '#ef4444', '#22c55e', '#ec4899', '#14b8a6'];

/* ─── Icon Map for AI Insights ─── */
const INSIGHT_ICONS: Record<string, React.ElementType> = {
    AlertTriangle, Users, Search, HeartPulse, ShieldAlert, Dna, Pill,
    Skull: FileWarning, // Using FileWarning as substitute
};

/* ─── Risk Gauge SVG ─── */
function RiskGauge({ score, level }: { score: number; level: string }) {
    const radius = 80;
    const stroke = 14;
    const normalizedRadius = radius - stroke / 2;
    const circumference = Math.PI * normalizedRadius; // half-circle
    const progress = (score / 100) * circumference;

    const levelColor: Record<string, string> = {
        Low: '#22c55e',
        Moderate: '#f59e0b',
        High: '#ef4444',
        Critical: '#7c2d12',
    };

    return (
        <div className="flex flex-col items-center">
            <svg width={radius * 2} height={radius + 16} viewBox={`0 0 ${radius * 2} ${radius + 16}`}>
                {/* Background arc */}
                <path
                    d={`M ${stroke / 2} ${radius} A ${normalizedRadius} ${normalizedRadius} 0 0 1 ${radius * 2 - stroke / 2} ${radius}`}
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth={stroke}
                    strokeLinecap="round"
                />
                {/* Progress arc */}
                <path
                    d={`M ${stroke / 2} ${radius} A ${normalizedRadius} ${normalizedRadius} 0 0 1 ${radius * 2 - stroke / 2} ${radius}`}
                    fill="none"
                    stroke={levelColor[level] || '#3b82f6'}
                    strokeWidth={stroke}
                    strokeLinecap="round"
                    strokeDasharray={`${progress} ${circumference}`}
                    style={{ transition: 'stroke-dasharray 1s ease-out' }}
                />
                {/* Score text */}
                <text x={radius} y={radius - 12} textAnchor="middle" className="text-3xl font-bold" fill="#1e293b" fontSize="36" fontWeight="800">{score}</text>
                <text x={radius} y={radius + 10} textAnchor="middle" fill={levelColor[level] || '#64748b'} fontSize="13" fontWeight="600">{level} Risk</text>
            </svg>
        </div>
    );
}

/* ═══════════════════════════════════════════
   Main Component
   ═══════════════════════════════════════════ */

export default function DrugRiskAnalytics({ faersData, trialsData }: DrugRiskAnalyticsProps) {
    // ── Compute all analytics ──
    const overview = useMemo(() => computeDataOverview(faersData, trialsData), [faersData, trialsData]);
    const topEvents = useMemo(() => getTopAdverseEvents(faersData), [faersData]);
    const severityDist = useMemo(() => getSeverityDistribution(faersData), [faersData]);
    const rareEvents = useMemo(() => getRareCriticalEvents(faersData), [faersData]);
    const heatmap = useMemo(() => getDemographicRiskHeatmap(faersData), [faersData]);
    const genderDist = useMemo(() => getGenderDistribution(faersData), [faersData]);
    const ageDist = useMemo(() => getAgeGroupDistribution(faersData), [faersData]);
    const trends = useMemo(() => getTemporalTrends(faersData), [faersData]);
    const comparison = useMemo(() => getComparativeAnalysis(faersData, trialsData), [faersData, trialsData]);
    const riskScore = useMemo(() => computeRiskScore(faersData), [faersData]);
    const aiInsights = useMemo(() => generateAIInsights(faersData, trialsData), [faersData, trialsData]);
    const trialPhases = useMemo(() => getTrialPhaseDistribution(trialsData), [trialsData]);
    const trialStatuses = useMemo(() => getTrialStatusDistribution(trialsData), [trialsData]);

    const tagStyles: Record<string, string> = {
        positive: 'bg-emerald-50 border-emerald-200',
        warning: 'bg-amber-50 border-amber-200',
        critical: 'bg-red-50 border-red-200',
        neutral: 'bg-gray-50 border-gray-200',
    };

    const tagDot: Record<string, string> = {
        positive: 'bg-emerald-500',
        warning: 'bg-amber-500',
        critical: 'bg-red-500',
        neutral: 'bg-gray-400',
    };

    return (
        <div className="space-y-6 sm:space-y-8">

            {/* ═══ SECTION 1: Data Overview ═══ */}
            <section>
                <div className="flex items-center gap-2 mb-4">
                    <Database className="w-4 h-4 text-blue-500" />
                    <h2 className="text-sm sm:text-base font-bold text-gray-900">Data Overview</h2>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 font-medium">
                        {overview.faersTotal + overview.trialsTotal} total records
                    </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    <StatCard label="FAERS Reports" value={overview.faersTotal} sub={`${overview.faersFeatures} features`} icon={Activity} color="bg-blue-600" />
                    <StatCard label="Clinical Trials" value={overview.trialsTotal} sub={`${overview.trialsFeatures} features`} icon={Beaker} color="bg-emerald-600" />
                    <StatCard label="Unique Reactions" value={overview.uniqueReactions} sub="Distinct adverse events" icon={AlertTriangle} color="bg-rose-600" />
                    <StatCard label="Unique Drugs" value={overview.uniqueDrugs} sub="Across datasets" icon={FlaskConical} color="bg-violet-600" />
                    <StatCard label="FAERS Missing" value={`${overview.faersMissingPct}%`} sub="Data completeness" icon={FileWarning} color="bg-amber-600" />
                    <StatCard label="Date Range" value={overview.dateRange} sub="Monitoring period" icon={TrendingUp} color="bg-cyan-600" />
                </div>
            </section>

            {/* ═══ SECTION 2: Adverse Event Analysis ═══ */}
            <section>
                <div className="flex items-center gap-2 mb-4">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    <h2 className="text-sm sm:text-base font-bold text-gray-900">Adverse Event Analysis</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Top Adverse Events — Bar Chart (takes 2 cols) */}
                    <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-4 sm:p-5">
                        <h3 className="text-xs sm:text-sm font-semibold text-gray-700 mb-4">Top 15 Adverse Events (FAERS)</h3>
                        {topEvents.length > 0 ? (
                            <ResponsiveContainer width="100%" height={380}>
                                <BarChart data={topEvents} layout="vertical" margin={{ top: 5, right: 30, bottom: 5, left: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                    <XAxis type="number" tick={{ fontSize: 10, fill: '#94a3b8' }} />
                                    <YAxis dataKey="label" type="category" width={130} tick={{ fontSize: 10, fill: '#475569' }} />
                                    <Tooltip
                                        contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid #e2e8f0' }}
                                        formatter={(val: number | undefined) => [`${val ?? 0} reports`, 'Count']}
                                    />
                                    <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <p className="text-xs text-gray-400 py-8 text-center">No adverse event data available</p>
                        )}
                    </div>

                    {/* Severity Distribution — Pie Chart */}
                    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5">
                        <h3 className="text-xs sm:text-sm font-semibold text-gray-700 mb-4">Severity Distribution</h3>
                        {severityDist.some((d) => d.value > 0) ? (
                            <>
                                <ResponsiveContainer width="100%" height={220}>
                                    <PieChart>
                                        <Pie
                                            data={severityDist}
                                            dataKey="value"
                                            nameKey="label"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={80}
                                            innerRadius={45}
                                            paddingAngle={3}
                                            strokeWidth={0}
                                        >
                                            {severityDist.map((entry) => (
                                                <Cell key={entry.label} fill={SEVERITY_COLORS[entry.label] || '#94a3b8'} />
                                            ))}
                                        </Pie>
                                        <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid #e2e8f0' }} />
                                        <Legend
                                            iconType="circle"
                                            iconSize={8}
                                            wrapperStyle={{ fontSize: 11 }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                                {/* Stats */}
                                <div className="grid grid-cols-2 gap-2 mt-3">
                                    {severityDist.map((d) => (
                                        <div key={d.label} className="text-center px-2 py-1.5 rounded-lg bg-gray-50">
                                            <p className="text-lg font-bold text-gray-900">{d.pct}%</p>
                                            <p className="text-[9px] uppercase tracking-wider font-medium" style={{ color: SEVERITY_COLORS[d.label] }}>{d.label}</p>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <p className="text-xs text-gray-400 py-8 text-center">No severity data</p>
                        )}
                    </div>
                </div>

                {/* Rare Critical Events */}
                {rareEvents.length > 0 && (
                    <div className="mt-4 bg-red-50 rounded-xl border border-red-200 p-4 sm:p-5">
                        <div className="flex items-center gap-2 mb-3">
                            <ShieldAlert className="w-4 h-4 text-red-500" />
                            <h3 className="text-xs sm:text-sm font-semibold text-red-800">Rare But Critical Events</h3>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-100 text-red-600 font-medium">Safety Signal</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {rareEvents.map((e) => (
                                <span key={e.label} className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white border border-red-200 text-xs text-red-700 font-medium">
                                    <AlertTriangle className="w-3 h-3" />
                                    {e.label} <span className="text-red-400">({e.value})</span>
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </section>

            {/* ═══ SECTION 3: Demographic Insights ═══ */}
            <section>
                <div className="flex items-center gap-2 mb-4">
                    <Users className="w-4 h-4 text-violet-500" />
                    <h2 className="text-sm sm:text-base font-bold text-gray-900">Demographic Insights</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Heatmap: Age × Gender */}
                    <HeatmapTable
                        title="Risk by Age Group × Gender"
                        icon={Activity}
                        rows={heatmap}
                        valueLabel=" reports"
                    />

                    {/* Gender + Age Distribution */}
                    <div className="space-y-4">
                        {/* Gender dist */}
                        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5">
                            <h3 className="text-xs sm:text-sm font-semibold text-gray-700 mb-3">Gender Distribution</h3>
                            <div className="space-y-2">
                                {genderDist.map((d, i) => (
                                    <div key={d.label} className="flex items-center gap-3">
                                        <span className="text-xs text-gray-600 w-16 shrink-0">{d.label}</span>
                                        <div className="flex-1 bg-gray-100 rounded-full h-5 overflow-hidden">
                                            <div
                                                className="h-full rounded-full flex items-center justify-end pr-2 transition-all duration-700"
                                                style={{
                                                    width: `${d.pct || 0}%`,
                                                    backgroundColor: PIE_COLORS[i % PIE_COLORS.length],
                                                    minWidth: d.pct && d.pct > 0 ? '32px' : '0',
                                                }}
                                            >
                                                <span className="text-[10px] text-white font-bold">{d.pct}%</span>
                                            </div>
                                        </div>
                                        <span className="text-[10px] text-gray-400 w-12 text-right">{d.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Age group dist */}
                        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5">
                            <h3 className="text-xs sm:text-sm font-semibold text-gray-700 mb-3">Age Group Distribution</h3>
                            <div className="space-y-2">
                                {ageDist.map((d, i) => (
                                    <div key={d.label} className="flex items-center gap-3">
                                        <span className="text-xs text-gray-600 w-12 shrink-0">{d.label}</span>
                                        <div className="flex-1 bg-gray-100 rounded-full h-4 overflow-hidden">
                                            <div
                                                className="h-full rounded-full transition-all duration-700"
                                                style={{
                                                    width: `${d.pct || 0}%`,
                                                    backgroundColor: PIE_COLORS[(i + 2) % PIE_COLORS.length],
                                                    minWidth: d.pct && d.pct > 0 ? '8px' : '0',
                                                }}
                                            />
                                        </div>
                                        <span className="text-[10px] text-gray-500 w-16 text-right">{d.pct}% ({d.value})</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ SECTION 4: Temporal Trends ═══ */}
            <section>
                <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-4 h-4 text-cyan-500" />
                    <h2 className="text-sm sm:text-base font-bold text-gray-900">Temporal / Trend Analysis</h2>
                </div>

                <MiniLineChart
                    title="Adverse Event Reports Over Time"
                    icon={Activity}
                    data={trends}
                    color="#3b82f6"
                    color2="#ef4444"
                    height={250}
                    legend1="All Reports"
                    legend2="Serious Events"
                />
            </section>

            {/* ═══ SECTION 5: Comparative Analysis ═══ */}
            <section>
                <div className="flex items-center gap-2 mb-4">
                    <Zap className="w-4 h-4 text-amber-500" />
                    <h2 className="text-sm sm:text-base font-bold text-gray-900">FAERS vs Clinical Trials — Comparative Analysis</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Comparison table (2 cols) */}
                    <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-4 sm:p-5">
                        <h3 className="text-xs sm:text-sm font-semibold text-gray-700 mb-4">Data Source Comparison</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-xs">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="text-left py-2 pr-3 text-gray-500 font-medium">Metric</th>
                                        <th className="text-left py-2 px-3 text-blue-600 font-medium">FAERS (Real-World)</th>
                                        <th className="text-left py-2 px-3 text-emerald-600 font-medium">Clinical Trials</th>
                                        <th className="text-left py-2 pl-3 text-gray-500 font-medium">Key Discrepancy</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {comparison.map((m) => (
                                        <tr key={m.metric} className="border-b border-gray-50">
                                            <td className="py-2.5 pr-3 font-medium text-gray-800">{m.metric}</td>
                                            <td className="py-2.5 px-3 text-gray-600">{m.faersValue}</td>
                                            <td className="py-2.5 px-3 text-gray-600">{m.trialsValue}</td>
                                            <td className="py-2.5 pl-3">
                                                <span className={`inline-flex items-center gap-1 text-[10px] font-medium ${m.flag === 'major'
                                                        ? 'text-red-600'
                                                        : m.flag === 'minor'
                                                            ? 'text-amber-600'
                                                            : 'text-gray-400'
                                                    }`}>
                                                    {m.flag === 'major' && <AlertTriangle className="w-3 h-3" />}
                                                    {m.discrepancy}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-4 p-3 rounded-lg bg-amber-50 border border-amber-200">
                            <p className="text-[11px] text-amber-800 font-medium">
                                <AlertTriangle className="w-3 h-3 inline mr-1" />
                                <strong>Why Real-World Data Matters:</strong> Clinical trials are controlled, short-duration, and exclude high-risk populations. FAERS captures adverse events from diverse, real-world patients — revealing risks that trials miss.
                            </p>
                        </div>
                    </div>

                    {/* Trial Phase & Status breakdown */}
                    <div className="space-y-4">
                        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5">
                            <h3 className="text-xs sm:text-sm font-semibold text-gray-700 mb-3">Trial Phases</h3>
                            <div className="space-y-2">
                                {trialPhases.slice(0, 6).map((d, i) => (
                                    <div key={d.label} className="flex items-center justify-between px-2 py-1.5 rounded-lg bg-gray-50">
                                        <div className="flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }} />
                                            <span className="text-xs text-gray-700">{d.label}</span>
                                        </div>
                                        <span className="text-xs font-semibold text-gray-900">{d.value} <span className="text-gray-400 font-normal">({d.pct}%)</span></span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5">
                            <h3 className="text-xs sm:text-sm font-semibold text-gray-700 mb-3">Trial Status</h3>
                            <div className="space-y-2">
                                {trialStatuses.slice(0, 5).map((d, i) => (
                                    <div key={d.label} className="flex items-center justify-between px-2 py-1.5 rounded-lg bg-gray-50">
                                        <div className="flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: PIE_COLORS[(i + 3) % PIE_COLORS.length] }} />
                                            <span className="text-xs text-gray-700 truncate max-w-[140px]">{d.label}</span>
                                        </div>
                                        <span className="text-xs font-semibold text-gray-900">{d.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ SECTION 6: EnteraFlux Risk Score ═══ */}
            <section>
                <div className="flex items-center gap-2 mb-4">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <h2 className="text-sm sm:text-base font-bold text-gray-900">EnteraFlux Risk Score</h2>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 font-medium">
                        AI-Computed
                    </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Gauge */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col items-center justify-center">
                        <RiskGauge score={riskScore.overallScore} level={riskScore.riskLevel} />
                        <p className="text-[10px] text-gray-400 mt-3 text-center">Composite score (0–100) based on frequency, severity, and demographics</p>
                    </div>

                    {/* Score Breakdown */}
                    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5">
                        <h3 className="text-xs sm:text-sm font-semibold text-gray-700 mb-4">Score Components</h3>
                        <div className="space-y-4">
                            {riskScore.components.map((c) => (
                                <div key={c.name}>
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-xs text-gray-600">{c.name}</span>
                                        <span className="text-xs font-semibold text-gray-900">{c.rawValue}/100 <span className="text-gray-400 font-normal">× {c.weight}</span></span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                                        <div
                                            className="h-full rounded-full transition-all duration-1000"
                                            style={{
                                                width: `${c.rawValue}%`,
                                                backgroundColor: c.rawValue > 70 ? '#ef4444' : c.rawValue > 40 ? '#f59e0b' : '#22c55e',
                                            }}
                                        />
                                    </div>
                                    <p className="text-[10px] text-gray-400 mt-0.5 text-right">Weighted: {c.weightedValue} pts</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Formula + Explanation */}
                    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5">
                        <h3 className="text-xs sm:text-sm font-semibold text-gray-700 mb-4">Methodology</h3>
                        <div className="space-y-3">
                            <div className="p-3 rounded-lg bg-slate-900 text-white">
                                <p className="text-[10px] font-mono leading-relaxed">{riskScore.formula}</p>
                            </div>
                            <div className="space-y-2 text-[11px] text-gray-600 leading-relaxed">
                                <div className="flex items-start gap-2">
                                    <ChevronRight className="w-3 h-3 text-blue-500 mt-0.5 shrink-0" />
                                    <p><strong className="text-gray-800">Frequency:</strong> Adverse events per 100 reports, normalized to 0–100 scale</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <ChevronRight className="w-3 h-3 text-amber-500 mt-0.5 shrink-0" />
                                    <p><strong className="text-gray-800">Severity:</strong> Weighted average (Mild=1, Moderate=3, Severe=7, Fatal=10)</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <ChevronRight className="w-3 h-3 text-rose-500 mt-0.5 shrink-0" />
                                    <p><strong className="text-gray-800">Demographics:</strong> Proportion of vulnerable populations ({"<18 and ≥65"})</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ SECTION 7: AI-Powered Insights ═══ */}
            <section>
                <div className="flex items-center gap-2 mb-4">
                    <Brain className="w-4 h-4 text-violet-500" />
                    <h2 className="text-sm sm:text-base font-bold text-gray-900">AI-Powered Insights</h2>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-50 text-violet-600 font-medium">
                        {aiInsights.length} patterns detected
                    </span>
                </div>

                {aiInsights.length === 0 ? (
                    <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
                        <Sparkles className="w-8 h-8 text-gray-200 mx-auto mb-2" />
                        <p className="text-xs text-gray-400">No insights available — requires data</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {aiInsights.map((insight: AIInsight, i: number) => {
                            const Icon = INSIGHT_ICONS[insight.icon] || Lightbulb;
                            return (
                                <div
                                    key={i}
                                    className={`flex items-start gap-3 p-4 rounded-xl border transition-all hover:shadow-sm ${tagStyles[insight.tag]}`}
                                >
                                    <div className={`flex items-center justify-center w-8 h-8 rounded-lg shrink-0 ${insight.tag === 'critical' ? 'bg-red-100' :
                                            insight.tag === 'warning' ? 'bg-amber-100' :
                                                insight.tag === 'positive' ? 'bg-emerald-100' : 'bg-gray-100'
                                        }`}>
                                        <Icon className={`w-4 h-4 ${insight.tag === 'critical' ? 'text-red-600' :
                                                insight.tag === 'warning' ? 'text-amber-600' :
                                                    insight.tag === 'positive' ? 'text-emerald-600' : 'text-gray-500'
                                            }`} />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-xs font-semibold text-gray-800">{insight.title}</span>
                                            <span className={`w-1.5 h-1.5 rounded-full ${tagDot[insight.tag]}`} />
                                        </div>
                                        <p className="text-[11px] text-gray-600 leading-relaxed">{insight.detail}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>

        </div>
    );
}
