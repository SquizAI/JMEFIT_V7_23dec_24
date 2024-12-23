import { useState, useEffect } from 'react';
import { BlogService } from '../services/blog';
import type { BlogPost } from '../types/blog';

export function useBlogPost(slug: string) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        setLoading(true);
        const data = await BlogService.getPostBySlug(slug);
        setPost(data);
        
        // Increment view count
        if (data?.id) {
          await BlogService.incrementViews(data.id);
        }
      } catch (err) {
        console.error('Error loading blog post:', err);
        setError(err instanceof Error ? err.message : 'Failed to load post');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadPost();
    }
  }, [slug]);

  return { post, loading, error };
}