/*
  # User Profile Schema

  1. New Tables
    - `user_profiles`
      - `id` (uuid, primary key, references auth.users)
      - `display_name` (text)
      - `bio` (text)
      - `avatar_url` (text)
      - `fitness_level` (enum)
      - `goals` (jsonb)
      - `availability` (jsonb)
      - `measurements` (jsonb)
      - `preferences` (jsonb)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `user_measurements`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `date` (date)
      - `weight` (decimal)
      - `body_fat` (decimal)
      - `measurements` (jsonb)
      - `notes` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for user access
*/

-- Create enum types
CREATE TYPE fitness_level AS ENUM ('beginner', 'intermediate', 'advanced');

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  display_name TEXT,
  bio TEXT,
  avatar_url TEXT,
  fitness_level fitness_level,
  goals JSONB DEFAULT '[]',
  availability JSONB DEFAULT '{}',
  measurements JSONB DEFAULT '{}',
  preferences JSONB DEFAULT '{}',
  onboarding_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create user_measurements table
CREATE TABLE IF NOT EXISTS user_measurements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  weight DECIMAL(5,2),
  body_fat DECIMAL(4,1),
  measurements JSONB DEFAULT '{}',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_measurements ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own profile"
  ON user_profiles
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON user_profiles
  FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can view their own measurements"
  ON user_measurements
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own measurements"
  ON user_measurements
  FOR ALL
  USING (auth.uid() = user_id);

-- Create indexes
CREATE INDEX idx_user_measurements_user_date ON user_measurements(user_id, date);

-- Create function to handle profile updates
CREATE OR REPLACE FUNCTION handle_profile_update()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for profile updates
CREATE TRIGGER update_user_profile_timestamp
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION handle_profile_update();