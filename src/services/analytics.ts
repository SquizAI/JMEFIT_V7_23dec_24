import { supabase } from '../lib/supabase';

export const AnalyticsService = {
  async trackPageView(userId: string, pageId: string) {
    await supabase
      .from('analytics')
      .insert([{
        user_id: userId,
        page_id: pageId,
        event_type: 'page_view'
      }]);
  },

  async trackWorkoutCompletion(userId: string, workoutId: string, duration: number) {
    await supabase
      .from('workout_completions')
      .insert([{
        user_id: userId,
        workout_id: workoutId,
        duration,
        completed_at: new Date().toISOString()
      }]);
  },

  async getUserEngagement(userId: string, startDate?: Date, endDate?: Date) {
    let query = supabase
      .from('analytics')
      .select('*')
      .eq('user_id', userId);

    if (startDate && endDate) {
      query = query
        .gte('created_at', startDate.toISOString())
        .lte('created_at', endDate.toISOString());
    }

    const { data } = await query;
    return data;
  },

  async getContentPerformance(contentId: string) {
    const { data: views } = await supabase
      .from('analytics')
      .select('*')
      .eq('page_id', contentId)
      .eq('event_type', 'page_view');

    const { data: completions } = await supabase
      .from('workout_completions')
      .select('*')
      .eq('workout_id', contentId);

    return {
      views: views?.length || 0,
      completions: completions?.length || 0
    };
  }
};