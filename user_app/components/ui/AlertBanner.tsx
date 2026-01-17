/**
 * Alert Banner Component
 * Top banner for critical alerts
 */

import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { H4, Body } from '../ui/Typography';
import { lightTheme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

type AlertLevel = 'success' | 'advisory' | 'warning' | 'error';

interface AlertBannerProps {
    level: AlertLevel;
    title: string;
    message?: string;
    action?: {
        label: string;
        onPress: () => void;
    };
    onDismiss?: () => void;
}

export const AlertBanner: React.FC<AlertBannerProps> = ({
    level,
    title,
    message,
    action,
    onDismiss,
}) => {
    const theme = lightTheme;

    const getConfig = () => {
        switch (level) {
            case 'success':
                return {
                    backgroundColor: theme.colors.successBackground,
                    borderColor: theme.colors.successBorder,
                    icon: 'checkmark-circle' as const,
                    iconColor: theme.colors.success,
                    textColor: theme.colors.successText,
                };
            case 'advisory':
                return {
                    backgroundColor: theme.colors.advisoryBackground,
                    borderColor: theme.colors.advisoryBorder,
                    icon: 'information-circle' as const,
                    iconColor: theme.colors.advisory,
                    textColor: theme.colors.advisoryText,
                };
            case 'warning':
                return {
                    backgroundColor: theme.colors.warningBackground,
                    borderColor: theme.colors.warningBorder,
                    icon: 'warning' as const,
                    iconColor: theme.colors.warning,
                    textColor: theme.colors.warningText,
                };
            case 'error':
                return {
                    backgroundColor: theme.colors.errorBackground,
                    borderColor: theme.colors.errorBorder,
                    icon: 'alert-circle' as const,
                    iconColor: theme.colors.error,
                    textColor: theme.colors.errorText,
                };
        }
    };

    const config = getConfig();

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: config.backgroundColor,
                    borderColor: config.borderColor,
                },
            ]}
        >
            <View style={styles.content}>
                <Ionicons name={config.icon} size={24} color={config.iconColor} />
                <View style={styles.textContainer}>
                    <H4 style={{ color: config.textColor, fontSize: 16 }}>{title}</H4>
                    {message && (
                        <Body style={{ color: config.textColor, marginTop: 4, fontSize: 14 }}>
                            {message}
                        </Body>
                    )}
                </View>
            </View>

            <View style={styles.actions}>
                {action && (
                    <TouchableOpacity
                        onPress={action.onPress}
                        style={[styles.actionButton, { backgroundColor: config.iconColor }]}
                        accessibilityLabel={action.label}
                        accessibilityRole="button"
                    >
                        <Body style={{ color: '#FFFFFF', fontSize: 14, fontWeight: '600' }}>
                            {action.label}
                        </Body>
                    </TouchableOpacity>
                )}
                {onDismiss && (
                    <TouchableOpacity
                        onPress={onDismiss}
                        style={styles.dismissButton}
                        accessibilityLabel="Dismiss alert"
                        accessibilityRole="button"
                    >
                        <Ionicons name="close" size={20} color={config.textColor} />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        borderLeftWidth: 4,
        marginHorizontal: 16,
        marginBottom: 16,
        borderRadius: 12,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    textContainer: {
        flex: 1,
        marginLeft: 12,
    },
    actions: {
        flexDirection: 'row',
        marginTop: 12,
        alignItems: 'center',
    },
    actionButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginRight: 8,
    },
    dismissButton: {
        padding: 8,
    },
});

export default AlertBanner;
