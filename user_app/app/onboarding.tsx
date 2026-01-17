import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Animated,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import theme from '../constants/theme';
import { api, ApiError } from '../utils/api';
import { useUserStore } from '../store/userStore';
import { MedicalAlert } from '../components/ui/MedicalAlert';

const MEDICATIONS = [
  { name: 'Ozempic (Semaglutide)', dosages: ['0.25mg', '0.5mg', '1mg', '2mg'] },
  { name: 'Wegovy (Semaglutide)', dosages: ['0.25mg', '0.5mg', '1mg', '1.7mg', '2.4mg'] },
  { name: 'Mounjaro (Tirzepatide)', dosages: ['2.5mg', '5mg', '7.5mg', '10mg', '12.5mg', '15mg'] },
  { name: 'Zepbound (Tirzepatide)', dosages: ['2.5mg', '5mg', '7.5mg', '10mg', '12.5mg', '15mg'] },
];

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function Onboarding() {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [providerName, setProviderName] = useState('');
  const [selectedMed, setSelectedMed] = useState('');
  const [selectedDosage, setSelectedDosage] = useState('');
  const [injectionDay, setInjectionDay] = useState('');
  const [injectionTime, setInjectionTime] = useState('09:00');
  const [discussedSideEffects, setDiscussedSideEffects] = useState(false);
  const [loading, setLoading] = useState(false);

  // Safety acknowledgments
  const [understoodEmergencyCare, setUnderstoodEmergencyCare] = useState(false);
  const [acknowledgedMonitoring, setAcknowledgedMonitoring] = useState(false);

  // Date picker temp values
  const [tempMonth, setTempMonth] = useState('');
  const [tempDay, setTempDay] = useState('');
  const [tempYear, setTempYear] = useState('');

  // Animation refs
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  const handleNext = async () => {
    if (step === 1) {
      // Step 1: Personal Information
      if (!name || !dateOfBirth || !email) {
        Alert.alert('Required Fields', 'Please fill in name, date of birth, and email');
        return;
      }
      animateStepTransition(() => setStep(2));
    } else if (step === 2) {
      // Step 2: Health Information
      if (!height || !weight) {
        Alert.alert('Required Fields', 'Please provide your height and weight');
        return;
      }
      animateStepTransition(() => setStep(3));
    } else if (step === 3) {
      // Step 3: Medication Setup
      if (!selectedMed || !selectedDosage || !injectionDay) {
        Alert.alert('Required Fields', 'Please complete medication setup');
        return;
      }
      if (!discussedSideEffects) {
        Alert.alert('Confirmation Required', 'Please confirm you have discussed side effects with your healthcare provider');
        return;
      }
      animateStepTransition(() => setStep(4));
    } else if (step === 4) {
      // Step 4: Safety Education & Consent
      if (!understoodEmergencyCare || !acknowledgedMonitoring) {
        Alert.alert('Acknowledgment Required', 'Please acknowledge the safety information');
        return;
      }
      animateStepTransition(() => setStep(5));
    } else if (step === 5) {
      // Step 5: Complete
      await handleComplete();
    }
  };

  const animateStepTransition = (callback: () => void) => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: -20,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      callback();
      slideAnim.setValue(20);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  const handleComplete = async () => {
    setLoading(true);
    try {
      // Calculate age from DOB
      if (!dateOfBirth) {
        Alert.alert('Error', 'Please select your date of birth');
        return;
      }
      const age = Math.floor((Date.now() - dateOfBirth.getTime()) / (365.25 * 24 * 60 * 60 * 1000));

      // Create user with enhanced data
      const userData = await api.createUser({
        name,
        age,
        email,
      });

      // Create medication
      await api.createMedication({
        user_id: userData._id,
        drug_name: selectedMed,
        dosage: selectedDosage,
        frequency: 'Weekly',
        injection_day: injectionDay,
        injection_time: injectionTime,
        start_date: new Date().toISOString(),
      });

      // Mark onboarding complete
      await api.completeOnboarding(userData._id);

      // Seed education content
      await api.seedEducation();

      // Update store
      setUser({ ...userData, onboarding_completed: true });

      // Navigate to dashboard
      router.replace('/(tabs)/dashboard');
    } catch (error) {
      console.error('Onboarding error:', error);

      const errorMessage = error instanceof ApiError
        ? error.message
        : 'Failed to complete onboarding. Please try again.';

      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const renderStep1 = () => (
    <Animated.View
      style={[
        styles.stepContainer,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <View style={styles.iconHeader}>
        <View style={styles.iconContainer}>
          <Ionicons name="shield-checkmark" size={48} color={theme.colors.primary} />
        </View>
      </View>

      <Text style={styles.stepTitle}>Welcome to GLP-1 Sentinel</Text>
      <Text style={styles.stepSubtitle}>A clinical monitoring tool for your GLP-1 therapy</Text>

      <MedicalAlert
        priority="info"
        title="Medical Disclaimer"
        message="This application is designed to support your GLP-1 medication therapy by tracking adherence and monitoring side effects. It does not provide medical advice and is not a substitute for professional healthcare."
      />

      <Text style={styles.sectionLabel}>Personal Information</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Full Name *</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter your full name"
          placeholderTextColor={theme.colors.textTertiary}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Date of Birth *</Text>
        <TouchableOpacity
          style={styles.datePickerButton}
          onPress={() => setShowDatePicker(true)}
          activeOpacity={0.7}
        >
          <Ionicons name="calendar-outline" size={20} color={theme.colors.textSecondary} />
          <Text style={[styles.datePickerText, dateOfBirth && styles.datePickerTextSelected]}>
            {dateOfBirth ? dateOfBirth.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Select your date of birth'}
          </Text>
          <Ionicons name="chevron-down" size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email Address *</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="your.email@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor={theme.colors.textTertiary}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder="(555) 123-4567"
          keyboardType="phone-pad"
          placeholderTextColor={theme.colors.textTertiary}
        />
      </View>
    </Animated.View>
  );

  const renderStep2 = () => (
    <Animated.View
      style={[
        styles.stepContainer,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <Text style={styles.stepTitle}>Health Information</Text>
      <Text style={styles.stepSubtitle}>This helps us provide personalized monitoring</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Height (inches) *</Text>
        <TextInput
          style={styles.input}
          value={height}
          onChangeText={setHeight}
          placeholder="e.g., 68"
          keyboardType="number-pad"
          placeholderTextColor={theme.colors.textTertiary}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Starting Weight (lbs) *</Text>
        <TextInput
          style={styles.input}
          value={weight}
          onChangeText={setWeight}
          placeholder="e.g., 180"
          keyboardType="number-pad"
          placeholderTextColor={theme.colors.textTertiary}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Healthcare Provider Name (Optional)</Text>
        <TextInput
          style={styles.input}
          value={providerName}
          onChangeText={setProviderName}
          placeholder="Dr. Smith"
          placeholderTextColor={theme.colors.textTertiary}
        />
      </View>

      <MedicalAlert
        priority="info"
        title="Privacy & Data"
        message="Your health information is encrypted and stored securely. This data helps track your progress and identify potential concerns early."
      />
    </Animated.View>
  );

  const renderStep3 = () => (
    <Animated.View
      style={[
        styles.stepContainer,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <Text style={styles.stepTitle}>Medication Setup</Text>
      <Text style={styles.stepSubtitle}>Configure your GLP-1 medication schedule</Text>

      <Text style={styles.label}>Select Your Medication *</Text>
      {MEDICATIONS.map((med) => (
        <TouchableOpacity
          key={med.name}
          style={[
            styles.optionButton,
            selectedMed === med.name && styles.optionButtonActive,
          ]}
          onPress={() => {
            setSelectedMed(med.name);
            setSelectedDosage('');
          }}
        >
          <Ionicons
            name={selectedMed === med.name ? 'radio-button-on' : 'radio-button-off'}
            size={22}
            color={selectedMed === med.name ? theme.colors.primary : theme.colors.textTertiary}
          />
          <Text
            style={[
              styles.optionText,
              selectedMed === med.name && styles.optionTextActive,
            ]}
          >
            {med.name}
          </Text>
        </TouchableOpacity>
      ))}

      {selectedMed && (
        <>
          <Text style={[styles.label, { marginTop: theme.spacing.lg }]}>Current Dosage *</Text>
          <View style={styles.dosageGrid}>
            {MEDICATIONS.find((m) => m.name === selectedMed)?.dosages.map((dosage) => (
              <TouchableOpacity
                key={dosage}
                style={[
                  styles.dosageButton,
                  selectedDosage === dosage && styles.dosageButtonActive,
                ]}
                onPress={() => setSelectedDosage(dosage)}
              >
                <Text
                  style={[
                    styles.dosageText,
                    selectedDosage === dosage && styles.dosageTextActive,
                  ]}
                >
                  {dosage}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={[styles.label, { marginTop: theme.spacing.lg }]}>Weekly Injection Day *</Text>
          <View style={styles.dosageGrid}>
            {DAYS.map((day) => (
              <TouchableOpacity
                key={day}
                style={[
                  styles.dosageButton,
                  injectionDay === day && styles.dosageButtonActive,
                ]}
                onPress={() => setInjectionDay(day)}
              >
                <Text
                  style={[
                    styles.dosageText,
                    injectionDay === day && styles.dosageTextActive,
                  ]}
                >
                  {day.slice(0, 3)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.checkboxContainer}>
            <TouchableOpacity
              style={styles.checkbox}
              onPress={() => setDiscussedSideEffects(!discussedSideEffects)}
            >
              <Ionicons
                name={discussedSideEffects ? 'checkbox' : 'square-outline'}
                size={24}
                color={discussedSideEffects ? theme.colors.primary : theme.colors.textTertiary}
              />
              <Text style={styles.checkboxLabel}>
                I have discussed potential side effects with my healthcare provider
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </Animated.View>
  );

  const renderStep4 = () => (
    <Animated.View
      style={[
        styles.stepContainer,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <Ionicons
        name="medical"
        size={56}
        color={theme.colors.primary}
        style={{ alignSelf: 'center', marginBottom: theme.spacing.lg }}
      />
      <Text style={styles.stepTitle}>Safety & Monitoring</Text>
      <Text style={styles.stepSubtitle}>Important information about GLP-1 therapy</Text>

      <MedicalAlert
        priority="warning"
        title="When to Seek Emergency Care"
        message="Contact emergency services immediately if you experience severe abdominal pain, persistent vomiting, severe allergic reactions, vision changes, or signs of pancreatitis."
      />

      <View style={styles.safetySection}>
        <Text style={styles.safetySectionTitle}>Common Side Effects to Monitor:</Text>
        <View style={styles.safetyList}>
          <View style={styles.safetyItem}>
            <Ionicons name="ellipse" size={6} color={theme.colors.textSecondary} />
            <Text style={styles.safetyItemText}>Nausea and vomiting</Text>
          </View>
          <View style={styles.safetyItem}>
            <Ionicons name="ellipse" size={6} color={theme.colors.textSecondary} />
            <Text style={styles.safetyItemText}>Diarrhea or constipation</Text>
          </View>
          <View style={styles.safetyItem}>
            <Ionicons name="ellipse" size={6} color={theme.colors.textSecondary} />
            <Text style={styles.safetyItemText}>Abdominal discomfort</Text>
          </View>
          <View style={styles.safetyItem}>
            <Ionicons name="ellipse" size={6} color={theme.colors.textSecondary} />
            <Text style={styles.safetyItemText}>Injection site reactions</Text>
          </View>
        </View>
      </View>

      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => setUnderstoodEmergencyCare(!understoodEmergencyCare)}
        >
          <Ionicons
            name={understoodEmergencyCare ? 'checkbox' : 'square-outline'}
            size={24}
            color={understoodEmergencyCare ? theme.colors.primary : theme.colors.textTertiary}
          />
          <Text style={styles.checkboxLabel}>
            I understand when to seek emergency medical care
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => setAcknowledgedMonitoring(!acknowledgedMonitoring)}
        >
          <Ionicons
            name={acknowledgedMonitoring ? 'checkbox' : 'square-outline'}
            size={24}
            color={acknowledgedMonitoring ? theme.colors.primary : theme.colors.textTertiary}
          />
          <Text style={styles.checkboxLabel}>
            I acknowledge this app provides monitoring tools, not medical advice
          </Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  const renderStep5 = () => (
    <Animated.View
      style={[
        styles.stepContainer,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <Ionicons
        name="checkmark-circle"
        size={64}
        color={theme.colors.success}
        style={{ alignSelf: 'center', marginBottom: theme.spacing.lg }}
      />
      <Text style={styles.stepTitle}>Setup Complete</Text>
      <Text style={styles.stepSubtitle}>
        Your GLP-1 Sentinel monitoring is ready
      </Text>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Your Configuration</Text>

        <View style={styles.summarySection}>
          <Text style={styles.summarySectionTitle}>Personal</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Name:</Text>
            <Text style={styles.summaryValue}>{name}</Text>
          </View>
          {height && weight && (
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Height/Weight:</Text>
              <Text style={styles.summaryValue}>{height}" / {weight} lbs</Text>
            </View>
          )}
        </View>

        <View style={styles.summarySection}>
          <Text style={styles.summarySectionTitle}>Medication</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Drug:</Text>
            <Text style={styles.summaryValue}>{selectedMed}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Dosage:</Text>
            <Text style={styles.summaryValue}>{selectedDosage}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Schedule:</Text>
            <Text style={styles.summaryValue}>Every {injectionDay}</Text>
          </View>
        </View>
      </View>

      <View style={styles.disclaimerBox}>
        <Ionicons name="information-circle" size={20} color={theme.colors.info} />
        <Text style={styles.disclaimerText}>
          Remember to consult your healthcare provider for any medical concerns or before making changes to your treatment.
        </Text>
      </View>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <View style={styles.progressContainer}>
              {[1, 2, 3, 4, 5].map((s) => (
                <View
                  key={s}
                  style={[
                    styles.progressDot,
                    s <= step && styles.progressDotActive,
                  ]}
                />
              ))}
            </View>
            <Text style={styles.stepIndicator}>Step {step} of 5</Text>
          </View>

          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          {step === 4 && renderStep4()}
          {step === 5 && renderStep5()}
        </ScrollView>

        <View style={styles.footer}>
          {step > 1 && (
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setStep(step - 1)}
            >
              <Ionicons name="arrow-back" size={20} color={theme.colors.primary} />
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[styles.nextButton, loading && styles.buttonDisabled]}
            onPress={handleNext}
            disabled={loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <>
                <ActivityIndicator color="#FFFFFF" size="small" />
                <Text style={[styles.nextButtonText, { marginLeft: theme.spacing.sm }]}>
                  {step === 5 ? 'Setting up...' : 'Processing...'}
                </Text>
              </>
            ) : (
              <>
                <Text style={styles.nextButtonText}>
                  {step === 5 ? 'Begin Monitoring' : 'Continue'}
                </Text>
                <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
              </>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* Date Picker Modal */}
      <Modal
        visible={showDatePicker}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowDatePicker(false)}
      >
        <View style={styles.datePickerModalOverlay}>
          <View style={styles.datePickerModalContent}>
            <Text style={styles.datePickerModalTitle}>Select Date of Birth</Text>

            <View style={styles.dateInputRow}>
              <View style={{ flex: 2 }}>
                <Text style={[styles.label, { marginBottom: 4, fontSize: 11, textAlign: 'center' }]}>
                  Month
                </Text>
                <TextInput
                  style={styles.dateInputSmall}
                  placeholder="MM"
                  keyboardType="number-pad"
                  maxLength={2}
                  value={tempMonth}
                  onChangeText={setTempMonth}
                  placeholderTextColor={theme.colors.textTertiary}
                />
              </View>
              <View style={{ flex: 2 }}>
                <Text style={[styles.label, { marginBottom: 4, fontSize: 11, textAlign: 'center' }]}>
                  Day
                </Text>
                <TextInput
                  style={styles.dateInputSmall}
                  placeholder="DD"
                  keyboardType="number-pad"
                  maxLength={2}
                  value={tempDay}
                  onChangeText={setTempDay}
                  placeholderTextColor={theme.colors.textTertiary}
                />
              </View>
              <View style={{ flex: 3 }}>
                <Text style={[styles.label, { marginBottom: 4, fontSize: 11, textAlign: 'center' }]}>
                  Year
                </Text>
                <TextInput
                  style={styles.dateInputSmall}
                  placeholder="YYYY"
                  keyboardType="number-pad"
                  maxLength={4}
                  value={tempYear}
                  onChangeText={setTempYear}
                  placeholderTextColor={theme.colors.textTertiary}
                />
              </View>
            </View>

            <View style={styles.dateModalButtons}>
              <TouchableOpacity
                style={[styles.dateModalButton, styles.dateModalCancelButton]}
                onPress={() => {
                  setShowDatePicker(false);
                  setTempMonth('');
                  setTempDay('');
                  setTempYear('');
                }}
              >
                <Text style={[styles.dateModalButtonText, styles.dateModalCancelText]}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.dateModalButton, styles.dateModalConfirmButton]}
                onPress={() => {
                  const month = parseInt(tempMonth);
                  const day = parseInt(tempDay);
                  const year = parseInt(tempYear);

                  if (!tempMonth || !tempDay || !tempYear) {
                    Alert.alert('Invalid Date', 'Please fill in all date fields');
                    return;
                  }

                  if (month < 1 || month > 12) {
                    Alert.alert('Invalid Month', 'Month must be between 1-12');
                    return;
                  }

                  if (day < 1 || day > 31) {
                    Alert.alert('Invalid Day', 'Day must be between 1-31');
                    return;
                  }

                  if (year < 1900 || year > new Date().getFullYear()) {
                    Alert.alert('Invalid Year', 'Please enter a valid year');
                    return;
                  }

                  const selectedDate = new Date(year, month - 1, day);
                  setDateOfBirth(selectedDate);
                  setShowDatePicker(false);
                  setTempMonth('');
                  setTempDay('');
                  setTempYear('');
                }}
              >
                <Text style={[styles.dateModalButtonText, styles.dateModalConfirmText]}>
                  Confirm
                </Text>
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
    flexGrow: 1,
    paddingBottom: theme.spacing.xl,
  },
  header: {
    padding: theme.spacing.lg,
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  progressContainer: {
    flexDirection: 'row',
    marginBottom: theme.spacing.sm,
    gap: 8,
  },
  progressDot: {
    width: 32,
    height: 4,
    backgroundColor: theme.colors.border,
    borderRadius: 2,
  },
  progressDotActive: {
    backgroundColor: theme.colors.primary,
  },
  stepIndicator: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    fontWeight: '600',
  },
  stepContainer: {
    flex: 1,
    padding: theme.spacing.lg,
  },
  iconHeader: {
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.primary + '15',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepTitle: {
    fontSize: theme.fontSize.xl,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  stepSubtitle: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.lg,
    textAlign: 'center',
  },
  sectionLabel: {
    fontSize: theme.fontSize.md,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  inputContainer: {
    marginBottom: theme.spacing.md,
  },
  label: {
    fontSize: theme.fontSize.sm,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    fontSize: theme.fontSize.md,
    color: theme.colors.textPrimary,
    backgroundColor: theme.colors.surface,
  },
  inputFocused: {
    borderColor: theme.colors.primary,
    borderWidth: 2,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.sm,
    backgroundColor: theme.colors.surface,
  },
  optionButtonActive: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primary + '08',
  },
  optionText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textPrimary,
    fontWeight: '500',
    marginLeft: theme.spacing.sm,
  },
  optionTextActive: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
  dosageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
    marginTop: theme.spacing.sm,
  },
  dosageButton: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    minWidth: 70,
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
  },
  dosageButtonActive: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primary,
  },
  dosageText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textPrimary,
    fontWeight: '600',
  },
  dosageTextActive: {
    color: '#FFFFFF',
  },
  checkboxContainer: {
    marginTop: theme.spacing.md,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing.sm,
  },
  checkboxLabel: {
    flex: 1,
    fontSize: theme.fontSize.sm,
    color: theme.colors.textPrimary,
    lineHeight: 20,
  },
  safetySection: {
    marginTop: theme.spacing.lg,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: theme.borderRadius.md,
  },
  safetySectionTitle: {
    fontSize: theme.fontSize.md,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  safetyList: {
    gap: theme.spacing.xs,
  },
  safetyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    paddingVertical: 4,
  },
  safetyItemText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  summaryCard: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  summaryTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  summarySection: {
    marginTop: theme.spacing.md,
  },
  summarySectionTitle: {
    fontSize: theme.fontSize.sm,
    fontWeight: '600',
    color: theme.colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: theme.spacing.sm,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.xs,
  },
  summaryLabel: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textSecondary,
  },
  summaryValue: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textPrimary,
    fontWeight: '600',
  },
  disclaimerBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing.sm,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.infoBackground,
    borderRadius: theme.borderRadius.md,
  },
  disclaimerText: {
    flex: 1,
    fontSize: theme.fontSize.xs,
    color: theme.colors.infoText,
    lineHeight: 18,
  },
  footer: {
    flexDirection: 'row',
    padding: theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    gap: theme.spacing.sm,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
  },
  backButtonText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.primary,
    marginLeft: theme.spacing.sm,
    fontWeight: '600',
  },
  nextButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    minHeight: 48,
  },
  nextButtonText: {
    fontSize: theme.fontSize.lg,
    fontWeight: '600',
    color: '#FFFFFF',
    marginRight: theme.spacing.sm,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  datePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    gap: 12,
  },
  datePickerText: {
    flex: 1,
    fontSize: theme.fontSize.md,
    color: theme.colors.textTertiary,
  },
  datePickerTextSelected: {
    color: theme.colors.textPrimary,
    fontWeight: '500',
  },
  // Date Picker Modal Styles
  datePickerModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  datePickerModalContent: {
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    padding: 24,
    width: '85%',
    maxWidth: 400,
  },
  datePickerModalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    marginBottom: 20,
    textAlign: 'center',
  },
  dateInputRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  dateInputSmall: {
    flex: 1,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: theme.colors.textPrimary,
    backgroundColor: theme.colors.backgroundSecondary,
    textAlign: 'center',
  },
  dateModalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  dateModalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  dateModalCancelButton: {
    backgroundColor: theme.colors.backgroundSecondary,
  },
  dateModalConfirmButton: {
    backgroundColor: theme.colors.primary,
  },
  dateModalButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  dateModalCancelText: {
    color: theme.colors.textPrimary,
  },
  dateModalConfirmText: {
    color: '#FFFFFF',
  },
});