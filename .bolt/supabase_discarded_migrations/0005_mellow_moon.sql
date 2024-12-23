/*
  # Add onboarding fields to profiles table
  
  1. Changes
    - Add onboarding_completed field to profiles
    - Add onboarding_answers field to store user preferences
    - Add onboarding_step to track progress
*/

-- Add onboarding fields to profiles
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS onboarding_answers JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS onboarding_step INTEGER DEFAULT 0;

-- Create index for querying incomplete onboarding
CREATE INDEX IF NOT EXISTS idx_profiles_onboarding ON profiles(onboarding_completed) WHERE NOT onboarding_completed;