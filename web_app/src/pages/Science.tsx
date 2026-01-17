import Section from '../components/Section';
import ScrollText from '../components/ScrollText';
import { Activity, Heart, Brain, Moon, TrendingUp, Database } from 'lucide-react';

export default function Science() {
    return (
        <div>
            <Section
                title="The Science Behind EnteraFlux"
                subtitle="Physiological intelligence meets AI-powered prediction"
                variant="gradient"
                firstSection
            >
                <ScrollText delay={200}>
                    <div className="max-w-4xl mx-auto">
                        <p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed mb-16">
                            EnteraFlux leverages consumer-grade wearable devices to capture continuous physiological biomarkers that reveal patterns invisible to traditional monitoring. Our AI models transform these signals into actionable predictions.
                        </p>
                    </div>
                </ScrollText>
            </Section>

            <Section title="Biomarkers We Monitor" variant="dark">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    <div className="glass rounded-xl p-8">
                        <Activity className="w-12 h-12 text-primary-400 mb-4" />
                        <h3 className="text-xl font-bold mb-3">Heart Rate Variability (HRV)</h3>
                        <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                            HRV reflects autonomic nervous system balance. Declining HRV often precedes GI distress and nausea in GLP-1 therapy, providing an early warning signal.
                        </p>
                    </div>

                    <div className="glass rounded-xl p-8">
                        <Heart className="w-12 h-12 text-primary-400 mb-4" />
                        <h3 className="text-xl font-bold mb-3">Resting Heart Rate</h3>
                        <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                            Elevated resting HR can indicate physiological stress, dehydration, or inflammatory response—all relevant to GLP-1 tolerance.
                        </p>
                    </div>

                    <div className="glass rounded-xl p-8">
                        <Moon className="w-12 h-12 text-primary-400 mb-4" />
                        <h3 className="text-xl font-bold mb-3">Sleep Architecture</h3>
                        <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                            Sleep disruption patterns correlate with metabolic stress and medication intolerance. We track sleep stages, fragmentation, and latency.
                        </p>
                    </div>

                    <div className="glass rounded-xl p-8">
                        <Brain className="w-12 h-12 text-primary-400 mb-4" />
                        <h3 className="text-xl font-bold mb-3">Stress Biomarkers</h3>
                        <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                            Chronic stress elevates cortisol and disrupts metabolic regulation. Stress patterns inform tolerance predictions and coaching recommendations.
                        </p>
                    </div>

                    <div className="glass rounded-xl p-8">
                        <TrendingUp className="w-12 h-12 text-primary-400 mb-4" />
                        <h3 className="text-xl font-bold mb-3">Trend Analysis</h3>
                        <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                            We analyze temporal patterns and deviations from baseline, not just absolute values. Trends reveal risk before symptoms manifest.
                        </p>
                    </div>

                    <div className="glass rounded-xl p-8">
                        <Database className="w-12 h-12 text-primary-400 mb-4" />
                        <h3 className="text-xl font-bold mb-3">Multi-Modal Integration</h3>
                        <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                            Combining multiple biomarkers increases predictive power. Our models integrate signals across cardiovascular, sleep, and activity domains.
                        </p>
                    </div>
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
                                Wearable devices sync physiological data 24/7. No manual logging required. Compatible with Apple Watch, Fitbit, Garmin, Oura, and more.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center mx-auto mb-6">
                                <span className="text-3xl font-bold text-white">2</span>
                            </div>
                            <h3 className="text-xl font-bold mb-3">AI Inference Engine</h3>
                            <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                                Machine learning models trained on GLP-1 patient data identify risk patterns. Models continuously update with new evidence.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center mx-auto mb-6">
                                <span className="text-3xl font-bold text-white">3</span>
                            </div>
                            <h3 className="text-xl font-bold mb-3">Actionable Insights</h3>
                            <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                                Predictions trigger coaching recommendations, intervention strategies, and when necessary, emergency contact alerts.
                            </p>
                        </div>
                    </div>

                    <div className="glass rounded-xl p-8">
                        <h3 className="text-2xl font-bold mb-4 text-center">Physiological Intelligence</h3>
                        <p className="text-neutral-700 dark:text-neutral-300 text-center max-w-3xl mx-auto">
                            "The body produces signals. EnteraFlux interprets them." Our approach is built on the principle that adverse events don't appear randomly—they're preceded by measurable physiological shifts. By detecting these shifts early, we enable proactive intervention.
                        </p>
                    </div>
                </div>
            </Section>

            <Section title="Wearables Interoperability" variant="dark">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-lg text-neutral-700 dark:text-neutral-300 mb-8">
                        EnteraFlux integrates with major consumer wearable platforms to access biomarker data without requiring specialized medical devices.
                    </p>
                    <div className="glass rounded-xl p-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <div>
                                <div className="text-4xl mb-2">⌚</div>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400 font-medium">Apple Watch</p>
                            </div>
                            <div>
                                <div className="text-4xl mb-2">📱</div>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400 font-medium">Fitbit</p>
                            </div>
                            <div>
                                <div className="text-4xl mb-2">💍</div>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400 font-medium">Oura Ring</p>
                            </div>
                            <div>
                                <div className="text-4xl mb-2">⚡</div>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400 font-medium">Garmin</p>
                            </div>
                        </div>
                        <p className="text-neutral-600 dark:text-neutral-500 text-sm mt-8">
                            API integrations via HealthKit, Google Fit, and device-specific SDKs ensure seamless data flow.
                        </p>
                    </div>
                </div>
            </Section>
        </div>
    );
}
