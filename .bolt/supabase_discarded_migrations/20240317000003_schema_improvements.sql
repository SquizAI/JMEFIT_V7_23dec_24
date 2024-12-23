-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Profiles table (linked to auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    display_name TEXT,
    role TEXT CHECK (role IN ('user', 'admin', 'trainer')) DEFAULT 'user',
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Content table with improved structure
CREATE TABLE IF NOT EXISTS public.content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    type TEXT CHECK (type IN ('article', 'recipe', 'workout', 'nutrition')) NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    content JSONB NOT NULL, -- Using JSONB for structured content
    preview_content TEXT,
    image_url TEXT,
    access_level TEXT CHECK (access_level IN ('free', 'premium', 'members-only')) DEFAULT 'free',
    status TEXT CHECK (status IN ('draft', 'published', 'archived')) DEFAULT 'draft',
    author_id UUID REFERENCES auth.users(id),
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Progress tracking with improved structure
CREATE TABLE IF NOT EXISTS public.progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    weight DECIMAL(5,2),
    body_fat DECIMAL(4,1),
    measurements JSONB, -- Structured measurements data
    photos JSONB, -- Array of progress photo URLs
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Subscriptions table for managing premium access
CREATE TABLE IF NOT EXISTS public.subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    plan TEXT CHECK (plan IN ('free', 'premium', 'elite')) NOT NULL,
    status TEXT CHECK (status IN ('active', 'cancelled', 'expired')) NOT NULL,
    started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Analytics events
CREATE TABLE IF NOT EXISTS public.analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    event_type TEXT NOT NULL,
    page_id TEXT,
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security Policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone" 
    ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" 
    ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Content policies
CREATE POLICY "Published content is viewable by everyone" 
    ON public.content FOR SELECT 
    USING (status = 'published' AND (
        access_level = 'free' OR 
        (access_level = 'premium' AND EXISTS (
            SELECT 1 FROM public.subscriptions 
            WHERE user_id = auth.uid() 
            AND status = 'active'
        ))
    ));

CREATE POLICY "Authors can manage their content" 
    ON public.content FOR ALL 
    USING (author_id = auth.uid() OR 
          EXISTS (
              SELECT 1 FROM public.profiles 
              WHERE id = auth.uid() AND role = 'admin'
          ));

-- Progress policies
CREATE POLICY "Users can manage their own progress" 
    ON public.progress FOR ALL 
    USING (user_id = auth.uid() OR 
          EXISTS (
              SELECT 1 FROM public.profiles 
              WHERE id = auth.uid() AND role IN ('admin', 'trainer')
          ));

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_content_slug ON public.content(slug);
CREATE INDEX IF NOT EXISTS idx_content_type_status ON public.content(type, status);
CREATE INDEX IF NOT EXISTS idx_content_access_level ON public.content(access_level);
CREATE INDEX IF NOT EXISTS idx_progress_user_date ON public.progress(user_id, date);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_status ON public.subscriptions(user_id, status);
CREATE INDEX IF NOT EXISTS idx_analytics_user_event ON public.analytics(user_id, event_type);

-- Add updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers
CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON public.content
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON public.subscriptions
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();