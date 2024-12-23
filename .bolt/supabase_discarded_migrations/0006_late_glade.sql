/*
  # Content Versioning System

  1. New Tables
    - `content_versions` - Stores version history for content
    - `scheduled_content` - Manages content publishing schedule
  
  2. Changes
    - Add version tracking columns to content table
    - Add scheduling metadata
  
  3. Security
    - Enable RLS on new tables
    - Add policies for version management
*/

-- Drop existing objects safely
DO $$ BEGIN
    DROP TRIGGER IF EXISTS on_content_update ON public.content;
    DROP FUNCTION IF EXISTS create_content_version();
    DROP POLICY IF EXISTS "content_versions_author_all" ON public.content_versions;
    DROP POLICY IF EXISTS "scheduled_content_author_all" ON public.scheduled_content;
EXCEPTION
    WHEN undefined_object THEN NULL;
END $$;

-- Content versions table
CREATE TABLE IF NOT EXISTS public.content_versions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    content_id UUID REFERENCES public.content(id) ON DELETE CASCADE,
    version INTEGER NOT NULL,
    title TEXT NOT NULL,
    slug TEXT NOT NULL,
    content JSONB NOT NULL,
    description TEXT,
    image_url TEXT,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Scheduled content table
CREATE TABLE IF NOT EXISTS public.scheduled_content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    content_id UUID REFERENCES public.content(id) ON DELETE CASCADE,
    version_id UUID REFERENCES public.content_versions(id),
    publish_at TIMESTAMPTZ NOT NULL,
    status TEXT CHECK (status IN ('pending', 'published', 'failed')) DEFAULT 'pending',
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    published_at TIMESTAMPTZ,
    metadata JSONB
);

-- Add version tracking to content table safely
DO $$ BEGIN
    ALTER TABLE public.content ADD COLUMN IF NOT EXISTS current_version UUID REFERENCES public.content_versions(id);
    ALTER TABLE public.content ADD COLUMN IF NOT EXISTS version_count INTEGER DEFAULT 0;
EXCEPTION
    WHEN duplicate_column THEN NULL;
END $$;

-- Enable RLS
ALTER TABLE public.content_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scheduled_content ENABLE ROW LEVEL SECURITY;

-- Create policies with safe CREATE OR REPLACE
DO $$ BEGIN
    CREATE POLICY "content_versions_author_manage" ON public.content_versions
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.content c
            WHERE c.id = content_id
            AND (c.author_id = auth.uid() OR EXISTS (
                SELECT 1 FROM public.profiles
                WHERE id = auth.uid() AND role = 'admin'
            ))
        )
    );
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    CREATE POLICY "scheduled_content_author_manage" ON public.scheduled_content
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.content c
            WHERE c.id = content_id
            AND (c.author_id = auth.uid() OR EXISTS (
                SELECT 1 FROM public.profiles
                WHERE id = auth.uid() AND role = 'admin'
            ))
        )
    );
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_content_versions_content ON public.content_versions(content_id);
CREATE INDEX IF NOT EXISTS idx_content_versions_created ON public.content_versions(created_at);
CREATE INDEX IF NOT EXISTS idx_scheduled_content_publish ON public.scheduled_content(publish_at);
CREATE INDEX IF NOT EXISTS idx_scheduled_content_status ON public.scheduled_content(status);

-- Create version management function
CREATE OR REPLACE FUNCTION create_content_version()
RETURNS TRIGGER AS $$
BEGIN
    -- Increment version count
    NEW.version_count := COALESCE(OLD.version_count, 0) + 1;
    
    -- Create new version
    WITH new_version AS (
        INSERT INTO public.content_versions (
            content_id,
            version,
            title,
            slug,
            content,
            description,
            image_url,
            created_by
        ) VALUES (
            NEW.id,
            NEW.version_count,
            NEW.title,
            NEW.slug,
            NEW.content,
            NEW.description,
            NEW.image_url,
            auth.uid()
        )
        RETURNING id
    )
    SELECT id INTO NEW.current_version FROM new_version;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for version management
CREATE TRIGGER on_content_update
    BEFORE UPDATE ON public.content
    FOR EACH ROW
    WHEN (
        OLD.title IS DISTINCT FROM NEW.title OR
        OLD.content IS DISTINCT FROM NEW.content OR
        OLD.description IS DISTINCT FROM NEW.description OR
        OLD.image_url IS DISTINCT FROM NEW.image_url
    )
    EXECUTE FUNCTION create_content_version();