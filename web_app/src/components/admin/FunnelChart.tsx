import type { ReactElement } from 'react';
import type { FunnelStage } from '../../utils/analyticsUtils';
import { ArrowDown, Users, Eye, TrendingUp, Zap } from 'lucide-react';

const STAGE_ICONS = [Users, Eye, TrendingUp, Zap];

interface FunnelChartProps {
    stages: FunnelStage[];
}

export default function FunnelChart({ stages }: FunnelChartProps): ReactElement {
    const maxCount = stages.length > 0 ? stages[0].count : 1;

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xs sm:text-sm font-semibold text-gray-900">Conversion Funnel</h3>
                {stages.length > 1 && (
                    <span className="text-[10px] sm:text-xs text-gray-400 font-medium">
                        {stages[stages.length - 1]?.pct ?? 0}% end-to-end
                    </span>
                )}
            </div>

            <div className="relative">
                {/* Vertical connector line */}
                <div className="absolute left-[19px] sm:left-[23px] top-6 bottom-6 w-px bg-gray-200 z-0" />

                <div className="relative z-10 space-y-0">
                    {stages.map((stage, i) => {
                        const Icon = STAGE_ICONS[i % STAGE_ICONS.length];
                        const widthPct = maxCount > 0 ? Math.max((stage.count / maxCount) * 100, 30) : 30;
                        const isLast = i === stages.length - 1;
                        // Progressively lighter opacity for deeper stages
                        const opacity = 1 - i * 0.15;

                        return (
                            <div key={stage.label}>
                                {/* Drop-off connector */}
                                {i > 0 && (
                                    <div className="flex items-center gap-2 py-1.5 pl-[13px] sm:pl-[17px]">
                                        <div className="flex items-center justify-center w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-white border border-gray-300">
                                            <ArrowDown className="w-2 h-2 text-gray-400" />
                                        </div>
                                        {stage.dropOff > 0 && (
                                            <span className="text-[9px] sm:text-[10px] font-medium text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded-full">
                                                −{stage.dropOff}% drop
                                            </span>
                                        )}
                                    </div>
                                )}

                                {/* Stage row */}
                                <div className="flex items-center gap-3">
                                    {/* Icon node */}
                                    <div className="flex items-center justify-center w-[38px] h-[38px] sm:w-[46px] sm:h-[46px] rounded-xl bg-gray-900 shadow-sm shrink-0">
                                        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                    </div>

                                    {/* Bar */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-[10px] sm:text-xs font-medium text-gray-600 truncate">{stage.label}</span>
                                            <div className="flex items-center gap-1.5 shrink-0">
                                                <span className="text-sm sm:text-base font-bold text-gray-900">{stage.count}</span>
                                                <span className="text-[9px] sm:text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-700">
                                                    {stage.pct}%
                                                </span>
                                            </div>
                                        </div>
                                        {/* Progress bar */}
                                        <div className="w-full h-2.5 sm:h-3 rounded-full bg-gray-100 overflow-hidden">
                                            <div
                                                className="h-full rounded-full bg-gray-900 transition-all duration-700 ease-out"
                                                style={{ width: `${widthPct}%`, opacity }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Final conversion highlight */}
                                {isLast && stage.count > 0 && (
                                    <div className="ml-[50px] sm:ml-[58px] mt-2.5 px-3 py-2 rounded-lg bg-gray-50 border border-gray-200">
                                        <p className="text-[10px] sm:text-xs text-gray-600 font-medium">
                                            {stage.count} respondent{stage.count !== 1 ? 's' : ''} passed through the full funnel — {stage.pct}% conversion
                                        </p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
