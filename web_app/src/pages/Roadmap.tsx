import Section from '../components/Section';
import Timeline from '../components/Timeline';
import Badge from '../components/Badge';
import ScrollText from '../components/ScrollText';
import { TIMELINE_PHASES } from '../data/content';

export default function Roadmap() {
    return (
        <div>
            <Section
                title="Development Roadmap"
                subtitle="Transparent progress from Alpha to Commercial Launch"
                variant="gradient"
                firstSection
            >
                <div className="max-w-4xl mx-auto text-center">
                    <ScrollText delay={200}>
                        <p className="text-lg text-neutral-700 dark:text-neutral-300 mb-8">
                            We're building EnteraFlux with regulatory validation and clinical safety as foundational requirements, not afterthoughts. This roadmap reflects our commitment to evidence-based development.
                        </p>
                    </ScrollText>
                    <div className="flex justify-center gap-3 flex-wrap">
                        <Badge text="Currently in Alpha Phase" variant="development" />
                        <Badge text="Beta Access Q2 2026" variant="status" />
                    </div>
                </div>
            </Section>

            <Section title="Phases" variant="dark">
                <Timeline phases={TIMELINE_PHASES} />
            </Section>

            <Section title="Phase Details" variant="default">
                <div className="max-w-5xl mx-auto space-y-8">
                    <div className="glass rounded-xl p-8">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-2xl font-bold">Alpha Phase (Current)</h3>
                            <Badge text="In Progress" variant="development" />
                        </div>
                        <p className="text-neutral-700 dark:text-neutral-300 mb-6">
                            Building core platform infrastructure, biomarker ingestion pipelines, and initial AI model training. Internal testing with simulated data and early validation studies.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <h4 className="font-semibold text-primary-400 mb-2">Engineering Focus</h4>
                                <ul className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                                    <li>• Wearable API integrations</li>
                                    <li>• Data pipeline infrastructure</li>
                                    <li>• ML model architecture</li>
                                    <li>• Security and privacy foundations</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-primary-400 mb-2">Research Focus</h4>
                                <ul className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                                    <li>• Biomarker validation studies</li>
                                    <li>• Model training datasets</li>
                                    <li>• Clinical literature review</li>
                                    <li>• Regulatory pathway planning</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="glass rounded-xl p-8">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-2xl font-bold">Beta Phase</h3>
                            <Badge text="Q2-Q3 2026" variant="status" />
                        </div>
                        <p className="text-neutral-700 dark:text-neutral-300 mb-6">
                            Limited user testing with real GLP-1 patients. Refinement of coaching algorithms, tolerance prediction models, and intervention frameworks. Wearable integrations expanded.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <h4 className="font-semibold text-primary-400 mb-2">Features</h4>
                                <ul className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                                    <li>• Patient onboarding flow</li>
                                    <li>• Real-time monitoring dashboard</li>
                                    <li>• Adaptive coaching engine</li>
                                    <li>• Emergency alerting system</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-primary-400 mb-2">Milestones</h4>
                                <ul className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                                    <li>• 100+ beta testers enrolled</li>
                                    <li>• Model performance validation</li>
                                    <li>• User feedback integration</li>
                                    <li>• Platform stability improvements</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="glass rounded-xl p-8">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-2xl font-bold">Research Pilots</h3>
                            <Badge text="Q4 2026" variant="research" />
                        </div>
                        <p className="text-neutral-700 dark:text-neutral-300 mb-6">
                            Partnership pilots with CROs, academic institutions, and pharmaceutical companies. Pharmacovigilance signal validation. Real-world evidence generation studies.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <h4 className="font-semibold text-primary-400 mb-2">Partnerships</h4>
                                <ul className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                                    <li>• CRO data exchange pilots</li>
                                    <li>• Academic research collaborations</li>
                                    <li>• Pharma post-market surveillance</li>
                                    <li>• Regulatory body engagement</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-primary-400 mb-2">Outputs</h4>
                                <ul className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                                    <li>• Peer-reviewed publications</li>
                                    <li>• Conference presentations</li>
                                    <li>• Real-world evidence reports</li>
                                    <li>• Safety signal validation studies</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="glass rounded-xl p-8">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-2xl font-bold">Regulatory Pathway</h3>
                            <Badge text="2027" variant="regulatory" />
                        </div>
                        <p className="text-neutral-700 dark:text-neutral-300 mb-6">
                            FDA engagement for potential Software as a Medical Device (SaMD) classification. Preparation of regulatory submissions. Clinical validation studies. Compliance documentation.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <h4 className="font-semibold text-primary-400 mb-2">Regulatory Steps</h4>
                                <ul className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                                    <li>• Pre-submission meetings (FDA)</li>
                                    <li>• Clinical validation trials</li>
                                    <li>• 510(k) or De Novo pathway decision</li>
                                    <li>• Quality Management System (QMS)</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-primary-400 mb-2">Compliance</h4>
                                <ul className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                                    <li>• HIPAA full compliance</li>
                                    <li>• GDPR alignment (EU expansion)</li>
                                    <li>• ISO 13485 certification (roadmap)</li>
                                    <li>• Cybersecurity risk management</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="glass rounded-xl p-8">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-2xl font-bold">Commercial Phase</h3>
                            <Badge text="2027-2028" variant="status" />
                        </div>
                        <p className="text-neutral-700 dark:text-neutral-300 mb-6">
                            Market launch with regulatory clearance. Scaling infrastructure for broader patient populations. Expanded features, additional wearable integrations, and international expansion.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <h4 className="font-semibold text-primary-400 mb-2">Launch Strategy</h4>
                                <ul className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                                    <li>• Direct-to-patient access</li>
                                    <li>• Clinician partnerships</li>
                                    <li>• Insurance reimbursement pathways</li>
                                    <li>• Employer wellness programs</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-primary-400 mb-2">Expansion</h4>
                                <ul className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                                    <li>• Additional medication classes</li>
                                    <li>• International markets (EU, CA, AU)</li>
                                    <li>• Advanced AI capabilities</li>
                                    <li>• Ecosystem partnerships</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    );
}
