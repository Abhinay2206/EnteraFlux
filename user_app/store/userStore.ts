import { create } from 'zustand';

interface User {
  _id: string;
  name: string;
  age: number;
  email: string;
  onboarding_completed: boolean;
}

interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));