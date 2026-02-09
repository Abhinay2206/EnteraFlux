import type { Module, TimelinePhase } from '../types';

// Brand Identity
export const BRAND = {
    name: 'EnteraFlux',
    tagline: 'Your Wellness Companion for GLP-1 Weight-Loss Medications in India',
    mission:
        'EnteraFlux is a lifestyle and wellness app built for people in India who are starting GLP-1 medications like liraglutide or semaglutide for weight loss. Our app reads everyday signals from your wearable — like a smartwatch or fitness band — and gives you simple, personalised tips to stay comfortable, eat well, and recover better while on your medication journey.',
    description:
        'We turn your wearable data into easy-to-understand wellness insights — helping you build healthier habits, protect your muscle mass, and feel more confident throughout your GLP-1 weight-loss journey. No medical claims, no complicated jargon — just practical support designed for Indian lifestyles.',
};

// Brand Positioning Pillars
export const POSITIONING_PILLARS = [
    {
        title: 'Listen to Your Body',
        description: 'Your wearable picks up signals every day. We help you make sense of them.',
    },
    {
        title: 'Indian Diet Friendly',
        description: 'Protein and nutrition tips built around dal, paneer, curd, eggs, and everyday Indian foods.',
    },
    {
        title: 'Research-Informed',
        description: 'Every tip is backed by published health and nutrition research — not guesswork.',
    },
    {
        title: 'No Shaming, Just Support',
        description: 'We give you helpful guidance without calorie counting, diet culture, or judgement.',
    },
    {
        title: 'Wellness, Not Medicine',
        description: 'We support your wellness journey. We never replace your doctor or prescribe anything.',
    },
    {
        title: 'Built for India',
        description: 'Designed for Indian bodies, Indian diets, and Indian lifestyles from day one.',
    },
];

// India-Specific Problem Points with Research Data
export const PROBLEMS = [
    {
        title: 'GLP-1 Medications Are Coming to India',
        description: 'GLP-1 weight-loss drugs launched in India in 2025, with generic versions expected after March 2026. Millions of Indians may soon start these medications — but there is very little support or guidance available for Indian users specifically.'
    },
    {
        title: 'India Has a Unique "Thin-Fat" Challenge',
        description: 'Many Indians have what researchers call the "thin-fat" phenotype — normal weight on the outside but high body fat and low muscle mass on the inside. Rapid weight loss from GLP-1 drugs can make this worse if muscle is not actively protected during the process.'
    },
    {
        title: 'Side Effects Make People Quit',
        description: 'Globally, over half of GLP-1 users stop their medication within the first year because of nausea, stomach discomfort, and fatigue. Without proper support and lifestyle adjustments, Indian users face the same risk of dropping out too early.'
    },
    {
        title: 'Most People Pay Out of Pocket',
        description: 'In India, health insurance rarely covers weight-loss medications. Most people pay the full cost themselves — making it even more important to stay on track, avoid side effects, and get the most benefit from every dose.'
    },
    {
        title: 'Diabetes Is Already Widespread',
        description: 'Around 10–10.5% of Indian adults have diabetes, and many more are pre-diabetic. GLP-1 medications can help — but Indian users need culturally relevant support, not generic Western advice that doesn\'t match Indian diets and habits.'
    },
];

// Modules (Phase 1 — Individual Users)
export const MODULES: Module[] = [
    {
        id: 'body-signals',
        icon: 'Activity',
        title: 'Body Signals & Recovery Awareness',
        description: 'Your wearable reads your body\'s everyday signals. We help you understand what they mean for your wellness.',
        features: [
            '2-week calibration period to learn your personal baseline',
            'Resting heart rate and heart rate variability (HRV) tracking',
            'Sleep quality and recovery score monitoring',
            'Event-based check-ins after dose days, travel, or poor sleep',
            'Simple "How are you feeling?" wellness nudges',
            'Weekly and monthly trend summaries of your body signals',
        ],
        detailedDescription:
            'When you start using EnteraFlux, the app spends the first 2 weeks learning what\'s "normal" for your body — your typical heart rate, sleep patterns, and recovery rhythms. This is your personal calibration period. After that, the app compares each day\'s data against your baseline and highlights meaningful changes. On key days — like after a new dose, after travel, or after a bad night\'s sleep — EnteraFlux runs event-based check-ins and gives you simple wellness tips. We never diagnose or predict medical outcomes — we simply help you notice your body\'s patterns and take better care of yourself.',
    },
    {
        id: 'muscle-safe-coaching',
        icon: 'Dumbbell',
        title: 'Muscle-Safe Weight-Loss Coaching',
        description: 'Lose fat, not muscle. Get Indian-diet-friendly protein guidance and recovery-based activity tips.',
        features: [
            'Daily protein intake goals using Indian foods (dal, paneer, curd, eggs, chicken)',
            'Sarcopenia (muscle-loss) awareness and prevention tips',
            'Workout suggestions adjusted to your recovery and energy levels',
            'Hydration reminders based on your activity and local weather',
            'Vegetarian and non-vegetarian Indian meal ideas',
            'Simple body-composition awareness (fat vs. muscle weight)',
        ],
        detailedDescription:
            'One of the biggest risks of rapid weight loss — especially with GLP-1 medications — is losing muscle along with fat. This is particularly important for Indians, who often have lower baseline muscle mass (the "thin-fat" phenotype). EnteraFlux helps you protect your muscles with practical, Indian-diet-friendly protein guidance. Instead of suggesting Western foods like Greek yoghurt or protein shakes, we recommend everyday Indian options — extra dal, a cup of curd, paneer, eggs, or chicken. We also adjust your workout and hydration suggestions based on your wearable\'s recovery data, so you\'re never pushing yourself on a day when your body needs rest.',
    },
];

// Phase 2 Modules (Enterprise — Coming Later)
export const PHASE2_MODULES = [
    {
        id: 'pharma-insights',
        icon: 'Building2',
        title: 'Pharma & Research Partnerships',
        description: 'Help drug companies and researchers understand how GLP-1 medications work in real-world Indian settings.',
    },
    {
        id: 'employer-wellness',
        icon: 'Users',
        title: 'Corporate Wellness Programs',
        description: 'Offer GLP-1 lifestyle support as part of employer health benefits and insurance tie-ups.',
    },
    {
        id: 'drug-authenticity',
        icon: 'ShieldCheck',
        title: 'Drug Authenticity Verification',
        description: 'Help users verify that their GLP-1 medication is genuine — especially important as generics enter the Indian market after March 2026.',
    },
];

// Timeline Phases (India-specific)
export const TIMELINE_PHASES: TimelinePhase[] = [
    {
        title: 'Building the Foundation',
        description: 'Developing the core app, calibration system, and Indian-diet coaching engine',
        status: 'current',
        date: 'Q1–Q2 2026',
    },
    {
        title: 'Early Access (Beta) in India',
        description: 'Opening the app to a small group of Indian GLP-1 users with smartwatches or fitness bands',
        status: 'upcoming',
        date: 'Q3 2026',
    },
    {
        title: 'Generics Launch in India',
        description: 'GLP-1 generics expected after March 2026 — making these medications more affordable and widely available across India',
        status: 'upcoming',
        date: 'Mid 2026',
    },
    {
        title: 'Phase 1 Public Launch',
        description: 'Full launch of the wellness app for individual Indian users — Body Signals + Muscle-Safe Coaching',
        status: 'upcoming',
        date: 'Q4 2026',
    },
    {
        title: 'Phase 2: Enterprise & Research',
        description: 'Adding pharma partnerships, corporate wellness programs, and drug authenticity features for the Indian market',
        status: 'upcoming',
        date: '2027',
    },
];

// Compliance Text (Wellness positioning)
export const COMPLIANCE = {
    development: 'Currently In Development',
    notMedicalDevice: 'Wellness App — Not a Medical Device',
    notClinicalUse: 'Not for Diagnosis or Treatment',
    pendingValidation: 'Research-Informed Approach',
    researchOnly: 'Lifestyle & Wellness Only',
    betaAccess: 'Early Access Coming Q3 2026',
};

// Audience CTAs (India-focused)
export const AUDIENCE_CTAS = [
    {
        audience: 'GLP-1 Users',
        title: 'Get Early Access',
        description: 'Starting or planning to start a GLP-1 medication in India? Be among the first to try EnteraFlux — it\'s free during early access.',
        cta: 'Join Waitlist',
        href: '/contact?type=patient',
    },
    {
        audience: 'Doctors & Nutritionists',
        title: 'Recommend to Patients',
        description: 'Help your patients build better habits during GLP-1 therapy with an app designed for Indian diets and lifestyles.',
        cta: 'Learn More',
        href: '/contact?type=clinician',
    },
    {
        audience: 'Pharma & Researchers',
        title: 'Phase 2 Partnerships',
        description: 'Interested in real-world GLP-1 wellness data from Indian users? We\'re building enterprise tools for Phase 2.',
        cta: 'Get In Touch',
        href: '/contact?type=researcher',
    },
    {
        audience: 'Investors & Partners',
        title: 'Back Our Mission',
        description: 'India\'s GLP-1 market is about to grow rapidly. Help us build the country\'s first dedicated wellness companion for this space.',
        cta: 'Contact Us',
        href: '/contact?type=investor',
    },
];
