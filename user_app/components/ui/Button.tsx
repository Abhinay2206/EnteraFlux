/**
 * Button Component
 * 4 variants: Primary, Secondary, Tertiary, Destructive
 * All states: Default, Hover, Active, Disabled, Loading
 */

import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    ViewStyle,
    TextStyle,
    AccessibilityRole,
} from 'react-native';
import { lightTheme } from '@/constants/theme';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'destructive';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
    children: React.ReactNode;
    onPress: () => void;
    variant?: ButtonVariant;
    size?: ButtonSize;
    disabled?: boolean;
    loading?: boolean;
    fullWidth?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
    accessibilityLabel?: string;
    accessibilityHint?: string;
    accessibilityRole?: AccessibilityRole;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    onPress,
    variant = 'primary',
    size = 'large',
    disabled = false,
    loading = false,
    fullWidth = false,
    style,
    textStyle,
    accessibilityLabel,
    accessibilityHint,
    accessibilityRole = 'button',
}) => {
    const theme = lightTheme;

    // Size styles
    const sizeStyles = {
        small: {
            height: 40,
            paddingHorizontal: 16,
        },
        medium: {
            height: 44,
            paddingHorizontal: 20,
        },
        large: {
            height: 48,
            paddingHorizontal: 24,
        },
    };

    // Variant styles
    const getVariantStyles = (): { container: ViewStyle; text: TextStyle } => {
        const baseContainer: ViewStyle = {
            borderRadius: theme.borderRadius.md,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            ...sizeStyles[size],
        };

        const baseText: TextStyle = {
            ...theme.textStyles.buttonPrimary,
        };

        if (disabled) {
            return {
                container: {
                    ...baseContainer,
                    backgroundColor:
                        variant === 'secondary' || variant === 'tertiary'
                            ? 'transparent'
                            : theme.colors.primaryDisabled,
                    borderWidth: variant === 'secondary' ? 2 : 0,
                    borderColor: theme.colors.primaryDisabled,
                    opacity: 0.5,
                },
                text: {
                    ...baseText,
                    color:
                        variant === 'secondary' || variant === 'tertiary'
                            ? theme.colors.textTertiary
                            : theme.colors.textInverse,
                },
            };
        }

        switch (variant) {
            case 'primary':
                return {
                    container: {
                        ...baseContainer,
                        backgroundColor: theme.colors.primary,
                        ...theme.shadow.sm,
                    },
                    text: {
                        ...baseText,
                        color: theme.colors.textInverse,
                    },
                };

            case 'secondary':
                return {
                    container: {
                        ...baseContainer,
                        backgroundColor: 'transparent',
                        borderWidth: 2,
                        borderColor: theme.colors.primary,
                    },
                    text: {
                        ...baseText,
                        color: theme.colors.primary,
                    },
                };

            case 'tertiary':
                return {
                    container: {
                        ...baseContainer,
                        backgroundColor: 'transparent',
                    },
                    text: {
                        ...baseText,
                        color: theme.colors.primary,
                        textDecorationLine: 'underline',
                    },
                };

            case 'destructive':
                return {
                    container: {
                        ...baseContainer,
                        backgroundColor: theme.colors.error,
                        ...theme.shadow.sm,
                    },
                    text: {
                        ...baseText,
                        color: theme.colors.textInverse,
                    },
                };

            default:
                return {
                    container: baseContainer,
                    text: baseText,
                };
        }
    };

    const variantStyles = getVariantStyles();

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled || loading}
            style={[
                variantStyles.container,
                fullWidth && { width: '100%' },
                style,
            ]}
            activeOpacity={0.7}
            accessibilityLabel={accessibilityLabel || (typeof children === 'string' ? children : undefined)}
            accessibilityHint={accessibilityHint}
            accessibilityRole={accessibilityRole}
            accessibilityState={{ disabled: disabled || loading }}
        >
            {loading ? (
                <ActivityIndicator
                    color={
                        variant === 'secondary' || variant === 'tertiary'
                            ? theme.colors.primary
                            : theme.colors.textInverse
                    }
                    size="small"
                />
            ) : (
                <Text style={[variantStyles.text, textStyle]}>
                    {children}
                </Text>
            )}
        </TouchableOpacity>
    );
};

export default Button;
