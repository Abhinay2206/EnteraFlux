import { useEffect } from 'react';
import Section from '../components/Section';
import Badge from '../components/Badge';
import ScrollReveal from '../components/ScrollReveal';
import { AlertTriangle, Shield, FileText, Lock } from 'lucide-react';

export default function Legal() {
    useEffect(() => {
        document.title = 'Legal — EnteraFlux';
    }, []);

    return (
        <div>
            <Section
                title="Important Disclaimers"
                subtitle="Please read this so you understand what EnteraFlux is — and what it is not"
                variant="gradient"
                firstSection
            >
                <ScrollReveal delay={200} effect="blur-in">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="flex flex-wrap justify-center gap-3 mb-6">
                            <Badge text="Wellness App Under Development" variant="development" />
                            <Badge text="Not a Medical Device" variant="regulatory" />
                            <Badge text="Lifestyle & Wellness Only" variant="research" />
                        </div>
                    </div>
                </ScrollReveal>
            </Section>

            <Section variant="dark">
                <div className="max-w-4xl mx-auto space-y-8">
                    {/* Not a Medical Device */}
                    <div className="card p-8">
                        <div className="flex items-start gap-4 mb-4">
                            <AlertTriangle className="w-8 h-8 text-amber-400 flex-shrink-0" />
                            <div>
                                <h3 className="text-2xl font-bold mb-2">Not a Medical Device</h3>
                                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                                    EnteraFlux is a <strong>wellness and lifestyle app</strong>. It has <strong>not been approved or cleared</strong> by CDSCO (India's drug regulator), the FDA, or any other health authority as a medical device. It is not designed to diagnose, treat, cure, or prevent any disease or medical condition. <strong>Do not use EnteraFlux to make medical decisions or replace your doctor's advice.</strong>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Wellness Only */}
                    <div className="card p-8">
                        <div className="flex items-start gap-4 mb-4">
                            <Shield className="w-8 h-8 text-red-400 flex-shrink-0" />
                            <div>
                                <h3 className="text-2xl font-bold mb-2">Wellness Information Only</h3>
                                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
                                    All tips, nudges, and insights from EnteraFlux are for <strong>general wellness and lifestyle purposes only</strong>. They are not medical advice, medical opinions, or clinical recommendations. Always consult a qualified healthcare professional for any health-related decisions.
                                </p>
                                <p className="text-neutral-600 dark:text-neutral-400 text-sm italic">
                                    If you are having a medical emergency, call 112 (India's emergency number) or go to the nearest hospital immediately. EnteraFlux is not an emergency service.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* What We Do and Don't Do */}
                    <div className="card p-8">
                        <div className="flex items-start gap-4 mb-4">
                            <FileText className="w-8 h-8 text-primary-400 flex-shrink-0" />
                            <div>
                                <h3 className="text-2xl font-bold mb-2">What EnteraFlux Does (and Doesn't Do)</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                                    <div>
                                        <h4 className="font-bold text-success-500 mb-2">✅ What We Do</h4>
                                        <ul className="space-y-2 text-neutral-700 dark:text-neutral-300 text-sm">
                                            <li>• Show you trends in your wearable data (heart rate, sleep, recovery)</li>
                                            <li>• Give general wellness tips (hydration, protein, rest)</li>
                                            <li>• Suggest Indian-diet-friendly nutrition ideas</li>
                                            <li>• Help you notice patterns in how you feel</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-red-400 mb-2">❌ What We Don't Do</h4>
                                        <ul className="space-y-2 text-neutral-700 dark:text-neutral-300 text-sm">
                                            <li>• Diagnose any condition or disease</li>
                                            <li>• Predict medical events or side effects</li>
                                            <li>• Prescribe medications or dosage changes</li>
                                            <li>• Replace your doctor, nutritionist, or any healthcare provider</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Still in Development */}
                    <div className="card p-8">
                        <div className="flex items-start gap-4 mb-4">
                            <FileText className="w-8 h-8 text-primary-400 flex-shrink-0" />
                            <div>
                                <h3 className="text-2xl font-bold mb-2">Still in Development</h3>
                                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
                                    EnteraFlux is currently being built and tested. Only early access testers and pilot participants will have access during the development phase. Features, tips, and functionality may change as we improve the app.
                                </p>
                                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                                    By participating in early access, you understand that EnteraFlux is a work in progress and that wellness suggestions may not always be relevant to your specific situation.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Privacy & Data Protection */}
                    <div className="card p-8">
                        <div className="flex items-start gap-4 mb-4">
                            <Lock className="w-8 h-8 text-accent-400 flex-shrink-0" />
                            <div>
                                <h3 className="text-2xl font-bold mb-2">Your Privacy Matters</h3>
                                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
                                    Protecting your personal and wearable data is a top priority. We are committed to handling your information responsibly.
                                </p>
                                <h4 className="font-bold text-primary-400 mb-2">What We Do Now:</h4>
                                <ul className="space-y-2 text-neutral-700 dark:text-neutral-300 text-sm mb-4">
                                    <li>• All data is encrypted (both stored and in transit)</li>
                                    <li>• Any shared data is anonymised so it cannot be traced back to you</li>
                                    <li>• Strict access controls and activity logging</li>
                                    <li>• You control what data you share and can delete your data at any time</li>
                                </ul>
                                <h4 className="font-bold text-primary-400 mb-2">What's Coming:</h4>
                                <ul className="space-y-2 text-neutral-700 dark:text-neutral-300 text-sm">
                                    <li>• Compliance with India's Digital Personal Data Protection Act (DPDPA) — by launch</li>
                                    <li>• Independent security audits — 2027</li>
                                    <li>• GDPR compliance for any international users — 2027</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* No Warranty */}
                    <div className="card p-8">
                        <h3 className="text-xl font-bold mb-4">No Warranty</h3>
                        <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed">
                            EnteraFlux is provided "as is" without any warranties, express or implied. We make no representations or warranties regarding the accuracy, reliability, completeness, or timeliness of wellness information provided by the app. Use of EnteraFlux is at your own risk.
                        </p>
                    </div>

                    {/* Limitation of Liability */}
                    <div className="card p-8">
                        <h3 className="text-xl font-bold mb-4">Limitation of Liability</h3>
                        <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed mb-4">
                            To the fullest extent permitted by Indian law, EnteraFlux and its affiliates, officers, directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the app.
                        </p>
                        <p className="text-neutral-600 dark:text-neutral-400 text-xs italic">
                            This includes but is not limited to damages for loss of profits, data, or other intangible losses, even if we have been advised of the possibility of such damages.
                        </p>
                    </div>

                    {/* Contact for Legal Questions */}
                    <div className="card p-8">
                        <h3 className="text-xl font-bold mb-4">Questions or Concerns?</h3>
                        <p className="text-neutral-700 dark:text-neutral-300 text-sm">
                            If you have questions about these disclaimers, our approach, or data privacy practices, please contact us at:
                        </p>
                        <p className="text-primary-400 mt-2">
                            <a href="mailto:contact.enteraflux@gmail.com" className="hover:text-primary-300 transition-colors">
                                contact.enteraflux@gmail.com
                            </a>
                        </p>
                    </div>
                </div>
            </Section>

            <Section variant="default">
                <div className="max-w-3xl mx-auto text-center">
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                        Last updated: January 2026. EnteraFlux reserves the right to update these disclaimers as the app evolves. Material changes will be communicated to users.
                    </p>
                </div>
            </Section>
        </div>
    );
}
