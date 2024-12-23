/*
  # Product Tables Schema

  1. New Tables
    - `products`
      - Core product information
      - Price, status, metadata
    - `product_categories`
      - Hierarchical category structure
      - Supports nested categories
    - `product_variants`
      - Size/color variations
      - Stock tracking
      
  2. Security
    - RLS enabled on all tables
    - Public read access for active products
    - Admin-only write access
    
  3. Indexes
    - Optimized for common queries
    - Unique constraints on slugs
*/

-- Products table
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    category_id UUID,
    images TEXT[],
    metadata JSONB DEFAULT '{}'::jsonb,
    status TEXT CHECK (status IN ('active', 'inactive', 'out_of_stock')) DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Product categories
CREATE TABLE IF NOT EXISTS public.product_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    parent_id UUID REFERENCES public.product_categories(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Product variants
CREATE TABLE IF NOT EXISTS public.product_variants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    sku TEXT UNIQUE,
    size TEXT,
    color TEXT,
    price DECIMAL(10,2),
    stock_quantity INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add foreign key constraint if it doesn't exist
DO $$ BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'fk_product_category'
    ) THEN
        ALTER TABLE public.products 
        ADD CONSTRAINT fk_product_category 
        FOREIGN KEY (category_id) 
        REFERENCES public.product_categories(id);
    END IF;
END $$;

-- Create indexes (with unique names to avoid conflicts)
CREATE INDEX IF NOT EXISTS idx_products_category_id_20240318 
    ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_status_20240318 
    ON public.products(status);
CREATE INDEX IF NOT EXISTS idx_products_slug_20240318 
    ON public.products(slug);
CREATE INDEX IF NOT EXISTS idx_product_categories_slug_20240318 
    ON public.product_categories(slug);
CREATE INDEX IF NOT EXISTS idx_product_variants_product_20240318 
    ON public.product_variants(product_id);

-- Enable RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;

-- RLS Policies
DO $$ BEGIN
    -- Products policies
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE policyname = 'Anyone can view active products'
    ) THEN
        CREATE POLICY "Anyone can view active products" ON public.products
            FOR SELECT USING (status = 'active');
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE policyname = 'Admins can manage products'
    ) THEN
        CREATE POLICY "Admins can manage products" ON public.products
            FOR ALL USING (
                auth.uid() IN (
                    SELECT id FROM public.profiles WHERE role = 'admin'
                )
            );
    END IF;

    -- Product categories policies
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE policyname = 'Anyone can view product categories'
    ) THEN
        CREATE POLICY "Anyone can view product categories" ON public.product_categories
            FOR SELECT USING (true);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE policyname = 'Admins can manage product categories'
    ) THEN
        CREATE POLICY "Admins can manage product categories" ON public.product_categories
            FOR ALL USING (
                auth.uid() IN (
                    SELECT id FROM public.profiles WHERE role = 'admin'
                )
            );
    END IF;

    -- Product variants policies
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE policyname = 'Anyone can view product variants'
    ) THEN
        CREATE POLICY "Anyone can view product variants" ON public.product_variants
            FOR SELECT USING (
                EXISTS (
                    SELECT 1 FROM public.products 
                    WHERE id = product_variants.product_id 
                    AND status = 'active'
                )
            );
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE policyname = 'Admins can manage product variants'
    ) THEN
        CREATE POLICY "Admins can manage product variants" ON public.product_variants
            FOR ALL USING (
                auth.uid() IN (
                    SELECT id FROM public.profiles WHERE role = 'admin'
                )
            );
    END IF;
END $$;