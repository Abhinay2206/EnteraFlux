import type { ReactElement } from 'react';

interface StatCardProps {
    label: string;
    value: string | number;
    sub?: string;
    icon: React.ElementType;
    color: string;
}

const COLOR_MAP: Record<string, { bg: string; text: string }> = {
    'bg-blue-600': { bg: 'bg-blue-50', text: 'text-blue-600' },
    'bg-emerald-600': { bg: 'bg-emerald-50', text: 'text-emerald-600' },
    'bg-violet-600': { bg: 'bg-violet-50', text: 'text-violet-600' },
    'bg-amber-600': { bg: 'bg-amber-50', text: 'text-amber-600' },
    'bg-rose-600': { bg: 'bg-rose-50', text: 'text-rose-600' },
    'bg-cyan-600': { bg: 'bg-cyan-50', text: 'text-cyan-600' },
};

export default function StatCard({ label, value, sub, icon: Icon, color }: StatCardProps): ReactElement {
    const mapped = COLOR_MAP[color] ?? { bg: 'bg-gray-100', text: 'text-gray-500' };
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 hover:shadow-sm transition-shadow">
            <div className="flex items-start justify-between">
                <div className="min-w-0 flex-1">
                    <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider truncate">{label}</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{value}</p>
                    {sub && <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5 truncate">{sub}</p>}
                </div>
                <div className={`flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-lg shrink-0 ml-2 ${mapped.bg}`}>
                    <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${mapped.text}`} />
                </div>
            </div>
        </div>
    );
}
