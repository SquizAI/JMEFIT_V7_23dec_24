/*
  # Add Sample Blog Content

  1. Sample Data
    - Categories for fitness content
    - Initial blog posts
    - Author profiles
    - Tags for content organization
*/

-- Insert sample categories
INSERT INTO public.blog_categories (name, slug, description) VALUES
('Fitness', 'fitness', 'Workout tips and exercise guides'),
('Nutrition', 'nutrition', 'Diet advice and meal planning'),
('Training Tips', 'training-tips', 'Expert guidance for better workouts'),
('Recipes', 'recipes', 'Healthy meal and snack recipes'),
('Success Stories', 'success-stories', 'Real transformation stories'),
('Lifestyle', 'lifestyle', 'Fitness lifestyle and wellness tips')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample tags
INSERT INTO public.blog_tags (name, slug) VALUES
('Workouts', 'workouts'),
('Nutrition', 'nutrition'),
('Weight Loss', 'weight-loss'),
('Muscle Gain', 'muscle-gain'),
('Meal Prep', 'meal-prep'),
('Form Guide', 'form-guide'),
('Recovery', 'recovery'),
('Motivation', 'motivation')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample blog posts
WITH author_id AS (
  SELECT id FROM public.blog_authors 
  WHERE display_name = 'Admin User' 
  LIMIT 1
)
INSERT INTO public.blog_posts (
  title,
  slug,
  excerpt,
  content,
  featured_image,
  author_id,
  category_id,
  status,
  published_at,
  reading_time
) 
SELECT
  '5 Essential Core Exercises',
  'essential-core-exercises',
  'Build a strong foundation with these essential core movements that target your entire midsection.',
  '# 5 Essential Core Exercises

## Why Core Training Matters

A strong core is essential for overall fitness and daily activities. These exercises will help you build strength and stability from the inside out.

## The Exercises

### 1. Plank
The foundation of core strength. Focus on maintaining a straight line from head to heels.

### 2. Dead Bug
Perfect for beginners and advanced athletes alike. Great for learning core control and stability.

### 3. Bird Dog
Excellent for improving balance and coordination while strengthening the core.

### 4. Russian Twists
Target your obliques and improve rotational strength.

### 5. Hollow Hold
Advanced exercise that builds serious core strength and stability.',
  'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
  (SELECT id FROM author_id),
  (SELECT id FROM public.blog_categories WHERE slug = 'training-tips'),
  'published',
  NOW(),
  5
WHERE EXISTS (SELECT 1 FROM author_id);

-- Link posts to tags
WITH post_id AS (
  SELECT id FROM public.blog_posts WHERE slug = 'essential-core-exercises'
),
tag_ids AS (
  SELECT id FROM public.blog_tags WHERE slug IN ('workouts', 'form-guide')
)
INSERT INTO public.blog_post_tags (post_id, tag_id)
SELECT 
  (SELECT id FROM post_id),
  tag_ids.id
FROM tag_ids
WHERE EXISTS (SELECT 1 FROM post_id);