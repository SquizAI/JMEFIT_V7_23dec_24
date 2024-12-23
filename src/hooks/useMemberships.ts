import { useState, useEffect } from 'react';
import { MembershipService } from '../services/memberships';
import type { Database } from '../types/supabase';

type Membership = Database['public']['Tables']['memberships']['Row'];

export function useMemberships() {
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMemberships = async () => {
      try {
        setLoading(true);
        const data = await MembershipService.getMemberships();
        setMemberships(data);
        setError(null);
      } catch (err) {
        console.error('Error loading memberships:', err);
        setError(err instanceof Error ? err.message : 'Failed to load memberships');
      } finally {
        setLoading(false);
      }
    };

    loadMemberships();
  }, []);

  return { memberships, loading, error };
}