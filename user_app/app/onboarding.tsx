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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Contacts from 'expo-contacts';
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
  const [heightFeet, setHeightFeet] = useState('');
  const [heightInches, setHeightInches] = useState('');
  const [heightUnit, setHeightUnit] = useState<'cm' | 'ft'>('cm');
  const [weight, setWeight] = useState('');
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg');
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
  const [emergencyContactName, setEmergencyContactName] = useState('');
  const [emergencyContactPhone, setEmergencyContactPhone] = useState('');

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
      const hasHeight = heightUnit === 'cm' ? height : (heightFeet && heightInches);
      if (!hasHeight || !weight) {
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

      // Navigate to home
      router.replace('/(tabs)/home');
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
          onPress={() => setShowDatePicker(!showDatePicker)}
          activeOpacity={0.7}
        >
          <Ionicons name="calendar-outline" size={20} color={theme.colors.textSecondary} />
          <Text style={[styles.datePickerText, dateOfBirth && styles.datePickerTextSelected]}>
            {dateOfBirth ? dateOfBirth.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Select your date of birth'}
          </Text>
          <Ionicons name="chevron-down" size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={dateOfBirth || new Date(2000, 0, 1)}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={(_event: any, selectedDate?: Date) => {
              setShowDatePicker(Platform.OS === 'ios');
              if (selectedDate) {
                setDateOfBirth(selectedDate);
              }
            }}
            maximumDate={new Date()}
            minimumDate={new Date(1900, 0, 1)}
            textColor={theme.colors.textPrimary}
            accentColor={theme.colors.primary}
          />
        )}
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
        <Text style={styles.label}>Phone Number (+91)</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder="(+91) 12345 67890"
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
        <Text style={styles.label}>Height *</Text>
        <View style={styles.unitToggle}>
          <TouchableOpacity
            style={[styles.unitButton, heightUnit === 'cm' && styles.unitButtonActive]}
            onPress={() => setHeightUnit('cm')}
          >
            <Text style={[styles.unitButtonText, heightUnit === 'cm' && styles.unitButtonTextActive]}>cm</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.unitButton, heightUnit === 'ft' && styles.unitButtonActive]}
            onPress={() => setHeightUnit('ft')}
          >
            <Text style={[styles.unitButtonText, heightUnit === 'ft' && styles.unitButtonTextActive]}>ft + in</Text>
          </TouchableOpacity>
        </View>
        {heightUnit === 'cm' ? (
          <TextInput
            style={styles.input}
            value={height}
            onChangeText={setHeight}
            placeholder="e.g., 170"
            keyboardType="number-pad"
            placeholderTextColor={theme.colors.textTertiary}
          />
        ) : (
          <View style={styles.heightFeetInchesRow}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.label, { fontSize: 11, marginBottom: 4 }]}>Feet</Text>
              <TextInput
                style={styles.input}
                value={heightFeet}
                onChangeText={setHeightFeet}
                placeholder="5"
                keyboardType="number-pad"
                placeholderTextColor={theme.colors.textTertiary}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.label, { fontSize: 11, marginBottom: 4 }]}>Inches</Text>
              <TextInput
                style={styles.input}
                value={heightInches}
                onChangeText={setHeightInches}
                placeholder="8"
                keyboardType="number-pad"
                placeholderTextColor={theme.colors.textTertiary}
              />
            </View>
          </View>
        )}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Starting Weight *</Text>
        <View style={styles.unitToggle}>
          <TouchableOpacity
            style={[styles.unitButton, weightUnit === 'kg' && styles.unitButtonActive]}
            onPress={() => setWeightUnit('kg')}
          >
            <Text style={[styles.unitButtonText, weightUnit === 'kg' && styles.unitButtonTextActive]}>kg</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.unitButton, weightUnit === 'lbs' && styles.unitButtonActive]}
            onPress={() => setWeightUnit('lbs')}
          >
            <Text style={[styles.unitButtonText, weightUnit === 'lbs' && styles.unitButtonTextActive]}>lbs</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.input}
          value={weight}
          onChangeText={setWeight}
          placeholder={weightUnit === 'kg' ? 'e.g., 70' : 'e.g., 154'}
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

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Emergency Contact (Optional)</Text>
        <TouchableOpacity
          style={styles.contactPickerButton}
          onPress={async () => {
            const { status } = await Contacts.requestPermissionsAsync();
            if (status === 'granted') {
              const { data } = await Contacts.getContactsAsync({
                fields: [Contacts.Fields.PhoneNumbers],
              });

              if (data.length > 0) {
                // For simplicity, let user pick from a simple list
                // In production, you'd want a proper contact picker UI
                Alert.alert(
                  'Select Contact',
                  'Contact picker opened. For demo, using first contact.',
                  [
                    {
                      text: 'Cancel',
                      style: 'cancel',
                    },
                    {
                      text: 'Select First Contact',
                      onPress: () => {
                        const contact = data[0];
                        setEmergencyContactName(contact.name || 'Unknown');
                        setEmergencyContactPhone(
                          contact.phoneNumbers?.[0]?.number || ''
                        );
                      },
                    },
                  ]
                );
              } else {
                Alert.alert('No Contacts', 'No contacts found on your device.');
              }
            } else {
              Alert.alert(
                'Permission Denied',
                'Please grant contacts permission to select an emergency contact.'
              );
            }
          }}
          activeOpacity={0.7}
        >
          <Ionicons name="people-outline" size={20} color={theme.colors.textSecondary} />
          <Text style={[styles.contactPickerText, emergencyContactName && styles.contactPickerTextSelected]}>
            {emergencyContactName ? `${emergencyContactName} - ${emergencyContactPhone}` : 'Select from contacts'}
          </Text>
          <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
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
  unitToggle: {
    flexDirection: 'row',
    marginBottom: theme.spacing.sm,
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: theme.borderRadius.md,
    padding: 4,
    gap: 4,
  },
  unitButton: {
    flex: 1,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unitButtonActive: {
    backgroundColor: theme.colors.primary,
  },
  unitButtonText: {
    fontSize: theme.fontSize.sm,
    fontWeight: '600',
    color: theme.colors.textSecondary,
  },
  unitButtonTextActive: {
    color: '#FFFFFF',
  },
  heightFeetInchesRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  contactPickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    gap: 12,
  },
  contactPickerText: {
    flex: 1,
    fontSize: theme.fontSize.md,
    color: theme.colors.textTertiary,
  },
  contactPickerTextSelected: {
    color: theme.colors.textPrimary,
    fontWeight: '500',
  },

});