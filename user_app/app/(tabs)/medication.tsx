import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    Modal,
    TextInput,
    Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from '../../constants/theme';
import { api } from '../../utils/api';
import { useUserStore } from '../../store/userStore';
import { DoseTimeline } from '../../components/medical/DoseTimeline';
import { MedicalAlert } from '../../components/ui/MedicalAlert';
import { Button } from '../../components/ui/Button';
import type { AdherenceState } from '../../constants/colors';

export default function MedicationScreen() {
    const user = useUserStore((state) => state.user);
    const [medications, setMedications] = useState<any[]>([]);
    const [doseHistory, setDoseHistory] = useState<any[]>([]);
    const [showLogDoseModal, setShowLogDoseModal] = useState(false);
    const [sideEffectsNotes, setSideEffectsNotes] = useState('');

    useEffect(() => {
        loadMedications();
    }, []);

    const loadMedications = async () => {
        if (!user) return;
        try {
            const meds = await api.getUserMedications(user._id);
            setMedications(meds);
            // Load dose history would go here
        } catch (error) {
            console.error('Error loading medications:', error);
        }
    };

    const currentMedication = medications[0];

    // Mock dose history for demonstration
    const mockDoses = [
        {
            date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
            dosage: '0.5mg',
            status: 'adherent' as AdherenceState,
            sideEffects: ['Mild nausea'],
        },
        {
            date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
            dosage: '0.5mg',
            status: 'adherent' as AdherenceState,
        },
        {
            date: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
            dosage: '0.5mg',
            status: 'delayed' as AdherenceState,
            notes: 'Administered 2 hours late',
        },
        {
            date: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000),
            dosage: '0.25mg',
            status: 'adherent' as AdherenceState,
            sideEffects: ['Mild fatigue', 'Nausea'],
        },
    ];

    const handleLogDose = async () => {
        // Logic to log dose
        setShowLogDoseModal(false);
        Alert.alert('Success', 'Dose logged successfully');
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.headerContent}>
                        <Ionicons name="medical" size={32} color={theme.colors.primary} />
                        <View style={styles.headerText}>
                            <Text style={styles.headerTitle}>Medication Management</Text>
                            <Text style={styles.headerSubtitle}>Track your GLP-1 therapy</Text>
                        </View>
                    </View>
                </View>

                {/* Current Medication Section */}
                <View style={styles.section}>
                    <View style={styles.currentMedCard}>
                        <View style={styles.medCardHeader}>
                            <Text style={styles.sectionTitle}>Current Medication</Text>
                            <TouchableOpacity>
                                <Ionicons name="create-outline" size={20} color={theme.colors.primary} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.medDetails}>
                            <View style={styles.medIconContainer}>
                                <Ionicons name="medkit" size={40} color={theme.colors.primary} />
                            </View>
                            <View style={styles.medInfo}>
                                <Text style={styles.medName}>
                                    {currentMedication?.drug_name || 'Ozempic'}
                                </Text>
                                <Text style={styles.medDosage}>
                                    {currentMedication?.dosage || '0.5mg'}
                                </Text>
                                <Text style={styles.medFrequency}>Once weekly injection</Text>
                            </View>
                        </View>

                        <View style={styles.divider} />

                        <View style={styles.scheduleInfo}>
                            <View style={styles.scheduleRow}>
                                <Ionicons name="calendar-outline" size={18} color={theme.colors.textSecondary} />
                                <Text style={styles.scheduleText}>
                                    Every {currentMedication?.injection_day || 'Monday'}
                                </Text>
                            </View>
                            <View style={styles.scheduleRow}>
                                <Ionicons name="time-outline" size={18} color={theme.colors.textSecondary} />
                                <Text style={styles.scheduleText}>
                                    {currentMedication?.injection_time || '9:00 AM'}
                                </Text>
                            </View>
                        </View>

                        <Button
                            variant="primary"
                            size="large"
                            fullWidth
                            onPress={() => setShowLogDoseModal(true)}
                        >
                            Log Dose
                        </Button>
                    </View>
                </View>

                {/* Injection Site Rotation Reminder */}
                <View style={styles.section}>
                    <MedicalAlert
                        priority="info"
                        title="Injection Site Rotation"
                        message="Rotate injection sites between abdomen, thigh, and upper arm to reduce skin reactions"
                        recommendation="Log your injection site when recording each dose"
                    />
                </View>

                {/* Dose History */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Dose History</Text>
                        <TouchableOpacity>
                            <Text style={styles.viewAllText}>View All</Text>
                        </TouchableOpacity>
                    </View>
                    <DoseTimeline doses={mockDoses} maxEntries={8} />
                </View>

                {/* Prescription Info */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Prescription Information</Text>
                    <View style={styles.prescriptionCard}>
                        <View style={styles.prescriptionRow}>
                            <Text style={styles.prescriptionLabel}>Prescriber:</Text>
                            <Text style={styles.prescriptionValue}>Dr. Sarah Johnson</Text>
                        </View>
                        <View style={styles.prescriptionRow}>
                            <Text style={styles.prescriptionLabel}>Prescription Date:</Text>
                            <Text style={styles.prescriptionValue}>Dec 15, 2025</Text>
                        </View>
                        <View style={styles.prescriptionRow}>
                            <Text style={styles.prescriptionLabel}>Refill Due:</Text>
                            <Text style={[styles.prescriptionValue, { color: theme.colors.warning }]}>
                                Jan 28, 2026
                            </Text>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.refillButton}>
                        <Ionicons name="notifications-outline" size={20} color={theme.colors.primary} />
                        <Text style={styles.refillButtonText}>Set Refill Reminder</Text>
                    </TouchableOpacity>
                </View>

                {/* Quick Actions */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Quick Actions</Text>

                    <TouchableOpacity style={styles.actionCard}>
                        <Ionicons name="trending-up" size={24} color={theme.colors.info} />
                        <View style={styles.actionText}>
                            <Text style={styles.actionTitle}>Dosage History</Text>
                            <Text style={styles.actionSubtitle}>View titration schedule</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color={theme.colors.textTertiary} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionCard}>
                        <Ionicons name="location-outline" size={24} color={theme.colors.success} />
                        <View style={styles.actionText}>
                            <Text style={styles.actionTitle}>Injection Sites</Text>
                            <Text style={styles.actionSubtitle}>Track rotation pattern</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color={theme.colors.textTertiary} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionCard}>
                        <Ionicons name="document-text-outline" size={24} color={theme.colors.advisory} />
                        <View style={styles.actionText}>
                            <Text style={styles.actionTitle}>Storage Guide</Text>
                            <Text style={styles.actionSubtitle}>How to store your medication</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color={theme.colors.textTertiary} />
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Log Dose Modal */}
            <Modal
                visible={showLogDoseModal}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setShowLogDoseModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Log Dose</Text>
                            <TouchableOpacity onPress={() => setShowLogDoseModal(false)}>
                                <Ionicons name="close" size={24} color={theme.colors.textPrimary} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.modalBody}>
                            <Text style={styles.modalMedInfo}>
                                {currentMedication?.drug_name || 'Ozempic'} - {currentMedication?.dosage || '0.5mg'}
                            </Text>

                            <View style={styles.injectionSites}>
                                <Text style={styles.inputLabel}>Injection Site</Text>
                                <View style={styles.siteButtons}>
                                    {['Abdomen', 'Thigh', 'Upper Arm'].map((site) => (
                                        <TouchableOpacity key={site} style={styles.siteButton}>
                                            <Text style={styles.siteButtonText}>{site}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.inputLabel}>Side Effects or Notes (Optional)</Text>
                                <TextInput
                                    style={styles.textArea}
                                    value={sideEffectsNotes}
                                    onChangeText={setSideEffectsNotes}
                                    placeholder="Any side effects or observations?"
                                    placeholderTextColor={theme.colors.textTertiary}
                                    multiline
                                    numberOfLines={4}
                                    textAlignVertical="top"
                                />
                            </View>

                            <Button variant="primary" size="large" fullWidth onPress={handleLogDose}>
                                Confirm Dose
                            </Button>

                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={() => setShowLogDoseModal(false)}
                            >
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    scrollContent: {
        paddingBottom: theme.spacing.xl,
    },
    header: {
        backgroundColor: theme.colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
        padding: theme.spacing.lg,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    headerText: {
        flex: 1,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: theme.colors.textPrimary,
    },
    headerSubtitle: {
        fontSize: 14,
        color: theme.colors.textSecondary,
        marginTop: 2,
    },
    section: {
        padding: theme.spacing.lg,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.md,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: theme.colors.textPrimary,
        marginBottom: theme.spacing.sm,
    },
    viewAllText: {
        fontSize: 14,
        color: theme.colors.primary,
        fontWeight: '500',
    },
    currentMedCard: {
        backgroundColor: theme.colors.surface,
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    medCardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    medDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    medIconContainer: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: theme.colors.primary + '15',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    medInfo: {
        flex: 1,
    },
    medName: {
        fontSize: 18,
        fontWeight: '600',
        color: theme.colors.textPrimary,
        marginBottom: 4,
    },
    medDosage: {
        fontSize: 20,
        fontWeight: '700',
        color: theme.colors.primary,
        marginBottom: 2,
    },
    medFrequency: {
        fontSize: 14,
        color: theme.colors.textSecondary,
    },
    divider: {
        height: 1,
        backgroundColor: theme.colors.border,
        marginVertical: 16,
    },
    scheduleInfo: {
        gap: 8,
        marginBottom: 16,
    },
    scheduleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    scheduleText: {
        fontSize: 14,
        color: theme.colors.textSecondary,
    },
    prescriptionCard: {
        backgroundColor: theme.colors.backgroundSecondary,
        borderRadius: 12,
        padding: 16,
        gap: 12,
    },
    prescriptionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    prescriptionLabel: {
        fontSize: 14,
        color: theme.colors.textSecondary,
    },
    prescriptionValue: {
        fontSize: 14,
        fontWeight: '600',
        color: theme.colors.textPrimary,
    },
    refillButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingVertical: 12,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: theme.colors.primary,
        marginTop: 12,
    },
    refillButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: theme.colors.primary,
    },
    actionCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.surface,
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    actionText: {
        flex: 1,
        marginLeft: 12,
    },
    actionTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: theme.colors.textPrimary,
        marginBottom: 2,
    },
    actionSubtitle: {
        fontSize: 13,
        color: theme.colors.textSecondary,
    },
    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: theme.colors.surface,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: '80%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: theme.colors.textPrimary,
    },
    modalBody: {
        padding: 20,
    },
    modalMedInfo: {
        fontSize: 16,
        fontWeight: '600',
        color: theme.colors.primary,
        marginBottom: 20,
        textAlign: 'center',
    },
    injectionSites: {
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: theme.colors.textPrimary,
        marginBottom: 8,
    },
    siteButtons: {
        flexDirection: 'row',
        gap: 8,
    },
    siteButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: theme.colors.border,
        alignItems: 'center',
    },
    siteButtonText: {
        fontSize: 14,
        fontWeight: '500',
        color: theme.colors.textPrimary,
    },
    inputContainer: {
        marginBottom: 20,
    },
    textArea: {
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: 8,
        padding: 12,
        fontSize: 14,
        color: theme.colors.textPrimary,
        minHeight: 80,
    },
    cancelButton: {
        paddingVertical: 12,
        alignItems: 'center',
        marginTop: 12,
    },
    cancelButtonText: {
        fontSize: 16,
        color: theme.colors.textSecondary,
    },
});
