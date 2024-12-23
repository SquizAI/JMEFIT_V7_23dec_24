/*
  # Standardize Program Offerings

  1. New Tables
    - `programs` - Core program offerings and pricing
    - `program_features` - Detailed features for each program
    
  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
*/

-- Programs table
CREATE TABLE IF NOT EXISTS public.programs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text CHECK (type IN ('recurring', 'one-time')) NOT NULL,
  duration text NOT NULL,
  price_monthly numeric(10,2),
  price_one_time numeric(10,2),
  description text,
  status text CHECK (status IN ('active', 'inactive')) DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Program features
CREATE TABLE IF NOT EXISTS public.program_features (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id uuid REFERENCES public.programs(id) ON DELETE CASCADE,
  feature text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.program_features ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Programs are viewable by everyone"
  ON public.programs FOR SELECT
  USING (true);

CREATE POLICY "Program features are viewable by everyone"
  ON public.program_features FOR SELECT
  USING (true);

-- Insert standard programs
INSERT INTO public.programs (name, type, duration, price_monthly, price_one_time, description) VALUES
  ('App Workouts - Self Led', 'recurring', 'Monthly', 29.99, NULL, 'Self-guided app-based workouts with video guidance'),
  ('App Workouts - Trainer Feedback', 'recurring', 'Monthly', 49.99, NULL, 'App workouts with personal trainer feedback'),
  ('Nutrition Only', 'recurring', '12 weeks', NULL, 199.99, 'Comprehensive nutrition coaching program'),
  ('Plus Membership', 'recurring', '12 weeks', NULL, 349.99, 'Complete fitness and nutrition transformation package'),
  ('SHRED Program', 'one-time', '6 weeks', NULL, 149.99, '6-week intensive transformation program'),
  ('One-Time Macros with Guidebook', 'one-time', 'Lifetime', NULL, 49.99, 'Custom macro calculation with comprehensive guidebook');

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_programs_type ON public.programs(type);
CREATE INDEX IF NOT EXISTS idx_programs_status ON public.programs(status);