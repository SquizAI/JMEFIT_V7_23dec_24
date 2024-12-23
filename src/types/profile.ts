export type FitnessLevel = 'beginner' | 'intermediate' | 'advanced';

export interface UserGoal {
  type: 'weight-loss' | 'muscle-gain' | 'strength' | 'endurance';
  target?: string;
  deadline?: string;
}

export interface UserAvailability {
  daysPerWeek: number;
  preferredTimes: string[];
  timezone: string;
}

export interface UserMeasurements {
  height?: number;
  weight?: number;
  bodyFat?: number;
  chest?: number;
  waist?: number;
  hips?: number;
  arms?: number;
  thighs?: number;
  date: string;
  notes?: string;
}

export interface UserPreferences {
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  workoutPreferences: {
    location: 'gym' | 'home' | 'both';
    equipment: string[];
    focusAreas: string[];
  };
  dietaryRestrictions: string[];
  units: 'metric' | 'imperial';
}

export interface UserProfile {
  id: string;
  displayName: string;
  bio?: string;
  avatarUrl?: string;
  fitnessLevel: FitnessLevel;
  goals: UserGoal[];
  availability: UserAvailability;
  measurements: UserMeasurements[];
  preferences: UserPreferences;
  onboardingCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}