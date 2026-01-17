import type { Module, TimelinePhase } from '../types';

// Brand Identity
export const BRAND = {
    name: 'EnteraFlux',
    tagline: 'Predictive Safety Intelligence for GLP-1 Therapy',
    mission:
        'EnteraFlux is a clinical decision support platform that leverages continuous physiological monitoring and artificial intelligence to predict and prevent adverse tolerance events in patients undergoing GLP-1 receptor agonist therapy. Our evidence-based approach integrates wearable biomarker data with machine learning models to enable proactive intervention, improve treatment adherence, and advance metabolic therapy safety research.',
    description:
        'By transforming passive wearable data into actionable clinical intelligence, EnteraFlux empowers patients, clinicians, and researchers with the tools needed to optimize therapeutic outcomes while minimizing treatment-limiting side effects.',
};

// Brand Positioning Pillars
export const POSITIONING_PILLARS = [
    {
        title: 'Predictive Safety',
        description: "We don't wait for side effects. We predict them.",
    },
    {
        title: 'Physiological Intelligence',
        description: 'The body produces signals. EnteraFlux interprets them.',
    },
    {
        title: 'Evidence, Not Guesswork',
        description: 'Decisions rooted in biomarkers, not anecdotes.',
    },
    {
        title: 'Guidance Over Restriction',
        description: 'We guide behavior. We never shame it.',
    },
    {
        title: 'Partnership with Medicine',
        description: 'We extend clinicians, not replace them.',
    },
    {
        title: 'Regulatory Alignment',
        description: 'Built for research. Built for safety. Built for validation.',
    },
];

// Problem Points
export const PROBLEMS = [
    'Safety and adherence failures in GLP-1 therapy',
    'Severe GI intolerance causing treatment discontinuation',
    'Black market counterfeit supply chain risks',
    'Data-poor research environment limiting insights',
];

// Modules
export const MODULES: Module[] = [
    {
        id: 'monitoring',
        icon: 'Activity',
        title: 'Predictive Tolerance Monitoring',
        description: 'AI-powered analysis of wearable biomarkers to predict adverse events before they occur.',
        features: [
            'HRV and resting heart rate analysis',
            'Sleep disruption pattern detection',
            'Stress biomarker monitoring',
            'GI intolerance risk prediction',
            'Adherence failure early warning',
            'Emergency contact alerting for severe risk signals',
        ],
        detailedDescription:
            'Our monitoring system continuously analyzes physiological signals from wearable devices to detect patterns that precede adverse tolerance events. By identifying early warning signs in HRV, heart rate, sleep quality, and stress markers, we can predict GI intolerance and nausea risk before symptoms become severe, enabling proactive intervention.',
    },
    {
        id: 'coaching',
        icon: 'MessageCircle',
        title: 'Adaptive Coaching & Intervention',
        description: 'Evidence-based behavioral guidance tailored to individual physiology and tolerance patterns.',
        features: [
            'Personalized dietary recommendations',
            'Hydration optimization strategies',
            'Workout modification guidance',
            'Anti-nausea intervention protocols',
            'Clinical tone (no diet culture)',
            'No calorie counting or restriction messaging',
        ],
        detailedDescription:
            'Our coaching system provides adaptive, physiologically-informed guidance that respects clinical best practices. We recommend specific dietary adjustments, hydration strategies, and exercise modifications based on your current tolerance state, without resorting to calorie counting or diet culture messaging.',
    },
    {
        id: 'counterfeit',
        icon: 'Shield',
        title: 'Counterfeit Defense Grid',
        description: 'Multi-source intelligence to identify and flag suspicious GLP-1 medication sources.',
        features: [
            'Seller verification across websites and social platforms',
            'Label and packaging authenticity analysis',
            'Supply chain risk flagging',
            'Manufacturer and regulatory body notifications',
            'Consumer protection alerts',
        ],
        detailedDescription:
            'We monitor online marketplaces, social media groups, and seller networks to identify potentially counterfeit or unsafe GLP-1 medication sources. Our system analyzes packaging, labeling, pricing patterns, and seller behavior to flag suspicious sources and alert manufacturers, regulatory bodies, and consumers.',
    },
    {
        id: 'pharmacovigilance',
        icon: 'Database',
        title: 'Pharmacovigilance Signal Intelligence',
        description: 'Real-world evidence extraction from social platforms and clinical literature.',
        features: [
            'Twitter/X sentiment and side-effect extraction',
            'Reddit community signal analysis',
            'Clinical trial publication monitoring',
            'Emerging pattern detection',
            'Structured regulatory reporting dashboards',
            'FDA-compatible alert formatting',
        ],
        detailedDescription:
            'Our AI-powered system extracts and structures pharmacovigilance signals from social media, online communities, and clinical publications. We identify emerging side-effect patterns, adverse event clusters, and treatment response insights that complement traditional reporting systems, providing regulators and manufacturers with earlier detection of safety signals.',
    },
    {
        id: 'research',
        icon: 'FlaskConical',
        title: 'Research & Trial Enablement',
        description: 'Cohort matching and data infrastructure for clinical research organizations.',
        features: [
            'Clinical trial cohort matching',
            'FHIR-compatible data exchange',
            'CRO partnership infrastructure',
            'De-identified data aggregation',
            'Regulatory-compliant data traceability',
            'Real-world evidence generation',
        ],
        detailedDescription:
            'We enable clinical research by matching eligible patients to relevant trials and providing FHIR-compatible data infrastructure for CROs and research institutions. Our platform supports de-identified data aggregation, regulatory-compliant traceability, and real-world evidence generation to accelerate metabolic therapy research.',
    },
];

// Timeline Phases
export const TIMELINE_PHASES: TimelinePhase[] = [
    {
        title: 'Alpha Phase',
        description: 'Core platform development, biomarker model training, initial validation',
        status: 'current',
        date: 'Q1 2026',
    },
    {
        title: 'Beta Phase',
        description: 'Limited user testing, wearable integrations, coaching algorithm refinement',
        status: 'upcoming',
        date: 'Q2-Q3 2026',
    },
    {
        title: 'Research Pilots',
        description: 'CRO partnerships, academic collaborations, pharmacovigilance validation',
        status: 'upcoming',
        date: 'Q4 2026',
    },
    {
        title: 'Regulatory Pathway',
        description: 'FDA engagement, data validation, compliance documentation',
        status: 'upcoming',
        date: '2027',
    },
    {
        title: 'Commercial Phase',
        description: 'Market launch, scaling infrastructure, expanded features',
        status: 'upcoming',
        date: '2027-2028',
    },
];

// Compliance Text
export const COMPLIANCE = {
    development: 'Platform Under Development',
    notMedicalDevice: 'Not a Medical Device',
    notClinicalUse: 'Not for Clinical Use',
    pendingValidation: 'Pending Validation',
    researchOnly: 'Research-Only Phase',
    betaAccess: 'Beta Access Opening Soon',
};

// Audience CTAs
export const AUDIENCE_CTAS = [
    {
        audience: 'Patients',
        title: 'Join the Waitlist',
        description: 'Be among the first to access predictive safety monitoring for your GLP-1 therapy.',
        cta: 'Join Waitlist',
        href: '/contact?type=patient',
    },
    {
        audience: 'Researchers',
        title: 'Request Access',
        description: 'Partner with us to advance metabolic therapy research and pharmacovigilance.',
        cta: 'Request Access',
        href: '/contact?type=researcher',
    },
    {
        audience: 'Clinicians',
        title: 'Clinical Pilot Program',
        description: 'Explore how EnteraFlux can support your GLP-1 prescribing practice.',
        cta: 'Contact Us',
        href: '/contact?type=clinician',
    },
    {
        audience: 'Investors',
        title: 'Investment Opportunities',
        description: 'Learn about our mission to transform metabolic therapy safety.',
        cta: 'Request Deck',
        href: '/contact?type=investor',
    },
];
