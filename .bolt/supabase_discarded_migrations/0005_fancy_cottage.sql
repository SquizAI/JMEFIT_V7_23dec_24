/*
  # Add Profiles and Auth Setup

  1. Changes
    - Creates profiles table with proper constraints
    - Sets up RLS policies for profiles
    - Creates trigger for automatic profile creation
    - Adds necessary indexes for performance

  2. Security
    - Enables RLS on profiles table
    - Adds policies for public read and user-specific operations
    - Sets up secure user creation trigger
*/

-- Drop existing objects if they exist
DO $$ BEGIN
    DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
    DROP FUNCTION IF EXISTS public.handle_new_user();
    
    -- Drop policies if they exist
    DROP POLICY IF EXISTS "profiles_public_read_v6" ON public.profiles;
    DROP POLICY IF EXISTS "profiles_user_update_v6" ON public.profiles;
    DROP POLICY IF EXISTS "profiles_user_insert_v6" ON public.profiles;
    DROP POLICY IF EXISTS "profiles_public_read" ON public.profiles;
    DROP POLICY IF EXISTS "profiles_user_update" ON public.profiles;
    DROP POLICY IF EXISTS "profiles_user_insert" ON public.profiles;
EXCEPTION
    WHEN undefined_object THEN null;
END $$;

-- Create profiles table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    display_name TEXT NOT NULL,
    avatar_url TEXT,
    role TEXT CHECK (role IN ('user', 'admin', 'trainer')) DEFAULT 'user',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_created_at ON public.profiles(created_at);

-- Create policies with unique names
DO $$ BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'profiles' AND policyname = 'profiles_public_read'
    ) THEN
        CREATE POLICY "profiles_public_read" 
        ON public.profiles FOR SELECT 
        USING (true);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'profiles' AND policyname = 'profiles_user_update'
    ) THEN
        CREATE POLICY "profiles_user_update" 
        ON public.profiles FOR UPDATE 
        USING (auth.uid() = id);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'profiles' AND policyname = 'profiles_user_insert'
    ) THEN
        CREATE POLICY "profiles_user_insert" 
        ON public.profiles FOR INSERT 
        WITH CHECK (auth.uid() = id);
    END IF;
END $$;

-- Create function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
    INSERT INTO public.profiles (id, display_name, avatar_url, role)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)),
        NEW.raw_user_meta_data->>'avatar_url',
        COALESCE(NEW.raw_user_meta_data->>'role', 'user')
    );
    RETURN NEW;
END;
$$;

-- Create trigger for handling new user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();