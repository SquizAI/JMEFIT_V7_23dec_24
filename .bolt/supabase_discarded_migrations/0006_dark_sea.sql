/*
  # Memberships Schema and Data

  1. Schema Changes
    - Create memberships table with all required fields
    - Add columns for detailed membership information
  
  2. Content Updates
    - Insert membership plans with exact content and features
*/

-- Create memberships table
CREATE TABLE IF NOT EXISTS public.memberships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text CHECK (type IN ('app', 'trainer', 'nutrition', 'plus')),
  description text NOT NULL,
  features text[] NOT NULL DEFAULT '{}',
  price_monthly numeric(10,2) NOT NULL,
  price_yearly numeric(10,2) NOT NULL,
  duration text,
  level text,
  details jsonb DEFAULT '{}'::jsonb,
  status text CHECK (status IN ('active', 'inactive')) DEFAULT 'active',
  popular boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.memberships ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Memberships are viewable by everyone"
  ON public.memberships FOR SELECT
  USING (true);

-- Clear existing data
TRUNCATE TABLE public.memberships;

-- Insert membership data
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
  'App Workouts Only - Self-Led',
  'app',
  'Self-led access to app-based workouts with monthly updates',
  ARRAY[
    'Access to "JMEFit" App – Full access to Jaime Fit''s app-based workouts',
    'New Monthly Workouts – Choose from 3, 4, or 5-day workout plans updated each month',
    'Structured Progressions – Programmed progressions to ensure continuous improvement',
    'Video Guidance – Each exercise is paired with instructional videos and setup/execution breakdown for correct form',
    'Detailed Prescriptions – Includes prescribed sets, reps, RPE (Rate of Perceived EXERTION), and rest times for each exercise',
    'Workout Logging – Ability to record weights, reps, and notes each week directly within the app',
    'No Long-Term Commitment – Month-to-month membership with the flexibility to cancel anytime'
  ],
  29.99,
  299.99,
  'Month-to-Month',
  'Beginner to Advanced',
  '{}'::jsonb,
  'active',
  false
),

-- App Workouts Trainer Feedback
(
  'App Workouts Only - Trainer Feedback',
  'app',
  'Personal guidance and form checks with direct access to Jaime',
  ARRAY[
    'Includes Everything from Self-Led – Access to all features of the Self-Led membership',
    'Form Checks – Submit workout videos for personalized feedback to ensure correct form and prevent injury',
    'Direct Access to Jaime – Privately message Jaime anytime through the app for adjustments and advice',
    'Adaptable Workouts – Swap exercises or add traveling programs based on your schedule or location, as well as rehabilitative plans as needed',
    'Full Workout Access – Access to all previous workouts for as long as the membership is active'
  ],
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
  ARRAY[
    'One-on-One Coaching – Work directly with Jaime throughout the 12 weeks',
    'Anytime Messaging – Communicate with Jaime through the app for ongoing support',
    'Custom Meal Plans – Tailored to individual goals, preferences, and any health restrictions. Detailed macro breakdown provided for each meal and snack',
    'Macro Coaching Guidebook – A comprehensive guide explaining macronutrients, macro tracking, alcohol tracking, meal prep tips, best practices, and more',
    'Weekly Check-Ins – Receive weekly feedback and plan adjustments based on progress',
    'Grocery List – A detailed grocery list aligned with your custom meal plan and macro goals',
    'Adaptive Adjustments – Macros and meals are adjusted throughout the program based on feedback and results'
  ],
  199.99,
  1999.99,
  '12 Weeks',
  'All Levels',
  jsonb_build_object(
    'whoIsItFor', 'I start you with meal plans and snacks custom to your macros, but aim to teach you how to build your own. Meal plans only last so long and fail bc it isn''t real life and you never learn how to eat at any place at anytime, however this will give you a starting point and lots of ideas! I do macro/nutrition personalization and ongoing coaching/macro manipulation when it''s time for an adjustment. I help you build what you like to eat so that you experience fat loss/muscle gain while living a non-restrictive life. Everything is customized according to your TDEE, height, weight and BF%, and activity level. The goal (once desired body fat % is achieved) is to roll into a reverse diet and add calories (macros) back in slowly with very little weight gain. At this point, maintenance or recomp phases are the typical next step before entering another deficit.',
    'notes', array[
      'You will receive an email with the Macro Guidebook and a questionnaire to complete for your custom macros. There will also be a video of the walkthrough of navigating the workout portion of the app in the CHAT.',
      'Due to the digital nature of this program, all sales are final. Please ask all questions prior to purchase.'
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
  ARRAY[
    'Comprehensive Offering – Combines everything from Trainer Feedback and Nutrition Only One-on-One programs',
    'Custom Workout Plans – Tailored workouts designed specifically for your fitness goals',
    'Custom Meal Plan – A fully personalized meal plan supporting your lifestyle and workout regimen',
    'Weekly Check-Ins – Consistent progress checks, biofeedback assessment, and plan adjustments from Jaime',
    'Macro Coaching Guidebook – Same detailed guide as provided in Nutrition Only',
    'Grocery List – Comprehensive list covering all meal plan items',
    'Anytime Access – Message Jaime anytime for questions, help or adjustments',
    'Form and Progress Reviews – Continuous feedback on exercise form and nutritional progress'
  ],
  349.99,
  3499.99,
  '12 Weeks',
  'All Levels',
  jsonb_build_object(
    'whoIsItFor', 'I start you with meal plans and snacks custom to your macros, but aim to teach you how to build your own. Meal plans only last so long and fail bc it isn''t real life and you never learn how to eat at any place, anytime 🤗, however this will give you a starting point and lots of ideas! I do macro/nutrition personalization and ongoing coaching/macro manipulation when it''s time for an adjustment. I help you build what you like to eat so that you experience fat loss/muscle gain while living a non-restrictive life. Everything is customized according to your TDEE, height, weight and BF%, activity level- then you get a guidebook from me with tons of info and a guideline for weekly check ins and feedback as well as a grocery list and sample meals. You eat the foods you like as long as it fits in your macros, which means you can stay on track anywhere and all the time, but still creates a healthy balance as fat only accounts for about 25%. The goal (once desired body fat % is achieved) is to roll into a reverse diet and add calories (macros) back in slowly with very little weight gain. At this point, maintenance or recomp phases are the typical next step before entering another deficit.\n\nThe workout part includes me sending videos of each movement (in a library) for you to know form and the exact sets/reps and perceived exertion in which I want you working. You track your weights used and reps completed so you can see that history the following week. You get new splits every 4 weeks so you can practice progressive overload and allow your body to get stronger before just changing the workout for that muscle group. You can also send me videos of yourself doing anything you have a question about or want me to send feedback for at check in through the app. They can be 3, 4, or 5 day splits, weights, body weight, bands, whatever you have access to. This is all based on what you can realistically do with your schedule and I build that activity into your nutrition.',
    'notes', array[
      'You will receive an email with the Macro Guidebook and a questionnaire to complete for your custom macros. There will also be a video of the walkthrough of navigating the workout portion of the app in the CHAT.',
      'Due to the digital nature of this program, all sales are final. Please ask all questions prior to purchase.'
    ]
  ),
  'active',
  false
);