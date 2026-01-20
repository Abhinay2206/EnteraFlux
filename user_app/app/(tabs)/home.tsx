import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    RefreshControl,
    SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import theme from '../../constants/theme';
import { api } from '../../utils/api';
import { useUserStore } from '../../store/userStore';
import { MedicalAlert } from '../../components/ui/MedicalAlert';
import { NextDoseCard } from '../../components/cards/NextDoseCard';
import { AdherenceCard } from '../../components/cards/AdherenceCard';
import { SideEffectMonitorCard } from '../../components/cards/SideEffectMonitorCard';
import { RiskScoreCard } from '../../components/cards/RiskScoreCard';
import { MetricCard } from '../../components/cards/MetricCard';
import type { AlertPriority } from '../../constants/colors';

export default function Home() {
    const router = useRouter();
    const user = useUserStore((state) => state.user);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [dashboardData, setDashboardData] = useState<any>(null);
    const [alerts, setAlerts] = useState<any[]>([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        if (!user) return;

        try {
            const [dashboard, alertsData] = await Promise.all([
                api.getDashboard(user._id),
                api.getUserAlerts(user._id),
            ]);
            setDashboardData(dashboard);
            setAlerts(alertsData);
        } catch (error) {
            console.error('Error loading dashboard:', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        loadData();
    };

    const acknowledgeAlert = async (alertId: string) => {
        try {
            await api.acknowledgeAlert(alertId);
            setAlerts(alerts.filter((a) => a._id !== alertId));
        } catch (error) {
            console.error('Error acknowledging alert:', error);
        }
    };

    const mapSeverityToPriority = (severity: string): AlertPriority => {
        const map: Record<string, AlertPriority> = {
            'Low': 'info',
            'Medium': 'advisory',
            'High': 'warning',
            'Critical': 'critical',
        };
        return map[severity] || 'info';
    };

    // Data preparation
    const nextDose = {
        medicationName: dashboardData?.active_medications?.[0]?.drug_name || 'Ozempic',
        dosage: dashboardData?.active_medications?.[0]?.dosage || '0.5mg',
        scheduledDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    };

    const adherenceData = {
        weeklyRecords: [
            { date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), status: 'adherent' as const },
            { date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), status: 'adherent' as const },
            { date: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000), status: 'delayed' as const },
            { date: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000), status: 'adherent' as const },
        ],
        adherencePercentage: 92,
        currentStreak: 3,
    };

    const sideEffects = [
        {
            name: 'Mild Nausea',
            severity: 'mild' as const,
            lastReported: new Date(Date.now() - 2 * 60 * 60 * 1000),
        },
        {
            name: 'Fatigue',
            severity: 'mild' as const,
            lastReported: new Date(Date.now() - 5 * 60 * 60 * 1000),
        },
    ];

    const riskScore = 2.8;
    const metrics = {
        hrv: { value: '62', unit: 'ms', trend: 'up' as const, trendLabel: 'Improving' },
        sleep: { value: '7.2', unit: '/10', trend: 'stable' as const, trendLabel: 'Good' },
        restingHR: { value: '58', unit: 'bpm', trend: 'stable' as const, trendLabel: 'Normal' },
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.loadingContainer}>
                    <Text style={styles.loadingText}>Loading...</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.dateText}>
                            {new Date().toLocaleDateString('en-US', {
                                weekday: 'long',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </Text>
                        <Text style={styles.welcomeText}>Welcome back, {user?.name}</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.notificationButton}
                        onPress={() => router.push('/(tabs)/profile')}
                    >
                        <Ionicons name="notifications-outline" size={24} color={theme.colors.textPrimary} />
                        {alerts.length > 0 && (
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>{alerts.length}</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>

                {/* Critical Alerts Section */}
                {alerts.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Safety Alerts</Text>
                        {alerts.map((alert) => (
                            <MedicalAlert
                                key={alert._id}
                                priority={mapSeverityToPriority(alert.severity)}
                                title={alert.alert_type}
                                message={alert.message}
                                recommendation={alert.recommendation}
                                onDismiss={() => acknowledgeAlert(alert._id)}
                                dismissible={true}
                            />
                        ))}
                    </View>
                )}

                {/* Real-Time Monitoring Overview */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Real-Time Monitoring</Text>
                    <RiskScoreCard score={riskScore} onPress={() => console.log('View risk details')} />

                    <View style={styles.metricsGrid}>
                        <MetricCard
                            icon="heart"
                            label="HRV"
                            value={metrics.hrv.value}
                            unit={metrics.hrv.unit}
                            trend={metrics.hrv.trend}
                            trendLabel={metrics.hrv.trendLabel}
                            onPress={() => console.log('View HRV trends')}
                        />
                        <MetricCard
                            icon="moon"
                            label="Sleep"
                            value={metrics.sleep.value}
                            unit={metrics.sleep.unit}
                            trend={metrics.sleep.trend}
                            trendLabel={metrics.sleep.trendLabel}
                            onPress={() => console.log('View sleep trends')}
                        />
                        <MetricCard
                            icon="pulse"
                            label="Resting HR"
                            value={metrics.restingHR.value}
                            unit={metrics.restingHR.unit}
                            trend={metrics.restingHR.trend}
                            trendLabel={metrics.restingHR.trendLabel}
                            onPress={() => console.log('View HR trends')}
                        />
                    </View>
                </View>

                {/* Medication Status */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Medication</Text>
                    <NextDoseCard
                        medicationName={nextDose.medicationName}
                        dosage={nextDose.dosage}
                        scheduledDate={nextDose.scheduledDate}
                        onMarkAsTaken={() => router.push('/(tabs)/medication')}
                        onMissedDose={() => router.push('/(tabs)/medication')}
                    />
                    <View style={{ marginTop: 12 }}>
                        <AdherenceCard
                            weeklyRecords={adherenceData.weeklyRecords}
                            adherencePercentage={adherenceData.adherencePercentage}
                            currentStreak={adherenceData.currentStreak}
                        />
                    </View>
                </View>

                {/* Side Effect Monitoring */}
                <View style={styles.section}>
                    <SideEffectMonitorCard
                        activeSideEffects={sideEffects}
                        onLogSymptoms={() => router.push('/(tabs)/track')}
                        onViewHistory={() => router.push('/(tabs)/symptoms')}
                    />
                </View>

                {/* Quick Actions */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Quick Actions</Text>
                    <View style={styles.quickActionsGrid}>
                        <TouchableOpacity
                            style={styles.actionCard}
                            onPress={() => router.push('/(tabs)/track')}
                            activeOpacity={0.7}
                        >
                            <View style={[styles.actionIcon, { backgroundColor: theme.colors.primary + '15' }]}>
                                <Ionicons name="pulse" size={24} color={theme.colors.primary} />
                            </View>
                            <Text style={styles.actionLabel}>Log Symptoms</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.actionCard}
                            onPress={() => router.push('/(tabs)/medication')}
                            activeOpacity={0.7}
                        >
                            <View style={[styles.actionIcon, { backgroundColor: theme.colors.info + '15' }]}>
                                <Ionicons name="calendar" size={24} color={theme.colors.info} />
                            </View>
                            <Text style={styles.actionLabel}>View Schedule</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.actionCard}
                            onPress={() => router.push('/(tabs)/education')}
                            activeOpacity={0.7}
                        >
                            <View style={[styles.actionIcon, { backgroundColor: theme.colors.success + '15' }]}>
                                <Ionicons name="book" size={24} color={theme.colors.success} />
                            </View>
                            <Text style={styles.actionLabel}>Education</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.actionCard}
                            onPress={() => router.push('/(tabs)/profile')}
                            activeOpacity={0.7}
                        >
                            <View style={[styles.actionIcon, { backgroundColor: theme.colors.advisory + '15' }]}>
                                <Ionicons name="call" size={24} color={theme.colors.advisory} />
                            </View>
                            <Text style={styles.actionLabel}>Emergency</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Medical Disclaimer */}
                <View style={styles.disclaimerContainer}>
                    <Ionicons name="information-circle-outline" size={16} color={theme.colors.textTertiary} />
                    <Text style={styles.disclaimer}>
                        This app provides educational information and tracking tools. It does not replace
                        professional medical advice. Always consult your healthcare provider about your treatment.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: theme.fontSize.md,
        color: theme.colors.textSecondary,
    },
    scrollContent: {
        paddingBottom: theme.spacing.xl,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: theme.spacing.lg,
        backgroundColor: theme.colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    dateText: {
        fontSize: 12,
        color: theme.colors.textSecondary,
        marginBottom: 4,
    },
    welcomeText: {
        fontSize: 20,
        fontWeight: '700',
        color: theme.colors.textPrimary,
    },
    notificationButton: {
        position: 'relative',
        padding: 8,
    },
    badge: {
        position: 'absolute',
        top: 6,
        right: 6,
        backgroundColor: theme.colors.error,
        borderRadius: 10,
        minWidth: 18,
        height: 18,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 4,
    },
    badgeText: {
        color: '#FFFFFF',
        fontSize: 11,
        fontWeight: '700',
    },
    section: {
        paddingHorizontal: theme.spacing.lg,
        marginTop: theme.spacing.lg,
    },
    sectionTitle: {
        fontSize: theme.fontSize.lg,
        fontWeight: '700',
        color: theme.colors.textPrimary,
        marginBottom: theme.spacing.md,
    },
    metricsGrid: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 12,
    },
    quickActionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    actionCard: {
        flex: 1,
        minWidth: '45%',
        backgroundColor: theme.colors.surface,
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    actionIcon: {
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    actionLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: theme.colors.textPrimary,
        textAlign: 'center',
    },
    disclaimerContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 8,
        padding: theme.spacing.lg,
        marginTop: theme.spacing.lg,
    },
    disclaimer: {
        flex: 1,
        fontSize: 11,
        lineHeight: 16,
        color: theme.colors.textTertiary,
    },
});
