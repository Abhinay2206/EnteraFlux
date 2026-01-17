/**
 * Guidance Card Component
 * Displays personalized guidance and recommendations
 */

import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from '../ui/Card';
import { H4, Body } from '../ui/Typography';
import { lightTheme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

interface GuidanceItem {
    icon: keyof typeof Ionicons.glyphMap;
    text: string;
    action?: {
        label: string;
        onPress: () => void;
    };
}

interface GuidanceCardProps {
    title?: string;
    items: GuidanceItem[];
}

export const GuidanceCard: React.FC<GuidanceCardProps> = ({
    title = 'Guidance',
    items,
}) => {
    const theme = lightTheme;

    return (
        <Card variant="info" elevated style={styles.card}>
            <View style={styles.header}>
                <Ionicons name="bulb" size={20} color={theme.colors.primary} />
                <H4 style={[styles.title, { color: theme.colors.primary }]}>{title}</H4>
            </View>

            <View style={styles.itemsContainer}>
                {items.map((item, index) => (
                    <View key={index} style={styles.item}>
                        <View style={styles.itemContent}>
                            <Ionicons
                                name={item.icon}
                                size={16}
                                color={theme.colors.textPrimary}
                                style={styles.itemIcon}
                            />
                            <Body style={styles.itemText}>{item.text}</Body>
                        </View>
                        {item.action && (
                            <TouchableOpacity
                                onPress={item.action.onPress}
                                style={styles.actionLink}
                                accessibilityRole="button"
                                accessibilityLabel={item.action.label}
                            >
                                <Body style={{ color: theme.colors.primary, fontSize: 14 }}>
                                    {item.action.label} →
                                </Body>
                            </TouchableOpacity>
                        )}
                    </View>
                ))}
            </View>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        marginHorizontal: 16,
        marginBottom: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    title: {
        marginLeft: 8,
        fontSize: 16,
    },
    itemsContainer: {
        gap: 12,
    },
    item: {
        gap: 8,
    },
    itemContent: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    itemIcon: {
        marginTop: 2,
        marginRight: 8,
    },
    itemText: {
        flex: 1,
        fontSize: 14,
    },
    actionLink: {
        alignSelf: 'flex-start',
        marginLeft: 24,
    },
});

export default GuidanceCard;
