import { supabase } from '../lib/supabase';
import type { Customer, CustomerActivity, CustomerNote } from '../types/crm';

export const CRMService = {
  async getCustomers(filters = {}) {
    let query = supabase
      .from('profiles')
      .select(`
        *,
        subscriptions (*),
        orders (*),
        progress (*)
      `)
      .eq('role', 'user')
      .order('created_at', { ascending: false });

    // Apply filters
    if (filters.subscription) {
      query = query.eq('subscriptions.plan', filters.subscription);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async getCustomerDetails(customerId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select(`
        *,
        subscriptions (*),
        orders (*),
        progress (*),
        customer_notes (*)
      `)
      .eq('id', customerId)
      .single();

    if (error) throw error;
    return data;
  },

  async addCustomerNote(customerId: string, note: string, type: string) {
    const { data, error } = await supabase
      .from('customer_notes')
      .insert({
        customer_id: customerId,
        note,
        type,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getCustomerActivity(customerId: string) {
    const { data, error } = await supabase
      .from('customer_activity')
      .select('*')
      .eq('customer_id', customerId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async trackCustomerActivity(customerId: string, activity: CustomerActivity) {
    const { data, error } = await supabase
      .from('customer_activity')
      .insert({
        customer_id: customerId,
        type: activity.type,
        description: activity.description,
        metadata: activity.metadata,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};