-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Users table (managed by Supabase Auth, we'll add profile data)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    display_name TEXT,
    role TEXT CHECK (role IN ('user', 'admin', 'trainer')) DEFAULT 'user',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Content table for articles, workouts, etc.
CREATE TABLE IF NOT EXISTS public.content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    type TEXT CHECK (type IN ('article', 'recipe', 'workout', 'nutrition')) NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    content TEXT NOT NULL,
    preview_content TEXT,
    image_url TEXT,
    access_level TEXT CHECK (access_level IN ('free', 'premium', 'members-only')) DEFAULT 'free',
    status TEXT CHECK (status IN ('draft', 'published', 'archived')) DEFAULT 'draft',
    author_id UUID REFERENCES auth.users(id),
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

-- Meals and snacks
CREATE TABLE IF NOT EXISTS public.meals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    type TEXT CHECK (type IN ('meal', 'snack')) NOT NULL,
    calories INTEGER,
    protein DECIMAL(5,2),
    carbs DECIMAL(5,2),
    fats DECIMAL(5,2),
    ingredients TEXT[],
    instructions TEXT[],
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Workout splits
CREATE TABLE IF NOT EXISTS public.workout_splits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    difficulty TEXT CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')) NOT NULL,
    type TEXT CHECK (type IN ('push', 'pull', 'legs', 'upper', 'lower', 'full')) NOT NULL,
    exercises JSONB NOT NULL,
    duration INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Outfits
CREATE TABLE IF NOT EXISTS public.outfits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    category TEXT CHECK (category IN ('workout', 'casual', 'athleisure')) NOT NULL,
    items TEXT[],
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Nutrition advice
CREATE TABLE IF NOT EXISTS public.nutrition_advice (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT CHECK (category IN ('general', 'macros', 'supplements', 'timing')) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact form submissions
CREATE TABLE IF NOT EXISTS public.contacts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    goals TEXT,
    recaptcha_token TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Payment intents
CREATE TABLE IF NOT EXISTS public.payment_intents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id),
    package TEXT NOT NULL,
    amount INTEGER NOT NULL,
    status TEXT CHECK (status IN ('pending', 'completed', 'failed')) NOT NULL,
    stripe_payment_intent_id TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_content_slug ON content(slug);
CREATE INDEX IF NOT EXISTS idx_content_type_status ON content(type, status);
CREATE INDEX IF NOT EXISTS idx_progress_user_date ON progress(user_id, date);
CREATE INDEX IF NOT EXISTS idx_meals_type ON meals(type);
CREATE INDEX IF NOT EXISTS idx_workout_splits_difficulty ON workout_splits(difficulty);
CREATE INDEX IF NOT EXISTS idx_payment_intents_status ON payment_intents(status);

-- Row Level Security Policies

-- Profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone"
ON public.profiles FOR SELECT
USING (true);

CREATE POLICY "Users can update own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = id);

-- Content
ALTER TABLE public.content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published content is viewable by everyone"
ON public.content FOR SELECT
USING (status = 'published');

CREATE POLICY "Authors can manage their content"
ON public.content FOR ALL
USING (auth.uid() = author_id);

-- Progress
ALTER TABLE public.progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own progress"
ON public.progress FOR ALL
USING (auth.uid() = user_id);

-- Contacts
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact form"
ON public.contacts FOR INSERT
WITH CHECK (true);

CREATE POLICY "Only admins can view contacts"
ON public.contacts FOR SELECT
USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
));

-- Payment Intents
ALTER TABLE public.payment_intents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own payment intents"
ON public.payment_intents FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create payment intents"
ON public.payment_intents FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Functions and Triggers
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, role)
  VALUES (new.id, new.raw_user_meta_data->>'display_name', 'user');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();