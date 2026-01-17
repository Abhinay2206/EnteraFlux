/**
 * ProgressBar Component
 * Visual progress indicator for adherence percentage and onboarding
 * Color-coded thresholds: red < 70%, amber 70-89%, green ≥ 90%
 */

import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { lightTheme } from '@/constants/theme';

interface ProgressBarProps {
    percentage: number; // 0-100
    showLabel?: boolean;
    height?: number;
    label?: string;
    style?: ViewStyle;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
    percentage,
    showLabel = true,
    height = 8,
    label,
    style,
}) => {
    const theme = lightTheme;

    // Clamp percentage between 0 and 100
    const clampedPercentage = Math.max(0, Math.min(100, percentage));

    // Get color based on threshold
    const getColor = () => {
        if (clampedPercentage >= 90) {
            return theme.colors.success;
        } else if (clampedPercentage >= 70) {
            return theme.colors.advisory;
        } else {
            return theme.colors.error;
        }
    };

    const progressColor = getColor();

    return (
        <View style={[styles.container, style]}>
            {showLabel && (
                <View style={styles.labelContainer}>
                    {label && (
                        <Text style={styles.label}>{label}</Text>
                    )}
                    <Text style={[styles.percentage, { color: progressColor }]}>
                        {Math.round(clampedPercentage)}%
                    </Text>
                </View>
            )}
            <View
                style={[
                    styles.track,
                    {
                        height,
                        backgroundColor: theme.colors.backgroundSecondary,
                    }
                ]}
            >
                <View
                    style={[
                        styles.fill,
                        {
                            width: `${clampedPercentage}%`,
                            backgroundColor: progressColor,
                            height: '100%',
                        },
                    ]}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    labelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: '#4B5563',
    },
    percentage: {
        fontSize: 16,
        fontWeight: '600',
    },
    track: {
        width: '100%',
        borderRadius: 999,
        overflow: 'hidden',
    },
    fill: {
        borderRadius: 999,
    },
});

export default ProgressBar;
