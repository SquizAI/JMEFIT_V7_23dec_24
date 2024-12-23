import { supabase } from '../lib/supabase';
import type { UserProfile, UserMeasurements } from '../types/profile';

export const ProfileService = {
  async getProfile(userId: string) {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data;
  },

  async updateProfile(userId: string, profile: Partial<UserProfile>) {
    const { data, error } = await supabase
      .from('user_profiles')
      .update(profile)
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async addMeasurement(userId: string, measurement: Omit<UserMeasurements, 'id'>) {
    const { data, error } = await supabase
      .from('user_measurements')
      .insert({
        user_id: userId,
        ...measurement
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getMeasurements(userId: string, startDate?: string, endDate?: string) {
    let query = supabase
      .from('user_measurements')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false });

    if (startDate && endDate) {
      query = query
        .gte('date', startDate)
        .lte('date', endDate);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async completeOnboarding(userId: string, data: {
    fitnessLevel: string;
    goals: any[];
    availability: any;
  }) {
    const { error } = await supabase
      .from('user_profiles')
      .update({
        fitness_level: data.fitnessLevel,
        goals: data.goals,
        availability: data.availability,
        onboarding_completed: true
      })
      .eq('id', userId);

    if (error) throw error;
  }
};