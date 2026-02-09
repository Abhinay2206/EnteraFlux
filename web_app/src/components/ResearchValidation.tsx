import { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, FlaskConical, Activity, MapPin, ShieldCheck } from 'lucide-react';

interface ResearchSectionProps {
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
    defaultOpen?: boolean;
}

function ResearchSection({ title, icon, children, defaultOpen = false }: ResearchSectionProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl overflow-hidden transition-all duration-300">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-neutral-50 dark:hover:bg-white/5 transition-colors"
            >
                <div className="flex items-center gap-3">
                    {icon}
                    <span className="font-semibold text-neutral-900 dark:text-white text-sm">{title}</span>
                </div>
                {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-neutral-400 flex-shrink-0" />
                ) : (
                    <ChevronDown className="w-5 h-5 text-neutral-400 flex-shrink-0" />
                )}
            </button>
            {isOpen && (
                <div className="px-5 pb-5 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed border-t border-neutral-100 dark:border-neutral-700/50 pt-4">
                    {children}
                </div>
            )}
        </div>
    );
}

export default function ResearchValidation() {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="mt-10">
            {/* Toggle Button */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mx-auto flex items-center gap-2 px-6 py-3 rounded-full border border-primary-300 dark:border-primary-700 bg-primary-50 dark:bg-primary-900/20 hover:bg-primary-100 dark:hover:bg-primary-900/40 transition-all duration-300 text-primary-700 dark:text-primary-300 text-sm font-medium group"
            >
                <BookOpen className="w-4 h-4" />
                <span>{isExpanded ? 'Hide Research & Validation' : 'Learn More: Research & Validation'}</span>
                {isExpanded ? (
                    <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                ) : (
                    <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                )}
            </button>

            {/* Expandable Content */}
            {isExpanded && (
                <div className="mt-8 max-w-4xl mx-auto space-y-4 animate-fadeIn">
                    {/* Intro Note */}
                    <div className="glass rounded-xl p-6 text-center mb-6">
                        <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                            Wondering how EnteraFlux identifies GLP-1–related patterns in your body signals? This section explains the research and reasoning behind our approach — in simple language, with full transparency.
                        </p>
                    </div>

                    {/* Section 1: Common GLP-1 Symptoms */}
                    <ResearchSection
                        title="What GLP-1 Medications Commonly Do to Your Body"
                        icon={<FlaskConical className="w-5 h-5 text-primary-500" />}
                        defaultOpen
                    >
                        <p className="mb-3">
                            GLP-1 medications (like semaglutide and liraglutide) are effective for weight loss, but they commonly cause a range of side effects. These are well-documented in clinical trials:
                        </p>
                        <ul className="space-y-2 mb-4">
                            <li className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary-400 mt-2 flex-shrink-0" />
                                <span><strong>Nausea and stomach discomfort</strong> — reported by 40–50% of users in clinical studies</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary-400 mt-2 flex-shrink-0" />
                                <span><strong>Fatigue and low energy</strong> — especially during the first few weeks of treatment</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary-400 mt-2 flex-shrink-0" />
                                <span><strong>Dizziness and lightheadedness</strong> — often linked to reduced food intake and dehydration</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary-400 mt-2 flex-shrink-0" />
                                <span><strong>Sleep changes</strong> — some users report disrupted sleep or changes in sleep quality</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary-400 mt-2 flex-shrink-0" />
                                <span><strong>Muscle weakness</strong> — particularly when protein intake is too low during weight loss</span>
                            </li>
                        </ul>
                        <p className="text-xs text-neutral-500 dark:text-neutral-500">
                            Source: Published clinical trial data from STEP and SUSTAIN programmes (Novo Nordisk), peer-reviewed journals.
                        </p>
                    </ResearchSection>

                    {/* Section 2: Wearable Research */}
                    <ResearchSection
                        title="What Research Says About Wearable Signals"
                        icon={<Activity className="w-5 h-5 text-primary-500" />}
                    >
                        <p className="mb-3">
                            Wearable devices like smartwatches and fitness bands collect signals from your body throughout the day. Published research has found <strong>statistical correlations</strong> between these signals and common GLP-1 side effects:
                        </p>
                        <ul className="space-y-3 mb-4">
                            <li className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent-400 mt-2 flex-shrink-0" />
                                <span><strong>Heart Rate Variability (HRV)</strong> — research shows that drops in HRV are associated with physiological stress, fatigue, and poor recovery. Population-level trends suggest that nausea and dehydration from GLP-1 drugs can lower HRV.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent-400 mt-2 flex-shrink-0" />
                                <span><strong>Resting Heart Rate (RHR)</strong> — studies have shown that elevated RHR can indicate dehydration, stress, or the body working harder to adapt. A rise of 5–10 bpm from baseline is a commonly observed pattern during medication adjustments.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent-400 mt-2 flex-shrink-0" />
                                <span><strong>Sleep Quality</strong> — wearable-tracked sleep metrics (deep sleep duration, wake-ups) have been correlated with overall recovery and energy levels in research across multiple populations.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent-400 mt-2 flex-shrink-0" />
                                <span><strong>Stress and Recovery Patterns</strong> — research-backed patterns show that a combination of elevated heart rate, reduced HRV, and poor sleep together often indicate the body is under additional stress.</span>
                            </li>
                        </ul>
                        <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-4">
                            <p className="text-xs text-primary-700 dark:text-primary-300 font-medium mb-1">Important</p>
                            <p className="text-xs text-neutral-600 dark:text-neutral-400">
                                These are <strong>statistical correlations observed at a population level</strong> — not guarantees for any individual. EnteraFlux uses these research-backed patterns to provide wellness insights, not medical conclusions.
                            </p>
                        </div>
                    </ResearchSection>

                    {/* Section 3: Multi-Signal Approach */}
                    <ResearchSection
                        title="We Look at the Full Picture, Not a Single Number"
                        icon={<BookOpen className="w-5 h-5 text-primary-500" />}
                    >
                        <p className="mb-3">
                            EnteraFlux never relies on just one data point to generate a wellness insight. Instead, we look at <strong>patterns across multiple signals</strong> together:
                        </p>
                        <ul className="space-y-2 mb-4">
                            <li className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary-400 mt-2 flex-shrink-0" />
                                <span>Your heart rate, HRV, and sleep quality are compared <strong>against your own personal baseline</strong> (built during your 2-week calibration period)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary-400 mt-2 flex-shrink-0" />
                                <span>Changes are only highlighted when <strong>multiple signals shift together</strong> in a meaningful way</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary-400 mt-2 flex-shrink-0" />
                                <span>Context matters: the app considers whether it's a <strong>dose day, travel day, or post-poor-sleep day</strong> before suggesting anything</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary-400 mt-2 flex-shrink-0" />
                                <span>Self-reported check-ins ("How are you feeling?") are combined with wearable data for a <strong>more complete picture</strong></span>
                            </li>
                        </ul>
                        <p className="text-xs text-neutral-500 dark:text-neutral-500">
                            This multi-signal approach reduces false alarms and gives you more meaningful, trustworthy wellness insights.
                        </p>
                    </ResearchSection>

                    {/* Section 4: India-Specific Context */}
                    <ResearchSection
                        title="Why This Matters Even More for Indian Users"
                        icon={<MapPin className="w-5 h-5 text-primary-500" />}
                    >
                        <p className="mb-3">
                            Indian users may experience GLP-1 medications differently due to several factors that are unique to the Indian context:
                        </p>
                        <ul className="space-y-2 mb-4">
                            <li className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent-400 mt-2 flex-shrink-0" />
                                <span><strong>Diet and protein intake</strong> — Traditional Indian diets are often lower in protein compared to Western diets, which can increase the risk of muscle loss during rapid weight loss</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent-400 mt-2 flex-shrink-0" />
                                <span><strong>Hydration and climate</strong> — India's hot climate means dehydration can amplify GLP-1 side effects like nausea, dizziness, and elevated heart rate</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent-400 mt-2 flex-shrink-0" />
                                <span><strong>Thin-fat phenotype</strong> — Many Indians have lower muscle mass relative to body fat, making muscle preservation during weight loss even more important</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent-400 mt-2 flex-shrink-0" />
                                <span><strong>High diabetes prevalence</strong> — With ~10% of Indian adults living with diabetes and many more pre-diabetic, the GLP-1 user base in India will be very large</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent-400 mt-2 flex-shrink-0" />
                                <span><strong>Cost and discontinuation</strong> — GLP-1 drugs are expensive in India with limited insurance coverage, so users who quit due to side effects lose both money and health progress. Proper wellness support can help people stay on track</span>
                            </li>
                        </ul>
                        <p className="text-xs text-neutral-500 dark:text-neutral-500">
                            These factors are why EnteraFlux is designed specifically for Indian users — not just translated from a Western product.
                        </p>
                    </ResearchSection>

                    {/* Section 5: Disclaimer */}
                    <ResearchSection
                        title="What This Is — and What This Isn't"
                        icon={<ShieldCheck className="w-5 h-5 text-primary-500" />}
                    >
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-semibold text-neutral-900 dark:text-white mb-2 text-sm">✅ What EnteraFlux does:</h4>
                                <ul className="space-y-1.5">
                                    <li className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-success-400 mt-2 flex-shrink-0" />
                                        <span>Provides <strong>wellness insights</strong> based on research-backed patterns</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-success-400 mt-2 flex-shrink-0" />
                                        <span>Shows <strong>probabilistic trends</strong> — "your signals suggest your body may be under more stress than usual"</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-success-400 mt-2 flex-shrink-0" />
                                        <span>Helps you make <strong>informed lifestyle decisions</strong> — like eating more protein, resting, or hydrating</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-success-400 mt-2 flex-shrink-0" />
                                        <span>Offers <strong>education and transparency</strong> about how GLP-1 medications affect your body</span>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-neutral-900 dark:text-white mb-2 text-sm">❌ What EnteraFlux does NOT do:</h4>
                                <ul className="space-y-1.5">
                                    <li className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                                        <span>Does not <strong>diagnose</strong> any medical condition</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                                        <span>Does not <strong>detect diseases</strong> or make <strong>medical predictions</strong></span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                                        <span>Does not <strong>replace your doctor</strong> or prescribe medications</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                                        <span>Does not guarantee specific outcomes — insights are <strong>probabilistic, not certainties</strong></span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </ResearchSection>

                    {/* Bottom Note */}
                    <div className="text-center pt-4">
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
                            This information is provided for <strong>education and transparency</strong>. EnteraFlux is a wellness and lifestyle support app — not a medical device. Always consult your doctor for health-related decisions. All insights are based on population-level trends and your personal baseline, and should be used to support — not replace — professional medical advice.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
