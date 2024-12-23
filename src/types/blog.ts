export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  featured_image?: string;
  author_id: string;
  category_id: string;
  status: 'draft' | 'published' | 'archived';
  published_at?: string;
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string[];
  reading_time?: number;
  view_count: number;
  created_at: string;
  updated_at: string;
  author?: BlogAuthor;
  category?: BlogCategory;
  tags?: BlogTag[];
}

export interface BlogAuthor {
  id: string;
  display_name: string;
  bio?: string;
  avatar_url?: string;
  social_links?: {
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parent_id?: string;
}

export interface BlogTag {
  id: string;
  name: string;
  slug: string;
}

export interface BlogComment {
  id: string;
  post_id: string;
  user_id: string;
  parent_id?: string;
  content: string;
  status: 'pending' | 'approved' | 'spam';
  created_at: string;
  updated_at: string;
  user?: {
    display_name: string;
    avatar_url?: string;
  };
}