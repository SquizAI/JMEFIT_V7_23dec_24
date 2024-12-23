import { useState, useEffect } from 'react';
import { ProductService } from '../services/products';
import type { Database } from '../types/supabase';

type Product = Database['public']['Tables']['products']['Row'];
type Membership = Database['public']['Tables']['memberships']['Row'];

export function useProducts(categorySlug?: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await ProductService.getProducts(categorySlug);
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [categorySlug]);

  return { products, loading, error };
}

export function useMemberships() {
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMemberships = async () => {
      try {
        const data = await ProductService.getMemberships();
        setMemberships(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load memberships');
      } finally {
        setLoading(false);
      }
    };

    loadMemberships();
  }, []);

  return { memberships, loading, error };
}