/**
 * Health Data Store
 * Zustand store for managing Apple Health data state.
 * Persists sync status via AsyncStorage so returning users aren't re-prompted.
 */

import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { healthKitService, type HealthDataSummary } from '../services/healthKit';

const HEALTH_SYNC_KEY = '@enteraflux_health_sync_completed';
const HEALTH_SYNC_SKIPPED_KEY = '@enteraflux_health_sync_skipped';

interface HealthStore {
    // State
    healthSyncCompleted: boolean;
    healthSyncSkipped: boolean;
    healthData: HealthDataSummary | null;
    isSyncing: boolean;
    syncError: string | null;
    lastSyncedAt: string | null;
    isInitialized: boolean;

    // Actions
    initialize: () => Promise<void>;
    setHealthSyncCompleted: (status: boolean) => Promise<void>;
    setHealthSyncSkipped: (status: boolean) => Promise<void>;
    syncHealthData: (days?: number) => Promise<boolean>;
    clearHealthData: () => Promise<void>;
}

export const useHealthStore = create<HealthStore>((set, get) => ({
    // Initial state
    healthSyncCompleted: false,
    healthSyncSkipped: false,
    healthData: null,
    isSyncing: false,
    syncError: null,
    lastSyncedAt: null,
    isInitialized: false,

    /**
     * Initialize store — read persisted sync status from AsyncStorage
     */
    initialize: async () => {
        try {
            const [syncCompleted, syncSkipped] = await Promise.all([
                AsyncStorage.getItem(HEALTH_SYNC_KEY),
                AsyncStorage.getItem(HEALTH_SYNC_SKIPPED_KEY),
            ]);

            set({
                healthSyncCompleted: syncCompleted === 'true',
                healthSyncSkipped: syncSkipped === 'true',
                isInitialized: true,
            });
        } catch (error) {
            console.warn('Error reading health sync status:', error);
            set({ isInitialized: true });
        }
    },

    /**
     * Mark health sync as completed and persist
     */
    setHealthSyncCompleted: async (status: boolean) => {
        try {
            await AsyncStorage.setItem(HEALTH_SYNC_KEY, status.toString());
            set({ healthSyncCompleted: status });
        } catch (error) {
            console.warn('Error persisting health sync status:', error);
        }
    },

    /**
     * Mark health sync as skipped and persist
     */
    setHealthSyncSkipped: async (status: boolean) => {
        try {
            await AsyncStorage.setItem(HEALTH_SYNC_SKIPPED_KEY, status.toString());
            set({ healthSyncSkipped: status });
        } catch (error) {
            console.warn('Error persisting health sync skipped status:', error);
        }
    },

    /**
     * Fetch health data from HealthKit and update store
     */
    syncHealthData: async (days: number = 7) => {
        if (get().isSyncing) return false;

        set({ isSyncing: true, syncError: null });

        try {
            const data = await healthKitService.fetchAllHealthData(days);
            set({
                healthData: data,
                isSyncing: false,
                lastSyncedAt: new Date().toISOString(),
            });
            console.log('✅ Health data synced successfully');
            return true;
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : 'Failed to sync health data';
            console.error('Error syncing health data:', errorMessage);
            set({ isSyncing: false, syncError: errorMessage });
            return false;
        }
    },

    /**
     * Clear all health data and reset sync status
     */
    clearHealthData: async () => {
        try {
            await Promise.all([
                AsyncStorage.removeItem(HEALTH_SYNC_KEY),
                AsyncStorage.removeItem(HEALTH_SYNC_SKIPPED_KEY),
            ]);
            set({
                healthSyncCompleted: false,
                healthSyncSkipped: false,
                healthData: null,
                lastSyncedAt: null,
                syncError: null,
            });
        } catch (error) {
            console.warn('Error clearing health data:', error);
        }
    },
}));
