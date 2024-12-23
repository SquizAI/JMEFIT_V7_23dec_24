/*
  # Add CRM and Customer Management Tables

  1. New Tables
    - `customer_notes` - Store customer interactions and internal notes
    - `customer_activity` - Track customer engagement and actions
    - `customer_segments` - Define customer segments for targeting
    - `customer_tags` - Flexible customer categorization
  
  2. Changes
    - Add last_login and metadata to profiles table
    - Add customer segment and status tracking
    
  3. Security
    - Enable RLS on all new tables
    - Add policies for admin and staff access
    - Ensure data isolation between customers
*/

-- Add customer management fields to profiles
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS last_login TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS status TEXT CHECK (status IN ('active', 'inactive', 'suspended')) DEFAULT 'active',
ADD COLUMN IF NOT EXISTS customer_segment TEXT;

-- Customer Notes
CREATE TABLE IF NOT EXISTS customer_notes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  note TEXT NOT NULL,
  type TEXT CHECK (type IN ('general', 'support', 'billing', 'training', 'sales')) NOT NULL,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'
);

-- Customer Activity
CREATE TABLE IF NOT EXISTS customer_activity (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT CHECK (type IN (
    'login', 'purchase', 'support', 'training', 'progress',
    'subscription_change', 'profile_update', 'content_access'
  )) NOT NULL,
  description TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Customer Segments
CREATE TABLE IF NOT EXISTS customer_segments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  criteria JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Customer Tags
CREATE TABLE IF NOT EXISTS customer_tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  tag TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(customer_id, tag)
);

-- Enable RLS
ALTER TABLE customer_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_segments ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_tags ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Admins can manage customer notes"
  ON customer_notes
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('admin', 'staff')
    )
  );

CREATE POLICY "Admins can view customer activity"
  ON customer_activity
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('admin', 'staff')
    )
  );

CREATE POLICY "Admins can manage customer segments"
  ON customer_segments
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can manage customer tags"
  ON customer_tags
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('admin', 'staff')
    )
  );

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_customer_notes_customer ON customer_notes(customer_id);
CREATE INDEX IF NOT EXISTS idx_customer_notes_type ON customer_notes(type);
CREATE INDEX IF NOT EXISTS idx_customer_activity_customer ON customer_activity(customer_id);
CREATE INDEX IF NOT EXISTS idx_customer_activity_type ON customer_activity(type);
CREATE INDEX IF NOT EXISTS idx_customer_tags_customer ON customer_tags(customer_id);
CREATE INDEX IF NOT EXISTS idx_customer_tags_tag ON customer_tags(tag);
CREATE INDEX IF NOT EXISTS idx_profiles_customer_segment ON profiles(customer_segment);
CREATE INDEX IF NOT EXISTS idx_profiles_status ON profiles(status);

-- Create functions
CREATE OR REPLACE FUNCTION update_customer_segment()
RETURNS TRIGGER AS $$
BEGIN
  -- Update customer segment based on criteria
  UPDATE profiles
  SET customer_segment = (
    SELECT name
    FROM customer_segments
    WHERE criteria @> jsonb_build_object(
      'subscription_plan', NEW.plan,
      'status', NEW.status
    )
    LIMIT 1
  )
  WHERE id = NEW.user_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create triggers
DROP TRIGGER IF EXISTS on_subscription_change ON subscriptions;
CREATE TRIGGER on_subscription_change
  AFTER INSERT OR UPDATE ON subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION update_customer_segment();

-- Add default customer segments
INSERT INTO customer_segments (name, description, criteria) VALUES
  ('Free Tier', 'Users on the free plan', '{"subscription_plan": "free", "status": "active"}'),
  ('Premium', 'Active premium subscribers', '{"subscription_plan": "premium", "status": "active"}'),
  ('Elite', 'Active elite subscribers', '{"subscription_plan": "elite", "status": "active"}'),
  ('Churned', 'Previously paid users who cancelled', '{"status": "inactive"}')
ON CONFLICT (name) DO NOTHING;