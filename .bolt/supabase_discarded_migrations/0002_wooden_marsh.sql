/*
  # Initial Schema Setup
  
  1. Core Tables
    - profiles: User profile data linked to auth.users
    - content: Main content storage
    - progress: User progress tracking
    - subscriptions: Premium access management
  
  2. Security
    - Enable RLS on all tables
    - Set up granular access policies
    
  3. Indexes
    - Add performance optimizations
*/

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    display_name TEXT,
    role TEXT CHECK (role IN ('user', 'admin', 'trainer')) DEFAULT 'user',
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Content table
CREATE TABLE IF NOT EXISTS public.content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    type TEXT CHECK (type IN ('article', 'workout', 'recipe', 'nutrition')) NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    content JSONB NOT NULL,
    preview_content TEXT,
    image_url TEXT,
    access_level TEXT CHECK (access_level IN ('free', 'premium', 'members-only')) DEFAULT 'free',
    status TEXT CHECK (status IN ('draft', 'published', 'archived')) DEFAULT 'draft',
    author_id UUID REFERENCES auth.users(id),
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Progress tracking
CREATE TABLE IF NOT EXISTS public.progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    weight DECIMAL(5,2),
    body_fat DECIMAL(4,1),
    measurements JSONB,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Subscriptions
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

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DO $$ BEGIN
    DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
    DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
    DROP POLICY IF EXISTS "Published content is viewable by everyone" ON public.content;
    DROP POLICY IF EXISTS "Authors can manage their content" ON public.content;
    DROP POLICY IF EXISTS "Users can manage their own progress" ON public.progress;
    DROP POLICY IF EXISTS "Users can view own subscriptions" ON public.subscriptions;
EXCEPTION
    WHEN undefined_object THEN null;
END $$;

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
        (access_level IN ('premium', 'members-only') AND EXISTS (
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

-- Subscription policies
CREATE POLICY "Users can view own subscriptions"
    ON public.subscriptions FOR SELECT
    USING (user_id = auth.uid() OR
          EXISTS (
              SELECT 1 FROM public.profiles
              WHERE id = auth.uid() AND role = 'admin'
          ));

-- Indexes
CREATE INDEX IF NOT EXISTS idx_content_slug ON public.content(slug);
CREATE INDEX IF NOT EXISTS idx_content_type_status ON public.content(type, status);
CREATE INDEX IF NOT EXISTS idx_content_access_level ON public.content(access_level);
CREATE INDEX IF NOT EXISTS idx_progress_user_date ON public.progress(user_id, date);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_status ON public.subscriptions(user_id, status);

-- Drop existing trigger and function if they exist
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Handle new user creation
CREATE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, role)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)),
    COALESCE(new.raw_user_meta_data->>'role', 'user')
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();