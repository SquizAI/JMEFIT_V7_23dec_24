/*
  # Fix cart tables and add test product

  1. Changes
    - Update cart_items table to properly reference products table
    - Add test product for cart testing
    - Add proper foreign key constraints
*/

-- Create products table if it doesn't exist
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  images TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on products
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Products are viewable by everyone
CREATE POLICY "Products are viewable by everyone" 
  ON products FOR SELECT 
  USING (true);

-- Update cart_items to properly reference products
ALTER TABLE cart_items 
  DROP CONSTRAINT IF EXISTS cart_items_product_id_fkey,
  ALTER COLUMN product_id TYPE UUID USING product_id::UUID,
  ADD CONSTRAINT cart_items_product_id_fkey 
    FOREIGN KEY (product_id) 
    REFERENCES products(id) 
    ON DELETE CASCADE;

-- Insert test product
INSERT INTO products (
  id,
  name,
  description,
  price,
  images
) VALUES (
  'e8c9acf1-5c5f-4f8b-a9c2-3f2d7a571c5c',
  'Test Product',
  'A test product for cart testing',
  29.99,
  ARRAY['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80']
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  images = EXCLUDED.images;