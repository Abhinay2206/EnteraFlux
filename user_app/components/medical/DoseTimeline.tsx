/**
 * DoseTimeline Component
 * Vertical timeline showing medication dose history
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { lightTheme } from '@/constants/theme';
import { StatusBadge } from '../ui/StatusBadge';
import type { AdherenceState } from '@/constants/colors';
import { format } from 'date-fns';

interface DoseEntry {
    date: Date;
    dosage: string;
    status: AdherenceState;
    sideEffects?: string[];
    notes?: string;
}

interface DoseTimelineProps {
    doses: DoseEntry[];
    maxEntries?: number;
}

export const DoseTimeline: React.FC<DoseTimelineProps> = ({
    doses,
    maxEntries = 12,
}) => {
    const theme = lightTheme;

    const getStatusColor = (status: AdherenceState) => {
        const colors: Record<AdherenceState, string> = {
            adherent: theme.colors.success,
            delayed: theme.colors.advisory,
            atRisk: theme.colors.warning,
            missed: theme.colors.error,
        };
        return colors[status];
    };

    const getStatusIcon = (status: AdherenceState): keyof typeof Ionicons.glyphMap => {
        const icons: Record<AdherenceState, keyof typeof Ionicons.glyphMap> = {
            adherent: 'checkmark-circle',
            delayed: 'time',
            atRisk: 'warning',
            missed: 'close-circle',
        };
        return icons[status];
    };

    const displayDoses = doses.slice(0, maxEntries);

    return (
        <View style={styles.container}>
            {displayDoses.map((dose, index) => (
                <View key={index} style={styles.timelineItem}>
                    {/* Timeline Line */}
                    {index < displayDoses.length - 1 && (
                        <View
                            style={[
                                styles.timelineLine,
                                { backgroundColor: theme.colors.border }
                            ]}
                        />
                    )}

                    {/* Timeline Dot */}
                    <View style={styles.timelineDotContainer}>
                        <View
                            style={[
                                styles.timelineDot,
                                {
                                    borderColor: getStatusColor(dose.status),
                                    backgroundColor: dose.status === 'adherent'
                                        ? getStatusColor(dose.status)
                                        : theme.colors.surface
                                }
                            ]}
                        >
                            {dose.status === 'adherent' && (
                                <Ionicons
                                    name="checkmark"
                                    size={14}
                                    color="#FFFFFF"
                                />
                            )}
                        </View>
                    </View>

                    {/* Timeline Content */}
                    <View style={styles.timelineContent}>
                        <View style={styles.contentHeader}>
                            <View style={styles.headerLeft}>
                                <Text style={styles.dateText}>
                                    {format(dose.date, 'MMM d, yyyy')}
                                </Text>
                                <Text style={styles.timeText}>
                                    {format(dose.date, 'h:mm a')}
                                </Text>
                            </View>
                            <StatusBadge
                                type="adherence"
                                state={dose.status}
                                size="small"
                            />
                        </View>

                        <View style={styles.contentBody}>
                            <View style={styles.dosageRow}>
                                <Ionicons
                                    name="medical"
                                    size={16}
                                    color={theme.colors.textSecondary}
                                />
                                <Text style={styles.dosageText}>{dose.dosage}</Text>
                            </View>

                            {dose.sideEffects && dose.sideEffects.length > 0 && (
                                <View style={styles.sideEffectsContainer}>
                                    <Ionicons
                                        name="alert-circle-outline"
                                        size={16}
                                        color={theme.colors.warning}
                                    />
                                    <Text style={styles.sideEffectsText}>
                                        {dose.sideEffects.join(', ')}
                                    </Text>
                                </View>
                            )}

                            {dose.notes && (
                                <View style={styles.notesContainer}>
                                    <Text style={styles.notesText}>{dose.notes}</Text>
                                </View>
                            )}
                        </View>
                    </View>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 8,
    },
    timelineItem: {
        flexDirection: 'row',
        marginBottom: 24,
        position: 'relative',
    },
    timelineLine: {
        position: 'absolute',
        left: 15,
        top: 32,
        bottom: -24,
        width: 2,
    },
    timelineDotContainer: {
        width: 32,
        alignItems: 'center',
        paddingTop: 4,
    },
    timelineDot: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    timelineContent: {
        flex: 1,
        marginLeft: 12,
        backgroundColor: '#F9FAFB',
        borderRadius: 12,
        padding: 12,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    contentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    headerLeft: {
        flex: 1,
    },
    dateText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 2,
    },
    timeText: {
        fontSize: 12,
        color: '#6B7280',
    },
    contentBody: {
        gap: 8,
    },
    dosageRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    dosageText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#4B5563',
    },
    sideEffectsContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 6,
        paddingTop: 4,
    },
    sideEffectsText: {
        flex: 1,
        fontSize: 12,
        color: '#9A3412',
        lineHeight: 18,
    },
    notesContainer: {
        paddingTop: 4,
    },
    notesText: {
        fontSize: 12,
        color: '#6B7280',
        fontStyle: 'italic',
        lineHeight: 18,
    },
});

export default DoseTimeline;
