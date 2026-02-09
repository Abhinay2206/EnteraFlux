import { useEffect } from 'react';
import Section from '../components/Section';
import Timeline from '../components/Timeline';
import Badge from '../components/Badge';
import ScrollReveal from '../components/ScrollReveal';
import { TIMELINE_PHASES } from '../data/content';

export default function Roadmap() {
    useEffect(() => {
        document.title = 'Roadmap — EnteraFlux';
    }, []);

    return (
        <div>
            <Section
                title="Our Roadmap"
                subtitle="Here's how we're building EnteraFlux for India, step by step"
                variant="gradient"
                firstSection
            >
                <div className="max-w-4xl mx-auto text-center">
                    <ScrollReveal delay={200} effect="blur-in">
                        <p className="text-lg text-neutral-700 dark:text-neutral-300 mb-8">
                            We're building EnteraFlux carefully and transparently — starting with a consumer wellness app for individual GLP-1 users in India, and expanding to enterprise tools later. Here's where we are and what's coming next.
                        </p>
                    </ScrollReveal>
                    <div className="flex justify-center gap-3 flex-wrap">
                        <Badge text="We're Here Now → Building the Foundation" variant="development" />
                        <Badge text="Early Access in India — Q3 2026" variant="status" />
                    </div>
                </div>
            </Section>

            <Section title="Timeline" variant="dark">
                <Timeline phases={TIMELINE_PHASES} />
            </Section>

            <Section title="What Each Phase Involves" variant="default">
                <div className="max-w-5xl mx-auto space-y-8">
                    {/* Phase 1: Building the Foundation */}
                    <div className="card p-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <h1 className="text-9xl font-bold">01</h1>
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-2xl font-bold">Building the Foundation (Now)</h3>
                                <Badge text="In Progress" variant="development" />
                            </div>
                            <p className="text-neutral-700 dark:text-neutral-300 mb-6 max-w-3xl">
                                This is where we are today. We're building the core wellness app, the 2-week calibration system, and the Indian-diet coaching engine. Everything is being designed specifically for Indian users from day one.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="font-semibold text-primary-500 mb-3 border-b border-neutral-200 dark:border-neutral-700 pb-2">Technology</h4>
                                    <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                                        <li>• <strong>Calibration System:</strong> Building the 2-week personal baseline engine.</li>
                                        <li>• <strong>Indian Diet Engine:</strong> Creating the protein and nutrition guidance system based on Indian foods.</li>
                                        <li>• <strong>Wearable Integration:</strong> Connecting with popular Indian wearables (Mi Band, Noise, boAt) plus Apple Watch and Fitbit.</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-primary-500 mb-3 border-b border-neutral-200 dark:border-neutral-700 pb-2">Research</h4>
                                    <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                                        <li>• <strong>India-Specific Data:</strong> Studying the Indian thin-fat phenotype and its implications for GLP-1 weight loss.</li>
                                        <li>• <strong>Nutrition Research:</strong> Building an Indian protein database (dal, paneer, curd, eggs, etc.).</li>
                                        <li>• <strong>Sarcopenia Prevention:</strong> Reviewing published research on muscle loss during rapid weight loss in Indian populations.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Phase 2: Early Access Beta */}
                    <div className="card p-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <h1 className="text-9xl font-bold">02</h1>
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-2xl font-bold">Early Access (Beta) in India</h3>
                                <Badge text="Q3 2026" variant="status" />
                            </div>
                            <p className="text-neutral-700 dark:text-neutral-300 mb-6 max-w-3xl">
                                This is when real Indian GLP-1 users start using EnteraFlux. We'll open the app to a small group of users with smartwatches or fitness bands to gather feedback and improve the experience.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="font-semibold text-primary-500 mb-3 border-b border-neutral-200 dark:border-neutral-700 pb-2">What You'll Get</h4>
                                    <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                                        <li>• <strong>Mobile App:</strong> A real Android and iOS app you can download and use daily.</li>
                                        <li>• <strong>Body Signals:</strong> See your personalised baseline, daily comparisons, and weekly trends.</li>
                                        <li>• <strong>Indian Diet Tips:</strong> Get protein and hydration tips based on Indian foods and your body's data.</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-primary-500 mb-3 border-b border-neutral-200 dark:border-neutral-700 pb-2">Our Goals</h4>
                                    <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                                        <li>• <strong>500 Indian Users:</strong> Enroll 500 active testers across major Indian cities.</li>
                                        <li>• <strong>Feedback Loop:</strong> Use real user feedback to improve tips and coaching.</li>
                                        <li>• <strong>Wearable Compatibility:</strong> Test and validate with the most popular Indian wearable brands.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Phase 3: Generics + Public Launch */}
                    <div className="card p-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <h1 className="text-9xl font-bold">03</h1>
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-2xl font-bold">Generics Launch + Phase 1 Public Release</h3>
                                <Badge text="Mid–Q4 2026" variant="status" />
                            </div>
                            <p className="text-neutral-700 dark:text-neutral-300 mb-6 max-w-3xl">
                                GLP-1 generic medications are expected in India after March 2026, making these drugs much more affordable and widely available. This is when we'll launch the full Phase 1 consumer app — Body Signals + Muscle-Safe Coaching — for all Indian GLP-1 users.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="font-semibold text-primary-500 mb-3 border-b border-neutral-200 dark:border-neutral-700 pb-2">Market Context</h4>
                                    <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                                        <li>• <strong>Generics:</strong> Affordable GLP-1 generics enter the Indian market, expanding access significantly.</li>
                                        <li>• <strong>Growing Demand:</strong> Millions of Indians expected to start GLP-1 medications for weight loss.</li>
                                        <li>• <strong>Support Gap:</strong> Very few India-specific wellness tools available for GLP-1 users — EnteraFlux fills this gap.</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-primary-500 mb-3 border-b border-neutral-200 dark:border-neutral-700 pb-2">Our Launch</h4>
                                    <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                                        <li>• <strong>Full App:</strong> Both modules — Body Signals and Muscle-Safe Coaching — available to everyone.</li>
                                        <li>• <strong>Free Tier:</strong> Basic features available free; premium features via subscription.</li>
                                        <li>• <strong>Android First:</strong> Prioritising Android (the most popular platform in India).</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Phase 4: Enterprise & Research */}
                    <div className="card p-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <h1 className="text-9xl font-bold">04</h1>
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-2xl font-bold">Phase 2: Enterprise & Research</h3>
                                <Badge text="2027+" variant="status" />
                            </div>
                            <p className="text-neutral-700 dark:text-neutral-300 mb-6 max-w-3xl">
                                With a strong consumer base and real-world wellness data from Indian users, we expand into enterprise tools — pharma partnerships, corporate wellness programs, and drug authenticity verification.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="font-semibold text-primary-500 mb-3 border-b border-neutral-200 dark:border-neutral-700 pb-2">Enterprise Tools</h4>
                                    <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                                        <li>• <strong>Pharma Partnerships:</strong> Anonymised wellness insights for drug companies and researchers.</li>
                                        <li>• <strong>Corporate Wellness:</strong> Offering EnteraFlux as part of employer health benefits.</li>
                                        <li>• <strong>Drug Authenticity:</strong> Tools to verify genuine GLP-1 medications as generics flood the market.</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-primary-500 mb-3 border-b border-neutral-200 dark:border-neutral-700 pb-2">Growth</h4>
                                    <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                                        <li>• <strong>Insurance Tie-ups:</strong> Working with Indian health insurance providers.</li>
                                        <li>• <strong>Research Collaborations:</strong> Partnering with Indian research institutions and universities.</li>
                                        <li>• <strong>Regional Expansion:</strong> Adapting for other South Asian markets with similar dietary profiles.</li>
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
