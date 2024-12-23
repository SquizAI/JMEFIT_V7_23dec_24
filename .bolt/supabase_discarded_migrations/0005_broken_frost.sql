/*
  # Add profile fields

  1. New Fields
    - Adds bio, fitness_level, goals, availability fields to profiles table
    - Adds onboarding_completed flag
  
  2. Security
    - Updates RLS policies for new fields
*/

-- Add new fields to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS bio TEXT,
ADD COLUMN IF NOT EXISTS fitness_level TEXT CHECK (fitness_level IN ('beginner', 'intermediate', 'advanced')),
ADD COLUMN IF NOT EXISTS goals JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS availability JSONB,
ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT false;

-- Update RLS policies
CREATE POLICY "Users can read own profile"
ON public.profiles
FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
ON public.profiles
FOR UPDATE
USING (auth.uid() = id);