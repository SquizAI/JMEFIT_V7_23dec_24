/*
  # Blog System Schema

  1. New Tables
    - `blog_posts` - Core blog post content and metadata
    - `blog_categories` - Hierarchical category system
    - `blog_tags` - Flexible tagging system
    - `blog_comments` - User comments and interactions
    - `blog_authors` - Author profiles and credentials
  
  2. Security
    - RLS policies for content access control
    - Author-specific permissions
    - Comment moderation capabilities
*/

-- Blog Categories
CREATE TABLE IF NOT EXISTS public.blog_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  parent_id uuid REFERENCES public.blog_categories(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Blog Tags
CREATE TABLE IF NOT EXISTS public.blog_tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Blog Authors (extends profiles)
CREATE TABLE IF NOT EXISTS public.blog_authors (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  display_name text NOT NULL,
  bio text,
  avatar_url text,
  social_links jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Blog Posts
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text,
  content text NOT NULL,
  featured_image text,
  author_id uuid REFERENCES public.blog_authors(id),
  category_id uuid REFERENCES public.blog_categories(id),
  status text CHECK (status IN ('draft', 'published', 'archived')) DEFAULT 'draft',
  published_at timestamptz,
  seo_title text,
  seo_description text,
  seo_keywords text[],
  reading_time integer,
  view_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Blog Post Tags
CREATE TABLE IF NOT EXISTS public.blog_post_tags (
  post_id uuid REFERENCES public.blog_posts(id) ON DELETE CASCADE,
  tag_id uuid REFERENCES public.blog_tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- Blog Comments
CREATE TABLE IF NOT EXISTS public.blog_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES public.blog_posts(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id),
  parent_id uuid REFERENCES public.blog_comments(id),
  content text NOT NULL,
  status text CHECK (status IN ('pending', 'approved', 'spam')) DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_comments ENABLE ROW LEVEL SECURITY;

-- Policies
DO $$ BEGIN
  -- Categories policies
  CREATE POLICY "Public categories are viewable by everyone" 
    ON public.blog_categories FOR SELECT 
    USING (true);

  -- Tags policies
  CREATE POLICY "Public tags are viewable by everyone" 
    ON public.blog_tags FOR SELECT 
    USING (true);

  -- Authors policies
  CREATE POLICY "Public author profiles are viewable by everyone" 
    ON public.blog_authors FOR SELECT 
    USING (true);

  -- Posts policies
  CREATE POLICY "Published posts are viewable by everyone" 
    ON public.blog_posts FOR SELECT 
    USING (status = 'published' AND published_at <= now());

  CREATE POLICY "Authors can manage their own posts" 
    ON public.blog_posts FOR ALL 
    USING (author_id = auth.uid());

  CREATE POLICY "Admins can manage all posts"
    ON public.blog_posts FOR ALL
    USING (EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.uid() = id 
      AND raw_user_meta_data->>'role' = 'admin'
    ));

  -- Comments policies
  CREATE POLICY "Users can view approved comments" 
    ON public.blog_comments FOR SELECT 
    USING (status = 'approved');

  CREATE POLICY "Users can create comments" 
    ON public.blog_comments FOR INSERT 
    WITH CHECK (auth.uid() IS NOT NULL);

EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Indexes
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON public.blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON public.blog_posts(published_at);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON public.blog_posts(category_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_author ON public.blog_posts(author_id);

-- Functions
CREATE OR REPLACE FUNCTION public.increment_post_views(post_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.blog_posts
  SET view_count = view_count + 1
  WHERE id = post_id;
END;
$$;