import Hero from '../components/Hero';
import Section from '../components/Section';
import ModuleCard from '../components/ModuleCard';
import Timeline from '../components/Timeline';
import Badge from '../components/Badge';
import CTA from '../components/CTA';
import ResponsiveGrid from '../components/ResponsiveGrid';
import { BRAND, PROBLEMS, MODULES, TIMELINE_PHASES, COMPLIANCE, AUDIENCE_CTAS, POSITIONING_PILLARS } from '../data/content';
import { Activity, Heart, Shield, TrendingUp, Microscope, AlertTriangle, Users, Database, BarChart3} from 'lucide-react';

export default function Home() {
    return (
        <div>
            {/* Hero Section */}
            <Hero
                title={BRAND.name}
                subtitle={BRAND.tagline}
                primaryCTA={{
                    text: 'Join Waitlist',
                    href: '/contact?type=patient',
                    variant: 'primary',
                }}
                badge={COMPLIANCE.development}
            />

            {/* Statistics Section */}
            <Section
                title="By the Numbers"
                subtitle="Evidence-based platform built on rigorous research and clinical insights"
                variant="default"
            >
                <div className="max-w-6xl mx-auto">
                    {/* Illustration */}
                    <div className="mb-16 max-w-2xl mx-auto">
                        <img
                            src="/images/analytics-illustration.png"
                            alt="Real-time health monitoring and predictive analytics"
                            className="w-full h-auto rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center card-elevated p-8 hover-lift">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/50 dark:to-primary-800/50 flex items-center justify-center">
                                <Users className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                            </div>
                            <div className="text-4xl font-bold text-neutral-900 dark:text-white mb-2">15M+</div>
                            <div className="text-sm text-neutral-600 dark:text-neutral-300 font-medium">GLP-1 Therapy Patients (US)</div>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">Growing market requiring advanced safety monitoring</p>
                        </div>
                        <div className="text-center card-elevated p-8 hover-lift">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-success-100 to-success-200 dark:from-success-900/50 dark:to-success-800/50 flex items-center justify-center">
                                <Database className="w-8 h-8 text-success-600 dark:text-success-400" />
                            </div>
                            <div className="text-4xl font-bold text-neutral-900 dark:text-white mb-2">24/7</div>
                            <div className="text-sm text-neutral-600 dark:text-neutral-300 font-medium">Continuous Monitoring</div>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">Physiological data capture from wearable devices</p>
                        </div>
                        <div className="text-center card-elevated p-8 hover-lift">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-warning-100 to-warning-200 dark:from-warning-900/50 dark:to-warning-800/50 flex items-center justify-center">
                                <BarChart3 className="w-8 h-8 text-warning-600 dark:text-warning-400" />
                            </div>
                            <div className="text-4xl font-bold text-neutral-900 dark:text-white mb-2">40%</div>
                            <div className="text-sm text-neutral-600 dark:text-neutral-300 font-medium">Discontinuation Rate</div>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">Due to adverse events - our target to reduce</p>
                        </div>
                    </div>
                </div>
            </Section>

            {/* Problem Section */}
            <Section
                title="Clinical Challenges in GLP-1 Therapy"
                subtitle="Addressing critical safety and adherence barriers in metabolic treatment"
                variant="dark"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {PROBLEMS.map((problem, index) => (
                        <div key={index} className="card p-6 flex items-start gap-4">
                            <AlertTriangle className="w-6 h-6 text-warning-500 dark:text-warning-400 flex-shrink-0 mt-1" />
                            <p className="text-neutral-700 dark:text-neutral-300">{problem}</p>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Solution Section */}
            <Section
                title="Comprehensive Clinical Decision Support"
                subtitle="Integrating predictive analytics, continuous monitoring, and evidence-based interventions"
            >
                <div className="max-w-5xl mx-auto">
                    <div className="card-elevated p-8 sm:p-12 mb-12">
                        <p className="text-lg text-neutral-700 dark:text-neutral-300 mb-8 leading-relaxed">
                            {BRAND.mission}
                        </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        {POSITIONING_PILLARS.slice(0, 6).map((pillar, index) => (
                            <div key={index} className="card p-6 text-center hover:shadow-md dark:hover:shadow-lg-dark transition-shadow">
                                <h4 className="text-sm font-bold text-primary-700 dark:text-primary-400 mb-2">{pillar.title}</h4>
                                <p className="text-xs text-neutral-600 dark:text-neutral-400">{pillar.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </Section>

            {/* Modules Section */}
            <Section
                title="Integrated Platform Modules"
                subtitle="Comprehensive solutions for patients, clinical researchers, and regulatory stakeholders"
                variant="gradient"
            >
                <ResponsiveGrid columns={{ mobile: 1, tablet: 2, desktop: 3 }}>
                    {MODULES.map((module) => (
                        <ModuleCard
                            key={module.id}
                            icon={module.icon}
                            title={module.title}
                            description={module.description}
                            features={module.features.slice(0, 4)}
                        />
                    ))}
                </ResponsiveGrid>
                <div className="text-center mt-16">
                    <CTA text="Explore All Modules" href="/modules" variant="secondary" />
                </div>
            </Section>

            {/* Platform Preview Section */}
            <Section title="Platform Interface" variant="dark">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="card p-16 sm:p-24 border-2 border-dashed border-neutral-300 dark:border-neutral-700">
                        <Microscope className="w-16 h-16 text-primary-600 dark:text-primary-400 mx-auto mb-6" />
                        <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">User Interface Development in Progress</h3>
                        <Badge text="Beta Phase Q2-Q3 2026" variant="development" />
                        <p className="text-neutral-600 dark:text-neutral-400 mt-6 max-w-lg mx-auto">
                            A research-grade, clinically-validated interface is currently under development. Platform demonstrations and UI previews will be available to beta participants during Q2-Q3 2026.
                        </p>
                    </div>
                </div>
            </Section>

            {/* Science + AI Section */}
            <Section
                title="Physiological Intelligence"
                subtitle="From biomarkers to insights to action"
            >
                <div className="max-w-5xl mx-auto">
                    {/* Science Illustration */}
                    <div className="mb-16 max-w-3xl mx-auto">
                        <img
                            src="/images/science-illustration.png"
                            alt="Medical research and biomarker analysis with AI"
                            className="w-full h-auto rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="card p-8 text-center hover:shadow-md dark:hover:shadow-lg-dark transition-shadow">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                                <Activity className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                            </div>
                            <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">Biomarkers</h3>
                            <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                                HRV, resting heart rate, sleep architecture, stress signals from consumer wearables
                            </p>
                        </div>

                        <div className="card p-8 text-center hover:shadow-md dark:hover:shadow-lg-dark transition-shadow">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                                <TrendingUp className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                            </div>
                            <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">AI Inference</h3>
                            <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                                Machine learning models trained on GLP-1 tolerance patterns and adverse event precursors
                            </p>
                        </div>

                        <div className="card p-8 text-center hover:shadow-md dark:hover:shadow-lg-dark transition-shadow">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-success-100 dark:bg-success-900/30 flex items-center justify-center">
                                <Heart className="w-8 h-8 text-success-600 dark:text-success-400" />
                            </div>
                            <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">Action</h3>
                            <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                                Adaptive coaching, intervention recommendations, and emergency alerting when needed
                            </p>
                        </div>
                    </div>

                    <div className="mt-16 text-center">
                        <CTA text="Learn the Science" href="/science" variant="text" />
                    </div>
                </div>
            </Section>

            {/* Regulatory & Research Section */}
            <Section
                title="Built for Research. Built for Validation."
                subtitle="Partnership infrastructure for CROs, regulators, and pharma"
                variant="dark"
            >
                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="card p-8">
                            <Shield className="w-12 h-12 text-success-600 dark:text-success-400 mb-4" />
                            <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">Regulatory Alignment</h3>
                            <ul className="space-y-2 text-neutral-600 dark:text-neutral-400 text-sm">
                                <li>• FHIR-compatible data exchange</li>
                                <li>• Pharmacovigilance reporting infrastructure</li>
                                <li>• FDA-aligned safety signal detection</li>
                                <li>• Audit trails and data traceability</li>
                            </ul>
                        </div>

                        <div className="card p-8">
                            <Microscope className="w-12 h-12 text-primary-600 dark:text-primary-400 mb-4" />
                            <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">Research Enablement</h3>
                            <ul className="space-y-2 text-neutral-600 dark:text-neutral-400 text-sm">
                                <li>• Clinical trial cohort matching</li>
                                <li>• CRO partnership onboarding</li>
                                <li>• De-identified data aggregation</li>
                                <li>• Real-world evidence generation</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Section>

            {/* Roadmap Section */}
            <Section title="Development Roadmap" subtitle="Transparent progress toward validation">
                <Timeline phases={TIMELINE_PHASES} />
                <div className="text-center mt-16">
                    <CTA text="View Full Roadmap" href="/roadmap" variant="text" />
                </div>
            </Section>

            {/* Development Status Section */}
            <Section
                title="Platform Status"
                subtitle="Transparency in every stage"
                variant="dark"
            >
                <div className="max-w-3xl mx-auto">
                    <div className="card p-8 space-y-4">
                        <div className="flex flex-wrap gap-3 justify-center">
                            <Badge text={COMPLIANCE.development} variant="development" />
                            <Badge text={COMPLIANCE.notMedicalDevice} variant="regulatory" />
                            <Badge text={COMPLIANCE.notClinicalUse} variant="regulatory" />
                            <Badge text={COMPLIANCE.pendingValidation} variant="status" />
                            <Badge text={COMPLIANCE.researchOnly} variant="research" />
                            <Badge text={COMPLIANCE.betaAccess} variant="development" />
                        </div>
                        <p className="text-center text-neutral-600 dark:text-neutral-400 text-sm mt-6 max-w-2xl mx-auto">
                            EnteraFlux is currently in active development and research validation. The platform is not yet cleared as a medical device and should not be used for clinical decision-making. We are building toward regulatory validation and clinical partnerships.
                        </p>
                    </div>
                </div>
            </Section>

            {/* CTA Section for Audiences */}
            <Section
                title="Get Involved"
                subtitle="Whether you're a patient, researcher, clinician, or investor"
            >
                <ResponsiveGrid columns={{ mobile: 1, tablet: 2, desktop: 4 }}>
                    {AUDIENCE_CTAS.map((item, index) => (
                        <div key={index} className="card p-6 text-center hover:shadow-lg dark:hover:shadow-xl-dark transition-shadow group magnetic">
                            <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">{item.audience}</h3>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6">{item.description}</p>
                            <CTA text={item.cta} href={item.href} variant="primary" />
                        </div>
                    ))}
                </ResponsiveGrid>
            </Section>
        </div>
    );
}
