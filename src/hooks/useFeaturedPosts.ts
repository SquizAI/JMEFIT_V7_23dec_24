import { useState, useEffect } from 'react';
import { BlogService } from '../services/blog';
import type { BlogPost } from '../types/blog';

export function useFeaturedPosts(limit = 3) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const data = await BlogService.getFeaturedPosts(limit);
        setPosts(data);
      } catch (err) {
        console.error('Error loading featured posts:', err);
        setError(err instanceof Error ? err.message : 'Failed to load featured posts');
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [limit]);

  return { posts, loading, error };
}