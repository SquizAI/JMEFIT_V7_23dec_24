/*
  # Create test product

  1. Changes
    - Add test product to products table for cart testing
*/

-- Insert test product if it doesn't exist
INSERT INTO products (id, name, slug, description, price, images)
SELECT 
  'e8c9acf1-5c5f-4f8b-a9c2-3f2d7a571c5c',
  'Test Product',
  'test-product',
  'A test product for cart testing',
  29.99,
  '["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80"]'::jsonb
WHERE NOT EXISTS (
  SELECT 1 FROM products WHERE id = 'e8c9acf1-5c5f-4f8b-a9c2-3f2d7a571c5c'
);