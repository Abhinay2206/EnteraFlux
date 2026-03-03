import type { ReactElement } from 'react';

const BAR_COLORS = [
    'bg-blue-500', 'bg-emerald-500', 'bg-violet-500', 'bg-amber-500',
    'bg-rose-500', 'bg-cyan-500', 'bg-orange-500', 'bg-pink-500',
];

interface DistributionChartProps {
    title: string;
    icon: React.ElementType;
    data: Record<string, number>;
    total: number;
    maxItems?: number;
}

export default function DistributionChart({ title, icon: Icon, data, total, maxItems }: DistributionChartProps): ReactElement {
    let entries = Object.entries(data).sort((a, b) => b[1] - a[1]);
    if (maxItems) entries = entries.slice(0, maxItems);

    if (entries.length === 0) {
        return (
            <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5">
                <div className="flex items-center gap-2 mb-4">
                    <Icon className="w-4 h-4 text-gray-400" />
                    <h3 className="text-xs sm:text-sm font-semibold text-gray-700">{title}</h3>
                </div>
                <p className="text-xs text-gray-400">No data yet</p>
            </div>
        );
    }

    const maxCount = Math.max(...entries.map(([, c]) => c));

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-gray-400" />
                    <h3 className="text-xs sm:text-sm font-semibold text-gray-700">{title}</h3>
                </div>
                <span className="text-[10px] sm:text-xs text-gray-400">{total} responses</span>
            </div>
            <div className="space-y-2.5">
                {entries.map(([label, count], i) => {
                    const pct = total > 0 ? Math.round((count / total) * 100) : 0;
                    return (
                        <div key={label}>
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-[10px] sm:text-xs text-gray-600 truncate max-w-[60%]">{label}</span>
                                <span className="text-[10px] sm:text-xs font-semibold text-gray-900">
                                    {count} <span className="text-gray-400 font-normal">({pct}%)</span>
                                </span>
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
