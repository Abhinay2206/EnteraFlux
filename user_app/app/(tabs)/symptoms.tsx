/**
 * Symptoms Logging Screen
 * Quick symptom logging with grid interface
 */

import React from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { lightTheme } from '@/constants/theme';
import { H2, H3, Body, Caption } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const CARD_SIZE = (width - 48) / 2; // 2 columns with padding

export default function SymptomsScreen() {
    const theme = lightTheme;

    const handleSymptomTap = (symptom: string) => {
        console.log(`Log ${symptom}`);
        // TODO: Open severity slider modal
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Header */}
                <View style={styles.header}>
                    <H2>Quick Log</H2>
                    <Body style={{ color: theme.colors.textSecondary, marginTop: 4 }}>
                        Tap to log a symptom
                    </Body>
                </View>

                {/* Symptom Grid */}
                <View style={styles.symptomGrid}>
                    <SymptomCard
                        icon="water"
                        label="Nausea"
                        color="#D1FAE5"
                        iconColor="#059669"
                        onPress={() => handleSymptomTap('nausea')}
                    />
                    <SymptomCard
                        icon="battery-dead"
                        label="Fatigue"
                        color="#DBEAFE"
                        iconColor="#2563EB"
                        onPress={() => handleSymptomTap('fatigue')}
                    />
                    <SymptomCard
                        icon="flash"
                        label="Pain"
                        color="#FFEDD5"
                        iconColor="#EA580C"
                        onPress={() => handleSymptomTap('pain')}
                    />
                    <SymptomCard
                        icon="restaurant"
                        label="GI Issues"
                        color="#E9D5FF"
                        iconColor="#9333EA"
                        onPress={() => handleSymptomTap('gi')}
                    />
                    <SymptomCard
                        icon="fast-food"
                        label="Appetite"
                        color="#FEF9C3"
                        iconColor="#CA8A04"
                        onPress={() => handleSymptomTap('appetite')}
                    />
                    <SymptomCard
                        icon="happy"
                        label="Mood"
                        color="#FECACA"
                        iconColor="#DC2626"
                        onPress={() => handleSymptomTap('mood')}
                    />
                </View>

                {/* Detailed Log Button */}
                <View style={styles.detailedLogSection}>
                    <TouchableOpacity
                        style={[styles.detailedLogButton, { borderColor: theme.colors.border }]}
                        onPress={() => console.log('Detailed log')}
                    >
                        <Ionicons name="list" size={20} color={theme.colors.primary} />
                        <Body style={{ color: theme.colors.primary, marginLeft: 8 }}>
                            Detailed Log →
                        </Body>
                    </TouchableOpacity>
                </View>

                {/* Recent History */}
                <View style={styles.section}>
                    <H3 style={styles.sectionTitle}>Recent History</H3>
                    <Card>
                        <HistoryItem
                            icon="water"
                            symptom="Nausea"
                            severity="3/5"
                            time="2 hours ago"
                            color="#059669"
                        />
                        <HistoryItem
                            icon="battery-dead"
                            symptom="Fatigue"
                            severity="4/5"
                            time="11:00 AM"
                            color="#2563EB"
                        />
                        <HistoryItem
                            icon="flash"
                            symptom="Pain"
                            severity="2/5"
                            time="Yesterday"
                            color="#EA580C"
                        />
                    </Card>
                </View>

                {/* Quick Actions */}
                <View style={styles.section}>
                    <QuickActionLink
                        icon="calendar"
                        title="Symptom Heatmap"
                        subtitle="View patterns over time"
                        onPress={() => console.log('Heatmap')}
                    />
                    <QuickActionLink
                        icon="stats-chart"
                        title="Correlations"
                        subtitle="See symptom relationships"
                        onPress={() => console.log('Correlations')}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

// Symptom Card Component
interface SymptomCardProps {
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    color: string;
    iconColor: string;
    onPress: () => void;
}

const SymptomCard: React.FC<SymptomCardProps> = ({ icon, label, color, iconColor, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
            <View style={[styles.symptomCard, { backgroundColor: color, width: CARD_SIZE }]}>
                <Ionicons name={icon} size={40} color={iconColor} />
                <H3 style={{ marginTop: 12, fontSize: 16 }}>{label}</H3>
            </View>
        </TouchableOpacity>
    );
};

// History Item Component
interface HistoryItemProps {
    icon: keyof typeof Ionicons.glyphMap;
    symptom: string;
    severity: string;
    time: string;
    color: string;
}

const HistoryItem: React.FC<HistoryItemProps> = ({ icon, symptom, severity, time, color }) => {
    const theme = lightTheme;

    return (
        <View style={styles.historyItem}>
            <View style={[styles.historyIcon, { backgroundColor: color + '20' }]}>
                <Ionicons name={icon} size={20} color={color} />
            </View>
            <View style={styles.historyText}>
                <H3 style={{ fontSize: 16 }}>{symptom}</H3>
                <Caption>{time}</Caption>
            </View>
            <Body style={{ color: theme.colors.textSecondary }}>{severity}</Body>
        </View>
    );
};

// Quick Action Link
interface QuickActionLinkProps {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    subtitle: string;
    onPress: () => void;
}

const QuickActionLink: React.FC<QuickActionLinkProps> = ({ icon, title, subtitle, onPress }) => {
    const theme = lightTheme;

    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
            <Card style={styles.quickActionLink}>
                <Ionicons name={icon} size={24} color={theme.colors.primary} />
                <View style={styles.quickActionText}>
                    <H3 style={{ fontSize: 16 }}>{title}</H3>
                    <Body style={{ color: theme.colors.textSecondary, fontSize: 14 }}>{subtitle}</Body>
                </View>
                <Ionicons name="chevron-forward" size={20} color={theme.colors.textTertiary} />
            </Card>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 32,
    },
    header: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 20,
    },
    symptomGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 16,
        gap: 12,
    },
    symptomCard: {
        height: 120,
        borderRadius: 16,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    detailedLogSection: {
        paddingHorizontal: 16,
        marginTop: 24,
        marginBottom: 24,
    },
    detailedLogButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderWidth: 2,
        borderRadius: 12,
        borderStyle: 'dashed',
    },
    section: {
        marginBottom: 16,
    },
    sectionTitle: {
        paddingHorizontal: 16,
        marginBottom: 12,
    },
    historyItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    historyIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    historyText: {
        flex: 1,
    },
    quickActionLink: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 16,
        marginBottom: 12,
        padding: 16,
    },
    quickActionText: {
        flex: 1,
        marginLeft: 16,
    },
});
