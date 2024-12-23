/*
  # Add Checkout Tables

  1. New Tables
    - `orders` - Stores order information
    - `order_items` - Stores items in each order
    - `customer_addresses` - Stores saved shipping/billing addresses
    - `coupons` - Stores coupon codes and discounts

  2. Security
    - Enable RLS on all tables
    - Add policies for order access
    - Add policies for address management
*/

-- Create extension for UUID generation if not exists
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Orders table
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  customer_email TEXT NOT NULL,
  shipping_address JSONB NOT NULL,
  billing_address JSONB,
  status TEXT CHECK (status IN ('pending', 'processing', 'completed', 'cancelled')) NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  discount_amount DECIMAL(10,2) DEFAULT 0,
  coupon_code TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Order items table
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL,
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Customer addresses table
CREATE TABLE IF NOT EXISTS public.customer_addresses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  customer_email TEXT NOT NULL,
  address JSONB NOT NULL,
  is_default BOOLEAN DEFAULT false,
  type TEXT CHECK (type IN ('shipping', 'billing')),
  last_used TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Coupons table
CREATE TABLE IF NOT EXISTS public.coupons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT UNIQUE NOT NULL,
  discount INTEGER NOT NULL,
  description TEXT,
  max_uses INTEGER DEFAULT NULL,
  uses INTEGER DEFAULT 0,
  starts_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view their own orders"
  ON public.orders FOR SELECT
  USING (
    user_id = auth.uid() OR 
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE id = auth.uid() 
      AND email = customer_email
    )
  );

CREATE POLICY "Users can insert orders"
  ON public.orders FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can view their order items"
  ON public.order_items FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.orders
    WHERE orders.id = order_items.order_id
    AND (
      orders.user_id = auth.uid() OR 
      EXISTS (
        SELECT 1 FROM auth.users 
        WHERE id = auth.uid() 
        AND email = orders.customer_email
      )
    )
  ));

CREATE POLICY "Users can insert order items"
  ON public.order_items FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can view their saved addresses"
  ON public.customer_addresses FOR SELECT
  USING (
    user_id = auth.uid() OR 
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE id = auth.uid() 
      AND email = customer_email
    )
  );

CREATE POLICY "Users can insert addresses"
  ON public.customer_addresses FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Public can view active coupons"
  ON public.coupons FOR SELECT
  USING (
    CASE 
      WHEN expires_at IS NULL THEN true
      ELSE NOW() BETWEEN starts_at AND expires_at
    END
    AND (max_uses IS NULL OR uses < max_uses)
  );

-- Indexes
CREATE INDEX IF NOT EXISTS idx_orders_user ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON public.orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON public.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_customer_addresses_user ON public.customer_addresses(user_id);
CREATE INDEX IF NOT EXISTS idx_customer_addresses_customer_email ON public.customer_addresses(customer_email);
CREATE INDEX IF NOT EXISTS idx_coupons_code ON public.coupons(code);

-- Functions
CREATE OR REPLACE FUNCTION increment_coupon_uses()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.coupons
  SET uses = uses + 1
  WHERE code = NEW.coupon_code;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers
CREATE TRIGGER after_order_insert
  AFTER INSERT ON public.orders
  FOR EACH ROW
  WHEN (NEW.coupon_code IS NOT NULL)
  EXECUTE FUNCTION increment_coupon_uses();