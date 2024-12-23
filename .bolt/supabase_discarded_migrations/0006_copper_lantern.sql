/*
  # Add memberships table and initial data

  1. New Tables
    - `memberships`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `features` (jsonb)
      - `price_monthly` (numeric)
      - `price_yearly` (numeric)
      - `status` (text)
      - `popular` (boolean)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `memberships` table
    - Add policy for public read access
*/

-- Create memberships table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.memberships (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    features JSONB NOT NULL,
    price_monthly NUMERIC(10,2) NOT NULL,
    price_yearly NUMERIC(10,2) NOT NULL,
    status TEXT CHECK (status IN ('active', 'inactive')) DEFAULT 'active',
    popular BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.memberships ENABLE ROW LEVEL SECURITY;

-- Drop existing policy if it exists
DROP POLICY IF EXISTS "Memberships are viewable by everyone" ON public.memberships;

-- Create policy for public read access
CREATE POLICY "Memberships are viewable by everyone" ON public.memberships
    FOR SELECT USING (true);

-- Delete existing data if any exists
DELETE FROM public.memberships;

-- Insert initial membership data
INSERT INTO public.memberships (name, description, features, price_monthly, price_yearly, popular) VALUES
(
    'Basic',
    'Perfect for getting started',
    '["App Access", "Workout Library", "Progress Tracking"]'::jsonb,
    29.99,
    299.99,
    false
),
(
    'Plus',
    'Most popular for serious trainers',
    '["App Access", "Workout Library", "Progress Tracking", "Nutrition Guides", "Form Checks", "Direct Messaging"]'::jsonb,
    49.99,
    499.99,
    true
),
(
    'Elite',
    'Complete transformation package',
    '["App Access", "Workout Library", "Progress Tracking", "Nutrition Guides", "Form Checks", "Direct Messaging", "Custom Meal Plans", "Priority Support"]'::jsonb,
    99.99,
    999.99,
    false
);