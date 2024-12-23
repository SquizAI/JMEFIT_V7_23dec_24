-- Drop existing policies if they exist
DO $$ BEGIN
    DROP POLICY IF EXISTS "Memberships are viewable by everyone" ON public.memberships;
    DROP POLICY IF EXISTS "Admins can manage memberships" ON public.memberships;
EXCEPTION
    WHEN undefined_object THEN null;
END $$;

-- Drop existing table if it exists
DROP TABLE IF EXISTS public.memberships;

-- Create memberships table
CREATE TABLE public.memberships (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    features TEXT[] NOT NULL DEFAULT '{}',
    price_monthly NUMERIC(10,2) NOT NULL,
    price_yearly NUMERIC(10,2) NOT NULL,
    status TEXT CHECK (status IN ('active', 'inactive')) DEFAULT 'active',
    popular BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.memberships ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Memberships are viewable by everyone" 
    ON public.memberships FOR SELECT 
    USING (status = 'active');

CREATE POLICY "Admins can manage memberships" 
    ON public.memberships FOR ALL 
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE profiles.id = auth.uid() 
            AND profiles.role = 'admin'
        )
    );

-- Insert sample data
INSERT INTO public.memberships (name, description, features, price_monthly, price_yearly, status, popular)
VALUES
    (
        'Basic Plan',
        'Perfect for getting started',
        ARRAY['Access to workout library', 'Basic progress tracking', 'Community support'],
        29.99,
        299.99,
        'active',
        false
    ),
    (
        'Pro Plan',
        'Most popular choice for serious trainers',
        ARRAY['Everything in Basic', 'Custom workout plans', 'Nutrition guidance', 'Priority support'],
        49.99,
        499.99,
        'active',
        true
    ),
    (
        'Elite Plan',
        'Ultimate fitness experience',
        ARRAY['Everything in Pro', '1-on-1 coaching', 'Custom meal plans', 'Weekly check-ins', 'Video form checks'],
        99.99,
        999.99,
        'active',
        false
    );