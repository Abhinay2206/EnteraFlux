/**
 * Typography Components
 * Pre-styled text components matching design system
 */

import React from 'react';
import { Text as RNText, TextStyle, TextProps as RNTextProps } from 'react-native';
import { lightTheme } from '@/constants/theme';

interface TextProps extends RNTextProps {
    children: React.ReactNode;
    color?: string;
    align?: 'left' | 'center' | 'right';
    style?: TextStyle;
}

// H1 - Page Title
export const H1: React.FC<TextProps> = ({ children, color, align = 'left', style, ...props }) => {
    const theme = lightTheme;
    return (
        <RNText
            style={[
                theme.textStyles.pageTitle,
                { color: color || theme.colors.textPrimary, textAlign: align },
                style,
            ]}
            {...props}
        >
            {children}
        </RNText>
    );
};

// H2 - Section Header
export const H2: React.FC<TextProps> = ({ children, color, align = 'left', style, ...props }) => {
    const theme = lightTheme;
    return (
        <RNText
            style={[
                theme.textStyles.sectionHeader,
                { color: color || theme.colors.textPrimary, textAlign: align },
                style,
            ]}
            {...props}
        >
            {children}
        </RNText>
    );
};

// H3 - Card Title
export const H3: React.FC<TextProps> = ({ children, color, align = 'left', style, ...props }) => {
    const theme = lightTheme;
    return (
        <RNText
            style={[
                theme.textStyles.cardTitle,
                { color: color || theme.colors.textPrimary, textAlign: align },
                style,
            ]}
            {...props}
        >
            {children}
        </RNText>
    );
};

// H4 - List Item Title
export const H4: React.FC<TextProps> = ({ children, color, align = 'left', style, ...props }) => {
    const theme = lightTheme;
    return (
        <RNText
            style={[
                theme.textStyles.listItemTitle,
                { color: color || theme.colors.textPrimary, textAlign: align },
                style,
            ]}
            {...props}
        >
            {children}
        </RNText>
    );
};

// Body - Standard body text (16px medical minimum)
export const Body: React.FC<TextProps> = ({ children, color, align = 'left', style, ...props }) => {
    const theme = lightTheme;
    return (
        <RNText
            style={[
                theme.textStyles.bodyStandard,
                { color: color || theme.colors.textPrimary, textAlign: align },
                style,
            ]}
            {...props}
        >
            {children}
        </RNText>
    );
};

// BodyLarge - Prominent body text
export const BodyLarge: React.FC<TextProps> = ({ children, color, align = 'left', style, ...props }) => {
    const theme = lightTheme;
    return (
        <RNText
            style={[
                theme.textStyles.bodyProminent,
                { color: color || theme.colors.textPrimary, textAlign: align },
                style,
            ]}
            {...props}
        >
            {children}
        </RNText>
    );
};

// BodySmall - Secondary text
export const BodySmall: React.FC<TextProps> = ({ children, color, align = 'left', style, ...props }) => {
    const theme = lightTheme;
    return (
        <RNText
            style={[
                theme.textStyles.bodySecondary,
                { color: color || theme.colors.textSecondary, textAlign: align },
                style,
            ]}
            {...props}
        >
            {children}
        </RNText>
    );
};

// Caption - Metadata, timestamps
export const Caption: React.FC<TextProps> = ({ children, color, align = 'left', style, ...props }) => {
    const theme = lightTheme;
    return (
        <RNText
            style={[
                theme.textStyles.metadata,
                { color: color || theme.colors.textTertiary, textAlign: align },
                style,
            ]}
            {...props}
        >
            {children}
        </RNText>
    );
};

// Label - Form labels
export const Label: React.FC<TextProps> = ({ children, color, align = 'left', style, ...props }) => {
    const theme = lightTheme;
    return (
        <RNText
            style={[
                theme.textStyles.formLabel,
                { color: color || theme.colors.textPrimary, textAlign: align },
                style,
            ]}
            {...props}
        >
            {children}
        </RNText>
    );
};

export default {
    H1,
    H2,
    H3,
    H4,
    Body,
    BodyLarge,
    BodySmall,
    Caption,
    Label,
};
