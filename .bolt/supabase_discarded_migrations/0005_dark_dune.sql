/*
  # Add profile fields

  1. New Fields
    - `bio` (text): User's biography/description
    - `fitness_level` (text): User's fitness level (beginner/intermediate/advanced)
    - `goals` (jsonb): Array of user's fitness goals
    - `availability` (jsonb): User's training schedule preferences
    - `onboarding_completed` (boolean): Whether user has completed onboarding
    - `measurements` (jsonb): User's body measurements history

  2. Security
    - Update RLS policies for new fields
*/

-- Add new columns to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS bio TEXT,
ADD COLUMN IF NOT EXISTS fitness_level TEXT CHECK (fitness_level IN ('beginner', 'intermediate', 'advanced')),
ADD COLUMN IF NOT EXISTS goals JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS availability JSONB,
ADD COLUMN IF NOT EXISTS measurements JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT false;

-- Update RLS policies
DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

CREATE POLICY "Users can read own profile"
ON public.profiles
FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
ON public.profiles
FOR UPDATE
USING (auth.uid() = id);

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_profiles_fitness_level ON public.profiles(fitness_level);
CREATE INDEX IF NOT EXISTS idx_profiles_onboarding_completed ON public.profiles(onboarding_completed);