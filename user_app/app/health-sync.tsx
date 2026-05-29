/**
 * Health Sync Onboarding Screen
 * Premium iOS-only screen shown after medical onboarding to connect Apple Health.
 * Displays benefits, handles permissions, shows progress during sync.
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  ActivityIndicator,
  Linking,
  Platform,
  StatusBar,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import theme from '../constants/theme';
import { healthKitService } from '../services/healthKit';
import { useHealthStore } from '../store/healthStore';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Benefit cards data
const HEALTH_BENEFITS = [
  {
    icon: 'footsteps' as const,
    title: 'Activity Tracking',
    description: 'Steps, distance & daily movement',
    color: theme.colors.palette.primary[500],
    bgColor: theme.colors.palette.primary[50],
  },
  {
    icon: 'heart' as const,
    title: 'Heart Rate Monitoring',
    description: 'Resting heart rate & trends',
    color: theme.colors.palette.error[500],
    bgColor: theme.colors.palette.error[50],
  },
  {
    icon: 'moon' as const,
    title: 'Sleep Analytics',
    description: 'Sleep duration & quality insights',
    color: theme.colors.palette.info[500],
    bgColor: theme.colors.palette.info[50],
  },
  {
    icon: 'flame' as const,
    title: 'Calorie Tracking',
    description: 'Active energy burned daily',
    color: theme.colors.palette.warning[500],
    bgColor: theme.colors.palette.warning[50],
  },
  {
    icon: 'barbell' as const,
    title: 'Workout History',
    description: 'Exercise sessions & progress',
    color: theme.colors.palette.success[500],
    bgColor: theme.colors.palette.success[50],
  },
  {
    icon: 'analytics' as const,
    title: 'Recovery Metrics',
    description: 'Wellness & recovery insights',
    color: theme.colors.palette.advisory[500],
    bgColor: theme.colors.palette.advisory[50],
  },
];

type SyncState = 'idle' | 'syncing' | 'success' | 'denied' | 'error';

export default function HealthSync() {
  const router = useRouter();
  const {
    setHealthSyncCompleted,
    setHealthSyncSkipped,
    syncHealthData,
  } = useHealthStore();

  const [syncState, setSyncState] = useState<SyncState>('idle');
  const [syncProgress, setSyncProgress] = useState(0);

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const cardAnims = useRef(
    HEALTH_BENEFITS.map(() => new Animated.Value(0))
  ).current;

  useEffect(() => {
    // Skip on non-iOS
    if (Platform.OS !== 'ios') {
      router.replace('/(tabs)/home');
      return;
    }

    // Entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    // Staggered card animations
    const staggerDelay = 80;
    cardAnims.forEach((anim, index) => {
      Animated.timing(anim, {
        toValue: 1,
        duration: 400,
        delay: 400 + index * staggerDelay,
        useNativeDriver: true,
      }).start();
    });

    // Pulse animation for heart icon
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();

    return () => pulse.stop();
  }, []);

  const handleSync = async () => {
    setSyncState('syncing');
    setSyncProgress(0);

    // Animate progress bar
    Animated.timing(progressAnim, {
      toValue: 0.3,
      duration: 500,
      useNativeDriver: false,
    }).start();

    // Request permissions
    const granted = await healthKitService.requestPermissions();

    if (!granted) {
      setSyncState('denied');
      progressAnim.setValue(0);
      return;
    }

    // Update progress
    Animated.timing(progressAnim, {
      toValue: 0.6,
      duration: 500,
      useNativeDriver: false,
    }).start();
    setSyncProgress(60);

    // Fetch all health data
    const success = await syncHealthData(30);

    if (success) {
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: false,
      }).start();
      setSyncProgress(100);
      setSyncState('success');

      await setHealthSyncCompleted(true);

      // Short delay to show success state, then navigate
      setTimeout(() => {
        router.replace('/(tabs)/home');
      }, 1200);
    } else {
      setSyncState('error');
      progressAnim.setValue(0);
    }
  };

  const handleSkip = async () => {
    await setHealthSyncSkipped(true);
    router.replace('/(tabs)/home');
  };

  const handleOpenSettings = () => {
    Linking.openURL('app-settings:');
  };

  const renderSyncingOverlay = () => (
    <View style={styles.syncingOverlay}>
      <View style={styles.syncingCard}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.syncingTitle}>Syncing Health Data</Text>
        <Text style={styles.syncingSubtitle}>
          Fetching your health metrics from Apple Health...
        </Text>

        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <Animated.View
            style={[
              styles.progressBarFill,
              {
                width: progressAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
              },
            ]}
          />
        </View>
        <Text style={styles.progressText}>{syncProgress}%</Text>
      </View>
    </View>
  );

  const renderSuccessOverlay = () => (
    <View style={styles.syncingOverlay}>
      <View style={styles.syncingCard}>
        <View style={styles.successIconContainer}>
          <Ionicons name="checkmark-circle" size={64} color={theme.colors.success} />
        </View>
        <Text style={styles.syncingTitle}>Sync Complete!</Text>
        <Text style={styles.syncingSubtitle}>
          Your health data is now connected. Redirecting...
        </Text>
      </View>
    </View>
  );

  const renderDeniedState = () => (
    <View style={styles.deniedContainer}>
      <View style={styles.deniedCard}>
        <Ionicons name="shield-outline" size={40} color={theme.colors.advisory} />
        <Text style={styles.deniedTitle}>Permissions Required</Text>
        <Text style={styles.deniedDescription}>
          Apple Health permissions were not granted. You can enable them in Settings
          or continue without health data integration.
        </Text>

        <TouchableOpacity
          style={styles.settingsButton}
          onPress={handleOpenSettings}
          activeOpacity={0.8}
        >
          <Ionicons name="settings-outline" size={20} color={theme.colors.primary} />
          <Text style={styles.settingsButtonText}>Open Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => {
            setSyncState('idle');
            handleSync();
          }}
          activeOpacity={0.8}
        >
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.skipLinkButton}
          onPress={handleSkip}
          activeOpacity={0.7}
        >
          <Text style={styles.skipLinkText}>Continue without Apple Health</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (syncState === 'denied') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        {renderDeniedState()}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Overlays */}
      {syncState === 'syncing' && renderSyncingOverlay()}
      {syncState === 'success' && renderSuccessOverlay()}

      <Animated.ScrollView
        contentContainerStyle={styles.scrollContent}
        style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Icon */}
        <View style={styles.headerSection}>
          <Animated.View
            style={[
              styles.heartIconContainer,
              { transform: [{ scale: pulseAnim }] },
            ]}
          >
            <Ionicons name="heart-circle" size={72} color={theme.colors.primary} />
          </Animated.View>

          <Text style={styles.title}>Sync with Apple Health</Text>
          <Text style={styles.subtitle}>
            Connect your health data for personalized insights, smarter tracking,
            and better wellness recommendations during your GLP-1 therapy.
          </Text>
        </View>

        {/* Benefits Grid */}
        <View style={styles.benefitsSection}>
          <Text style={styles.benefitsSectionTitle}>What you'll unlock</Text>
          <View style={styles.benefitsGrid}>
            {HEALTH_BENEFITS.map((benefit, index) => (
              <Animated.View
                key={benefit.title}
                style={[
                  styles.benefitCard,
                  {
                    opacity: cardAnims[index],
                    transform: [
                      {
                        translateY: cardAnims[index].interpolate({
                          inputRange: [0, 1],
                          outputRange: [20, 0],
                        }),
                      },
                    ],
                  },
                ]}
              >
                <View
                  style={[
                    styles.benefitIcon,
                    { backgroundColor: benefit.bgColor },
                  ]}
                >
                  <Ionicons
                    name={benefit.icon}
                    size={22}
                    color={benefit.color}
                  />
                </View>
                <View style={styles.benefitTextContainer}>
                  <Text style={styles.benefitTitle}>{benefit.title}</Text>
                  <Text style={styles.benefitDescription}>
                    {benefit.description}
                  </Text>
                </View>
              </Animated.View>
            ))}
          </View>
        </View>

        {/* Privacy Note */}
        <View style={styles.privacyNote}>
          <Ionicons
            name="lock-closed"
            size={16}
            color={theme.colors.textTertiary}
          />
          <Text style={styles.privacyText}>
            Your health data stays on-device and is never shared without your
            consent. You can disconnect at any time from Settings.
          </Text>
        </View>
      </Animated.ScrollView>

      {/* Footer Actions */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.syncButton,
            syncState !== 'idle' && styles.syncButtonDisabled,
          ]}
          onPress={handleSync}
          disabled={syncState !== 'idle'}
          activeOpacity={0.8}
        >
          <Ionicons name="heart" size={22} color="#FFFFFF" />
          <Text style={styles.syncButtonText}>Sync with Apple Health</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.skipButton}
          onPress={handleSkip}
          activeOpacity={0.7}
        >
          <Text style={styles.skipButtonText}>Skip for now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    paddingBottom: 24,
  },

  // Header Section
  headerSection: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 8,
  },
  heartIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: theme.colors.palette.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    ...theme.shadow.lg,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    textAlign: 'center',
    marginBottom: 10,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 12,
  },

  // Benefits Section
  benefitsSection: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  benefitsSectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    marginBottom: 14,
  },
  benefitsGrid: {
    gap: 10,
  },
  benefitCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadow.sm,
  },
  benefitIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  benefitTextContainer: {
    flex: 1,
  },
  benefitTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    marginBottom: 2,
  },
  benefitDescription: {
    fontSize: 13,
    color: theme.colors.textSecondary,
  },

  // Privacy Note
  privacyNote: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  privacyText: {
    flex: 1,
    fontSize: 12,
    color: theme.colors.textTertiary,
    lineHeight: 18,
  },

  // Footer
  footer: {
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 8 : 20,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    gap: 10,
  },
  syncButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
    paddingVertical: 16,
    borderRadius: 14,
    gap: 10,
    ...theme.shadow.md,
  },
  syncButtonDisabled: {
    opacity: 0.5,
  },
  syncButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  skipButton: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  skipButtonText: {
    fontSize: 15,
    color: theme.colors.textSecondary,
    fontWeight: '500',
  },

  // Syncing Overlay
  syncingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  syncingCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    width: SCREEN_WIDTH - 64,
    ...theme.shadow.lg,
  },
  syncingTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginTop: 16,
    textAlign: 'center',
  },
  syncingSubtitle: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginTop: 8,
    textAlign: 'center',
    lineHeight: 20,
  },
  progressBarContainer: {
    width: '100%',
    height: 6,
    backgroundColor: theme.colors.border,
    borderRadius: 3,
    marginTop: 20,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: 3,
  },
  progressText: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.textSecondary,
    marginTop: 8,
  },

  // Success
  successIconContainer: {
    marginBottom: 4,
  },

  // Denied State
  deniedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  deniedCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
    width: '100%',
    ...theme.shadow.lg,
  },
  deniedTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginTop: 16,
    marginBottom: 8,
  },
  deniedDescription: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  settingsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: theme.colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 14,
    width: '100%',
    gap: 8,
    marginBottom: 12,
  },
  settingsButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.primary,
  },
  retryButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 14,
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  retryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  skipLinkButton: {
    paddingVertical: 8,
  },
  skipLinkText: {
    fontSize: 14,
    color: theme.colors.textTertiary,
    fontWeight: '500',
  },
});
