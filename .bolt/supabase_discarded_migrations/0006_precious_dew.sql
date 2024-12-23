/*
  # Update Product Structure
  
  1. New Tables
    - `memberships` - Recurring membership plans
    - `programs` - One-time purchase programs
    - `products` - Physical products and supplements
    - `product_categories` - Categories for products
    
  2. Changes
    - Added support for recurring billing
    - Added product variants and sizes
    - Enhanced product metadata
    
  3. Security
    - Added RLS policies for all new tables
    - Restricted access based on user roles
*/

-- Create product categories table
CREATE TABLE IF NOT EXISTS public.product_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  parent_id UUID REFERENCES public.product_categories(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create memberships table
CREATE TABLE IF NOT EXISTS public.memberships (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  features JSONB,
  price_monthly DECIMAL(10,2) NOT NULL,
  price_yearly DECIMAL(10,2) NOT NULL,
  status TEXT CHECK (status IN ('active', 'inactive')) DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create programs table
CREATE TABLE IF NOT EXISTS public.programs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  features JSONB,
  duration TEXT,
  price DECIMAL(10,2) NOT NULL,
  status TEXT CHECK (status IN ('active', 'inactive')) DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create products table
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  category_id UUID REFERENCES public.product_categories(id),
  price DECIMAL(10,2) NOT NULL,
  images TEXT[],
  metadata JSONB,
  status TEXT CHECK (status IN ('active', 'inactive', 'out_of_stock')) DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create product variants table
CREATE TABLE IF NOT EXISTS public.product_variants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  sku TEXT UNIQUE,
  size TEXT,
  color TEXT,
  price DECIMAL(10,2),
  stock_quantity INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Anyone can view active categories"
  ON public.product_categories FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view active memberships"
  ON public.memberships FOR SELECT
  USING (status = 'active');

CREATE POLICY "Anyone can view active programs"
  ON public.programs FOR SELECT
  USING (status = 'active');

CREATE POLICY "Anyone can view active products"
  ON public.products FOR SELECT
  USING (status = 'active');

CREATE POLICY "Anyone can view product variants"
  ON public.product_variants FOR SELECT
  USING (true);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_product_categories_slug ON public.product_categories(slug);
CREATE INDEX IF NOT EXISTS idx_memberships_slug ON public.memberships(slug);
CREATE INDEX IF NOT EXISTS idx_programs_slug ON public.programs(slug);
CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products(slug);
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_product_variants_product ON public.product_variants(product_id);

-- Insert initial categories
INSERT INTO public.product_categories (name, slug, description) VALUES
  ('Apparel', 'apparel', 'Fitness apparel and accessories'),
  ('Supplements', 'supplements', 'Performance and recovery supplements');

-- Insert subcategories
INSERT INTO public.product_categories (name, slug, description, parent_id) VALUES
  ('Protein', 'protein', 'Protein powders and supplements', (SELECT id FROM public.product_categories WHERE slug = 'supplements')),
  ('Creatine', 'creatine', 'Creatine supplements', (SELECT id FROM public.product_categories WHERE slug = 'supplements')),
  ('Glutamine', 'glutamine', 'Glutamine supplements', (SELECT id FROM public.product_categories WHERE slug = 'supplements')),
  ('Multivitamins', 'multivitamins', 'Daily vitamins and minerals', (SELECT id FROM public.product_categories WHERE slug = 'supplements')),
  ('Probiotics', 'probiotics', 'Gut health supplements', (SELECT id FROM public.product_categories WHERE slug = 'supplements'));

-- Insert initial memberships
INSERT INTO public.memberships (name, slug, description, features, price_monthly, price_yearly) VALUES
  ('App Workouts Only', 'app-workouts', 'Self-led training with app access', 
   '["Full access to Jaime Fit App", "New monthly workouts", "Choose 3-5 day splits", "Video exercise guides", "Workout logging", "Progress tracking"]',
   29.99, 299.99),
  ('Trainer Feedback', 'trainer-feedback', 'App access plus trainer support',
   '["Everything in App Workouts", "Form check videos", "Direct messaging with Jaime", "Custom exercise modifications", "Travel workout options", "Priority support"]',
   49.99, 499.99),
  ('Plus Membership', 'plus-membership', 'Complete training and nutrition',
   '["Everything in Trainer Feedback", "Custom meal plans", "Weekly nutrition check-ins", "Macro coaching", "Recipe database access", "24/7 priority support"]',
   99.99, 999.99);

-- Insert initial programs
INSERT INTO public.programs (name, slug, description, features, duration, price) VALUES
  ('SHRED Program', 'shred', '6-week intensive transformation program',
   '["Custom workouts", "Nutrition plan", "Daily support", "Progress tracking"]',
   '6 weeks', 299.00),
  ('One-Time Macros', 'macros', 'Custom macro calculation with guidebook',
   '["Custom macro targets", "Comprehensive guidebook", "Getting started guide"]',
   'Lifetime access', 49.00);