/*
  # Profile Schema Update

  1. New Tables
    - `user_measurements`
      - Tracks user body measurements over time
      - Includes weight, body fat, and other metrics
    - `user_goals`
      - Stores user fitness goals and targets
    - `user_preferences`
      - Stores user settings and preferences
    - `user_availability`
      - Tracks user training schedule preferences

  2. Updates to Profiles Table
    - Add fitness level and onboarding fields
    - Add profile completion tracking

  3. Security
    - Enable RLS on all new tables
    - Add policies for user access
*/

-- Add new fields to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS fitness_level TEXT CHECK (fitness_level IN ('beginner', 'intermediate', 'advanced'));
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT false;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS profile_completed BOOLEAN DEFAULT false;

-- User measurements table
CREATE TABLE IF NOT EXISTS user_measurements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  weight DECIMAL(5,2),
  body_fat DECIMAL(4,1),
  measurements JSONB,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User goals table
CREATE TABLE IF NOT EXISTS user_goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  target TEXT,
  deadline DATE,
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User preferences table
CREATE TABLE IF NOT EXISTS user_preferences (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  notifications JSONB DEFAULT '{"email": true, "push": true, "sms": false}',
  workout_preferences JSONB,
  dietary_restrictions TEXT[],
  units TEXT CHECK (units IN ('metric', 'imperial')) DEFAULT 'imperial',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User availability table
CREATE TABLE IF NOT EXISTS user_availability (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  days_per_week INTEGER CHECK (days_per_week BETWEEN 1 AND 7),
  preferred_times TEXT[],
  timezone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE user_measurements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_availability ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can manage their own measurements"
  ON user_measurements FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own goals"
  ON user_goals FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own preferences"
  ON user_preferences FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own availability"
  ON user_availability FOR ALL
  USING (auth.uid() = user_id);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_measurements_user_date ON user_measurements(user_id, date);
CREATE INDEX IF NOT EXISTS idx_goals_user_type ON user_goals(user_id, type);
CREATE INDEX IF NOT EXISTS idx_goals_deadline ON user_goals(deadline) WHERE NOT completed;