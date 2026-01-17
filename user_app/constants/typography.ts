/**
 * GLP-1 Sentinel Design System - Typography
 * Medical-grade type scale with 16px minimum for body text
 * Supports dynamic type and system font scaling
 */

import { Platform } from 'react-native';

export const Typography = {
    // Font Families
    fontFamily: {
        // iOS uses SF Pro, Android uses Roboto (system defaults)
        regular: Platform.select({
            ios: 'System',
            android: 'Roboto',
            default: 'System',
        }),
        medium: Platform.select({
            ios: 'System',
            android: 'Roboto-Medium',
            default: 'System',
        }),
        semiBold: Platform.select({
            ios: 'System',
            android: 'Roboto-Medium',
            default: 'System',
        }),
        bold: Platform.select({
            ios: 'System',
            android: 'Roboto-Bold',
            default: 'System',
        }),
    },

    // Font Weights
    fontWeight: {
        regular: '400' as const,
        medium: '500' as const,
        semiBold: '600' as const,
        bold: '700' as const,
    },

    // Type Scale

    // H1 - Extra Large Heading
    h1: {
        fontSize: 32,
        lineHeight: 40,
        fontWeight: '700' as const,
        letterSpacing: -0.5,
    },

    // H2 - Large Heading
    h2: {
        fontSize: 24,
        lineHeight: 32,
        fontWeight: '600' as const,
        letterSpacing: -0.3,
    },

    // H3 - Medium Heading
    h3: {
        fontSize: 20,
        lineHeight: 28,
        fontWeight: '600' as const,
        letterSpacing: -0.2,
    },

    // H4 - Small Heading
    h4: {
        fontSize: 18,
        lineHeight: 24,
        fontWeight: '600' as const,
        letterSpacing: 0,
    },

    // Body Large
    bodyLarge: {
        fontSize: 18,
        lineHeight: 28,
        fontWeight: '400' as const,
        letterSpacing: 0,
    },

    // Body Regular (Medical-Grade Minimum: 16px)
    body: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '400' as const,
        letterSpacing: 0,
    },

    // Body Small
    bodySmall: {
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '400' as const,
        letterSpacing: 0,
    },

    // Caption
    caption: {
        fontSize: 12,
        lineHeight: 16,
        fontWeight: '400' as const,
        letterSpacing: 0.1,
    },

    // Label (for form labels, tab labels)
    label: {
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '500' as const,
        letterSpacing: 0.1,
    },

    // Button Text
    button: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '600' as const,
        letterSpacing: 0.2,
    },

    // Overline (for metadata, timestamps)
    overline: {
        fontSize: 12,
        lineHeight: 16,
        fontWeight: '500' as const,
        letterSpacing: 1,
        textTransform: 'uppercase' as const,
    },
} as const;

// Text style presets for common usecases
export const TextStyles = {
    // Page Title
    pageTitle: {
        ...Typography.h1,
        fontFamily: Typography.fontFamily.bold,
    },

    // Section Header
    sectionHeader: {
        ...Typography.h2,
        fontFamily: Typography.fontFamily.semiBold,
    },

    // Card Title
    cardTitle: {
        ...Typography.h3,
        fontFamily: Typography.fontFamily.semiBold,
    },

    // List Item Title
    listItemTitle: {
        ...Typography.h4,
        fontFamily: Typography.fontFamily.semiBold,
    },

    // Prominent Body
    bodyProminent: {
        ...Typography.bodyLarge,
        fontFamily: Typography.fontFamily.regular,
    },

    // Standard Body (Default)
    bodyStandard: {
        ...Typography.body,
        fontFamily: Typography.fontFamily.regular,
    },

    // Secondary Body
    bodySecondary: {
        ...Typography.bodySmall,
        fontFamily: Typography.fontFamily.regular,
    },

    // Caption/Metadata
    metadata: {
        ...Typography.caption,
        fontFamily: Typography.fontFamily.regular,
    },

    // Form Label
    formLabel: {
        ...Typography.label,
        fontFamily: Typography.fontFamily.medium,
    },

    // Button
    buttonPrimary: {
        ...Typography.button,
        fontFamily: Typography.fontFamily.semiBold,
    },

    // Tab Label
    tabLabel: {
        fontSize: 12,
        lineHeight: 16,
        fontWeight: '500' as const,
        letterSpacing: 0.1,
        fontFamily: Typography.fontFamily.medium,
    },

    // Alert Title
    alertTitle: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '600' as const,
        letterSpacing: 0,
        fontFamily: Typography.fontFamily.semiBold,
    },

    // Alert Body
    alertBody: {
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '400' as const,
        letterSpacing: 0,
        fontFamily: Typography.fontFamily.regular,
    },

    // Clinical Text Styles for Medical UX

    // Disclaimer Text (legal/medical disclaimers)
    disclaimer: {
        fontSize: 12,
        lineHeight: 18,
        fontWeight: '400' as const,
        letterSpacing: 0,
        fontFamily: Typography.fontFamily.regular,
    },

    // Safety Warning Text (prominent medical warnings)
    safetyWarning: {
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '600' as const,
        letterSpacing: 0.1,
        fontFamily: Typography.fontFamily.semiBold,
    },

    // Clinical Label (medication names, dosages, medical terms)
    clinicalLabel: {
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '500' as const,
        letterSpacing: 0.2,
        fontFamily: Typography.fontFamily.medium,
    },

    // Medical Value (dosage amounts, severity levels, measurements)
    medicalValue: {
        fontSize: 20,
        lineHeight: 28,
        fontWeight: '600' as const,
        letterSpacing: -0.2,
        fontFamily: Typography.fontFamily.semiBold,
    },

    // Medication Name (prominently displayed medication)
    medicationName: {
        fontSize: 18,
        lineHeight: 24,
        fontWeight: '600' as const,
        letterSpacing: 0,
        fontFamily: Typography.fontFamily.semiBold,
    },

    // Dosage Display
    dosageDisplay: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '500' as const,
        letterSpacing: 0.1,
        fontFamily: Typography.fontFamily.medium,
    },

    // Timestamp (for medical records)
    timestamp: {
        fontSize: 12,
        lineHeight: 16,
        fontWeight: '400' as const,
        letterSpacing: 0.1,
        fontFamily: Typography.fontFamily.regular,
    },

    // Status Badge Text
    statusBadge: {
        fontSize: 11,
        lineHeight: 16,
        fontWeight: '600' as const,
        letterSpacing: 0.5,
        textTransform: 'uppercase' as const,
        fontFamily: Typography.fontFamily.semiBold,
    },
} as const;

// Dynamic Type Scale Multipliers (iOS accessibility sizes)
export const DynamicTypeMultipliers = {
    xs: 0.875,     // Small
    sm: 0.9375,    // Small (default iOS)
    md: 1.0,       // Medium (default)
    lg: 1.125,     // Large
    xl: 1.25,      // Extra Large
    xxl: 1.5,      // Accessibility 1
    xxxl: 2.0,     // Accessibility 2
} as const;

// Helper function to scale typography based on accessibility settings
export const scaleFont = (baseSize: number, multiplier: number = 1.0): number => {
    return Math.round(baseSize * multiplier);
};

export default Typography;

