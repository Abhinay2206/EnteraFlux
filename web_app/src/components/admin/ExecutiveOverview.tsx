import { useMemo } from 'react';
import {
    Users, TrendingUp, Activity, Eye, Zap, Lightbulb, Sparkles,
    ArrowRight, AlertTriangle, ThumbsUp, ThumbsDown,
} from 'lucide-react';
import StatCard from './StatCard';
import FunnelChart from './FunnelChart';
import {
    type SurveyResponse,
    getConversionFunnel,
    getAvgEngagementScore,
    getRiskGroups,
    classifyRisk,
    countField,
} from '../../utils/analyticsUtils';

interface ExecutiveOverviewProps {
    responses: SurveyResponse[];
}

/* ─── Auto-generated insights engine ─── */

interface Insight {
    icon: React.ElementType;
    color: string;
    title: string;
    detail: string;
    tag: 'positive' | 'warning' | 'neutral';
}

function generateInsights(responses: SurveyResponse[]): Insight[] {
    const n = responses.length;
    if (n === 0) return [];

    const insights: Insight[] = [];

    // 1. Top concern
    const concerns = countField(responses, 'q14_concerns');
    const topConcern = Object.entries(concerns).sort((a, b) => b[1] - a[1])[0];
    if (topConcern) {
        const pct = Math.round((topConcern[1] / n) * 100);
        insights.push({
            icon: AlertTriangle,
            color: 'amber',
            title: 'Top Concern',
            detail: `"${topConcern[0]}" is the #1 concern — cited by ${pct}% of all respondents.`,
            tag: 'warning',
        });
    }

    // 2. Most popular method tried
    const methods = countField(responses, 'q6_methods');
    const topMethod = Object.entries(methods).sort((a, b) => b[1] - a[1])[0];
    if (topMethod) {
        const pct = Math.round((topMethod[1] / n) * 100);
        insights.push({
            icon: Activity,
            color: 'blue',
            title: 'Most Tried Method',
            detail: `"${topMethod[0]}" is the most popular weight-loss method (${pct}% of respondents).`,
            tag: 'neutral',
        });
    }

    // 3. App interest among those who tried WL
    const triedWL = responses.filter((r) => String(r.q5_tried_weight_loss || '').includes('Yes'));
    const triedAndInterested = triedWL.filter((r) => {
        const v = String(r.q23_would_use_app || '');
        return v === 'Yes' || v === 'Maybe';
    });
    if (triedWL.length > 0) {
        const pct = Math.round((triedAndInterested.length / triedWL.length) * 100);
        insights.push({
            icon: pct >= 60 ? ThumbsUp : ThumbsDown,
            color: pct >= 60 ? 'emerald' : 'rose',
            title: 'Tried WL → App Interest',
            detail: `${pct}% of people who tried weight loss are interested in the app (${triedAndInterested.length}/${triedWL.length}).`,
            tag: pct >= 60 ? 'positive' : 'warning',
        });
    }

    // 4. Awareness gap among high-risk
    const riskGroups = getRiskGroups(responses);
    const highRisk = riskGroups.find((g) => g.level === 'High');
    if (highRisk && highRisk.count > 0) {
        const highRiskResponses = responses.filter((r) => classifyRisk(r) === 'High');
        const unaware = highRiskResponses.filter((r) => String(r.q10_heard_about_injections || '') !== 'Yes');
        if (highRiskResponses.length > 0) {
            const pct = Math.round((unaware.length / highRiskResponses.length) * 100);
            if (pct > 30) {
                insights.push({
                    icon: Eye,
                    color: 'rose',
                    title: 'Awareness Gap',
                    detail: `${pct}% of high-risk respondents haven't heard of weight-loss medications — an education opportunity.`,
                    tag: 'warning',
                });
            }
        }
    }

    // 5. Most wanted feature
    const features = countField(responses, 'q24_useful_features');
    const topFeature = Object.entries(features).sort((a, b) => b[1] - a[1])[0];
    if (topFeature) {
        const pct = Math.round((topFeature[1] / n) * 100);
        insights.push({
            icon: Sparkles,
            color: 'violet',
            title: 'Most Wanted Feature',
            detail: `"${topFeature[0]}" is the most requested feature (${pct}% of respondents).`,
            tag: 'positive',
        });
    }

    // 6. What convinces people
    const convinces = countField(responses, 'q27_what_convinces');
    const topConvince = Object.entries(convinces).sort((a, b) => b[1] - a[1])[0];
    if (topConvince) {
        const pct = Math.round((topConvince[1] / n) * 100);
        insights.push({
            icon: Lightbulb,
            color: 'amber',
            title: 'Key Motivator',
            detail: `"${topConvince[0]}" is the top factor that would convince users (${pct}%).`,
            tag: 'neutral',
        });
    }

    // 7. Family support signal
    const support = countField(responses, 'q18_support_family');
    const supportYes = support['Yes'] || 0;
    if (n > 0) {
        const pct = Math.round((supportYes / n) * 100);
        insights.push({
            icon: Users,
            color: pct >= 50 ? 'emerald' : 'blue',
            title: 'Family Support',
            detail: `${pct}% would support a family member using weight-loss solutions — signals social acceptance.`,
            tag: pct >= 50 ? 'positive' : 'neutral',
        });
    }

    // 8. Biggest difficulty
    const difficulties = countField(responses, 'q7_biggest_difficulty');
    const topDifficulty = Object.entries(difficulties).sort((a, b) => b[1] - a[1])[0];
    if (topDifficulty) {
        const pct = Math.round((topDifficulty[1] / n) * 100);
        insights.push({
            icon: AlertTriangle,
            color: 'orange',
            title: 'Biggest Pain Point',
            detail: `"${topDifficulty[0]}" is the #1 difficulty in weight loss (${pct}%).`,
            tag: 'warning',
        });
    }

    return insights;
}

/* ─── Component ─── */

export default function ExecutiveOverview({ responses }: ExecutiveOverviewProps) {
    const total = responses.length;

    const funnel = useMemo(() => getConversionFunnel(responses), [responses]);
    const riskGroups = useMemo(() => getRiskGroups(responses), [responses]);
    const engagementScore = useMemo(() => getAvgEngagementScore(responses), [responses]);
    const insights = useMemo(() => generateInsights(responses), [responses]);

    const highRiskPct = riskGroups.find((g) => g.level === 'High')?.pct ?? 0;

    const awareRate = funnel[1]?.pct ?? 0;
    const interestRate = funnel[2]?.pct ?? 0;
    const payRate = funnel[3]?.pct ?? 0;

    const tagStyles: Record<string, string> = {
        positive: 'bg-emerald-50 border-emerald-100',
        warning: 'bg-amber-50 border-amber-100',
        neutral: 'bg-gray-50 border-gray-100',
    };

    const colorMap: Record<string, string> = {
        emerald: 'text-emerald-600',
        blue: 'text-blue-600',
        violet: 'text-violet-600',
        amber: 'text-amber-600',
        rose: 'text-rose-600',
        orange: 'text-orange-600',
    };

    return (
        <div className="space-y-6">

            {/* KPI Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                <StatCard label="Total Responses" value={total} icon={Users} color="bg-blue-600" />
                <StatCard label="Awareness Rate" value={`${awareRate}%`} sub="Heard of solutions" icon={Eye} color="bg-emerald-600" />
                <StatCard label="Interest Rate" value={`${interestRate}%`} sub="Yes + Maybe" icon={TrendingUp} color="bg-violet-600" />
                <StatCard label="Pay Intent" value={`${payRate}%`} sub="Willing to pay" icon={Zap} color="bg-amber-600" />
                <StatCard label="High-Risk %" value={`${highRiskPct}%`} sub="Metabolic risk" icon={Activity} color="bg-rose-600" />
                <StatCard label="Engagement" value={`${engagementScore}/100`} sub="Composite score" icon={Sparkles} color="bg-cyan-600" />
            </div>

            {/* Funnel + Insights side by side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Conversion Funnel */}
                <FunnelChart stages={funnel} />

                {/* Key Insights & Patterns */}
                <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
                    <div className="flex items-center gap-2 mb-5">
                        <Lightbulb className="w-4 h-4 text-amber-500" />
                        <h3 className="text-xs sm:text-sm font-semibold text-gray-700">Key Insights & Patterns</h3>
                    </div>

                    {insights.length === 0 ? (
                        <p className="text-xs text-gray-400 text-center py-8">No insights available — add more survey responses.</p>
                    ) : (
                        <div className="space-y-2.5 max-h-[400px] overflow-y-auto pr-1">
                            {insights.map((insight, i) => {
                                const Icon = insight.icon;
                                return (
                                    <div
                                        key={i}
                                        className={`flex items-start gap-3 px-3 py-2.5 rounded-lg border transition-colors hover:shadow-sm ${tagStyles[insight.tag]}`}
                                    >
                                        <div className={`shrink-0 mt-0.5 ${colorMap[insight.color] || 'text-gray-500'}`}>
                                            <Icon className="w-3.5 h-3.5" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center gap-2 mb-0.5">
                                                <span className="text-[10px] sm:text-xs font-semibold text-gray-800">{insight.title}</span>
                                                <ArrowRight className="w-2.5 h-2.5 text-gray-300 shrink-0" />
                                            </div>
                                            <p className="text-[10px] sm:text-xs text-gray-600 leading-relaxed">{insight.detail}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
