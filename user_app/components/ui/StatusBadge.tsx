/**
 * StatusBadge Component
 * Displays medication adherence status and symptom severity
 * Variants: adherent, delayed, atRisk, missed (adherence)
 *           none, mild, moderate, severe, verySevere (severity)
 */

import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import {
    getAdherenceColors,
    getSeverityColors,
    type AdherenceState,
    type SeverityLevel
} from '@/constants/colors';
import { lightTheme } from '@/constants/theme';

type BadgeSize = 'small' | 'medium' | 'large';
type BadgeType = 'adherence' | 'severity';

interface StatusBadgeProps {
    type: BadgeType;
    state?: AdherenceState;
    severity?: SeverityLevel;
    size?: BadgeSize;
    style?: ViewStyle;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
    type,
    state,
    severity,
    size = 'medium',
    style,
}) => {
    const theme = lightTheme;

    // Get appropriate colors based on type
    const getColors = () => {
        if (type === 'adherence' && state) {
            return getAdherenceColors('light', state);
        }
        if (type === 'severity' && severity) {
            return getSeverityColors('light', severity);
        }
        // Default fallback
        return {
            background: theme.colors.backgroundSecondary,
            border: theme.colors.border,
            text: theme.colors.textSecondary,
            icon: theme.colors.textSecondary,
        };
    };

    const colors = getColors();

    // Get display text
    const getDisplayText = (): string => {
        if (type === 'adherence' && state) {
            const labels: Record<AdherenceState, string> = {
                adherent: 'Adherent',
                delayed: 'Delayed',
                atRisk: 'At Risk',
                missed: 'Missed',
            };
            return labels[state];
        }
        if (type === 'severity' && severity) {
            const labels: Record<SeverityLevel, string> = {
                none: 'None',
                mild: 'Mild',
                moderate: 'Moderate',
                severe: 'Severe',
                verySevere: 'Very Severe',
            };
            return labels[severity];
        }
        return '';
    };

    // Size styles
    const sizeStyles = {
        small: {
            paddingVertical: 2,
            paddingHorizontal: 8,
            fontSize: 10,
        },
        medium: {
            paddingVertical: 4,
            paddingHorizontal: 12,
            fontSize: 11,
        },
        large: {
            paddingVertical: 6,
            paddingHorizontal: 16,
            fontSize: 12,
        },
    };

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: colors.background,
                    borderColor: colors.border,
                    paddingVertical: sizeStyles[size].paddingVertical,
                    paddingHorizontal: sizeStyles[size].paddingHorizontal,
                },
                style,
            ]}
        >
            <Text
                style={[
                    styles.text,
                    {
                        color: colors.text,
                        fontSize: sizeStyles[size].fontSize,
                    },
                ]}
            >
                {getDisplayText()}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 12,
        borderWidth: 1,
        alignSelf: 'flex-start',
    },
    text: {
        fontWeight: '600',
        letterSpacing: 0.5,
        textTransform: 'uppercase',
    },
});

export default StatusBadge;
