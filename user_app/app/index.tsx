import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import theme from '../constants/theme';
import { useUserStore } from '../store/userStore';

export default function Index() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    // Check if user exists and onboarding completed
    if (user && user.onboarding_completed) {
      router.replace('/(tabs)/dashboard');
    }
  }, [user]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="shield-checkmark" size={80} color={theme.colors.primary} />
        </View>

        <Text style={styles.title}>GLP-1 Sentinel</Text>
        <Text style={styles.subtitle}>Your Personal Medication Guardian</Text>

        <View style={styles.features}>
          <View style={styles.feature}>
            <Ionicons name="heart-outline" size={24} color={theme.colors.secondary} />
            <Text style={styles.featureText}>Track Biometrics</Text>
          </View>
          <View style={styles.feature}>
            <Ionicons name="warning-outline" size={24} color={theme.colors.warning} />
            <Text style={styles.featureText}>Risk Alerts</Text>
          </View>
          <View style={styles.feature}>
            <Ionicons name="clipboard-outline" size={24} color={theme.colors.success} />
            <Text style={styles.featureText}>Log Symptoms</Text>
          </View>
        </View>

        <Text style={styles.disclaimer}>
          This app is designed to support medication adherence and safety.
          Always consult your healthcare provider for medical advice.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/onboarding')}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Get Started</Text>
          <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundLight,
  },
  content: {
    flex: 1,
    padding: theme.spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: theme.spacing.xl,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background,
    borderRadius: 100,
  },
  title: {
    fontSize: theme.fontSize.xxl,
    fontWeight: '700',
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: theme.fontSize.lg,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xl,
    textAlign: 'center',
  },
  features: {
    width: '100%',
    marginBottom: theme.spacing.xl,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.md,
  },
  featureText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textPrimary,
    marginLeft: theme.spacing.md,
    fontWeight: '600',
  },
  disclaimer: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textLight,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
    lineHeight: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    borderRadius: theme.borderRadius.lg,
    width: '100%',
    minHeight: 48,
  },
  buttonText: {
    fontSize: theme.fontSize.lg,
    fontWeight: '600',
    color: '#FFFFFF',
    marginRight: theme.spacing.sm,
  },
});