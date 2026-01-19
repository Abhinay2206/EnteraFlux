import Section from '../components/Section';
import ModuleCard from '../components/ModuleCard';
import ResponsiveGrid from '../components/ResponsiveGrid';
import ScrollReveal from '../components/ScrollReveal';
import { MODULES } from '../data/content';
import ModulesIntegration from '../components/visualizations/ModulesIntegration';

export default function Modules() {
    return (
        <div>
            <Section
                title="Platform Modules"
                subtitle="Five integrated solutions for comprehensive metabolic therapy safety"
                variant="gradient"
                firstSection
            >
                <ScrollReveal delay={200} direction="up">
                    <div className="max-w-4xl mx-auto">
                        <p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed text-center mb-8">
                            Each module addresses a critical gap in the current GLP-1 therapy ecosystem. Together, they form a unified platform for safety, research, and intervention.
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
                        <div className="glass rounded-2xl p-8 mb-12">
                            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6">
                                {module.detailedDescription}
                            </p>
                            <h4 className="font-bold mb-4 text-primary-400">Key Features:</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {module.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-start gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-accent-400 mt-2 flex-shrink-0" />
                                        <span className="text-neutral-700 dark:text-neutral-300 text-sm">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Section>
            ))}

            <Section title="Integrated Experience" variant="gradient">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-lg text-neutral-700 dark:text-neutral-300 mb-16">
                        All modules work together seamlessly, sharing data and insights to provide comprehensive metabolic therapy support. The platform learns from every interaction to improve predictions and recommendations.
                    </p>
                    <div className="mb-16 max-w-2xl mx-auto">
                        <ModulesIntegration />
                    </div>
                    <ResponsiveGrid columns={{ mobile: 1, tablet: 2, desktop: 3 }}>
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
        </div>
    );
}
