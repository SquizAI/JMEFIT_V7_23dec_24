/*
  # Product Categories and Memberships Schema
  
  1. Categories
    - Monthly Memberships
    - One-Time Programs
    - Fitness Gear
    - Supplements
    - Meal Plans
    
  2. Membership Types
    - App Workouts Only (Self-Led)
    - App Workouts Only (Trainer Feedback)
    - Nutrition Only (12-Week)
    - Plus Membership (12-Week)
    
  3. One-Time Products
    - Shred (6-Week)
    - One-Time Macros with Guidebook
    - Custom Meal Plans
*/

-- Drop existing product data
TRUNCATE TABLE product_categories CASCADE;

-- Insert root categories
INSERT INTO product_categories (name, slug, description) VALUES
  ('Monthly Memberships', 'monthly-memberships', 'Recurring membership services'),
  ('One-Time Programs', 'one-time-programs', 'Single purchase training programs'),
  ('Fitness Gear', 'fitness-gear', 'Branded apparel and accessories'),
  ('Supplements', 'supplements', 'Recommended supplements and nutrition'),
  ('Meal Plans', 'meal-plans', 'Custom nutrition plans');

-- Insert membership subcategories
WITH memberships AS (
  SELECT id FROM product_categories WHERE slug = 'monthly-memberships'
)
INSERT INTO product_categories (name, slug, description, parent_id) VALUES
  ('App Workouts (Self-Led)', 'app-workouts-self-led', 'Self-guided app-based workouts with monthly updates', (SELECT id FROM memberships)),
  ('App Workouts (Trainer Feedback)', 'app-workouts-trainer', 'App workouts with personalized trainer feedback', (SELECT id FROM memberships)),
  ('Nutrition Coaching', 'nutrition-coaching', '12-week nutrition coaching program', (SELECT id FROM memberships)),
  ('Plus Membership', 'plus-membership', 'Combined training and nutrition coaching', (SELECT id FROM memberships));

-- Insert one-time program subcategories
WITH programs AS (
  SELECT id FROM product_categories WHERE slug = 'one-time-programs'
)
INSERT INTO product_categories (name, slug, description, parent_id) VALUES
  ('Shred Program', 'shred-program', '6-week intensive transformation program', (SELECT id FROM programs)),
  ('Macro Packages', 'macro-packages', 'One-time macro calculations and guides', (SELECT id FROM programs)),
  ('Custom Plans', 'custom-plans', 'Personalized one-time training plans', (SELECT id FROM programs));

-- Insert supplement subcategories
WITH supplements AS (
  SELECT id FROM product_categories WHERE slug = 'supplements'
)
INSERT INTO product_categories (name, slug, description, parent_id) VALUES
  ('Protein', 'protein', 'High-quality protein supplements', (SELECT id FROM supplements)),
  ('Pre-Workout', 'pre-workout', 'Pre-workout formulas', (SELECT id FROM supplements)),
  ('Creatine', 'creatine', 'Strength and power supplements', (SELECT id FROM supplements)),
  ('Glutamine', 'glutamine', 'Recovery supplements', (SELECT id FROM supplements)),
  ('Multivitamins', 'multivitamins', 'Daily vitamin and mineral blends', (SELECT id FROM supplements)),
  ('Probiotics', 'probiotics', 'Gut health supplements', (SELECT id FROM supplements));

-- Insert gear subcategories
WITH gear AS (
  SELECT id FROM product_categories WHERE slug = 'fitness-gear'
)
INSERT INTO product_categories (name, slug, description, parent_id) VALUES
  ('Hoodies', 'hoodies', 'Premium fitness hoodies', (SELECT id FROM gear)),
  ('T-Shirts', 't-shirts', 'Training t-shirts', (SELECT id FROM gear)),
  ('Limited Edition', 'limited-edition', 'Exclusive seasonal releases', (SELECT id FROM gear));