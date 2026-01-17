/**
 * Metric Card
 * Small card displaying a single biometric metric
 */

import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from '../ui/Card';
import { H3, Body, Caption } from '../ui/Typography';
import { lightTheme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

type TrendDirection = 'up' | 'down' | 'stable';

interface MetricCardProps {
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    value: string;
    unit?: string;
    trend?: TrendDirection;
    trendLabel?: string;
    onPress?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({
    icon,
    label,
    value,
    unit,
    trend,
    trendLabel,
    onPress,
}) => {
    const theme = lightTheme;

    const getTrendIcon = () => {
        if (!trend) return null;

        switch (trend) {
            case 'up':
                return <Ionicons name="trending-up" size={16} color={theme.colors.palette.success[500]} />;
            case 'down':
                return <Ionicons name="trending-down" size={16} color={theme.colors.palette.error[500]} />;
            case 'stable':
                return <Ionicons name="remove" size={16} color={theme.colors.textSecondary} />;
        }
    };

    const getTrendColor = () => {
        switch (trend) {
            case 'up':
                return theme.colors.palette.success[500];
            case 'down':
                return theme.colors.palette.error[500];
            case 'stable':
                return theme.colors.textSecondary;
            default:
                return theme.colors.textSecondary;
        }
    };

    const CardContent = (
        <View style={styles.container}>
            <View style={styles.header}>
                <Ionicons
                    name={icon}
                    size={24}
                    color={theme.colors.primary}
                />
                <Caption style={styles.label}>{label}</Caption>
            </View>

            <View style={styles.valueContainer}>
                <H3 style={styles.value}>{value}</H3>
                {unit && <Caption style={styles.unit}>{unit}</Caption>}
            </View>

            {(trend || trendLabel) && (
                <View style={styles.trendContainer}>
                    {getTrendIcon()}
                    {trendLabel && (
                        <Caption style={[styles.trendLabel, { color: getTrendColor() }]}>
                            {trendLabel}
                        </Caption>
                    )}
                </View>
            )}
        </View>
    );

    if (onPress) {
        return (
            <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.cardWrapper}>
                <Card variant="metric" elevated>
                    {CardContent}
                </Card>
            </TouchableOpacity>
        );
    }

    return (
        <Card variant="metric" elevated style={styles.cardWrapper}>
            {CardContent}
        </Card>
    );
};

const styles = StyleSheet.create({
    cardWrapper: {
        flex: 1,
        minWidth: 100,
    },
    container: {
        padding: 12,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    label: {
        marginLeft: 6,
        flex: 1,
    },
    valueContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginBottom: 4,
    },
    value: {
        fontSize: 24,
        lineHeight: 28,
    },
    unit: {
        marginLeft: 2,
    },
    trendContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    trendLabel: {
        marginLeft: 4,
        fontSize: 11,
    },
});

export default MetricCard;
