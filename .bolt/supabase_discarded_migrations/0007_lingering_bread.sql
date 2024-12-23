/*
  # Membership Products
  
  1. Monthly App Workouts
    - Self-Led Option
    - Trainer Feedback Option
  
  2. Nutrition Programs
    - 12-Week Nutrition Coaching
    - Plus Membership (Training + Nutrition)
    
  3. One-Time Programs
    - Shred Program
    - Macro Package
*/

-- Insert App Workout Products
WITH app_self_led AS (
  SELECT id FROM product_categories WHERE slug = 'app-workouts-self-led'
),
app_trainer AS (
  SELECT id FROM product_categories WHERE slug = 'app-workouts-trainer'
)
INSERT INTO products (name, slug, description, type, category_id, price, interval) VALUES
  (
    'App Workouts (Self-Led)',
    'app-workouts-self-led',
    'Access to all app-based workouts with monthly updates and progressions',
    'membership',
    (SELECT id FROM app_self_led),
    29.99,
    'month'
  ),
  (
    'App Workouts (Trainer Feedback)',
    'app-workouts-trainer',
    'App workouts with form checks and direct trainer communication',
    'membership',
    (SELECT id FROM app_trainer),
    49.99,
    'month'
  );

-- Insert Nutrition Products
WITH nutrition AS (
  SELECT id FROM product_categories WHERE slug = 'nutrition-coaching'
),
plus AS (
  SELECT id FROM product_categories WHERE slug = 'plus-membership'
)
INSERT INTO products (name, slug, description, type, category_id, price, interval, duration_weeks) VALUES
  (
    'Nutrition Coaching',
    'nutrition-coaching',
    '12-week personalized nutrition coaching program',
    'membership',
    (SELECT id FROM nutrition),
    149.99,
    'month',
    12
  ),
  (
    'Plus Membership',
    'plus-membership',
    'Complete training and nutrition coaching package',
    'membership',
    (SELECT id FROM plus),
    199.99,
    'month',
    12
  );

-- Insert One-Time Programs
WITH shred AS (
  SELECT id FROM product_categories WHERE slug = 'shred-program'
),
macros AS (
  SELECT id FROM product_categories WHERE slug = 'macro-packages'
)
INSERT INTO products (name, slug, description, type, category_id, price, duration_weeks) VALUES
  (
    'SHRED Program',
    'shred-program',
    '6-week intensive transformation program',
    'one_time',
    (SELECT id FROM shred),
    299.99,
    6
  ),
  (
    'Macro Package with Guidebook',
    'macro-package',
    'Custom macro calculations with comprehensive tracking guide',
    'one_time',
    (SELECT id FROM macros),
    49.99,
    null
  );

-- Insert product features for App Workouts (Self-Led)
WITH self_led AS (
  SELECT id FROM products WHERE slug = 'app-workouts-self-led'
)
INSERT INTO product_features (product_id, name, description, order_index) VALUES
  ((SELECT id FROM self_led), 'Full App Access', 'Complete access to Jaime Fit app workouts', 1),
  ((SELECT id FROM self_led), 'Monthly Workout Updates', 'New workouts every month (3-5 day plans)', 2),
  ((SELECT id FROM self_led), 'Progress Tracking', 'Built-in workout logging and progress tracking', 3),
  ((SELECT id FROM self_led), 'Video Guidance', 'Exercise form videos and instructions', 4),
  ((SELECT id FROM self_led), 'Flexible Plans', 'Choose between 3, 4, or 5-day splits', 5);

-- Insert product features for App Workouts (Trainer Feedback)
WITH trainer AS (
  SELECT id FROM products WHERE slug = 'app-workouts-trainer'
)
INSERT INTO product_features (product_id, name, description, order_index) VALUES
  ((SELECT id FROM trainer), 'Everything in Self-Led', 'All features from the Self-Led membership', 1),
  ((SELECT id FROM trainer), 'Form Checks', 'Submit videos for form feedback', 2),
  ((SELECT id FROM trainer), 'Direct Trainer Access', 'Message Jaime directly through the app', 3),
  ((SELECT id FROM trainer), 'Custom Modifications', 'Get exercise modifications as needed', 4),
  ((SELECT id FROM trainer), 'Travel Workouts', 'Access to travel-friendly workout alternatives', 5);