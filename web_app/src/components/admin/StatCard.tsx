import type { ReactElement } from 'react';

interface StatCardProps {
    label: string;
    value: string | number;
    sub?: string;
    icon: React.ElementType;
    color: string;
}

export default function StatCard({ label, value, sub, icon: Icon }: StatCardProps): ReactElement {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 hover:shadow-sm transition-shadow">
            <div className="flex items-start justify-between">
                <div className="min-w-0 flex-1">
                    <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider truncate">{label}</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{value}</p>
                    {sub && <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5 truncate">{sub}</p>}
                </div>
                <div className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gray-100 shrink-0 ml-2">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                </div>
            </div>
        </div>
    );
}
