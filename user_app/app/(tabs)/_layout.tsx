/**
 * Tab Navigation Layout
 * Clean, clinical tab navigation with 5 primary tabs
 */

import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { lightTheme } from '@/constants/theme';

export default function TabsLayout() {
  const theme = lightTheme;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textTertiary,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
          borderTopWidth: 1,
          paddingBottom: Platform.OS === 'ios' ? 20 : 8,
          paddingTop: 8,
          height: Platform.OS === 'ios' ? 88 : 68,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 4,
          letterSpacing: 0.2,
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
      }}
    >
      {/* Home / Dashboard */}
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={24}
              color={color}
            />
          ),
        }}
      />

      {/* Medication Tracking */}
      <Tabs.Screen
        name="medication"
        options={{
          title: 'Medication',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'medkit' : 'medkit-outline'}
              size={24}
              color={color}
            />
          ),
        }}
      />

      {/* Symptoms Logging */}
      <Tabs.Screen
        name="symptoms"
        options={{
          title: 'Symptoms',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'pulse' : 'pulse-outline'}
              size={24}
              color={color}
            />
          ),
        }}
      />

      {/* Education / Learn */}
      <Tabs.Screen
        name="education"
        options={{
          title: 'Learn',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'book' : 'book-outline'}
              size={24}
              color={color}
            />
          ),
        }}
      />

      {/* Profile / Settings */}
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'person' : 'person-outline'}
              size={24}
              color={color}
            />
          ),
        }}
      />

      {/* Hide track screen from tab bar - accessible via navigation */}
      <Tabs.Screen
        name="track"
        options={{
          href: null, // Hide from tabs
          title: 'Track Symptoms',
        }}
      />
    </Tabs>
  );
}