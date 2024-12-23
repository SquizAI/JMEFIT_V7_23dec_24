/*
  # Fix Cart RLS Policies

  1. Updates
    - Add policies for cart creation and management
    - Allow users to create their own carts
    - Allow users to manage their cart items
    
  2. Security
    - Users can only access their own cart data
    - Users can only modify their own cart
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their own cart" ON carts;
DROP POLICY IF EXISTS "Users can manage their own cart items" ON cart_items;

-- Cart policies
CREATE POLICY "Users can manage their own cart"
ON carts FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Cart items policies
CREATE POLICY "Users can manage their cart items"
ON cart_items FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM carts
    WHERE carts.id = cart_items.cart_id
    AND carts.user_id = auth.uid()
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM carts
    WHERE carts.id = cart_items.cart_id
    AND carts.user_id = auth.uid()
  )
);

-- Ensure RLS is enabled
ALTER TABLE carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;