import { useState, useCallback } from 'react';
import { ContentService } from '../services/content/ContentService';
import type { Content } from '../types/content';

export function useContent(initialContent?: Content) {
  const [content, setContent] = useState<Content | null>(initialContent || null);
  const [versions, setVersions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveContent = useCallback(async (data: Partial<Content>) => {
    setLoading(true);
    setError(null);
    try {
      const savedContent = content?.id
        ? await ContentService.updateContent(content.id, data)
        : await ContentService.createContent(data);
      setContent(savedContent);
      return savedContent;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save content');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [content]);

  const scheduleContent = useCallback(async (publishAt: Date) => {
    if (!content?.id) return;
    
    setLoading(true);
    setError(null);
    try {
      await ContentService.scheduleContent(content.id, publishAt);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to schedule content');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [content]);

  const loadVersions = useCallback(async () => {
    if (!content?.id) return;
    
    setLoading(true);
    try {
      const contentVersions = await ContentService.getContentVersions(content.id);
      setVersions(contentVersions);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load versions');
    } finally {
      setLoading(false);
    }
  }, [content]);

  const revertToVersion = useCallback(async (versionId: string) => {
    if (!content?.id) return;
    
    setLoading(true);
    setError(null);
    try {
      const updatedContent = await ContentService.revertToVersion(content.id, versionId);
      setContent(updatedContent);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to revert version');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [content]);

  return {
    content,
    versions,
    loading,
    error,
    saveContent,
    scheduleContent,
    loadVersions,
    revertToVersion
  };
}