import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from '../../constants/theme';
import { api } from '../../utils/api';
import { useUserStore } from '../../store/userStore';
import { SeverityScale } from '../../components/medical/SeverityScale';
import { MedicalAlert } from '../../components/ui/MedicalAlert';
import type { SeverityLevel } from '../../constants/colors';

// GLP-1 Specific Symptoms
const GI_SYMPTOMS = [
  { id: 'nausea', label: 'Nausea', icon: 'sad-outline' },
  { id: 'vomiting', label: 'Vomiting', icon: 'warning-outline' },
  { id: 'diarrhea', label: 'Diarrhea', icon: 'alert-circle-outline' },
  { id: 'constipation', label: 'Constipation', icon: 'remove-circle-outline' },
  { id: 'abdominal_pain', label: 'Abdominal Pain', icon: 'medical-outline' },
  { id: 'bloating', label: 'Bloating', icon: 'ellipse-outline' },
];

const OTHER_SYMPTOMS = [
  { id: 'fatigue', label: 'Fatigue', icon: 'battery-dead-outline' },
  { id: 'headache', label: 'Headache', icon: 'pulse-outline' },
  { id: 'dizziness', label: 'Dizziness', icon: 'sync-outline' },
  { id: 'injection_site', label: 'Injection Site Reaction', icon: 'bandage-outline' },
  { id: 'loss_appetite', label: 'Loss of Appetite', icon: 'restaurant-outline' },
];

type SymptomCategory = 'gi' | 'other' | 'hypoglycemia' | 'injection';

export default function Track() {
  const user = useUserStore((state) => state.user);
  const [selectedCategory, setSelectedCategory] = useState<SymptomCategory | null>(null);
  const [selectedSymptom, setSelectedSymptom] = useState('');
  const [severity, setSeverity] = useState<SeverityLevel>('none');
  const [notes, setNotes] = useState('');
  const [glucoseLevel, setGlucoseLevel] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!user) return;

    if (!selectedSymptom && selectedCategory !== 'hypoglycemia') {
      Alert.alert('Error', 'Please select a symptom');
      return;
    }

    if (severity === 'none' && selectedCategory !== 'hypoglycemia') {
      Alert.alert('Error', 'Please select a severity level');
      return;
    }

    setLoading(true);
    try {
      await api.createSymptom({
        user_id: user._id,
        symptom_type: selectedSymptom || 'Hypoglycemia',
        severity: severity === 'none' ? 1 : severity === 'mild' ? 3 : severity === 'moderate' ? 5 : severity === 'severe' ? 8 : 10,
        notes: notes || null,
      });

      Alert.alert('Success', 'Symptom logged successfully');
      resetForm();
      setSelectedCategory(null);
    } catch (error) {
      console.error('Error logging symptom:', error);
      Alert.alert('Error', 'Failed to log symptom. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSelectedSymptom('');
    setSeverity('none');
    setNotes('');
    setGlucoseLevel('');
  };

  const renderCategorySelection = () => (
    <>
      <MedicalAlert
        priority="info"
        title="Symptom Monitoring"
        message="Track side effects to help your healthcare provider optimize your treatment. Report severe or persistent symptoms immediately."
      />

      <Text style={styles.sectionTitle}>Select Symptom Category</Text>

      <TouchableOpacity
        style={styles.categoryCard}
        onPress={() => setSelectedCategory('gi')}
        activeOpacity={0.7}
      >
        <View style={[styles.categoryIcon, { backgroundColor: theme.colors.warning + '15' }]}>
          <Ionicons name="medical" size={32} color={theme.colors.warning} />
        </View>
        <View style={styles.categoryText}>
          <Text style={styles.categoryTitle}>GI Symptoms</Text>
          <Text style={styles.categorySubtitle}>
            Nausea, vomiting, diarrhea, constipation, abdominal pain
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color={theme.colors.textTertiary} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.categoryCard}
        onPress={() => setSelectedCategory('other')}
        activeOpacity={0.7}
      >
        <View style={[styles.categoryIcon, { backgroundColor: theme.colors.info + '15' }]}>
          <Ionicons name="pulse" size={32} color={theme.colors.info} />
        </View>
        <View style={styles.categoryText}>
          <Text style={styles.categoryTitle}>Other Symptoms</Text>
          <Text style={styles.categorySubtitle}>
            Fatigue, headache, dizziness, injection site reactions
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color={theme.colors.textTertiary} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.categoryCard}
        onPress={() => setSelectedCategory('hypoglycemia')}
        activeOpacity={0.7}
      >
        <View style={[styles.categoryIcon, { backgroundColor: theme.colors.error + '15' }]}>
          <Ionicons name="alert-circle" size={32} color={theme.colors.error} />
        </View>
        <View style={styles.categoryText}>
          <Text style={styles.categoryTitle}>Hypoglycemia</Text>
          <Text style={styles.categorySubtitle}>
            Low blood sugar symptoms
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color={theme.colors.textTertiary} />
      </TouchableOpacity>

      <View style={styles.emergencyBox}>
        <Ionicons name="warning" size={24} color={theme.colors.error} />
        <View style={styles.emergencyText}>
          <Text style={styles.emergencyTitle}>When to Seek Emergency Care</Text>
          <Text style={styles.emergencyDescription}>
            Severe abdominal pain, persistent vomiting, vision changes, severe allergic reactions, or signs of pancreatitis
          </Text>
        </View>
      </View>
    </>
  );

  const renderSymptomForm = () => {
    const symptoms = selectedCategory === 'gi' ? GI_SYMPTOMS : OTHER_SYMPTOMS;

    return (
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>
          {selectedCategory === 'gi' ? 'GI Symptoms' :
            selectedCategory === 'hypoglycemia' ? 'Hypoglycemia' : 'Other Symptoms'}
        </Text>

        {selectedCategory !== 'hypoglycemia' && (
          <>
            <Text style={styles.label}>Select Symptom</Text>
            <View style={styles.symptomGrid}>
              {symptoms.map((symptom) => (
                <TouchableOpacity
                  key={symptom.id}
                  style={[
                    styles.symptomButton,
                    selectedSymptom === symptom.label && styles.symptomButtonActive,
                  ]}
                  onPress={() => setSelectedSymptom(symptom.label)}
                >
                  <Ionicons
                    name={symptom.icon as any}
                    size={24}
                    color={
                      selectedSymptom === symptom.label
                        ? theme.colors.primary
                        : theme.colors.textSecondary
                    }
                  />
                  <Text
                    style={[
                      styles.symptomButtonText,
                      selectedSymptom === symptom.label && styles.symptomButtonTextActive,
                    ]}
                  >
                    {symptom.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {selectedSymptom && (
              <SeverityScale
                value={severity}
                onChange={setSeverity}
                label="How severe is this symptom?"
              />
            )}
          </>
        )}

        {selectedCategory === 'hypoglycemia' && (
          <>
            <MedicalAlert
              priority="warning"
              title="Low Blood Sugar"
              message="If you experience severe symptoms (confusion, seizures, loss of consciousness), seek immediate medical attention."
            />

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Blood Glucose Level (Optional)</Text>
              <TextInput
                style={styles.input}
                value={glucoseLevel}
                onChangeText={setGlucoseLevel}
                placeholder="mg/dL"
                keyboardType="numeric"
                placeholderTextColor={theme.colors.textTertiary}
              />
            </View>

            <View style={styles.hypoglycemiaSymptoms}>
              <Text style={styles.checklistTitle}>Common symptoms:</Text>
              <View style={styles.checklistItem}>
                <Ionicons name="ellipse" size={6} color={theme.colors.textSecondary} />
                <Text style={styles.checklistText}>Shakiness, sweating</Text>
              </View>
              <View style={styles.checklistItem}>
                <Ionicons name="ellipse" size={6} color={theme.colors.textSecondary} />
                <Text style={styles.checklistText}>Rapid heartbeat</Text>
              </View>
              <View style={styles.checklistItem}>
                <Ionicons name="ellipse" size={6} color={theme.colors.textSecondary} />
                <Text style={styles.checklistText}>Irritability, confusion</Text>
              </View>
              <View style={styles.checklistItem}>
                <Ionicons name="ellipse" size={6} color={theme.colors.textSecondary} />
                <Text style={styles.checklistText}>Dizziness, lightheadedness</Text>
              </View>
            </View>
          </>
        )}

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Additional Notes (Optional)</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={notes}
            onChangeText={setNotes}
            placeholder="When did it start? Any triggers? Duration?"
            multiline
            numberOfLines={4}
            placeholderTextColor={theme.colors.textTertiary}
            textAlignVertical="top"
          />
        </View>

        {(severity === 'severe' || severity === 'verySevere') && selectedCategory !== 'hypoglycemia' && (
          <MedicalAlert
            priority="critical"
            title="Severe Symptom Alert"
            message="You've marked this symptom as severe. If symptoms are worsening or persistent, contact your healthcare provider immediately."
          />
        )}
      </View>
    );
  };

  if (selectedCategory) {
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <View style={styles.header}>
            <TouchableOpacity onPress={() => {
              setSelectedCategory(null);
              resetForm();
            }}>
              <Ionicons name="arrow-back" size={24} color={theme.colors.primary} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Log Symptom</Text>
            <View style={{ width: 24 }} />
          </View>

          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            {renderSymptomForm()}
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity
              style={[styles.submitButton, loading && styles.buttonDisabled]}
              onPress={handleSubmit}
              disabled={loading}
            >
              <Text style={styles.submitButtonText}>
                {loading ? 'Saving...' : 'Save Symptom'}
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Ionicons name="clipboard" size={32} color={theme.colors.primary} />
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Symptom Tracker</Text>
            <Text style={styles.headerSubtitle}>Monitor GLP-1 side effects</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {renderCategorySelection()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
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
  headerTextContainer: {
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
  scrollContent: {
    padding: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
    marginTop: theme.spacing.md,
  },
  categoryCard: {
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
  categoryIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  categoryText: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    marginBottom: 4,
  },
  categorySubtitle: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    lineHeight: 18,
  },
  emergencyBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    padding: 16,
    backgroundColor: theme.colors.errorBackground,
    borderRadius: 12,
    marginTop: 24,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.error,
  },
  emergencyText: {
    flex: 1,
  },
  emergencyTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.errorText,
    marginBottom: 4,
  },
  emergencyDescription: {
    fontSize: 12,
    color: theme.colors.errorText,
    lineHeight: 18,
  },
  formContainer: {
    paddingBottom: theme.spacing.xl,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.lg,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  symptomGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: theme.spacing.lg,
  },
  symptomButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: theme.colors.border,
    borderRadius: 12,
    alignItems: 'center',
    minWidth: 100,
    gap: 6,
  },
  symptomButtonActive: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primary + '08',
  },
  symptomButtonText: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    fontWeight: '500',
    textAlign: 'center',
  },
  symptomButtonTextActive: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
  inputGroup: {
    marginBottom: theme.spacing.lg,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: theme.colors.textPrimary,
    backgroundColor: theme.colors.surface,
  },
  textArea: {
    minHeight: 100,
  },
  hypoglycemiaSymptoms: {
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: 12,
    padding: 16,
    marginBottom: theme.spacing.lg,
  },
  checklistTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    marginBottom: 12,
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  checklistText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  footer: {
    padding: theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
  },
  submitButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    minHeight: 48,
    justifyContent: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
});