import { useEffect } from 'react';
import Section from '../components/Section';
import ModuleCard from '../components/ModuleCard';
import ResponsiveGrid from '../components/ResponsiveGrid';
import ScrollReveal from '../components/ScrollReveal';
import Badge from '../components/Badge';
import { MODULES, PHASE2_MODULES } from '../data/content';
import ModulesIntegration from '../components/visualizations/ModulesIntegration';
import ResearchValidation from '../components/ResearchValidation';

export default function Modules() {
    useEffect(() => {
        document.title = 'Features — EnteraFlux';
    }, []);

    return (
        <div>
            <Section
                title="EnteraFlux Features"
                subtitle="Two core modules designed for Indian GLP-1 users — simple, practical, and culturally relevant"
                variant="gradient"
                firstSection
            >
                <ScrollReveal delay={200} effect="rise">
                    <div className="max-w-4xl mx-auto">
                        <p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed text-center mb-8">
                            EnteraFlux focuses on two things that matter most when you're on a GLP-1 weight-loss medication: understanding your body's signals and protecting your muscle mass with Indian-diet-friendly nutrition guidance.
                        </p>
                    </div>
                </ScrollReveal>
            </Section>

            {MODULES.map((module, index) => (
                <Section
                    key={module.id}
                    title={module.title}
                    subtitle={module.description}
                    variant={index % 2 === 0 ? 'dark' : 'default'}
                >
                    <div className="max-w-5xl mx-auto">
                        <div className="card p-8 mb-12">
                            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6">
                                {module.detailedDescription}
                            </p>
                            <h4 className="font-bold mb-4 text-primary-400">What It Does:</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {module.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-start gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-accent-400 mt-2 flex-shrink-0" />
                                        <span className="text-neutral-700 dark:text-neutral-300 text-sm">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Research & Validation — only for Module 1 (Body Signals) */}
                        {index === 0 && <ResearchValidation />}
                    </div>
                </Section>
            ))}

            <Section title="Both Modules Work Together" variant="gradient">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-lg text-neutral-700 dark:text-neutral-300 mb-16">
                        Your body signal data informs your coaching tips. If your recovery is low, we'll suggest lighter activity and extra protein. If your sleep was poor, we'll adjust your hydration and meal suggestions for the day. Everything is connected.
                    </p>
                    <div className="mb-16 max-w-2xl mx-auto">
                        <ModulesIntegration />
                    </div>
                    <ResponsiveGrid columns={{ mobile: 1, tablet: 2, desktop: 2 }}>
                        {MODULES.map((module) => (
                            <ModuleCard
                                key={module.id}
                                icon={module.icon}
                                title={module.title}
                                description={module.description}
                                features={module.features.slice(0, 3)}
                            />
                        ))}
                    </ResponsiveGrid>
                </div>
            </Section>

            {/* Phase 2 Preview */}
            <Section title="Coming in Phase 2" subtitle="Enterprise and research features — planned for 2027" variant="dark">
                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {PHASE2_MODULES.map((module) => (
                            <div key={module.id} className="card p-6 text-center opacity-80">
                                <Badge text="Phase 2" variant="status" />
                                <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2 mt-4">{module.title}</h3>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400">{module.description}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-center text-neutral-500 text-xs mt-8 italic">
                        Phase 2 features are planned for the future and are not part of the current consumer app.
                    </p>
                </div>
            </Section>
        </div>
    );
}
