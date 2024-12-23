/*
  # Create memberships table with policies

  1. New Tables
    - `memberships`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `features` (jsonb)
      - `price_monthly` (integer)
      - `price_yearly` (integer)
      - `status` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS
    - Add policy for public read access
*/

-- Drop existing policy if it exists
DO $$ 
BEGIN
    DROP POLICY IF EXISTS "Memberships are viewable by everyone" ON public.memberships;
EXCEPTION
    WHEN undefined_object THEN NULL;
END $$;

-- Create memberships table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.memberships (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    features JSONB NOT NULL,
    price_monthly INTEGER NOT NULL,
    price_yearly INTEGER NOT NULL,
    status TEXT CHECK (status IN ('active', 'inactive')) DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.memberships ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Memberships are viewable by everyone"
    ON public.memberships
    FOR SELECT
    USING (true);

-- Insert initial memberships if they don't exist
INSERT INTO public.memberships (name, description, features, price_monthly, price_yearly)
SELECT
    'Basic',
    'Get started with essential features',
    '["App workouts", "Progress tracking", "Basic nutrition guide"]'::jsonb,
    1999,
    19990
WHERE NOT EXISTS (
    SELECT 1 FROM public.memberships WHERE name = 'Basic'
);

INSERT INTO public.memberships (name, description, features, price_monthly, price_yearly)
SELECT
    'Pro',
    'Perfect for dedicated fitness enthusiasts',
    '["Everything in Basic", "Custom workout plans", "Nutrition coaching", "Priority support"]'::jsonb,
    4999,
    49990
WHERE NOT EXISTS (
    SELECT 1 FROM public.memberships WHERE name = 'Pro'
);

INSERT INTO public.memberships (name, description, features, price_monthly, price_yearly)
SELECT
    'Elite',
    'Ultimate fitness experience',
    '["Everything in Pro", "1-on-1 coaching", "Personalized meal plans", "Video form checks"]'::jsonb,
    9999,
    99990
WHERE NOT EXISTS (
    SELECT 1 FROM public.memberships WHERE name = 'Elite'
);