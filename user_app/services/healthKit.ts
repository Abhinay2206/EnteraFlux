/**
 * HealthKit Service
 * Reusable wrapper around react-native-health for Apple Health integration.
 * All methods gracefully return defaults on Android or if permissions are denied.
 */

import { Platform } from 'react-native';
import AppleHealthKit, {
  type HealthKitPermissions,
  type HealthValue,
  type HealthInputOptions,
} from 'react-native-health';

const HK = AppleHealthKit;

// Types for health data
export interface DailySteps {
  date: string;
  value: number;
}

export interface HeartRateSample {
  date: string;
  value: number;
}

export interface SleepSession {
  startDate: string;
  endDate: string;
  value: string; // 'ASLEEP', 'INBED', etc.
}

export interface WorkoutSession {
  startDate: string;
  endDate: string;
  activityName: string;
  calories: number;
  distance: number;
  duration: number; // minutes
}

export interface HealthDataSummary {
  steps: {
    today: number;
    daily: DailySteps[];
  };
  heartRate: {
    latest: number;
    average: number;
    samples: HeartRateSample[];
  };
  sleep: {
    lastNight: number; // hours
    sessions: SleepSession[];
  };
  activeEnergy: {
    today: number; // kcal
    daily: { date: string; value: number }[];
  };
  workouts: WorkoutSession[];
  calories: {
    today: number;
  };
  distance: {
    today: number; // km
    daily: { date: string; value: number }[];
  };
}

// Permissions to request
const HEALTHKIT_PERMISSIONS: HealthKitPermissions = {
  permissions: {
    read: [
      HK.Constants.Permissions.StepCount,
      HK.Constants.Permissions.HeartRate,
      HK.Constants.Permissions.SleepAnalysis,
      HK.Constants.Permissions.ActiveEnergyBurned,
      HK.Constants.Permissions.Workout,
      HK.Constants.Permissions.DistanceWalkingRunning,
    ],
    write: [],
  },
};

// Default empty summary
const EMPTY_SUMMARY: HealthDataSummary = {
  steps: { today: 0, daily: [] },
  heartRate: { latest: 0, average: 0, samples: [] },
  sleep: { lastNight: 0, sessions: [] },
  activeEnergy: { today: 0, daily: [] },
  workouts: [],
  calories: { today: 0 },
  distance: { today: 0, daily: [] },
};

class HealthKitService {
  private initialized = false;

  /**
   * Check if HealthKit is available (iOS only)
   */
  isAvailable(): boolean {
    return Platform.OS === 'ios';
  }

  /**
   * Request HealthKit permissions
   * Returns true if permissions were granted, false otherwise
   */
  requestPermissions(): Promise<boolean> {
    return new Promise((resolve) => {
      if (!this.isAvailable()) {
        resolve(false);
        return;
      }

      AppleHealthKit.initHealthKit(HEALTHKIT_PERMISSIONS, (error: string) => {
        if (error) {
          console.warn('HealthKit initialization error:', error);
          resolve(false);
          return;
        }
        this.initialized = true;
        console.log('✅ HealthKit initialized successfully');
        resolve(true);
      });
    });
  }

  /**
   * Ensure HealthKit is initialized before fetching
   */
  private async ensureInitialized(): Promise<boolean> {
    if (!this.isAvailable()) return false;
    if (this.initialized) return true;
    return this.requestPermissions();
  }

  /**
   * Get date N days ago
   */
  private getDaysAgo(days: number): Date {
    const date = new Date();
    date.setDate(date.getDate() - days);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  /**
   * Fetch daily step counts
   */
  fetchSteps(days: number = 7): Promise<DailySteps[]> {
    return new Promise(async (resolve) => {
      if (!(await this.ensureInitialized())) {
        resolve([]);
        return;
      }

      const options: HealthInputOptions = {
        startDate: this.getDaysAgo(days).toISOString(),
        endDate: new Date().toISOString(),
        period: 1440, // daily aggregation (minutes in a day)
      };

      HK.getDailyStepCountSamples(
        options,
        (err: Object, results: HealthValue[]) => {
          if (err) {
            console.warn('Error fetching steps:', err);
            resolve([]);
            return;
          }
          const mapped = (results || []).map((r: any) => ({
            date: r.startDate || r.date || new Date().toISOString(),
            value: r.value || 0,
          }));
          resolve(mapped);
        },
      );
    });
  }

  /**
   * Fetch heart rate samples
   */
  fetchHeartRate(days: number = 7): Promise<HeartRateSample[]> {
    return new Promise(async (resolve) => {
      if (!(await this.ensureInitialized())) {
        resolve([]);
        return;
      }

      const options: HealthInputOptions = {
        startDate: this.getDaysAgo(days).toISOString(),
        endDate: new Date().toISOString(),
        ascending: false,
        limit: 100,
      };

      HK.getHeartRateSamples(
        options,
        (err: Object, results: HealthValue[]) => {
          if (err) {
            console.warn('Error fetching heart rate:', err);
            resolve([]);
            return;
          }
          const mapped = (results || []).map((r: any) => ({
            date: r.startDate || r.date || new Date().toISOString(),
            value: r.value || 0,
          }));
          resolve(mapped);
        },
      );
    });
  }

  /**
   * Fetch sleep analysis data
   */
  fetchSleepAnalysis(days: number = 7): Promise<SleepSession[]> {
    return new Promise(async (resolve) => {
      if (!(await this.ensureInitialized())) {
        resolve([]);
        return;
      }

      const options: HealthInputOptions = {
        startDate: this.getDaysAgo(days).toISOString(),
        endDate: new Date().toISOString(),
      };

      HK.getSleepSamples(
        options,
        (err: Object, results: any[]) => {
          if (err) {
            console.warn('Error fetching sleep:', err);
            resolve([]);
            return;
          }
          const mapped = (results || []).map((r: any) => ({
            startDate: r.startDate || new Date().toISOString(),
            endDate: r.endDate || new Date().toISOString(),
            value: r.value || 'ASLEEP',
          }));
          resolve(mapped);
        },
      );
    });
  }

  /**
   * Fetch active energy burned
   */
  fetchActiveEnergy(days: number = 7): Promise<{ date: string; value: number }[]> {
    return new Promise(async (resolve) => {
      if (!(await this.ensureInitialized())) {
        resolve([]);
        return;
      }

      const options: HealthInputOptions = {
        startDate: this.getDaysAgo(days).toISOString(),
        endDate: new Date().toISOString(),
        period: 1440,
      };

      HK.getActiveEnergyBurned(
        options,
        (err: Object, results: HealthValue[]) => {
          if (err) {
            console.warn('Error fetching active energy:', err);
            resolve([]);
            return;
          }
          const mapped = (results || []).map((r: any) => ({
            date: r.startDate || r.date || new Date().toISOString(),
            value: Math.round(r.value || 0),
          }));
          resolve(mapped);
        },
      );
    });
  }

  /**
   * Fetch workout sessions
   */
  fetchWorkouts(days: number = 7): Promise<WorkoutSession[]> {
    return new Promise(async (resolve) => {
      if (!(await this.ensureInitialized())) {
        resolve([]);
        return;
      }

      const options: HealthInputOptions = {
        startDate: this.getDaysAgo(days).toISOString(),
        endDate: new Date().toISOString(),
      };

      HK.getSamples(
        {
          ...options,
          type: 'Workout',
        } as any,
        (err: Object, results: any[]) => {
          if (err) {
            console.warn('Error fetching workouts:', err);
            resolve([]);
            return;
          }
          const mapped = (results || []).map((r: any) => ({
            startDate: r.start || r.startDate || new Date().toISOString(),
            endDate: r.end || r.endDate || new Date().toISOString(),
            activityName: r.activityName || 'Unknown',
            calories: Math.round(r.calories || 0),
            distance: Math.round((r.distance || 0) * 100) / 100,
            duration: Math.round((r.duration || 0) / 60),
          }));
          resolve(mapped);
        },
      );
    });
  }

  /**
   * Fetch walking/running distance
   */
  fetchDistance(days: number = 7): Promise<{ date: string; value: number }[]> {
    return new Promise(async (resolve) => {
      if (!(await this.ensureInitialized())) {
        resolve([]);
        return;
      }

      const options: HealthInputOptions = {
        startDate: this.getDaysAgo(days).toISOString(),
        endDate: new Date().toISOString(),
        period: 1440,
      };

      HK.getDailyDistanceWalkingRunningSamples(
        options,
        (err: Object, results: HealthValue[]) => {
          if (err) {
            console.warn('Error fetching distance:', err);
            resolve([]);
            return;
          }
          const mapped = (results || []).map((r: any) => ({
            date: r.startDate || r.date || new Date().toISOString(),
            value: Math.round(((r.value || 0) / 1000) * 100) / 100, // Convert meters to km
          }));
          resolve(mapped);
        },
      );
    });
  }

  /**
   * Fetch all health data aggregated into a single summary
   */
  async fetchAllHealthData(days: number = 7): Promise<HealthDataSummary> {
    if (!this.isAvailable()) return { ...EMPTY_SUMMARY };

    try {
      const [steps, heartRate, sleep, activeEnergy, workouts, distance] =
        await Promise.all([
          this.fetchSteps(days),
          this.fetchHeartRate(days),
          this.fetchSleepAnalysis(days),
          this.fetchActiveEnergy(days),
          this.fetchWorkouts(days),
          this.fetchDistance(days),
        ]);

      // Calculate today's steps
      const today = new Date().toISOString().split('T')[0];
      const todaySteps = steps
        .filter((s) => s.date.startsWith(today))
        .reduce((sum, s) => sum + s.value, 0);

      // Calculate heart rate stats
      const hrValues = heartRate.map((h) => h.value).filter((v) => v > 0);
      const avgHR =
        hrValues.length > 0
          ? Math.round(hrValues.reduce((a, b) => a + b, 0) / hrValues.length)
          : 0;
      const latestHR = hrValues.length > 0 ? hrValues[0] : 0;

      // Calculate last night's sleep (hours)
      const lastNightSleep = this.calculateLastNightSleep(sleep);

      // Calculate today's active energy
      const todayEnergy = activeEnergy
        .filter((e) => e.date.startsWith(today))
        .reduce((sum, e) => sum + e.value, 0);

      // Calculate today's distance
      const todayDistance = distance
        .filter((d) => d.date.startsWith(today))
        .reduce((sum, d) => sum + d.value, 0);

      return {
        steps: {
          today: Math.round(todaySteps),
          daily: steps,
        },
        heartRate: {
          latest: latestHR,
          average: avgHR,
          samples: heartRate,
        },
        sleep: {
          lastNight: lastNightSleep,
          sessions: sleep,
        },
        activeEnergy: {
          today: Math.round(todayEnergy),
          daily: activeEnergy,
        },
        workouts,
        calories: {
          today: Math.round(todayEnergy),
        },
        distance: {
          today: Math.round(todayDistance * 100) / 100,
          daily: distance,
        },
      };
    } catch (error) {
      console.error('Error fetching all health data:', error);
      return { ...EMPTY_SUMMARY };
    }
  }

  /**
   * Calculate last night's sleep in hours
   */
  private calculateLastNightSleep(sessions: SleepSession[]): number {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(18, 0, 0, 0); // Start looking from 6 PM yesterday

    const today = new Date();
    today.setHours(12, 0, 0, 0); // Until noon today

    const relevantSessions = sessions.filter((s) => {
      const start = new Date(s.startDate);
      return (
        start >= yesterday &&
        start <= today &&
        (s.value === 'ASLEEP' || s.value === 'INBED')
      );
    });

    let totalMinutes = 0;
    for (const session of relevantSessions) {
      const start = new Date(session.startDate);
      const end = new Date(session.endDate);
      totalMinutes += (end.getTime() - start.getTime()) / (1000 * 60);
    }

    return Math.round((totalMinutes / 60) * 10) / 10; // Round to 1 decimal
  }
}

// Singleton instance
export const healthKitService = new HealthKitService();
export default healthKitService;