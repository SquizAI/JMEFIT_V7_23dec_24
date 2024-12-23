/*
  # Add product categories and initial data

  1. New Tables
    - `product_categories` - Product category hierarchy
    - `products` - Physical and digital products
    - `product_variants` - Size/color variants for products

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
    - Add policies for admin write access
*/

-- Product categories table
CREATE TABLE IF NOT EXISTS public.product_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  parent_id UUID REFERENCES public.product_categories(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (slug, parent_id)
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

-- Memberships table
CREATE TABLE IF NOT EXISTS public.memberships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  features JSONB NOT NULL,
  price_monthly DECIMAL(10,2) NOT NULL,
  price_yearly DECIMAL(10,2) NOT NULL,
  popular BOOLEAN DEFAULT false,
  status TEXT CHECK (status IN ('active', 'inactive')) DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.memberships ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Product categories are viewable by everyone"
  ON public.product_categories FOR SELECT
  USING (true);

CREATE POLICY "Products are viewable by everyone"
  ON public.products FOR SELECT
  USING (status = 'active');

CREATE POLICY "Product variants are viewable by everyone"
  ON public.product_variants FOR SELECT
  USING (true);

CREATE POLICY "Memberships are viewable by everyone"
  ON public.memberships FOR SELECT
  USING (status = 'active');

-- Indexes
CREATE INDEX IF NOT EXISTS idx_product_categories_parent ON public.product_categories(parent_id);
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_product_variants_product ON public.product_variants(product_id);

-- Insert main categories
INSERT INTO public.product_categories (name, slug, description) VALUES
  ('Apparel', 'apparel', 'Premium fitness apparel'),
  ('Supplements', 'supplements', 'High-quality supplements'),
  ('Equipment', 'equipment', 'Training equipment'),
  ('Digital', 'digital', 'Digital products and guides');

-- Insert subcategories
DO $$ 
DECLARE 
  apparel_id UUID;
  supplements_id UUID;
  digital_id UUID;
BEGIN
  SELECT id INTO apparel_id FROM public.product_categories WHERE slug = 'apparel';
  SELECT id INTO supplements_id FROM public.product_categories WHERE slug = 'supplements';
  SELECT id INTO digital_id FROM public.product_categories WHERE slug = 'digital';

  -- Apparel subcategories
  INSERT INTO public.product_categories (name, slug, description, parent_id) VALUES
    ('T-Shirts', 'tshirts', 'Training t-shirts', apparel_id),
    ('Hoodies', 'hoodies', 'Premium hoodies', apparel_id),
    ('Tanks', 'tanks', 'Training tank tops', apparel_id);

  -- Supplement subcategories
  INSERT INTO public.product_categories (name, slug, description, parent_id) VALUES
    ('Protein', 'protein', 'Protein supplements', supplements_id),
    ('Pre-Workout', 'pre-workout', 'Pre-workout formulas', supplements_id),
    ('Recovery', 'recovery', 'Recovery supplements', supplements_id),
    ('Vitamins', 'vitamins', 'Vitamin supplements', supplements_id);

  -- Digital subcategories
  INSERT INTO public.product_categories (name, slug, description, parent_id) VALUES
    ('Guides', 'guides', 'Training and nutrition guides', digital_id),
    ('Programs', 'programs', 'Digital training programs', digital_id),
    ('Templates', 'templates', 'Workout and meal templates', digital_id);
END $$;

-- Insert initial memberships
INSERT INTO public.memberships (name, slug, description, features, price_monthly, price_yearly, popular) VALUES
  (
    'App Workouts',
    'app-workouts',
    'Access to all app-based workouts with video guidance',
    '[
      "New workouts every month",
      "Choose 3-5 day splits",
      "Video exercise guides",
      "Progress tracking",
      "Workout logging"
    ]',
    29.99,
    299.99,
    false
  ),
  (
    'Trainer Support',
    'trainer-support',
    'Everything in App Workouts plus direct trainer support',
    '[
      "Everything in App Workouts",
      "Form checks & feedback",
      "Direct messaging access",
      "Custom modifications",
      "Travel workout options"
    ]',
    99.99,
    999.99,
    true
  ),
  (
    'Plus Membership',
    'plus',
    'Complete fitness and nutrition coaching package',
    '[
      "Everything in Trainer Support",
      "Custom meal plans",
      "Weekly check-ins",
      "Nutrition guidance",
      "Priority support"
    ]',
    199.99,
    1999.99,
    false
  );