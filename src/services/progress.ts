import { supabase } from '../config/supabase';

export interface ProgressEntry {
  userId: string;
  date: Date;
  weight?: number;
  bodyFat?: number;
  measurements?: {
    chest?: number;
    waist?: number;
    hips?: number;
    arms?: number;
    thighs?: number;
  };
  notes?: string;
}

export const ProgressService = {
  async addEntry(data: ProgressEntry) {
    const { error } = await supabase
      .from('progress')
      .insert([{
        user_id: data.userId,
        date: data.date.toISOString(),
        weight: data.weight,
        body_fat: data.bodyFat,
        measurements: data.measurements,
        notes: data.notes
      }]);

    if (error) throw error;
  },

  async getUserProgress(userId: string, startDate?: Date, endDate?: Date) {
    let query = supabase
      .from('progress')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: true });

    if (startDate && endDate) {
      query = query
        .gte('date', startDate.toISOString())
        .lte('date', endDate.toISOString());
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async getLatestEntry(userId: string) {
    const { data, error } = await supabase
      .from('progress')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false })
      .limit(1)
      .single();

    if (error) throw error;
    return data;
  }
};