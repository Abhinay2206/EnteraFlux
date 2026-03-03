import { useMemo } from 'react';
import {
    Activity, Users, TrendingUp, AlertCircle, BarChart3,
    Shield, FileCheck, CheckCircle2, XCircle,
} from 'lucide-react';
import DistributionChart from './DistributionChart';
import HeatmapTable from './HeatmapTable';
import {
    type SurveyResponse,
    getRiskGroups,
    getCorrelationMatrix,
    getHypothesisTests,
    getStatSummary,
    getDataQuality,
    getCrossTabByField,
    countField,
} from '../../utils/analyticsUtils';

interface ResearchAnalyticsProps {
    responses: SurveyResponse[];
}

export default function ResearchAnalytics({ responses }: ResearchAnalyticsProps) {
    const total = responses.length;
    const riskGroups = useMemo(() => getRiskGroups(responses), [responses]);
    const correlations = useMemo(() => getCorrelationMatrix(responses), [responses]);
    const hypotheses = useMemo(() => getHypothesisTests(responses), [responses]);
    const stats = useMemo(() => getStatSummary(responses), [responses]);
    const dataQuality = useMemo(() => getDataQuality(responses), [responses]);

    // Demographic deep analysis cross-tabs
    const payByAge = useMemo(() => getCrossTabByField(responses, 'q1_age'), [responses]);
    const payByGender = useMemo(() => getCrossTabByField(responses, 'q2_gender'), [responses]);
    const payByBodyType = useMemo(() => getCrossTabByField(responses, 'q3_body_type'), [responses]);

    // Distributions
    const triedWL = useMemo(() => countField(responses, 'q5_tried_weight_loss'), [responses]);
    const bodyTypeData = useMemo(() => countField(responses, 'q3_body_type'), [responses]);

    // Build heatmap rows for demographics
    const maxPayPct = Math.max(...payByAge.map((r) => r.payPct), ...payByGender.map((r) => r.payPct), ...payByBodyType.map((r) => r.payPct), 1);
    const maxInterestPct = Math.max(...payByAge.map((r) => r.interestPct), ...payByGender.map((r) => r.interestPct), ...payByBodyType.map((r) => r.interestPct), 1);
    const maxAwarePct = Math.max(...payByAge.map((r) => r.awarenessPct), ...payByGender.map((r) => r.awarenessPct), ...payByBodyType.map((r) => r.awarenessPct), 1);

    function buildHeatRows(data: typeof payByAge) {
        return data.map((row) => ({
            label: `${row.segment} (${row.total})`,
            values: [
                { label: 'Pay %', value: row.payPct, maxValue: maxPayPct },
                { label: 'Interest %', value: row.interestPct, maxValue: maxInterestPct },
                { label: 'Aware %', value: row.awarenessPct, maxValue: maxAwarePct },
            ],
        }));
    }

    // Risk-based awareness cross-tab
    const riskAwarenessRows = riskGroups.map((g) => ({
        label: `${g.level} Risk (${g.count})`,
        values: [
            { label: 'Interest %', value: g.interestPct, maxValue: 100 },
            { label: 'Pay %', value: g.payPct, maxValue: 100 },
            { label: 'Segment %', value: g.pct, maxValue: 100 },
        ],
    }));

    return (
        <div className="space-y-6">

            {/* ═══ Risk Stratification Engine ═══ */}
            <div>
                <h3 className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5" /> Risk Stratification Engine
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {riskGroups.map((g) => {
                        const colorMap = { High: 'rose', Medium: 'amber', Low: 'emerald' };
                        const c = colorMap[g.level] || 'gray';
                        return (
                            <div key={g.level} className={`bg-white rounded-xl border border-gray-200 p-4 sm:p-5`}>
                                <div className="flex items-center justify-between mb-3">
                                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full bg-${c}-100 text-${c}-700`}>
                                        {g.level} Risk
                                    </span>
                                    <span className="text-lg sm:text-xl font-bold text-gray-900">{g.count}</span>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-[10px] sm:text-xs">
                                        <span className="text-gray-500">% of Sample</span>
                                        <span className="font-semibold text-gray-700">{g.pct}%</span>
                                    </div>
                                    <div className="flex items-center justify-between text-[10px] sm:text-xs">
                                        <span className="text-gray-500">Interest Rate</span>
                                        <span className="font-semibold text-emerald-600">{g.interestPct}%</span>
                                    </div>
                                    <div className="flex items-center justify-between text-[10px] sm:text-xs">
                                        <span className="text-gray-500">Pay Willingness</span>
                                        <span className="font-semibold text-violet-600">{g.payPct}%</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* ═══ Demographic Deep Analysis ═══ */}
            <div>
                <h3 className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" /> Demographic Deep Analysis
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <HeatmapTable title="Pay / Interest / Awareness by Age" icon={BarChart3} rows={buildHeatRows(payByAge)} />
                    <HeatmapTable title="Pay / Interest / Awareness by Gender" icon={Users} rows={buildHeatRows(payByGender)} />
                    <HeatmapTable title="Pay / Interest / Awareness by Body Type" icon={Activity} rows={buildHeatRows(payByBodyType)} />
                    <HeatmapTable title="Interest & Pay by Risk Group" icon={Shield} rows={riskAwarenessRows} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <DistributionChart title="Interest by Tried Weight Loss" icon={TrendingUp} data={triedWL} total={total} />
                    <DistributionChart title="Body Type Distribution" icon={Activity} data={bodyTypeData} total={total} />
                </div>
            </div>

            {/* ═══ Correlation Matrix ═══ */}
            <div>
                <h3 className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5" /> Correlation Matrix
                </h3>
                <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5">
                    <div className="overflow-x-auto -mx-2 px-2">
                        <table className="w-full text-[10px] sm:text-xs">
                            <thead>
                                <tr className="border-b border-gray-100">
                                    <th className="text-left text-gray-500 font-medium pb-2.5 pr-4">Relationship</th>
                                    <th className="text-center text-gray-500 font-medium pb-2.5 px-2">Phi (φ)</th>
                                    <th className="text-center text-gray-500 font-medium pb-2.5 px-2">Strength</th>
                                    <th className="text-center text-gray-500 font-medium pb-2.5 px-2 hidden sm:table-cell">Direction</th>
                                </tr>
                            </thead>
                            <tbody>
                                {correlations.map((c) => {
                                    const strengthColor = {
                                        Strong: 'bg-emerald-100 text-emerald-700',
                                        Moderate: 'bg-blue-100 text-blue-700',
                                        Weak: 'bg-amber-100 text-amber-700',
                                        None: 'bg-gray-100 text-gray-500',
                                    }[c.strength];
                                    return (
                                        <tr key={c.label} className="border-b border-gray-50 last:border-0">
                                            <td className="text-gray-700 font-medium py-2.5 pr-4">{c.label}</td>
                                            <td className="text-center py-2.5 px-2">
                                                <span className="font-mono font-bold text-gray-900">{c.phi.toFixed(2)}</span>
                                            </td>
                                            <td className="text-center py-2.5 px-2">
                                                <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium ${strengthColor}`}>
                                                    {c.strength}
                                                </span>
                                            </td>
                                            <td className="text-center py-2.5 px-2 hidden sm:table-cell">
                                                <span className={`text-[10px] sm:text-xs ${c.phi > 0 ? 'text-emerald-600' : c.phi < 0 ? 'text-red-500' : 'text-gray-400'}`}>
                                                    {c.phi > 0 ? '↑ Positive' : c.phi < 0 ? '↓ Negative' : '— Neutral'}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* ═══ Hypothesis Testing ═══ */}
            <div>
                <h3 className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5" /> Hypothesis Testing Module
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {hypotheses.map((h) => (
                        <div key={h.id} className={`bg-white rounded-xl border p-4 sm:p-5 ${h.accepted ? 'border-emerald-200' : 'border-red-200'}`}>
                            <div className="flex items-start justify-between mb-3">
                                <span className="text-xs sm:text-sm font-bold text-gray-900">{h.id}</span>
                                {h.accepted ? (
                                    <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                                        <CheckCircle2 className="w-3 h-3" /> Accepted
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-1 text-[10px] font-semibold text-red-500 bg-red-50 px-2 py-1 rounded-full">
                                        <XCircle className="w-3 h-3" /> Rejected
                                    </span>
                                )}
                            </div>
                            <p className="text-[10px] sm:text-xs text-gray-600 mb-3">{h.hypothesis}</p>
                            <div className="flex items-center gap-4 text-[10px] sm:text-xs">
                                <div>
                                    <span className="text-gray-400 block">χ² Value</span>
                                    <span className="font-mono font-bold text-gray-900">{h.chiSquare}</span>
                                </div>
                                <div>
                                    <span className="text-gray-400 block">p-value</span>
                                    <span className={`font-mono font-bold ${h.pValue < 0.05 ? 'text-emerald-600' : 'text-red-500'}`}>
                                        {h.pValue < 0.001 ? '<0.001' : h.pValue.toFixed(4)}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-gray-400 block">Significance</span>
                                    <span className="font-medium text-gray-700">{h.pValue < 0.05 ? 'p < 0.05' : 'p ≥ 0.05'}</span>
                                </div>
                            </div>
                            <p className="text-[10px] text-gray-400 mt-3 border-t border-gray-100 pt-2">{h.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* ═══ Statistical Summary + Data Quality ═══ */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Statistical Summary */}
                <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5">
                    <div className="flex items-center gap-2 mb-4">
                        <BarChart3 className="w-4 h-4 text-gray-400" />
                        <h3 className="text-xs sm:text-sm font-semibold text-gray-700">Statistical Summary</h3>
                    </div>
                    <div className="space-y-2.5">
                        <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-gray-50">
                            <span className="text-[10px] sm:text-xs text-gray-500">Sample Size (n)</span>
                            <span className="text-xs sm:text-sm font-bold text-gray-900">{stats.sampleSize}</span>
                        </div>
                        <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-gray-50">
                            <span className="text-[10px] sm:text-xs text-gray-500">Mean Age</span>
                            <span className="text-xs sm:text-sm font-bold text-gray-900">{stats.meanAge}</span>
                        </div>
                        <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-gray-50">
                            <span className="text-[10px] sm:text-xs text-gray-500">Std Deviation</span>
                            <span className="text-xs sm:text-sm font-bold text-gray-900">±{stats.stdAge}</span>
                        </div>
                        <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-blue-50 border border-blue-100">
                            <span className="text-[10px] sm:text-xs text-gray-600">95% CI</span>
                            <span className="text-xs sm:text-sm font-bold text-blue-700">[{stats.ci95Lower}, {stats.ci95Upper}]</span>
                        </div>
                        <div className="px-3 py-2 rounded-lg bg-amber-50 border border-amber-100">
                            <span className="text-[10px] sm:text-xs text-amber-700 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3 shrink-0" />
                                {stats.biasNote}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Data Quality Metrics */}
                <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5">
                    <div className="flex items-center gap-2 mb-4">
                        <FileCheck className="w-4 h-4 text-gray-400" />
                        <h3 className="text-xs sm:text-sm font-semibold text-gray-700">Data Quality Metrics</h3>
                    </div>
                    <div className="space-y-2.5 mb-4">
                        <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-gray-50">
                            <span className="text-[10px] sm:text-xs text-gray-500">Overall Completion</span>
                            <span className="text-xs sm:text-sm font-bold text-gray-900">{dataQuality.overallCompletionRate}%</span>
                        </div>
                        <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-gray-50">
                            <span className="text-[10px] sm:text-xs text-gray-500">Avg Response Interval</span>
                            <span className="text-xs sm:text-sm font-bold text-gray-900">{dataQuality.avgResponseTimeEstimate}</span>
                        </div>
                        <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-gray-50">
                            <span className="text-[10px] sm:text-xs text-gray-500">Missing Data</span>
                            <span className="text-xs sm:text-sm font-bold text-gray-900">{dataQuality.totalMissingPct}%</span>
                        </div>
                    </div>

                    {/* Per-question dropdown */}
                    <details className="group">
                        <summary className="text-[10px] sm:text-xs font-medium text-blue-600 cursor-pointer hover:text-blue-700 transition-colors">
                            Drop-off per Question ({dataQuality.perQuestion.length} questions)
                        </summary>
                        <div className="mt-2 space-y-1.5 max-h-48 overflow-y-auto">
                            {dataQuality.perQuestion.map((q) => (
                                <div key={q.field} className="flex items-center justify-between px-2 py-1.5 rounded bg-gray-50 text-[10px]">
                                    <span className="text-gray-600 truncate max-w-[55%]">{q.question}</span>
                                    <div className="flex items-center gap-2 shrink-0">
                                        <div className="w-16 h-1.5 rounded-full bg-gray-200 overflow-hidden">
                                            <div
                                                className={`h-full rounded-full transition-all ${q.completionRate >= 90 ? 'bg-emerald-500' : q.completionRate >= 70 ? 'bg-amber-500' : 'bg-red-500'}`}
                                                style={{ width: `${q.completionRate}%` }}
                                            />
                                        </div>
                                        <span className="font-mono font-semibold text-gray-700 w-8 text-right">{q.completionRate}%</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </details>
                </div>
            </div>
        </div>
    );
}
