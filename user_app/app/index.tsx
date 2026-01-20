import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  StatusBar,
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
      // Navigate to home
      router.replace('/(tabs)/home');
    }
  }, [user]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background} />
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Image
            source={require('../assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.title}>EnteraFlux</Text>
        <Text style={styles.subtitle}>GLP-1 Therapy Companion</Text>

        <View style={styles.features}>
          <View style={styles.feature}>
            <View style={[styles.featureIcon, { backgroundColor: theme.colors.palette.success[50] }]}>
              <Ionicons name="heart" size={20} color={theme.colors.palette.success[600]} />
            </View>
            <Text style={styles.featureText}>Track Biometrics</Text>
          </View>
          <View style={styles.feature}>
            <View style={[styles.featureIcon, { backgroundColor: theme.colors.palette.warning[50] }]}>
              <Ionicons name="shield-checkmark" size={20} color={theme.colors.palette.warning[600]} />
            </View>
            <Text style={styles.featureText}>Safety Monitoring</Text>
          </View>
          <View style={styles.feature}>
            <View style={[styles.featureIcon, { backgroundColor: theme.colors.palette.primary[50] }]}>
              <Ionicons name="analytics" size={20} color={theme.colors.palette.primary[600]} />
            </View>
            <Text style={styles.featureText}>Symptom Insights</Text>
          </View>
        </View>

        <Text style={styles.disclaimer}>
          This app supports medication adherence and safety monitoring.
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
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    padding: theme.spacing.xl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: theme.spacing.xl,
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.surfaceElevated,
    borderRadius: 100,
    width: 140,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadow.lg,
  },
  logo: {
    width: 90,
    height: 90,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: theme.fontSize.lg,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xxl,
    textAlign: 'center',
    fontWeight: '500',
  },
  features: {
    width: '100%',
    marginBottom: theme.spacing.xxl,
    gap: theme.spacing.md,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadow.sm,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  featureText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textPrimary,
    fontWeight: '600',
    flex: 1,
  },
  disclaimer: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textTertiary,
    textAlign: 'center',
    marginBottom: theme.spacing.xxl,
    lineHeight: 20,
    paddingHorizontal: theme.spacing.md,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.xxl,
    borderRadius: theme.borderRadius.lg,
    width: '100%',
    minHeight: 56,
    ...theme.shadow.md,
  },
  buttonText: {
    fontSize: theme.fontSize.lg,
    fontWeight: '600',
    color: '#FFFFFF',
    marginRight: theme.spacing.sm,
    letterSpacing: 0.3,
  },
});