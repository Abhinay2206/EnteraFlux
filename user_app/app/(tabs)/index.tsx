/**
 * Dashboard / Home Screen
 * Main app screen showing risk score, biometric metrics, and guidance
 */

import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    RefreshControl,
    SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { lightTheme } from '../../constants/theme';
import { H2, Body, Caption } from '../../components/ui/Typography';
import { RiskScoreCard } from '../../components/cards/RiskScoreCard';
import { MetricCard } from '../../components/cards/MetricCard';
import { GuidanceCard } from '../../components/cards/GuidanceCard';
import { AlertBanner } from '../../components/ui/AlertBanner';

// Mock data - replace with real API calls
const MOCK_DATA = {
    riskScore: 2.8,
    hasAlert: false,
    metrics: {
        hrv: { value: '62', unit: 'ms', trend: 'up' as const, trendLabel: 'Improving' },
        sleep: { value: '7.2', unit: '/10', trend: 'stable' as const, trendLabel: 'Good' },
        restingHR: { value: '58', unit: 'bpm', trend: 'stable' as const, trendLabel: 'Normal' },
    },
    guidance: [
        {
            icon: 'time' as const,
            text: 'Pre-dose routine recommended',
            action: {
                label: 'View Routine',
                onPress: () => console.log('View routine'),
            },
        },
    ],
};

// Critical alert mock data
const CRITICAL_MOCK_DATA = {
    riskScore: 8.2,
    hasAlert: true,
    alert: {
        level: 'error' as const,
        title: 'High nausea risk detected',
        message: 'Predicted in next 4 hours based on your biometric patterns',
    },
    metrics: {
        hrv: { value: '35', unit: 'ms', trend: 'down' as const, trendLabel: 'Low' },
        sleep: { value: '4.1', unit: '/10', trend: 'down' as const, trendLabel: 'Poor' },
        restingHR: { value: '72', unit: 'bpm', trend: 'up' as const, trendLabel: 'Elevated' },
    },
    guidance: [
        {
            icon: 'shield-checkmark' as const,
            text: 'Anti-nausea strategies recommended',
            action: {
                label: 'View Now',
                onPress: () => console.log('View strategies'),
            },
        },
        {
            icon: 'barbell' as const,
            text: 'Postpone workout today',
        },
        {
            icon: 'water' as const,
            text: 'Increase hydration and electrolytes',
        },
    ],
};

export default function Dashboard() {
    const router = useRouter();
    const theme = lightTheme;

    // Toggle between normal and critical state for demo
    const [showCritical, setShowCritical] = useState(false);
    const data = showCritical ? CRITICAL_MOCK_DATA : MOCK_DATA;

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        // Simulate API call
        setTimeout(() => {
            setRefreshing(false);
            // Toggle state for demo
            setShowCritical(!showCritical);
        }, 1500);
    };

    const handleViewRiskDetails = () => {
        // router.push('/dashboard/risk-detail');
        console.log('Navigate to risk detail');
    };

    const handleViewMetric = (metric: string) => {
        // router.push(`/dashboard/${metric}-trends`);
        console.log(`Navigate to ${metric} trends`);
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor={theme.colors.primary}
                    />
                }
            >
                {/* Date Header */}
                <View style={styles.dateHeader}>
                    <Caption style={{ color: theme.colors.textSecondary }}>
                        {new Date().toLocaleDateString('en-US', {
                            weekday: 'long',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </Caption>
                    <H2>Today's Overview</H2>
                </View>

                {/* Critical Alert Banner (conditional) */}
                {data.hasAlert && (
                    <AlertBanner
                        level={data.alert.level}
                        title={data.alert.title}
                        message={data.alert.message}
                        action={{
                            label: 'View Details',
                            onPress: handleViewRiskDetails,
                        }}
                        onDismiss={() => setShowCritical(false)}
                    />
                )}

                {/* Risk Score Card */}
                <View style={styles.section}>
                    <RiskScoreCard score={data.riskScore} onPress={handleViewRiskDetails} />
                </View>

                {/* Metric Cards Grid */}
                <View style={styles.section}>
                    <H2 style={styles.sectionTitle}>Key Metrics</H2>
                    <View style={styles.metricsGrid}>
                        <MetricCard
                            icon="heart"
                            label="HRV"
                            value={data.metrics.hrv.value}
                            unit={data.metrics.hrv.unit}
                            trend={data.metrics.hrv.trend}
                            trendLabel={data.metrics.hrv.trendLabel}
                            onPress={() => handleViewMetric('hrv')}
                        />
                        <MetricCard
                            icon="moon"
                            label="Sleep Quality"
                            value={data.metrics.sleep.value}
                            unit={data.metrics.sleep.unit}
                            trend={data.metrics.sleep.trend}
                            trendLabel={data.metrics.sleep.trendLabel}
                            onPress={() => handleViewMetric('sleep')}
                        />
                        <MetricCard
                            icon="pulse"
                            label="Resting HR"
                            value={data.metrics.restingHR.value}
                            unit={data.metrics.restingHR.unit}
                            trend={data.metrics.restingHR.trend}
                            trendLabel={data.metrics.restingHR.trendLabel}
                            onPress={() => handleViewMetric('hr')}
                        />
                    </View>
                </View>

                {/* Guidance Section */}
                <View style={styles.section}>
                    <GuidanceCard title="Today's Guidance" items={data.guidance} />
                </View>

                {/* Quick Actions */}
                <View style={styles.section}>
                    <H2 style={styles.sectionTitle}>Quick Actions</H2>
                    <View style={styles.quickActionsGrid}>
                        <QuickActionButton
                            icon="medkit"
                            label="Log Dose"
                            onPress={() => console.log('Log dose')}
                        />
                        <QuickActionButton
                            icon="pulse"
                            label="Log Symptom"
                            onPress={() => console.log('Log symptom')}
                        />
                        <QuickActionButton
                            icon="water"
                            label="Log Hydration"
                            onPress={() => console.log('Log hydration')}
                        />
                        <QuickActionButton
                            icon="book"
                            label="Learn"
                            onPress={() => console.log('Learn')}
                        />
                    </View>
                </View>

                {/* Debug toggle */}
                <View style={styles.debugSection}>
                    <Caption style={{ textAlign: 'center', color: theme.colors.textTertiary }}>
                        Pull to refresh to toggle between normal and critical states (Demo)
                    </Caption>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

// Quick Action Button Component
interface QuickActionButtonProps {
    icon: any;
    label: string;
    onPress: () => void;
}

const QuickActionButton: React.FC<QuickActionButtonProps> = ({ icon, label, onPress }) => {
    const theme = lightTheme;
    const { Ionicons } = require('@expo/vector-icons');

    return (
        <View style={quickActionStyles.container}>
            <View
                style={[quickActionStyles.button, { backgroundColor: theme.colors.surfaceElevated }]}
            >
                <Ionicons name={icon} size={24} color={theme.colors.primary} />
            </View>
            <Caption style={{ marginTop: 6, textAlign: 'center' }}>{label}</Caption>
        </View>
    );
};

const quickActionStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    button: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 32,
    },
    dateHeader: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 12,
    },
    section: {
        marginBottom: 8,
    },
    sectionTitle: {
        paddingHorizontal: 16,
        marginBottom: 12,
    },
    metricsGrid: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        gap: 12,
    },
    quickActionsGrid: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        gap: 16,
    },
    debugSection: {
        marginTop: 24,
        paddingHorizontal: 16,
    },
});
