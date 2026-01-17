/**
 * SideEffectMonitorCard Component
 * Summary of active side effects requiring monitoring
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { lightTheme } from '@/constants/theme';
import { StatusBadge } from '../ui/StatusBadge';
import type { SeverityLevel } from '@/constants/colors';

interface SideEffect {
    name: string;
    severity: SeverityLevel;
    lastReported: Date;
}

interface SideEffectMonitorCardProps {
    activeSideEffects: SideEffect[];
    onLogSymptoms?: () => void;
    onViewHistory?: () => void;
}

export const SideEffectMonitorCard: React.FC<SideEffectMonitorCardProps> = ({
    activeSideEffects,
    onLogSymptoms,
    onViewHistory,
}) => {
    const theme = lightTheme;

    const hasSevereSideEffects = activeSideEffects.some(
        effect => effect.severity === 'severe' || effect.severity === 'verySevere'
    );

    const getTimeSinceReported = (date: Date): string => {
        const hours = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60));
        if (hours < 24) {
            return `${hours}h ago`;
        }
        const days = Math.floor(hours / 24);
        return `${days}d ago`;
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
            <View style={styles.header}>
                <View style={styles.titleRow}>
                    <Ionicons
                        name="pulse-outline"
                        size={22}
                        color={hasSevereSideEffects ? theme.colors.warning : theme.colors.textPrimary}
                    />
                    <Text style={styles.title}>Side Effect Monitoring</Text>
                </View>
                {hasSevereSideEffects && (
                    <View style={[styles.attentionBadge, { backgroundColor: theme.colors.warningBackground }]}>
                        <Ionicons name="warning" size={14} color={theme.colors.warning} />
                        <Text style={[styles.attentionText, { color: theme.colors.warningText }]}>
                            Needs Attention
                        </Text>
                    </View>
                )}
            </View>

            {activeSideEffects.length > 0 ? (
                <>
                    <View style={styles.effectsList}>
                        {activeSideEffects.slice(0, 3).map((effect, index) => (
                            <View key={index} style={styles.effectItem}>
                                <View style={styles.effectInfo}>
                                    <Text style={styles.effectName}>{effect.name}</Text>
                                    <Text style={styles.effectTime}>
                                        {getTimeSinceReported(effect.lastReported)}
                                    </Text>
                                </View>
                                <StatusBadge
                                    type="severity"
                                    severity={effect.severity}
                                    size="small"
                                />
                            </View>
                        ))}
                    </View>

                    {activeSideEffects.length > 3 && (
                        <TouchableOpacity
                            style={styles.viewMoreButton}
                            onPress={onViewHistory}
                            activeOpacity={0.7}
                        >
                            <Text style={[styles.viewMoreText, { color: theme.colors.primary }]}>
                                View all ({activeSideEffects.length})
                            </Text>
                            <Ionicons name="chevron-forward" size={16} color={theme.colors.primary} />
                        </TouchableOpacity>
                    )}

                    {hasSevereSideEffects && (
                        <View style={[styles.alert, { backgroundColor: theme.colors.errorBackground }]}>
                            <Ionicons name="alert-circle" size={18} color={theme.colors.error} />
                            <Text style={[styles.alertText, { color: theme.colors.errorText }]}>
                                Contact your healthcare provider if symptoms persist or worsen
                            </Text>
                        </View>
                    )}
                </>
            ) : (
                <View style={styles.emptyState}>
                    <Ionicons name="checkmark-circle-outline" size={48} color={theme.colors.success} />
                    <Text style={styles.emptyTitle}>No Active Side Effects</Text>
                    <Text style={styles.emptySubtitle}>
                        Continue monitoring and log any new symptoms
                    </Text>
                </View>
            )}

            {onLogSymptoms && (
                <TouchableOpacity
                    style={[styles.logButton, { borderColor: theme.colors.primary }]}
                    onPress={onLogSymptoms}
                    activeOpacity={0.8}
                >
                    <Ionicons name="add-circle-outline" size={20} color={theme.colors.primary} />
                    <Text style={[styles.logButtonText, { color: theme.colors.primary }]}>
                        Log Symptoms
                    </Text>
                </TouchableOpacity>
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
        marginBottom: 16,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#111827',
    },
    attentionBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        alignSelf: 'flex-start',
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 12,
    },
    attentionText: {
        fontSize: 12,
        fontWeight: '600',
    },
    effectsList: {
        gap: 12,
        marginBottom: 12,
    },
    effectItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    effectInfo: {
        flex: 1,
    },
    effectName: {
        fontSize: 14,
        fontWeight: '500',
        color: '#111827',
        marginBottom: 2,
    },
    effectTime: {
        fontSize: 12,
        color: '#9CA3AF',
    },
    viewMoreButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        paddingVertical: 8,
    },
    viewMoreText: {
        fontSize: 14,
        fontWeight: '500',
    },
    alert: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 8,
        padding: 12,
        borderRadius: 8,
        marginTop: 12,
    },
    alertText: {
        flex: 1,
        fontSize: 12,
        lineHeight: 18,
        fontWeight: '500',
    },
    emptyState: {
        alignItems: 'center',
        paddingVertical: 24,
    },
    emptyTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
        marginTop: 12,
        marginBottom: 4,
    },
    emptySubtitle: {
        fontSize: 14,
        color: '#6B7280',
        textAlign: 'center',
    },
    logButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingVertical: 12,
        borderRadius: 12,
        borderWidth: 2,
        marginTop: 12,
    },
    logButtonText: {
        fontSize: 16,
        fontWeight: '600',
    },
});

export default SideEffectMonitorCard;
