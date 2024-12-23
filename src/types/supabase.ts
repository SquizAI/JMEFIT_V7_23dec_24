export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          display_name: string | null
          role: 'user' | 'admin' | 'trainer'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          display_name?: string | null
          role?: 'user' | 'admin' | 'trainer'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          display_name?: string | null
          role?: 'user' | 'admin' | 'trainer'
          created_at?: string
          updated_at?: string
        }
      }
      memberships: {
        Row: {
          id: string
          name: string
          description: string
          features: Json
          price_monthly: number
          price_yearly: number
          status: string
          created_at: string
          updated_at: string
          popular: boolean
        }
        Insert: {
          id?: string
          name: string
          description: string
          features?: Json
          price_monthly: number
          price_yearly: number
          status?: string
          created_at?: string
          updated_at?: string
          popular?: boolean
        }
        Update: {
          id?: string
          name?: string
          description?: string
          features?: Json
          price_monthly?: number
          price_yearly?: number
          status?: string
          created_at?: string
          updated_at?: string
          popular?: boolean
        }
      }
      products: {
        Row: {
          id: string
          name: string
          description: string | null
          price: number
          status: 'active' | 'inactive' | 'out_of_stock'
          images: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          price: number
          status?: 'active' | 'inactive' | 'out_of_stock'
          images?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          price?: number
          status?: 'active' | 'inactive' | 'out_of_stock'
          images?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
      // Add other table definitions as needed
    }
  }
}