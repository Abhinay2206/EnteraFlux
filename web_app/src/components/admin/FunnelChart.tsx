import type { ReactElement } from 'react';
import type { FunnelStage } from '../../utils/analyticsUtils';
import { ArrowDown } from 'lucide-react';

const STAGE_COLORS = [
    { bg: 'bg-blue-500', light: 'bg-blue-50', text: 'text-blue-700' },
    { bg: 'bg-emerald-500', light: 'bg-emerald-50', text: 'text-emerald-700' },
    { bg: 'bg-violet-500', light: 'bg-violet-50', text: 'text-violet-700' },
    { bg: 'bg-amber-500', light: 'bg-amber-50', text: 'text-amber-700' },
];

interface FunnelChartProps {
    stages: FunnelStage[];
}

export default function FunnelChart({ stages }: FunnelChartProps): ReactElement {
    const maxCount = stages.length > 0 ? stages[0].count : 1;

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
            <h3 className="text-xs sm:text-sm font-semibold text-gray-700 mb-5">Conversion Funnel</h3>
            <div className="space-y-2">
                {stages.map((stage, i) => {
                    const color = STAGE_COLORS[i % STAGE_COLORS.length];
                    const widthPct = maxCount > 0 ? Math.max((stage.count / maxCount) * 100, 20) : 20;
                    return (
                        <div key={stage.label}>
                            {/* Drop-off indicator */}
                            {i > 0 && stage.dropOff > 0 && (
                                <div className="flex items-center justify-center gap-1 py-1">
                                    <ArrowDown className="w-3 h-3 text-red-400" />
                                    <span className="text-[10px] font-medium text-red-400">
                                        −{stage.dropOff}% drop-off
                                    </span>
                                </div>
                            )}
                            {/* Stage bar */}
                            <div className="flex items-center gap-3">
                                <div className="w-full" style={{ maxWidth: `${widthPct}%` }}>
                                    <div className={`${color.light} rounded-lg px-3 py-2.5 sm:py-3 border border-gray-100`}>
                                        <div className="flex items-center justify-between gap-2">
                                            <span className="text-[10px] sm:text-xs font-medium text-gray-700 truncate">{stage.label}</span>
                                            <div className="flex items-center gap-2 shrink-0">
                                                <span className={`text-sm sm:text-base font-bold ${color.text}`}>{stage.count}</span>
                                                <span className="text-[10px] text-gray-400">({stage.pct}%)</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
