import type { ReactElement } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line, Area, AreaChart } from 'recharts';

/* ─── Mini Bar Chart ─── */

interface MiniBarChartProps {
    title: string;
    icon: React.ElementType;
    data: { label: string; value: number }[];
    color?: string;
    height?: number;
    valueLabel?: string;
}

export function MiniBarChart({ title, icon: Icon, data, color = '#3b82f6', height = 180, valueLabel = '' }: MiniBarChartProps): ReactElement {
    if (data.length === 0) {
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

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5">
            <div className="flex items-center gap-2 mb-4">
                <Icon className="w-4 h-4 text-gray-400" />
                <h3 className="text-xs sm:text-sm font-semibold text-gray-700">{title}</h3>
            </div>
            <ResponsiveContainer width="100%" height={height}>
                <BarChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: -15 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="label" tick={{ fontSize: 10, fill: '#94a3b8' }} interval={0} angle={-30} textAnchor="end" height={50} />
                    <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} />
                    <Tooltip
                        contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid #e2e8f0' }}
                        formatter={(val: number | undefined) => [`${val ?? 0}${valueLabel}`, 'Value']}
                    />
                    <Bar dataKey="value" fill={color} radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

/* ─── Mini Line Chart ─── */

interface MiniLineChartProps {
    title: string;
    icon: React.ElementType;
    data: { label: string; value: number; value2?: number }[];
    color?: string;
    color2?: string;
    height?: number;
    legend1?: string;
    legend2?: string;
}

export function MiniLineChart({ title, icon: Icon, data, color = '#3b82f6', color2 = '#8b5cf6', height = 180, legend1 = 'Value', legend2 = 'Value 2' }: MiniLineChartProps): ReactElement {
    const hasSecondLine = data.some((d) => d.value2 !== undefined);

    if (data.length === 0) {
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

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5">
            <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-gray-400" />
                    <h3 className="text-xs sm:text-sm font-semibold text-gray-700">{title}</h3>
                </div>
                {hasSecondLine && (
                    <div className="flex items-center gap-3 text-[10px]">
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />{legend1}</span>
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{ backgroundColor: color2 }} />{legend2}</span>
                    </div>
                )}
            </div>
            <ResponsiveContainer width="100%" height={height}>
                <LineChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: -15 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="label" tick={{ fontSize: 10, fill: '#94a3b8' }} interval={0} angle={-30} textAnchor="end" height={50} />
                    <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} />
                    <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid #e2e8f0' }} />
                    <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={{ r: 3 }} name={legend1} />
                    {hasSecondLine && <Line type="monotone" dataKey="value2" stroke={color2} strokeWidth={2} dot={{ r: 3 }} name={legend2} />}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

/* ─── Mini Area Chart ─── */

interface MiniAreaChartProps {
    title: string;
    icon: React.ElementType;
    data: { label: string; value: number }[];
    color?: string;
    height?: number;
}

export function MiniAreaChart({ title, icon: Icon, data, color = '#3b82f6', height = 180 }: MiniAreaChartProps): ReactElement {
    if (data.length === 0) {
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

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5">
            <div className="flex items-center gap-2 mb-4">
                <Icon className="w-4 h-4 text-gray-400" />
                <h3 className="text-xs sm:text-sm font-semibold text-gray-700">{title}</h3>
            </div>
            <ResponsiveContainer width="100%" height={height}>
                <AreaChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: -15 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="label" tick={{ fontSize: 10, fill: '#94a3b8' }} interval={0} angle={-30} textAnchor="end" height={50} />
                    <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} />
                    <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid #e2e8f0' }} />
                    <Area type="monotone" dataKey="value" stroke={color} fill={color} fillOpacity={0.1} strokeWidth={2} />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
