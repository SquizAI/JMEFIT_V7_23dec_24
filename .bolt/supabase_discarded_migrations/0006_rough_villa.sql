/*
  # Update Memberships Schema and Content

  1. Schema Updates
    - Add new fields for membership details
    - Update membership types and features
  
  2. Content Updates
    - Add detailed membership descriptions
    - Include program details and notes
*/

-- Add new columns for detailed membership information
ALTER TABLE public.memberships ADD COLUMN IF NOT EXISTS type TEXT CHECK (type IN ('app', 'trainer', 'nutrition', 'plus'));
ALTER TABLE public.memberships ADD COLUMN IF NOT EXISTS duration TEXT;
ALTER TABLE public.memberships ADD COLUMN IF NOT EXISTS level TEXT;
ALTER TABLE public.memberships ADD COLUMN IF NOT EXISTS details JSONB DEFAULT '{}'::jsonb;

-- Clear existing memberships
TRUNCATE TABLE public.memberships;

-- Insert updated membership plans
INSERT INTO public.memberships (
  name,
  type,
  description,
  features,
  price_monthly,
  price_yearly,
  duration,
  level,
  details,
  status,
  popular
) VALUES
-- App Workouts Self-Led
(
  'App Workouts Self-Led',
  'app',
  'Full access to app-based workouts with monthly updates and structured progressions',
  jsonb_build_array(
    'Access to "JMEFit" App – Full access to Jaime Fit''s app-based workouts',
    'New Monthly Workouts – Choose from 3, 4, or 5-day workout plans updated each month',
    'Structured Progressions – Programmed progressions to ensure continuous improvement',
    'Video Guidance – Each exercise is paired with instructional videos and setup/execution breakdown for correct form',
    'Detailed Prescriptions – Includes prescribed sets, reps, RPE (Rate of Perceived EXERTION), and rest times for each exercise',
    'Workout Logging – Ability to record weights, reps, and notes each week directly within the app',
    'No Long-Term Commitment – Month-to-month membership with the flexibility to cancel anytime'
  ),
  29.99,
  299.99,
  'Month-to-Month',
  'Beginner to Advanced',
  '{}'::jsonb,
  'active',
  false
),

-- Trainer Feedback
(
  'Trainer Feedback',
  'trainer',
  'Personal guidance and form checks with direct access to Jaime',
  jsonb_build_array(
    'Everything from Self-Led – Access to all features of the Self-Led membership',
    'Form Checks – Submit workout videos for personalized feedback to ensure correct form and prevent injury',
    'Direct Access to Jaime – Privately message Jaime anytime through the app for adjustments and advice',
    'Adaptable Workouts – Swap exercises or add traveling programs based on your schedule or location',
    'Full Workout Access – Access to all previous workouts for as long as the membership is active'
  ),
  49.99,
  499.99,
  'Month-to-Month',
  'Beginner to Advanced',
  '{}'::jsonb,
  'active',
  true
),

-- Nutrition Only
(
  'Nutrition Only',
  'nutrition',
  'Comprehensive 12-week nutrition coaching program',
  jsonb_build_array(
    'One-on-One Coaching – Work directly with Jaime throughout the 12 weeks',
    'Anytime Messaging – Communicate with Jaime through the app for ongoing support',
    'Custom Meal Plans – Tailored to individual goals, preferences, and health restrictions',
    'Macro Coaching Guidebook – Comprehensive guide explaining macronutrients and tracking',
    'Weekly Check-Ins – Receive weekly feedback and plan adjustments based on progress',
    'Grocery List – Detailed grocery list aligned with your custom meal plan',
    'Adaptive Adjustments – Macros and meals adjusted based on feedback and results'
  ),
  199.99,
  1999.99,
  '12 Weeks',
  'All Levels',
  jsonb_build_object(
    'whoIsItFor', 'I start you with meal plans and snacks custom to your macros, but aim to teach you how to build your own. Everything is customized according to your TDEE, height, weight and BF%, and activity level.',
    'notes', array[
      'You will receive an email with the Macro Guidebook and a questionnaire to complete for your custom macros',
      'Due to the digital nature of this program, all sales are final'
    ]
  ),
  'active',
  false
),

-- Plus Membership
(
  'Plus Membership',
  'plus',
  'Complete fitness transformation with workouts and nutrition',
  jsonb_build_array(
    'Comprehensive Offering – Combines everything from Trainer Feedback and Nutrition Only programs',
    'Custom Workout Plans – Tailored workouts designed specifically for your fitness goals',
    'Custom Meal Plan – Fully personalized meal plan supporting your lifestyle',
    'Weekly Check-Ins – Consistent progress checks and plan adjustments',
    'Macro Coaching Guidebook – Complete nutrition and macro tracking guide',
    'Grocery List – Comprehensive list covering all meal plan items',
    'Anytime Access – Message Jaime anytime for questions or adjustments',
    'Form and Progress Reviews – Continuous feedback on exercise form and nutrition'
  ),
  349.99,
  3499.99,
  '12 Weeks',
  'All Levels',
  jsonb_build_object(
    'whoIsItFor', 'This program combines comprehensive workout guidance with personalized nutrition coaching. Everything is customized according to your TDEE, height, weight and BF%, activity level.',
    'notes', array[
      'You will receive an email with the Macro Guidebook and a questionnaire',
      'Due to the digital nature of this program, all sales are final'
    ]
  ),
  'active',
  false
);