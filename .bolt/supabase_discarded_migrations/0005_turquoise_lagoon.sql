/*
  # Add CRM Tables

  1. New Tables
    - `customer_notes` - Store notes and interactions with customers
    - `customer_activity` - Track customer actions and engagement
  
  2. Changes
    - Add last_login to profiles table
    
  3. Security
    - Enable RLS on new tables
    - Add policies for admin access
*/

-- Add last_login to profiles
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS last_login TIMESTAMPTZ;

-- Customer Notes
CREATE TABLE IF NOT EXISTS customer_notes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  note TEXT NOT NULL,
  type TEXT CHECK (type IN ('general', 'support', 'billing', 'training')) NOT NULL,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Customer Activity
CREATE TABLE IF NOT EXISTS customer_activity (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT CHECK (type IN ('login', 'purchase', 'support', 'training', 'progress')) NOT NULL,
  description TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE customer_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_activity ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Admins can manage customer notes"
  ON customer_notes
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can view customer activity"
  ON customer_activity
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_customer_notes_customer ON customer_notes(customer_id);
CREATE INDEX IF NOT EXISTS idx_customer_activity_customer ON customer_activity(customer_id);
CREATE INDEX IF NOT EXISTS idx_customer_activity_type ON customer_activity(type);