/*
  # Update Memberships Schema

  1. Changes
    - Add type field to memberships table
    - Add duration and level fields
    - Add details JSONB field for additional information
    - Add sample membership data
*/

-- Add new fields to memberships table
ALTER TABLE public.memberships 
ADD COLUMN IF NOT EXISTS type TEXT CHECK (type IN ('app', 'trainer', 'nutrition', 'plus')),
ADD COLUMN IF NOT EXISTS duration TEXT,
ADD COLUMN IF NOT EXISTS level TEXT,
ADD COLUMN IF NOT EXISTS details JSONB DEFAULT '{}'::jsonb;

-- Insert membership data
INSERT INTO public.memberships (
  name,
  description,
  type,
  features,
  price_monthly,
  price_yearly,
  duration,
  level,
  details,
  status,
  popular
) VALUES
-- App Workouts (Self-Led)
(
  'App Workouts Only',
  'Access to JMEFit App with full workout library and progress tracking',
  'app',
  ARRAY[
    'Full access to JMEFit App',
    'New monthly workouts',
    'Choose 3-5 day splits',
    'Video exercise guides',
    'Detailed prescriptions',
    'Workout logging',
    'No long-term commitment'
  ],
  29.99,
  299.99,
  'Month-to-Month',
  'All Levels',
  '{
    "notes": [
      "Month-to-month membership with flexibility to cancel anytime",
      "Access to all app features and workout library"
    ]
  }',
  'active',
  false
),
-- Trainer Support
(
  'Trainer Support',
  'Personal guidance and form checks with direct access to Jaime',
  'trainer',
  ARRAY[
    'Everything from App Workouts',
    'Form check videos',
    'Direct messaging with Jaime',
    'Custom modifications',
    'Travel workout options',
    'Full workout library access',
    'Rehabilitative plans'
  ],
  99.99,
  999.99,
  'Month-to-Month',
  'All Levels',
  '{
    "notes": [
      "Includes all App Workouts features",
      "Personalized feedback and guidance",
      "Flexible program adjustments"
    ]
  }',
  'active',
  false
),
-- Nutrition Only
(
  'Nutrition Only',
  '12-week personalized nutrition coaching program',
  'nutrition',
  ARRAY[
    'One-on-One Coaching',
    'Custom Meal Plans',
    'Macro Coaching Guidebook',
    'Weekly Check-ins',
    'Detailed Grocery Lists',
    'Recipe Suggestions',
    'Supplement Guidance'
  ],
  199.99,
  1999.99,
  '12 Weeks',
  'All Levels',
  '{
    "whoIsItFor": "Perfect for those looking to transform their nutrition habits and learn sustainable eating practices.",
    "notes": [
      "Includes comprehensive macro guidebook",
      "Weekly progress reviews and adjustments",
      "Custom meal plans based on preferences"
    ]
  }',
  'active',
  true
),
-- Plus Membership
(
  'Plus Membership',
  'Complete transformation package with workouts and nutrition',
  'plus',
  ARRAY[
    'Everything from Trainer Support',
    'Custom Workout Plans',
    'Custom Meal Plans',
    'Weekly Check-ins',
    'Macro Coaching',
    'Form Reviews',
    '24/7 Support'
  ],
  349.99,
  3499.99,
  '12 Weeks',
  'All Levels',
  '{
    "whoIsItFor": "Ideal for those wanting comprehensive support for both training and nutrition.",
    "notes": [
      "Complete transformation package",
      "Combines training and nutrition support",
      "Personalized guidance and accountability"
    ]
  }',
  'active',
  true
)
ON CONFLICT (id) DO UPDATE
SET 
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  type = EXCLUDED.type,
  features = EXCLUDED.features,
  price_monthly = EXCLUDED.price_monthly,
  price_yearly = EXCLUDED.price_yearly,
  duration = EXCLUDED.duration,
  level = EXCLUDED.level,
  details = EXCLUDED.details,
  status = EXCLUDED.status,
  popular = EXCLUDED.popular;