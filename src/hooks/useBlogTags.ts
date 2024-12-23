import { useState, useEffect } from 'react';
import { BlogService } from '../services/blog';
import type { BlogTag } from '../types/blog';

export function useBlogTags() {
  const [tags, setTags] = useState<BlogTag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTags = async () => {
      try {
        setLoading(true);
        const data = await BlogService.getTags();
        setTags(data);
      } catch (err) {
        console.error('Error loading blog tags:', err);
        setError(err instanceof Error ? err.message : 'Failed to load tags');
      } finally {
        setLoading(false);
      }
    };

    loadTags();
  }, []);

  return { tags, loading, error };
}