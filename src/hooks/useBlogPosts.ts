import { useState, useEffect } from 'react';
import { BlogService } from '../services/blog';
import type { BlogPost } from '../types/blog';

interface UseBlogPostsOptions {
  category?: string;
  tag?: string;
  limit?: number;
}

export function useBlogPosts(options: UseBlogPostsOptions = {}) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const { posts: data, hasMore: more } = await BlogService.getPosts({
          ...options,
          status: 'published'
        });
        setPosts(data);
        setHasMore(more);
        setError(null);
      } catch (err) {
        console.error('Error loading blog posts:', err);
        setError('Unable to load posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [options.category, options.tag, options.limit]);

  const loadMore = async () => {
    if (!hasMore || loading) return;
    
    try {
      const nextPage = Math.ceil(posts.length / (options.limit || 9)) + 1;
      const { posts: newPosts, hasMore: moreAvailable } = await BlogService.getPosts({
        ...options,
        page: nextPage,
        status: 'published'
      });
      setPosts(prev => [...prev, ...newPosts]);
      setHasMore(moreAvailable);
    } catch (err) {
      console.error('Error loading more posts:', err);
      setError('Unable to load more posts. Please try again later.');
    }
  };

  return { posts, loading, error, hasMore, loadMore };
}