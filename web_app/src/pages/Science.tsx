import { useEffect } from 'react';
import Section from '../components/Section';
import ScrollReveal from '../components/ScrollReveal';
import { Activity, Heart, Brain, Moon, TrendingUp, Database } from 'lucide-react';
import MechanismAction from '../components/visualizations/MechanismAction';

export default function Science() {
    useEffect(() => {
        document.title = 'Science - EnteraFlux';
    }, []);

    return (
        <div>
            <Section
                title="The Science Behind EnteraFlux"
                subtitle="Physiological intelligence meets AI-powered prediction"
                variant="gradient"
                firstSection
            >
                <ScrollReveal delay={200} direction="up">
                    <div className="max-w-4xl mx-auto">
                        <p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6">
                            Current management of GLP-1 receptor agonist therapy relies heavily on reactive symptom reporting—patients feel sick, then they seek help. This lag time often leads to unnecessary suffering and treatment discontinuation.
                        </p>
                        <p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed mb-16">
                            EnteraFlux shifts this paradigm by leveraging consumer-grade wearable devices to capture continuous physiological biomarkers. By analyzing subtle shifts in autonomic function, we can detect the physiological precursors of nausea and adverse events before they manifest symptomatically, enabling truly proactive precision medicine.
                        </p>
                    </div>
                </ScrollReveal>
            </Section>

            <Section title="The Physiology of GLP-1 Tolerance" variant="default">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="mb-16">
                        <MechanismAction />
                    </div>
                    <div className="glass rounded-xl p-8 mb-8 text-left">
                        <h3 className="text-xl font-bold mb-4">The Autonomic Connection</h3>
                        <p className="text-neutral-700 dark:text-neutral-300 mb-4">
                            GLP-1 receptor agonists work primarily by delaying gastric emptying and modulating appetite centers in the brain. However, this potent mechanism also triggers the autonomic nervous system (ANS), often stimulating the vagus nerve.
                        </p>
                        <p className="text-neutral-700 dark:text-neutral-300">
                            When the dosage exceeds a patient's current tolerance threshold, the ANS shifts into a state of "sympathetic overdrive" or "vagal withdrawal" to manage the perceived metabolic stress. This physiological shift is measurable via Heart Rate Variability (HRV) and other biomarkers <strong>hours or even days</strong> before a patient reports severe nausea or vomiting.
                        </p>
                    </div>
                </div>
            </Section>

            <Section title="Biomarkers We Monitor" variant="dark">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    <ScrollReveal delay={100} direction="up">
                        <div className="glass rounded-xl p-8 hover-lift cursor-default premium-card">
                            <Activity className="w-12 h-12 text-primary-400 mb-4" />
                            <h3 className="text-xl font-bold mb-2">Heart Rate Variability (HRV)</h3>
                            <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4">
                                HRV is the gold standard for non-invasive assessment of autonomic nervous system balance.
                            </p>
                            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700">
                                <span className="text-xs font-bold text-primary-500 uppercase tracking-wider">Clinical Relevance</span>
                                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                                    A sudden or sustained drop in HRV often indicates vagal withdrawal, a precursor to GI distress. It signals the body is under metabolic strain.
                                </p>
                            </div>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={200} direction="up">
                        <div className="glass rounded-xl p-8 hover-lift cursor-default premium-card">
                            <Heart className="w-12 h-12 text-primary-400 mb-4" />
                            <h3 className="text-xl font-bold mb-2">Resting Heart Rate</h3>
                            <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4">
                                Your baseline pulse when fully relaxed, a key indicator of cardiovascular load and recovery.
                            </p>
                            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700">
                                <span className="text-xs font-bold text-primary-500 uppercase tracking-wider">Clinical Relevance</span>
                                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                                    Elevated RHR ({'>'}5-10 bpm over baseline) can signal dehydration, systemic inflammation, or an elevated metabolic rate fighting the medication.
                                </p>
                            </div>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={300} direction="up">
                        <div className="glass rounded-xl p-8 hover-lift cursor-default premium-card">
                            <Moon className="w-12 h-12 text-primary-400 mb-4" />
                            <h3 className="text-xl font-bold mb-2">Sleep Architecture</h3>
                            <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4">
                                The structure of your sleep cycles, including Deep, REM, and Light sleep phases.
                            </p>
                            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700">
                                <span className="text-xs font-bold text-primary-500 uppercase tracking-wider">Clinical Relevance</span>
                                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                                    GLP-1 medications can disrupt REM latency and deep sleep duration. Poor sleep quality lowers the threshold for nausea and adverse events the next day.
                                </p>
                            </div>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={100} direction="up">
                        <div className="glass rounded-xl p-8 hover-lift cursor-default premium-card">
                            <Brain className="w-12 h-12 text-primary-400 mb-4" />
                            <h3 className="text-xl font-bold mb-2">Stress Biomarkers</h3>
                            <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4">
                                Composite scores derived from HRV, skin temperature, and electrodermal activity (where available).
                            </p>
                            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700">
                                <span className="text-xs font-bold text-primary-500 uppercase tracking-wider">Clinical Relevance</span>
                                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                                    Chronic physiological stress elevates cortisol, which can antagonize insulin sensitivity and worsen GI side effects.
                                </p>
                            </div>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={200} direction="up">
                        <div className="glass rounded-xl p-8 hover-lift cursor-default premium-card">
                            <TrendingUp className="w-12 h-12 text-primary-400 mb-4" />
                            <h3 className="text-xl font-bold mb-2">Trend Analysis</h3>
                            <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4">
                                Analyzing temporal patterns and 7-day/30-day rolling averages rather than isolated data points.
                            </p>
                            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700">
                                <span className="text-xs font-bold text-primary-500 uppercase tracking-wider">Clinical Relevance</span>
                                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                                    Context is key. A "normal" HRV for one person may be a "danger zone" for another. We track deviations from your personal baseline.
                                </p>
                            </div>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={300} direction="up">
                        <div className="glass rounded-xl p-8 hover-lift cursor-default premium-card">
                            <Database className="w-12 h-12 text-primary-400 mb-4" />
                            <h3 className="text-xl font-bold mb-2">Multi-Modal Integration</h3>
                            <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4">
                                The synthesis of cardiovascular, sleep, and activity data into a unified risk score.
                            </p>
                            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700">
                                <span className="text-xs font-bold text-primary-500 uppercase tracking-wider">Clinical Relevance</span>
                                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                                    Single biomarkers can be noisy. Combining HRV, RHR, and sleep data creates a robust "Metabolic Stress Index" with higher predictive accuracy.
                                </p>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </Section>

            <Section title="From Signals to Predictions" variant="default">
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                        <div className="text-center">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center mx-auto mb-6">
                                <span className="text-3xl font-bold text-white">1</span>
                            </div>
                            <h3 className="text-xl font-bold mb-3">Continuous Data Collection</h3>
                            <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                                Wearable devices sync physiological data 24/7 at high resolution (up to 100ms intervals). No manual logging required. Compatible with Apple Watch, Fitbit, Garmin, Oura, and more.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center mx-auto mb-6">
                                <span className="text-3xl font-bold text-white">2</span>
                            </div>
                            <h3 className="text-xl font-bold mb-3">AI Inference Engine</h3>
                            <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                                Deep learning models, trained on thousands of hours of GLP-1 patient data, identify non-linear risk patterns. Models continuously learn from your feedback to improve accuracy.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center mx-auto mb-6">
                                <span className="text-3xl font-bold text-white">3</span>
                            </div>
                            <h3 className="text-xl font-bold mb-3">Actionable Insights</h3>
                            <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                                Predictions trigger specific, timely micro-interventions: "Hydrate now," "Split your next meal," or "Delay dosage." We provide the <i>right</i> advice at the <i>right</i> physiological moment.
                            </p>
                        </div>
                    </div>

                    <div className="glass rounded-xl p-8">
                        <h3 className="text-2xl font-bold mb-4 text-center">Physiological Intelligence</h3>
                        <p className="text-neutral-700 dark:text-neutral-300 text-center max-w-3xl mx-auto">
                            "The body produces signals. EnteraFlux interprets them." Our approach is built on the rigorous principle that adverse events don't appear randomly—they're preceded by measurable physiological shifts. By detecting these shifts early, we enable proactive intervention that keeps patients on therapy and out of the ER.
                        </p>
                    </div>
                </div>
            </Section>

            <Section title="Wearables Interoperability" variant="dark">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-lg text-neutral-700 dark:text-neutral-300 mb-8">
                        EnteraFlux integrates with major consumer wearable platforms to access raw biomarker data without requiring specialized medical devices.
                    </p>
                    <div className="glass rounded-xl p-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <div className="p-4 rounded-lg bg-neutral-50 dark:bg-white/5">
                                <div className="text-4xl mb-3">⌚</div>
                                <p className="text-sm font-bold text-neutral-900 dark:text-white">Apple Watch</p>
                                <p className="text-xs text-neutral-500 mt-1">High-fidelity HRV & ECG</p>
                            </div>
                            <div className="p-4 rounded-lg bg-neutral-50 dark:bg-white/5">
                                <div className="text-4xl mb-3">📱</div>
                                <p className="text-sm font-bold text-neutral-900 dark:text-white">Fitbit</p>
                                <p className="text-xs text-neutral-500 mt-1">Sleep stages & RHR</p>
                            </div>
                            <div className="p-4 rounded-lg bg-neutral-50 dark:bg-white/5">
                                <div className="text-4xl mb-3">💍</div>
                                <p className="text-sm font-bold text-neutral-900 dark:text-white">Oura Ring</p>
                                <p className="text-xs text-neutral-500 mt-1">Temperature & Readiness</p>
                            </div>
                            <div className="p-4 rounded-lg bg-neutral-50 dark:bg-white/5">
                                <div className="text-4xl mb-3">⚡</div>
                                <p className="text-sm font-bold text-neutral-900 dark:text-white">Garmin</p>
                                <p className="text-xs text-neutral-500 mt-1">Body Battery & Stress</p>
                            </div>
                        </div>
                        <p className="text-neutral-600 dark:text-neutral-500 text-sm mt-8">
                            We utilize standardized API integrations via HealthKit, Google Fit, and native SDKs to ensure secure, encrypted, and seamless data ingestion.
                        </p>
                    </div>
                </div>
            </Section>
        </div>
    );
}
