/*
  # Cart and Products Schema

  1. New Tables
    - products: Store product information
    - carts: User shopping carts
    - cart_items: Items in shopping carts
  
  2. Changes
    - Add proper foreign key constraints
    - Enable RLS
    - Add policies for cart management
    - Add test product

  3. Security
    - Enable RLS on all tables
    - Add policies for cart access
*/

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  images JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create carts table
CREATE TABLE IF NOT EXISTS carts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create cart_items table
CREATE TABLE IF NOT EXISTS cart_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cart_id UUID REFERENCES carts(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

-- Products policies
CREATE POLICY "Products are viewable by everyone" 
  ON products FOR SELECT 
  USING (true);

-- Cart policies
CREATE POLICY "Users can create their own cart"
  ON carts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own cart"
  ON carts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own cart"
  ON carts FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own cart"
  ON carts FOR DELETE
  USING (auth.uid() = user_id);

-- Cart items policies
CREATE POLICY "Users can view their cart items"
  ON cart_items FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM carts
    WHERE id = cart_items.cart_id
    AND user_id = auth.uid()
  ));

CREATE POLICY "Users can insert cart items"
  ON cart_items FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM carts
    WHERE id = cart_items.cart_id
    AND user_id = auth.uid()
  ));

CREATE POLICY "Users can update their cart items"
  ON cart_items FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM carts
    WHERE id = cart_items.cart_id
    AND user_id = auth.uid()
  ));

CREATE POLICY "Users can delete their cart items"
  ON cart_items FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM carts
    WHERE id = cart_items.cart_id
    AND user_id = auth.uid()
  ));

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_carts_user_id ON carts(user_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_cart_id ON cart_items(cart_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_product_id ON cart_items(product_id);

-- Insert test product
INSERT INTO products (
  id,
  name,
  slug,
  description,
  price,
  images
) VALUES (
  'e8c9acf1-5c5f-4f8b-a9c2-3f2d7a571c5c',
  'Test Product',
  'test-product',
  'A test product for cart testing',
  29.99,
  '["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80"]'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  images = EXCLUDED.images;