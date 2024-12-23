import { supabase } from '../lib/supabase';
import { Content } from '../types/content';

export const ContentService = {
  async createContent(data: Partial<Content>) {
    const { data: content, error } = await supabase
      .from('content')
      .insert([{
        ...data,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) throw error;
    return content;
  },

  async getContent(filters = {}) {
    let query = supabase
      .from('content')
      .select('*')
      .order('created_at', { ascending: false });

    if (filters.category) {
      query = query.eq('category', filters.category);
    }

    if (filters.accessLevel) {
      query = query.eq('access_level', filters.accessLevel);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async updateContent(id: string, data: Partial<Content>) {
    const { data: content, error } = await supabase
      .from('content')
      .update({
        ...data,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return content;
  },

  async deleteContent(id: string) {
    const { error } = await supabase
      .from('content')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};