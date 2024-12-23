import { useState, useCallback } from 'react';
import type { Content } from '../types/content';

export function useContentPreview() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewContent, setPreviewContent] = useState<Content | null>(null);

  const openPreview = useCallback((content: Content) => {
    setPreviewContent(content);
    setIsPreviewOpen(true);
  }, []);

  const closePreview = useCallback(() => {
    setIsPreviewOpen(false);
    setPreviewContent(null);
  }, []);

  return {
    isPreviewOpen,
    previewContent,
    openPreview,
    closePreview
  };
}