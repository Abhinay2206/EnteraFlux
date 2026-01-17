/**
 * NextDoseCard Component
 * Displays next scheduled medication dose with countdown
 */

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { lightTheme } from '@/constants/theme';
import { differenceInDays, differenceInHours, format } from 'date-fns';

interface NextDoseCardProps {
    medicationName: string;
    dosage: string;
    scheduledDate: Date;
    onMarkAsTaken?: () => void;
    onMissedDose?: () => void;
}

export const NextDoseCard: React.FC<NextDoseCardProps> = ({
    medicationName,
    dosage,
    scheduledDate,
    onMarkAsTaken,
    onMissedDose,
}) => {
    const theme = lightTheme;
    const [timeUntil, setTimeUntil] = useState('');
    const [isOverdue, setIsOverdue] = useState(false);

    useEffect(() => {
        const updateCountdown = () => {
            const now = new Date();
            const days = differenceInDays(scheduledDate, now);
            const hours = differenceInHours(scheduledDate, now);

            if (hours < 0) {
                setIsOverdue(true);
                setTimeUntil('Overdue');
            } else if (days > 0) {
                setTimeUntil(`${days} day${days > 1 ? 's' : ''}`);
            } else if (hours > 0) {
                setTimeUntil(`${hours} hour${hours > 1 ? 's' : ''}`);
            } else {
                setTimeUntil('Due now');
            }
        };

        updateCountdown();
        const interval = setInterval(updateCountdown, 60000); // Update every minute

        return () => clearInterval(interval);
    }, [scheduledDate]);

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
            <View style={styles.header}>
                <View style={[styles.iconContainer, { backgroundColor: theme.colors.primary + '15' }]}>
                    <Ionicons name="medical" size={24} color={theme.colors.primary} />
                </View>
                <View style={styles.headerText}>
                    <Text style={styles.label}>Next Dose</Text>
                    <Text style={styles.medicationName}>{medicationName}</Text>
                    <Text style={styles.dosage}>{dosage}</Text>
                </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.scheduleInfo}>
                <View style={styles.scheduleRow}>
                    <Ionicons name="calendar-outline" size={18} color={theme.colors.textSecondary} />
                    <Text style={styles.scheduleText}>
                        {format(scheduledDate, 'EEEE, MMMM d')}
                    </Text>
                </View>
                <View style={styles.scheduleRow}>
                    <Ionicons name="time-outline" size={18} color={theme.colors.textSecondary} />
                    <Text style={styles.scheduleText}>
                        {format(scheduledDate, 'h:mm a')}
                    </Text>
                </View>
            </View>

            <View style={[styles.countdown, { backgroundColor: isOverdue ? theme.colors.errorBackground : theme.colors.successBackground }]}>
                <Ionicons
                    name={isOverdue ? "alert-circle" : "timer-outline"}
                    size={20}
                    color={isOverdue ? theme.colors.error : theme.colors.success}
                />
                <Text style={[styles.countdownText, { color: isOverdue ? theme.colors.error : theme.colors.success }]}>
                    {timeUntil}
                </Text>
            </View>

            <View style={styles.reminderBox}>
                <Ionicons name="information-circle-outline" size={16} color={theme.colors.info} />
                <Text style={styles.reminderText}>
                    Remove from refrigerator 30 minutes before injection
                </Text>
            </View>

            <View style={styles.actions}>
                {onMarkAsTaken && !isOverdue && (
                    <TouchableOpacity
                        style={[styles.primaryButton, { backgroundColor: theme.colors.primary }]}
                        onPress={onMarkAsTaken}
                        activeOpacity={0.8}
                    >
                        <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" />
                        <Text style={styles.primaryButtonText}>Mark as Taken</Text>
                    </TouchableOpacity>
                )}
                {isOverdue && onMissedDose && (
                    <TouchableOpacity
                        style={[styles.secondaryButton, { borderColor: theme.colors.error }]}
                        onPress={onMissedDose}
                        activeOpacity={0.8}
                    >
                        <Text style={[styles.secondaryButtonText, { color: theme.colors.error }]}>
                            Report Missed Dose
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
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
        alignItems: 'center',
        marginBottom: 16,
    },
    iconContainer: {
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    headerText: {
        flex: 1,
    },
    label: {
        fontSize: 12,
        color: '#6B7280',
        fontWeight: '500',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 4,
    },
    medicationName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 2,
    },
    dosage: {
        fontSize: 16,
        fontWeight: '500',
        color: '#4B5563',
    },
    divider: {
        height: 1,
        backgroundColor: '#E5E7EB',
        marginVertical: 16,
    },
    scheduleInfo: {
        gap: 8,
        marginBottom: 12,
    },
    scheduleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    scheduleText: {
        fontSize: 14,
        color: '#4B5563',
    },
    countdown: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 12,
        marginBottom: 12,
    },
    countdownText: {
        fontSize: 16,
        fontWeight: '600',
    },
    reminderBox: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 8,
        padding: 12,
        backgroundColor: '#EFF6FF',
        borderRadius: 8,
        marginBottom: 16,
    },
    reminderText: {
        flex: 1,
        fontSize: 12,
        lineHeight: 18,
        color: '#1E40AF',
    },
    actions: {
        gap: 12,
    },
    primaryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingVertical: 14,
        borderRadius: 12,
    },
    primaryButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    secondaryButton: {
        paddingVertical: 14,
        borderRadius: 12,
        borderWidth: 2,
        alignItems: 'center',
    },
    secondaryButtonText: {
        fontSize: 16,
        fontWeight: '600',
    },
});

export default NextDoseCard;
