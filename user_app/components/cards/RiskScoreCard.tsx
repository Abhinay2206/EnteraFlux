/**
 * Risk Score Card
 * Main dashboard card showing overall risk level
 */

import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from '../ui/Card';
import { H2, Body } from '../ui/Typography';
import { lightTheme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

type RiskLevel = 'low' | 'moderate' | 'high' | 'critical';

interface RiskScoreCardProps {
    score: number; // 0-10
    onPress?: () => void;
}

export const RiskScoreCard: React.FC<RiskScoreCardProps> = ({
    score,
    onPress,
}) => {
    const theme = lightTheme;

    // Determine risk level based on score
    const getRiskLevel = (): RiskLevel => {
        if (score <= 3) return 'low';
        if (score <= 6) return 'moderate';
        if (score <= 8) return 'high';
        return 'critical';
    };

    const riskLevel = getRiskLevel();

    // Get colors and text based on risk level
    const getRiskConfig = () => {
        switch (riskLevel) {
            case 'low':
                return {
                    color: theme.colors.palette.success[500],
                    backgroundColor: theme.colors.successBackground,
                    icon: 'shield-checkmark' as const,
                    label: 'Low Risk',
                };
            case 'moderate':
                return {
                    color: theme.colors.palette.advisory[500],
                    backgroundColor: theme.colors.advisoryBackground,
                    icon: 'shield' as const,
                    label: 'Moderate Risk',
                };
            case 'high':
                return {
                    color: theme.colors.palette.warning[500],
                    backgroundColor: theme.colors.warningBackground,
                    icon: 'warning' as const,
                    label: 'High Risk',
                };
            case 'critical':
                return {
                    color: theme.colors.palette.error[500],
                    backgroundColor: theme.colors.errorBackground,
                    icon: 'alert-circle' as const,
                    label: 'Critical Risk',
                };
        }
    };

    const config = getRiskConfig();

    const CardContent = (
        <View style={[styles.container, { backgroundColor: config.backgroundColor }]}>
            <View style={styles.iconContainer}>
                <Ionicons name={config.icon} size={48} color={config.color} />
            </View>
            <H2 style={{ color: config.color }}>{config.label}</H2>
            <View style={styles.scoreContainer}>
                <H2 style={{ fontSize: 32, color: config.color }}>
                    {score.toFixed(1)}
                </H2>
                <Body style={{ color: theme.colors.textSecondary, fontSize: 16 }}>/10</Body>
            </View>
            {onPress && (
                <Body style={{ color: theme.colors.primary, marginTop: 8 }}>
                    View Details →
                </Body>
            )}
        </View>
    );

    if (onPress) {
        return (
            <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
                <Card elevated style={styles.card}>
                    {CardContent}
                </Card>
            </TouchableOpacity>
        );
    }

    return (
        <Card elevated style={styles.card}>
            {CardContent}
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 0,
        overflow: 'hidden',
    },
    container: {
        paddingVertical: 24,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconContainer: {
        marginBottom: 8,
    },
    scoreContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginTop: 4,
    },
});

export default RiskScoreCard;
