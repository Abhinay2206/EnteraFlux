import type { ReactElement } from 'react';

interface HeatmapRow {
    label: string;
    values: { label: string; value: number; maxValue: number }[];
}

interface HeatmapTableProps {
    title: string;
    icon: React.ElementType;
    rows: HeatmapRow[];
    valueLabel?: string;
}

function getHeatColor(value: number, maxValue: number): string {
    if (maxValue === 0) return 'bg-gray-50 text-gray-400';
    const ratio = value / maxValue;
    if (ratio >= 0.75) return 'bg-emerald-100 text-emerald-800 font-semibold';
    if (ratio >= 0.5) return 'bg-emerald-50 text-emerald-700';
    if (ratio >= 0.25) return 'bg-amber-50 text-amber-700';
    return 'bg-red-50 text-red-600';
}

export default function HeatmapTable({ title, icon: Icon, rows, valueLabel = '%' }: HeatmapTableProps): ReactElement {
    if (rows.length === 0) {
        return (
            <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5">
                <div className="flex items-center gap-2 mb-3">
                    <Icon className="w-4 h-4 text-gray-400" />
                    <h3 className="text-xs sm:text-sm font-semibold text-gray-700">{title}</h3>
                </div>
                <p className="text-xs text-gray-400">No data available</p>
            </div>
        );
    }

    const colHeaders = rows[0]?.values.map((v) => v.label) || [];

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5">
            <div className="flex items-center gap-2 mb-4">
                <Icon className="w-4 h-4 text-gray-400" />
                <h3 className="text-xs sm:text-sm font-semibold text-gray-700">{title}</h3>
            </div>
            <div className="overflow-x-auto -mx-2 px-2">
                <table className="w-full text-[10px] sm:text-xs">
                    <thead>
                        <tr>
                            <th className="text-left text-gray-500 font-medium pb-2 pr-3 whitespace-nowrap">Segment</th>
                            {colHeaders.map((h) => (
                                <th key={h} className="text-center text-gray-500 font-medium pb-2 px-1.5 whitespace-nowrap">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row) => (
                            <tr key={row.label} className="border-t border-gray-100">
                                <td className="text-gray-700 font-medium py-2 pr-3 whitespace-nowrap">{row.label}</td>
                                {row.values.map((v) => (
                                    <td key={v.label} className="py-1.5 px-1">
                                        <span className={`inline-flex items-center justify-center w-full rounded-md py-1 px-2 text-[10px] sm:text-xs ${getHeatColor(v.value, v.maxValue)}`}>
                                            {v.value}{valueLabel}
                                        </span>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
