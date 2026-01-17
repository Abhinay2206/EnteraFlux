// Mock API implementation - returns fake data instead of making network requests

// Generate a fake ID
const generateId = () => `mock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

// Simulate API delay
const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

interface User {
  _id: string;
  name: string;
  age: number;
  email: string;
  onboarding_completed: boolean;
  created_at: string;
}

interface Medication {
  _id: string;
  user_id: string;
  drug_name: string;
  dosage: string;
  frequency: string;
  injection_day: string;
  injection_time: string;
  start_date: string;
}

// Mock data store
const mockStore = {
  users: [] as User[],
  medications: [] as Medication[],
  biometrics: [] as any[],
  symptoms: [] as any[],
  meals: [] as any[],
  workouts: [] as any[],
  alerts: [] as any[],
  education: [] as any[],
};

export const mockApi = {
  // Users
  createUser: async (data: { name: string; age: number; email: string }): Promise<User> => {
    await delay();
    const user: User = {
      _id: generateId(),
      ...data,
      onboarding_completed: false,
      created_at: new Date().toISOString(),
    };
    mockStore.users.push(user);
    console.log('✅ Mock: Created user', user);
    return user;
  },

  getUser: async (userId: string): Promise<User | null> => {
    await delay(300);
    const user = mockStore.users.find(u => u._id === userId);
    console.log('✅ Mock: Retrieved user', user);
    return user || null;
  },

  completeOnboarding: async (userId: string): Promise<User | null> => {
    await delay(300);
    const user = mockStore.users.find(u => u._id === userId);
    if (user) {
      user.onboarding_completed = true;
      console.log('✅ Mock: Completed onboarding for user', user);
    }
    return user || null;
  },

  // Medications
  createMedication: async (data: any): Promise<Medication> => {
    await delay();
    const medication: Medication = {
      _id: generateId(),
      ...data,
    };
    mockStore.medications.push(medication);
    console.log('✅ Mock: Created medication', medication);
    return medication;
  },

  getUserMedications: async (userId: string): Promise<Medication[]> => {
    await delay(300);
    const medications = mockStore.medications.filter(m => m.user_id === userId);
    console.log('✅ Mock: Retrieved medications', medications);
    return medications;
  },

  // Biometrics
  createBiometric: async (data: any) => {
    await delay();
    const biometric = { _id: generateId(), ...data };
    mockStore.biometrics.push(biometric);
    console.log('✅ Mock: Created biometric', biometric);
    return biometric;
  },

  getUserBiometrics: async (userId: string, days: number = 7) => {
    await delay(300);
    const biometrics = mockStore.biometrics.filter(b => b.user_id === userId);
    console.log('✅ Mock: Retrieved biometrics', biometrics);
    return biometrics;
  },

  // Symptoms
  createSymptom: async (data: any) => {
    await delay();
    const symptom = { _id: generateId(), ...data };
    mockStore.symptoms.push(symptom);
    console.log('✅ Mock: Created symptom', symptom);
    return symptom;
  },

  getUserSymptoms: async (userId: string, days: number = 7) => {
    await delay(300);
    const symptoms = mockStore.symptoms.filter(s => s.user_id === userId);
    console.log('✅ Mock: Retrieved symptoms', symptoms);
    return symptoms;
  },

  // Meals
  createMeal: async (data: any) => {
    await delay();
    const meal = { _id: generateId(), ...data };
    mockStore.meals.push(meal);
    console.log('✅ Mock: Created meal', meal);
    return meal;
  },

  getUserMeals: async (userId: string, days: number = 7) => {
    await delay(300);
    const meals = mockStore.meals.filter(m => m.user_id === userId);
    console.log('✅ Mock: Retrieved meals', meals);
    return meals;
  },

  // Workouts
  createWorkout: async (data: any) => {
    await delay();
    const workout = { _id: generateId(), ...data };
    mockStore.workouts.push(workout);
    console.log('✅ Mock: Created workout', workout);
    return workout;
  },

  getUserWorkouts: async (userId: string, days: number = 7) => {
    await delay(300);
    const workouts = mockStore.workouts.filter(w => w.user_id === userId);
    console.log('✅ Mock: Retrieved workouts', workouts);
    return workouts;
  },

  // Alerts
  getUserAlerts: async (userId: string) => {
    await delay(300);
    const alerts = mockStore.alerts.filter(a => a.user_id === userId);
    console.log('✅ Mock: Retrieved alerts', alerts);
    return alerts;
  },

  acknowledgeAlert: async (alertId: string) => {
    await delay(300);
    const alert = mockStore.alerts.find(a => a._id === alertId);
    if (alert) {
      alert.acknowledged = true;
      console.log('✅ Mock: Acknowledged alert', alert);
    }
    return alert;
  },

  // Education
  getEducation: async (category?: string) => {
    await delay(300);

    // Return mock education content
    const mockEducation = [
      {
        _id: 'edu_1',
        title: 'Understanding GLP-1 Medications',
        category: 'medication',
        content: 'Learn about how GLP-1 receptor agonists work...',
        image_url: 'https://via.placeholder.com/300x200',
      },
      {
        _id: 'edu_2',
        title: 'Managing Side Effects',
        category: 'side-effects',
        content: 'Common side effects and how to manage them...',
        image_url: 'https://via.placeholder.com/300x200',
      },
      {
        _id: 'edu_3',
        title: 'Diet and Nutrition Tips',
        category: 'nutrition',
        content: 'Optimize your diet while on GLP-1 medications...',
        image_url: 'https://via.placeholder.com/300x200',
      },
    ];

    const filtered = category
      ? mockEducation.filter(e => e.category === category)
      : mockEducation;

    console.log('✅ Mock: Retrieved education content', filtered);
    return filtered;
  },

  getEducationDetail: async (contentId: string) => {
    await delay(300);
    const content = {
      _id: contentId,
      title: 'Sample Education Content',
      category: 'general',
      content: 'Detailed information about GLP-1 medications...',
      image_url: 'https://via.placeholder.com/300x200',
    };
    console.log('✅ Mock: Retrieved education detail', content);
    return content;
  },

  // Dashboard
  getDashboard: async (userId: string) => {
    await delay(500);

    const mockDashboard = {
      user: mockStore.users.find(u => u._id === userId),
      nextInjection: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      alerts: [],
      recentBiometrics: [],
      medicationAdherence: 95,
    };

    console.log('✅ Mock: Retrieved dashboard', mockDashboard);
    return mockDashboard;
  },

  // Seed education
  seedEducation: async () => {
    await delay(300);
    console.log('✅ Mock: Education seeded (no-op)');
    return { message: 'Mock education seeded' };
  },
};

// Export the mock API as the main export
export const api = mockApi;
export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public endpoint?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}