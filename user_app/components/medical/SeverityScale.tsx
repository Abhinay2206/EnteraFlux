/**
 * SeverityScale Component
 * Interactive 5-point severity scale for symptom tracking
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getSeverityColors, type SeverityLevel } from '@/constants/colors';
import { lightTheme } from '@/constants/theme';

interface SeverityScaleProps {
    value?: SeverityLevel;
    onChange: (severity: SeverityLevel) => void;
    label?: string;
}

const SEVERITY_OPTIONS: Array<{
    level: SeverityLevel;
    label: string;
    description: string;
    icon: keyof typeof Ionicons.glyphMap;
}> = [
        {
            level: 'none',
            label: 'None',
            description: 'Not experiencing this symptom',
            icon: 'checkmark-circle',
        },
        {
            level: 'mild',
            label: 'Mild',
            description: 'Noticeable but not interfering with daily activities',
            icon: 'ellipse',
        },
        {
            level: 'moderate',
            label: 'Moderate',
            description: 'Somewhat interfering with daily activities',
            icon: 'alert-circle',
        },
        {
            level: 'severe',
            label: 'Severe',
            description: 'Significantly interfering with daily activities',
            icon: 'warning',
        },
        {
            level: 'verySevere',
            label: 'Very Severe',
            description: 'Unable to perform daily activities',
            icon: 'close-circle',
        },
    ];

export const SeverityScale: React.FC<SeverityScaleProps> = ({
    value,
    onChange,
    label,
}) => {
    const theme = lightTheme;
    const [selectedSeverity, setSelectedSeverity] = useState<SeverityLevel | undefined>(value);

    const handleSelect = (severity: SeverityLevel) => {
        setSelectedSeverity(severity);
        onChange(severity);
    };

    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}

            <View style={styles.scaleContainer}>
                {SEVERITY_OPTIONS.map((option) => {
                    const isSelected = selectedSeverity === option.level;
                    const colors = getSeverityColors('light', option.level);

                    return (
                        <TouchableOpacity
                            key={option.level}
                            style={[
                                styles.scaleButton,
                                {
                                    borderColor: isSelected ? colors.border : theme.colors.border,
                                    backgroundColor: isSelected ? colors.background : theme.colors.surface,
                                },
                            ]}
                            onPress={() => handleSelect(option.level)}
                            activeOpacity={0.7}
                        >
                            <Ionicons
                                name={option.icon}
                                size={28}
                                color={isSelected ? colors.icon : theme.colors.textTertiary}
                            />
                            <Text
                                style={[
                                    styles.scaleLabel,
                                    {
                                        color: isSelected ? colors.text : theme.colors.textSecondary,
                                        fontWeight: isSelected ? '600' : '400',
                                    },
                                ]}
                            >
                                {option.label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>

            {selectedSeverity && (
                <View style={styles.descriptionContainer}>
                    <Text style={styles.descriptionText}>
                        {SEVERITY_OPTIONS.find((o) => o.level === selectedSeverity)?.description}
                    </Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 8,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: '#111827',
        marginBottom: 12,
    },
    scaleContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    scaleButton: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 4,
        borderRadius: 12,
        borderWidth: 2,
        gap: 6,
    },
    scaleLabel: {
        fontSize: 11,
        textAlign: 'center',
        lineHeight: 14,
    },
    descriptionContainer: {
        marginTop: 12,
        padding: 12,
        backgroundColor: '#F9FAFB',
        borderRadius: 8,
    },
    descriptionText: {
        fontSize: 12,
        color: '#6B7280',
        lineHeight: 18,
        textAlign: 'center',
    },
});

export default SeverityScale;
