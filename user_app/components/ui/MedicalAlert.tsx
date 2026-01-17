/**
 * MedicalAlert Component
 * Clinical-grade alert banner for safety messages
 * Priorities: info, advisory, warning, critical
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
    getAlertPriorityColors,
    type AlertPriority
} from '@/constants/colors';
import { lightTheme } from '@/constants/theme';

interface MedicalAlertProps {
    priority: AlertPriority;
    title: string;
    message: string;
    recommendation?: string;
    onDismiss?: () => void;
    dismissible?: boolean;
}

export const MedicalAlert: React.FC<MedicalAlertProps> = ({
    priority,
    title,
    message,
    recommendation,
    onDismiss,
    dismissible = false,
}) => {
    const theme = lightTheme;
    const colors = getAlertPriorityColors('light', priority);

    // Icon mapping by priority
    const getIcon = (): keyof typeof Ionicons.glyphMap => {
        const icons: Record<AlertPriority, keyof typeof Ionicons.glyphMap> = {
            info: 'information-circle',
            advisory: 'alert-circle',
            warning: 'warning',
            critical: 'alert',
        };
        return icons[priority];
    };

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: colors.background,
                    borderLeftColor: colors.border,
                },
            ]}
        >
            <View style={styles.content}>
                <View style={styles.header}>
                    <Ionicons
                        name={getIcon()}
                        size={24}
                        color={colors.icon}
                        style={styles.icon}
                    />
                    <Text
                        style={[
                            styles.title,
                            { color: colors.text }
                        ]}
                    >
                        {title}
                    </Text>
                    {dismissible && onDismiss && (
                        <TouchableOpacity
                            onPress={onDismiss}
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                            accessibilityLabel="Dismiss alert"
                            accessibilityRole="button"
                        >
                            <Ionicons
                                name="close"
                                size={20}
                                color={colors.text}
                            />
                        </TouchableOpacity>
                    )}
                </View>

                <Text style={[styles.message, { color: colors.text }]}>
                    {message}
                </Text>

                {recommendation && (
                    <View style={styles.recommendationContainer}>
                        <Ionicons
                            name="checkmark-circle-outline"
                            size={16}
                            color={colors.icon}
                            style={styles.recommendationIcon}
                        />
                        <Text
                            style={[
                                styles.recommendation,
                                { color: colors.text }
                            ]}
                        >
                            {recommendation}
                        </Text>
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 12,
        borderLeftWidth: 4,
        padding: 16,
        marginVertical: 8,
    },
    content: {
        gap: 8,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginRight: 8,
    },
    title: {
        flex: 1,
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 24,
    },
    message: {
        fontSize: 14,
        lineHeight: 20,
        marginLeft: 32,
    },
    recommendationContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginLeft: 32,
        marginTop: 4,
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: 'rgba(0, 0, 0, 0.08)',
    },
    recommendationIcon: {
        marginRight: 6,
        marginTop: 2,
    },
    recommendation: {
        flex: 1,
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '500',
    },
});

export default MedicalAlert;
