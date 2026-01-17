/**
 * AdherenceCard Component
 * Displays weekly medication adherence tracking
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { lightTheme } from '@/constants/theme';
import { ProgressBar } from '../ui/ProgressBar';
import { StatusBadge } from '../ui/StatusBadge';
import type { AdherenceState } from '@/constants/colors';

interface DoseRecord {
    date: Date;
    status: AdherenceState;
}

interface AdherenceCardProps {
    weeklyRecords: DoseRecord[];
    adherencePercentage: number;
    currentStreak?: number;
}

export const AdherenceCard: React.FC<AdherenceCardProps> = ({
    weeklyRecords,
    adherencePercentage,
    currentStreak = 0,
}) => {
    const theme = lightTheme;

    const getStatusIcon = (status: AdherenceState) => {
        const icons: Record<AdherenceState, keyof typeof Ionicons.glyphMap> = {
            adherent: 'checkmark-circle',
            delayed: 'time',
            atRisk: 'warning',
            missed: 'close-circle',
        };
        return icons[status];
    };

    const getStatusColor = (status: AdherenceState) => {
        const colors: Record<AdherenceState, string> = {
            adherent: theme.colors.success,
            delayed: theme.colors.advisory,
            atRisk: theme.colors.warning,
            missed: theme.colors.error,
        };
        return colors[status];
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
            <View style={styles.header}>
                <Text style={styles.title}>Adherence</Text>
                {currentStreak > 0 && (
                    <View style={styles.streakBadge}>
                        <Ionicons name="flame" size={16} color="#F97316" />
                        <Text style={styles.streakText}>{currentStreak} week streak</Text>
                    </View>
                )}
            </View>

            <ProgressBar
                percentage={adherencePercentage}
                showLabel={true}
                label="Last 4 weeks"
            />

            <View style={styles.recordsContainer}>
                <Text style={styles.recordsLabel}>Recent doses</Text>
                <View style={styles.recordsList}>
                    {weeklyRecords.slice(0, 4).map((record, index) => (
                        <View key={index} style={styles.recordItem}>
                            <Ionicons
                                name={getStatusIcon(record.status)}
                                size={24}
                                color={getStatusColor(record.status)}
                            />
                            <Text style={styles.recordDate}>
                                {record.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </Text>
                            <StatusBadge
                                type="adherence"
                                state={record.status}
                                size="small"
                            />
                        </View>
                    ))}
                </View>
            </View>

            {adherencePercentage < 90 && (
                <View style={[styles.guidance, { backgroundColor: theme.colors.advisoryBackground }]}>
                    <Ionicons name="bulb-outline" size={18} color={theme.colors.advisory} />
                    <Text style={[styles.guidanceText, { color: theme.colors.advisoryText }]}>
                        Set reminders to improve adherence and maximize treatment effectiveness
                    </Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#111827',
    },
    streakBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: '#FFF7ED',
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 12,
    },
    streakText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#9A3412',
    },
    recordsContainer: {
        marginTop: 20,
    },
    recordsLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: '#6B7280',
        marginBottom: 12,
    },
    recordsList: {
        gap: 10,
    },
    recordItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 8,
    },
    recordDate: {
        flex: 1,
        fontSize: 14,
        color: '#4B5563',
    },
    guidance: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 8,
        padding: 12,
        borderRadius: 8,
        marginTop: 16,
    },
    guidanceText: {
        flex: 1,
        fontSize: 12,
        lineHeight: 18,
    },
});

export default AdherenceCard;
