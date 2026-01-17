import type { TimelineProps } from '../types';
import { CheckCircle2, Circle, Clock } from 'lucide-react';

export default function Timeline({ phases }: TimelineProps) {
    return (
        <div className="relative max-w-4xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-primary-400 to-primary-300 dark:from-primary-600 dark:via-primary-500 dark:to-primary-400" />

            <div className="space-y-12">
                {phases.map((phase, index) => {
                    const isLeft = index % 2 === 0;
                    const Icon =
                        phase.status === 'completed'
                            ? CheckCircle2
                            : phase.status === 'current'
                                ? Clock
                                : Circle;

                    const iconColors = {
                        completed: 'text-success-600 dark:text-success-400 bg-success-50 dark:bg-success-900/30 border-success-200 dark:border-success-700',
                        current: 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 border-primary-200 dark:border-primary-700',
                        upcoming: 'text-neutral-400 dark:text-neutral-500 bg-neutral-100 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700',
                    };

                    return (
                        <div
                            key={index}
                            className={`relative flex items-center gap-8 ${isLeft ? 'sm:flex-row' : 'sm:flex-row-reverse'
                                }`}
                        >
                            {/* Icon */}
                            <div className={`absolute left-0 sm:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full border-2 flex items-center justify-center z-10 ${iconColors[phase.status]} transition-colors duration-200`}>
                                <Icon className="w-6 h-6" />
                            </div>

                            {/* Content */}
                            <div
                                className={`flex-1 card p-6 ml-16 sm:ml-0 ${isLeft ? 'sm:mr-auto sm:pr-16' : 'sm:ml-auto sm:pl-16'
                                    } sm:w-1/2`}
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white">{phase.title}</h3>
                                    {phase.date && (
                                        <span className="text-sm text-neutral-500 dark:text-neutral-400 ml-4 whitespace-nowrap">{phase.date}</span>
                                    )}
                                </div>
                                <p className="text-neutral-600 dark:text-neutral-400 text-sm">{phase.description}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
