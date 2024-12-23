/*
  # E-commerce Schema Setup
  
  1. Tables
    - Product categories with hierarchy support
    - Products with type and status tracking
    - Product features for listing included items
    - Product variants for physical goods
    
  2. Security
    - RLS enabled on all tables
    - Public read access for active products
    - Admin-only write access
    
  3. Initial Data
    - Main product categories
    - Supplement subcategories
    - Gear subcategories
*/

-- Drop existing tables if they exist
DROP TABLE IF EXISTS product_variants CASCADE;
DROP TABLE IF EXISTS product_features CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS product_categories CASCADE;

-- Product Categories
CREATE TABLE product_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  parent_id UUID REFERENCES product_categories(id),
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Products
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  type TEXT CHECK (type IN ('membership', 'one_time', 'gear', 'supplement')) NOT NULL,
  category_id UUID REFERENCES product_categories(id),
  price DECIMAL(10,2) NOT NULL,
  interval TEXT CHECK (interval IN ('month', 'year', null)),
  duration_weeks INTEGER,
  status TEXT CHECK (status IN ('active', 'inactive', 'archived')) DEFAULT 'active',
  metadata JSONB DEFAULT '{}',
  images TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Product Features
CREATE TABLE product_features (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  included BOOLEAN DEFAULT true,
  order_index INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Product Variants
CREATE TABLE product_variants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  sku TEXT UNIQUE,
  size TEXT,
  color TEXT,
  price DECIMAL(10,2),
  stock_quantity INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_products_type ON products(type);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_product_features_product ON product_features(product_id);
CREATE INDEX idx_product_categories_parent ON product_categories(parent_id);
CREATE INDEX idx_product_variants_product ON product_variants(product_id);

-- Enable RLS
ALTER TABLE product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Public categories are viewable by everyone" ON product_categories;
  DROP POLICY IF EXISTS "Public products are viewable by everyone" ON products;
  DROP POLICY IF EXISTS "Public features are viewable by everyone" ON product_features;
  DROP POLICY IF EXISTS "Public variants are viewable by everyone" ON product_variants;
  DROP POLICY IF EXISTS "Only admins can manage categories" ON product_categories;
  DROP POLICY IF EXISTS "Only admins can manage products" ON products;
  DROP POLICY IF EXISTS "Only admins can manage features" ON product_features;
  DROP POLICY IF EXISTS "Only admins can manage variants" ON product_variants;
EXCEPTION
  WHEN undefined_object THEN NULL;
END $$;

-- Create policies
CREATE POLICY "Public categories are viewable by everyone" 
  ON product_categories FOR SELECT 
  USING (true);

CREATE POLICY "Public products are viewable by everyone" 
  ON products FOR SELECT 
  USING (status = 'active');

CREATE POLICY "Public features are viewable by everyone" 
  ON product_features FOR SELECT 
  USING (true);

CREATE POLICY "Public variants are viewable by everyone" 
  ON product_variants FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM products 
    WHERE products.id = product_variants.product_id 
    AND products.status = 'active'
  ));

-- Admin policies
CREATE POLICY "Only admins can manage categories"
  ON product_categories FOR ALL
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  ));

CREATE POLICY "Only admins can manage products"
  ON products FOR ALL
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  ));

CREATE POLICY "Only admins can manage features"
  ON product_features FOR ALL
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  ));

CREATE POLICY "Only admins can manage variants"
  ON product_variants FOR ALL
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  ));

-- Insert initial categories
INSERT INTO product_categories (name, slug, description) VALUES
  ('Monthly Memberships', 'monthly-memberships', 'Recurring membership services'),
  ('One-Time Programs', 'one-time-programs', 'Single purchase training programs'),
  ('Fitness Gear', 'fitness-gear', 'Branded apparel and accessories'),
  ('Supplements', 'supplements', 'Recommended supplements and nutrition'),
  ('Meal Plans', 'meal-plans', 'Custom nutrition plans');

-- Insert supplement subcategories
WITH supplements AS (
  SELECT id FROM product_categories WHERE slug = 'supplements'
)
INSERT INTO product_categories (name, slug, description, parent_id) VALUES
  ('Protein', 'protein', 'High-quality protein supplements', (SELECT id FROM supplements)),
  ('Pre-Workout', 'pre-workout', 'Pre-workout supplements', (SELECT id FROM supplements)),
  ('Recovery', 'recovery', 'Post-workout and recovery supplements', (SELECT id FROM supplements));

-- Insert gear subcategories  
WITH gear AS (
  SELECT id FROM product_categories WHERE slug = 'fitness-gear'
)
INSERT INTO product_categories (name, slug, description, parent_id) VALUES
  ('Apparel', 'apparel', 'Training clothes and accessories', (SELECT id FROM gear)),
  ('Equipment', 'equipment', 'Training equipment', (SELECT id FROM gear));