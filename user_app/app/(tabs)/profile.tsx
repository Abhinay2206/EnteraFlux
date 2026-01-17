/**
 * Profile / Settings Screen
 * User account, settings, integrations, and support
 */

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { lightTheme } from '@/constants/theme';
import { H2, H3, H4, Body, Caption } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';
import { Ionicons } from '@expo/vector-icons';

// Mock user data
const MOCK_USER = {
  name: 'Alex Johnson',
  email: 'alex.johnson@email.com',
  medication: 'Wegovy 1.7mg',
  startDate: 'Jan 2026',
};

export default function ProfileScreen() {
  const theme = lightTheme;

  // Settings state
  const [settings, setSettings] = useState({
    healthKitConnected: true,
    notificationsEnabled: true,
    researchOptedIn: true,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <H2>Profile</H2>
        </View>

        {/* User Card */}
        <Card elevated style={styles.userCard}>
          <View style={styles.userHeader}>
            <View style={[styles.avatar, { backgroundColor: theme.colors.primary }]}>
              <H2 style={{ color: '#FFFFFF' }}>
                {MOCK_USER.name.charAt(0).toUpperCase()}
              </H2>
            </View>
            <View style={styles.userInfo}>
              <H3>{MOCK_USER.name}</H3>
              <Caption style={{ color: theme.colors.textSecondary, marginTop: 2 }}>
                {MOCK_USER.email}
              </Caption>
              <View style={styles.medicationBadge}>
                <Ionicons name="medkit" size={14} color={theme.colors.primary} />
                <Caption style={{ color: theme.colors.primary, marginLeft: 4 }}>
                  {MOCK_USER.medication} • Since {MOCK_USER.startDate}
                </Caption>
              </View>
            </View>
          </View>
        </Card>

        {/* Integrations Section */}
        <View style={styles.section}>
          <H3 style={styles.sectionTitle}>Integrations</H3>

          <Card style={styles.settingCard}>
            <View style={styles.settingRow}>
              <View style={styles.settingIcon}>
                <Ionicons name="heart" size={20} color="#FF2D55" />
              </View>
              <View style={styles.settingText}>
                <H4 style={{ fontSize: 16 }}>Apple Health</H4>
                <Caption style={{ color: theme.colors.textSecondary }}>
                  Sync biometric data
                </Caption>
              </View>
              <Switch
                value={settings.healthKitConnected}
                onValueChange={() => toggleSetting('healthKitConnected')}
                trackColor={{ false: theme.colors.border, true: theme.colors.success }}
                thumbColor="#FFFFFF"
              />
            </View>
          </Card>

          <Card style={styles.settingCard}>
            <View style={styles.settingRow}>
              <View style={styles.settingIcon}>
                <Ionicons name="notifications" size={20} color={theme.colors.primary} />
              </View>
              <View style={styles.settingText}>
                <H4 style={{ fontSize: 16 }}>Notifications</H4>
                <Caption style={{ color: theme.colors.textSecondary }}>
                  Reminders and alerts
                </Caption>
              </View>
              <Switch
                value={settings.notificationsEnabled}
                onValueChange={() => toggleSetting('notificationsEnabled')}
                trackColor={{ false: theme.colors.border, true: theme.colors.success }}
                thumbColor="#FFFFFF"
              />
            </View>
          </Card>
        </View>

        {/* Research Section */}
        <View style={styles.section}>
          <H3 style={styles.sectionTitle}>Research & Data</H3>

          <Card style={styles.settingCard}>
            <View style={styles.settingRow}>
              <View style={[styles.settingIcon, { backgroundColor: '#8B5CF620' }]}>
                <Ionicons name="flask" size={20} color="#8B5CF6" />
              </View>
              <View style={styles.settingText}>
                <H4 style={{ fontSize: 16 }}>Research Program</H4>
                <Caption style={{ color: theme.colors.success }}>
                  ✓ Enrolled
                </Caption>
              </View>
              <Switch
                value={settings.researchOptedIn}
                onValueChange={() => toggleSetting('researchOptedIn')}
                trackColor={{ false: theme.colors.border, true: theme.colors.success }}
                thumbColor="#FFFFFF"
              />
            </View>
          </Card>

          <MenuLink
            icon="download"
            title="Export My Data"
            subtitle="Download all your health data"
            onPress={() => console.log('Export data')}
          />
        </View>

        {/* Account Section */}
        <View style={styles.section}>
          <H3 style={styles.sectionTitle}>Account</H3>

          <MenuLink
            icon="person"
            title="Edit Profile"
            subtitle="Update your information"
            onPress={() => console.log('Edit profile')}
          />
          <MenuLink
            icon="lock-closed"
            title="Privacy & Security"
            subtitle="Manage your data and permissions"
            onPress={() => console.log('Privacy settings')}
          />
          <MenuLink
            icon="shield-checkmark"
            title="Safety Contacts"
            subtitle="Emergency contact information"
            onPress={() => console.log('Safety contacts')}
          />
        </View>

        {/* Support Section */}
        <View style={styles.section}>
          <H3 style={styles.sectionTitle}>Support</H3>

          <MenuLink
            icon="help-circle"
            title="Help & FAQ"
            subtitle="Get answers to common questions"
            onPress={() => console.log('Help')}
          />
          <MenuLink
            icon="mail"
            title="Contact Support"
            subtitle="Reach out to our team"
            onPress={() => console.log('Contact')}
          />
          <MenuLink
            icon="document-text"
            title="Terms & Privacy Policy"
            subtitle="Legal information"
            onPress={() => console.log('Terms')}
          />
        </View>

        {/* Disclaimer */}
        <Card variant="alert" alertLevel="info" style={styles.disclaimer}>
          <View style={styles.disclaimerContent}>
            <Ionicons name="information-circle" size={20} color={theme.colors.info} />
            <Body style={{ flex: 1, marginLeft: 12, fontSize: 14, color: theme.colors.infoText }}>
              This app is not a substitute for medical advice. Always consult your healthcare provider.
            </Body>
          </View>
        </Card>

        {/* Logout */}
        <TouchableOpacity
          style={[styles.logoutButton, { borderColor: theme.colors.error }]}
          onPress={() => console.log('Logout')}
        >
          <Ionicons name="log-out" size={20} color={theme.colors.error} />
          <H4 style={{ color: theme.colors.error, marginLeft: 8 }}>
            Log Out
          </H4>
        </TouchableOpacity>

        {/* Version */}
        <Caption style={styles.version}>Version 1.0.0 (Build 1)</Caption>
      </ScrollView>
    </SafeAreaView>
  );
}

// Menu Link Component
interface MenuLinkProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  onPress: () => void;
}

const MenuLink: React.FC<MenuLinkProps> = ({ icon, title, subtitle, onPress }) => {
  const theme = lightTheme;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Card style={styles.menuLink}>
        <View style={[styles.menuIcon, { backgroundColor: theme.colors.surfaceElevated }]}>
          <Ionicons name={icon} size={20} color={theme.colors.primary} />
        </View>
        <View style={styles.menuText}>
          <H4 style={{ fontSize: 16 }}>{title}</H4>
          <Caption style={{ color: theme.colors.textSecondary }}>{subtitle}</Caption>
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
    paddingBottom: 12,
  },
  userCard: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  medicationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    paddingHorizontal: 16,
    marginBottom: 12,
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    color: '#6B7280',
  },
  settingCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 0,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingText: {
    flex: 1,
  },
  menuLink: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuText: {
    flex: 1,
  },
  disclaimer: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  disclaimerContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 2,
    borderRadius: 12,
    marginBottom: 12,
  },
  version: {
    textAlign: 'center',
    color: '#9CA3AF',
    marginTop: 8,
  },
});