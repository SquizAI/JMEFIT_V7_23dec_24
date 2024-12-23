/*
  # Add memberships tables and policies

  1. New Tables
    - `memberships`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `features` (jsonb array)
      - `price_monthly` (numeric)
      - `price_yearly` (numeric)
      - `status` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `memberships` table
    - Add policy for public read access
    - Add policy for admin write access
*/

-- Create memberships table
CREATE TABLE IF NOT EXISTS public.memberships (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  features JSONB NOT NULL DEFAULT '[]',
  price_monthly NUMERIC(10,2) NOT NULL,
  price_yearly NUMERIC(10,2) NOT NULL,
  status TEXT CHECK (status IN ('active', 'inactive')) DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.memberships ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Memberships are viewable by everyone" 
  ON public.memberships FOR SELECT 
  USING (true);

CREATE POLICY "Only admins can modify memberships" 
  ON public.memberships FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Insert default memberships
INSERT INTO public.memberships (name, description, features, price_monthly, price_yearly, status)
VALUES
  (
    'App Workouts',
    'Access expert-designed workouts with video guidance',
    '[
      "New workouts every month",
      "Choose 3-5 day splits",
      "Video exercise guides",
      "Progress tracking",
      "Basic support"
    ]'::jsonb,
    29.99,
    299.99,
    'active'
  ),
  (
    'Trainer Support',
    'Get personalized feedback and guidance',
    '[
      "Everything in App Workouts",
      "Direct messaging with trainer",
      "Form check videos",
      "Custom modifications",
      "Priority support"
    ]'::jsonb,
    99.99,
    999.99,
    'active'
  ),
  (
    'Elite Package',
    'Complete transformation package with full support',
    '[
      "Everything in Trainer Support",
      "Custom meal plans",
      "Weekly check-ins",
      "Nutrition guidance",
      "24/7 VIP support"
    ]'::jsonb,
    199.99,
    1999.99,
    'active'
  );