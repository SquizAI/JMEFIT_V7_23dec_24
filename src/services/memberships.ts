import { supabase } from '../lib/supabase';
import type { Database } from '../types/supabase';

type Membership = Database['public']['Tables']['memberships']['Row'];

const parseFeatures = (features: any): string[] => {
  if (Array.isArray(features)) return features;
  if (typeof features === 'string') {
    try {
      return JSON.parse(features);
    } catch (err) {
      console.error('Error parsing features:', err);
      return [];
    }
  }
  return [];
};

export const MembershipService = {
  async getMemberships(): Promise<Membership[]> {
    try {
      const { data: memberships, error } = await supabase
        .from('memberships')
        .select('*')
        .eq('status', 'active')
        .order('price_monthly');

      if (error) {
        throw new Error(`Failed to load memberships: ${error.message}`);
      }

      // Parse features JSON if needed
      return (memberships || []).map(membership => ({
        ...membership,
        features: typeof membership.features === 'string' 
          ? JSON.parse(membership.features) 
          : membership.features
      }));
    } catch (err) {
      console.error('Unexpected error in getMemberships:', err);
      throw err;
    }
  }
};