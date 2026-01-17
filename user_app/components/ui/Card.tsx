/**
 * Card Component
 * Types: Basic, Metric, Alert, Info
 */

import React from 'react';
import {
    View,
    StyleSheet,
    ViewStyle,
} from 'react-native';
import { lightTheme } from '@/constants/theme';

type CardVariant = 'basic' | 'metric' | 'alert' | 'info';
type AlertLevel = 'success' | 'advisory' | 'warning' | 'error' | 'info';

interface CardProps {
    children: React.ReactNode;
    variant?: CardVariant;
    alertLevel?: AlertLevel;
    style?: ViewStyle;
    elevated?: boolean;
}

export const Card: React.FC<CardProps> = ({
    children,
    variant = 'basic',
    alertLevel,
    style,
    elevated = true,
}) => {
    const theme = lightTheme;

    const getCardStyles = (): ViewStyle => {
        const baseStyle: ViewStyle = {
            borderRadius: theme.borderRadius.lg,
            padding: theme.spacing.cardPadding,
            backgroundColor: theme.colors.surface,
        };

        if (variant === 'alert' && alertLevel) {
            return {
                ...baseStyle,
                backgroundColor: theme.colors[`${alertLevel}Background`],
                borderLeftWidth: 4,
                borderLeftColor: theme.colors[`${alertLevel}Border`],
                ...theme.shadow.sm,
            };
        }

        if (variant === 'info') {
            return {
                ...baseStyle,
                backgroundColor: theme.colors.infoBackground,
                borderRadius: theme.borderRadius.md,
            };
        }

        if (variant === 'metric') {
            return {
                ...baseStyle,
                padding: theme.spacing.cardPaddingSmall,
                ...theme.shadow.md,
            };
        }

        // Basic card
        return {
            ...baseStyle,
            borderWidth: 1,
            borderColor: theme.colors.border,
            ...(elevated ? theme.shadow.md : {}),
        };
    };

    return (
        <View style={[getCardStyles(), style]}>
            {children}
        </View>
    );
};

export default Card;
