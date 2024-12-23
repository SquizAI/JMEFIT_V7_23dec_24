import { useState, useEffect } from 'react';
import { BlogService } from '../services/blog';
import type { BlogCategory } from '../types/blog';

export function useBlogCategories() {
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        const data = await BlogService.getCategories();
        setCategories(data);
      } catch (err) {
        console.error('Error loading blog categories:', err);
        setError(err instanceof Error ? err.message : 'Failed to load categories');
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  return { categories, loading, error };
}