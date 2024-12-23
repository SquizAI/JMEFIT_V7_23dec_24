import { supabase } from '../lib/supabase';
import type { 
  Membership, 
  Program, 
  Product, 
  ProductCategory,
  MembershipInterval 
} from '../types/products';

export const ProductService = {
  // Memberships
  async getMemberships() {
    const { data: memberships, error } = await supabase
      .from('memberships')
      .select('*')
      .eq('status', 'active')
      .order('price_monthly', { ascending: true });

    if (error) throw error;
    return memberships;
  },

  async getMembershipBySlug(slug: string) {
    const { data, error } = await supabase
      .from('memberships')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) throw error;
    return data;
  },

  // Programs
  async getPrograms() {
    const { data, error } = await supabase
      .from('programs')
      .select('*')
      .eq('status', 'active')
      .order('price', { ascending: true });

    if (error) throw error;
    return data;
  },

  async getProgramBySlug(slug: string) {
    const { data, error } = await supabase
      .from('programs')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) throw error;
    return data;
  },

  // Products
  async getProducts(categorySlug?: string) {
    let query = supabase
      .from('products') 
      .select('*')
      .eq('status', 'active');

    const { data, error } = await query.order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async getProductBySlug(slug: string) {
    const { data: products, error } = await supabase
      .from('products')
      .select('*')
      .eq('name', slug) // Using name instead of slug for now
      .single();

    if (error) throw error;
    return products;
  }
};