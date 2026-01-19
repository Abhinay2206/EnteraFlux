import Section from '../components/Section';
import Badge from '../components/Badge';
import ScrollReveal from '../components/ScrollReveal';
import { AlertTriangle, Shield, FileText, Lock } from 'lucide-react';

export default function Legal() {
    return (
        <div>
            <Section
                title="Legal Disclaimers & Compliance"
                subtitle="Important information about platform status and regulatory alignment"
                variant="gradient"
                firstSection
            >
                <ScrollReveal delay={200} direction="up">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="flex flex-wrap justify-center gap-3 mb-6">
                            <Badge text="Platform Under Development" variant="development" />
                            <Badge text="Not a Medical Device" variant="regulatory" />
                            <Badge text="Research-Only Phase" variant="research" />
                        </div>
                    </div>
                </ScrollReveal>
            </Section>

            <Section variant="dark">
                <div className="max-w-4xl mx-auto space-y-8">
                    {/* Not a Medical Device */}
                    <div className="glass rounded-xl p-8">
                        <div className="flex items-start gap-4 mb-4">
                            <AlertTriangle className="w-8 h-8 text-amber-400 flex-shrink-0" />
                            <div>
                                <h3 className="text-2xl font-bold mb-2">Not a Medical Device</h3>
                                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                                    EnteraFlux is currently <strong>not cleared or approved</strong> by the FDA or any other regulatory authority as a medical device. The platform is in active development and research validation. <strong>Do not use EnteraFlux for clinical decision-making, diagnosis, or treatment.</strong>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Not for Clinical Use */}
                    <div className="glass rounded-xl p-8">
                        <div className="flex items-start gap-4 mb-4">
                            <Shield className="w-8 h-8 text-red-400 flex-shrink-0" />
                            <div>
                                <h3 className="text-2xl font-bold mb-2">Not for Clinical Use</h3>
                                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
                                    The information, predictions, and recommendations provided by EnteraFlux are for <strong>research and informational purposes only</strong>. They should not be interpreted as medical advice. Always consult a licensed healthcare provider for medical guidance.
                                </p>
                                <p className="text-neutral-600 dark:text-neutral-400 text-sm italic">
                                    If you are experiencing a medical emergency, call 911 or your local emergency services immediately. EnteraFlux is not an emergency response system.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Research-Only Phase */}
                    <div className="glass rounded-xl p-8">
                        <div className="flex items-start gap-4 mb-4">
                            <FileText className="w-8 h-8 text-primary-400 flex-shrink-0" />
                            <div>
                                <h3 className="text-2xl font-bold mb-2">Research-Only Phase</h3>
                                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
                                    EnteraFlux is currently in a research and development phase. Access is limited to beta testers, research partners, and pilot program participants. Data collected may be used for research purposes, model training, and platform improvement.
                                </p>
                                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                                    By participating in EnteraFlux research activities, you acknowledge that the platform is experimental and that predictions may be inaccurate or incomplete.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Privacy & Data Protection */}
                    <div className="glass rounded-xl p-8">
                        <div className="flex items-start gap-4 mb-4">
                            <Lock className="w-8 h-8 text-accent-400 flex-shrink-0" />
                            <div>
                                <h3 className="text-2xl font-bold mb-2">Privacy & Data Protection</h3>
                                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
                                    We take data privacy seriously. EnteraFlux is committed to aligning with HIPAA (Health Insurance Portability and Accountability Act) and GDPR (General Data Protection Regulation) standards.
                                </p>
                                <h4 className="font-bold text-primary-400 mb-2">Current Status:</h4>
                                <ul className="space-y-2 text-neutral-700 dark:text-neutral-300 text-sm mb-4">
                                    <li>• Data encryption at rest and in transit</li>
                                    <li>• De-identification of research datasets</li>
                                    <li>• Access controls and audit logging</li>
                                    <li>• User consent management</li>
                                </ul>
                                <h4 className="font-bold text-primary-400 mb-2">Roadmap:</h4>
                                <ul className="space-y-2 text-neutral-700 dark:text-neutral-300 text-sm">
                                    <li>• Full HIPAA compliance (by Beta phase)</li>
                                    <li>• GDPR alignment for EU expansion (2027)</li>
                                    <li>• SOC 2 Type II certification (2027)</li>
                                    <li>• Third-party security audits</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* No Warranty */}
                    <div className="glass rounded-xl p-8">
                        <h3 className="text-xl font-bold mb-4">No Warranty</h3>
                        <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed">
                            EnteraFlux is provided "as is" without any warranties, express or implied. We make no representations or warranties regarding the accuracy, reliability, completeness, or timeliness of information provided by the platform. Use of EnteraFlux is at your own risk.
                        </p>
                    </div>

                    {/* Limitation of Liability */}
                    <div className="glass rounded-xl p-8">
                        <h3 className="text-xl font-bold mb-4">Limitation of Liability</h3>
                        <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed mb-4">
                            To the fullest extent permitted by law, EnteraFlux and its affiliates, officers, directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the platform.
                        </p>
                        <p className="text-neutral-600 dark:text-neutral-400 text-xs italic">
                            This includes but is not limited to damages for loss of profits, data, or other intangible losses, even if we have been advised of the possibility of such damages.
                        </p>
                    </div>

                    {/* Regulatory Pathway */}
                    <div className="glass rounded-xl p-8">
                        <h3 className="text-xl font-bold mb-4">Regulatory Pathway</h3>
                        <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed mb-4">
                            We are actively working toward regulatory validation. Our roadmap includes:
                        </p>
                        <ul className="space-y-2 text-neutral-700 dark:text-neutral-300 text-sm">
                            <li>• Pre-submission engagement with the FDA for Software as a Medical Device (SaMD) classification</li>
                            <li>• Clinical validation studies to support regulatory filings</li>
                            <li>• Quality Management System (QMS) implementation aligned with ISO 13485</li>
                            <li>• Pursuit of 510(k) clearance or De Novo pathway (decision pending)</li>
                        </ul>
                        <p className="text-neutral-600 dark:text-neutral-400 text-sm mt-4 italic">
                            Timelines are subject to change based on regulatory guidance, validation results, and platform development progress.
                        </p>
                    </div>

                    {/* Contact for Legal Questions */}
                    <div className="glass rounded-xl p-8">
                        <h3 className="text-xl font-bold mb-4">Questions or Concerns?</h3>
                        <p className="text-neutral-700 dark:text-neutral-300 text-sm">
                            If you have questions about these disclaimers, our compliance roadmap, or data privacy practices, please contact us at:
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
                        Last updated: January 2026. EnteraFlux reserves the right to update these disclaimers as the platform evolves and regulatory status changes. Material changes will be communicated to users.
                    </p>
                </div>
            </Section>
        </div>
    );
}
