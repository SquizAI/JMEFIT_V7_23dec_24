/*
  # Create memberships table and initial data
  
  1. Changes
    - Create memberships table with text[] features column
    - Enable RLS
    - Add public read policy
    - Insert initial membership data
  
  2. Security
    - Enable RLS on memberships table
    - Add policy for public read access
*/

-- Drop existing policy if it exists
DO $$ BEGIN
    DROP POLICY IF EXISTS "Memberships are viewable by everyone" ON public.memberships;
EXCEPTION
    WHEN undefined_object THEN null;
END $$;

-- Create memberships table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.memberships (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    features TEXT[] NOT NULL DEFAULT '{}',
    price_monthly NUMERIC(10,2) NOT NULL,
    price_yearly NUMERIC(10,2) NOT NULL,
    status TEXT CHECK (status IN ('active', 'inactive')) DEFAULT 'active',
    popular BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.memberships ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Memberships are viewable by everyone" 
    ON public.memberships FOR SELECT 
    USING (true);

-- Insert initial membership data
INSERT INTO public.memberships (name, description, features, price_monthly, price_yearly, popular)
VALUES
    ('Basic', 'Get started with essential features', 
     ARRAY['Access to workout library', 'Basic progress tracking', 'Community support'],
     29.99, 299.99, false),
    ('Pro', 'Perfect for dedicated fitness enthusiasts', 
     ARRAY['Everything in Basic', 'Custom workout plans', 'Nutrition guidance', 'Priority support'],
     49.99, 499.99, true),
    ('Elite', 'Ultimate fitness experience', 
     ARRAY['Everything in Pro', '1-on-1 coaching', 'Personalized meal plans', 'Weekly check-ins'],
     99.99, 999.99, false);