/**
 * GLP-1 Sentinel Design System - Color Tokens
 * Clinical-grade color system with light/dark mode support
 * WCAG 2.1 AA compliant
 */

export const Colors = {
    // Primary - Clinical Blue (matching web)
    primary: {
        50: '#EFF6FF',
        100: '#DBEAFE',
        200: '#BFDBFE',
        300: '#93C5FD',
        400: '#60A5FA', // Dark mode primary
        500: '#3B82F6',
        600: '#2563EB', // Light mode primary (main brand color)
        700: '#1D4ED8',
        800: '#1E40AF',
        900: '#1E3A8A',
    },

    // Success/Medical Green - Safe states
    success: {
        50: '#F0FDF4',
        100: '#DCFCE7',
        200: '#BBF7D0',
        300: '#86EFAC',
        400: '#4ADE80', // Dark mode
        500: '#22C55E', // Light mode (normal/safe indicator)
        600: '#16A34A',
        700: '#15803D',
        800: '#166534',
        900: '#14532D',
    },

    // Advisory/Elevated Risk - Amber
    advisory: {
        50: '#FFFBEB',
        100: '#FEF3C7',
        200: '#FDE68A',
        300: '#FCD34D', // Dark mode
        400: '#FBBF24',
        500: '#F59E0B', // Light mode (advisory warning)
        600: '#D97706',
        700: '#B45309',
        800: '#92400E',
        900: '#78350F',
    },

    // Warning/High Risk - Orange
    warning: {
        50: '#FFF7ED',
        100: '#FFEDD5',
        200: '#FED7AA',
        300: '#FDBA74', // Dark mode
        400: '#FB923C',
        500: '#F97316', // Light mode (high risk)
        600: '#EA580C',
        700: '#C2410C',
        800: '#9A3412',
        900: '#7C2D12',
    },

    // Error/Critical - Red
    error: {
        50: '#FEF2F2',
        100: '#FEE2E2',
        200: '#FECACA',
        300: '#FCA5A5', // Dark mode
        400: '#F87171',
        500: '#EF4444', // Light mode (critical/medical concern)
        600: '#DC2626',
        700: '#B91C1C',
        800: '#991B1B',
        900: '#7F1D1D',
    },

    // Info - Clinical Blue
    info: {
        50: '#EFF6FF',
        100: '#DBEAFE',
        200: '#BFDBFE',
        300: '#93C5FD',
        400: '#60A5FA',
        500: '#3B82F6',
        600: '#2563EB',
        700: '#1D4ED8',
        800: '#1E40AF',
        900: '#1E3A8A',
    },

    // Neutral Grays - Medical clarity
    gray: {
        50: '#F8FAFC',   // Light mode secondary background
        100: '#F1F5F9',  // Light mode card background
        200: '#E2E8F0',  // Light mode borders
        300: '#CBD5E1',  // Light mode disabled
        400: '#94A3B8',  // Tertiary text
        500: '#64748B',  // Secondary text
        600: '#475569',  // Dark mode borders
        700: '#334155',  // Dark mode surface 2
        800: '#1E293B',  // Dark mode surface 1
        900: '#0F172A',  // Dark mode card background
        950: '#020617',  // Dark mode primary background
    },

    // Light Mode Palette
    light: {
        // Background
        background: '#FFFFFF',
        backgroundSecondary: '#F8FAFC',

        // Surface
        surface: '#FFFFFF',
        surfaceElevated: '#F8FAFC',

        // Text
        textPrimary: '#0F172A',
        textSecondary: '#64748B',
        textTertiary: '#94A3B8',
        textInverse: '#FFFFFF',

        // Border
        border: '#E2E8F0',
        borderLight: '#F1F5F9',

        // Interactive
        primary: '#2563EB',
        primaryHover: '#1D4ED8',
        primaryActive: '#1E40AF',
        primaryDisabled: '#CBD5E1',

        // Semantic
        success: '#22C55E',
        advisory: '#F59E0B',
        warning: '#F97316',
        error: '#EF4444',
        info: '#3B82F6',

        // Alert Backgrounds
        successBackground: '#F0FDF4',
        advisoryBackground: '#FFFBEB',
        warningBackground: '#FFF7ED',
        errorBackground: '#FEF2F2',
        infoBackground: '#EFF6FF',

        // Alert Borders
        successBorder: '#22C55E',
        advisoryBorder: '#F59E0B',
        warningBorder: '#F97316',
        errorBorder: '#EF4444',
        infoBorder: '#3B82F6',

        // Alert Text
        successText: '#15803D',
        advisoryText: '#92400E',
        warningText: '#9A3412',
        errorText: '#991B1B',
        infoText: '#1E40AF',
    },

    // Dark Mode Palette
    dark: {
        // Background
        background: '#020617',
        backgroundSecondary: '#0F172A',

        // Surface (elevation through lightness)
        surface: '#0F172A',
        surfaceElevated: '#1E293B',
        surfaceElevated2: '#334155',

        // Text
        textPrimary: '#F8FAFC',
        textSecondary: '#CBD5E1',
        textTertiary: '#94A3B8',
        textInverse: '#0F172A',

        // Border
        border: '#334155',
        borderLight: '#475569',

        // Interactive
        primary: '#60A5FA',
        primaryHover: '#3B82F6',
        primaryActive: '#2563EB',
        primaryDisabled: '#475569',

        // Semantic
        success: '#4ADE80',
        advisory: '#FCD34D',
        warning: '#FDBA74',
        error: '#FCA5A5',
        info: '#60A5FA',

        // Alert Backgrounds
        successBackground: '#14532D',
        advisoryBackground: '#78350F',
        warningBackground: '#7C2D12',
        errorBackground: '#7F1D1D',
        infoBackground: '#1E3A8A',

        // Alert Borders
        successBorder: '#4ADE80',
        advisoryBorder: '#FCD34D',
        warningBorder: '#FDBA74',
        errorBorder: '#FCA5A5',
        infoBorder: '#60A5FA',

        // Alert Text
        successText: '#DCFCE7',
        advisoryText: '#FEF3C7',
        warningText: '#FFEDD5',
        errorText: '#FEE2E2',
        infoText: '#DBEAFE',
    },
} as const;

// Semantic Color Mappings for Clinical States

// Medication Adherence States
export const AdherenceColors = {
    light: {
        adherent: {
            background: Colors.light.successBackground,
            border: Colors.light.successBorder,
            text: Colors.light.successText,
            icon: Colors.light.success,
        },
        delayed: {
            background: Colors.light.advisoryBackground,
            border: Colors.light.advisoryBorder,
            text: Colors.light.advisoryText,
            icon: Colors.light.advisory,
        },
        atRisk: {
            background: Colors.light.warningBackground,
            border: Colors.light.warningBorder,
            text: Colors.light.warningText,
            icon: Colors.light.warning,
        },
        missed: {
            background: Colors.light.errorBackground,
            border: Colors.light.errorBorder,
            text: Colors.light.errorText,
            icon: Colors.light.error,
        },
    },
    dark: {
        adherent: {
            background: Colors.dark.successBackground,
            border: Colors.dark.successBorder,
            text: Colors.dark.successText,
            icon: Colors.dark.success,
        },
        delayed: {
            background: Colors.dark.advisoryBackground,
            border: Colors.dark.advisoryBorder,
            text: Colors.dark.advisoryText,
            icon: Colors.dark.advisory,
        },
        atRisk: {
            background: Colors.dark.warningBackground,
            border: Colors.dark.warningBorder,
            text: Colors.dark.warningText,
            icon: Colors.dark.warning,
        },
        missed: {
            background: Colors.dark.errorBackground,
            border: Colors.dark.errorBorder,
            text: Colors.dark.errorText,
            icon: Colors.dark.error,
        },
    },
} as const;

// Symptom Severity Levels
export const SeverityColors = {
    light: {
        none: {
            background: Colors.gray[50],
            border: Colors.gray[200],
            text: Colors.gray[500],
            icon: Colors.gray[400],
        },
        mild: {
            background: Colors.light.successBackground,
            border: Colors.light.successBorder,
            text: Colors.light.successText,
            icon: Colors.light.success,
        },
        moderate: {
            background: Colors.light.advisoryBackground,
            border: Colors.light.advisoryBorder,
            text: Colors.light.advisoryText,
            icon: Colors.light.advisory,
        },
        severe: {
            background: Colors.light.warningBackground,
            border: Colors.light.warningBorder,
            text: Colors.light.warningText,
            icon: Colors.light.warning,
        },
        verySevere: {
            background: Colors.light.errorBackground,
            border: Colors.light.errorBorder,
            text: Colors.light.errorText,
            icon: Colors.light.error,
        },
    },
    dark: {
        none: {
            background: Colors.gray[900],
            border: Colors.gray[700],
            text: Colors.gray[400],
            icon: Colors.gray[500],
        },
        mild: {
            background: Colors.dark.successBackground,
            border: Colors.dark.successBorder,
            text: Colors.dark.successText,
            icon: Colors.dark.success,
        },
        moderate: {
            background: Colors.dark.advisoryBackground,
            border: Colors.dark.advisoryBorder,
            text: Colors.dark.advisoryText,
            icon: Colors.dark.advisory,
        },
        severe: {
            background: Colors.dark.warningBackground,
            border: Colors.dark.warningBorder,
            text: Colors.dark.warningText,
            icon: Colors.dark.warning,
        },
        verySevere: {
            background: Colors.dark.errorBackground,
            border: Colors.dark.errorBorder,
            text: Colors.dark.errorText,
            icon: Colors.dark.error,
        },
    },
} as const;

// Alert Priority Levels (for safety alerts)
export const AlertPriorityColors = {
    light: {
        info: {
            background: Colors.light.infoBackground,
            border: Colors.light.infoBorder,
            text: Colors.light.infoText,
            icon: Colors.light.info,
        },
        advisory: {
            background: Colors.light.advisoryBackground,
            border: Colors.light.advisoryBorder,
            text: Colors.light.advisoryText,
            icon: Colors.light.advisory,
        },
        warning: {
            background: Colors.light.warningBackground,
            border: Colors.light.warningBorder,
            text: Colors.light.warningText,
            icon: Colors.light.warning,
        },
        critical: {
            background: Colors.light.errorBackground,
            border: Colors.light.errorBorder,
            text: Colors.light.errorText,
            icon: Colors.light.error,
        },
    },
    dark: {
        info: {
            background: Colors.dark.infoBackground,
            border: Colors.dark.infoBorder,
            text: Colors.dark.infoText,
            icon: Colors.dark.info,
        },
        advisory: {
            background: Colors.dark.advisoryBackground,
            border: Colors.dark.advisoryBorder,
            text: Colors.dark.advisoryText,
            icon: Colors.dark.advisory,
        },
        warning: {
            background: Colors.dark.warningBackground,
            border: Colors.dark.warningBorder,
            text: Colors.dark.warningText,
            icon: Colors.dark.warning,
        },
        critical: {
            background: Colors.dark.errorBackground,
            border: Colors.dark.errorBorder,
            text: Colors.dark.errorText,
            icon: Colors.dark.error,
        },
    },
} as const;

// Type for theme mode
export type ColorMode = 'light' | 'dark';
export type AdherenceState = 'adherent' | 'delayed' | 'atRisk' | 'missed';
export type SeverityLevel = 'none' | 'mild' | 'moderate' | 'severe' | 'verySevere';
export type AlertPriority = 'info' | 'advisory' | 'warning' | 'critical';

// Helper function to get themed colors
export const getThemedColors = (mode: ColorMode) => {
    return mode === 'dark' ? Colors.dark : Colors.light;
};

// Helper function to get adherence colors
export const getAdherenceColors = (mode: ColorMode, state: AdherenceState) => {
    return AdherenceColors[mode][state];
};

// Helper function to get severity colors
export const getSeverityColors = (mode: ColorMode, level: SeverityLevel) => {
    return SeverityColors[mode][level];
};

// Helper function to get alert priority colors
export const getAlertPriorityColors = (mode: ColorMode, priority: AlertPriority) => {
    return AlertPriorityColors[mode][priority];
};

export default Colors;
