/*
  # Add products and memberships tables

  1. New Tables
    - `memberships`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `features` (jsonb)
      - `price_monthly` (decimal)
      - `price_yearly` (decimal)
      - `status` (text)
    - `products`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `price` (decimal)
      - `status` (text)
      - `images` (text array)
  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
    - Add policies for admin management
*/

-- Memberships table
CREATE TABLE IF NOT EXISTS public.memberships (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    features JSONB NOT NULL DEFAULT '[]'::jsonb,
    price_monthly DECIMAL(10,2) NOT NULL,
    price_yearly DECIMAL(10,2) NOT NULL,
    status TEXT CHECK (status IN ('active', 'inactive')) DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Products table (if not exists)
DO $$ BEGIN
    CREATE TABLE IF NOT EXISTS public.products (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name TEXT NOT NULL,
        description TEXT,
        price DECIMAL(10,2) NOT NULL,
        status TEXT CHECK (status IN ('active', 'inactive', 'out_of_stock')) DEFAULT 'active',
        images TEXT[],
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
    );
EXCEPTION
    WHEN duplicate_table THEN NULL;
END $$;

-- Enable RLS
ALTER TABLE public.memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Policies for memberships
CREATE POLICY "Anyone can view active memberships"
    ON public.memberships
    FOR SELECT
    USING (status = 'active');

CREATE POLICY "Admins can manage memberships"
    ON public.memberships
    FOR ALL
    USING (
        auth.uid() IN (
            SELECT id FROM public.profiles WHERE role = 'admin'
        )
    );

-- Policies for products
CREATE POLICY "Anyone can view active products"
    ON public.products
    FOR SELECT
    USING (status = 'active');

CREATE POLICY "Admins can manage products"
    ON public.products
    FOR ALL
    USING (
        auth.uid() IN (
            SELECT id FROM public.profiles WHERE role = 'admin'
        )
    );

-- Indexes
CREATE INDEX IF NOT EXISTS idx_memberships_status ON public.memberships(status);
CREATE INDEX IF NOT EXISTS idx_products_status ON public.products(status);