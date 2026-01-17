import Section from '../components/Section';
import CTA from '../components/CTA';
import ScrollText from '../components/ScrollText';
import { Database, FileText, Shield, Users, FlaskConical, TrendingUp } from 'lucide-react';

export default function Research() {
    return (
        <div>
            <Section
                title="Research & Regulatory Partnerships"
                subtitle="Enabling safer GLP-1 therapies through validated research infrastructure"
                variant="gradient"
                firstSection
            >
                <ScrollText delay={200}>
                    <div className="max-w-4xl mx-auto">
                        <p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed mb-8">
                            EnteraFlux is built for research from the ground up. We provide CROs, academic institutions, pharmaceutical companies, and regulators with the tools and data infrastructure needed to advance metabolic therapy safety.
                        </p>
                    </div>
                </ScrollText>
            </Section>

            <Section title="For Clinical Research Organizations" variant="dark">
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="glass rounded-xl p-8">
                            <Users className="w-12 h-12 text-primary-400 mb-4" />
                            <h3 className="text-xl font-bold mb-3">Patient Cohort Matching</h3>
                            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                                Identify eligible patients for GLP-1 clinical trials based on physiological profiles, medication history, and tolerance patterns.
                            </p>
                            <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                                <li>• Automated eligibility screening</li>
                                <li>• Consent workflow management</li>
                                <li>• Real-time enrollment tracking</li>
                            </ul>
                        </div>

                        <div className="glass rounded-xl p-8">
                            <Database className="w-12 h-12 text-primary-400 mb-4" />
                            <h3 className="text-xl font-bold mb-3">FHIR-Compatible Data Exchange</h3>
                            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                                Seamless integration with Electronic Health Record (EHR) systems and trial management platforms.
                            </p>
                            <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                                <li>• FHIR R4 standards compliance</li>
                                <li>• API-first architecture</li>
                                <li>• De-identified data pipelines</li>
                            </ul>
                        </div>

                        <div className="glass rounded-xl p-8">
                            <FlaskConical className="w-12 h-12 text-primary-400 mb-4" />
                            <h3 className="text-xl font-bold mb-3">Real-World Evidence Generation</h3>
                            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                                Capture high-fidelity physiological data outside controlled trial environments to supplement RCT findings.
                            </p>
                            <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                                <li>• Continuous wearable monitoring</li>
                                <li>• Patient-reported outcomes integration</li>
                                <li>• Longitudinal tolerance tracking</li>
                            </ul>
                        </div>

                        <div className="glass rounded-xl p-8">
                            <Shield className="w-12 h-12 text-primary-400 mb-4" />
                            <h3 className="text-xl font-bold mb-3">Regulatory-Grade Traceability</h3>
                            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                                Full audit trails, data provenance, and quality assurance for regulatory submissions.
                            </p>
                            <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                                <li>• Immutable data logs</li>
                                <li>• Chain of custody documentation</li>
                                <li>• 21 CFR Part 11 alignment (roadmap)</li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-16 text-center">
                        <CTA text="Partner with Us (CRO)" href="/contact?type=researcher" variant="primary" />
                    </div>
                </div>
            </Section>

            <Section title="Pharmacovigilance Intelligence" variant="default">
                <div className="max-w-4xl mx-auto">
                    <div className="glass rounded-xl p-8 mb-8">
                        <TrendingUp className="w-12 h-12 text-secondary-400 mb-4" />
                        <h3 className="text-2xl font-bold mb-4">Early Signal Detection</h3>
                        <p className="text-neutral-700 dark:text-neutral-300 mb-6">
                            Traditional pharmacovigilance relies on passive reporting systems. EnteraFlux actively monitors social platforms, online communities, and clinical literature to detect emerging safety signals earlier.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <h4 className="font-bold text-primary-400 mb-2">Twitter/X Analysis</h4>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                    Sentiment analysis and adverse event extraction from GLP-1 patient discussions.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-bold text-primary-400 mb-2">Reddit Communities</h4>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                    Pattern detection in forums like r/Ozempic, r/Semaglutide, and related communities.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-bold text-primary-400 mb-2">Clinical Literature</h4>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                    Automated monitoring of new publications, trial results, and case reports.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="glass rounded-xl p-8">
                        <FileText className="w-12 h-12 text-accent-400 mb-4" />
                        <h3 className="text-xl font-bold mb-3">Regulatory Reporting Dashboards</h3>
                        <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                            Structured, FDA-compatible reporting formats for manufacturers, regulators, and safety committees.
                        </p>
                        <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                            <li>• MedWatch-aligned adverse event categorization</li>
                            <li>• Automated signal aggregation and clustering</li>
                            <li>• Exportable reports for regulatory submissions</li>
                        </ul>
                    </div>
                </div>
            </Section>

        </div>
    );
}
