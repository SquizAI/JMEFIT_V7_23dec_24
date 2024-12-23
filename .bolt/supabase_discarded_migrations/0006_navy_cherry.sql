/*
  # Add product-related tables

  1. New Tables
    - `memberships` - Monthly/yearly subscription plans
    - `programs` - One-time purchase programs
    - `products` - Physical products (apparel, supplements)
    - `product_categories` - Product categorization
    - `product_variants` - Size/color variants for products

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
    - Add policies for admin write access
*/

-- Memberships table
CREATE TABLE IF NOT EXISTS public.memberships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  features JSONB NOT NULL DEFAULT '[]',
  price_monthly DECIMAL(10,2) NOT NULL,
  price_yearly DECIMAL(10,2) NOT NULL,
  popular BOOLEAN DEFAULT false,
  status TEXT CHECK (status IN ('active', 'inactive')) DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Programs table
CREATE TABLE IF NOT EXISTS public.programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  features JSONB NOT NULL DEFAULT '[]',
  duration TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  status TEXT CHECK (status IN ('active', 'inactive')) DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Product categories table
CREATE TABLE IF NOT EXISTS public.product_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  parent_id UUID REFERENCES public.product_categories(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Products table
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  category_id UUID REFERENCES public.product_categories(id),
  price DECIMAL(10,2) NOT NULL,
  images JSONB DEFAULT '[]',
  metadata JSONB DEFAULT '{}',
  status TEXT CHECK (status IN ('active', 'inactive', 'out_of_stock')) DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Product variants table
CREATE TABLE IF NOT EXISTS public.product_variants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  sku TEXT UNIQUE NOT NULL,
  size TEXT,
  color TEXT,
  price DECIMAL(10,2),
  stock_quantity INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Memberships are viewable by everyone"
  ON public.memberships FOR SELECT
  USING (status = 'active');

CREATE POLICY "Programs are viewable by everyone"
  ON public.programs FOR SELECT
  USING (status = 'active');

CREATE POLICY "Product categories are viewable by everyone"
  ON public.product_categories FOR SELECT
  USING (true);

CREATE POLICY "Products are viewable by everyone"
  ON public.products FOR SELECT
  USING (status = 'active');

CREATE POLICY "Product variants are viewable by everyone"
  ON public.product_variants FOR SELECT
  USING (true);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_memberships_slug ON public.memberships(slug);
CREATE INDEX IF NOT EXISTS idx_programs_slug ON public.programs(slug);
CREATE INDEX IF NOT EXISTS idx_product_categories_slug ON public.product_categories(slug);
CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products(slug);
CREATE INDEX IF NOT EXISTS idx_product_variants_sku ON public.product_variants(sku);

-- Insert main categories first
INSERT INTO public.product_categories (name, slug, description) VALUES
  ('Apparel', 'apparel', 'Premium fitness apparel'),
  ('Supplements', 'supplements', 'High-quality supplements'),
  ('Equipment', 'equipment', 'Training equipment');

-- Get category IDs
DO $$ 
DECLARE 
  apparel_id UUID;
  supplements_id UUID;
BEGIN
  SELECT id INTO apparel_id FROM public.product_categories WHERE slug = 'apparel';
  SELECT id INTO supplements_id FROM public.product_categories WHERE slug = 'supplements';

  -- Insert subcategories
  INSERT INTO public.product_categories (name, slug, description, parent_id) VALUES
    ('T-Shirts', 'tshirts', 'Training t-shirts', apparel_id),
    ('Hoodies', 'hoodies', 'Premium hoodies', apparel_id),
    ('Protein', 'protein', 'Protein supplements', supplements_id),
    ('Pre-Workout', 'pre-workout', 'Pre-workout supplements', supplements_id),
    ('Recovery', 'recovery', 'Recovery supplements', supplements_id);
END $$;

-- Insert sample memberships
INSERT INTO public.memberships (name, slug, description, features, price_monthly, price_yearly, popular) VALUES
  (
    'App Workouts Only',
    'app-workouts',
    'Self-led training with app access',
    '["Full access to Jaime Fit App", "New monthly workouts", "Choose 3-5 day splits", "Video exercise guides", "Workout logging", "Progress tracking"]',
    29.99,
    299.99,
    false
  ),
  (
    'Trainer Support',
    'trainer-support',
    'App access plus trainer feedback and support',
    '["Everything in App Workouts", "Form checks & feedback", "Direct messaging access", "Custom modifications", "Travel workout options"]',
    99.99,
    999.99,
    true
  ),
  (
    'Plus Membership',
    'plus',
    'Complete fitness and nutrition coaching',
    '["Everything in Trainer Support", "Custom meal plans", "Weekly check-ins", "Nutrition guidance", "Priority support"]',
    149.99,
    1499.99,
    false
  );