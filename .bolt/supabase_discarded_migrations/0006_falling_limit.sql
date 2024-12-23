/*
  # Add test membership data

  1. New Data
    - Adds three test membership plans with different pricing tiers
    - Sets appropriate features and descriptions
    - All plans set as active status

  2. Changes
    - Inserts test data into memberships table
*/

INSERT INTO public.memberships (
  id,
  name,
  description,
  features,
  price_monthly,
  price_yearly,
  status,
  popular
) VALUES
(
  'basic-plan',
  'Basic',
  'Get started with essential features',
  '["App workouts", "Progress tracking", "Basic meal plans"]',
  1999,
  19990,
  'active',
  false
),
(
  'pro-plan',
  'Pro',
  'Perfect for dedicated fitness enthusiasts',
  '["Everything in Basic", "Custom workout plans", "Form check videos", "Priority support"]',
  4999,
  49990,
  'active',
  true
),
(
  'elite-plan',
  'Elite',
  'Ultimate fitness experience',
  '["Everything in Pro", "1-on-1 coaching", "Personalized meal plans", "24/7 support"]',
  9999,
  99990,
  'active',
  false
);