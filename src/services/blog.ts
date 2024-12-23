import { supabase } from '../lib/supabase';
import type { BlogPost, BlogCategory, BlogTag } from '../types/blog';

export const BlogService = {
  // Posts
  async getPosts(options: {
    category?: string;
    tag?: string;
    author?: string;
    page?: number;
    limit?: number;
    status?: 'published' | 'draft' | 'archived';
  } = {}) {
    const { page = 1, limit = 9 } = options;
    const offset = (page - 1) * limit;

    let query = supabase
      .from('blog_posts')
      .select(`
        *,
        blog_authors (
          id,
          display_name,
          avatar_url
        ),
        blog_categories (
          id,
          name,
          slug
        ),
        blog_post_tags (
          blog_tags (
            id,
            name,
            slug
          )
        )
      `)
      .order('published_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (options.status) {
      query = query.eq('status', options.status);
    } else {
      query = query
        .eq('status', 'published')
        .lte('published_at', new Date().toISOString());
    }

    if (options.category) {
      query = query.eq('blog_categories.slug', options.category);
    }

    if (options.tag) {
      query = query.eq('blog_post_tags.blog_tags.slug', options.tag);
    }

    if (options.author) {
      query = query.eq('blog_authors.id', options.author);
    }

    const { data, error, count } = await query;
    if (error) throw error;

    return {
      posts: data || [],
      total: count || 0,
      hasMore: (offset + limit) < (count || 0)
    };
  },

  async getPostBySlug(slug: string) {
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        blog_authors (
          id,
          display_name,
          avatar_url,
          bio,
          social_links
        ),
        blog_categories (
          id,
          name,
          slug
        ),
        blog_post_tags (
          blog_tags (
            id,
            name,
            slug
          )
        )
      `)
      .eq('slug', slug)
      .single();

    if (error) throw error;
    return data;
  },

  async getFeaturedPosts(limit = 3) {
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        blog_authors (
          id,
          display_name
        ),
        blog_categories (
          id,
          name,
          slug
        )
      `)
      .eq('status', 'published')
      .lte('published_at', new Date().toISOString())
      .order('view_count', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  },

  async getCategories() {
    const { data, error } = await supabase
      .from('blog_categories')
      .select('*')
      .order('name');

    if (error) throw error;
    return data;
  },

  async getTags() {
    const { data, error } = await supabase
      .from('blog_tags')
      .select('*')
      .order('name');

    if (error) throw error;
    return data;
  },

  async incrementViews(postId: string) {
    const { error } = await supabase.rpc('increment_post_views', {
      post_id: postId
    });

    if (error) throw error;
  }
};