/*
  # Fix memberships table schema

  1. Changes
    - Drop and recreate memberships table with correct schema
    - Add RLS policies
    - Insert initial membership data
*/

-- Drop existing table and policies
DROP TABLE IF EXISTS public.memberships CASCADE;

-- Create memberships table
CREATE TABLE public.memberships (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    features JSONB NOT NULL DEFAULT '[]'::jsonb,
    price_monthly INTEGER NOT NULL,
    price_yearly INTEGER NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('active', 'inactive')) DEFAULT 'active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.memberships ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "memberships_read_policy"
    ON public.memberships
    FOR SELECT
    USING (true);

-- Insert initial memberships
INSERT INTO public.memberships (name, description, features, price_monthly, price_yearly)
VALUES
    (
        'Basic',
        'Get started with essential features',
        '["App workouts", "Progress tracking", "Basic nutrition guide"]',
        1999,
        19990
    ),
    (
        'Pro',
        'Perfect for dedicated fitness enthusiasts',
        '["Everything in Basic", "Custom workout plans", "Nutrition coaching", "Priority support"]',
        4999,
        49990
    ),
    (
        'Elite',
        'Ultimate fitness experience',
        '["Everything in Pro", "1-on-1 coaching", "Personalized meal plans", "Video form checks"]',
        9999,
        99990
    );