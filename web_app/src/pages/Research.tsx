import { useEffect } from 'react';
import Section from '../components/Section';
import CTA from '../components/CTA';
import ScrollReveal from '../components/ScrollReveal';
import { Database, FileText, Shield, Users, FlaskConical, TrendingUp } from 'lucide-react';
import PharmacovigilanceChart from '../components/visualizations/PharmacovigilanceChart';

export default function Research() {
    useEffect(() => {
        document.title = 'Research - EnteraFlux';
    }, []);

    return (
        <div>
            <Section
                title="Research & Regulatory Partnerships"
                subtitle="Enabling safer GLP-1 therapies through validated real-world evidence infrastructure"
                variant="gradient"
                firstSection
            >
                <ScrollReveal delay={200} direction="up">
                    <div className="max-w-4xl mx-auto">
                        <p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed mb-8">
                            EnteraFlux is built to bridge the gap between clinical trial efficacy and real-world safety. We provide Clinical Research Organizations (CROs), academic institutions, pharmaceutical manufacturers, and regulators with the high-fidelity data infrastructure needed to advance metabolic therapy safety and post-market surveillance.
                        </p>
                    </div>
                </ScrollReveal>
            </Section>

            <Section title="Ecosystem Infrastructure" variant="dark">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <ScrollReveal delay={100} direction="up">
                            <div className="glass rounded-xl p-8 hover-lift cursor-default premium-card">
                                <Users className="w-12 h-12 text-primary-400 mb-4" />
                                <h3 className="text-xl font-bold mb-3">Precision Cohort Matching</h3>
                                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                                    Accelerate recruitment by identifying eligible patients based on granular physiological phenotypes, not just demographic data.
                                </p>
                                <div className="bg-neutral-50 dark:bg-neutral-800/50 rounded-lg p-4">
                                    <h4 className="font-semibold text-sm mb-2 text-primary-500">Capabilities</h4>
                                    <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                                        <li>• Physiological phenotyping (e.g., "High HRV Responders")</li>
                                        <li>• Automated inclusion/exclusion screening</li>
                                        <li>• Direct-to-patient digital consent workflows</li>
                                        <li>• Real-time enrollment and retention dashboards</li>
                                    </ul>
                                </div>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={200} direction="up">
                            <div className="glass rounded-xl p-8 hover-lift cursor-default premium-card">
                                <Database className="w-12 h-12 text-primary-400 mb-4" />
                                <h3 className="text-xl font-bold mb-3">Interoperable Data Exchange</h3>
                                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                                    Break down data silos with our API-first, standards-based architecture designed for seamless EDC integration.
                                </p>
                                <div className="bg-neutral-50 dark:bg-neutral-800/50 rounded-lg p-4">
                                    <h4 className="font-semibold text-sm mb-2 text-primary-500">Technical Specs</h4>
                                    <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                                        <li>• HL7 FHIR R4 standard compliance</li>
                                        <li>• RESTful API endpoints for raw and aggregate data</li>
                                        <li>• Secure webhooks for real-time event triggers</li>
                                        <li>• Automated EDC population (RedCap, Medidata)</li>
                                    </ul>
                                </div>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={300} direction="up">
                            <div className="glass rounded-xl p-8 hover-lift cursor-default premium-card">
                                <FlaskConical className="w-12 h-12 text-primary-400 mb-4" />
                                <h3 className="text-xl font-bold mb-3">Real-World Evidence (RWE)</h3>
                                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                                    Capture high-fidelity physiological data outside controlled trial environments to supplement RCT findings and support label expansion.
                                </p>
                                <div className="bg-neutral-50 dark:bg-neutral-800/50 rounded-lg p-4">
                                    <h4 className="font-semibold text-sm mb-2 text-primary-500">Data Assets</h4>
                                    <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                                        <li>• Continuous longitudinal biomarker streams</li>
                                        <li>• Context-aware patient reported outcomes (ePRO)</li>
                                        <li>• Medication adherence verificaton</li>
                                        <li>• Synthetic control arm generation</li>
                                    </ul>
                                </div>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={400} direction="up">
                            <div className="glass rounded-xl p-8 hover-lift cursor-default premium-card">
                                <Shield className="w-12 h-12 text-primary-400 mb-4" />
                                <h3 className="text-xl font-bold mb-3">Regulatory-Grade Compliance</h3>
                                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                                    Ensure data integrity and patient safety with our robust quality management and compliance framework.
                                </p>
                                <div className="bg-neutral-50 dark:bg-neutral-800/50 rounded-lg p-4">
                                    <h4 className="font-semibold text-sm mb-2 text-primary-500">Standards</h4>
                                    <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                                        <li>• 21 CFR Part 11 ready audit trails</li>
                                        <li>• Full data provenance and chain of custody</li>
                                        <li>• HIPAA & GDPR compliant architecture</li>
                                        <li>• ISO 27001 security controls (Roadmap)</li>
                                    </ul>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>

                    <div className="mt-16 text-center">
                        <CTA text="Partner with Us (CRO)" href="/contact?type=researcher" variant="primary" />
                    </div>
                </div>
            </Section>

            <Section title="Data Fidelity & Quality" variant="default">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <p className="text-neutral-700 dark:text-neutral-300">
                        We don't just aggregate data; we standardize and enrich it. EnteraFlux ingests raw sensor data at the highest available sampling rates supported by consumer hardware, applying clinical-grade signal processing to ensure research readiness.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    <div className="card p-6 text-center">
                        <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">High-Res</div>
                        <div className="text-sm font-semibold mb-2">Sampling Rate</div>
                        <p className="text-xs text-neutral-500">Ingestion of beat-to-beat intervals (RR intervals) where supported for precise HRV calculation.</p>
                    </div>
                    <div className="card p-6 text-center">
                        <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">Meta-Data</div>
                        <div className="text-sm font-semibold mb-2">Contextual Enrichment</div>
                        <p className="text-xs text-neutral-500">All samples tagged with device source, confidence intervals, and user activity state (sleep/wake/motion).</p>
                    </div>
                    <div className="card p-6 text-center">
                        <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">Clean</div>
                        <div className="text-sm font-semibold mb-2">Artifact Removal</div>
                        <p className="text-xs text-neutral-500">Automated filtering of signal noise and motion artifacts to maximize signal-to-noise ratio.</p>
                    </div>
                </div>
            </Section>

            <Section title="Pharmacovigilance Intelligence" variant="dark">
                <div className="max-w-4xl mx-auto">
                    <div className="glass rounded-xl p-8 mb-8">
                        <TrendingUp className="w-12 h-12 text-secondary-400 mb-4" />
                        <h3 className="text-2xl font-bold mb-4">Digital Pharmacovigilance (Digital PV)</h3>
                        <p className="text-neutral-700 dark:text-neutral-300 mb-6">
                            Traditional pharmacovigilance relies on passive, retrospective reporting. EnteraFlux actively monitors the "digital pulse" of the GLP-1 patient population to detect safety signals <strong>months earlier</strong> than traditional channels.
                        </p>
                        <div className="mb-12">
                            <PharmacovigilanceChart />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white/50 dark:bg-black/20 rounded-xl p-5">
                                <h4 className="font-bold text-primary-400 mb-2">NLP Sentiment Analysis</h4>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                    Advanced Natural Language Processing (NLP) models scan millions of social posts to extract adverse event mentions and sentiment shifts.
                                </p>
                            </div>
                            <div className="bg-white/50 dark:bg-black/20 rounded-xl p-5">
                                <h4 className="font-bold text-primary-400 mb-2">Community Pattern Detection</h4>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                    Identification of symptom clusters in communities like r/Ozempic and r/Mounjaro that may indicate batch issues or novel side effects.
                                </p>
                            </div>
                            <div className="bg-white/50 dark:bg-black/20 rounded-xl p-5">
                                <h4 className="font-bold text-primary-400 mb-2">Automated Literature Review</h4>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                    Continuous scanning of PubMed and clinical trial registries to correlate digital signals with emerging clinical findings.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="glass rounded-xl p-8">
                        <FileText className="w-12 h-12 text-accent-400 mb-4" />
                        <h3 className="text-xl font-bold mb-3">Regulatory Reporting Integration</h3>
                        <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                            We transform unstructured data into structured, regulatory-ready formats to streamline safety reporting workflows.
                        </p>
                        <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                            <li>• Mapping to MedDRA (Medical Dictionary for Regulatory Activities) terms</li>
                            <li>• E2B(R3) compatible export formats for ICSRs</li>
                            <li>• Automated signal strength scoring and prioritization</li>
                        </ul>
                    </div>
                </div>
            </Section>

        </div>
    );
}
