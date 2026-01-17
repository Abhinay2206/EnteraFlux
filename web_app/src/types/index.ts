// Component Props Types
export interface HeroProps {
    title: string;
    subtitle: string;
    primaryCTA: CTAProps;
    secondaryCTA?: CTAProps;
    badge?: string;
}

export interface SectionProps {
    title?: string;
    subtitle?: string;
    children: React.ReactNode;
    variant?: 'default' | 'dark' | 'gradient';
    className?: string;
    id?: string;
    firstSection?: boolean; // Add top padding for pages without Hero
}

export interface ModuleCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    features: string[];
}

export interface BadgeProps {
    text: string;
    variant?: 'development' | 'regulatory' | 'research' | 'status';
    withDot?: boolean;
}

export interface CTAProps {
    text: string;
    onClick?: () => void;
    href?: string;
    variant?: 'primary' | 'secondary' | 'text';
    icon?: React.ReactNode;
}

export interface TimelinePhase {
    title: string;
    description: string;
    status: 'completed' | 'current' | 'upcoming';
    date?: string;
}

export interface TimelineProps {
    phases: TimelinePhase[];
}

export interface ResponsiveGridProps {
    children: React.ReactNode;
    columns?: {
        mobile?: number;
        tablet?: number;
        desktop?: number;
    };
    gap?: number;
    className?: string;
}

// Data Types
export interface Module {
    id: string;
    icon: string;
    title: string;
    description: string;
    features: string[];
    detailedDescription?: string;
}

export interface ContactFormData {
    name: string;
    email: string;
    organization?: string;
    role: 'patient' | 'researcher' | 'clinician' | 'investor' | 'partner';
    message: string;
}
