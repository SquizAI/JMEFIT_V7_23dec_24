import { supabase } from '../lib/supabase';
import type { PostgrestError } from '@supabase/supabase-js';

export const db = supabase;

export type DbResult<T> = T extends PromiseLike<infer U> ? U : never;
export type DbResultOk<T> = T extends PromiseLike<{ data: infer U }> ? Exclude<U, null> : never;
export type DbResultErr = PostgrestError;

export const DatabaseService = {
  async getOne<T>(table: string, id: string): Promise<T | null> {
    const { data, error } = await db
      .from(table)
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  async getAll<T>(table: string, options: {
    filters?: Record<string, any>;
    orderBy?: [string, 'asc' | 'desc'];
    limit?: number;
  } = {}): Promise<T[]> {
    let query = db
      .from(table)
      .select('*');

    if (options.filters) {
      Object.entries(options.filters).forEach(([key, value]) => {
        query = query.eq(key, value);
      });
    }

    if (options.orderBy) {
      query = query.order(options.orderBy[0], { ascending: options.orderBy[1] === 'asc' });
    }

    if (options.limit) {
      query = query.limit(options.limit);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  },

  async create<T>(table: string, data: any): Promise<T> {
    const { data: result, error } = await db
      .from(table)
      .insert([{
        ...data,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) throw error;
    return result;
  },

  async update<T>(table: string, id: string, data: any): Promise<T> {
    const { data: result, error } = await db
      .from(table)
      .update({
        ...data,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return result;
  },

  async delete(table: string, id: string): Promise<void> {
    const { error } = await db
      .from(table)
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};