import Section from '../components/Section';
import Timeline from '../components/Timeline';
import Badge from '../components/Badge';
import ScrollReveal from '../components/ScrollReveal';
import { TIMELINE_PHASES } from '../data/content';

export default function Roadmap() {
    return (
        <div>
            <Section
                title="Development Roadmap"
                subtitle="Transparent progress from R&D to Commercial Launch"
                variant="gradient"
                firstSection
            >
                <div className="max-w-4xl mx-auto text-center">
                    <ScrollReveal delay={200} direction="up">
                        <p className="text-lg text-neutral-700 dark:text-neutral-300 mb-8">
                            We are building EnteraFlux with a "Safety First, Move Fast" philosophy. Unlike typical consumer health apps, our roadmap is dictated by rigorous clinical validation and regulatory milestones. We are currently in the Alpha phase, focusing on infrastructure stability and initial biomarker model training.
                        </p>
                    </ScrollReveal>
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
                    {/* Alpha Phase */}
                    <div className="glass rounded-xl p-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <h1 className="text-9xl font-bold">01</h1>
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-2xl font-bold">Alpha Phase (Current)</h3>
                                <Badge text="In Progress" variant="development" />
                            </div>
                            <p className="text-neutral-700 dark:text-neutral-300 mb-6 max-w-3xl">
                                The foundation. We are currently architecting the secure data pipelines, training our initial Transformer-based time-series models on synthetic and retrospective datasets, and establishing our regulatory compliance framework.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="font-semibold text-primary-500 mb-3 border-b border-neutral-200 dark:border-neutral-700 pb-2">Engineering & AI</h4>
                                    <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                                        <li>• <strong>Data Pipeline:</strong> implementing robust ELT pipelines for high-velocity wearable data.</li>
                                        <li>• <strong>Model Architecture:</strong> Developing LSTM and Transformer models for anomaly detection.</li>
                                        <li>• <strong>Security:</strong> Implementing encryption-at-rest and strict IAM policies.</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-primary-500 mb-3 border-b border-neutral-200 dark:border-neutral-700 pb-2">Clinical & Research</h4>
                                    <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                                        <li>• <strong>Biomarker Validation:</strong> Reviewing literature to establish baseline correlation for HRV and Nausea.</li>
                                        <li>• <strong>Synthetic Data:</strong> Generative adversarial networks (GANs) to simulate patient cohorts for stress testing.</li>
                                        <li>• <strong>Regulatory Strategy:</strong> Drafting the Pre-Submission package for FDA engagement.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Beta Phase */}
                    <div className="glass rounded-xl p-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <h1 className="text-9xl font-bold">02</h1>
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-2xl font-bold">Beta Phase</h3>
                                <Badge text="Q2-Q3 2026" variant="status" />
                            </div>
                            <p className="text-neutral-700 dark:text-neutral-300 mb-6 max-w-3xl">
                                The validation. We will open the platform to a closed cohort of 500 GLP-1 patients to gather real-world data, refine our coaching algorithms, and stress-test our infrastructure.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="font-semibold text-primary-500 mb-3 border-b border-neutral-200 dark:border-neutral-700 pb-2">Product Features</h4>
                                    <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                                        <li>• <strong>Mobile App Launch:</strong> Native iOS and Android apps for patient onboarding.</li>
                                        <li>• <strong>Real-time Dashboard:</strong> Patient-facing views of metabolic stress scores.</li>
                                        <li>• <strong>Coaching Engine v1:</strong> Rule-based interventions for hydration and diet.</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-primary-500 mb-3 border-b border-neutral-200 dark:border-neutral-700 pb-2">Milestones</h4>
                                    <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                                        <li>• <strong>Cohort Enrollment:</strong> 500 active users with {'>'}70% daily active usage.</li>
                                        <li>• <strong>Model Tuning:</strong> RLHF (Reinforcement Learning from Human Feedback) on alert accuracy.</li>
                                        <li>• <strong>HIPAA Audit:</strong> Third-party verification of compliance controls.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Research Pilots */}
                    <div className="glass rounded-xl p-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <h1 className="text-9xl font-bold">03</h1>
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-2xl font-bold">Research Pilots</h3>
                                <Badge text="Q4 2026" variant="research" />
                            </div>
                            <p className="text-neutral-700 dark:text-neutral-300 mb-6 max-w-3xl">
                                The expansion. We systematically validate our clinical utility through partnerships with CROs and academic institutions, moving from "app" to "evidence generation platform."
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="font-semibold text-primary-500 mb-3 border-b border-neutral-200 dark:border-neutral-700 pb-2">Partnerships</h4>
                                    <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                                        <li>• <strong>CRO Pilots:</strong> Integration with major Clinical Research Organizations.</li>
                                        <li>• <strong>Academic Studies:</strong> Observational studies with university metabolic centers.</li>
                                        <li>• <strong>Pharma Engagement:</strong> Post-market surveillance pilots with manufacturers.</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-primary-500 mb-3 border-b border-neutral-200 dark:border-neutral-700 pb-2">Outputs</h4>
                                    <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                                        <li>• <strong>White Papers:</strong> Publication of initial predictive validity results.</li>
                                        <li>• <strong>Case Studies:</strong> Documented instances of adverse event prevention.</li>
                                        <li>• <strong>Data Products:</strong> Launch of "Synthetic Control Arm" datasets.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Regulatory & Commercial */}
                    <div className="glass rounded-xl p-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <h1 className="text-9xl font-bold">04</h1>
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-2xl font-bold">Regulatory & Commercial</h3>
                                <Badge text="2027+" variant="regulatory" />
                            </div>
                            <p className="text-neutral-700 dark:text-neutral-300 mb-6 max-w-3xl">
                                The standard of care. With accumulated evidence, we pursue formal regulatory clearance to market EnteraFlux as a clinical decision support tool and expand globally.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="font-semibold text-primary-500 mb-3 border-b border-neutral-200 dark:border-neutral-700 pb-2">Regulatory Pathway</h4>
                                    <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                                        <li>• <strong>FDA Submission:</strong> 510(k) or De Novo submission for SaMD status.</li>
                                        <li>• <strong>ISO 13485:</strong> Full Quality Management System certification.</li>
                                        <li>• <strong>CE Mark:</strong> Regulatory clearance for EU market entry.</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-primary-500 mb-3 border-b border-neutral-200 dark:border-neutral-700 pb-2">Commercialization</h4>
                                    <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                                        <li>• <strong>Reimbursement:</strong> Securing CPT codes for remote patient monitoring.</li>
                                        <li>• <strong>Enterprise:</strong> Employer health plan integration.</li>
                                        <li>• <strong>Global Expansion:</strong> Launch in Canada, UK, and Australia.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    );
}
