/**
 * TextInput Component
 * Form input field with label, error states, and icons
 */

import React, { useState } from 'react';
import {
    View,
    TextInput as RNTextInput,
    StyleSheet,
    TextInputProps as RNTextInputProps,
    TouchableOpacity,
} from 'react-native';
import { lightTheme } from '@/constants/theme';
import { Label, Caption } from './Typography';
import { Ionicons } from '@expo/vector-icons';

interface TextInputProps extends Omit<RNTextInputProps, 'style'> {
    label?: string;
    error?: string;
    helperText?: string;
    leftIcon?: keyof typeof Ionicons.glyphMap;
    rightIcon?: keyof typeof Ionicons.glyphMap;
    onRightIconPress?: () => void;
    containerStyle?: any;
}

export const TextInput: React.FC<TextInputProps> = ({
    label,
    error,
    helperText,
    leftIcon,
    rightIcon,
    onRightIconPress,
    containerStyle,
    ...props
}) => {
    const theme = lightTheme;
    const [isFocused, setIsFocused] = useState(false);

    const getBorderColor = () => {
        if (error) return theme.colors.error;
        if (isFocused) return theme.colors.primary;
        return theme.colors.border;
    };

    return (
        <View style={[styles.container, containerStyle]}>
            {label && <Label style={styles.label}>{label}</Label>}

            <View
                style={[
                    styles.inputContainer,
                    {
                        borderColor: getBorderColor(),
                        backgroundColor: theme.colors.surface,
                    },
                ]}
            >
                {leftIcon && (
                    <Ionicons
                        name={leftIcon}
                        size={20}
                        color={theme.colors.textSecondary}
                        style={styles.leftIcon}
                    />
                )}

                <RNTextInput
                    style={[
                        styles.input,
                        {
                            color: theme.colors.textPrimary,
                            paddingLeft: leftIcon ? 0 : 12,
                        },
                    ]}
                    placeholderTextColor={theme.colors.textTertiary}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    {...props}
                />

                {rightIcon && (
                    <TouchableOpacity
                        onPress={onRightIconPress}
                        style={styles.rightIcon}
                        disabled={!onRightIconPress}
                    >
                        <Ionicons
                            name={rightIcon}
                            size={20}
                            color={theme.colors.textSecondary}
                        />
                    </TouchableOpacity>
                )}
            </View>

            {(error || helperText) && (
                <Caption
                    style={[
                        styles.helperText,
                        { color: error ? theme.colors.error : theme.colors.textSecondary },
                    ]}
                >
                    {error || helperText}
                </Caption>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    label: {
        marginBottom: 8,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 12,
        minHeight: 48,
    },
    input: {
        flex: 1,
        fontSize: 16,
        paddingVertical: 12,
        paddingRight: 12,
    },
    leftIcon: {
        marginLeft: 12,
        marginRight: 8,
    },
    rightIcon: {
        marginRight: 12,
        marginLeft: 8,
    },
    helperText: {
        marginTop: 4,
        marginLeft: 4,
    },
});

export default TextInput;
